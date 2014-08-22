(defproject kukui "0.1.0-pre"
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-2227"]
                 [datascript "0.1.5"]
                 [me.tagaholic/dlint "0.1.0"]]
  :profiles {:dev {:plugins [[lein-cljsbuild "1.0.3"]
                             [com.cemerick/clojurescript.test "0.3.1"]]
                   :hooks        [leiningen.cljsbuild]}}
  :cljsbuild {:builds
              {:whitespace {:source-paths ["test"] ;; can't include src because of LT
                            :compiler
                            {:output-to "target/cljsbuild/whitespace/kukui.js"
                             :optimizations :whitespace
                             :pretty-print true}}
               ;; avoid advanced recompilation when testing
               ;; :advanced {:source-paths ["src" "test"]
               ;;            :compiler
               ;;            {:output-to "target/cljsbuild/advanced/kukui.js"
               ;;             :pretty-print  false
               ;;             :optimizations :advanced}}
               }
              :test-commands {"whitespace" ["phantomjs" :runner
                                            "target/cljsbuild/whitespace/kukui.js"]
                              "advanced" ["phantomjs" :runner
                                          "target/cljsbuild/advanced/kukui.js"]}})
