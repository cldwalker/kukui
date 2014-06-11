(ns lt.plugins.kukui.core
  "Core fns that are indepedent and broken out to be testable")


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
