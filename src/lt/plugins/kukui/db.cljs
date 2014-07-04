(ns lt.plugins.kukui.db
  "Experimental db for types and tags")

(def store (atom {:names #{} :db []}))

(defn create! [& records]
  (let [names (:names @store)
        dups (filter #(and (:name %) (contains? names (:name %))) records)]
    (when (seq dups)
      (prn "DUPS" dups)
      (throw (ex-info (str "Names must be unique: " (map :name dups))
                      {:names (map :name dups)})))
    (swap! store
           #(-> %
                (update-in [:db] into records)
                (update-in [:names] into (keep :name records))))))

(create! {:name "type" :type "type"})

(comment
  (->> (:db @store)
      (group-by :type)
      (map (fn [[k v]] [k (map :name v)])))
  (->> (:db @store)
       (filter #(= "fn" (:type %)))
       (map :name))
  (create! {:name "type" :desc "wtf"})
  )
