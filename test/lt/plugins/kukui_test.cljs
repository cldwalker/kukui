(ns lt.plugins.kukui-test
  (:require-macros [cemerick.cljs.test :refer [is deftest testing]])
  (:require [cemerick.cljs.test :as t]
            [lt.plugins.kukui.core :as k]))

(deftest text->tags
  (is (= '("moar" "sleep")
         (k/text->tags "#moar #sleep ftw"))
      "multiple tags")
  (is (= '("not-escaped")
         (k/text->tags "include #not-escaped or \\#escaped tags"))
      "backslash escapes tag")
  (is (= '("punct3" "punct1" "punct2")
         (k/text->tags "#punct3, #punct1; #punct2*"))
   "breaks tags on some punctuation char"))
