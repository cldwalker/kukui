(ns lt.plugins.kukui.db
  "In-memory DB for nodes, types and things"
  (:require [lt.plugins.kukui.datascript :as d]
            [clojure.string :as s]))

(def unknown-type "Default type if none specified" "unknown")
(def root-type "type")

;; Rules
;; =====

(def lines-rule
  '[[(lines ?e ?file ?first-line ?last-line)
     [?e :file ?file]
     [?e :line ?line]
     [(<= ?first-line ?line ?last-line)]]])

(def name-or-alias-rule
  '[[(name-or-alias ?e ?name)
     [?e :name ?name]]
    [(name-or-alias ?e ?name)
     [?e :alias ?name]]])

(def tag-names-rule
  '[[(tag-names ?e ?name)
     [?e :tags ?tag]
     (name-or-alias ?tag ?name)]
    ;; Allow untagged entities to match
    [(tag-names _ _)]])

(def tagged-with-rule
  '[[(tagged-with ?e ?name)
     [?e :tags ?tag]
     (name-or-alias ?tag ?name)]])

(def tagged-ent-with-rule
  '[[(tagged-ent-with ?e ?tag ?tag-name)
     [?e :tags ?tag]
     (name-or-alias ?tag ?tag-name)]])

(def rules
  (concat lines-rule
          tag-names-rule
          name-or-alias-rule
          tagged-with-rule
          tagged-ent-with-rule))

;; Queries
;; =======

(def named-queries
  "Named datalog queries - used mostly by query cmds"
  ;; entities grouped by tag and possibly other attributes
  {'ent-by-type  '[:find ?type ?e
                   :in $ % ?input-tag
                   :where (tagged-with ?e ?input-tag) [?e :type ?type]]
   'ent-tds '[:find ?tag-name ?e
              :in $ % ?input-tag
              :where
              [?e :type "td"]
              (tagged-ent-with ?e ?t1 ?tag-name) [?t1 :type "priority"]
              (tagged-with ?e ?input-tag)]
   'ent-by-tags '[:find ?tag ?e
                  :in $ % ?input-tag
                  :where (tagged-with ?e ?input-tag) (tagged-with ?e ?tag)]
   'by-or-tags '[:find ?input-tag ?e
                 :in $ % [?input-tag ...]
                 :where (tagged-with ?e ?input-tag)]
   'ent-by-tags-of-type '[:find ?tag-name ?e
                          :in $ % ?input-tag ?input-type
                          :where
                          (tagged-ent-with ?e ?t1 ?tag-name) [?t1 :type ?input-type]
                          (tagged-with ?e ?input-tag)]
   'local-by-tags-of-type '[:find ?tag-name ?e
                            :in $ % ?input-type ?file ?first ?last
                            :where
                            (tagged-ent-with ?e ?t1 ?tag-name) [?t1 :type ?input-type]
                            (lines ?e ?file ?first ?last)]

   ;; just entities
   'ent-by-tag-and-type  '[:find ?e
                           :in $ % ?input-tag ?ent-type
                           :where (tagged-with ?e ?input-tag) [?e :type ?ent-type]]
   'or-tags '[:find ?e
              :in $ % [?input-tag ...]
              :where (tagged-with ?e ?input-tag)]
   'ent-for-name '[:find ?e :in $ % ?input-tag :where (name-or-alias ?e ?input-tag)]
   'ent-for-type '[:find ?e :in $ % ?input-tag :where [?e :type ?input-tag]]

   ;; entities grouped by an attribute value
   'named-ents '[:find ?n ?e
                 :where [?e :name ?n]]
   'aliased-ents '[:find ?n ?e
                   :where [?e :alias ?n]]
   'url-ents '[:find ?url ?e
               :where [?e :url ?url]]
   'or-ents '[:find ?input-name ?e
              :in $ % [?input-name ...]
              :where (name-or-alias ?e ?input-name)]

   ;; tag-analysis
   'types-names '[:find ?type ?name
                  :where
                  [?children :type ?type]
                  [?children :name ?name]]
   'tagged-tags  '[:find ?tag1 ?tag2
                   :in $ %
                   :where
                   (tagged-ent-with _ ?t1 ?tag1) (tagged-with ?t1 ?tag2)]

   ;; search
   'search-attr '[:find ?e
                  :in $ % ?search-fn ?attr ?query
                  :where [?e ?attr ?val] [(?search-fn ?query ?val)]]
   'search-all-attr '[:find ?e
                      :in $ % ?search-fn ?query
                      :where [?e _ ?val] [(?search-fn ?query ?val)]]

   ;; counts
   'all-attr-counts '[:find ?val (count ?e)
                      :in $ ?attr
                      :where
                      [?e ?attr ?val]]
   'all-attr-counts-for-ids '[:find ?val (count ?e)
                              :in $ ?attr [?e ...]
                              :where
                              [?e ?attr ?val]]
   'tag-counts '[:find ?tag (count ?e)
                 :in $ %
                 :where (tagged-with ?e ?tag)]

   ;; placeholder - queries that provide :find arity and map to fn
   'tag-search '[:find ?e :where [?e :tag-search]]
   'qe '[:find ?e :where [?e :qe]]})

(defn name-id-map
  "Returns one-to-one map of names to ids"
  []
  (into {} (d/q ('named-ents named-queries))))

(defn any-name-id-map
  "Returns map of names or aliases to ids"
  []
  (merge (into {} (d/q ('aliased-ents named-queries)))
         (name-id-map)))

(defn find-by-file-and-line [file line]
  (first
   (d/qe '[:find ?e
           :in $ ?file ?line
           :where
           [?e :file ?file]
           [?e :line ?line]]
         file line)))

(defn ->nodes*
  [results]
  (->> results
       (group-by first)
       (map (fn [[id tag-tuples]]
              (assoc (d/entity id)
                :tags (set (keep second tag-tuples)))))))

(defn ->nodes
  "Returns nodes and their :tags for a given file range"
  [file lines]
  (->nodes*
   (d/q '[:find ?e ?name
          :in $ % ?file ?first ?last
          :where
          (tag-names ?e ?name)
          (lines ?e ?file ?first ?last)]
        rules file (first lines) (last lines))))

(defn ->all-nodes
  "Returns all nodes and their :tags"
  []
  (->nodes*
   (d/q '[:find ?e ?name
          :in $ %
          :where
          (tag-names ?e ?name)
          [?e :file]]
        rules)))

(defn attr-counts
  "Returns pairs of attribute vals and their counts for a given file range"
  [file lines attr]
  (sort-by second >
           (d/q '[:find ?val (count ?e)
                  :in $ % ?file ?first ?last ?attr
                  :where
                  [?e ?attr ?val]
                  (lines ?e ?file ?first ?last)]
                rules file (first lines) (last lines) attr)))


(defn attr-counts-for-ids
  [attr ids]
  (sort-by second >
           (d/q ('all-attr-counts-for-ids named-queries)
                attr ids)))

(defn all-attr-counts
  [attr]
  (sort-by second >
           (d/q ('all-attr-counts named-queries) attr)))

(defn local-tag-types
  "Returns tag types for a given file range"
  [file lines]
  (d/qf '[:find ?type
          :in $ % ?file ?first ?last
          :where
          (lines ?e ?file ?first ?last)
          [?e :tags ?t]
          [?t :type ?type]]
        rules file (first lines) (last lines)))


(defn tag-counts
  []
  (sort-by (comp - second)
           (d/q ('tag-counts named-queries)rules)))

(defn ->tag-counts
  [results]
  (->> results
       (group-by first)
       vals
       (mapcat identity)
       (reduce
        #(assoc-in %1 (butlast %2) (last %2))
        {})))

(defn tag-counts-by-type-and-tag
  "Returns a nested map of tag names and counts by tag type"
  [file lines]
  (->tag-counts
   (d/q '[:find ?type ?tag (count ?e)
          :in $ % ?file ?first ?last
          :where
          (lines ?e ?file ?first ?last)
          (tagged-ent-with ?e ?t ?tag)
          [?t :type ?type]]
        rules file (first lines) (last lines))))

(defn tag-counts-by-type-and-tag-for-ids
  [ids]
  (->tag-counts
   (d/q '[:find ?type ?tag (count ?e)
          :in $ % [?e ...]
          :where
          (tagged-ent-with ?e ?t ?tag)
          [?t :type ?type]]
        rules ids)))

(defn all-tag-counts-by-type-and-tag
  []
  (->tag-counts
   (d/q '[:find ?type ?tag (count ?e)
          :in $ %
          :where
          (tagged-ent-with ?e ?t ?tag)
          [?t :type ?type]]
        rules)))

(defn types-and-names
  "Returns a list of types with each type having entity names of that type"
  []
  (->> (d/q ('types-names named-queries))
       (group-by first)
       (map (fn [[type pairs]]
              {:type type :names (map second pairs)}))))

(defn thing-stats []
  (let [things (d/qe '[:find ?e :where [?e]])]
    {:things (count things)
     :types (->> things (mapcat :type) distinct count)
     :tags (->> things (mapcat :tags) count)
     :names (->> things (filter :name) count)
     :urls (->> things (filter :url) count)}))

(defn and-tags
  "AND search for given tags"
  [tags]
  (d/qe (concat '[:find ?e :in $ % :where]
                (map #(list 'tagged-with '?e %) tags))
        rules))

(defn tag-search [search-term]
  (cond
   (.contains search-term ".")
   (let [[type tag] (js->clj (.split search-term "."))]
    (d/qe ('ent-by-tag-and-type named-queries) rules tag type))

   (.contains search-term "+")
   (and-tags (s/split search-term #"\+"))

   :else
   (d/qe ('or-tags named-queries) rules
         (s/split search-term #"\s+"))))

(defn qe
  "Given where clauses, returns entities bound to ?e"
  [& wheres]
  (d/qe
   (concat '[:find ?e :in $ % :where] wheres)
   rules))

;; Validations
;; ===========
(defn must-have-unique-attribute [entities existing-fn attr]
  (let [existing-values (existing-fn)
        invalid (filter #(and (attr %) (contains? existing-values (attr %))) entities)
        invalid (->> entities
                     (filter attr)
                     (group-by attr)
                     vals
                     (mapcat #(when (> (count %) 1) %))
                     (into invalid))]
    (when (seq invalid)
      (prn "INVALID" invalid)
      (throw (ex-info (str attr " must be unique: " (map attr invalid))
                      {:invalid (map attr invalid)})))
    entities))

(def must-have-unique-name
  #(must-have-unique-attribute % (comp set keys any-name-id-map) :name))

(def must-have-unique-alias
  #(must-have-unique-attribute % (comp set keys any-name-id-map) :alias))

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
  (let [invalid (remove :type entities)]
    (when (seq invalid)
      (prn "INVALID" invalid)
      (throw (ex-info (str "Type must be present")
                      {:invalid invalid})))
    entities))

(defn must-have-unique-url [entities]
  (let [existing-urls (into {} (d/q ('url-ents named-queries)))
        urls (set (keys existing-urls))
        invalid (filter #(and (:url %) (contains? urls (:url %))) entities)
        invalid (->> entities
                     (filter :url)
                     (group-by :url)
                     vals
                     (mapcat #(when (> (count %) 1) %))
                     (into invalid))]
    (when (seq invalid)
      (prn "INVALID" invalid)
      (throw (ex-info (str "Urls must be unique: " (map :url invalid))
                      {:urls (map :url invalid)})))
    entities))

(defn validate [entities]
  (-> entities
      must-have-unique-name
      must-have-unique-alias
      must-have-string-name
      must-require-type
      must-have-unique-url))

;; Misc
;; ====
(defn init []
  (d/reset-connection! {:tags {:db/valueType :db.type/ref
                               :db/cardinality :db.cardinality/many}})
  (d/transact! [{:name root-type :type root-type}
                {:name unknown-type :type root-type}]))

(init)

(comment
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

  (d/qe '[:find ?e :where [?e :alias "cjar"]])
  (map (juxt :name :alias) (d/qe '[:find ?e :where [?e :alias]]))
  (d/transact! [{:db/id 2 :alias "un"}])
  (validate [{:db/id -10 :name "unknown2" :alias "un" :type "whoop"}])
  (d/q ('or-ents named-queries) rules ["un"])
  (count (any-name-id-map))

  ;; delete attr
  (d/transact! [:db/retract 2 :tags 4])
  ;; update
  (d/transact! [{:db/id 128 :type "plang"}])
  ;; delete
  (d/transact! [[:db.fn/retractEntity 2]]))
