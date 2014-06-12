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
  (re-pattern (str "(?:[^\\\\]|^)"
                   "(" tag-prefix "[^ \\t\\n:.,;\\*]+" ")")))

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
