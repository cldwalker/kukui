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
lt.plugins.kukui.selector.selector = (function selector(opts){var G__8514 = lt.objs.sidebar.command.filter_list.call(null,opts);lt.object.add_behavior_BANG_.call(null,G__8514,new cljs.core.Keyword("lt.plugins.kukui.selector","set-selected","lt.plugins.kukui.selector/set-selected",3025761911));
return G__8514;
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui')) {
goog.provide('lt.plugins.kukui');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.notifos');
goog.require('lt.plugins.sacha.codemirror');
goog.require('lt.objs.editor');
goog.require('lt.plugins.kukui.selector');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.plugins.kukui.selector');
goog.require('clojure.set');
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
/**
* Regex for pulling out tags with tag-prefix. To escape having a tag parsed,
* put a backslash before it e.g. \#escaped
*/
lt.plugins.kukui.tag_pattern = cljs.core.re_pattern.call(null,[cljs.core.str("(?:[^\\\\]|^)"),cljs.core.str("("),cljs.core.str(lt.plugins.kukui.tag_prefix),cljs.core.str("[^ \\t\\n:.,;]+"),cljs.core.str(")")].join(''));
lt.plugins.kukui.text__GT_tags = (function text__GT_tags(text){return cljs.core.map.call(null,(function (p1__8737_SHARP_){return cljs.core.subs.call(null,p1__8737_SHARP_,1);
}),cljs.core.map.call(null,cljs.core.second,cljs.core.re_seq.call(null,lt.plugins.kukui.tag_pattern,text)));
});
lt.plugins.kukui.add_node_with_tags = (function add_node_with_tags(nodes,node,tags){return cljs.core.conj.call(null,nodes,cljs.core.assoc.call(null,node,new cljs.core.Keyword(null,"tags","tags",1017456523),tags));
});
/**
* Returns nodes with :line, :indent, :text and :tags properties.
* Tags are picked up from parents and any words starting with '#'.
*/
lt.plugins.kukui.__GT_tagged_nodes = (function __GT_tagged_nodes(ed,lines){return new cljs.core.Keyword(null,"nodes","nodes",1118897699).cljs$core$IFn$_invoke$arity$1(cljs.core.reduce.call(null,(function (accum,p__8743){var vec__8744 = p__8743;var curr = cljs.core.nth.call(null,vec__8744,0,null);var next = cljs.core.nth.call(null,vec__8744,1,null);if(cljs.core.truth_(lt.plugins.kukui.parent_node_QMARK_.call(null,curr,next)))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tags","tags",1017456523)], null),(function (p1__8739_SHARP_){return lt.plugins.kukui.add_node_with_tags.call(null,cljs.core.remove.call(null,(function (tag){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(tag),new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
}),p1__8739_SHARP_),curr,lt.plugins.kukui.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr)));
}));
} else
{if(cljs.core.truth_(lt.plugins.kukui.desc_node_QMARK_.call(null,curr)))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699),(cljs.core.count.call(null,new cljs.core.Keyword(null,"nodes","nodes",1118897699).cljs$core$IFn$_invoke$arity$1(accum)) - 1),new cljs.core.Keyword(null,"desc","desc",1016984067)], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),curr);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699)], null),(function (nodes){return lt.plugins.kukui.add_node_with_tags.call(null,nodes,curr,cljs.core.into.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.filter.call(null,(function (p1__8740_SHARP_){return (new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(p1__8740_SHARP_) < new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
}),new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(accum))),lt.plugins.kukui.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr))));
}));
} else
{return null;
}
}
}
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"nodes","nodes",1118897699),cljs.core.PersistentVector.EMPTY], null),cljs.core.partition.call(null,2,1,cljs.core.PersistentVector.EMPTY,cljs.core.map.call(null,(function (p1__8738_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"indent","indent",4124632094),new cljs.core.Keyword(null,"text","text",1017460895)],[p1__8738_SHARP_,lt.plugins.sacha.codemirror.line_indent.call(null,ed,p1__8738_SHARP_),lt.objs.editor.line.call(null,ed,p1__8738_SHARP_)]);
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
})();return cljs.core.reduce.call(null,(function (accum,node){var type_tags = clojure.set.intersection.call(null,cljs.core.set.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(node)),cljs.core.set.call(null,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(type_config)));var type_tags__$1 = ((cljs.core.empty_QMARK_.call(null,type_tags))?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [default_tag], null):type_tags);return cljs.core.reduce.call(null,(function (p1__8745_SHARP_,p2__8746_SHARP_){return f.call(null,p1__8745_SHARP_,p2__8746_SHARP_,node);
}),accum,type_tags__$1);
}),cljs.core.PersistentArrayMap.EMPTY,nodes);
});
lt.plugins.kukui.type_counts = cljs.core.partial.call(null,lt.plugins.kukui.type_nodes__GT_tag_map,(function (p1__8747_SHARP_,p2__8748_SHARP_){return cljs.core.update_in.call(null,p1__8747_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p2__8748_SHARP_], null),cljs.core.inc);
}));
/**
* Types config which calculates certain types based on nodes e.g. unknown type
* which accounts for typeless tags.
*/
lt.plugins.kukui.dynamic_config = (function dynamic_config(nodes){var unaccounted_tags = clojure.set.difference.call(null,cljs.core.set.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523),nodes)),cljs.core.set.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"names","names",1118489274),cljs.core.vals.call(null,new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.config)))));return cljs.core.update_in.call(null,lt.plugins.kukui.config,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267),lt.plugins.kukui.unknown_type,new cljs.core.Keyword(null,"names","names",1118489274)], null),(function (p1__8749_SHARP_){return cljs.core.into.call(null,unaccounted_tags,p1__8749_SHARP_);
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
lt.plugins.kukui.types_counts = (function types_counts(ed,lines){var nodes = lt.plugins.kukui.ed__GT_nodes.call(null,ed,lines);var types_config = lt.plugins.kukui.dynamic_config.call(null,nodes);return cljs.core.map.call(null,(function (p1__8750_SHARP_){return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[p1__8750_SHARP_,lt.plugins.kukui.type_counts.call(null,cljs.core.get_in.call(null,types_config,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267),p1__8750_SHARP_], null)),nodes)],null));
}),cljs.core.keys.call(null,new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(types_config)));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.types-counts","kukui.types-counts",4251463491),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: tag counts of each type for current branch or selection",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return cljs.core.prn.call(null,lt.plugins.kukui.types_counts.call(null,lt.objs.editor.pool.last_active.call(null),null));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.debug-nodes","kukui.debug-nodes",1810794576),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: prints nodes for current branch or selection",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return cljs.core.println.call(null,clojure.string.join.call(null,"\n",lt.plugins.kukui.ed__GT_nodes.call(null,lt.objs.editor.pool.last_active.call(null))));
})], null));
lt.plugins.kukui.type_map = cljs.core.partial.call(null,lt.plugins.kukui.type_nodes__GT_tag_map,(function (p1__8751_SHARP_,p2__8752_SHARP_,p3__8753_SHARP_){return cljs.core.update_in.call(null,p1__8751_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p2__8752_SHARP_], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),p3__8753_SHARP_);
}));
lt.plugins.kukui.indent_node = (function indent_node(node,indent){return clojure.string.replace_first.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node),/^\s*/,cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,indent," ")));
});
lt.plugins.kukui.indent_nodes = (function indent_nodes(nodes,indent,tab_size,offset_level){var offset = (offset_level * tab_size);var tag_indent = (indent + offset);var node_indent = ((indent + offset) + tab_size);var desc_indent = (((indent + offset) + tab_size) + tab_size);return cljs.core.mapcat.call(null,(function (p1__8754_SHARP_){if(cljs.core.truth_(new cljs.core.Keyword(null,"type-tag","type-tag",4631398905).cljs$core$IFn$_invoke$arity$1(p1__8754_SHARP_)))
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,tag_indent," "))),cljs.core.str(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(p1__8754_SHARP_))].join('')], null);
} else
{return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.kukui.indent_node.call(null,p1__8754_SHARP_,node_indent)], null),cljs.core.map.call(null,(function (x){return lt.plugins.kukui.indent_node.call(null,x,desc_indent);
}),new cljs.core.Keyword(null,"desc","desc",1016984067).cljs$core$IFn$_invoke$arity$1(p1__8754_SHARP_)));
}
}),nodes);
});
/**
* Saves tags to node's text in order to not lose tags when switching views.
*/
lt.plugins.kukui.save_tags = (function save_tags(tags_nodes){return cljs.core.reduce_kv.call(null,(function (accum,tag,nodes){return cljs.core.assoc.call(null,accum,tag,cljs.core.map.call(null,(function (node){var tags_to_add = clojure.set.difference.call(null,cljs.core.set.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(node)),cljs.core.PersistentHashSet.fromArray([tag], true),cljs.core.set.call(null,lt.plugins.kukui.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node))));return cljs.core.update_in.call(null,node,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",1017460895)], null),cljs.core.str,clojure.string.join.call(null,cljs.core.map.call(null,(function (p1__8755_SHARP_){return [cljs.core.str(" "),cljs.core.str(lt.plugins.kukui.tag_prefix),cljs.core.str(p1__8755_SHARP_)].join('');
}),tags_to_add)));
}),nodes));
}),cljs.core.PersistentArrayMap.EMPTY,tags_nodes);
});
/**
* Ensures duplicate nodes are removed from least popular tags, leaving
* a duplicate node in its most popular tag.
*/
lt.plugins.kukui.ensure_unique_nodes = (function ensure_unique_nodes(tags_nodes){var freqs = cljs.core.frequencies.call(null,cljs.core.mapcat.call(null,cljs.core.second,tags_nodes));var dups = cljs.core.keep.call(null,((function (freqs){
return (function (p__8773){var vec__8774 = p__8773;var node = cljs.core.nth.call(null,vec__8774,0,null);var c = cljs.core.nth.call(null,vec__8774,1,null);if((c > 1))
{return node;
} else
{return null;
}
});})(freqs))
,freqs);var most_popular_tag = ((function (freqs,dups){
return (function (p1__8756_SHARP_){return cljs.core.first.call(null,cljs.core.apply.call(null,cljs.core.max_key,((function (freqs,dups){
return (function (p__8775){var vec__8776 = p__8775;var tag = cljs.core.nth.call(null,vec__8776,0,null);var nodes = cljs.core.nth.call(null,vec__8776,1,null);if(cljs.core.truth_(cljs.core.set.call(null,p1__8756_SHARP_).call(null,tag)))
{return cljs.core.count.call(null,nodes);
} else
{return null;
}
});})(freqs,dups))
,tags_nodes));
});})(freqs,dups))
;var tag_dups = cljs.core.map.call(null,((function (freqs,dups,most_popular_tag){
return (function (p1__8757_SHARP_){return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[most_popular_tag.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__8757_SHARP_)),p1__8757_SHARP_],null));
});})(freqs,dups,most_popular_tag))
,dups);var disallowed_node_QMARK_ = ((function (freqs,dups,most_popular_tag,tag_dups){
return (function (node,tag){return cljs.core.some.call(null,((function (freqs,dups,most_popular_tag,tag_dups){
return (function (p__8777){var vec__8778 = p__8777;var allowed_tag = cljs.core.nth.call(null,vec__8778,0,null);var dup_node = cljs.core.nth.call(null,vec__8778,1,null);return (cljs.core._EQ_.call(null,dup_node,node)) && (cljs.core.not_EQ_.call(null,allowed_tag,tag));
});})(freqs,dups,most_popular_tag,tag_dups))
,tag_dups);
});})(freqs,dups,most_popular_tag,tag_dups))
;var seq__8779_8790 = cljs.core.seq.call(null,tag_dups);var chunk__8780_8791 = null;var count__8781_8792 = 0;var i__8782_8793 = 0;while(true){
if((i__8782_8793 < count__8781_8792))
{var vec__8783_8794 = cljs.core._nth.call(null,chunk__8780_8791,i__8782_8793);var tag_8795 = cljs.core.nth.call(null,vec__8783_8794,0,null);var node_8796 = cljs.core.nth.call(null,vec__8783_8794,1,null);cljs.core.println.call(null,[cljs.core.str("Line '"),cljs.core.str(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node_8796)),cljs.core.str("' has overlapping tags. Put line under "),cljs.core.str(lt.plugins.kukui.tag_prefix),cljs.core.str(tag_8795)].join(''));
{
var G__8797 = seq__8779_8790;
var G__8798 = chunk__8780_8791;
var G__8799 = count__8781_8792;
var G__8800 = (i__8782_8793 + 1);
seq__8779_8790 = G__8797;
chunk__8780_8791 = G__8798;
count__8781_8792 = G__8799;
i__8782_8793 = G__8800;
continue;
}
} else
{var temp__4126__auto___8801 = cljs.core.seq.call(null,seq__8779_8790);if(temp__4126__auto___8801)
{var seq__8779_8802__$1 = temp__4126__auto___8801;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8779_8802__$1))
{var c__7561__auto___8803 = cljs.core.chunk_first.call(null,seq__8779_8802__$1);{
var G__8804 = cljs.core.chunk_rest.call(null,seq__8779_8802__$1);
var G__8805 = c__7561__auto___8803;
var G__8806 = cljs.core.count.call(null,c__7561__auto___8803);
var G__8807 = 0;
seq__8779_8790 = G__8804;
chunk__8780_8791 = G__8805;
count__8781_8792 = G__8806;
i__8782_8793 = G__8807;
continue;
}
} else
{var vec__8784_8808 = cljs.core.first.call(null,seq__8779_8802__$1);var tag_8809 = cljs.core.nth.call(null,vec__8784_8808,0,null);var node_8810 = cljs.core.nth.call(null,vec__8784_8808,1,null);cljs.core.println.call(null,[cljs.core.str("Line '"),cljs.core.str(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node_8810)),cljs.core.str("' has overlapping tags. Put line under "),cljs.core.str(lt.plugins.kukui.tag_prefix),cljs.core.str(tag_8809)].join(''));
{
var G__8811 = cljs.core.next.call(null,seq__8779_8802__$1);
var G__8812 = null;
var G__8813 = 0;
var G__8814 = 0;
seq__8779_8790 = G__8811;
chunk__8780_8791 = G__8812;
count__8781_8792 = G__8813;
i__8782_8793 = G__8814;
continue;
}
}
} else
{}
}
break;
}
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.call(null,(function (p__8785){var vec__8786 = p__8785;var tag = cljs.core.nth.call(null,vec__8786,0,null);var nodes = cljs.core.nth.call(null,vec__8786,1,null);var new_nodes = cljs.core.remove.call(null,(function (p1__8758_SHARP_){return disallowed_node_QMARK_.call(null,p1__8758_SHARP_,tag);
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
*/
lt.plugins.kukui.__GT_view = (function() {
var __GT_view = null;
var __GT_view__2 = (function (ed,type_or_view){return __GT_view.call(null,ed,type_or_view,1);
});
var __GT_view__3 = (function (ed,type_or_view,indent_level){var nodes = lt.plugins.kukui.ed__GT_nodes.call(null,ed);var view_config = ((cljs.core.map_QMARK_.call(null,type_or_view))?type_or_view:cljs.core.get_in.call(null,lt.plugins.kukui.dynamic_config.call(null,nodes),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267),type_or_view], null)));var tags_nodes = lt.plugins.kukui.type_map.call(null,view_config,nodes);var tags_nodes__$1 = lt.plugins.kukui.ensure_unique_nodes.call(null,tags_nodes);var tags_nodes__$2 = lt.plugins.kukui.save_tags.call(null,tags_nodes__$1);var new_nodes = cljs.core.mapcat.call(null,((function (nodes,view_config,tags_nodes,tags_nodes__$1,tags_nodes__$2){
return (function (tag){var temp__4126__auto__ = cljs.core.get.call(null,tags_nodes__$2,tag);if(cljs.core.truth_(temp__4126__auto__))
{var children = temp__4126__auto__;return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type-tag","type-tag",4631398905),true,new cljs.core.Keyword(null,"text","text",1017460895),[cljs.core.str(lt.plugins.kukui.tag_prefix),cljs.core.str(cljs.core.name.call(null,tag))].join('')], null)], null),children);
} else
{return null;
}
});})(nodes,view_config,tags_nodes,tags_nodes__$1,tags_nodes__$2))
,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(view_config));var indented_nodes = lt.plugins.kukui.indent_nodes.call(null,new_nodes,lt.plugins.sacha.codemirror.line_indent.call(null,ed,lt.objs.editor.cursor.call(null,ed).line),lt.objs.editor.option.call(null,ed,"tabSize"),indent_level);return [cljs.core.str(clojure.string.join.call(null,"\n",indented_nodes)),cljs.core.str("\n")].join('');
});
__GT_view = function(ed,type_or_view,indent_level){
switch(arguments.length){
case 2:
return __GT_view__2.call(this,ed,type_or_view);
case 3:
return __GT_view__3.call(this,ed,type_or_view,indent_level);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
__GT_view.cljs$core$IFn$_invoke$arity$2 = __GT_view__2;
__GT_view.cljs$core$IFn$_invoke$arity$3 = __GT_view__3;
return __GT_view;
})()
;
lt.plugins.kukui.type_selector = lt.plugins.kukui.selector.selector.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"items","items",1114430258),(function (){return cljs.core.map.call(null,(function (p1__8787_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"name","name",1017277949)],[cljs.core.name.call(null,p1__8787_SHARP_)]);
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
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.type-replace-children","kukui.type-replace-children",2704104452),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: replaces current children with new type view",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.kukui.type_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var ed = lt.objs.editor.pool.last_active.call(null);var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line);return lt.plugins.kukui.check_types_counts.call(null,ed,(function (){var new_body = lt.plugins.kukui.__GT_view.call(null,ed,cljs.core.keyword.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(type)));lt.objs.editor.replace.call(null,lt.objs.editor.__GT_cm_ed.call(null,ed),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,ed)) + 1),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),end_line,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new_body);
return new_body;
}));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.type-replace-branch","kukui.type-replace-branch",3632901223),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: replaces current branch with new type view",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.kukui.type_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line);return lt.plugins.kukui.check_types_counts.call(null,ed,(function (){var new_body = lt.plugins.kukui.__GT_view.call(null,ed,cljs.core.keyword.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(type)),0);lt.objs.editor.replace.call(null,lt.objs.editor.__GT_cm_ed.call(null,ed),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,ed)),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),end_line,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new_body);
return new_body;
}),cljs.core.range.call(null,line,end_line));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.insert-type-branch","kukui.insert-type-branch",1092237804),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: inserts new type view for current branch",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.kukui.type_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var ed = lt.objs.editor.pool.last_active.call(null);return lt.plugins.kukui.util.insert_at_next_line.call(null,ed,lt.plugins.kukui.__GT_view.call(null,ed,cljs.core.keyword.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(type))));
})], null));
/**
* Create a view given a query. There are two formats.
* With parent:    #type: tag1, tag2
* Without parent: tag1, tag2
*/
lt.plugins.kukui.__GT_query_view = (function() {
var __GT_query_view = null;
var __GT_query_view__3 = (function (ed,query,__GT_view_fn){return __GT_query_view.call(null,ed,query,__GT_view_fn,1);
});
var __GT_query_view__4 = (function (ed,query,__GT_view_fn,indent_level){if(cljs.core.seq.call(null,query))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"seq","seq",-1640417768,null),new cljs.core.Symbol(null,"query","query",-1532587391,null))))].join('')));
}
var tags_string = cljs.core.get.call(null,cljs.core.re_find.call(null,/^\s*(\S+:|)\s*(.*)$/,query),2);var tags = (cljs.core.truth_(tags_string)?clojure.string.split.call(null,tags_string,/\s*,\s*/):null);var view_config = __GT_view_fn.call(null,tags);return lt.plugins.kukui.__GT_view.call(null,ed,view_config,indent_level);
});
__GT_query_view = function(ed,query,__GT_view_fn,indent_level){
switch(arguments.length){
case 3:
return __GT_query_view__3.call(this,ed,query,__GT_view_fn);
case 4:
return __GT_query_view__4.call(this,ed,query,__GT_view_fn,indent_level);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
__GT_query_view.cljs$core$IFn$_invoke$arity$3 = __GT_query_view__3;
__GT_query_view.cljs$core$IFn$_invoke$arity$4 = __GT_query_view__4;
return __GT_query_view;
})()
;
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.query-replace-children","kukui.query-replace-children",3544797768),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: replaces current children based on current node's query",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line);var new_body = lt.plugins.kukui.__GT_query_view.call(null,ed,lt.objs.editor.line.call(null,ed,line),((function (ed,line,end_line){
return (function (p1__8788_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"names","names",1118489274),new cljs.core.Keyword(null,"default","default",2558708147)],[cljs.core.conj.call(null,p1__8788_SHARP_,"leftover"),"leftover"]);
});})(ed,line,end_line))
);return lt.objs.editor.replace.call(null,lt.objs.editor.__GT_cm_ed.call(null,ed),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),(line + 1),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),end_line,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new_body);
})], null));
lt.plugins.kukui.find_parent_line = (function find_parent_line(ed,line){return lt.plugins.sacha.codemirror.find_parent.call(null,ed,cljs.core.range.call(null,(line - 1),-1,-1),lt.plugins.sacha.codemirror.line_indent.call(null,ed,line));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.query-insert-children","kukui.query-insert-children",2043705447),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: inserts current children based on parent node's query",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var parent_line = lt.plugins.kukui.find_parent_line.call(null,ed,line);var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,parent_line);var _ = lt.objs.editor.move_cursor.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"line","line",1017226086),parent_line], null));var new_body = lt.plugins.kukui.__GT_query_view.call(null,ed,lt.objs.editor.line.call(null,ed,line),((function (ed,line,parent_line,end_line,_){
return (function (p1__8789_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"names","names",1118489274)],[p1__8789_SHARP_]);
});})(ed,line,parent_line,end_line,_))
,2);lt.objs.editor.move_cursor.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"line","line",1017226086),line], null));
return lt.plugins.kukui.util.insert_at_next_line.call(null,ed,new_body);
})], null));
}

//# sourceMappingURL=kukui_compiled.js.map