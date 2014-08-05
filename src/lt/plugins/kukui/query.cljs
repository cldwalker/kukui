(ns lt.plugins.kukui.query
  (:require [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.command :as cmd]
            [lt.objs.files :as files]
            [lt.objs.notifos :as notifos]
            [cljs.reader :as reader]
            [clojure.set :as cset]
            [clojure.string :as s]
            [lt.plugins.kukui.core :as kc]
            [lt.plugins.kukui.datascript :as d]
            [datascript :as ds]
            [lt.plugins.kukui.selector :as selector]
            [lt.plugins.kukui.db :as db]
            [lt.plugins.kukui.util :as util]))

(def leftover-tag "leftover")

(defn ent-text [ent]
  (or (:text ent)
      (pr-str (dissoc ent :db/id))))

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

(defn input->path [ed input]
  (let [query-and-args (input->query-and-args input)
        nodes (apply query->nodes query-and-args)
        result (kc/tree->string nodes (editor/option ed "tabSize"))
        path (util/tempfile "kukui-query" ".otl")
        lines-ids (->> nodes
                       (map-indexed #(assoc %2 :line %1))
                       (filter :id)
                       (map (juxt :line :id))
                       (into {}))]
    (files/save path result)
    (swap! query-history conj {:input input :path path :lines-ids lines-ids})
    path))

(defn add-ids-to-last-query-file []
  (let [query (last @query-history)
        ed (first (pool/by-path (:path query)))]
    (doseq [[line id] (:lines-ids query)]
      (aset (editor/line-handle ed line) "kukui-id" id))))

(cmd/command {:command :kukui.query-and-open-file
              :desc "kukui: Opens query results in a temp file as an outline"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (s/triml (editor/line ed (.-line (editor/cursor ed))))
                            path (input->path ed line)]
                        (cmd/exec! :open-path path)
                        (add-ids-to-last-query-file)))})

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
                            result (kc/tree->string nodes (editor/option ed "tabSize"))
                            path (util/tempfile "kukui-query" ".otl")]
                        (files/save path result)
                        (util/ensure-and-focus-second-tabset)
                        (cmd/exec! :open-path path)))})

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
    (cmd/exec! :open-path path)
    (add-ids-to-last-query-file)))

(cmd/command {:command :kukui.open-entity-tagged
              :desc "kukui: Opens current word as tagged entity query"
              :exec (partial current-word-query "(ent-by-type \"%s\")" )})

(cmd/command {:command :kukui.open-entity
              :desc "kukui: Opens current word as entity query"
              :exec (partial current-word-query "[?e :name \"%s\"]")})

(cmd/command {:command :kukui.open-entity-type
              :desc "kukui: Opens current word as entity type query"
              :exec (partial current-word-query "[?e :type \"%s\"]")})

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
              :exec (fn [history-item]
                      (if (.contains (util/current-file) "kukui-query") ;; in a query file
                        (util/update-editor-path! (pool/last-active) (:path history-item))
                        (cmd/exec! :open-path (:path history-item))))})

(cmd/command {:command :kukui.jump-to-query-result-source
              :desc "kukui: Jump to a query result's line and file"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))]
                        (if-let [entity (some-> (aget (editor/line-handle ed line) "kukui-id")
                                                d/entity)]
                          (if (and (:file entity) (:line entity))
                            (do (cmd/exec! :open-path (:file entity))
                              (cmd/exec! :goto-line (inc (:line entity))))
                            (notifos/set-msg! (str "No file and line exists for entity " (:id entity))
                                              {:class "error"}))
                          (notifos/set-msg! (str "No entity found for line " (inc line))
                                            {:class "error"}))))})
(comment
  (def lh (editor/line-handle ed 17))
  (.on lh "delete" (fn [line obj]
                     (.log js/console "DELETED" line)
                     ))
  (.on (:ed @ed) "change" (fn [_ obj]
                            (println "CHANGE")
                            (.log js/console obj)))
  (aset (editor/line-handle ed 17) "kukui-id" 2096)
  (aget (editor/line-handle ed 17) "kukui-id")

  (def path (:path (last @query-history)))
  (def ed (first (pool/by-path path)))
  )
