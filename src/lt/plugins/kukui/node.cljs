(ns lt.plugins.kukui.node
  (:require [lt.plugins.sacha.codemirror :as c]
            [lt.plugins.kukui.core :refer [tag-prefix add-attributes-to-nodes]]
            [lt.objs.editor :as editor]))

(defn line->node [ed line]
  {:line line
   :indent (c/line-indent ed line)
   :text (editor/line ed line)})

(def ignore-tag "ignore")

(defn ->tagged-nodes
  "Returns nodes with :line, :indent, :text and :tags properties.
  Tags are picked up from parents and any words starting with '#'."
  [ed lines]
  (let [nodes (->> lines
                   (map #(line->node ed %))
                   add-attributes-to-nodes)]
    (remove #(contains? (:tags %) ignore-tag) nodes)))

(defn ed->nodes
  ([ed] (ed->nodes ed nil))
  ([ed lines]
   (let [lines (or lines
                   (if-let [selection (editor/selection-bounds ed)]
                     (range (get-in selection [:from :line])
                            (inc (get-in selection [:to :line])))
                     (let [line (.-line (editor/cursor ed))]
                       (range line (c/safe-next-non-child-line ed line)))))]
     (->tagged-nodes ed lines))))
