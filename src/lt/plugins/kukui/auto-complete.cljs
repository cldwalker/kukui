(ns lt.plugins.kukui.auto-complete
  (:require [lt.objs.command :as cmd]
            [lt.objs.editor.pool :as pool]
            [lt.objs.editor :as editor]
            [lt.object :as object]
            [lt.plugins.kukui.core :as kc]
            [lt.plugins.kukui.datascript :as d])
  (:require-macros [lt.macros :refer [behavior]]))


;; Background this as needed
(defn entity-names []
  (d/qf '[:find ?name :where [?e :name ?name]]))

(behavior ::use-local-hints
          :triggers #{:hints+}
          :reaction (fn [editor hints token]
                      (if (and token (.startsWith token kc/tag-prefix))
                        (concat hints (map #(do #js {:completion (str kc/tag-prefix %)})
                                           (entity-names)))
                        hints)))

;; .otl requires a custom :hint-pattern to autocomplete tags.
;; Could also hook into a mode's :hint-pattern but seems to early to make .otl a mode
(behavior ::add-hint-pattern
          :triggers #{:object.instant}
          :reaction (fn [editor]
                      (lt.object/merge! editor
                                        {:hint-pattern
                                         (re-pattern (str "[^" kc/disallowed-tag-chars "]"))})))


(comment

  (re-find #"[\w#]+" "#dude-")
  (js/CodeMirror.extendMode "text/x-otl" (clj->js {:hint-pattern #"[\w#]"}))
  (def ed (first (pool/containing-path "light_table.otl")))
  (-> @ed :ed .getMode)
  (:hint-pattern @ed )
  (->> @ed :lt.plugins.auto-complete/hints)
  (lt.object/merge! ed {:hint-pattern #"[\w#]"})
  (-> lt.plugins.kukui.core/tag-pattern)
  (aget (editor/inner-mode (pool/last-active))
        "hint-pattern")
  )
