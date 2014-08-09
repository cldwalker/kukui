(defproject kukui "0.1.0-pre"
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-2227"]
                 [datascript "0.1.5"]]
  :profiles {:dev {:dependencies [[lighttable "0.1.0"]]
                   :plugins [[lein-cljsbuild "1.0.3"]
                             [com.cemerick/clojurescript.test "0.3.1"]]
                   :hooks        [leiningen.cljsbuild]}}
  :cljsbuild {:builds
              {:whitespace {:source-paths ["test"] ;; can't include src because of LT
                            :compiler
                            {:output-to "target/cljsbuild/whitespace/kukui.js"
                             :optimizations :simple
                             :externs ["externs/jquery.js" "externs/throttle.js" "externs/codemirror.js"]
                             :pretty-print true}}
               ;; avoid advanced recompilation when testing
               ;; :advanced {:source-paths ["src" "test"]
               ;;            :compiler
               ;;            {:output-to "target/cljsbuild/advanced/kukui.js"
               ;;             :pretty-print  false
               ;;             :optimizations :advanced}}
               }
              :test-commands {"whitespace" ["node" :node-runner
                                            "target/cljsbuild/whitespace/kukui.js"]
                              "advanced" ["phantomjs" :runner
                                          "target/cljsbuild/advanced/kukui.js"]}})
