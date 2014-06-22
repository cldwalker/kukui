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
  {:types {:priority {:names ["p0" "p1" "p2" "p3" "p4" "p5" "p6" "p7" "p8" "p9" "p?" "later"]
                      :default "p?"}
           :duration {:names ["small" "big"]
                      :default "small"}}})

(def config (merge-with merge base-config global-config))

(defn ->type-config [names no-default]
  {:names (if no-default names (conj names "leftover"))
   :default "leftover"})

(defn dynamic-config
  "Types config which calculates certain types based on nodes e.g. unknown type
  which accounts for typeless tags."
  [nodes]
  (let [unaccounted-tags (cset/difference (set (mapcat :tags nodes))
                                          (set (->> config :types vals (mapcat :names))))]
    (update-in config [:types unknown-type :names] #(into unaccounted-tags %))))

;; Doesn't handle tags that appear in multiple types e.g. leftover
(defn find-type
  "Finds a tag's type. Returns unknown-type if none found."
  [tag]
  (or (some (fn [[type type-map]]
              (when (contains? (set (:names type-map)) tag)
                (name type)))
            (:types config))
      (name unknown-type)))

(defn deep-merge [& vals]
  (if (every? map? vals)
    (apply merge-with deep-merge vals)
    ;; Assume vals are sequential?
    (apply into vals)))

(defn save-config*
  [user-config merge-type]
  (let [new-config
        (case merge-type
          :reset (update-in (merge-with merge base-config global-config)
                            [:types] merge user-config)
          :into-type (update-in config [:types] #(merge-with deep-merge % user-config))
          ;; :replace-type - clobbers a given type
          (update-in config [:types] merge user-config))]

    (println "New config is: " (pr-str new-config))
    (notifos/set-msg! "Saved config")
    (def config new-config)))

(defn save-config
  "Updates :types in config depending on merge-type.
  Currently only handles user cursor being on :types of a config"
  [ed tag-group-fn merge-type]
  (let [line (.-line (editor/cursor ed))
        children-lines (range (inc line)
                              (c/safe-next-non-child-line ed line))
        user-config (->> children-lines
                        (map #(editor/line ed %))
                        (map (partial tag-group-fn config))
                        (remove #(let [no-parent (not (:parent-tag %))]
                                   (when no-parent
                                     (println "Skipping line with no parent-tag: " (pr-str %)))
                                   no-parent))
                        (map #(vector (keyword (:parent-tag %))
                                      (->type-config (vec (:tags %)) (:default-tag %))))
                        (into {}))]
    (save-config* user-config merge-type)))

(defn read-config-line [line]
  (next (re-find #"^\s*(?::config)?\.([^:]+):\s*(\S+)$" line)))
