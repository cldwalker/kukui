(ns lt.plugins.kukui.sync
  "Syncs a file to a db"
  (:require [lt.plugins.kukui.db :as db]
            [clojure.set :as cset]))

(defn name-id-map []
  (into {} (remove (comp nil? first)
                   (db/q '[:find ?n ?e
                           :where [?e :name ?n]]))))

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
  (let [existing-types (set (db/qf '[:find ?type
                                     :where [?e :type ?type]]))]
    (->> entities
         (keep :type)
         set
         (remove #(contains? existing-types %))
         (map #(hash-map :name % :type "type"))
         (into entities))))

(defn node-diff [nodes1 nodes2]
  (let [old-nodes (into {} (map (juxt :text identity) nodes1))
        changes {:deleted (cset/difference (set nodes1) (set nodes2))}]
    (reduce
     (fn [accum node]
       (let [old-node (get old-nodes (:text node))]
         (if (nil? old-node)
           ;; could be updated text
           (update-in accum [:added] (fnil conj []) node)
           (if (not= (:line old-node) (:line node))
             (-> accum
                 (update-in [:updated] (fnil conj [])
                            {:line (:line old-node)
                             :new-line (:line node)})
                 (update-in [:deleted] disj old-node))
             accum))))
     changes
     nodes2)))

(defn ->new-entities [nodes]
  (->> nodes
       add-types
       expand-tags
       must-have-unique-name
       must-require-type))

(defn add-ids-by-line [nodes]
  (let [line-entities (into {} (db/q '[:find ?l ?e
                                       :where [?e :line ?l]]))

        ents (map #(assoc % :db/id (get line-entities (:line %)))
                  nodes)
        invalid-lines (map :line (filter #(nil? (:db/id %)) ents))]
    (when (seq invalid-lines)
      (prn "Invalid lines" invalid-lines)
      (throw (ex-info (str "Cannot find entities with these lines: " (pr-str invalid-lines))
                      {:lines invalid-lines})))
    ents))

(defn sync-entities [nodes file]
  (let [{:keys [added deleted updated]} (node-diff (-> @last-edits (get file) last)
                                                   nodes)]
    {:added (->new-entities added)
     :updated (->> updated
                   add-ids-by-line
                   (mapv #(hash-map :db/id (:db/id %)
                                    :line (:new-line %))))
     :deleted (->> deleted
                   add-ids-by-line
                   (mapv #(vector :db.fn/retractEntity (:db/id %))))}))

(def last-edits
  "Maps files to their last few node snapshots.
  Used to determine what changed since last edit."
  (atom {}))

(defn save-latest-edit [nodes file]
  (swap! last-edits update-in [file]
         #(concat (take-last 2 %)
                  (list nodes))))

(defn sync [nodes file]
  (let [{:keys [added deleted updated]} (sync-entities nodes file)]
    (println "Added/deleted/updated: "
             (count added) "/"
             (count deleted) "/"
             (count updated-entities))
    ;; Must be separate since there may be overlap
    (db/transact! deleted)
    (let [tx-report (db/transact! (into updated added))]
      (save-latest-edit nodes file)
      tx-report)))

(comment
  ;; diff
  (def current-edits (-> @last-edits vals first))
  (-> current-edits count)
  (def nd (apply node-diff (take-last 2 current-edits)))
  (->> nd :deleted )
  (sync nodes "/Users/me/docs/notes/comp/clojure.otl")
  (def tx (db/transact! [{:type "lang" :name "ruby"} {:text "woah" :tags 5}]))

  ;; counts by type
  (sort-by (comp - second)
           (db/q '[:find ?type (count ?e)
                   :where
                   [?e :type ?type]]))

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
  (db/transact! [[:db.fn/retractEntity 2]])

  )
