(ns lt.plugins.kukui
  "Experiments in outlining and semantic tagging"
  (:require [lt.objs.command :as cmd]
            [lt.objs.editor.pool :as pool]
            [lt.objs.editor :as editor]
            [lt.objs.notifos :as notifos]
            [lt.objs.files :as files]
            [clojure.set :as cset]
            [cljs.reader :as reader]
            [clojure.string :as s]
            [lt.plugins.kukui.selector :as selector]
            [lt.plugins.kukui.util :as util]
            [lt.plugins.kukui.core :refer [text->tags tag-prefix indent-nodes desc-node?]]
            [lt.plugins.kukui.node :as node]
            [lt.plugins.kukui.sync :as sync]
            [lt.plugins.kukui.db :as db]
            [lt.plugins.kukui.datascript :as d]
            [lt.plugins.sacha.codemirror :as c]))

;; Count cmds
;; ==========

(defn db->nodes
  ([ed] (db->nodes ed (util/current-lines ed)))
  ([ed lines] (sort-by :line
                       (db/->nodes (util/current-file ed) lines))))

(defn types-counts [file lines]
  (let [nodes (db/->nodes file lines)]
    (println "Tag counts")
    (util/pprint (sort-by first
                          (map (fn [[k v]] [k (util/->val-sorted-map v)])
                               (db/tag-counts-by-type-and-tag file lines))))
    (println "Tag counts by type")
    (prn (sort-by second >
          (map (fn [[type tag-map]]
                 [type (apply + (vals tag-map))])
               (db/tag-counts-by-type-and-tag file lines))))
    (prn "Misc counts" {:untagged (count (filter #(and (empty? (:name %)) (empty? (:tags %)))
                                                 nodes))
                        :nodes (count nodes)})
    (println "Node counts by type")
    (util/pprint (db/attr-counts file lines :type))))

(defn all-types-counts []
  (println "Tag counts")
  (util/pprint (sort-by first
                        (map (fn [[k v]] [k (util/->val-sorted-map v)])
                             (db/all-tag-counts-by-type-and-tag))))
  (println "Tag counts by type")
  (prn (sort-by second >
                (map (fn [[type tag-map]]
                       [type (apply + (vals tag-map))])
                     (db/all-tag-counts-by-type-and-tag))))
  (let [nodes (db/->all-nodes)]
    (prn "Misc counts" {:untagged (count (filter #(and (empty? (:name %)) (empty? (:tags %)))
                                                 nodes))
                        :nodes (count nodes)}))
  (println "Node counts by type")
  (util/pprint (db/all-attr-counts :type)))

(cmd/command {:command :kukui.types-counts
              :desc "kukui: db tag counts of each type for current branch or selection"
              :exec (fn []
                      (let [ed (pool/last-active)]
                        (types-counts (util/current-file ed) (util/current-lines ed))))})

(cmd/command {:command :kukui.file-types-counts
              :desc "kukui: Same as types-counts but for whole file"
              :exec (fn []
                      (let [ed (pool/last-active)
                            lines (range (editor/first-line ed)
                                         (inc (editor/last-line ed)))]
                        (types-counts (util/current-file ed) lines)))})

(cmd/command {:command :kukui.all-types-counts
              :desc "kukui: Same as types-counts but for all files"
              :exec all-types-counts})

(cmd/command {:command :kukui.thing-stats
              :desc "kukui: Stats for overall thing counts"
              :exec (fn []
                      (prn (db/thing-stats)))})

;; Misc commands
;; =============

(cmd/command {:command :kukui.live-debug-nodes
              :desc "kukui: prints nodes for current branch or selection"
              :exec (fn []
                      (util/pprint (node/ed->nodes (pool/last-active))))})

(cmd/command {:command :kukui.debug-nodes
              :desc "kukui: prints db nodes for current branch or selection"
              :exec (fn []
                      (util/pprint (db->nodes (pool/last-active))))})

(defn replace-children [ed view-fn]
  (let [end-line (c/safe-next-non-child-line ed (.-line (editor/cursor ed)))
        new-body (view-fn ed)]
    (editor/replace (editor/->cm-ed ed)
                    {:line (inc (:line (editor/->cursor ed))) :ch 0}
                    {:line end-line :ch 0}
                    new-body)))

(defn add-tags-to-node [node tags]
  (update-in node [:text] str
             (s/join (map #(str " " tag-prefix %) tags))))

(defn stamp-nodes
  "Stamp children nodes with parent tags"
  [ed]
  (let [level 0
        nodes (db->nodes ed)
        parent-tags (text->tags (editor/line ed (.-line (editor/cursor ed))))
        new-nodes (map #(add-tags-to-node % parent-tags) nodes)
        indented-nodes (indent-nodes new-nodes
                                     (c/line-indent ed (.-line (editor/cursor ed)))
                                     (editor/option ed "tabSize")
                                     level)]
    (str (s/join "\n" indented-nodes) "\n")))

(cmd/command {:command :kukui.stamp-children
              :desc "kukui: stamps current children with parent tags"
              :exec (fn []
                      (replace-children (pool/last-active)
                                        stamp-nodes))})

(cmd/command {:command :kukui.toggle-descs
              :desc "kukui: Toggle visibility of descs of current children"
              :exec (fn []
                      (let [ed (pool/last-active)]
                        (util/toggle-all ed
                                         #(and
                                           (not (desc-node? (node/line->node ed %)))
                                           (desc-node? (node/line->node ed (inc %))))
                                         (util/current-lines ed))))})
;; DB commands
;; ===========
(defn sync-nodes [nodes file]
  (try
    (sync/sync nodes file)
    (catch :default e
      (notifos/set-msg! (str "Failed to sync:" e) {:class "error"})
      (prn e (ex-data e))
      (println (.-stack e)))))

(defn file->nodes
  "Alternative to node/ed->nodes which just uses file"
  [file]
  (->> (s/split-lines (:content (files/open-sync file)))
       (map-indexed (fn [i line]
                      {:line i
                       :indent (count (re-find #"^\s*" line))
                       :text line
                       :file file}))
       node/expand-nodes))

(cmd/command {:command :kukui.sync-file-to-db
              :desc "kukui: Syncs file to db"
              :exec (fn []
                      (let [ed (pool/last-active)
                            lines (range (editor/first-line ed)
                                         (inc (editor/last-line ed)))
                            nodes (node/ed->nodes ed lines)
                            file (util/current-file ed)]
                        (sync-nodes nodes file)))})

(def entity-selector
  (selector/selector {:items (fn []
                               (sort-by :name
                                        (d/qe '[:find ?e :where [?e :name]])))
                      :key :name
                      :transform #(str "<p>" %3
                                       (when-not (and (:file %4) (:line %4))
                                         " (no file)")
                                       "</p>")}))

(cmd/command {:command :kukui.jump-to-entity
              :desc "kukui: Jump to an entity's line and file"
              :options entity-selector
              :exec (fn [entity]
                      (if (and (:file entity) (:line entity))
                        (util/jump-to (pool/last-active) (:file entity) (:line entity))
                        (notifos/set-msg! (str "No file and line exists for " (:name entity))
                                          {:class "error"})))})

(defn ->semtag-name [thing]
  (when (seq (:name thing))
    (:name thing)))

(defn ->semtag-alias [thing]
  (when (seq (:alias thing))
    (:alias thing)))

(defn ->ent [->id id->name updated-names thing]
  (cond-> {:db/id (->id (:id thing))
           :tags (mapv ->id (:tags thing))
           :type (as-> (-> thing :types first id->name) type
                       (if (= type "tag") db/unknown-type type))
           :semtag true}
          (seq (:desc thing)) (assoc :text (:desc thing))
          (seq (:url thing)) (assoc :url (:url thing))
          (let [name (->semtag-name thing)]
            (and (seq name) (not (contains? updated-names name))))
          (assoc :name (->semtag-name thing))
          (let [alias (->semtag-alias thing)]
            (and (seq alias) (not (contains? updated-names alias))))
          (assoc :alias (->semtag-alias thing))))

(defn import-semtag-data []
  (let [things (->
                (files/join (files/lt-user-dir "plugins") "kukui" "db.clj")
                files/open-sync
                :content
                reader/read-string)
        things (map (fn [thing]
                      (assoc thing
                        :id (- (:id thing))
                        :types (map (comp - :db/id) (:types thing))
                        :tags (map (comp - :db/id) (:tags thing))))
                    things)
        ;; map of import ids to names
        id->name (into {}
                       (keep #(when-let [n (->semtag-name %)]
                                [(:id %) n]) things))
        existing-names (db/any-name-id-map)
        updated-names (cset/intersection (set (keys existing-names)) (set (vals id->name)))
        _ (prn "Following names already exist but will have their type updated:" updated-names)
        ;; maps name to db id
        ->id #(if (contains? updated-names (id->name %))
                (-> % id->name existing-names)
                %)
        ;; converts import entities to local entities
        entities (map (partial ->ent ->id id->name updated-names) things)]
    (println "Saving" (count entities) "entities," (count (mapcat :tags entities)) "tags...")
    (-> entities
        db/validate
        d/transact!)))

(cmd/command {:command :kukui.import-semtag-data
              :desc "kukui: Imports semtag data"
              :exec import-semtag-data})

(cmd/command {:command :kukui.reset-sync
              :desc "kukui: Resets sync"
              :exec (fn []
                      (sync/reset-sync!)
                      (when (files/exists? (files/join (files/lt-user-dir "plugins") "kukui" "db.clj"))
                        (import-semtag-data))
                      (notifos/set-msg! "Reset!"))})

(cmd/command {:command :kukui.reset-sync-and-sync-all
              :desc "kukui: Resets sync and syncs all files in notes"
              :exec (fn []
                      (notifos/working "Resetting")
                      (sync/reset-sync!)
                      (when (files/exists? (files/join (files/lt-user-dir "plugins") "kukui" "db.clj"))
                        (import-semtag-data))
                      (let [notes-dir (files/join (files/lt-user-dir "plugins") "kukui" "notes")]
                        (when (files/exists? notes-dir)
                          (doseq [file (files/full-path-ls notes-dir)]
                            ;; Assume symlinks for now. Use .lstatSync if mixed symlinks and real paths desired
                            (let [path (.readlinkSync (js/require "fs") file)]
                              (if (files/dir? path)
                                (do
                                  (println "Syncing directory" path "...")
                                  (doseq [file (files/full-path-ls path)]
                                    (println "Syncing file" file "...")
                                    (sync-nodes (file->nodes file) file)))
                                (do
                                  (println "Syncing file" path "...")
                                  (sync-nodes (file->nodes path) path)))))))
                      (notifos/done-working "Reset!"))})

(comment
  (def ents (d/qf '[:find ?name :where [?e :type "type"] [?e :name ?name]]))
  (def names (d/qf '[:find ?name :where [?e :type ?name]]))
  (cset/difference (set names) (set ents))
  )

