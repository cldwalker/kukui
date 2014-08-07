(ns lt.plugins.kukui-test
  (:require-macros [cemerick.cljs.test :refer [is deftest testing]])
  (:require [cemerick.cljs.test :as t]
            [lt.plugins.kukui.core :as k]))

(deftest text->tags
  (is (= '("moar" "sleep" "?")
         (k/text->tags "#moar #sleep ftw #?"))
      "multiple tags")
  (is (= '("not-escaped")
         (k/text->tags "include #not-escaped or \\#escaped tags"))
      "backslash escapes tag")
  (is (= '("punct3" "punct1" "punct2")
         (k/text->tags "#punct3, #punct1; #punct2*"))
   "breaks tags on some punctuation chars")
  (is (= '("type:punct" "type.punct")
         (k/text->tags "#type:punct: #type.punct."))
   "allows some punctuation chars anywhere except end"))

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

(defn ->nodes [nodes]
  (->> nodes
       (map-indexed
        #(hash-map
          :text %2
          :line %1
          :indent (count (re-find #"^\s*" %2))))
       vec))

(deftest add-attributes-to-nodes
  (testing "normal tags and inherited ones"
    (is
     (let [nodes (->nodes ["#p0"
                           "  eat"
                           "  #?"
                           "    sleep #periodic"
                           "      + FULLTEXT"])]
       (= [(assoc (nth nodes 1) :tags #{"p0"})
           (assoc (nth nodes 3)
             :tags #{"p0" "?" "periodic"}
             :desc [(nth nodes 4)])]
          (k/add-attributes-to-nodes nodes)))))
  (testing "attribute tags - normal and attribute inheritence -
    children overrides its parents for a given attribute"
    (is
     (let [nodes (->nodes ["#type:td"
                           "  #type:note"
                           "    finish it"
                           "    shave a #size:big #yak #type:?"])]
       (= [(assoc (nth nodes 2) :tags #{} :type "note")
           (assoc (nth nodes 3) :tags #{"yak"} :type "?" :size "big")]
          (k/add-attributes-to-nodes nodes)))))
  (testing "parent with name attr - gets saved as a node and its tags aren't inherited"
    (is
     (let [nodes (->nodes ["#cljs"
                           "  #name:kukui #type:proj #LT"
                           "    good stuff #type:note"])]
       (= [(assoc (nth nodes 1) :name "kukui" :type "proj" :tags #{"cljs" "LT"})
           (assoc (nth nodes 2) :type "note" :tags #{"cljs" "kukui"})]
          (k/add-attributes-to-nodes nodes)))))
  (testing "attributes - inline and in desc"
    (is
     (let [nodes (->nodes ["#type:wapp"
                           "  hilarious #for:me #from:campfire"
                           "    + :url: http://gifsound.com"
                           "    + some paragraph"
                           "    + like text"
                           "    + :for: you"])]
       (=
        [(assoc (nth nodes 1)
                 :for "you" :url "http://gifsound.com" :type "wapp"
                 :from "campfire" :tags #{}
                 :desc [(nth nodes 3)
                        (nth nodes 4)])]
        (k/add-attributes-to-nodes nodes))))))

(deftest tree->string
  (is
   (= "parent\n  child\nsibling"
      (k/tree->string [{:level 1 :text "parent"}
                       {:level 2 :text "child"}
                       {:level 1 :text "sibling"}]
                      2)))
  )
