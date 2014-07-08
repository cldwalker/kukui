(ns lt.plugins.kukui.db
  "In-memory DB for nodes, types, things"
  (:require [datascript :as d]))

(def conn "A datascript connection" nil)
(def reports "Holds a history of all entities through their TxReports" (atom []))

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

(defn init []
  (set! conn (d/create-conn {:tags {:db/valueType :db.type/ref
                                   :db/cardinality :db.cardinality/many}}))
  (reset! reports [])
  (d/listen! conn :db-history #(swap! reports conj %))
  (transact! [{:name "type" :type "type"}]))

(init)

(comment
 (transact! [{:db/id -1 :name "dude" :tags -2} {:db/id -2 :name "cool"}])
  )
