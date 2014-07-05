(ns lt.plugins.kukui.sync
  "Syncs a file to a db"
  (:require [lt.plugins.kukui.db :as db]))

(defn name-id-map []
  (into {} (db/q '[:find ?n ?e
                   :where [?e :name ?n]])))

(defn must-have-unique-name [entities]
  (let [existing-tags (name-id-map)
        names (set (keys existing-tags))
        invalid (filter #(and (:name %) (contains? names (:name %))) entities)
        invalid (->> entities
                     (filter :name)
                     (group-by :name)
                     vals
                     (mapcat #(when (> (count %) 1) %))
                     (into invalid))]
    (when (seq invalid)
      (prn "INVALID" invalid)
      (throw (ex-info (str "Names must be unique: " (map :name invalid))
                      {:names (map :name invalid)})))
    entities))

(defn must-require-type [entities]
  (let [invalid (->> entities
                     (remove #(or (integer? (:tags %))
                                  (seq (:tags %))))
                     (remove :type))]
    (when (seq invalid)
      (prn "INVALID" invalid)
      (throw (ex-info (str "Type must be present")
                      {:invalid invalid})))
    entities))

(def unknown-type "unknown")

(defn expand-tags [entities]
  (let [existing-tags (name-id-map)
        new-tags (atom {})
        tag-id #(or (get existing-tags %)
                    (get @new-tags %)
                    (first (filter (fn [ent] (= (:name ent) %)) entities))
                    (let [id (db/tempid)]
                      (swap! new-tags assoc % id)
                      id))
        entities-with-tags (doall
                            (->> entities
                                 (map #(assoc % :db/id (db/tempid)))
                                 (mapcat (fn [ent]
                                           (into [(dissoc ent :tags)]
                                                 (map #(hash-map :db/id (:db/id ent) :tags (tag-id %))
                                                      (:tags ent)))))))]
    (into (map (fn [[tag id]]
                 {:db/id id :name tag :type unknown-type})
               @new-tags)
          entities-with-tags)))

(defn add-types [entities]
  (into
   entities
   (map
    #(hash-map :name % :type "type")
    (set (keep :type entities)))))

(defn sync [nodes]
  (->> nodes
       add-types
       expand-tags
       must-have-unique-name
       must-require-type
       db/transact!))

(comment
  (->> lt.plugins.kukui/nodes
       count)

  (sync lt.plugins.kukui/nodes)


  (def tx (db/transact! [{:type "lang" :name "ruby"} {:text "woah" :tags 5}]))

  ;; counts by type
  (db/q '[:find ?type (count ?e)
       :where
       [?e :type ?type]])

  ;; counts by tag - FIX
  (db/q '[:find ?tag (count ?e)
          :where
          [?e :tags ?t]
          [?t :name ?tag]])

  ;; find-tagged
  (db/qe '[:find ?e
        :in $ ?tag
        :where
        [?e :tags ?t]
        [?t :name ?tag]]
      "cljs")

  ;; total count
  (db/q '[:find (count ?e)
       :where
       [?e]])

  ;; last-tx
  (:tx-data (last @reports))
  ;; delete attr
  (db/transact! [:db/retract 2 :tags 4])
  ;; update
  (db/transact! [{:db/id 128 :type "plang"}])
  ;; delete
  (db/transact! [[:db.fn/retractEntity 551]])

  )
