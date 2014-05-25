(ns lt.plugins.kukui.config
  "Handles all user configuration e.g. storing and fetching of types and tags"
  (:require [lt.objs.command :as cmd]
            [lt.objs.notifos :as notifos]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [clojure.set :as cset]
            [lt.plugins.sacha.codemirror :as c]))

(def unknown-type :unknown)

(def base-config
  {:types {unknown-type {:names ["leftover"]
                         :default "leftover"}}})

;; User config to use across outlines. Consider making this configurable
(def global-config
  {:types {:priority {:names ["p0" "p1" "p2" "p9" "p?" "later"]
                      :default "p?"}
           :duration {:names ["small" "big"]
                      :default "small"}}})

(def config (merge-with merge base-config global-config))

(defn ->type-config [names default]
  {:names (if default names (conj names "leftover"))
   :default (or default "leftover")})

(defn dynamic-config
  "Types config which calculates certain types based on nodes e.g. unknown type
  which accounts for typeless tags."
  [nodes]
  (let [unaccounted-tags (cset/difference (set (mapcat :tags nodes))
                                          (set (->> config :types vals (mapcat :names))))]
    (update-in config [:types unknown-type :names] #(into unaccounted-tags %))))

(defn save-config
  "Merges/resets :types in config. Currently only handles user cursor being on :types of a config"
  [ed tag-group-fn reset]
  (let [line (.-line (editor/cursor ed))
        children-lines (range (inc line)
                              (c/safe-next-non-child-line ed line))
        new-config (->> children-lines
                        (map #(editor/line ed %))
                        (map (partial tag-group-fn config))
                        (remove #(let [no-parent (not (:parent-tag %))]
                                   (when no-parent
                                     (println "Skipping line with no parent-tag: " (pr-str %)))
                                   no-parent))
                        (map #(vector (keyword (:parent-tag %))
                                      (->type-config (vec (:tags %)) (:default-tag %))))
                        (into {})
                        (update-in (if reset (merge-with merge base-config global-config) config)
                                   [:types] merge))]
    (println "New config is: " (pr-str new-config))
    (notifos/set-msg! "Saved config")
    (def config new-config)))
