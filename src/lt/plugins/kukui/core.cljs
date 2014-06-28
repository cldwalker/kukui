(ns lt.plugins.kukui.core
  "Core fns that are indepedent and broken out to be testable"
  (:require [clojure.string :as s]))


(def default-tag-char "*")
(def tag-prefix "#")

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


;; Note this doesn't expand unknown type
(defn expand-tag
  "Expands a tag if it's a type"
  [types-config tag]
  (if (contains? (set (keys (:types types-config)))
                 (keyword tag))
    (get-in types-config [:types (keyword tag) :names])
    [tag]))

(defn text->tag-group
  "Used by query view and config to associate a parent tag (type) with its tags.
  To specify a default tag use an asterisk after a tag. For example:
  #type: tag1, tag2*"
  [types-config text]
  {:pre [(seq text)]}
  (let [[_ parent-tag tags-string] (re-find #"^\s*(\S+:|)\s*(.*)$" text)
        parent-tag (if (seq parent-tag) (first (text->tags parent-tag)) nil)
        raw-tags (s/split tags-string #"\s*,\s*")
        default-tag (some->
                     (some #(when (= default-tag-char (subs % (dec (count %))))
                              %) raw-tags)
                     (#(str tag-prefix (subs % 0 (dec (count %)))))
                     text->tags
                     first)
        tags (text->tags
              (s/join " " (map #(str tag-prefix %) raw-tags)))
        tags (mapcat (partial expand-tag types-config) tags)]
    {:parent-tag parent-tag :tags tags :default-tag default-tag}))

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

(defn add-attributes-to-nodes
  "Adds :tags and :desc to nodes"
  [nodes]
  (->> nodes
       ;; [] needed to include last element
       (partition 2 1 [])
       (reduce
        (fn [accum [curr next]]
          (cond
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
                      (fn [nodes]
                        (add-node-with-tags
                         nodes
                         curr
                         (concat (mapcat :tags (filter #(< (:indent %) (:indent curr)) (:tags accum)))
                                 (text->tags (:text curr))))))))
        ;; :nodes - contains all nodes/non-tag lines in the given lines
        ;; :tags - contains all tags but only keeps the latest tag for a given indent
        {:tags #{} :nodes []})
       :nodes
       (mapv
        (fn [node]
          (let [[tags attribute-tags] ((juxt remove filter)
                                       #(-> % (.indexOf ":") (> -1))
                                       (:tags node))]
            (merge
             (->> attribute-tags
                  (map #(s/split % #":"))
                  (map (fn [[k v]] [(keyword k) v]))
                  (into {}))
             (assoc node :tags (set tags))))))))
