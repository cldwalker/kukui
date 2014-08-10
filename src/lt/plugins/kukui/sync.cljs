(ns lt.plugins.kukui.sync
  "Syncs a file to a db"
  (:require [lt.plugins.kukui.db :as db]
            [lt.plugins.kukui.datascript :as d]
            [clojure.string :as s]
            [clojure.set :as cset]))

(defn ->tag-id
  "Given a tag name and a number of data structures it could be in,
  return an existing or new :db/id for it"
  [entities existing-tags new-tags tag-name]
  (or (get existing-tags tag-name)
      (get @new-tags tag-name)
      (:db/id (first (filter #(= (:name %) tag-name) entities)))
      (let [id (d/tempid)]
        (swap! new-tags assoc tag-name id)
        id)))

(defn expand-tags [entities]
  (let [new-tags (atom {})
        entities (map #(assoc % :db/id (d/tempid)) entities)
        tag-id (partial ->tag-id entities (db/name-id-map) new-tags)
        entities-with-tags (doall
                            (->> entities
                                 (mapcat (fn [ent]
                                           (into [(dissoc ent :tags)]
                                                 (map #(hash-map :db/id (:db/id ent) :tags (tag-id %))
                                                      (:tags ent)))))))]
    (into (map (fn [[tag id]]
                 {:db/id id :name tag :type db/unknown-type})
               @new-tags)
          entities-with-tags)))

(defn add-types
  [entities]
  (let [existing-types (cset/union
                        (set (d/qf '[:find ?name
                                     :where [?e :type "type"] [?e :name ?name]]))
                        (set (d/qf '[:find ?type
                                     :where [?e :type ?type]])))]
    (->> entities
         (keep :type)
         set
         (remove #(contains? existing-types %))
         (map #(hash-map :name % :type db/root-type))
         (into entities))))

(defn add-ids-by-line [file nodes]
  (let [line-entities (into {} (d/q '[:find ?l ?e
                                      :in $ ?file
                                      :where
                                      [?e :line ?l]
                                      [?e :file ?file]]
                                    file))]
    (map #(if (:db/id %) %
            (assoc % :db/id (get line-entities (:line %))))
         nodes)))

(defn node-diff* [nodes1 nodes2]
  (let [old-nodes (into {} (map (juxt :text identity) nodes1))
        ;; Pulling names from nodes1 has too many edge cases - just use existing
        name-entities (->> (db/name-id-map)
                           (map (fn [[name id]] [name (d/entity id)]))
                           (into {} ))
        changes {:deleted (cset/difference (set nodes1) (set nodes2))}]
    (reduce
     (fn [accum node]
       (let [old-node (get old-nodes (:text node))]
         (cond

          ;; update existing named thing
          (when-let [existing (get name-entities (:name node))]
            (not= (dissoc existing :db/id) (dissoc node :tags)))
          (update-in accum [:updated] (fnil conj [])
                     (-> node
                         (dissoc :tags)
                         (assoc :db/id (:db/id (get name-entities (:name node))))))

          ;; could be updated text
          (nil? old-node)
          (update-in accum [:added] (fnil conj []) node)

          (not= (:line old-node) (:line node))
          (-> accum
              (update-in [:updated] (fnil conj [])
                         {:line (:line old-node)
                          :new-line (:line node)})
              (update-in [:deleted] disj old-node))


          :else accum)))
     changes
     nodes2)))

(defn node-diff [file nodes1 nodes2]
  (-> (node-diff* nodes1 nodes2)
      (update-in [:updated] (partial add-ids-by-line file))
      (update-in [:updated] (fn [nodes]
                              (map #(if (:new-line %)
                                      {:db/id (:db/id %) :line (:new-line %)}
                                      %)
                                   nodes)))
      (update-in [:deleted] (partial add-ids-by-line file))))

(defn ensure-type [entities]
  (let [[typed untyped] ((juxt filter remove) :type entities)]
    (concat typed
            (when (seq untyped)
              (prn "Untyped" untyped)
              (map #(assoc % :type db/unknown-type) untyped)))))

(defn ->new-entities [nodes]
  (let [[relationships ents] ((juxt filter remove)
                              #(or (integer? (:tags %))
                                   (seq (:tags %)))
                              (-> nodes add-types expand-tags))]
    (into (-> ents
              db/must-have-unique-name
              db/must-have-string-name
              ensure-type
              db/must-require-type)
          relationships)))

(defn must-have-ids [entities]
  (when-let [invalid-entities (seq (remove :db/id entities))]
    (prn "Invalid entities" invalid-entities)
    (throw (ex-info (str "Cannot update these entities without their ids: " (pr-str invalid-entities))
                      {:invalid invalid-entities})))
  entities)

(def last-edits
  "Maps files to their last few node snapshots.
  Used to determine what changed since last edit."
  (atom {}))

(defn sync-entities [nodes file]
  (let [last-nodes (-> @last-edits (get file) last)
        {:keys [added deleted updated]} (node-diff file last-nodes nodes)]
    {:added (->new-entities added)
     :updated (must-have-ids updated)
     :deleted (->> deleted
                   must-have-ids
                   (mapv #(vector :db.fn/retractEntity (:db/id %))))}))

(defn save-latest-edit [nodes file]
  (swap! last-edits update-in [file]
         #(concat (take-last 2 %)
                  (list nodes))))

(defn sync [nodes file]
  (let [nodes (filter #(not (re-find #"^\s*$" (:text %))) nodes)
        {:keys [added deleted updated]} (sync-entities nodes file)]
    (println "Added/deleted/updated: "
             (count added) "/"
             (count deleted) "/"
             (count updated))
    (when (seq nodes)
      ;; Must be separate since there may be overlap
      (d/transact! deleted)
      (let [tx-report (d/transact! (into updated added))]
        (save-latest-edit nodes file)
        tx-report))))


(defn reset-sync! []
  (db/init)
  (reset! last-edits {}))

;; Query sync
;; ==========

(def no-text
  "Text to indicate entity has no :text"
  "---")

(defn updated-ent-tx [ent]
  (let [orig (d/entity (:id ent))]
    (if (contains? #{no-text (s/triml (:text orig))} (s/triml (:text ent)))
      []
      [{:db/id (:id ent) :text (:text ent)}])))

(defn update-with-import-file [ents import-file import-file-exists?]
  (if import-file-exists?
    (map #(if (and (:line %) (:file %))
            %
            (assoc % :file import-file :update-type :append))
         ents)
    (filter #(and (:line %) (:file %)) ents)))

(defn query-sync
  "Given a list of entities, updates them and returns a list of
  file, line and num maps to update."
  ([ents] (query-sync ents nil nil))
  ([ents import-file import-file-exists?]
   (let [tx (mapcat updated-ent-tx ents)]
     (d/transact! tx)
     (update-with-import-file
      (map (comp d/entity :db/id) tx)
      import-file
      import-file-exists?))))

(comment
  ;; diff
  (def current-edits (-> @last-edits vals first))
  (def nodes (-> current-edits first))
  (map :tags nodes)
  (map :tags (expand-tags nodes))
  (def nd (apply node-diff (take-last 2 current-edits)))
  (sync nodes "/Users/me/docs/notes/comp/clojure.otl")
  (def tx (d/transact! [{:type "lang" :name "ruby"} {:text "woah" :tags 5}]))
  )
