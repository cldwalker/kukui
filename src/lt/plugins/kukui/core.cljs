(ns lt.plugins.kukui.core
  "Core fns that are indepedent and broken out to be testable"
  (:require [clojure.string :as s]))


(def default-tag-char "*")
(def tag-prefix "#")
(def attr-delimiter ":")
(def name-attr "name")

;; This regex returns pairs of matches but only the latter is useful. This
;; is a necessary evil caused by no negative-lookbehind in JS
(def tag-pattern
  "Regex for pulling out tags with tag-prefix. To escape having a tag parsed,
  put a backslash before it e.g. \\#escaped"
  (let [disallowed-chars " \\t\\n,;\\*"]
    (re-pattern (str "(?:[^\\\\]|^)"
                   ;; All but last character can have '.' or ':'
                   "(" tag-prefix
                   "[^" disallowed-chars "]+"
                   "[^" disallowed-chars ".:]"
                   ;; Allow for 1 char tags still
                   "|" tag-prefix "[^" disallowed-chars ".:]"
                   ")"))))

(defn text->tags [text]
  (map
   #(subs % 1)
   (map second (re-seq tag-pattern text))))


(defn indent-node [node indent]
  (s/replace-first
   (:text node)
   #"^\s*"
   (apply str (repeat indent " "))))

(defn indent-nodes [nodes indent tab-size offset-level]
  (let [offset (* offset-level tab-size)
        tag-indent (+ indent offset)
        node-indent (+ indent offset tab-size)
        desc-indent (+ indent offset tab-size tab-size)]
    (mapcat
     #(if (:type-tag %)
        [(str (apply str (repeat tag-indent " "))
              (:text %))]
        (into [(indent-node % node-indent)]
              (map (fn [x] (indent-node x desc-indent))
                   (:desc %))))
     nodes)))


(defn desc-node? [node]
  (re-find #"^\s*\+" (:text node)))

(defn parent-node? [curr next]
  (when next
    (and (> (:indent next) (:indent curr))
         (not (desc-node? next)))))

(defn add-node-with-tags [nodes node tags]
  (conj nodes (assoc node :tags (set tags))))

(defn add-node-with-parent-tags [nodes curr parent-tags]
  (add-node-with-tags
   nodes
   curr
   (concat (mapcat :tags (filter #(< (:indent %) (:indent curr)) parent-tags))
           (text->tags (:text curr)))))

(defn ->name-value [text]
  (-> (re-pattern (str tag-prefix name-attr attr-delimiter "(\\S+)"))
      (re-find text)
      second))

(defn add-custom-attributes [node]
  (let [[tags attribute-tags] ((juxt remove filter)
                               #(-> % (.indexOf attr-delimiter) (> -1))
                               (:tags node))]
    (merge
     (->> attribute-tags
          (map #(s/split % (re-pattern attr-delimiter)))
          (map (fn [[k v]] [(keyword k) v]))
          (into {}))
     (assoc node :tags (set tags)))))

(defn add-attributes-to-nodes
  "Adds :tags, :desc and custom attributes to nodes"
  [nodes]
  (->> nodes
       ;; [] needed to include last element
       (partition 2 1 [])
       (reduce
        (fn [accum [curr next]]
          (cond

           (and (parent-node? curr next) (->name-value (:text curr)))
           (-> accum
               (update-in [:nodes] #(add-node-with-parent-tags % curr (:tags accum)))
               (update-in [:tags] #(add-node-with-tags
                                    (vec (remove (fn [tag] (= (:indent tag) (:indent curr))) %))
                                    curr
                                    (list (->name-value (:text curr))))))

           (parent-node? curr next)
           (update-in accum [:tags]
                      #(add-node-with-tags
                        (vec (remove (fn [tag] (= (:indent tag) (:indent curr))) %))
                        curr
                        (text->tags (:text curr))))

           (desc-node? curr)
           (update-in accum
                      [:nodes (dec (count (:nodes accum))) :desc]
                      (fnil conj [])
                      curr)
           :else
           (update-in accum [:nodes]
                      #(add-node-with-parent-tags % curr (:tags accum)))))
        ;; :nodes - contains all nodes/non-tag lines in the given lines
        ;; :tags - contains all tags but only keeps the latest tag for a given indent
        {:tags #{} :nodes []})
       :nodes
       (mapv add-custom-attributes)))

(defn tree->string
  "Converts a tree of nodes to an outline. Nodes are expected to have :text and :level keys.
  :level is translated to whitespace based on indent. Example nodes:

  [{:text 'parent' :level 1} {:text 'parent2' :level 2}] "
  [nodes indent]
  (s/join
   "\n"
   (reduce
    (fn [accum node]
      (conj accum
            (str (apply str (repeat (* indent (dec (:level node))) " "))
                 (s/triml (:text node)))))
    []
    nodes)))
