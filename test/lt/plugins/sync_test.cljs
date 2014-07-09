(ns lt.plugins.kukui.sync-test
  (:require-macros [cemerick.cljs.test :refer [is deftest testing use-fixtures]])
  (:require [lt.plugins.kukui.sync :as sync]
            [lt.plugins.kukui.db :as db]
            [cemerick.cljs.test :as t]))

(defn reset-sync! []
  (db/init)
  (reset! sync/last-edits {}))

(use-fixtures :each reset-sync!)

(deftest add-on-first-edit
  (let [new-node {:text "drink coffee #type:td #food" :line 0 :indent 0 :type "td" :tags #{"food"}}]
    (sync/sync [new-node] "/some/path")
    (is (seq (db/q '[:find ?e
                     :in $ ?text
                     :where
                     [?e :text ?text]
                     [?e :tags ?tag]
                     [?tag :name "food"]]
                   (:text new-node))))))


(deftest add-on-second-edit
  (let [nodes [{:text "drink chocolate #type:td" :line 0 :indent 0 :type "td"}]]
    (sync/sync nodes "/some/path")
    (sync/sync (conj nodes {:text "drink coffee #type:td" :line 1 :indent 0 :type "td"}) "/some/path"))
  (is (= 2
         (count (db/q '[:find ?e
                        :where [?e :text]])))))

(deftest add-with-tag-from-other-node
  (sync/sync [{:name "some?" :type "fn" :text "#name:some? #type:fn" :indent 0 :line 0}
              {:text "such a great name #some? #type:td" :tags #{"some?"} :type "td" :indent 0 :line 1}] "/some/path")
  (is (seq (db/q '[:find ?e
                   :where
                   [?e :tags ?tag]
                   [?tag :name "some?"]])))

(deftest delete-text-line
  (sync/sync [{:text "drink chocolate #type:td" :line 0 :indent 0 :type "td"}] "/some/path")
  (sync/sync [{:text "drink coffee #type:td" :line 1 :indent 0 :type "td"}] "/some/path")
  (is (= '(1)
         (db/qf '[:find ?line
                  :where [?e :line ?line]]))))

(deftest update-line
  (let [node {:text "drink coffee #type:td" :line 0 :indent 0 :type "td"}
        updated-nodes [{:text "drink chocolate #type:td" :line 0 :indent 0 :type "td"}
                       (assoc node :line 1)]]
    (sync/sync [node]  "/some/path")
    (sync/sync updated-nodes "/some/path")
    (is (= updated-nodes (map
                          #(dissoc % :db/id)
                          (db/qe '[:find ?e
                                   :where [?e :text]]))))))

(comment
  (reset-sync!)

  (sync/sync [{:text "whoop" :type "td"}] "/ok/path")
  (db/entity 5)
  (db/qe '[:find ?e
           :where [?e]])
  (-> @sync/last-edits vals first)
  (reset! sync/last-edits {})
  (-> @db/reports last :tx-data (filter))
  (:max-eid (:db-after (last @db/reports))))
