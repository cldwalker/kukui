(ns lt.plugins.kukui.util
  (:require [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [clojure.string :as s]
            [lt.plugins.sacha.codemirror :as c]))

(defn insert-at-next-line
  "Insert string at the beginning of the next line"
  [ed s]
  (editor/replace (editor/->cm-ed ed)
                  {:line (inc (:line (editor/->cursor ed))) :ch 0}
                  s)
  ed)

;; consider moving to sacha
(defn find-parent-line [ed line]
  (c/find-parent ed (range (dec line) -1 -1) (c/line-indent ed line)))

(defn find-parent-lines
  "Finds range of lines for parent and returns all lines in file when no parent"
  [ed line]
  (if-let [parent-line (find-parent-line ed line)]
    (range parent-line (c/safe-next-non-child-line ed parent-line))
    ;; If no parent, assume at top level and search whole file
    (range (editor/first-line ed) (inc (editor/last-line ed)))))

(defn current-file []
  (-> @(pool/last-active) :info :path))

(defn pprint
  "Useful for printing list or vec of maps. Hack until actual cljs.pprint exists"
  [data]
  (println (s/join "\n" data)))

;; Move to sacha when appropriate
(defn toggle-all
  "Similar to codemirror fold/unfold-all but condition is given line number"
  ([ed condition]
   (toggle-all ed condition (range (editor/first-line ed) (inc (editor/last-line ed)))))
  ([ed condition lines]
   (editor/operation ed
                     (fn []
                       (doseq [line lines]
                         (when (condition line)
                           (c/fold-code ed #js {:line line :ch 0} nil)))))))

(defn sibling-lines [ed line]
  (let [parent-lines (find-parent-lines ed line)
        current-indent (c/line-indent ed line)]
    (filter #(when (= current-indent (c/line-indent ed %)) %)
            parent-lines)))
