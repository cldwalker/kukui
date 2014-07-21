(ns lt.plugins.kukui.query
  (:require [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.command :as cmd]
            [lt.objs.files :as files]
            [cljs.reader :as reader]
            [lt.plugins.kukui.core :as kc]
            [lt.plugins.kukui.datascript :as d]
            [lt.plugins.kukui.db :as db]
            [lt.plugins.kukui.util :as util]))


(cmd/command {:command :kukui.db-query-temp-file
              :desc "kukui: Open db query in temp file"
              :exec (fn []
                      (let [ed (pool/last-active)
                            line (.-line (editor/cursor ed))
                            nodes (d/qe
                                   '[:find ?e :in $ % :where [?e :line] (tagged-with ?e "work")]
                                   db/rules)
                            nodes (into [{:text "#work" :level 1}]
                                        (map #(assoc % :level 2) nodes))
                            result (kc/tree->string nodes (editor/option ed "tabSize"))
                            path (util/tempfile "kukui-query" ".otl")]
                        (files/save path result)
                        (cmd/exec! :open-path path)))})

(cmd/command {:command :kukui.query-with-datascript
              :desc "kukui: Execute a datascript query"
              :exec (fn []
                     (let [ed (pool/last-active)
                           line (editor/line ed (.-line (editor/cursor ed)))
                           query (reader/read-string line)
                           result (d/q query)
                           result (if (every? #(and (= 1 (count %))
                                                    (integer? (first %)))
                                              result)
                                    (map #(d/entity (first %)) result)
                                    result)]
                       (util/pprint result)) )})
