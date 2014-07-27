(ns lt.plugins.kukui.util
  (:require [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.files :as files]
            [lt.objs.tabs :as tabs]
            [lt.objs.command :as cmd]
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

(defn current-lines
  "Returns range of lines for current selection or current branch"
  [ed]
  (if-let [selection (editor/selection-bounds ed)]
    (range (get-in selection [:from :line])
           (inc (get-in selection [:to :line])))
    (let [line (.-line (editor/cursor ed))]
      (range line (c/safe-next-non-child-line ed line)))))

(defn current-file
  ([] (current-file (pool/last-active)))
  ([ed] (get-in @ed [:info :path])))

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

(defn tempfile [seed suffix]
  (let [dir (.tmpdir (js/require "os"))]
    (files/join dir (str seed "-" (js/Date.now) suffix))))

(defn ->val-sorted-map
  [m]
  (into (sorted-map-by (fn [key1 key2]
                         (compare [(get m key2) key2]
                                  [(get m key1) key1]))) m))

;; Replace with https://github.com/clojure/clojurescript/commit/48c8d0fafc18375876e10caf960a7c7da27ac308
;; when using a clojurescript version that has pulled in goog.string.format
(defn format [fmt & args]
  (reduce
   (fn [acc arg]
     (let [[_ & matches] (re-find #"^(.*?)%s(.*)" acc)]
       (assert matches (str "No %s found in" string))
       (str (first matches) arg (second matches))))
   fmt
   args))

(defn ensure-and-focus-second-tabset []
  (when (< (-> @tabs/multi :tabsets count) 2)
      (cmd/exec! :tabset.new))
  (cmd/exec! :tabset.next))
