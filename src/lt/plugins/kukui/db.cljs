(ns lt.plugins.kukui.db
  "In-memory DB for nodes, types and things"
  (:require [lt.plugins.kukui.datascript :as d]))

(def unknown-type "unknown")
(def root-type "type")

;; Rules
;; =====

(def lines-rule '[[(lines ?e ?first-line ?last-line)
                   [?e :line ?line]
                   [(<= ?first-line ?line ?last-line)]]])
(def rules
  (concat lines-rule))

;; Queries
;; =======
(defn name-id-map []
  (into {} (d/q '[:find ?n ?e
                   :where [?e :name ?n]])))

(defn find-by-file-and-line [file line]
  (first
   (d/qe '[:find ?e
           :in $ ?file ?line
           :where
           [?e :file ?file]
           [?e :line ?line]]
         file line)))

(defn ->nodes
  "Returns nodes with :tags for given range of lines"
  [lines]
  (->>
   (d/q '[:find ?e ?name
          :in $ % ?first ?last
          :where
          [?e :tags ?tag]
          [?tag :name ?name]
          (lines ?e ?first ?last)]
        rules (first lines) (last lines))
   (group-by first)
   (map (fn [[id tag-tuples]]
          (assoc (d/entity id)
            :tags (set (map second tag-tuples)))))))

(defn attr-counts
  [lines attr]
  (sort-by (comp - second)
           (d/q '[:find ?type (count ?e)
                  :in $ % ?first ?last ?attr
                  :where
                  [?e ?attr ?type]
                  (lines ?e ?first ?last)]
                rules (first lines) (last lines) attr)))

(defn tag-counts
  [lines]
  (->>
   (d/q '[:find ?type ?tag (count ?e)
          :in $ % ?first ?last
          :where
          [?e :tags ?t]
          [?t :type ?type]
          [?t :name ?tag]
          (lines ?e ?first ?last)]
        rules
        (first lines)
        (last lines))
   (group-by first)
   vals
   (mapcat identity)
   (reduce
    #(assoc-in %1 (butlast %2) (last %2))
    {})))

(defn types-and-names
  "Returns a list of types with each type having entity names of that type"
  []
  (->> (d/q '[:find ?type ?name
              :where
              [?children :type ?type]
              [?children :name ?name]])
       (group-by first)
       (map (fn [[type pairs]]
              {:type type :names (map second pairs)}))))

;; Validations
;; ===========
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

(defn must-have-string-name [entities]
  (when-let [invalid (->> entities
                          (filter #(contains? % :name))
                          (remove #(string? (:name %)))
                          seq)]
    (prn "INVALID" invalid)
    (throw (ex-info (str "Names must be strings:" (map :name invalid))
                    {:invalid invalid})))
  entities)

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

;; Misc
;; ====
(defn init []
  (d/reset-connection! {:tags {:db/valueType :db.type/ref
                               :db/cardinality :db.cardinality/many}})
  (d/transact! [{:name root-type :type root-type}
                {:name unknown-type :type root-type}]))

(init)

(comment
  ;; counts by type
  (sort-by (comp - second)
           (d/q '[:find ?type (count ?e)
                   :where
                   [?e :type ?type]]))

  ;; counts by tag
  (sort-by (comp - second)
           (d/q '[:find ?tag (count ?e)
                   :where
                   [?e :tags ?t]
                   [?t :name ?tag]]))


  ;; counts by tag broken down by type
  (->> (d/q '[:find ?tag ?type (count ?e)
               :where
               [?e :tags ?t]
               [?e :type ?type]
               [?t :name ?tag]])
       (group-by first)
       vals
       (mapcat identity)
       (reduce
        #(assoc-in %1 (butlast %2) (last %2))
        {}))

  ;; counts by tag and for tagged type
  (sort-by (comp - #(nth % 2))
           (d/q '[:find ?tag ?type (count ?e)
                   :where
                   [?e :tags ?t]
                   [?e :type ?type]
                   [?t :name ?tag]]))

  ;; find-tagged
  (d/qe '[:find ?e
        :in $ ?tag
        :where
        [?e :tags ?t]
        [?t :name ?tag]]
      "cljs")

  ;; delete attr
  (d/transact! [:db/retract 2 :tags 4])
  ;; update
  (d/transact! [{:db/id 128 :type "plang"}])
  ;; delete
  (d/transact! [[:db.fn/retractEntity 2]])

  )
