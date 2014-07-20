(ns lt.plugins.kukui
  "Experiments in outlining and semantic tagging"
  (:require [lt.objs.command :as cmd]
            [lt.objs.editor.pool :as pool]
            [lt.objs.editor :as editor]
            [lt.objs.notifos :as notifos]
            [lt.objs.files :as files]
            [clojure.set :as cset]
            [clojure.string :as s]
            [lt.plugins.kukui.selector :as selector]
            [lt.plugins.kukui.util :as util]
            [lt.plugins.kukui.core :refer [text->tags tag-prefix text->tag-group indent-nodes
                                           desc-node? attr-delimiter]]
            [lt.plugins.kukui.node :refer [ed->nodes line->node]]
            [lt.plugins.kukui.live :as live]
            [lt.plugins.kukui.sync :as sync]
            [lt.plugins.kukui.db :as db]
            [lt.plugins.kukui.datascript :as d]
            [lt.plugins.sacha :as sacha]
            [lt.plugins.sacha.codemirror :as c]))

(defn current-lines [ed]
  (if-let [selection (editor/selection-bounds ed)]
    (range (get-in selection [:from :line])
           (inc (get-in selection [:to :line])))
    (let [line (.-line (editor/cursor ed))]
      (range line (c/safe-next-non-child-line ed line)))))

(defn db->nodes
  ([ed] (db->nodes ed (current-lines ed)))
  ([ed lines] (db/->nodes (util/current-file) lines)))

(cmd/command {:command :kukui.db-tag-counts
              :desc "kukui: db tag counts in current branch's nodes"
              :exec (fn []
                      (let [ed (pool/last-active)]
                        (prn (->> (db->nodes ed)
                                  (mapcat :tags)
                                  frequencies))))})


(defn db-types-counts [file lines]
  (let [nodes (db/->nodes file lines)]
    (println "Tag counts")
    (util/pprint (map (fn [[f v]] [f (util/->val-sorted-map v)])
                      (db/tag-counts file lines)))
    (println "Tag counts by type")
    (prn (sort-by second >
          (map (fn [[type tag-map]]
                 [type (apply + (vals tag-map))])
               (db/tag-counts file lines))))
    (prn "Misc counts" {:untagged (count (filter (comp empty? :tags) nodes))
                        :nodes (count nodes)})
    (println "Type counts")
    (util/pprint (db/attr-counts file lines :type))))

(cmd/command {:command :kukui.db-types-counts
              :desc "kukui: db tag counts of each type for current branch or selection"
              :exec (fn []
                      (let [ed (pool/last-active)]
                        (db-types-counts (util/current-file) (current-lines ed))))})

(cmd/command {:command :kukui.db-all-types-counts
              :desc "kukui: Same as types-counts but for whole file"
              :exec (fn []
                      (let [ed (pool/last-active)
                            lines (range (editor/first-line ed)
                                         (inc (editor/last-line ed)))]
                        (db-types-counts (util/current-file) lines)))})

(cmd/command {:command :kukui.debug-nodes
              :desc "kukui: prints nodes for current branch or selection"
              :exec (fn []
                      (util/pprint (ed->nodes (pool/last-active))))})

(cmd/command {:command :kukui.debug-db-nodes
              :desc "kukui: prints db nodes for current branch or selection"
              :exec (fn []
                      (util/pprint (db->nodes (pool/last-active))))})

;; Type view commands
;; ==================

(def type-map (partial live/type-nodes->tag-map #(update-in %1 [%2] (fnil conj []) %3)))

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
  ;; Can't use db->nodes until types-counts check can tia extra parent tags from db
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
                      {:names (conj (vec (sort (map :name (d/find-by :type (name type-or-view))))) live/leftover-tag)
                       :default live/leftover-tag})
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
   (let [before-replace-counts (set (live/types-counts ed lines))
         new-body-count (count (s/split-lines (editor-fn)))
         new-lines (when lines (range (first lines) (+ new-body-count (first lines))))
         after-replace-counts (set (live/types-counts ed new-lines))]
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
                            lines (current-lines ed)]
                        (check-types-counts
                         ed
                         (fn []
                           (let [new-body (->view ed (keyword (:name type)) :level 0)]
                             (editor/replace (editor/->cm-ed ed)
                                             {:line (:line (editor/->cursor ed)) :ch 0}
                                             {:line (inc (last lines)) :ch 0}
                                             new-body)
                             new-body))
                         lines)))})

(cmd/command {:command :kukui.insert-type-branch
              :desc "kukui: inserts new type view for current branch"
              :options type-selector
              :exec (fn [type]
                      (let [ed (pool/last-active)]
                        (util/insert-at-next-line ed (->view ed (keyword (:name type))))))})
;; Query commands
;; ==============


(defn ->view-config [names no-default]
  {:names (if no-default names (conj names live/leftover-tag))
   :default live/leftover-tag})

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

;; Only queries whole file for now
(cmd/command {:command :kukui.query-temp-file
              :desc "kukui: Open query in temp file"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))
                            level (/ (c/line-indent ed line)
                                     (editor/option ed "tabSize"))
                            result (->query-view ed (editor/line ed line)
                                                 :types (db/types-and-names)
                                                 :level (- level)
                                                 :lines (range (editor/first-line ed)
                                                               (inc (editor/last-line ed))))
                            path (util/tempfile "kukui-query" ".otl")]
                        (files/save path result)
                        (cmd/exec! :open-path path)))})

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

(cmd/command {:command :kukui.toggle-descs
              :desc "kukui: Toggle visibility of descs of current children"
              :exec (fn []
                      (let [ed (pool/last-active)]
                        (util/toggle-all ed
                                         #(and
                                           (not (desc-node? (line->node ed %)))
                                           (desc-node? (line->node ed (inc %))))
                                         (current-lines ed))))})

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

(cmd/command {:command :kukui.reset-sync
              :desc "kukui: Resets sync"
              :exec sync/reset-sync!})

(comment
  (->> entity-records
       first
       second))

