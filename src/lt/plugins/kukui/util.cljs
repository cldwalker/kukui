(ns lt.plugins.kukui.util
  (:require [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.files :as files]
            [lt.objs.tabs :as tabs]
            [lt.objs.command :as cmd]
            [lt.objs.jump-stack :as jump-stack]
            [lt.object :as object]
            [clojure.string :as s]
            [lt.plugins.sacha.codemirror :as c]
            [lt.objs.context :as ctx]
            [lt.objs.popup :as popup]
            [lt.util.dom :as dom])
  (:require-macros [lt.macros :refer [defui]]))

(defn insert-at-next-line
  "Insert string at the beginning of the next line"
  [ed s]
  (editor/replace (editor/->cm-ed ed)
                  {:line (inc (:line (editor/->cursor ed))) :ch 0}
                  s)
  ed)

(defn find-parent-lines
  "Finds range of lines for parent and returns all lines in file when no parent"
  [ed line]
  (if-let [parent-line (c/find-parent-line ed line)]
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

(defn update-editor-path!
  "Updates given editor to edit a new path. Appropriately swaps CM doc object,
  refreshes editor keys and updates editor's tab, :tags, :info and :listeners."
  [ed path]
  (let [info (merge {:mime "plaintext" :tags [:editor.plaintext]}
                    (lt.objs.opener/path->info path))
        content (:content (lt.objs.files/open-sync path))
        doc (lt.objs.document/create {:line-ending lt.objs.files/line-ending
                                      :mime (:mime info)
                                      :mtime (lt.objs.files/stats path)
                                      :content content})
        ;; TODO: remove hardcoded brittle defaults
        ;; These defaults may not work for others and for specific file types
        default-tags #{:editor.inline-result :tabset.tab :editor.keys.vim.normal
                       :editor.file-backed :object :editor.keys.vim :editor.keys.emacs :editor}
        default-editor-keys #{:info :lt.object/id :lt.object/type :lt.objs.tabs/tabset :doc :tags
                              :editor.generation :content :triggers :ed :children
                              :listeners :behaviors :lt.objs.editor.pool/comment-options}
        outdated-editor-keys (clojure.set/difference (set (keys @ed)) default-editor-keys)]
    (lt.objs.document/register-doc doc path)
    (lt.objs.editor/set-doc! ed doc)
    ;; these should update listeners
    (lt.object/remove-tags ed (clojure.set/difference (:tags @ed) default-tags))
    (lt.object/add-tags ed (into default-tags (:tags info [])))
    (lt.object/merge! ed {:info info})
    (swap! ed #(apply dissoc % outdated-editor-keys))
    (when-let [ts (:lt.objs.tabs/tabset @ed)]
      (lt.object/raise ts :tab.updated))))

(defn jump-to
  "Jumps to given file and optional line and adds last cursor to jump-stack"
  ([ed path] (jump-to ed path 0))
  ([ed path line]
   (object/raise jump-stack/jump-stack
                 :jump-stack.push!
                 ed
                 path
                 {:line line :ch 0})))

(defui text-input [m]
  [:input {:type "text" :placeholder (:placeholder m) :autocomplete "on" :list "input-completions"}]
  :focus (fn []
           (ctx/in! :popup.input))
  :blur (fn []
          (ctx/out! :popup.input)))

(defn input [action-fn & {:as opts}]
  (let [input (text-input opts)
        p (popup/popup! {:header  (or (:header opts) "Enter value")
                         :body [:div
                                [:datalist#input-completions
                                 (map #(vec [:option {:value %} ]) (:completions opts))]
                                input]
                         :buttons [{:label "Cancel"}
                                   {:label "Submit"
                                    :action (fn []
                                              (action-fn (dom/val input)))}]})]
    (dom/focus input)
    (.setSelectionRange input 1000 1000)))

(comment
  (def ed (first (pool/containing-path "db.cljs")))
  (def path (-> @lt.plugins.kukui.query/query-history first :path))
  (update-editor-path! ed path)
  )
