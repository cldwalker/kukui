(ns lt.plugins.kukui.sync
  "Syncs a file to a db"
  (:require [lt.plugins.kukui.db :as db]
            [lt.plugins.kukui.node :as node]
            [lt.objs.editor.pool :as pool]
            [lt.objs.command :as cmd]))

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

(defn ->tag-id
  "Given a tag name and a number of data structures it could be in,
  return an existing or new :db/id for it"
  [entities existing-tags new-tags tag-name]
  (or (get existing-tags tag-name)
      (get @new-tags tag-name)
      (first (filter #(= (:name %) tag-name) entities))
      (let [id (db/tempid)]
        (swap! new-tags assoc % id)
        id)))

(defn expand-tags [entities]
  (let [new-tags (atom {})
        tag-id (partial ->tag-id entities (name-id-map) new-tags)
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

(cmd/command {:command :kukui.sync-file-to-db
              :desc "kukui: Syncs file to db"
              :exec (fn []
                      (let [ed (pool/last-active)
                            nodes (node/ed->nodes ed)]
                        (def nodes nodes)
                        #_(sync nodes)))})


(comment
  (-> nodes)
  (sync nodes)

  (expand-tags [{:text "ok" :tags #{"dude"}}])
  (def tx (db/transact! [{:type "lang" :name "ruby"} {:text "woah" :tags 5}]))

  ;; counts by type
  (sort-by (comp - second)
           (db/q '[:find ?type (count ?e)
                   :where
                   [?e :type ?type]]))

  ;; counts by tag - FIX
  (db/q '[:find ?e
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
          :where [?e]])

  ;; find all
  (db/qe '[:find ?e
           :where [?e]])

  ;; last-tx
  (:tx-data (last @reports))
  ;; delete attr
  (db/transact! [:db/retract 2 :tags 4])
  ;; update
  (db/transact! [{:db/id 128 :type "plang"}])
  ;; delete
  (db/transact! [[:db.fn/retractEntity 551]])

  )
