(ns lt.plugins.kukui.node
  (:require [lt.plugins.sacha.codemirror :as c]
            [lt.plugins.kukui.core :refer [tag-prefix add-attributes-to-nodes]]
            [lt.plugins.kukui.util :as util]
            [lt.objs.editor :as editor]))

(defn line->node [ed line]
  {:line line
   :indent (c/line-indent ed line)
   :text (editor/line ed line)
   :file (util/current-file ed)})

(def ignore-tag "ignore")

(defn expand-nodes
  "Adds :tags, :desc and attributes to nodes. Also respects ignore-tag"
  [nodes]
  (->> nodes
       add-attributes-to-nodes
       (remove #(contains? (:tags %) ignore-tag))))

(defn ed->nodes
  "Returns nodes with :line, :indent, :text and :tags properties.
  Tags are picked up from parents and any words starting with '#'."
  ([ed] (ed->nodes ed nil))
  ([ed lines]
   (let [lines (or lines
                   (if-let [selection (editor/selection-bounds ed)]
                     (range (get-in selection [:from :line])
                            (inc (get-in selection [:to :line])))
                     (let [line (.-line (editor/cursor ed))]
                       (range line (c/safe-next-non-child-line ed line)))))]
     (expand-nodes (map #(line->node ed %) lines)))))
