(ns lt.plugins.kukui.sync
  "Syncs a file to a db"
  (:require [lt.plugins.kukui.db :as db]
            [lt.plugins.kukui.datascript :as d]
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

(defn add-types [entities]
  (let [existing-types (set (d/qf '[:find ?type
                                     :where [?e :type ?type]]))]
    (->> entities
         (keep :type)
         set
         (remove #(contains? existing-types %))
         (map #(hash-map :name % :type db/root-type))
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
       db/must-have-unique-name
       db/must-require-type))

(defn add-ids-by-line [nodes]
  (let [line-entities (into {} (d/q '[:find ?l ?e
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
    (d/transact! deleted)
    (let [tx-report (d/transact! (into updated added))]
      (save-latest-edit nodes file)
      tx-report)))

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
