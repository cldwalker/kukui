(ns lt.plugins.kukui.config
  "Handles all user configuration e.g. storing and fetching of types and tags"
  (:require [lt.objs.command :as cmd]
            [lt.objs.notifos :as notifos]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [clojure.set :as cset]
            [lt.plugins.kukui.core :as kc]
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

;; user-config is assumed to be a :types map
(defn merge-config
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

(defn tag-group-merge-config
  "Updates :types in config using children nodes as tag groups."
  [ed merge-type]
  (let [line (.-line (editor/cursor ed))
        children-lines (range (inc line)
                              (c/safe-next-non-child-line ed line))
        user-config (->> children-lines
                        (map #(editor/line ed %))
                        (map (partial kc/text->tag-group config))
                        (remove #(let [no-parent (not (:parent-tag %))]
                                   (when no-parent
                                     (println "Skipping line with no parent-tag: " (pr-str %)))
                                   no-parent))
                        (map #(vector (keyword (:parent-tag %))
                                      (->type-config (vec (:tags %)) (:default-tag %))))
                        (into {}))]
    (merge-config user-config merge-type)))

(defn read-config-line [line]
  (next (re-find #"^\s*(?::config)?\.([^:]+)(?::\s*(\S+))?$" line)))

(defmulti save
  "Saves config key differently depending on config key value."
  (fn [config-key options] config-key))

(defmethod save :default [config-key _]
  (notifos/set-msg! (str "Config key " (pr-str config-key) " is not recognized.")
                    {:class "error"}))

(defmethod save :types [_ {:keys [editor value]}]
  (tag-group-merge-config editor (keyword value)))

(defn save-current-config
  "Saves config of current line. Save behavior depends on config key."
  [ed]
  (let [line-text (editor/line ed (.-line (editor/cursor ed)))
        [config-key config-val] (read-config-line line-text)]
    (save (keyword config-key) {:value config-val :editor ed})))
