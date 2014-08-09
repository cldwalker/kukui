(ns lt.plugins.kukui.query
  (:require [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.command :as cmd]
            [lt.objs.files :as files]
            [lt.objs.find :as find]
            [lt.object :as object]
            [lt.objs.notifos :as notifos]
            [cljs.reader :as reader]
            [clojure.set :as cset]
            [clojure.string :as s]
            [lt.plugins.kukui.core :as kc]
            [lt.plugins.kukui.datascript :as d]
            [datascript :as ds]
            [lt.plugins.sacha.codemirror :as c]
            [lt.plugins.kukui.selector :as selector]
            [lt.plugins.kukui.db :as db]
            [lt.plugins.kukui.sync :as sync]
            [lt.plugins.kukui.util :as util]))

(def leftover-tag "leftover")

(defn ent-text [ent]
  (or (:text ent)
      sync/no-text))

(def hidden-attributes
  "Entity Attributes to hide in query results"
  #{:text :db/id :semtag :indent :file :line :desc})

(defn attr-node [attr ent level id->name]
  {:level (inc level)
   :text (str "+ " attr ": "
              (if (= attr :tags)
                (->> (attr ent)
                     (map id->name)
                     (s/join ", "))
                (attr ent)))})

(defn ent->nodes [ent level id->name]
  (let [ent (if (map? ent) ent {:text (str ent)})]
    (into [(cond-> {:level level :text (ent-text ent)}
                   (:db/id ent) (assoc :id (:db/id ent)))]
        (into
         (mapv #(attr-node % ent level id->name)
               (sort (cset/difference (set (keys ent)) hidden-attributes)))
         (map #(hash-map :level (inc level) :text (ent-text %))
             (:desc ent))))))

(defn resolve-fn
  "Only works when in non-advanced mode e.g. no munging."
  [ns-obj f]
  (aget ns-obj
        ;; TODO: Add support for ->
        (s/replace (str f) "-" "_")))

(defn execute-query [default-executor query args]
  ;; TODO: make executor configurable based on query metadata.
  ;; Currently, a query executor exists if a fn of the same exists
  ;; in lt.plugins.kukui.db
  (if-let [executor (some->> query
                             (get (cset/map-invert db/named-queries))
                             (resolve-fn lt.plugins.kukui.db))]
    ;; TODO: make post-executor configurable based on query metadata
    (map (fn [[k v]] [k [v]])
         (apply executor args))
    (apply default-executor query args)))

(defn find-one-query->nodes [query args]
  (let [ents (apply d/qe query db/rules args)
        id->name (cset/map-invert (db/name-id-map))]
    (vec (mapcat #(ent->nodes % 1 id->name) ents))))

(defn default-second-executor [query & args]
  (->> (apply d/qae query db/rules args)
       (group-by first)
       (map (fn [[k pairs]] [k (map second pairs)]))))

(defn find-two-query->nodes [query args]
  (let [results (execute-query default-second-executor query args)
        id->name (cset/map-invert (db/name-id-map))]
    (vec (mapcat (fn [[group-key ents]]
                   (into [{:text group-key :level 1}]
                         (mapcat #(ent->nodes % 2 id->name) ents)))
                 results))))

(defn query->nodes [query & args]
  (println "Query:" query "\nArgs:" (pr-str args))
  (let [finds (count (:find (ds/parse-query query)))]
    (case finds
      1 (find-one-query->nodes query args)
      2 (find-two-query->nodes query args)
      (throw (ex-info (str "No render found for " finds " finds") {})))))

;; Use #fn in queries to refer to fns in cljs.core
(reader/register-tag-parser! 'fn #(resolve-fn cljs.core %))

(defn fn-string->query-args
  "If db/named-queries has a matching entry, return it along with args.

  For example:
  (tag1-type2 'kukui') => [:tag1-type2-query 'kukui']"
  [query-string]
  (let [[named-query & args] (reader/read-string query-string)]
    (when-let [query (named-query db/named-queries)]
      (into [query] args))))

(defn input->query-and-args [input]
  (let [named-query-args (fn-string->query-args input)]
    (cond
     named-query-args named-query-args
     ;; Full query detected
     (re-find #"^\s*\[:find" input) [(reader/read-string input)]
     ;; If not full-query, assume :where for entity query
     :else [(reader/read-string
             (str "[:find ?e :in $ % :where " input "]"))])))

(def query-history (atom []))

(defn nodes->path [ed nodes input]
  (let [result (kc/tree->string nodes (editor/option ed "tabSize"))
        path (util/tempfile "kukui-query" ".otl")
        lines-ids (->> nodes
                       (map-indexed #(assoc %2 :line %1))
                       (filter :id)
                       (map (juxt :line :id))
                       (into {}))]
    (files/save path result)
    (swap! query-history conj {:input input :path path :lines-ids lines-ids})
    path))

(defn input->path [ed input]
  (let [query-and-args (input->query-and-args input)
        nodes (apply query->nodes query-and-args)]
    (nodes->path ed nodes input)))

(defn add-ids-to-query-file
  ([] (add-ids-to-query-file (last @query-history)))
  ([query]
   (let [ed (first (pool/by-path (:path query)))]
    (doseq [[line id] (:lines-ids query)]
      (aset (editor/line-handle ed line) "kukui-id" id)))))

(cmd/command {:command :kukui.query-and-open-file
              :desc "kukui: Opens query results in a temp file as an outline"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (s/triml (editor/line ed (.-line (editor/cursor ed))))
                            path (input->path ed line)]
                        (util/jump-to ed path)
                        (add-ids-to-query-file)))})

(def type-selector
  (selector/selector {:items (fn []
                               (let [ed (pool/last-active)]
                                 (sort-by :name
                                          (map #(hash-map :name %)
                                               (db/local-tag-types (util/current-file ed)
                                                                   (util/current-lines ed))))))
                      :key :name}))

(defn add-leftover-nodes [existing-nodes original-nodes]
  (let [existing-text (set (map :text existing-nodes))
        ;; Assume text is unique enough to detect different nodes in a file range context
        leftover-nodes (remove #(contains? existing-text (:text %)) original-nodes)]
    (into existing-nodes
        (when (seq leftover-nodes)
          (let [id->name (cset/map-invert (db/name-id-map))]
            (into [{:level 1 :text leftover-tag}]
                  (mapcat #(ent->nodes % 2 id->name) leftover-nodes)))))))

(cmd/command {:command :kukui.query-with-local-type
              :desc "kukui: Opens query over current branch for chosen tag type"
              :options type-selector
              :exec (fn [ent]
                      (let [ed (pool/last-active)
                            lines (util/current-lines ed)
                            query ('local-by-tags-of-type db/named-queries)
                            args [(:name ent) (util/current-file ed) (first lines) (last lines)]
                            _ (println "Query:" query "\nArgs:" args)
                            nodes (find-two-query->nodes query args)
                            nodes (add-leftover-nodes nodes
                                                      (db/->nodes (util/current-file ed) lines))
                            path (nodes->path ed nodes (str query))]
                        (util/ensure-and-focus-second-tabset)
                        (util/jump-to ed path)
                        (add-ids-to-query-file)))})

(cmd/command {:command :kukui.query-and-print
              :desc "kukui: Prints query result to stdout/console"
              :exec (fn []
                     (let [ed (pool/last-active)
                           line (editor/line ed (.-line (editor/cursor ed)))
                           [query & args] (input->query-and-args line)
                           result (apply d/qae query db/rules args)]
                       (util/pprint result)) )})


(defn current-word*
  "Returns current word given string and cursor position in string"
  [string cursor]
  (str
   (re-find #"[^\s:()\"]+$" (subs string 0 cursor))
   (re-find #"^[^\s:()\"]+" (subs string cursor))))

(defn current-word
  "Current word under cursor"
  [ed]
  (let [cursor (editor/->cursor ed)]
    (current-word* (editor/line ed (:line cursor))
                   (:ch cursor))))

(defn current-word-query [query]
  (let [ed (pool/last-active)
        input (util/format query (current-word ed))
        path (input->path ed input)]
    (util/ensure-and-focus-second-tabset)
    (util/jump-to ed path)
    (add-ids-to-query-file)))

(cmd/command {:command :kukui.open-entity-tagged
              :desc "kukui: Opens current word as tagged entity query"
              :exec (partial current-word-query "(ent-by-type \"%s\")" )})

(cmd/command {:command :kukui.open-entity
              :desc "kukui: Opens current word as entity query"
              :exec (partial current-word-query "[?e :name \"%s\"]")})

(cmd/command {:command :kukui.open-entity-type
              :desc "kukui: Opens current word as entity type query"
              :exec (partial current-word-query "[?e :type \"%s\"]")})

(cmd/command {:command :kukui.open-regex-search
              :desc "kukui: Opens current word as regex search"
              :exec (fn []
                      (let [ed (pool/last-active)]
                        (current-word-query "(search-all-attr #fn re-find #\"%s\")")
                        (object/raise find/bar
                                      :search!
                                      (current-word ed))))})

(def query-history-selector
  (selector/selector {:items (fn []
                               (sort-by :index
                                        (map-indexed #(assoc %2
                                                        :index %1
                                                        :desc (str (inc %1) ". " (:input %2)))
                                                     (reverse @query-history))))
                      :key :desc}))

(cmd/command {:command :kukui.previous-query
              :desc "kukui: Opens previous query"
              :options query-history-selector
              :exec (fn [query-item]
                      (if (.contains (util/current-file) "kukui-query") ;; in a query file
                        (util/update-editor-path! (pool/last-active) (:path query-item))
                        (util/jump-to (pool/last-active) (:path query-item)))
                      (add-ids-to-query-file query-item))})

(cmd/command {:command :kukui.jump-to-query-result-source
              :desc "kukui: Jump to a query result's line and file"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))]
                        (if-let [entity (some-> (aget (editor/line-handle ed line) "kukui-id")
                                                d/entity)]
                          (if (and (:file entity) (:line entity))
                            (util/jump-to ed (:file entity) (:line entity))
                            (notifos/set-msg! (str "No file and line exists for entity " (:id entity))
                                              {:class "error"}))
                          (notifos/set-msg! (str "No entity found for line " (inc line))
                                            {:class "error"}))))})

(defn ed->db-line-handles
  "Returns db ids for given editor of a query result file"
  [ed]
  (let [lhs (transient [])]
    (.eachLine (-> @ed :doc deref :doc)
               (fn [lh]
                 (when (aget lh "kukui-id")
                   (conj! lhs lh))
                 nil))
    (persistent! lhs)))

(defn query-types-counts
  [ed]
  (let [ids (map #(aget % "kukui-id") (ed->db-line-handles ed))]
    (println "Tag counts")
    (util/pprint (sort-by first
                          (map (fn [[k v]] [k (util/->val-sorted-map v)])
                               (db/tag-counts-by-type-and-tag-for-ids ids))))
    (println "Tag counts by type")
    (prn (sort-by second >
                  (map (fn [[type tag-map]]
                         [type (apply + (vals tag-map))])
                       (db/tag-counts-by-type-and-tag-for-ids ids))))
    (println "Node counts by type")
    (util/pprint (db/attr-counts-for-ids :type ids))))

(cmd/command {:command :kukui.query-types-counts
              :desc "kukui: Same as :types-counts but for query file"
              :exec (fn []
                      (query-types-counts (pool/last-active)))})

;; (let [line (.-line (editor/cursor ed))]
;;       (prn (range line (c/safe-next-non-child-line ed line))))
(defn lh->entity [lh]
  {:text (.-text lh)
   :id (aget lh "kukui-id")
   :line (.lineNo lh)})

(defn update-file-from-query-sync [path lines]
  (let [content (s/split (:content (files/open-sync path)) #"\n")]
    (s/join "\n"
            (map-indexed
             (fn [i line]
               (if-let [new-line (some #(when (= i (:line %)) %) lines)]
                 (str (re-find #"^\s*" line) (s/triml (:text new-line)))
                 line))
             content))))

(defn files-must-be-in-sync [ids]
  (let [files (set (keep (comp :file d/entity) ids))
        [ed-files not-ed-files] ((juxt filter remove) #(-> % pool/by-path first) files)
        dirty (filter :dirty (map #(-> % pool/by-path first deref) [file]))]
    (when (seq not-ed-files)
      (prn "Unable to verify these files not in buffers:" not-ed-files))
    (when (seq dirty)
      (prn "DIRTY" dirty)
      (throw (ex-info (str "Following files are dirty or not in an editor: " dirty) {})))))

(defn query-sync []
  (let [ed (pool/last-active)
        lhs (ed->db-line-handles ed)
        ents (map lh->entity lhs)
        _ (files-must-be-in-sync (map :id ents))
        lines-to-update (sync/query-sync ents)]
    (doseq [[path lines] (group-by :file lines-to-update)]
      (files/save path (update-file-from-query-sync path lines)))))

(cmd/command {:command :kukui.query-sync
              :desc "kukui: Syncs query file to db"
              :exec query-sync})

(comment
  (def lines [{:line 6 :text "codez" :file "ok"}
              {:line 8 :text "  whatever" :file "ok"}])
  (def ids (map #(aget % "kukui-id") (ed->db-line-handles ed)))
  (d/entity 2096)
  (def lh (editor/line-handle ed 11))
  (aget lh "kukui-id")
  (.on lh "delete" (fn [line obj]
                     (.log js/console "DELETED" line)
                     ))
  (.on (:ed @ed) "change" (fn [_ obj]
                            (println "CHANGE")
                            (.log js/console obj)))

  (def path (:path (last @query-history)))
  (def ed (first (pool/by-path path)))
  (:dirty @ed)
  (-> @ed :doc deref :doc .getValue (s/split #"\n"))
  )
