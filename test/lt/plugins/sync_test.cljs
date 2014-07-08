(ns lt.plugins.kukui.sync-test
  (:require-macros [cemerick.cljs.test :refer [is deftest testing]])
  (:require [lt.plugins.kukui.sync :as sync]
            [lt.plugins.kukui.db :as db]
            [cemerick.cljs.test :as t]))

(deftest first-add
  (db/init)
  (let [new-node {:text "drink coffee #type:td" :line 0 :indent 0 :type "td"}
        tx-data (sync/sync [new-node] "/some/path")
        eid (get-in tx-data [:db-after :max-eid])]
    (is (= (assoc new-node :db/id eid)
           (db/entity eid)))))

(deftest second-add
  (db/init)
  (sync/sync [{:text "drink chocolate #type:td" :line 0 :indent 0 :type "td"}] "/some/path")
  (sync/sync [{:text "drink coffee #type:td" :line 1 :indent 0 :type "td"}] "/some/path")
  (assert (= 2
             (count (db/q '[:find ?e
                            :where [?e :text]])))))

(comment
  (reset! sync/last-edits {})
  (:max-eid (:db-after (last @db/reports))))
