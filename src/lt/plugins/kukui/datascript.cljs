(ns lt.plugins.kukui.datascript
  "Datascript helper fns"
  (:require [datascript :as d]
            [clojure.set :as cset])
  (:refer-clojure :exclude [count]))

(def conn "A datascript connection" nil)
(def reports "Holds a history of all entities with their TxReports" (atom []))

(defn last-tx []
  (:tx-data (last @reports)))

;; Wrap conn-implicit fns in a protocol when necessary
(defn reset-connection! [& args]
  (set! conn (apply d/create-conn args))
  (reset! reports [])
  (d/listen! conn :db-history #(swap! reports conj %)))

(defn transact! [records]
  (d/transact! conn records))

;; thanks to datascript
(defn parse-query [query]
  (loop [parsed {} key nil qs query]
    (if-let [q (first qs)]
      (if (keyword? q)
        (recur parsed q (next qs))
        (recur (update-in parsed [key] (fnil conj []) q) key (next qs)))
      parsed)))


(defn lint-rules*
  "Returns set of invalid rules for a given query and all its args (which include rules)"
  [query args]
  (let [query-map (d/parse-query query)]
    (when (= '% (second (:in query-map)))
      (let [user-rules (set (keep #(when (list? %) (first %)) (:where query-map)))
            valid-rules (set (map ffirst (first args)))]
        (cset/difference user-rules valid-rules)))))

(defn lint-rules
  "Throws an error if rule is invalid in :where clause. Any where clause that is list
  qualifies as a rule. Consider moving into dlint."
  [query args]
  (when-let [invalid (seq (lint-rules* query args))]
    (throw (ex-info (str "Following rules are invalid: " invalid) {}))))

(defn q [query & args]
  (assert (or (map? query) (vector? query)))
  (lint-rules query args)
  (apply d/q query @conn args))

(defn qf [query & args]
  (map first
       (apply q query args)))

(defn entity [id]
  (d/entity @conn id))

(defn qe [query & args]
  (map #(entity (first %))
       (apply q query args)))

(defn qae
  "Expands entities for :find symbols that start with ?e"
  [query & args]
  (let [fns (map #(if (.startsWith (str %) "?e")
                    entity identity)
                 (:find (d/parse-query query)))]
    (map
     (fn [result]
       (mapv #(%1 %2) fns result))
     (apply q query args))))

(defn find-by
  "Returns entity maps for given attr and value"
  [attr value]
  (qe '[:find ?e
               :in $ ?attr ?type
               :where [?e ?attr ?type]]
             attr value))

(defn find-first
  "Returns first entity map for given attr and value"
  [attr value]
  (first (find-by attr value)))

(defn find-all
  "Returns all entities as maps"
  []
  (qe '[:find ?e
        :where [?e]]))

(defn count
  "Return total entity count"
  []
  (ffirst
   (q '[:find (count ?e)
        :where [?e]])))

(let [counter (atom 0)]
  (defn tempid []
    (swap! counter dec)))
