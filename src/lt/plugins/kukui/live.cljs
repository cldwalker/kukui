(ns lt.plugins.kukui.live
  "Commands that depend on live nodes i.e. not db backed. Mostly unused
  but occasionally used to check db accuracy"
  (:require [lt.plugins.kukui.node :refer [ed->nodes]]
            [lt.objs.command :as cmd]
            [lt.objs.editor.pool :as pool]
            [lt.objs.editor :as editor]
            [lt.plugins.kukui.util :as util]
            [lt.plugins.kukui.db :as db]
            [clojure.set :as cset]
            [lt.plugins.sacha.codemirror :as c]))

(def leftover-tag "leftover")

;; Helpers
;; =======
(defn type-nodes->tag-map
  "Reduces a type's nodes to a tag map with a reducer fn."
  [f types nodes]
  (reduce
   (fn [accum node]
     (let [type-tags (cset/intersection (:tags node)
                                        (set (:names types)))
           type-tags (if (empty? type-tags) [leftover-tag] type-tags)]
       #_(prn node type-tags)
       (reduce #(f %1 %2 node) accum type-tags)))
   {}
   nodes))

(def type-counts (partial type-nodes->tag-map #(update-in %1 [%2] inc)))

(defn types-counts [ed lines]
  (let [nodes (ed->nodes ed lines)
        types (db/types-and-names)]
    (keep
     #(let [counts (type-counts (some (fn [x] (when (= (:type x) %) x)) types)
                                nodes)]
        (when-not (and (= 1 (count counts))
                       (get counts leftover-tag))
          (vector % counts)))
     (map :type types))))


;; Commands
;; ========
(defn ->tagged-counts
  "For given lines, returns map of tags and how many nodes have that tag."
  [ed lines]
  (->> (ed->nodes ed lines)
       (mapcat :tags)
       frequencies))

(cmd/command {:command :kukui.tag-counts
              :desc "kukui: tag counts in current branch's nodes"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))
                            lines (range line (c/safe-next-non-child-line ed line))]
                        (prn (->tagged-counts ed nil))))})

(defn total-types-counts
  "Different than type-counts in that this only counts total for each type
  and is only based on explicit tags - no defaults are taken into account.
  Also, one node gets counted for each of its tags."
  [ed lines]
  (let [line (.-line (editor/cursor ed))
        lines (or lines (range line (c/safe-next-non-child-line ed line)))
        tagged-counts (->tagged-counts ed lines)
        types (db/types-and-names)
        find-type (fn [tag]
                    (some #(when (contains? (set (:names %)) tag)
                             (:type %)) types))]
    (reduce-kv
     (fn [accum tag count]
       (update-in accum [(find-type tag)]
                  (fnil + 0) count))
     {}
     tagged-counts)))


(defn attribute-counts* [nodes attr]
  (println "Attribute:" attr "exists for"
           (count (filter attr nodes)) "of"
           (count nodes) "nodes")
  (prn (reduce
        (fn [accum val]
          (update-in accum [val] inc))
        {}
        (map attr nodes))))

(defn attribute-counts [nodes]
  (doseq [attr (-> (mapcat keys nodes) set (disj :desc :tags :indent :line :text))]
    (attribute-counts* nodes attr)))

(cmd/command {:command :kukui.live-types-counts
              :desc "kukui: tag counts of each type for current branch or selection"
              :exec (fn []
                      (let [ed (pool/last-active)
                            nodes (ed->nodes ed nil)]
                        (util/pprint (types-counts ed nil))
                        (prn (assoc (total-types-counts ed nil)
                               "untagged" (count (filter (comp empty? :tags) nodes))
                               "nodes" (count nodes)))
                        (attribute-counts nodes)))})

(cmd/command {:command :kukui.live-all-types-counts
              :desc "kukui: Same as types-counts but for whole file"
              :exec (fn []
                      (let [ed (pool/last-active)
                            lines (range (editor/first-line ed)
                                         (inc (editor/last-line ed)))
                            nodes (ed->nodes ed lines)]
                        (util/pprint (types-counts ed lines))
                        (prn (assoc (total-types-counts ed lines)
                               "untagged" (count (filter (comp empty? :tags) nodes))
                               "nodes" (count nodes)))
                        (attribute-counts nodes)))})
