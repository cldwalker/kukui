(ns lt.plugins.kukui.util
  (:require [lt.objs.editor :as editor]))

(defn insert-at-next-line
  "Insert string at the beginning of the next line"
  [ed s]
  (editor/replace (editor/->cm-ed ed)
                  {:line (inc (:line (editor/->cursor ed))) :ch 0}
                  s)
  ed)
