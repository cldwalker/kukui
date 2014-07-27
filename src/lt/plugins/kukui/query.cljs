(ns lt.plugins.kukui.query
  (:require [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.command :as cmd]
            [lt.objs.files :as files]
            [cljs.reader :as reader]
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

(defn ent->nodes [ent level]
  (let [ent (if (string? ent) {:text ent} ent)]
    (into [{:level level :text (ent-text ent)}]
        (map #(hash-map :level (inc level) :text (ent-text %))
             (:desc ent)))))

(defn find-one-query->nodes [query args]
  (let [ents (apply d/qe query db/rules args)]
    (vec (mapcat #(ent->nodes % 1) ents))))

(defn find-two-query->nodes [query args]
  (let [results (->> (apply d/qae query db/rules args)
                     (group-by first)
                     (map (fn [[k pairs]] [k (map second pairs)])))]
    (vec (mapcat (fn [[group-key ents]]
              (into [{:text group-key :level 1}]
                    (mapcat #(ent->nodes % 2) ents)))
            results))))

(defn query->nodes [query & args]
  (println "Query:" query "\nArgs:" args)
  (let [finds (count (:find (ds/parse-query query)))]
    (case finds
      1 (find-one-query->nodes query args)
      2 (find-two-query->nodes query args)
      (throw (ex-info (str "No render found for " finds " finds") {})))))

;; Use #fn in queries to refer to fns in cljs.core
(reader/register-tag-parser! 'fn #(aget cljs.core
                                        (clojure.string/replace (str %) "-" "_")))
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

(cmd/command {:command :kukui.query-with-named-queries
              :desc "kukui: Open db query in temp file"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (s/triml (editor/line ed (.-line (editor/cursor ed))))
                            query-and-args (input->query-and-args line)
                            nodes (apply query->nodes query-and-args)
                            result (kc/tree->string nodes (editor/option ed "tabSize"))
                            path (util/tempfile "kukui-query" ".otl")]
                        (files/save path result)
                        (cmd/exec! :open-path path)))})

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
          (into [{:level 1 :text leftover-tag}]
                 (mapcat #(ent->nodes % 2) leftover-nodes))))))

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

(cmd/command {:command :kukui.query-with-datascript
              :desc "kukui: Execute a datascript query"
              :exec (fn []
                     (let [ed (pool/last-active)
                           line (editor/line ed (.-line (editor/cursor ed)))
                           query (reader/read-string line)
                           result (d/qae query)]
                       (util/pprint result)) )})
