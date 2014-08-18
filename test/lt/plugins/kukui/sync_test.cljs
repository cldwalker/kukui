(ns lt.plugins.kukui.sync-test
  (:require-macros [cemerick.cljs.test :refer [is deftest testing use-fixtures]])
  (:require [lt.plugins.kukui.sync :as sync]
            [lt.plugins.kukui.db :as db]
            [lt.plugins.kukui.datascript :as d]
            [lt.plugins.kukui.core :as kc]
            [cemerick.cljs.test :as t]))

(use-fixtures :each (fn [f]
                      (sync/reset-sync!)
                      (f)))

(def default-file "/some/path")

(defn ->nodes [nodes file]
  (->> nodes
       kc/add-attributes-to-nodes
       (mapv
        #(assoc %
           :file file
           :indent (count (re-find #"^\s*" (:text %)))))))

(defn sync [nodes]
  (sync/sync (->nodes nodes default-file) default-file))

;; Add
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

(deftest named-entity-uses-last-type-in-sync
  (sync [{:text "rooting for #messi #type:note" :line 0}
         {:text "#name:messi #type:person" :line 1}])
  (is (= "person"
         (:type (d/find-first :name "messi")))))

(deftest add-blank-node-is-ignored
  (sync [{:text "   " :line 0}])
  (is (empty? (d/q '[:find ?e :where [?e :line 0]])))
  (is (seq (d/last-tx))
      "Last-tx should reflect last actual transaction - not empty one"))

(deftest add-default-type-if-none-given
  (sync [{:text "What is this?" :line 0}])
  (is (= db/unknown-type
         (:type (db/find-by-file-and-line default-file 0)))))

;; Delete
(deftest delete-text-line
  (sync [{:text "drink chocolate #type:td" :line 0}])
  (sync [{:text "drink coffee #type:td" :line 1}])
  (is (= '(1)
         (d/qf '[:find ?line
                  :where [?e :line ?line]]))))

;; Update
(deftest update-line
  (let [node {:text "drink coffee #type:td" :line 0}
        updated-nodes [{:text "drink chocolate #type:td" :line 0}
                       (assoc node :line 1)]]
    (sync [node])
    (let [existing (db/find-by-file-and-line default-file 0)]
      (sync updated-nodes)
      (is (= (nth updated-nodes 1)
             (select-keys (d/entity (:db/id existing))
                          [:text :line]))))))

(deftest named-entity-updates-line-or-text
  (let [node {:text "#name:fan blows oh so nicely #type:note" :line 0}
        updated-nodes [{:text "#summer #type:note" :line 0}
                       (-> node (update-in [:text] #(str "  " %)) (assoc :line 1))]]
    (sync [node])

    (let [existing (d/find-first :name "fan")]
      (sync updated-nodes)
      (is (= (nth updated-nodes 1)
             (select-keys (d/entity (:db/id existing))
                          [:text :line]))))))

(deftest named-entity-updates-type
  (sync [{:text "rooting for #messi #type:note" :line 0}])
  (let [existing (d/find-first :name "messi")]
    (sync [{:text "rooting for #messi #type:note" :line 0}
           {:text "#name:messi #type:person" :line 1}])
    (is (= "person"
           (:type (d/entity (:db/id existing)))))))

(deftest update-same-line-when-multiple-files
  (sync [{:text "file 1 #type:td" :line 0}])
  (sync/sync (->nodes [{:text "file 2 #type:td" :line 0}] "/another/path") "/another/path")
  (sync [{:text "pre file 1 #type:td" :line 0}
         {:text "file 1 #type:td" :line 1}])
  (is (=
       #{["/another/path" 0 "file 2 #type:td"]
         ["/some/path" 1 "file 1 #type:td"]
         ["/some/path" 0 "pre file 1 #type:td"]}
       (d/q '[:find ?file ?line ?text
              :where
              [?e :file ?file]
              [?e :text ?text]
              [?e :line ?line]]))))

;; Query sync

(defn ->ent-id [m]
  (d/transact! (sync/expand-tags (->nodes [m] default-file)))
  (:db/id (d/find-first :text (:text m))))

(defn query-sync [& ents]
  (map #(dissoc % :db/id :indent :tags)
       (apply sync/query-sync ents)))

(deftest query-sync-updates
  (testing "text without file update"
    (is
     (d/transact! [{:text "  wow"}])
     (when-let [id (:db/id (d/find-first :text "  wow"))]
       (and (empty? (sync/query-sync [{:id id :text "really wow"}]))
            (= "  really wow" (:text (d/entity id)))))))
  (testing "text with file update"
    (is
     (let [node {:text "  wowz" :line 0 :file default-file}]
       (when-let [id (->ent-id node)]
         (= (list (assoc node :text "  really wowz"))
            (query-sync [{:id id :text "really wowz"}]))))))
  (testing "text with import file update"
    (is
     (let [node {:text "  wowd"}]
       (when-let [id (->ent-id node)]
         (= (list {:text "  really wowd" :update-type :append :file default-file})
            (query-sync [{:id id :text "really wowd"}] default-file true))))))
  (testing "text and tags"
    (is
     (when-let [id (->ent-id {:text "this #is #awesome" :line 0 :file default-file})]
       (and
        (= (list {:line 0 :file default-file :text "this #was #awesome"})
           (query-sync [{:id id :text "this #was #awesome" :tags #{"was" "awesome"}}]
                       default-file true))
        (= #{"was" "awesome"}
           (->> (d/entity id) :tags (map (comp :name d/entity)) set))))))
  (testing "desc attribute"
    (is
     (let [node {:text "oh the possibilities" :url "http://gifsound.com" :line 0 :file default-file}]
       (when-let [id (->ent-id node)]
         (= (list (assoc node :url "http://giphy.com"))
            (query-sync [{:id id :text (:text node) :url "http://giphy.com"}]))))))
  (testing "desc and preserves whitespace"
    (is
     (let [node {:text "jetblue" :line 0 :file default-file :desc [{:text "  + decent leg room"}]}]
       (when-let [id (->ent-id node)]
         (= (list (assoc node :desc [{:text "  + no wifi ya bastards"}]))
            (query-sync [{:id id
                                  :text "  jetblue"
                                  :desc [{:text "    + no wifi ya bastards"}]}]))))))
  (testing "except if no-text chars"
    (is
     (when-let [id (->ent-id {:text ""})]
       (sync/query-sync [{:id id :text "  ---"}])
       (= "" (:text (d/entity id)))))))

(comment
  (sync/reset-sync!)

  (sync/sync [{:text "whoop" :type "td"}] "/ok/path")
  (d/qe '[:find ?e
          :where [?e]])
  (d/transact! [{:db/id 3 :tags [2]}])
  (d/entity 3)
  (d/transact! [[:db/retract 3 :tags 2]])
  (-> @sync/last-edits vals first)
  (reset! sync/last-edits {})
  (-> @d/reports last :tx-data (filter))
  (:max-eid (:db-after (last @d/reports))))
