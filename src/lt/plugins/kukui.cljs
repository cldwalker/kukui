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
            [lt.plugins.kukui.core :refer [text->tags tag-prefix text->tag-group indent-nodes
                                           desc-node? attr-delimiter]]
            [lt.plugins.kukui.node :refer [ed->nodes line->node]]
            [lt.plugins.kukui.sync :as sync]
            [lt.plugins.kukui.db :as db]
            [lt.plugins.kukui.datascript :as d]
            [lt.plugins.sacha :as sacha]
            [lt.plugins.sacha.codemirror :as c]))

(def leftover-tag "leftover")

(defn ->tagged-counts
  "For given lines, returns map of tags and how many nodes have that tag."
  [ed lines]
  (->> (ed->nodes ed lines)
       (mapcat :tags)
       frequencies))

(cmd/command {:command :kukui.tag-counts
              :desc "kukui: tag counts in current branch's nodes"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))
                            lines (range line (c/safe-next-non-child-line ed line))]
                        (prn (->tagged-counts ed nil))))})

(defn db->nodes [ed lines]
  (db/->nodes (or lines
                  (if-let [selection (editor/selection-bounds ed)]
                    (range (get-in selection [:from :line])
                           (inc (get-in selection [:to :line])))
                    (let [line (.-line (editor/cursor ed))]
                      (range line (c/safe-next-non-child-line ed line)))))))

(cmd/command {:command :kukui.db-tag-counts
              :desc "kukui: db tag counts in current branch's nodes"
              :exec (fn []
                      (let [ed (pool/last-active)]
                        (prn (->> (db->nodes ed nil)
                                  (mapcat :tags)
                                  frequencies))))})


(defn type-nodes->tag-map
  "Reduces a type's nodes to a tag map with a reducer fn."
  [f type-config nodes]
  (reduce
   (fn [accum node]
     (let [type-tags (cset/intersection (:tags node)
                                        (set (:names type-config)))
           type-tags (if (empty? type-tags) [leftover-tag] type-tags)]
       #_(prn node type-tags)
       (reduce #(f %1 %2 node) accum type-tags)))
   {}
   nodes))

(def type-counts (partial type-nodes->tag-map #(update-in %1 [%2] inc)))

(defn types-counts [ed lines]
  (let [nodes (ed->nodes ed lines)
        types (db/types-and-names)]
    (keep
     #(let [counts (type-counts (some (fn [x] (when (= (:type x) %) x)) types)
                                nodes)]
        (when-not (and (= 1 (count counts))
                       (get counts leftover-tag))
          (vector % counts)))
     (map :type types))))

(defn total-types-counts
  "Different than type-counts in that this only counts total for each type
  and is only based on explicit tags - no defaults are taken into account.
  Also, one node gets counted for each of its tags."
  [ed lines]
  (let [line (.-line (editor/cursor ed))
        lines (or lines (range line (c/safe-next-non-child-line ed line)))
        tagged-counts (->tagged-counts ed lines)
        types (db/types-and-names)
        find-type (fn [tag]
                    (some #(when (contains? (set (:names %)) tag)
                             (:type %)) types))]
    (reduce-kv
     (fn [accum tag count]
       (update-in accum [(find-type tag)]
                  (fnil + 0) count))
     {}
     tagged-counts)))


(defn attribute-counts* [nodes attr]
  (println "Attribute:" attr "exists for"
           (count (filter attr nodes)) "of"
           (count nodes) "nodes")
  (prn (reduce
        (fn [accum val]
          (update-in accum [val] inc))
        {}
        (map attr nodes))))

(defn attribute-counts [nodes]
  (doseq [attr (-> (mapcat keys nodes) set (disj :desc :tags :indent :line :text))]
    (attribute-counts* nodes attr)))

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
                               "nodes" (count nodes)))
                        (attribute-counts nodes)))})

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
                               "nodes" (count nodes)))
                        (attribute-counts nodes)))})

(defn db-types-counts [lines]
  (let [nodes (db/->nodes lines)]
    (println "Tag counts")
    (pprint (db/tag-counts lines))
    (println "Tag counts by type")
    (prn (map (fn [[type tag-map]]
                [type (apply + (vals tag-map))])
              (db/tag-counts lines)))
    (prn "Misc counts" {:untagged (count (filter (comp empty? :tags) nodes))
                        :nodes (count nodes)})
    (println "Type counts")
    (pprint (db/attr-counts lines :type))))

(cmd/command {:command :kukui.db-types-counts
              :desc "kukui: db tag counts of each type for current branch or selection"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))
                            lines (range line (c/safe-next-non-child-line ed line))]
                        (db-types-counts lines)))})

(cmd/command {:command :kukui.db-all-types-counts
              :desc "kukui: Same as types-counts but for whole file"
              :exec (fn []
                      (let [ed (pool/last-active)
                            lines (range (editor/first-line ed)
                                         (inc (editor/last-line ed)))]
                        (db-types-counts lines)))})

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
                (if (-> query-tag (.indexOf attr-delimiter) (> -1))
                  (let [[attr value] (s/split query-tag (re-pattern attr-delimiter))
                        attr (keyword attr)]
                    (filter #(= value (attr %)) nodes))
                  (filter #(contains? (:tags %) query-tag) nodes))
                nodes)
        view-config (if (map? type-or-view)
                      type-or-view
                      {:names (conj (vec (sort (map :name (d/find-by :type (name type-or-view))))) leftover-tag)
                       :default leftover-tag})
        tags-nodes (type-map view-config nodes)
        tags-nodes (ensure-unique-nodes tags-nodes)
        tags-nodes (save-tags tags-nodes)
        new-nodes (mapcat
                   (fn [tag]
                     (let [children (if (-> tag (.indexOf attr-delimiter) (> -1))
                                      ;; can't use a tag index for attr queries
                                      (let [[attr value] (s/split tag (re-pattern attr-delimiter))
                                            attr (keyword attr)]
                                        (filter #(= value (attr %)) nodes))
                                      (get tags-nodes tag))]
                       (when (seq children)
                         (into [{:type-tag true :text (str tag-prefix (name tag))}] children))))
                   (:names view-config))
        indented-nodes (indent-nodes new-nodes
                                     (c/line-indent ed (.-line (editor/cursor ed)))
                                     (editor/option ed "tabSize")
                                     level)]
    (str (s/join "\n" indented-nodes) "\n")))

(def type-selector
  (selector/selector {:items (fn []
                               (sort-by :name
                                        (map #(select-keys % [:name]) (d/find-by :type db/root-type))))
                      :key :name}))

(defn check-types-counts
  ([ed editor-fn] (check-types-counts ed editor-fn nil))
  ([ed editor-fn lines]
   (let [before-replace-counts (types-counts ed lines)
         new-body-count (count (s/split-lines (editor-fn)))
         new-lines (when lines (range (first lines) (+ new-body-count (first lines))))
         after-replace-counts (types-counts ed new-lines)]
         (when-not (= before-replace-counts after-replace-counts)
           ;; (cmd/exec! :editor.undo)
           ;; (notifos/set-msg! "Before and after type counts not equal. Please submit your outline as an issue." {:class "error"})
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

;; results at next level under cursor
(cmd/command {:command :kukui.type-replace-children
              :desc "kukui: replaces current children with new type view"
              :options type-selector
              :exec (fn [type]
                      (replace-children (pool/last-active)
                                        #(->view % (keyword (:name type)))))})
;; results at same level as cursor
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


(defn ->view-config [names no-default]
  {:names (if no-default names (conj names leftover-tag))
   :default leftover-tag})

(defn ->query-view
  "Create a view given a query. There are two formats.
  With parent:    #type: tag1, tag2, type:note
  Without parent: tag1, tag2"
  [ed query & {:keys [level view-fn types lines]
               :or {level 1
                    ;; doesn't add leftover to query
                    view-fn #(->view-config % true)}}]
  (let [{:keys [parent-tag tags]} (text->tag-group types query)
        view-config (view-fn tags)]
    (->view ed view-config
            :level level :query-tag parent-tag :lines lines)))

;; cursor should be on parent and query should replace it e.g. #p0 -> datascript
;; always adds leftover to query
(cmd/command {:command :kukui.query-replace-children
              :desc "kukui: replaces current children based on current node's query"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))
                            end-line (c/safe-next-non-child-line ed line)
                            new-body (->query-view ed (editor/line ed line)
                                                   :types (db/types-and-names)
                                                   :view-fn #(->view-config % nil))]
                        (editor/replace (editor/->cm-ed ed)
                                        {:line (inc line) :ch 0}
                                        {:line end-line :ch 0}
                                        new-body)))})

;; cursor should be first sibling of queried children
(cmd/command {:command :kukui.query-insert-children
              :desc "kukui: inserts children based on current node's query and parent's children"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))
                            lines (util/find-parent-lines ed line)
                            new-body (->query-view ed (editor/line ed line)
                                                   :types (db/types-and-names)
                                                   :lines lines)]
                        (if (s/blank? new-body)
                          (notifos/set-msg! (str "No results for '" (editor/line ed line) "'"))
                          (util/insert-at-next-line ed new-body))))})

;; Misc commands
;; =============

;; move to sacha once descs land
(cmd/command {:command :kukui.raise-node
              :desc "kukui: Raises node to replace parent and sets it to parent's level"
              :exec (fn []
                      (let [ed (pool/last-active)
                            parent-line (util/find-parent-line ed (.-line (editor/cursor ed)))]
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

(defn sibling-nodes [ed line]
  (let [parent-lines (util/find-parent-lines ed line)
        current-indent (c/line-indent ed line)
        sibling-lines (filter #(when (= current-indent (c/line-indent ed %)) %)
                              parent-lines)]
    (map (partial line->node ed) sibling-lines)))

(defmethod config/save :level-type [_ {:keys [editor value]}]
  (let [line (.-line (editor/cursor editor))
        ;; Doesn't tia ignore tag. Assume all siblings are tagged
        siblings (mapcat #(text->tags (:text %))
                         (sibling-nodes editor line))]
    (config/merge-config {(keyword value) {:names siblings}}
                         :into-type)))


(cmd/command {:command :kukui.save-current-config
              :desc "kukui: Saves config for the current line"
              :exec (fn []
                      (config/save-current-config (pool/last-active)))})

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

(cmd/command {:command :kukui.sync-file-to-db
              :desc "kukui: Syncs file to db"
              :exec (fn []
                      (let [ed (pool/last-active)
                            lines (range (editor/first-line ed)
                                         (inc (editor/last-line ed)))
                            nodes (ed->nodes ed lines)
                            file (util/current-file)]
                        (def nodes nodes)
                        (try
                          (sync/sync nodes file)
                          (catch :default e
                            (notifos/set-msg! (str "Failed to sync:" e) {:class "error"})
                            (prn e (ex-data e))
                            (println (.-stack e))))))})

(comment
  (->> entity-records
       first
       second))

