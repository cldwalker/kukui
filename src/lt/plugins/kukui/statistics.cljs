(ns lt.plugins.kukui.statistics
  (:require [lt.plugins.kukui.db :as db]
            [lt.objs.command :as cmd]))

(defn chart [{:keys [data type] :as options}]
  (assert (and data type))
  (let [defaults (cond
                  (= :pie type) {:tooltip {:format {:value
                                                    (fn [val ratio id]
                                                      val)}}}
                  :else {})]
    (cmd/exec!
     :c3.open-chart
     (merge defaults
            {:data {:columns data :type (name type)}}))))

(comment
  (chart {:data (map (fn [[type tag-map]]
                       [type (apply + (vals tag-map))])
                     (db/all-tag-counts-by-type-and-tag))
          :type :pie})

  ;; Average # of tags per type item?
  (chart {:data (db/all-attr-counts :type)
          :type :pie})

  ;; Scatter of tag counts vs type counts
  (let [type-counts (into {} (db/all-attr-counts :type))
        tag-counts (into {}
                         (map (fn [[type tag-map]]
                                [type (apply + (vals tag-map))])
                              (db/all-tag-counts-by-type-and-tag)))
        data (mapcat
              (fn [type]
                [[(str type "_x") (get type-counts type 0)]
                 [type (get tag-counts type 0)]])
              (set (keys type-counts) (keys tag-counts)))]
    (cmd/exec!
     :c3.open-chart
     {:data {:xs (into {}
                       (map #(vector % (str % "_x"))
                            (set (keys type-counts keys tag-conts))))
             :columns
             data
             :type "scatter"}
      }))

  ;; For each type, which types associate-with/are-associated-by other types?


  (cmd/exec!
   :c3.open-chart
   {:data { ;:xs {:hey "hey_x"}
           :labels {:format {:y (fn [v id]
                                  ;; (prn v id)
                                  id)}}
           :columns
           [#_["hey_x" 4 10]
            ["hey" 5 1]]
           :type "line"}
    })
  )
