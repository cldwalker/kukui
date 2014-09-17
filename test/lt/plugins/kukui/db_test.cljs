(ns lt.plugins.kukui.db-test
  (:require-macros [cemerick.cljs.test :refer [is deftest testing]])
  (:require [cemerick.cljs.test :as t]
            [dlint.core :refer [lint]]
            [lt.plugins.kukui.datascript :as d]
            [lt.plugins.kukui.db :as db]))

(deftest rules-lint-valid
  (is (= {} (lint db/rules))))

(deftest query-lints-are-valid
  (doseq [[query-name query] db/named-queries]
    (is (= {} (lint query))
        (str "Query " query-name " should be valid"))))

(deftest lint-rules-finds-invalid
  (is
   (let [query '[:find ?e
                 :in $ % ?input-tag ?ent-type
                 :where (taged-with ?e ?input-tag) [?e :type ?ent-type]]
         args [db/rules :arg1 :arg2]]
     (= #{'taged-with} (d/lint-rules* query args)))))
