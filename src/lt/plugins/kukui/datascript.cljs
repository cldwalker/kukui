(ns lt.plugins.kukui.datascript
  "Datascript helper fns"
  (:require [datascript :as d]))

(def conn "A datascript connection" nil)
(def reports "Holds a history of all entities with their TxReports" (atom []))

;; Wrap conn-implicit fns in a protocol when necessary
(defn reset-connection! [& args]
  (set! conn (apply d/create-conn args))
  (reset! reports [])
  (d/listen! conn :db-history #(swap! reports conj %)))

(defn transact! [records]
  (d/transact! conn records))

(defn q [query & args]
  (apply d/q query @conn args))

(defn qf [query & args]
  (map first
       (apply q query args)))

(defn entity [id]
  (d/entity @conn id))

(defn qe [query & args]
  (map #(entity (first %))
       (apply q query args)))

(defn find-first [attr value]
  (first (qe '[:find ?e
               :in $ ?attr ?type
               :where [?e ?attr ?type]]
             attr value)))

(let [counter (atom 0)]
  (defn tempid []
    (swap! counter dec)))
