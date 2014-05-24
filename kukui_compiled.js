if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.util')) {
goog.provide('lt.plugins.kukui.util');
goog.require('cljs.core');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor');
/**
* Insert string at the beginning of the next line
*/
lt.plugins.kukui.util.insert_at_next_line = (function insert_at_next_line(ed,s){lt.objs.editor.replace.call(null,lt.objs.editor.__GT_cm_ed.call(null,ed),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,ed)) + 1),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),s);
return ed;
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.selector')) {
goog.provide('lt.plugins.kukui.selector');
goog.require('cljs.core');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.sidebar.command');
lt.plugins.kukui.selector.__BEH__set_selected = (function __BEH__set_selected(this$,v){return lt.objs.sidebar.command.exec_active_BANG_.call(null,v);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.kukui.selector","set-selected","lt.plugins.kukui.selector/set-selected",3025761911),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select","select",4402849902),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.kukui.selector.__BEH__set_selected);
lt.plugins.kukui.selector.selector = (function selector(opts){var G__8509 = lt.objs.sidebar.command.filter_list.call(null,opts);lt.object.add_behavior_BANG_.call(null,G__8509,new cljs.core.Keyword("lt.plugins.kukui.selector","set-selected","lt.plugins.kukui.selector/set-selected",3025761911));
return G__8509;
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui')) {
goog.provide('lt.plugins.kukui');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.notifos');
goog.require('lt.plugins.sacha.codemirror');
goog.require('lt.objs.editor');
goog.require('lt.plugins.sacha');
goog.require('lt.plugins.kukui.selector');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.plugins.kukui.selector');
goog.require('clojure.set');
goog.require('lt.plugins.sacha');
goog.require('lt.plugins.kukui.util');
goog.require('lt.objs.command');
goog.require('clojure.string');
goog.require('lt.plugins.sacha.codemirror');
goog.require('clojure.set');
goog.require('lt.plugins.kukui.util');
goog.require('clojure.string');
goog.require('lt.objs.notifos');
goog.require('lt.objs.editor');
lt.plugins.kukui.desc_node_QMARK_ = (function desc_node_QMARK_(node){return cljs.core.re_find.call(null,/^\s*\+/,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node));
});
lt.plugins.kukui.parent_node_QMARK_ = (function parent_node_QMARK_(curr,next){if(cljs.core.truth_(next))
{return ((new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(next) > new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr))) && (cljs.core.not.call(null,lt.plugins.kukui.desc_node_QMARK_.call(null,next)));
} else
{return null;
}
});
lt.plugins.kukui.tag_prefix = "#";
lt.plugins.kukui.default_tag_char = "*";
/**
* Regex for pulling out tags with tag-prefix. To escape having a tag parsed,
* put a backslash before it e.g. \#escaped
*/
lt.plugins.kukui.tag_pattern = cljs.core.re_pattern.call(null,[cljs.core.str("(?:[^\\\\]|^)"),cljs.core.str("("),cljs.core.str(lt.plugins.kukui.tag_prefix),cljs.core.str("[^ \\t\\n:.,;\\*]+"),cljs.core.str(")")].join(''));
lt.plugins.kukui.text__GT_tags = (function text__GT_tags(text){return cljs.core.map.call(null,(function (p1__12077_SHARP_){return cljs.core.subs.call(null,p1__12077_SHARP_,1);
}),cljs.core.map.call(null,cljs.core.second,cljs.core.re_seq.call(null,lt.plugins.kukui.tag_pattern,text)));
});
lt.plugins.kukui.add_node_with_tags = (function add_node_with_tags(nodes,node,tags){return cljs.core.conj.call(null,nodes,cljs.core.assoc.call(null,node,new cljs.core.Keyword(null,"tags","tags",1017456523),tags));
});
/**
* Returns nodes with :line, :indent, :text and :tags properties.
* Tags are picked up from parents and any words starting with '#'.
*/
lt.plugins.kukui.__GT_tagged_nodes = (function __GT_tagged_nodes(ed,lines){return new cljs.core.Keyword(null,"nodes","nodes",1118897699).cljs$core$IFn$_invoke$arity$1(cljs.core.reduce.call(null,(function (accum,p__12083){var vec__12084 = p__12083;var curr = cljs.core.nth.call(null,vec__12084,0,null);var next = cljs.core.nth.call(null,vec__12084,1,null);if(cljs.core.truth_(lt.plugins.kukui.parent_node_QMARK_.call(null,curr,next)))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tags","tags",1017456523)], null),(function (p1__12079_SHARP_){return lt.plugins.kukui.add_node_with_tags.call(null,cljs.core.remove.call(null,(function (tag){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(tag),new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
}),p1__12079_SHARP_),curr,lt.plugins.kukui.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr)));
}));
} else
{if(cljs.core.truth_(lt.plugins.kukui.desc_node_QMARK_.call(null,curr)))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699),(cljs.core.count.call(null,new cljs.core.Keyword(null,"nodes","nodes",1118897699).cljs$core$IFn$_invoke$arity$1(accum)) - 1),new cljs.core.Keyword(null,"desc","desc",1016984067)], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),curr);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699)], null),(function (nodes){return lt.plugins.kukui.add_node_with_tags.call(null,nodes,curr,cljs.core.into.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.filter.call(null,(function (p1__12080_SHARP_){return (new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(p1__12080_SHARP_) < new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
}),new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(accum))),lt.plugins.kukui.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr))));
}));
} else
{return null;
}
}
}
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"nodes","nodes",1118897699),cljs.core.PersistentVector.EMPTY], null),cljs.core.partition.call(null,2,1,cljs.core.PersistentVector.EMPTY,cljs.core.map.call(null,(function (p1__12078_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"indent","indent",4124632094),new cljs.core.Keyword(null,"text","text",1017460895)],[p1__12078_SHARP_,lt.plugins.sacha.codemirror.line_indent.call(null,ed,p1__12078_SHARP_),lt.objs.editor.line.call(null,ed,p1__12078_SHARP_)]);
}),lines))));
});
/**
* For given lines, returns map of tags and how many nodes have that tag.
*/
lt.plugins.kukui.__GT_tagged_counts = (function __GT_tagged_counts(ed,lines){return cljs.core.frequencies.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523),lt.plugins.kukui.__GT_tagged_nodes.call(null,ed,lines)));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.tag-counts","kukui.tag-counts",2395081538),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: tag counts in current branch's nodes",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;return cljs.core.prn.call(null,lt.plugins.kukui.__GT_tagged_counts.call(null,ed,cljs.core.range.call(null,line,lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line))));
})], null));
lt.plugins.kukui.unknown_type = new cljs.core.Keyword(null,"unknown","unknown",729063356);
lt.plugins.kukui.config = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"types","types",1124748267),new cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"priority","priority",4143410454),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"names","names",1118489274),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, ["p0","p1","p2","p9","p?","later"], null),new cljs.core.Keyword(null,"default","default",2558708147),"p?"], null),new cljs.core.Keyword(null,"duration","duration",3316859142),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"names","names",1118489274),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["small","big"], null),new cljs.core.Keyword(null,"default","default",2558708147),"small"], null),lt.plugins.kukui.unknown_type,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"names","names",1118489274),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["leftover"], null),new cljs.core.Keyword(null,"default","default",2558708147),"leftover"], null)], true, false)], null);
/**
* Reduces a type's nodes to a tag map with a reducer fn.
*/
lt.plugins.kukui.type_nodes__GT_tag_map = (function type_nodes__GT_tag_map(f,type_config,nodes){var default_tag = (function (){var or__6813__auto__ = new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(type_config);if(cljs.core.truth_(or__6813__auto__))
{return or__6813__auto__;
} else
{return "leftover";
}
})();return cljs.core.reduce.call(null,(function (accum,node){var type_tags = clojure.set.intersection.call(null,cljs.core.set.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(node)),cljs.core.set.call(null,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(type_config)));var type_tags__$1 = ((cljs.core.empty_QMARK_.call(null,type_tags))?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [default_tag], null):type_tags);return cljs.core.reduce.call(null,(function (p1__12085_SHARP_,p2__12086_SHARP_){return f.call(null,p1__12085_SHARP_,p2__12086_SHARP_,node);
}),accum,type_tags__$1);
}),cljs.core.PersistentArrayMap.EMPTY,nodes);
});
lt.plugins.kukui.type_counts = cljs.core.partial.call(null,lt.plugins.kukui.type_nodes__GT_tag_map,(function (p1__12087_SHARP_,p2__12088_SHARP_){return cljs.core.update_in.call(null,p1__12087_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p2__12088_SHARP_], null),cljs.core.inc);
}));
/**
* Types config which calculates certain types based on nodes e.g. unknown type
* which accounts for typeless tags.
*/
lt.plugins.kukui.dynamic_config = (function dynamic_config(nodes){var unaccounted_tags = clojure.set.difference.call(null,cljs.core.set.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523),nodes)),cljs.core.set.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"names","names",1118489274),cljs.core.vals.call(null,new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.config)))));return cljs.core.update_in.call(null,lt.plugins.kukui.config,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267),lt.plugins.kukui.unknown_type,new cljs.core.Keyword(null,"names","names",1118489274)], null),(function (p1__12089_SHARP_){return cljs.core.into.call(null,unaccounted_tags,p1__12089_SHARP_);
}));
});
lt.plugins.kukui.ed__GT_nodes = (function() {
var ed__GT_nodes = null;
var ed__GT_nodes__1 = (function (ed){return ed__GT_nodes.call(null,ed,null);
});
var ed__GT_nodes__2 = (function (ed,lines){var lines__$1 = (function (){var or__6813__auto__ = lines;if(cljs.core.truth_(or__6813__auto__))
{return or__6813__auto__;
} else
{var temp__4124__auto__ = lt.objs.editor.selection_bounds.call(null,ed);if(cljs.core.truth_(temp__4124__auto__))
{var selection = temp__4124__auto__;return cljs.core.range.call(null,cljs.core.get_in.call(null,selection,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"from","from",1017056028),new cljs.core.Keyword(null,"line","line",1017226086)], null)),(cljs.core.get_in.call(null,selection,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"to","to",1013907949),new cljs.core.Keyword(null,"line","line",1017226086)], null)) + 1));
} else
{var line = lt.objs.editor.cursor.call(null,ed).line;return cljs.core.range.call(null,line,lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line));
}
}
})();return lt.plugins.kukui.__GT_tagged_nodes.call(null,ed,lines__$1);
});
ed__GT_nodes = function(ed,lines){
switch(arguments.length){
case 1:
return ed__GT_nodes__1.call(this,ed);
case 2:
return ed__GT_nodes__2.call(this,ed,lines);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
ed__GT_nodes.cljs$core$IFn$_invoke$arity$1 = ed__GT_nodes__1;
ed__GT_nodes.cljs$core$IFn$_invoke$arity$2 = ed__GT_nodes__2;
return ed__GT_nodes;
})()
;
lt.plugins.kukui.types_counts = (function types_counts(ed,lines){var nodes = lt.plugins.kukui.ed__GT_nodes.call(null,ed,lines);var types_config = lt.plugins.kukui.dynamic_config.call(null,nodes);return cljs.core.map.call(null,(function (p1__12090_SHARP_){return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[p1__12090_SHARP_,lt.plugins.kukui.type_counts.call(null,cljs.core.get_in.call(null,types_config,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267),p1__12090_SHARP_], null)),nodes)],null));
}),cljs.core.keys.call(null,new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(types_config)));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.types-counts","kukui.types-counts",4251463491),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: tag counts of each type for current branch or selection",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return cljs.core.prn.call(null,lt.plugins.kukui.types_counts.call(null,lt.objs.editor.pool.last_active.call(null),null));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.debug-nodes","kukui.debug-nodes",1810794576),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: prints nodes for current branch or selection",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return cljs.core.println.call(null,clojure.string.join.call(null,"\n",lt.plugins.kukui.ed__GT_nodes.call(null,lt.objs.editor.pool.last_active.call(null))));
})], null));
lt.plugins.kukui.type_map = cljs.core.partial.call(null,lt.plugins.kukui.type_nodes__GT_tag_map,(function (p1__12091_SHARP_,p2__12092_SHARP_,p3__12093_SHARP_){return cljs.core.update_in.call(null,p1__12091_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p2__12092_SHARP_], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),p3__12093_SHARP_);
}));
lt.plugins.kukui.indent_node = (function indent_node(node,indent){return clojure.string.replace_first.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node),/^\s*/,cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,indent," ")));
});
lt.plugins.kukui.indent_nodes = (function indent_nodes(nodes,indent,tab_size,offset_level){var offset = (offset_level * tab_size);var tag_indent = (indent + offset);var node_indent = ((indent + offset) + tab_size);var desc_indent = (((indent + offset) + tab_size) + tab_size);return cljs.core.mapcat.call(null,(function (p1__12094_SHARP_){if(cljs.core.truth_(new cljs.core.Keyword(null,"type-tag","type-tag",4631398905).cljs$core$IFn$_invoke$arity$1(p1__12094_SHARP_)))
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,tag_indent," "))),cljs.core.str(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(p1__12094_SHARP_))].join('')], null);
} else
{return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.kukui.indent_node.call(null,p1__12094_SHARP_,node_indent)], null),cljs.core.map.call(null,(function (x){return lt.plugins.kukui.indent_node.call(null,x,desc_indent);
}),new cljs.core.Keyword(null,"desc","desc",1016984067).cljs$core$IFn$_invoke$arity$1(p1__12094_SHARP_)));
}
}),nodes);
});
lt.plugins.kukui.add_tags_to_node = (function add_tags_to_node(node,tags){return cljs.core.update_in.call(null,node,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",1017460895)], null),cljs.core.str,clojure.string.join.call(null,cljs.core.map.call(null,(function (p1__12095_SHARP_){return [cljs.core.str(" "),cljs.core.str(lt.plugins.kukui.tag_prefix),cljs.core.str(p1__12095_SHARP_)].join('');
}),tags)));
});
/**
* Saves tags to node's text in order to not lose tags when switching views.
*/
lt.plugins.kukui.save_tags = (function save_tags(tags_nodes){return cljs.core.reduce_kv.call(null,(function (accum,tag,nodes){return cljs.core.assoc.call(null,accum,tag,cljs.core.map.call(null,(function (node){var tags_to_add = clojure.set.difference.call(null,cljs.core.set.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(node)),cljs.core.PersistentHashSet.fromArray([tag], true),cljs.core.set.call(null,lt.plugins.kukui.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node))));return lt.plugins.kukui.add_tags_to_node.call(null,node,tags_to_add);
}),nodes));
}),cljs.core.PersistentArrayMap.EMPTY,tags_nodes);
});
/**
* Ensures duplicate nodes are removed from least popular tags, leaving
* a duplicate node in its most popular tag.
*/
lt.plugins.kukui.ensure_unique_nodes = (function ensure_unique_nodes(tags_nodes){var freqs = cljs.core.frequencies.call(null,cljs.core.mapcat.call(null,cljs.core.second,tags_nodes));var dups = cljs.core.keep.call(null,((function (freqs){
return (function (p__12113){var vec__12114 = p__12113;var node = cljs.core.nth.call(null,vec__12114,0,null);var c = cljs.core.nth.call(null,vec__12114,1,null);if((c > 1))
{return node;
} else
{return null;
}
});})(freqs))
,freqs);var most_popular_tag = ((function (freqs,dups){
return (function (p1__12096_SHARP_){return cljs.core.first.call(null,cljs.core.apply.call(null,cljs.core.max_key,((function (freqs,dups){
return (function (p__12115){var vec__12116 = p__12115;var tag = cljs.core.nth.call(null,vec__12116,0,null);var nodes = cljs.core.nth.call(null,vec__12116,1,null);if(cljs.core.truth_(cljs.core.set.call(null,p1__12096_SHARP_).call(null,tag)))
{return cljs.core.count.call(null,nodes);
} else
{return null;
}
});})(freqs,dups))
,tags_nodes));
});})(freqs,dups))
;var tag_dups = cljs.core.map.call(null,((function (freqs,dups,most_popular_tag){
return (function (p1__12097_SHARP_){return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[most_popular_tag.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__12097_SHARP_)),p1__12097_SHARP_],null));
});})(freqs,dups,most_popular_tag))
,dups);var disallowed_node_QMARK_ = ((function (freqs,dups,most_popular_tag,tag_dups){
return (function (node,tag){return cljs.core.some.call(null,((function (freqs,dups,most_popular_tag,tag_dups){
return (function (p__12117){var vec__12118 = p__12117;var allowed_tag = cljs.core.nth.call(null,vec__12118,0,null);var dup_node = cljs.core.nth.call(null,vec__12118,1,null);return (cljs.core._EQ_.call(null,dup_node,node)) && (cljs.core.not_EQ_.call(null,allowed_tag,tag));
});})(freqs,dups,most_popular_tag,tag_dups))
,tag_dups);
});})(freqs,dups,most_popular_tag,tag_dups))
;var seq__12119_12151 = cljs.core.seq.call(null,tag_dups);var chunk__12120_12152 = null;var count__12121_12153 = 0;var i__12122_12154 = 0;while(true){
if((i__12122_12154 < count__12121_12153))
{var vec__12123_12155 = cljs.core._nth.call(null,chunk__12120_12152,i__12122_12154);var tag_12156 = cljs.core.nth.call(null,vec__12123_12155,0,null);var node_12157 = cljs.core.nth.call(null,vec__12123_12155,1,null);cljs.core.println.call(null,[cljs.core.str("Line '"),cljs.core.str(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node_12157)),cljs.core.str("' has overlapping tags. Put line under "),cljs.core.str(lt.plugins.kukui.tag_prefix),cljs.core.str(tag_12156)].join(''));
{
var G__12158 = seq__12119_12151;
var G__12159 = chunk__12120_12152;
var G__12160 = count__12121_12153;
var G__12161 = (i__12122_12154 + 1);
seq__12119_12151 = G__12158;
chunk__12120_12152 = G__12159;
count__12121_12153 = G__12160;
i__12122_12154 = G__12161;
continue;
}
} else
{var temp__4126__auto___12162 = cljs.core.seq.call(null,seq__12119_12151);if(temp__4126__auto___12162)
{var seq__12119_12163__$1 = temp__4126__auto___12162;if(cljs.core.chunked_seq_QMARK_.call(null,seq__12119_12163__$1))
{var c__7561__auto___12164 = cljs.core.chunk_first.call(null,seq__12119_12163__$1);{
var G__12165 = cljs.core.chunk_rest.call(null,seq__12119_12163__$1);
var G__12166 = c__7561__auto___12164;
var G__12167 = cljs.core.count.call(null,c__7561__auto___12164);
var G__12168 = 0;
seq__12119_12151 = G__12165;
chunk__12120_12152 = G__12166;
count__12121_12153 = G__12167;
i__12122_12154 = G__12168;
continue;
}
} else
{var vec__12124_12169 = cljs.core.first.call(null,seq__12119_12163__$1);var tag_12170 = cljs.core.nth.call(null,vec__12124_12169,0,null);var node_12171 = cljs.core.nth.call(null,vec__12124_12169,1,null);cljs.core.println.call(null,[cljs.core.str("Line '"),cljs.core.str(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node_12171)),cljs.core.str("' has overlapping tags. Put line under "),cljs.core.str(lt.plugins.kukui.tag_prefix),cljs.core.str(tag_12170)].join(''));
{
var G__12172 = cljs.core.next.call(null,seq__12119_12163__$1);
var G__12173 = null;
var G__12174 = 0;
var G__12175 = 0;
seq__12119_12151 = G__12172;
chunk__12120_12152 = G__12173;
count__12121_12153 = G__12174;
i__12122_12154 = G__12175;
continue;
}
}
} else
{}
}
break;
}
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.call(null,(function (p__12125){var vec__12126 = p__12125;var tag = cljs.core.nth.call(null,vec__12126,0,null);var nodes = cljs.core.nth.call(null,vec__12126,1,null);var new_nodes = cljs.core.remove.call(null,(function (p1__12098_SHARP_){return disallowed_node_QMARK_.call(null,p1__12098_SHARP_,tag);
}),nodes);if(cljs.core.seq.call(null,new_nodes))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag,cljs.core.vec.call(null,new_nodes)], null);
} else
{return null;
}
}),tags_nodes));
});
/**
* Creates a view given a type or a view config and the editor (branch) to use. A view
* pivots the current branch by changing the parents of a branch.
* @param {...*} var_args
*/
lt.plugins.kukui.__GT_view = (function() { 
var __GT_view__delegate = function (ed,type_or_view,p__12128){var map__12130 = p__12128;var map__12130__$1 = ((cljs.core.seq_QMARK_.call(null,map__12130))?cljs.core.apply.call(null,cljs.core.hash_map,map__12130):map__12130);var lines = cljs.core.get.call(null,map__12130__$1,new cljs.core.Keyword(null,"lines","lines",1116881521));var query_tag = cljs.core.get.call(null,map__12130__$1,new cljs.core.Keyword(null,"query-tag","query-tag",3500842119));var level = cljs.core.get.call(null,map__12130__$1,new cljs.core.Keyword(null,"level","level",1116770038),1);var nodes = lt.plugins.kukui.ed__GT_nodes.call(null,ed,lines);var nodes__$1 = (cljs.core.truth_(query_tag)?cljs.core.filter.call(null,((function (nodes){
return (function (p1__12127_SHARP_){return cljs.core.contains_QMARK_.call(null,cljs.core.set.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__12127_SHARP_)),query_tag);
});})(nodes))
,nodes):nodes);var view_config = ((cljs.core.map_QMARK_.call(null,type_or_view))?type_or_view:cljs.core.get_in.call(null,lt.plugins.kukui.dynamic_config.call(null,nodes__$1),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267),type_or_view], null)));var tags_nodes = lt.plugins.kukui.type_map.call(null,view_config,nodes__$1);var tags_nodes__$1 = lt.plugins.kukui.ensure_unique_nodes.call(null,tags_nodes);var tags_nodes__$2 = lt.plugins.kukui.save_tags.call(null,tags_nodes__$1);var new_nodes = cljs.core.mapcat.call(null,((function (nodes,nodes__$1,view_config,tags_nodes,tags_nodes__$1,tags_nodes__$2){
return (function (tag){var temp__4126__auto__ = cljs.core.get.call(null,tags_nodes__$2,tag);if(cljs.core.truth_(temp__4126__auto__))
{var children = temp__4126__auto__;return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type-tag","type-tag",4631398905),true,new cljs.core.Keyword(null,"text","text",1017460895),[cljs.core.str(lt.plugins.kukui.tag_prefix),cljs.core.str(cljs.core.name.call(null,tag))].join('')], null)], null),children);
} else
{return null;
}
});})(nodes,nodes__$1,view_config,tags_nodes,tags_nodes__$1,tags_nodes__$2))
,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(view_config));var indented_nodes = lt.plugins.kukui.indent_nodes.call(null,new_nodes,lt.plugins.sacha.codemirror.line_indent.call(null,ed,lt.objs.editor.cursor.call(null,ed).line),lt.objs.editor.option.call(null,ed,"tabSize"),level);return [cljs.core.str(clojure.string.join.call(null,"\n",indented_nodes)),cljs.core.str("\n")].join('');
};
var __GT_view = function (ed,type_or_view,var_args){
var p__12128 = null;if (arguments.length > 2) {
  p__12128 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return __GT_view__delegate.call(this,ed,type_or_view,p__12128);};
__GT_view.cljs$lang$maxFixedArity = 2;
__GT_view.cljs$lang$applyTo = (function (arglist__12176){
var ed = cljs.core.first(arglist__12176);
arglist__12176 = cljs.core.next(arglist__12176);
var type_or_view = cljs.core.first(arglist__12176);
var p__12128 = cljs.core.rest(arglist__12176);
return __GT_view__delegate(ed,type_or_view,p__12128);
});
__GT_view.cljs$core$IFn$_invoke$arity$variadic = __GT_view__delegate;
return __GT_view;
})()
;
lt.plugins.kukui.type_selector = lt.plugins.kukui.selector.selector.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"items","items",1114430258),(function (){return cljs.core.map.call(null,(function (p1__12131_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"name","name",1017277949)],[cljs.core.name.call(null,p1__12131_SHARP_)]);
}),cljs.core.keys.call(null,new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.config)));
}),new cljs.core.Keyword(null,"key","key",1014010321),new cljs.core.Keyword(null,"name","name",1017277949)], null));
lt.plugins.kukui.check_types_counts = (function() {
var check_types_counts = null;
var check_types_counts__2 = (function (ed,editor_fn){return check_types_counts.call(null,ed,editor_fn,null);
});
var check_types_counts__3 = (function (ed,editor_fn,lines){var before_replace_counts = lt.plugins.kukui.types_counts.call(null,ed,lines);var new_body_count = cljs.core.count.call(null,clojure.string.split_lines.call(null,editor_fn.call(null)));var new_lines = (cljs.core.truth_(lines)?cljs.core.range.call(null,cljs.core.first.call(null,lines),(new_body_count + cljs.core.first.call(null,lines))):null);var after_replace_counts = lt.plugins.kukui.types_counts.call(null,ed,new_lines);if(cljs.core._EQ_.call(null,before_replace_counts,after_replace_counts))
{return null;
} else
{lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.undo","editor.undo",4270768183));
lt.objs.notifos.set_msg_BANG_.call(null,"Before and after type counts not equal. Please submit your outline as an issue.",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
return cljs.core.println.call(null,"BEFORE: ",before_replace_counts,"\nAFTER: ",after_replace_counts);
}
});
check_types_counts = function(ed,editor_fn,lines){
switch(arguments.length){
case 2:
return check_types_counts__2.call(this,ed,editor_fn);
case 3:
return check_types_counts__3.call(this,ed,editor_fn,lines);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
check_types_counts.cljs$core$IFn$_invoke$arity$2 = check_types_counts__2;
check_types_counts.cljs$core$IFn$_invoke$arity$3 = check_types_counts__3;
return check_types_counts;
})()
;
/**
* Stamp children nodes with parent tags
*/
lt.plugins.kukui.stamp_nodes = (function stamp_nodes(ed){var level = 0;var nodes = lt.plugins.kukui.ed__GT_nodes.call(null,ed);var parent_tags = lt.plugins.kukui.text__GT_tags.call(null,lt.objs.editor.line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line));var new_nodes = cljs.core.map.call(null,((function (level,nodes,parent_tags){
return (function (p1__12132_SHARP_){return lt.plugins.kukui.add_tags_to_node.call(null,p1__12132_SHARP_,parent_tags);
});})(level,nodes,parent_tags))
,nodes);var indented_nodes = lt.plugins.kukui.indent_nodes.call(null,new_nodes,lt.plugins.sacha.codemirror.line_indent.call(null,ed,lt.objs.editor.cursor.call(null,ed).line),lt.objs.editor.option.call(null,ed,"tabSize"),level);return [cljs.core.str(clojure.string.join.call(null,"\n",indented_nodes)),cljs.core.str("\n")].join('');
});
lt.plugins.kukui.replace_children = (function replace_children(ed,view_fn){var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line);return lt.plugins.kukui.check_types_counts.call(null,ed,(function (){var new_body = view_fn.call(null,ed);lt.objs.editor.replace.call(null,lt.objs.editor.__GT_cm_ed.call(null,ed),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,ed)) + 1),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),end_line,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new_body);
return new_body;
}));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.type-replace-children","kukui.type-replace-children",2704104452),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: replaces current children with new type view",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.kukui.type_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){return lt.plugins.kukui.replace_children.call(null,lt.objs.editor.pool.last_active.call(null),(function (p1__12133_SHARP_){return lt.plugins.kukui.__GT_view.call(null,p1__12133_SHARP_,cljs.core.keyword.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(type)));
}));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.type-replace-branch","kukui.type-replace-branch",3632901223),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: replaces current branch with new type view",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.kukui.type_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line);return lt.plugins.kukui.check_types_counts.call(null,ed,(function (){var new_body = lt.plugins.kukui.__GT_view.call(null,ed,cljs.core.keyword.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(type)),new cljs.core.Keyword(null,"level","level",1116770038),0);lt.objs.editor.replace.call(null,lt.objs.editor.__GT_cm_ed.call(null,ed),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,ed)),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),end_line,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new_body);
return new_body;
}),cljs.core.range.call(null,line,end_line));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.insert-type-branch","kukui.insert-type-branch",1092237804),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: inserts new type view for current branch",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.kukui.type_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var ed = lt.objs.editor.pool.last_active.call(null);return lt.plugins.kukui.util.insert_at_next_line.call(null,ed,lt.plugins.kukui.__GT_view.call(null,ed,cljs.core.keyword.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(type))));
})], null));
/**
* Expands a tag if it's a type
*/
lt.plugins.kukui.expand_tag = (function expand_tag(types_config,tag){if(cljs.core.contains_QMARK_.call(null,cljs.core.set.call(null,cljs.core.keys.call(null,new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(types_config))),cljs.core.keyword.call(null,tag)))
{return cljs.core.get_in.call(null,types_config,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267),cljs.core.keyword.call(null,tag),new cljs.core.Keyword(null,"names","names",1118489274)], null));
} else
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag], null);
}
});
/**
* Used by query view and config to associate a parent tag (type) with its tags.
* To specify a default tag use an asterisk after a tag. For example:
* #type: tag1, tag2*
*/
lt.plugins.kukui.text__GT_tag_group = (function text__GT_tag_group(types_config,text){if(cljs.core.seq.call(null,text))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"seq","seq",-1640417768,null),new cljs.core.Symbol(null,"text","text",-1636974874,null))))].join('')));
}
var vec__12139 = cljs.core.re_find.call(null,/^\s*(\S+:|)\s*(.*)$/,text);var _ = cljs.core.nth.call(null,vec__12139,0,null);var parent_tag = cljs.core.nth.call(null,vec__12139,1,null);var tags_string = cljs.core.nth.call(null,vec__12139,2,null);var parent_tag__$1 = ((cljs.core.seq.call(null,parent_tag))?cljs.core.first.call(null,lt.plugins.kukui.text__GT_tags.call(null,parent_tag)):null);var raw_tags = clojure.string.split.call(null,tags_string,/\s*,\s*/);var default_tag = (function (){var G__12140 = cljs.core.some.call(null,((function (vec__12139,_,parent_tag,tags_string,parent_tag__$1,raw_tags){
return (function (p1__12134_SHARP_){if(cljs.core._EQ_.call(null,lt.plugins.kukui.default_tag_char,cljs.core.subs.call(null,p1__12134_SHARP_,(cljs.core.count.call(null,p1__12134_SHARP_) - 1))))
{return p1__12134_SHARP_;
} else
{return null;
}
});})(vec__12139,_,parent_tag,tags_string,parent_tag__$1,raw_tags))
,raw_tags);var G__12140__$1 = (((G__12140 == null))?null:((function (G__12140,vec__12139,_,parent_tag,tags_string,parent_tag__$1,raw_tags){
return (function (p1__12135_SHARP_){return [cljs.core.str(lt.plugins.kukui.tag_prefix),cljs.core.str(cljs.core.subs.call(null,p1__12135_SHARP_,0,(cljs.core.count.call(null,p1__12135_SHARP_) - 1)))].join('');
});})(G__12140,vec__12139,_,parent_tag,tags_string,parent_tag__$1,raw_tags))
.call(null,G__12140));var G__12140__$2 = (((G__12140__$1 == null))?null:lt.plugins.kukui.text__GT_tags.call(null,G__12140__$1));var G__12140__$3 = (((G__12140__$2 == null))?null:cljs.core.first.call(null,G__12140__$2));return G__12140__$3;
})();var tags = (cljs.core.truth_(tags_string)?lt.plugins.kukui.text__GT_tags.call(null,clojure.string.join.call(null," ",cljs.core.map.call(null,((function (vec__12139,_,parent_tag,tags_string,parent_tag__$1,raw_tags,default_tag){
return (function (p1__12136_SHARP_){return [cljs.core.str(lt.plugins.kukui.tag_prefix),cljs.core.str(p1__12136_SHARP_)].join('');
});})(vec__12139,_,parent_tag,tags_string,parent_tag__$1,raw_tags,default_tag))
,raw_tags))):null);var tags__$1 = cljs.core.mapcat.call(null,cljs.core.partial.call(null,lt.plugins.kukui.expand_tag,types_config),tags);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"parent-tag","parent-tag",768068457),parent_tag__$1,new cljs.core.Keyword(null,"tags","tags",1017456523),tags__$1,new cljs.core.Keyword(null,"default-tag","default-tag",575796608),default_tag], null);
});
/**
* Create a view given a query. There are two formats.
* With parent:    #type: tag1, tag2
* Without parent: tag1, tag2
* @param {...*} var_args
*/
lt.plugins.kukui.__GT_query_view = (function() { 
var __GT_query_view__delegate = function (ed,query,p__12142){var map__12145 = p__12142;var map__12145__$1 = ((cljs.core.seq_QMARK_.call(null,map__12145))?cljs.core.apply.call(null,cljs.core.hash_map,map__12145):map__12145);var lines = cljs.core.get.call(null,map__12145__$1,new cljs.core.Keyword(null,"lines","lines",1116881521));var types_config = cljs.core.get.call(null,map__12145__$1,new cljs.core.Keyword(null,"types-config","types-config",4798725768));var view_fn = cljs.core.get.call(null,map__12145__$1,new cljs.core.Keyword(null,"view-fn","view-fn",1468084322),((function (map__12145,map__12145__$1,lines,types_config){
return (function (p1__12141_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"names","names",1118489274)],[p1__12141_SHARP_]);
});})(map__12145,map__12145__$1,lines,types_config))
);var level = cljs.core.get.call(null,map__12145__$1,new cljs.core.Keyword(null,"level","level",1116770038),1);var map__12146 = lt.plugins.kukui.text__GT_tag_group.call(null,types_config,query);var map__12146__$1 = ((cljs.core.seq_QMARK_.call(null,map__12146))?cljs.core.apply.call(null,cljs.core.hash_map,map__12146):map__12146);var tags = cljs.core.get.call(null,map__12146__$1,new cljs.core.Keyword(null,"tags","tags",1017456523));var parent_tag = cljs.core.get.call(null,map__12146__$1,new cljs.core.Keyword(null,"parent-tag","parent-tag",768068457));var view_config = view_fn.call(null,tags);return lt.plugins.kukui.__GT_view.call(null,ed,view_config,new cljs.core.Keyword(null,"level","level",1116770038),level,new cljs.core.Keyword(null,"query-tag","query-tag",3500842119),parent_tag,new cljs.core.Keyword(null,"lines","lines",1116881521),lines);
};
var __GT_query_view = function (ed,query,var_args){
var p__12142 = null;if (arguments.length > 2) {
  p__12142 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return __GT_query_view__delegate.call(this,ed,query,p__12142);};
__GT_query_view.cljs$lang$maxFixedArity = 2;
__GT_query_view.cljs$lang$applyTo = (function (arglist__12177){
var ed = cljs.core.first(arglist__12177);
arglist__12177 = cljs.core.next(arglist__12177);
var query = cljs.core.first(arglist__12177);
var p__12142 = cljs.core.rest(arglist__12177);
return __GT_query_view__delegate(ed,query,p__12142);
});
__GT_query_view.cljs$core$IFn$_invoke$arity$variadic = __GT_query_view__delegate;
return __GT_query_view;
})()
;
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.query-replace-children","kukui.query-replace-children",3544797768),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: replaces current children based on current node's query",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line);var new_body = lt.plugins.kukui.__GT_query_view.call(null,ed,lt.objs.editor.line.call(null,ed,line),new cljs.core.Keyword(null,"types-config","types-config",4798725768),lt.plugins.kukui.config,new cljs.core.Keyword(null,"view-fn","view-fn",1468084322),((function (ed,line,end_line){
return (function (p1__12147_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"names","names",1118489274),new cljs.core.Keyword(null,"default","default",2558708147)],[cljs.core.conj.call(null,p1__12147_SHARP_,"leftover"),"leftover"]);
});})(ed,line,end_line))
);return lt.objs.editor.replace.call(null,lt.objs.editor.__GT_cm_ed.call(null,ed),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),(line + 1),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),end_line,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new_body);
})], null));
lt.plugins.kukui.find_parent_line = (function find_parent_line(ed,line){return lt.plugins.sacha.codemirror.find_parent.call(null,ed,cljs.core.range.call(null,(line - 1),-1,-1),lt.plugins.sacha.codemirror.line_indent.call(null,ed,line));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.query-insert-children","kukui.query-insert-children",2043705447),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: inserts current children based on parent node's query",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var parent_line = lt.plugins.kukui.find_parent_line.call(null,ed,line);var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,parent_line);var new_body = lt.plugins.kukui.__GT_query_view.call(null,ed,lt.objs.editor.line.call(null,ed,line),new cljs.core.Keyword(null,"types-config","types-config",4798725768),lt.plugins.kukui.config,new cljs.core.Keyword(null,"lines","lines",1116881521),cljs.core.range.call(null,parent_line,end_line));if(cljs.core.truth_(clojure.string.blank_QMARK_.call(null,new_body)))
{return lt.objs.notifos.set_msg_BANG_.call(null,[cljs.core.str("No results for '"),cljs.core.str(lt.objs.editor.line.call(null,ed,line)),cljs.core.str("'")].join(''));
} else
{return lt.plugins.kukui.util.insert_at_next_line.call(null,ed,new_body);
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.raise-node","kukui.raise-node",3970575278),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Raises node to replace parent and sets it to parent's level",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var parent_line = lt.plugins.kukui.find_parent_line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line);return lt.objs.editor.operation.call(null,ed,(function (){lt.plugins.sacha.codemirror.delete_lines.call(null,ed,parent_line,parent_line);
return lt.plugins.sacha.indent_branch.call(null,"subtract");
}));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.stamp-children","kukui.stamp-children",3918722228),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: stamps current children with parent tags",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.kukui.replace_children.call(null,lt.objs.editor.pool.last_active.call(null),lt.plugins.kukui.stamp_nodes);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.save-config","kukui.save-config",3414100779),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Saves children as config (only :types supported so far)",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var children_lines = cljs.core.range.call(null,(line + 1),lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line));var new_config = cljs.core.update_in.call(null,lt.plugins.kukui.config,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267)], null),cljs.core.merge,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (ed,line,children_lines){
return (function (p1__12150_SHARP_){return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.keyword.call(null,new cljs.core.Keyword(null,"parent-tag","parent-tag",768068457).cljs$core$IFn$_invoke$arity$1(p1__12150_SHARP_)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"names","names",1118489274),cljs.core.vec.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__12150_SHARP_)),new cljs.core.Keyword(null,"default","default",2558708147),new cljs.core.Keyword(null,"default-tag","default-tag",575796608).cljs$core$IFn$_invoke$arity$1(p1__12150_SHARP_)], null)],null));
});})(ed,line,children_lines))
,cljs.core.remove.call(null,((function (ed,line,children_lines){
return (function (p1__12149_SHARP_){var no_parent = cljs.core.not.call(null,new cljs.core.Keyword(null,"parent-tag","parent-tag",768068457).cljs$core$IFn$_invoke$arity$1(p1__12149_SHARP_));if(no_parent)
{cljs.core.println.call(null,"Skipping line with no parent-tag: ",cljs.core.pr_str.call(null,p1__12149_SHARP_));
} else
{}
return no_parent;
});})(ed,line,children_lines))
,cljs.core.map.call(null,cljs.core.partial.call(null,lt.plugins.kukui.text__GT_tag_group,lt.plugins.kukui.config),cljs.core.map.call(null,((function (ed,line,children_lines){
return (function (p1__12148_SHARP_){return lt.objs.editor.line.call(null,ed,p1__12148_SHARP_);
});})(ed,line,children_lines))
,children_lines))))));cljs.core.println.call(null,"New config is: ",cljs.core.pr_str.call(null,new_config));
lt.objs.notifos.set_msg_BANG_.call(null,"Saved config");
lt.plugins.kukui.config = new_config;
})], null));
}

//# sourceMappingURL=kukui_compiled.js.map