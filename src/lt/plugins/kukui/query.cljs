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
  (into [{:level level :text (ent-text ent)}]
        (map #(hash-map :level (inc level) :text (ent-text %))
             (:desc ent))))

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

(def aliased-queries
  "Aliased queries for use with db-query-temp-file"
  {'tag1-type2  '[:find ?type ?e
                  :in $ % ?tag
                  :where (tagged-with ?e ?tag) [?e :type ?type]]})

(defn unalias-query
  "If aliased-queries has a matching entry, return it along with args.

  For example:
  (tag1-type2 'kukui') => [:tag1-type2-query 'kukui']"
  [query-string]
  (let [[alias & args] (reader/read-string query-string)]
    (when-let [aliased-query (get aliased-queries alias)]
      (into [aliased-query] args))))

(defn input->query-and-args [input]
  (let [aliased-query (unalias-query input)]
    (cond
     aliased-query aliased-query
     (re-find #"^\s*\[:find" input) [(reader/read-string input)]
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
                           result (d/q query)
                           result (if (every? #(and (= 1 (count %))
                                                    (integer? (first %)))
                                              result)
                                    (map #(d/entity (first %)) result)
                                    result)]
                       (util/pprint result)) )})
