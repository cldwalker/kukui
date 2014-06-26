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

(deftest text->tag-group
  (testing "parent with child tags"
    (is (= {:parent-tag "parent" :tags '("child1" "child2") :default-tag nil}
       (k/text->tag-group {} "#parent: child1 , child2"))))
  (testing "just child tags"
    (is (= {:parent-tag nil :tags '("tag1" "tag2") :default-tag "tag2"}
           (k/text->tag-group {} "tag1, tag2*"))))
  (testing "expand child tag"
    (is (= {:parent-tag "today" :tags '("lunch" "chocolate" "coffee") :default-tag nil}
           (k/text->tag-group {:types {:drink {:names ["chocolate" "coffee"]}}}
                              "#today: lunch, drink")))))

(deftest indent-nodes
  (is
   (= ["      #parent"
       "        child1"
       "        child2"
       "          + some desc"]
      (k/indent-nodes
       [{:type-tag true :text "#parent"}
        {:text "    child1"}
        {:text "    child2"
         :desc [{:text "      + some desc"}]}]
       4 2 1))))


(deftest add-attributes-to-nodes
  (is
   (let [nodes [{:line 0 :indent 0 :text "#p0"}
                {:line 1 :indent 2 :text "  eat"}
                {:line 2 :indent 2 :text "  #?"}
                {:line 3 :indent 4 :text "    sleep #periodic"}
                {:line 4 :indent 6 :text "      + FULLTEXT"}]]
     (= [(assoc (nth nodes 1) :tags #{"p0"})
         (assoc (nth nodes 3)
           :tags #{"p0" "?" "periodic"}
           :desc [(nth nodes 4)])]
        (k/add-attributes-to-nodes nodes)))))
