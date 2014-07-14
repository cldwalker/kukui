(ns lt.plugins.kukui.sync-test
  (:require-macros [cemerick.cljs.test :refer [is deftest testing use-fixtures]])
  (:require [lt.plugins.kukui.sync :as sync]
            [lt.plugins.kukui.db :as db]
            [lt.plugins.kukui.datascript :as d]
            [lt.plugins.kukui.core :as kc]
            [cemerick.cljs.test :as t]))

(defn reset-sync! []
  (db/init)
  (reset! sync/last-edits {}))

(use-fixtures :each (fn [f]
                      (reset-sync!)
                      (f)))

(defn ->nodes [nodes]
  (->> nodes
       kc/add-attributes-to-nodes
       (mapv
        #(assoc % :indent (count (re-find #"^\s*" (:text %)))))))

(defn sync [nodes]
  (sync/sync (->nodes nodes) "/some/path"))

(deftest add-on-first-edit
  (let [new-node {:text "drink coffee #type:td #food" :line 0}]
    (sync [new-node])
    (is (seq (d/q '[:find ?e
                     :in $ ?text
                     :where
                     [?e :text ?text]
                     [?e :tags ?tag]
                     [?tag :name "food"]]
                   (:text new-node))))))


(deftest add-on-second-edit
  (let [nodes [{:text "drink chocolate #type:td" :line 0}]]
    (sync nodes)
    (sync (conj nodes {:text "drink coffee #type:td" :line 1})))
  (is (= 2
         (count (d/q '[:find ?e
                        :where [?e :text]])))))

(deftest add-with-tag-from-other-node
  (sync [{:text "#name:some? #type:fn" :line 0}
         {:text "such a great name #some? #type:td" :line 1}])
  (is (seq (d/q '[:find ?e
                   :where
                   [?e :tags ?tag]
                   [?tag :name "some?"]]))))

(deftest delete-text-line
  (sync [{:text "drink chocolate #type:td" :line 0}])
  (sync [{:text "drink coffee #type:td" :line 1}])
  (is (= '(1)
         (d/qf '[:find ?line
                  :where [?e :line ?line]]))))

(deftest update-line
  (let [node {:text "drink coffee #type:td" :line 0}
        updated-nodes [{:text "drink chocolate #type:td" :line 0}
                       (assoc node :line 1)]]
    (sync [node])
    (sync updated-nodes)
    (is (= updated-nodes (map
                          #(select-keys % [:text :line])
                          (d/qe '[:find ?e
                                  :where [?e :text]]))))))

(deftest tag-can-have-its-entity-updated-later
  (sync [{:text "rooting for #messi #type:note" :line 0}
         {:text "#name:messi #type:person" :line 1}])
  (is (= "person"
         (:type (d/find-first :name "messi")))))

(deftest named-entity-can-update-type
  (sync [{:text "rooting for #messi #type:note" :line 0}])
  (sync [{:text "rooting for #messi #type:note" :line 0}
         {:text "#name:messi #type:person" :line 1}])
  (is (= "person"
         (:type (d/find-first :name "messi")))))

(comment
  (reset-sync!)

  (sync/sync [{:text "whoop" :type "td"}] "/ok/path")
  (d/entity 5)
  (d/qe '[:find ?e
          :where [?e]])
  (-> @sync/last-edits vals first)
  (reset! sync/last-edits {})
  (-> @d/reports last :tx-data (filter))
  (:max-eid (:db-after (last @d/reports))))
