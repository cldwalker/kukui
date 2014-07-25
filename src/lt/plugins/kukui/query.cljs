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
            [lt.plugins.kukui.db :as db]
            [lt.plugins.kukui.util :as util]))

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
    (into [{:text (str query) :level 1}]
          (mapcat #(ent->nodes % 2) ents))))

(defn find-two-query->nodes [query args]
  (let [results (->> (apply d/qae query db/rules args)
                     (group-by first)
                     (map (fn [[k pairs]] [k (map second pairs)])))]
    (into [{:text (str query) :level 1}]
          (mapcat (fn [[group-key ents]]
                    (into [{:text group-key :level 2}]
                          (mapcat #(ent->nodes % 3) ents)))
                  results))))

(defn query->nodes [query & args]
  (println "Query:" query)
  (println "Args:" args)
  (let [finds (count (:find (ds/parse-query query)))]
    (case finds
      1 (find-one-query->nodes query args)
      2 (find-two-query->nodes query args)
      (throw (ex-info (str "No render found for " finds " finds") {})))))

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

(cmd/command {:command :kukui.db-query-temp-file
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

(cmd/command {:command :kukui.query-with-datascript
              :desc "kukui: Execute a datascript query"
              :exec (fn []
                     (let [ed (pool/last-active)
                           line (editor/line ed (.-line (editor/cursor ed)))
                           query (reader/read-string line)
                           result (d/qae query)]
                       (util/pprint result)) )})
