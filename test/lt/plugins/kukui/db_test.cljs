(ns lt.plugins.kukui.db-test
  (:require-macros [cemerick.cljs.test :refer [is deftest testing]])
  (:require [cemerick.cljs.test :as t]
            [dlint.core :refer [lint]]
            [lt.plugins.kukui.db :as db]))

(deftest rules-lint-valid
  (is (= {} (lint db/rules))))

(deftest query-lints-are-valid
  (doseq [[query-name query] db/named-queries]
    (is (= {} (lint query))
        (str "Query " query-name " should be valid"))))
