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
            [lt.plugins.sacha :as sacha]
            [lt.plugins.sacha.codemirror :as c]))

(defn desc-node? [node]
  (re-find #"^\s*\+" (:text node)))

(defn parent-node? [curr next]
  (when next
    (and (> (:indent next) (:indent curr))
         (not (desc-node? next)))))

(def tag-prefix "#")

;; This regex returns pairs of matches but only the latter is useful. This
;; is a necessary evil caused by no negative-lookbehind in JS
(def tag-pattern
  "Regex for pulling out tags with tag-prefix. To escape having a tag parsed,
  put a backslash before it e.g. \\#escaped"
  (re-pattern (str "(?:[^\\\\]|^)"
                   "(" tag-prefix "[^ \\t\\n:.,;]+" ")")))

(defn text->tags [text]
  (map
   #(subs % 1)
   (map second (re-seq tag-pattern text))))

(defn add-node-with-tags [nodes node tags]
  (conj nodes (assoc node :tags tags)))

(defn ->tagged-nodes
  "Returns nodes with :line, :indent, :text and :tags properties.
  Tags are picked up from parents and any words starting with '#'."
  [ed lines]
  (->> lines
       (map #(hash-map :line %
                       :indent (c/line-indent ed %)
                       :text (editor/line ed %)))
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


(def unknown-type :unknown)

;; TODO: make this dynamic per branch
(def config
  {:types {:priority {:names ["p0" "p1" "p2" "p9" "p?" "later"]
                      :default "p?"}
           :duration {:names ["small" "big"]
                      :default "small"}
           unknown-type {:names ["leftover"]
                         :default "leftover"}}})

(defn type-nodes->tag-map
  "Reduces a type's nodes to a tag map with a reducer fn."
  [f type-config nodes]
  (let [default-tag (or (:default type-config) "leftover")]
    (reduce
     (fn [accum node]
       (let [type-tags (cset/intersection (set (:tags node))
                                          (set (:names type-config)))
             type-tags (if (empty? type-tags) [default-tag] type-tags)]
         #_(prn node type-tags)
         (reduce #(f %1 %2 node) accum type-tags)))
     {}
     nodes)))

(def type-counts (partial type-nodes->tag-map #(update-in %1 [%2] inc)))

(defn dynamic-config
  "Types config which calculates certain types based on nodes e.g. unknown type
  which accounts for typeless tags."
  [nodes]
  (let [unaccounted-tags (cset/difference (set (mapcat :tags nodes))
                                          (set (->> config :types vals (mapcat :names))))]
    (update-in config [:types unknown-type :names] #(into unaccounted-tags %))))

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
        types-config (dynamic-config nodes)]
    (map
     #(vector %
              (type-counts (get-in types-config [:types %]) nodes))
     (keys (:types types-config)))))

(cmd/command {:command :kukui.types-counts
              :desc "kukui: tag counts of each type for current branch or selection"
              :exec (fn []
                      (prn (types-counts (pool/last-active) nil)))})

(cmd/command {:command :kukui.debug-nodes
              :desc "kukui: prints nodes for current branch or selection"
              :exec (fn []
                      (println (s/join "\n" (ed->nodes (pool/last-active)))))})

;; Type view commands
;; ==================

(def type-map (partial type-nodes->tag-map #(update-in %1 [%2] (fnil conj []) %3)))

(defn indent-node [node indent]
  (s/replace-first
   (:text node)
   #"^\s*"
   (apply str (repeat indent " "))))

(defn indent-nodes [nodes indent tab-size offset-level]
  (let [offset (* offset-level tab-size)
        tag-indent (+ indent offset)
        node-indent (+ indent offset tab-size)
        desc-indent (+ indent offset tab-size tab-size)]
    (mapcat
     #(if (:type-tag %)
        [(str (apply str (repeat tag-indent " "))
              (:text %))]
        (into [(indent-node % node-indent)]
              (map (fn [x] (indent-node x desc-indent))
                   (:desc %))))
     nodes)))


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
              (let [tags-to-add (cset/difference (set (:tags node))
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
                                          (when ((set %) tag)
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
                (filter #(contains? (set (:tags %)) query-tag) nodes)
                nodes)
        view-config (if (map? type-or-view)
                      type-or-view
                      (get-in (dynamic-config nodes) [:types type-or-view]))
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
                               (map #(hash-map :name (name %)) (keys (:types config))))
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
(defn expand-tag
  "Expands a tag if it's a type"
  [types-config tag]
  (if (contains? (set (keys (:types types-config)))
                 (keyword tag))
    (get-in types-config [:types (keyword tag) :names])
    [tag]))

(defn text->tag-group
  "Used by query view and config to associate a parent tag (type) with its tags"
  [text]
  (let [[_ parent-tag tags-string] (re-find #"^\s*(\S+:|)\s*(.*)$" text)
        parent-tag (if (seq parent-tag) (first (text->tags parent-tag)) nil)
        tags (when tags-string
               (text->tags (s/join " "
                                   (map #(str tag-prefix %) (s/split tags-string #"\s*,\s*")))))
        tags (mapcat (partial expand-tag types-config) tags)]
    {:parent-tag parent-tag :tags tags}))


;; (as-> (text->tag-group "#type: tag1, tag2;")
;;       group
;;       {(keyword (:parent-tag group))
;;        {:names (:tags group)}}))

(defn ->query-view
  "Create a view given a query. There are two formats.
  With parent:    #type: tag1, tag2
  Without parent: tag1, tag2"
  [ed query & {:keys [level view-fn types-config lines]
               :or {level 1
                    view-fn #(hash-map :names %)}}]
   {:pre [(seq query)]}
   (let [[_ query-tag tags-string] (re-find #"^\s*(\S+:|)\s*(.*)$" query)
         query-tag (if (seq query-tag)
                     (s/replace query-tag
                                (re-pattern (str "^" tag-prefix "|:$"))
                                "")
                     nil)
         tags (when tags-string (s/split tags-string #"\s*,\s*"))
         tags (mapcat (partial expand-tag types-config) tags)
         view-config (view-fn tags)]
     (->view ed view-config
             :level level :query-tag query-tag :lines lines)))

(cmd/command {:command :kukui.query-replace-children
              :desc "kukui: replaces current children based on current node's query"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))
                            end-line (c/safe-next-non-child-line ed line)
                            new-body (->query-view ed (editor/line ed line)
                                                   :types-config config
                                                   :view-fn #(hash-map :names (conj % "leftover")
                                                                       :default "leftover"))]
                        (editor/replace (editor/->cm-ed ed)
                                        {:line (inc line) :ch 0}
                                        {:line end-line :ch 0}
                                        new-body)))})

;; consider moving to sacha
(defn find-parent-line [ed line]
  (c/find-parent ed (range (dec line) -1 -1) (c/line-indent ed line)))


(cmd/command {:command :kukui.query-insert-children
              :desc "kukui: inserts current children based on parent node's query"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))
                            parent-line (find-parent-line ed line)
                            ;; TODO: handle no parent
                            end-line (c/safe-next-non-child-line ed parent-line)
                            new-body (->query-view ed (editor/line ed line)
                                                   :types-config config
                                                   :lines (range parent-line end-line))]
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
                            parent-line (find-parent-line ed (.-line (editor/cursor ed)))]
                        (editor/operation ed
                                          (fn []
                                            (c/delete-lines ed parent-line parent-line)
                                            (sacha/indent-branch "subtract")))))})



(cmd/command {:command :kukui.stamp-children
              :desc "kukui: stamps current children with parent tags"
              :exec (fn []
                      (replace-children (pool/last-active)
                                        stamp-nodes))})

(cmd/command {:command :kukui.save-config
              :desc "kukui: Saves children as config (only :types supported so far)"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))
                            children-lines (range (inc line)
                                                  (c/safe-next-non-child-line ed line))
                            new-config (->> children-lines
                                            (map #(editor/line ed %))
                                            (map text->tag-group)
                                            (remove #(let [no-parent (not (:parent-tag %))]
                                                       (when no-parent
                                                         (println "Skipping line with no parent-tag: " (pr-str %)))
                                                       no-parent))
                                            (map #(vector (keyword (:parent-tag %))
                                                          {:names (vec (:tags %))}))
                                            (into {})
                                            (update-in config [:types] merge))]
                        (println "New config is: " (pr-str new-config))
                        (notifos/set-msg! "Saved config")
                        (def config new-config)))})
