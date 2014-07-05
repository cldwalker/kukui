(ns lt.plugins.kukui.db
  "In-memory DB for nodes, types, things"
  (:require [datascript :as d]))

(def conn (d/create-conn {:tags {:db/valueType :db.type/ref
                                 :db/cardinality :db.cardinality/many}}))
(def reports (atom []))
(d/listen! conn :db-history #(swap! reports conj %))

(defn transact! [records]
  (d/transact! conn records))

(defn q [query & args]
  (apply d/q query @conn args))

(defn entity [id]
  (d/entity @conn id))

(defn qe [query & args]
  (map #(entity (first %))
       (apply q query args)))

(let [counter (atom 0)]
  (defn tempid []
    (swap! counter dec)))

(transact! [{:name "type" :type "type"}])
