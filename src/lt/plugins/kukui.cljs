(ns lt.plugins.kukui
  "Experiments in outlining and semantic tagging"
  (:require [lt.objs.command :as cmd]
            [lt.objs.editor.pool :as pool]
            [lt.objs.editor :as editor]
            [lt.objs.notifos :as notifos]
            [clojure.set :as cset]
            [clojure.string :as s]
            [lt.plugins.kukui.selector :as selector]
            [lt.plugins.kukui.util :as util]
            [lt.plugins.kukui.config :as config]
            [lt.plugins.kukui.core :refer [text->tags tag-prefix text->tag-group indent-nodes]]
            [lt.plugins.sacha :as sacha]
            [lt.plugins.sacha.codemirror :as c]))

(defn desc-node? [node]
  (re-find #"^\s*\+" (:text node)))

(defn parent-node? [curr next]
  (when next
    (and (> (:indent next) (:indent curr))
         (not (desc-node? next)))))

(defn add-node-with-tags [nodes node tags]
  (conj nodes (assoc node :tags (set tags))))

(defn line->node [ed line]
  {:line line
   :indent (c/line-indent ed line)
   :text (editor/line ed line)})

(def ignore-tag "ignore")

(defn ->tagged-nodes*
  "Returns nodes with :line, :indent, :text and :tags properties.
  Tags are picked up from parents and any words starting with '#'."
  [ed lines]
  (->> lines
       (map #(line->node ed %))
       (map #(if (re-find #"^\s*:config\s*$" (:text %))
               (update-in % [:text] str " " tag-prefix ignore-tag) %))
       ;; [] needed to include last element
       (partition 2 1 [])
       (reduce
        (fn [accum [curr next]]
          (cond
           (parent-node? curr next)
           (update-in accum [:tags]
                      #(add-node-with-tags
                        (remove (fn [tag] (= (:indent tag) (:indent curr))) %)
                        curr
                        (text->tags (:text curr))))

           (desc-node? curr)
           (update-in accum
                      [:nodes (dec (count (:nodes accum))) :desc]
                      (fnil conj [])
                      curr)
           :else
           (update-in accum [:nodes]
                      (fn [nodes]
                        (add-node-with-tags
                         nodes
                         curr
                         (into (mapcat :tags (filter #(< (:indent %) (:indent curr)) (:tags accum)))
                               (text->tags (:text curr))))))))
        ;; :nodes - contains all nodes/non-tag lines in the given lines
        ;; :tags - contains all tags but only keeps the latest tag for a given indent
        {:tags #{} :nodes []})
       :nodes))


(defn ->tagged-nodes
  "Same as ->tagged-nodes* but respects ignore-tag"
  [ed lines]
  (let [nodes (->tagged-nodes* ed lines)]
    (remove #(contains? (:tags %) ignore-tag) nodes)))

(defn ->tagged-counts
  "For given lines, returns map of tags and how many nodes have that tag."
  [ed lines]
  (->> (->tagged-nodes ed lines)
       (mapcat :tags)
       frequencies))

(cmd/command {:command :kukui.tag-counts
              :desc "kukui: tag counts in current branch's nodes"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))]
                        (prn (->tagged-counts
                         ed
                         (range line (c/safe-next-non-child-line ed line))))))})


(defn type-nodes->tag-map
  "Reduces a type's nodes to a tag map with a reducer fn."
  [f type-config nodes]
  (reduce
   (fn [accum node]
     (let [type-tags (cset/intersection (:tags node)
                                        (set (:names type-config)))
           type-tags (if (empty? type-tags) [(:default type-config)] type-tags)]
       #_(prn node type-tags)
       (reduce #(f %1 %2 node) accum type-tags)))
   {}
   nodes))

(def type-counts (partial type-nodes->tag-map #(update-in %1 [%2] inc)))

(defn ed->nodes
  ([ed] (ed->nodes ed nil))
  ([ed lines]
   (let [lines (or lines
                   (if-let [selection (editor/selection-bounds ed)]
                     (range (get-in selection [:from :line])
                            (inc (get-in selection [:to :line])))
                     (let [line (.-line (editor/cursor ed))]
                       (range line (c/safe-next-non-child-line ed line)))))]
     (->tagged-nodes ed lines))))

(defn types-counts [ed lines]
  (let [nodes (ed->nodes ed lines)
        types-config (config/dynamic-config nodes)]
    (keep
     #(let [counts (type-counts (get-in types-config [:types %]) nodes)]
        (when-not (and (= 1 (count counts))
                       (get counts (get-in types-config [:types % :default])))
          (vector % counts)))
     (keys (:types types-config)))))

(defn total-types-counts
  "Different than type-counts in that this only counts total for each type
  and is only based on explicit tags - no defaults are taken into account.
  Also, one node gets counted for each of its tags."
  [ed lines]
  (let [line (.-line (editor/cursor ed))
        lines (or lines (range line (c/safe-next-non-child-line ed line)))
        tagged-counts (->tagged-counts ed lines)]
    (reduce-kv
     (fn [accum tag count]
       (update-in accum [(config/find-type tag)]
                  (fnil + 0) count))
     {}
     tagged-counts)))

(defn pprint
  "Useful for printing list or vec of maps. Hack until actual cljs.pprint exists"
  [data]
  (println (s/join "\n" data)))

(cmd/command {:command :kukui.types-counts
              :desc "kukui: tag counts of each type for current branch or selection"
              :exec (fn []
                      (let [ed (pool/last-active)
                            nodes (ed->nodes ed nil)]
                        (pprint (types-counts ed nil))
                        (prn (assoc (total-types-counts ed nil)
                               "untagged" (count (filter (comp empty? :tags) nodes))
                               "nodes" (count nodes)))))})

(cmd/command {:command :kukui.all-types-counts
              :desc "kukui: Same as types-counts but for whole file"
              :exec (fn []
                      (let [ed (pool/last-active)
                            lines (range (editor/first-line ed)
                                         (inc (editor/last-line ed)))
                            nodes (ed->nodes ed lines)]
                        (pprint (types-counts ed lines))
                        (prn (assoc (total-types-counts ed lines)
                               "untagged" (count (filter (comp empty? :tags) nodes))
                               "nodes" (count nodes)))))})


(cmd/command {:command :kukui.debug-nodes
              :desc "kukui: prints nodes for current branch or selection"
              :exec (fn []
                      (pprint (ed->nodes (pool/last-active))))})

;; Type view commands
;; ==================

(def type-map (partial type-nodes->tag-map #(update-in %1 [%2] (fnil conj []) %3)))

(defn add-tags-to-node [node tags]
  (update-in node [:text] str
             (s/join (map #(str " " tag-prefix %) tags))))

(defn save-tags
  "Saves tags to node's text in order to not lose tags when switching views."
  [tags-nodes]
  (reduce-kv
   (fn [accum tag nodes]
     (assoc accum tag
       (map (fn [node]
              (let [tags-to-add (cset/difference (:tags node)
                                                 #{tag}
                                                 (set (text->tags (:text node))))]
                (add-tags-to-node node tags-to-add)))
            nodes)))
   {}
   tags-nodes))

(defn ensure-unique-nodes
  "Ensures duplicate nodes are removed from least popular tags, leaving
  a duplicate node in its most popular tag."
  [tags-nodes]
  (let [freqs (frequencies (mapcat second tags-nodes))
        dups (keep (fn [[node c]]
                     (when (> c 1) node)) freqs)
        most-popular-tag #(first (apply max-key
                                        (fn [[tag nodes]]
                                          (when (contains? % tag)
                                            (count nodes))) tags-nodes))
        ;; pairs of allowed tag and dup nodes
        tag-dups (map #(vector (most-popular-tag (:tags %)) %) dups)
        disallowed-node? (fn [node tag]
                           (some (fn [[allowed-tag dup-node]]
                                   (and (= dup-node node) (not= allowed-tag tag)))
                                 tag-dups))]
    (doseq [[tag node] tag-dups]
      (println (str "Line '" (:text node) "' has overlapping tags. Put line under " tag-prefix tag)))
    (into {}
          (keep
           (fn [[tag nodes]]
             (let [new-nodes (remove #(disallowed-node? % tag) nodes)]
               (when (seq new-nodes)
                 [tag (vec new-nodes)])))
           tags-nodes))))

(defn ->view
  "Creates a view given a type or a view config and the editor (branch) to use. A view
  pivots the current branch by changing the parents of a branch."
  [ed type-or-view & {:keys [level query-tag lines] :or {level 1}}]
  (let [nodes (ed->nodes ed lines)
        nodes (if query-tag
                (filter #(contains? (:tags %) query-tag) nodes)
                nodes)
        view-config (if (map? type-or-view)
                      type-or-view
                      (get-in (config/dynamic-config nodes) [:types type-or-view]))
        tags-nodes (type-map view-config nodes)
        tags-nodes (ensure-unique-nodes tags-nodes)
        tags-nodes (save-tags tags-nodes)
        new-nodes (mapcat
                   (fn [tag]
                     (when-let [children (get tags-nodes tag)]
                       (into [{:type-tag true :text (str tag-prefix (name tag))}] children)))
                   (:names view-config))
        indented-nodes (indent-nodes new-nodes
                                     (c/line-indent ed (.-line (editor/cursor ed)))
                                     (editor/option ed "tabSize")
                                     level)]
    (str (s/join "\n" indented-nodes) "\n")))

(def type-selector
  (selector/selector {:items (fn []
                               (map #(hash-map :name (name %)) (keys (:types config/config))))
                      :key :name}))

(defn check-types-counts
  ([ed editor-fn] (check-types-counts ed editor-fn nil))
  ([ed editor-fn lines]
   (let [before-replace-counts (types-counts ed lines)
         new-body-count (count (s/split-lines (editor-fn)))
         new-lines (when lines (range (first lines) (+ new-body-count (first lines))))
         after-replace-counts (types-counts ed new-lines)]
         (when-not (= before-replace-counts after-replace-counts)
           (cmd/exec! :editor.undo)
           (notifos/set-msg! "Before and after type counts not equal. Please submit your outline as an issue." {:class "error"})
           (println "BEFORE: " before-replace-counts "\nAFTER: " after-replace-counts)))))

(defn replace-children [ed view-fn]
  (let [end-line (c/safe-next-non-child-line ed (.-line (editor/cursor ed)))]
    (check-types-counts
     ed
     (fn []
       (let [new-body (view-fn ed)]
         (editor/replace (editor/->cm-ed ed)
                         {:line (inc (:line (editor/->cursor ed))) :ch 0}
                         {:line end-line :ch 0}
                         new-body)
         new-body)))))

(cmd/command {:command :kukui.type-replace-children
              :desc "kukui: replaces current children with new type view"
              :options type-selector
              :exec (fn [type]
                      (replace-children (pool/last-active)
                                        #(->view % (keyword (:name type)))))})

(cmd/command {:command :kukui.type-replace-branch
              :desc "kukui: replaces current branch with new type view"
              :options type-selector
              :exec (fn [type]
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))
                            end-line (c/safe-next-non-child-line ed line)]
                        (check-types-counts
                         ed
                         (fn []
                           (let [new-body (->view ed (keyword (:name type)) :level 0)]
                             (editor/replace (editor/->cm-ed ed)
                                             {:line (:line (editor/->cursor ed)) :ch 0}
                                             {:line end-line :ch 0}
                                             new-body)
                             new-body))
                         (range line end-line))))})

(cmd/command {:command :kukui.insert-type-branch
              :desc "kukui: inserts new type view for current branch"
              :options type-selector
              :exec (fn [type]
                      (let [ed (pool/last-active)]
                        (util/insert-at-next-line ed (->view ed (keyword (:name type))))))})
;; Query commands
;; ==============

(defn ->query-view
  "Create a view given a query. There are two formats.
  With parent:    #type: tag1, tag2
  Without parent: tag1, tag2"
  [ed query & {:keys [level view-fn types-config lines]
               :or {level 1
                    ;; doesn't add leftover to query
                    view-fn #(config/->type-config % true)}}]
  (let [{:keys [parent-tag tags]} (text->tag-group types-config query)
        view-config (view-fn tags)]
    (->view ed view-config
            :level level :query-tag parent-tag :lines lines)))

;; always add leftover to query
(cmd/command {:command :kukui.query-replace-children
              :desc "kukui: replaces current children based on current node's query"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))
                            end-line (c/safe-next-non-child-line ed line)
                            new-body (->query-view ed (editor/line ed line)
                                                   :types-config config/config
                                                   :view-fn #(config/->type-config % nil))]
                        (editor/replace (editor/->cm-ed ed)
                                        {:line (inc line) :ch 0}
                                        {:line end-line :ch 0}
                                        new-body)))})

;; consider moving to sacha
(defn find-parent-line [ed line]
  (c/find-parent ed (range (dec line) -1 -1) (c/line-indent ed line)))

(defn find-parent-lines
  "Finds range of lines for parent and returns all lines in file when no parent"
  [ed line]
  (if-let [parent-line (find-parent-line ed line)]
    (range parent-line (c/safe-next-non-child-line ed parent-line))
    ;; If no parent, assume at top level and search whole file
    (range (editor/first-line ed) (inc (editor/last-line ed)))))

(cmd/command {:command :kukui.query-insert-children
              :desc "kukui: inserts children based on current node's query and parent's children"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))
                            lines (find-parent-lines ed line)
                            new-body (->query-view ed (editor/line ed line)
                                                   :types-config config/config
                                                   :lines lines)]
                        (if (s/blank? new-body)
                          (notifos/set-msg! (str "No results for '" (editor/line ed line) "'"))
                          (util/insert-at-next-line ed new-body))))})

;; Misc commands
;; =============

(defn sibling-nodes [ed line]
  (let [parent-lines (find-parent-lines ed line)
        current-indent (c/line-indent ed line)
        sibling-lines (filter #(when (= current-indent (c/line-indent ed %)) %)
                              parent-lines)]
    (map (partial line->node ed) sibling-lines)))

(cmd/command {:command :kukui.save-level-type
              :desc "kukui: Updates types for current level using config.level-type"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))
                            siblings (mapcat #(or (text->tags (:text %)) (:text %))
                                             (sibling-nodes ed line))
                            [_ type] (config/read-config-line (editor/line ed line))]
                        (config/save-config* {(keyword type) {:names siblings}}
                                             :into-type)))})

;; move to sacha once descs land
(cmd/command {:command :kukui.raise-node
              :desc "kukui: Raises node to replace parent and sets it to parent's level"
              :exec (fn []
                      (let [ed (pool/last-active)
                            parent-line (find-parent-line ed (.-line (editor/cursor ed)))]
                        (editor/operation ed
                                          (fn []
                                            (c/delete-lines ed parent-line parent-line)
                                            (sacha/indent-branch "subtract")))))})

;; Move to sacha when appropriate
(defn toggle-all
  "Similar to codemirror fold/unfold-all but condition is given line number"
  ([ed condition]
   (toggle-all ed condition (range (editor/first-line ed) (inc (editor/last-line ed)))))
  ([ed condition lines]
   (editor/operation ed
                     (fn []
                       (doseq [line lines]
                         (when (condition line)
                           (c/fold-code ed #js {:line line :ch 0} nil)))))))

(defn stamp-nodes
  "Stamp children nodes with parent tags"
  [ed]
  (let [level 0
        nodes (ed->nodes ed)
        parent-tags (text->tags (editor/line ed (.-line (editor/cursor ed))))
        new-nodes (map #(add-tags-to-node % parent-tags) nodes)
        indented-nodes (indent-nodes new-nodes
                                     (c/line-indent ed (.-line (editor/cursor ed)))
                                     (editor/option ed "tabSize")
                                     level)]
    (str (s/join "\n" indented-nodes) "\n")))

(cmd/command {:command :kukui.stamp-children
              :desc "kukui: stamps current children with parent tags"
              :exec (fn []
                      (replace-children (pool/last-active)
                                        stamp-nodes))})

(cmd/command {:command :kukui.save-config
              :desc "kukui: Saves config with current children config with a merge"
              :exec (fn []
                     (config/save-config (pool/last-active) text->tag-group :replace-type))})

(cmd/command {:command :kukui.reset-config
              :desc "kukui: Resets config with current children config"
              :exec (fn []
                     (config/save-config (pool/last-active) text->tag-group :reset))})

(cmd/command {:command :kukui.toggle-descs
              :desc "kukui: Toggle visibility of descs of current children"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))
                            end-line (c/safe-next-non-child-line ed line)]
                        (toggle-all ed
                                     #(and
                                       (not (desc-node? (line->node ed %)))
                                       (desc-node? (line->node ed (inc %))))
                                     (range line end-line))))})
