if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.core')) {
goog.provide('lt.plugins.kukui.core');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('clojure.string');
lt.plugins.kukui.core.default_tag_char = "*";
lt.plugins.kukui.core.tag_prefix = "#";
/**
* Regex for pulling out tags with tag-prefix. To escape having a tag parsed,
* put a backslash before it e.g. \#escaped
*/
lt.plugins.kukui.core.tag_pattern = cljs.core.re_pattern.call(null,("(?:[^\\\\]|^)("+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+"[^ \\t\\n.,;\\*]+)"));
lt.plugins.kukui.core.text__GT_tags = (function text__GT_tags(text){return cljs.core.map.call(null,(function (p1__10512_SHARP_){return cljs.core.subs.call(null,p1__10512_SHARP_,1);
}),cljs.core.map.call(null,cljs.core.second,cljs.core.re_seq.call(null,lt.plugins.kukui.core.tag_pattern,text)));
});
/**
* Expands a tag if it's a type
*/
lt.plugins.kukui.core.expand_tag = (function expand_tag(types_config,tag){if(cljs.core.contains_QMARK_.call(null,cljs.core.set.call(null,cljs.core.keys.call(null,new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(types_config))),cljs.core.keyword.call(null,tag)))
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
lt.plugins.kukui.core.text__GT_tag_group = (function text__GT_tag_group(types_config,text){if(cljs.core.seq.call(null,text))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"seq","seq",-1640417768,null),new cljs.core.Symbol(null,"text","text",-1636974874,null)))))));
}
var vec__10518 = cljs.core.re_find.call(null,/^\s*(\S+:|)\s*(.*)$/,text);var _ = cljs.core.nth.call(null,vec__10518,0,null);var parent_tag = cljs.core.nth.call(null,vec__10518,1,null);var tags_string = cljs.core.nth.call(null,vec__10518,2,null);var parent_tag__$1 = ((cljs.core.seq.call(null,parent_tag))?cljs.core.first.call(null,lt.plugins.kukui.core.text__GT_tags.call(null,parent_tag)):null);var raw_tags = clojure.string.split.call(null,tags_string,/\s*,\s*/);var default_tag = (function (){var G__10519 = cljs.core.some.call(null,((function (vec__10518,_,parent_tag,tags_string,parent_tag__$1,raw_tags){
return (function (p1__10513_SHARP_){if(cljs.core._EQ_.call(null,lt.plugins.kukui.core.default_tag_char,cljs.core.subs.call(null,p1__10513_SHARP_,(cljs.core.count.call(null,p1__10513_SHARP_) - 1))))
{return p1__10513_SHARP_;
} else
{return null;
}
});})(vec__10518,_,parent_tag,tags_string,parent_tag__$1,raw_tags))
,raw_tags);var G__10519__$1 = (((G__10519 == null))?null:((function (G__10519,vec__10518,_,parent_tag,tags_string,parent_tag__$1,raw_tags){
return (function (p1__10514_SHARP_){return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.call(null,p1__10514_SHARP_,0,(cljs.core.count.call(null,p1__10514_SHARP_) - 1))));
});})(G__10519,vec__10518,_,parent_tag,tags_string,parent_tag__$1,raw_tags))
.call(null,G__10519));var G__10519__$2 = (((G__10519__$1 == null))?null:lt.plugins.kukui.core.text__GT_tags.call(null,G__10519__$1));var G__10519__$3 = (((G__10519__$2 == null))?null:cljs.core.first.call(null,G__10519__$2));return G__10519__$3;
})();var tags = lt.plugins.kukui.core.text__GT_tags.call(null,clojure.string.join.call(null," ",cljs.core.map.call(null,((function (vec__10518,_,parent_tag,tags_string,parent_tag__$1,raw_tags,default_tag){
return (function (p1__10515_SHARP_){return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__10515_SHARP_));
});})(vec__10518,_,parent_tag,tags_string,parent_tag__$1,raw_tags,default_tag))
,raw_tags)));var tags__$1 = cljs.core.mapcat.call(null,cljs.core.partial.call(null,lt.plugins.kukui.core.expand_tag,types_config),tags);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"parent-tag","parent-tag",768068457),parent_tag__$1,new cljs.core.Keyword(null,"tags","tags",1017456523),tags__$1,new cljs.core.Keyword(null,"default-tag","default-tag",575796608),default_tag], null);
});
lt.plugins.kukui.core.indent_node = (function indent_node(node,indent){return clojure.string.replace_first.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node),/^\s*/,cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,indent," ")));
});
lt.plugins.kukui.core.indent_nodes = (function indent_nodes(nodes,indent,tab_size,offset_level){var offset = (offset_level * tab_size);var tag_indent = (indent + offset);var node_indent = ((indent + offset) + tab_size);var desc_indent = (((indent + offset) + tab_size) + tab_size);return cljs.core.mapcat.call(null,((function (offset,tag_indent,node_indent,desc_indent){
return (function (p1__10520_SHARP_){if(cljs.core.truth_(new cljs.core.Keyword(null,"type-tag","type-tag",4631398905).cljs$core$IFn$_invoke$arity$1(p1__10520_SHARP_)))
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,tag_indent," ")))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(p1__10520_SHARP_)))], null);
} else
{return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.kukui.core.indent_node.call(null,p1__10520_SHARP_,node_indent)], null),cljs.core.map.call(null,((function (offset,tag_indent,node_indent,desc_indent){
return (function (x){return lt.plugins.kukui.core.indent_node.call(null,x,desc_indent);
});})(offset,tag_indent,node_indent,desc_indent))
,new cljs.core.Keyword(null,"desc","desc",1016984067).cljs$core$IFn$_invoke$arity$1(p1__10520_SHARP_)));
}
});})(offset,tag_indent,node_indent,desc_indent))
,nodes);
});
lt.plugins.kukui.core.desc_node_QMARK_ = (function desc_node_QMARK_(node){return cljs.core.re_find.call(null,/^\s*\+/,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node));
});
lt.plugins.kukui.core.parent_node_QMARK_ = (function parent_node_QMARK_(curr,next){if(cljs.core.truth_(next))
{return ((new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(next) > new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr))) && (cljs.core.not.call(null,lt.plugins.kukui.core.desc_node_QMARK_.call(null,next)));
} else
{return null;
}
});
lt.plugins.kukui.core.add_node_with_tags = (function add_node_with_tags(nodes,node,tags){return cljs.core.conj.call(null,nodes,cljs.core.assoc.call(null,node,new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.set.call(null,tags)));
});
/**
* Adds :tags and :desc to nodes
*/
lt.plugins.kukui.core.add_attributes_to_nodes = (function add_attributes_to_nodes(nodes){return new cljs.core.Keyword(null,"nodes","nodes",1118897699).cljs$core$IFn$_invoke$arity$1(cljs.core.reduce.call(null,(function (accum,p__10525){var vec__10526 = p__10525;var curr = cljs.core.nth.call(null,vec__10526,0,null);var next = cljs.core.nth.call(null,vec__10526,1,null);if(cljs.core.truth_(lt.plugins.kukui.core.parent_node_QMARK_.call(null,curr,next)))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tags","tags",1017456523)], null),((function (vec__10526,curr,next){
return (function (p1__10521_SHARP_){return lt.plugins.kukui.core.add_node_with_tags.call(null,cljs.core.vec.call(null,cljs.core.remove.call(null,((function (vec__10526,curr,next){
return (function (tag){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(tag),new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
});})(vec__10526,curr,next))
,p1__10521_SHARP_)),curr,lt.plugins.kukui.core.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr)));
});})(vec__10526,curr,next))
);
} else
{if(cljs.core.truth_(lt.plugins.kukui.core.desc_node_QMARK_.call(null,curr)))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699),(cljs.core.count.call(null,new cljs.core.Keyword(null,"nodes","nodes",1118897699).cljs$core$IFn$_invoke$arity$1(accum)) - 1),new cljs.core.Keyword(null,"desc","desc",1016984067)], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),curr);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699)], null),((function (vec__10526,curr,next){
return (function (nodes__$1){return lt.plugins.kukui.core.add_node_with_tags.call(null,nodes__$1,curr,cljs.core.concat.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.filter.call(null,((function (vec__10526,curr,next){
return (function (p1__10522_SHARP_){return (new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(p1__10522_SHARP_) < new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
});})(vec__10526,curr,next))
,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(accum))),lt.plugins.kukui.core.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr))));
});})(vec__10526,curr,next))
);
} else
{return null;
}
}
}
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"nodes","nodes",1118897699),cljs.core.PersistentVector.EMPTY], null),cljs.core.partition.call(null,2,1,cljs.core.PersistentVector.EMPTY,nodes)));
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.config')) {
goog.provide('lt.plugins.kukui.config');
goog.require('cljs.core');
goog.require('lt.plugins.kukui.core');
goog.require('lt.objs.command');
goog.require('lt.objs.notifos');
goog.require('lt.plugins.sacha.codemirror');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('clojure.set');
goog.require('lt.objs.command');
goog.require('lt.plugins.sacha.codemirror');
goog.require('clojure.set');
goog.require('lt.plugins.kukui.core');
goog.require('lt.objs.notifos');
goog.require('lt.objs.editor');
lt.plugins.kukui.config.unknown_type = new cljs.core.Keyword(null,"unknown","unknown",729063356);
lt.plugins.kukui.config.base_config = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"types","types",1124748267),new cljs.core.PersistentArrayMap.fromArray([lt.plugins.kukui.config.unknown_type,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"names","names",1118489274),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["leftover"], null),new cljs.core.Keyword(null,"default","default",2558708147),"leftover"], null)], true, false)], null);
lt.plugins.kukui.config.global_config = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"types","types",1124748267),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"priority","priority",4143410454),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"names","names",1118489274),new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, ["p0","p1","p2","p3","p4","p5","p6","p7","p8","p9","p?","later"], null),new cljs.core.Keyword(null,"default","default",2558708147),"p?"], null),new cljs.core.Keyword(null,"duration","duration",3316859142),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"names","names",1118489274),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["small","big"], null),new cljs.core.Keyword(null,"default","default",2558708147),"small"], null)], null)], null);
lt.plugins.kukui.config.config = cljs.core.merge_with.call(null,cljs.core.merge,lt.plugins.kukui.config.base_config,lt.plugins.kukui.config.global_config);
lt.plugins.kukui.config.__GT_type_config = (function __GT_type_config(names,no_default){return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"names","names",1118489274),(cljs.core.truth_(no_default)?names:cljs.core.conj.call(null,names,"leftover")),new cljs.core.Keyword(null,"default","default",2558708147),"leftover"], null);
});
/**
* Types config which calculates certain types based on nodes e.g. unknown type
* which accounts for typeless tags.
*/
lt.plugins.kukui.config.dynamic_config = (function dynamic_config(nodes){var unaccounted_tags = clojure.set.difference.call(null,cljs.core.set.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523),nodes)),cljs.core.set.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"names","names",1118489274),cljs.core.vals.call(null,new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.config.config)))));return cljs.core.update_in.call(null,lt.plugins.kukui.config.config,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267),lt.plugins.kukui.config.unknown_type,new cljs.core.Keyword(null,"names","names",1118489274)], null),((function (unaccounted_tags){
return (function (p1__8166_SHARP_){return cljs.core.into.call(null,unaccounted_tags,p1__8166_SHARP_);
});})(unaccounted_tags))
);
});
/**
* Finds a tag's type. Returns unknown-type if none found.
*/
lt.plugins.kukui.config.find_type = (function find_type(tag){var or__6426__auto__ = cljs.core.some.call(null,(function (p__8173){var vec__8174 = p__8173;var type = cljs.core.nth.call(null,vec__8174,0,null);var type_map = cljs.core.nth.call(null,vec__8174,1,null);if(cljs.core.contains_QMARK_.call(null,cljs.core.set.call(null,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(type_map)),tag))
{return cljs.core.name.call(null,type);
} else
{return null;
}
}),new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.config.config));if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return cljs.core.name.call(null,lt.plugins.kukui.config.unknown_type);
}
});
/**
* @param {...*} var_args
*/
lt.plugins.kukui.config.deep_merge = (function() { 
var deep_merge__delegate = function (vals){if(cljs.core.every_QMARK_.call(null,cljs.core.map_QMARK_,vals))
{return cljs.core.apply.call(null,cljs.core.merge_with,deep_merge,vals);
} else
{return cljs.core.vec.call(null,cljs.core.distinct.call(null,cljs.core.apply.call(null,cljs.core.into,vals)));
}
};
var deep_merge = function (var_args){
var vals = null;if (arguments.length > 0) {
  vals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return deep_merge__delegate.call(this,vals);};
deep_merge.cljs$lang$maxFixedArity = 0;
deep_merge.cljs$lang$applyTo = (function (arglist__8185){
var vals = cljs.core.seq(arglist__8185);
return deep_merge__delegate(vals);
});
deep_merge.cljs$core$IFn$_invoke$arity$variadic = deep_merge__delegate;
return deep_merge;
})()
;
lt.plugins.kukui.config.merge_config = (function merge_config(user_config,merge_type){var new_config = (function (){var G__8177 = (((merge_type instanceof cljs.core.Keyword))?merge_type.fqn:null);var caseval__8186;
switch (G__8177){
case "into-type":
caseval__8186=cljs.core.update_in.call(null,lt.plugins.kukui.config.config,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267)], null),((function (G__8177){
return (function (p1__8175_SHARP_){return cljs.core.merge_with.call(null,lt.plugins.kukui.config.deep_merge,p1__8175_SHARP_,user_config);
});})(G__8177))
)
break;
case "reset":
caseval__8186=cljs.core.update_in.call(null,cljs.core.merge_with.call(null,cljs.core.merge,lt.plugins.kukui.config.base_config,lt.plugins.kukui.config.global_config),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267)], null),cljs.core.merge,user_config)
break;
default:
caseval__8186=cljs.core.update_in.call(null,lt.plugins.kukui.config.config,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267)], null),cljs.core.merge,user_config)
}
return caseval__8186;
})();cljs.core.println.call(null,"New config is: ",cljs.core.pr_str.call(null,new_config));
lt.objs.notifos.set_msg_BANG_.call(null,"Saved config");
lt.plugins.kukui.config.config = new_config;
});
/**
* Updates :types in config using children nodes as tag groups.
*/
lt.plugins.kukui.config.tag_group_merge_config = (function tag_group_merge_config(ed,merge_type){var line = lt.objs.editor.cursor.call(null,ed).line;var children_lines = cljs.core.range.call(null,(line + 1),lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line));var user_config = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (line,children_lines){
return (function (p1__8180_SHARP_){return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.keyword.call(null,new cljs.core.Keyword(null,"parent-tag","parent-tag",768068457).cljs$core$IFn$_invoke$arity$1(p1__8180_SHARP_)),lt.plugins.kukui.config.__GT_type_config.call(null,cljs.core.vec.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__8180_SHARP_)),new cljs.core.Keyword(null,"default-tag","default-tag",575796608).cljs$core$IFn$_invoke$arity$1(p1__8180_SHARP_))],null));
});})(line,children_lines))
,cljs.core.remove.call(null,((function (line,children_lines){
return (function (p1__8179_SHARP_){var no_parent = cljs.core.not.call(null,new cljs.core.Keyword(null,"parent-tag","parent-tag",768068457).cljs$core$IFn$_invoke$arity$1(p1__8179_SHARP_));if(no_parent)
{cljs.core.println.call(null,"Skipping line with no parent-tag: ",cljs.core.pr_str.call(null,p1__8179_SHARP_));
} else
{}
return no_parent;
});})(line,children_lines))
,cljs.core.map.call(null,cljs.core.partial.call(null,lt.plugins.kukui.core.text__GT_tag_group,lt.plugins.kukui.config.config),cljs.core.map.call(null,((function (line,children_lines){
return (function (p1__8178_SHARP_){return lt.objs.editor.line.call(null,ed,p1__8178_SHARP_);
});})(line,children_lines))
,children_lines)))));return lt.plugins.kukui.config.merge_config.call(null,user_config,merge_type);
});
lt.plugins.kukui.config.read_config_line = (function read_config_line(line){return cljs.core.next.call(null,cljs.core.re_find.call(null,/^\s*(?::config)?\.([^:]+)(?::\s*(\S+))?$/,line));
});
/**
* Saves config key differently depending on config key value.
*/
lt.plugins.kukui.config.save = (function (){var method_table__7292__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__7293__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__7294__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__7295__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__7296__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",3129050535),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("save",((function (method_table__7292__auto__,prefer_table__7293__auto__,method_cache__7294__auto__,cached_hierarchy__7295__auto__,hierarchy__7296__auto__){
return (function (config_key,options){return config_key;
});})(method_table__7292__auto__,prefer_table__7293__auto__,method_cache__7294__auto__,cached_hierarchy__7295__auto__,hierarchy__7296__auto__))
,new cljs.core.Keyword(null,"default","default",2558708147),hierarchy__7296__auto__,method_table__7292__auto__,prefer_table__7293__auto__,method_cache__7294__auto__,cached_hierarchy__7295__auto__));
})();
cljs.core._add_method.call(null,lt.plugins.kukui.config.save,new cljs.core.Keyword(null,"default","default",2558708147),(function (config_key,_){return lt.objs.notifos.set_msg_BANG_.call(null,("Config key "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,config_key))+" is not recognized."),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
}));
cljs.core._add_method.call(null,lt.plugins.kukui.config.save,new cljs.core.Keyword(null,"types","types",1124748267),(function (_,p__8181){var map__8182 = p__8181;var map__8182__$1 = ((cljs.core.seq_QMARK_.call(null,map__8182))?cljs.core.apply.call(null,cljs.core.hash_map,map__8182):map__8182);var value = cljs.core.get.call(null,map__8182__$1,new cljs.core.Keyword(null,"value","value",1125876963));var editor = cljs.core.get.call(null,map__8182__$1,new cljs.core.Keyword(null,"editor","editor",4001043679));return lt.plugins.kukui.config.tag_group_merge_config.call(null,editor,cljs.core.keyword.call(null,value));
}));
/**
* Saves config of current line. Save behavior depends on config key.
*/
lt.plugins.kukui.config.save_current_config = (function save_current_config(ed){var line_text = lt.objs.editor.line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line);var vec__8184 = lt.plugins.kukui.config.read_config_line.call(null,line_text);var config_key = cljs.core.nth.call(null,vec__8184,0,null);var config_val = cljs.core.nth.call(null,vec__8184,1,null);return lt.plugins.kukui.config.save.call(null,cljs.core.keyword.call(null,config_key),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",1125876963),config_val,new cljs.core.Keyword(null,"editor","editor",4001043679),ed], null));
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.util')) {
goog.provide('lt.plugins.kukui.util');
goog.require('cljs.core');
goog.require('lt.plugins.sacha.codemirror');
goog.require('lt.plugins.sacha.codemirror');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor');
/**
* Insert string at the beginning of the next line
*/
lt.plugins.kukui.util.insert_at_next_line = (function insert_at_next_line(ed,s){lt.objs.editor.replace.call(null,lt.objs.editor.__GT_cm_ed.call(null,ed),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,ed)) + 1),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),s);
return ed;
});
lt.plugins.kukui.util.find_parent_line = (function find_parent_line(ed,line){return lt.plugins.sacha.codemirror.find_parent.call(null,ed,cljs.core.range.call(null,(line - 1),-1,-1),lt.plugins.sacha.codemirror.line_indent.call(null,ed,line));
});
/**
* Finds range of lines for parent and returns all lines in file when no parent
*/
lt.plugins.kukui.util.find_parent_lines = (function find_parent_lines(ed,line){var temp__4124__auto__ = lt.plugins.kukui.util.find_parent_line.call(null,ed,line);if(cljs.core.truth_(temp__4124__auto__))
{var parent_line = temp__4124__auto__;return cljs.core.range.call(null,parent_line,lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,parent_line));
} else
{return cljs.core.range.call(null,lt.objs.editor.first_line.call(null,ed),(lt.objs.editor.last_line.call(null,ed) + 1));
}
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
lt.plugins.kukui.selector.selector = (function selector(opts){var G__8197 = lt.objs.sidebar.command.filter_list.call(null,opts);lt.object.add_behavior_BANG_.call(null,G__8197,new cljs.core.Keyword("lt.plugins.kukui.selector","set-selected","lt.plugins.kukui.selector/set-selected",3025761911));
return G__8197;
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui')) {
goog.provide('lt.plugins.kukui');
goog.require('cljs.core');
goog.require('lt.plugins.kukui.core');
goog.require('lt.plugins.kukui.core');
goog.require('lt.objs.command');
goog.require('lt.objs.notifos');
goog.require('lt.plugins.sacha.codemirror');
goog.require('lt.objs.editor');
goog.require('lt.plugins.sacha');
goog.require('lt.plugins.kukui.selector');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.plugins.kukui.selector');
goog.require('lt.plugins.kukui.config');
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
goog.require('lt.plugins.kukui.config');
lt.plugins.kukui.line__GT_node = (function line__GT_node(ed,line){return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),line,new cljs.core.Keyword(null,"indent","indent",4124632094),lt.plugins.sacha.codemirror.line_indent.call(null,ed,line),new cljs.core.Keyword(null,"text","text",1017460895),lt.objs.editor.line.call(null,ed,line)], null);
});
lt.plugins.kukui.ignore_tag = "ignore";
/**
* Returns nodes with :line, :indent, :text and :tags properties.
* Tags are picked up from parents and any words starting with '#'.
*/
lt.plugins.kukui.__GT_tagged_nodes = (function __GT_tagged_nodes(ed,lines){var nodes = lt.plugins.kukui.core.add_attributes_to_nodes.call(null,cljs.core.map.call(null,(function (p1__10554_SHARP_){if(cljs.core.truth_(cljs.core.re_find.call(null,/^\s*:config/,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(p1__10554_SHARP_))))
{return cljs.core.update_in.call(null,p1__10554_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",1017460895)], null),cljs.core.str," ",lt.plugins.kukui.core.tag_prefix,lt.plugins.kukui.ignore_tag);
} else
{return p1__10554_SHARP_;
}
}),cljs.core.map.call(null,(function (p1__10553_SHARP_){return lt.plugins.kukui.line__GT_node.call(null,ed,p1__10553_SHARP_);
}),lines)));return cljs.core.remove.call(null,((function (nodes){
return (function (p1__10555_SHARP_){return cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__10555_SHARP_),lt.plugins.kukui.ignore_tag);
});})(nodes))
,nodes);
});
/**
* For given lines, returns map of tags and how many nodes have that tag.
*/
lt.plugins.kukui.__GT_tagged_counts = (function __GT_tagged_counts(ed,lines){return cljs.core.frequencies.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523),lt.plugins.kukui.__GT_tagged_nodes.call(null,ed,lines)));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.tag-counts","kukui.tag-counts",2395081538),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: tag counts in current branch's nodes",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;return cljs.core.prn.call(null,lt.plugins.kukui.__GT_tagged_counts.call(null,ed,cljs.core.range.call(null,line,lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line))));
})], null));
/**
* Reduces a type's nodes to a tag map with a reducer fn.
*/
lt.plugins.kukui.type_nodes__GT_tag_map = (function type_nodes__GT_tag_map(f,type_config,nodes){return cljs.core.reduce.call(null,(function (accum,node){var type_tags = clojure.set.intersection.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(node),cljs.core.set.call(null,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(type_config)));var type_tags__$1 = ((cljs.core.empty_QMARK_.call(null,type_tags))?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(type_config)], null):type_tags);return cljs.core.reduce.call(null,((function (type_tags,type_tags__$1){
return (function (p1__10556_SHARP_,p2__10557_SHARP_){return f.call(null,p1__10556_SHARP_,p2__10557_SHARP_,node);
});})(type_tags,type_tags__$1))
,accum,type_tags__$1);
}),cljs.core.PersistentArrayMap.EMPTY,nodes);
});
lt.plugins.kukui.type_counts = cljs.core.partial.call(null,lt.plugins.kukui.type_nodes__GT_tag_map,(function (p1__10558_SHARP_,p2__10559_SHARP_){return cljs.core.update_in.call(null,p1__10558_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p2__10559_SHARP_], null),cljs.core.inc);
}));
lt.plugins.kukui.ed__GT_nodes = (function() {
var ed__GT_nodes = null;
var ed__GT_nodes__1 = (function (ed){return ed__GT_nodes.call(null,ed,null);
});
var ed__GT_nodes__2 = (function (ed,lines){var lines__$1 = (function (){var or__6426__auto__ = lines;if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
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
lt.plugins.kukui.types_counts = (function types_counts(ed,lines){var nodes = lt.plugins.kukui.ed__GT_nodes.call(null,ed,lines);var types_config = lt.plugins.kukui.config.dynamic_config.call(null,nodes);return cljs.core.keep.call(null,((function (nodes,types_config){
return (function (p1__10560_SHARP_){var counts = lt.plugins.kukui.type_counts.call(null,cljs.core.get_in.call(null,types_config,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267),p1__10560_SHARP_], null)),nodes);if(cljs.core.truth_((function (){var and__6414__auto__ = cljs.core._EQ_.call(null,1,cljs.core.count.call(null,counts));if(and__6414__auto__)
{return cljs.core.get.call(null,counts,cljs.core.get_in.call(null,types_config,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267),p1__10560_SHARP_,new cljs.core.Keyword(null,"default","default",2558708147)], null)));
} else
{return and__6414__auto__;
}
})()))
{return null;
} else
{return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[p1__10560_SHARP_,counts],null));
}
});})(nodes,types_config))
,cljs.core.keys.call(null,new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(types_config)));
});
/**
* Different than type-counts in that this only counts total for each type
* and is only based on explicit tags - no defaults are taken into account.
* Also, one node gets counted for each of its tags.
*/
lt.plugins.kukui.total_types_counts = (function total_types_counts(ed,lines){var line = lt.objs.editor.cursor.call(null,ed).line;var lines__$1 = (function (){var or__6426__auto__ = lines;if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return cljs.core.range.call(null,line,lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line));
}
})();var tagged_counts = lt.plugins.kukui.__GT_tagged_counts.call(null,ed,lines__$1);return cljs.core.reduce_kv.call(null,((function (line,lines__$1,tagged_counts){
return (function (accum,tag,count){return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.kukui.config.find_type.call(null,tag)], null),cljs.core.fnil.call(null,cljs.core._PLUS_,0),count);
});})(line,lines__$1,tagged_counts))
,cljs.core.PersistentArrayMap.EMPTY,tagged_counts);
});
lt.plugins.kukui.match_attribute_tag = (function match_attribute_tag(tag,type_regex){return cljs.core.re_find.call(null,cljs.core.re_pattern.call(null,("^"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(type_regex)+":(\\S+)")),tag);
});
lt.plugins.kukui.attribute_counts = (function attribute_counts(nodes,attr){cljs.core.println.call(null,"Attribute:",attr);
var type_nodes = cljs.core.map.call(null,(function (node){return cljs.core.keep.call(null,(function (p1__10561_SHARP_){return cljs.core.second.call(null,lt.plugins.kukui.match_attribute_tag.call(null,p1__10561_SHARP_,cljs.core.name.call(null,attr)));
}),new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(node));
}),nodes);var attr_counts = cljs.core.reduce.call(null,((function (type_nodes){
return (function (accum,values){return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.last.call(null,values)], null),cljs.core.inc);
});})(type_nodes))
,cljs.core.PersistentArrayMap.EMPTY,type_nodes);cljs.core.println.call(null,cljs.core.count.call(null,cljs.core.remove.call(null,cljs.core.empty_QMARK_,type_nodes)),"of",cljs.core.count.call(null,type_nodes),"have",attr);
return cljs.core.prn.call(null,attr_counts);
});
/**
* Useful for printing list or vec of maps. Hack until actual cljs.pprint exists
*/
lt.plugins.kukui.pprint = (function pprint(data){return cljs.core.println.call(null,clojure.string.join.call(null,"\n",data));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.types-counts","kukui.types-counts",4251463491),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: tag counts of each type for current branch or selection",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var nodes = lt.plugins.kukui.ed__GT_nodes.call(null,ed,null);lt.plugins.kukui.pprint.call(null,lt.plugins.kukui.types_counts.call(null,ed,null));
cljs.core.prn.call(null,cljs.core.assoc.call(null,lt.plugins.kukui.total_types_counts.call(null,ed,null),"untagged",cljs.core.count.call(null,cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.empty_QMARK_,new cljs.core.Keyword(null,"tags","tags",1017456523)),nodes)),"nodes",cljs.core.count.call(null,nodes)));
return lt.plugins.kukui.attribute_counts.call(null,nodes,new cljs.core.Keyword(null,"type","type",1017479852));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.all-types-counts","kukui.all-types-counts",2670019439),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Same as types-counts but for whole file",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var lines = cljs.core.range.call(null,lt.objs.editor.first_line.call(null,ed),(lt.objs.editor.last_line.call(null,ed) + 1));var nodes = lt.plugins.kukui.ed__GT_nodes.call(null,ed,lines);lt.plugins.kukui.pprint.call(null,lt.plugins.kukui.types_counts.call(null,ed,lines));
return cljs.core.prn.call(null,cljs.core.assoc.call(null,lt.plugins.kukui.total_types_counts.call(null,ed,lines),"untagged",cljs.core.count.call(null,cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.empty_QMARK_,new cljs.core.Keyword(null,"tags","tags",1017456523)),nodes)),"nodes",cljs.core.count.call(null,nodes)));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.debug-nodes","kukui.debug-nodes",1810794576),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: prints nodes for current branch or selection",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.kukui.pprint.call(null,lt.plugins.kukui.ed__GT_nodes.call(null,lt.objs.editor.pool.last_active.call(null)));
})], null));
lt.plugins.kukui.type_map = cljs.core.partial.call(null,lt.plugins.kukui.type_nodes__GT_tag_map,(function (p1__10562_SHARP_,p2__10563_SHARP_,p3__10564_SHARP_){return cljs.core.update_in.call(null,p1__10562_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p2__10563_SHARP_], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),p3__10564_SHARP_);
}));
lt.plugins.kukui.add_tags_to_node = (function add_tags_to_node(node,tags){return cljs.core.update_in.call(null,node,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",1017460895)], null),cljs.core.str,clojure.string.join.call(null,cljs.core.map.call(null,(function (p1__10565_SHARP_){return (" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__10565_SHARP_));
}),tags)));
});
/**
* Saves tags to node's text in order to not lose tags when switching views.
*/
lt.plugins.kukui.save_tags = (function save_tags(tags_nodes){return cljs.core.reduce_kv.call(null,(function (accum,tag,nodes){return cljs.core.assoc.call(null,accum,tag,cljs.core.map.call(null,(function (node){var tags_to_add = clojure.set.difference.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(node),cljs.core.PersistentHashSet.fromArray([tag], true),cljs.core.set.call(null,lt.plugins.kukui.core.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node))));return lt.plugins.kukui.add_tags_to_node.call(null,node,tags_to_add);
}),nodes));
}),cljs.core.PersistentArrayMap.EMPTY,tags_nodes);
});
/**
* Ensures duplicate nodes are removed from least popular tags, leaving
* a duplicate node in its most popular tag.
*/
lt.plugins.kukui.ensure_unique_nodes = (function ensure_unique_nodes(tags_nodes){var freqs = cljs.core.frequencies.call(null,cljs.core.mapcat.call(null,cljs.core.second,tags_nodes));var dups = cljs.core.keep.call(null,((function (freqs){
return (function (p__10583){var vec__10584 = p__10583;var node = cljs.core.nth.call(null,vec__10584,0,null);var c = cljs.core.nth.call(null,vec__10584,1,null);if((c > 1))
{return node;
} else
{return null;
}
});})(freqs))
,freqs);var most_popular_tag = ((function (freqs,dups){
return (function (p1__10566_SHARP_){return cljs.core.first.call(null,cljs.core.apply.call(null,cljs.core.max_key,((function (freqs,dups){
return (function (p__10585){var vec__10586 = p__10585;var tag = cljs.core.nth.call(null,vec__10586,0,null);var nodes = cljs.core.nth.call(null,vec__10586,1,null);if(cljs.core.contains_QMARK_.call(null,p1__10566_SHARP_,tag))
{return cljs.core.count.call(null,nodes);
} else
{return null;
}
});})(freqs,dups))
,tags_nodes));
});})(freqs,dups))
;var tag_dups = cljs.core.map.call(null,((function (freqs,dups,most_popular_tag){
return (function (p1__10567_SHARP_){return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[most_popular_tag.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__10567_SHARP_)),p1__10567_SHARP_],null));
});})(freqs,dups,most_popular_tag))
,dups);var disallowed_node_QMARK_ = ((function (freqs,dups,most_popular_tag,tag_dups){
return (function (node,tag){return cljs.core.some.call(null,((function (freqs,dups,most_popular_tag,tag_dups){
return (function (p__10587){var vec__10588 = p__10587;var allowed_tag = cljs.core.nth.call(null,vec__10588,0,null);var dup_node = cljs.core.nth.call(null,vec__10588,1,null);return (cljs.core._EQ_.call(null,dup_node,node)) && (cljs.core.not_EQ_.call(null,allowed_tag,tag));
});})(freqs,dups,most_popular_tag,tag_dups))
,tag_dups);
});})(freqs,dups,most_popular_tag,tag_dups))
;var seq__10589_10624 = cljs.core.seq.call(null,tag_dups);var chunk__10590_10625 = null;var count__10591_10626 = 0;var i__10592_10627 = 0;while(true){
if((i__10592_10627 < count__10591_10626))
{var vec__10593_10628 = cljs.core._nth.call(null,chunk__10590_10625,i__10592_10627);var tag_10629 = cljs.core.nth.call(null,vec__10593_10628,0,null);var node_10630 = cljs.core.nth.call(null,vec__10593_10628,1,null);cljs.core.println.call(null,("Line '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node_10630))+"' has overlapping tags. Put line under "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(tag_10629)));
{
var G__10631 = seq__10589_10624;
var G__10632 = chunk__10590_10625;
var G__10633 = count__10591_10626;
var G__10634 = (i__10592_10627 + 1);
seq__10589_10624 = G__10631;
chunk__10590_10625 = G__10632;
count__10591_10626 = G__10633;
i__10592_10627 = G__10634;
continue;
}
} else
{var temp__4126__auto___10635 = cljs.core.seq.call(null,seq__10589_10624);if(temp__4126__auto___10635)
{var seq__10589_10636__$1 = temp__4126__auto___10635;if(cljs.core.chunked_seq_QMARK_.call(null,seq__10589_10636__$1))
{var c__7182__auto___10637 = cljs.core.chunk_first.call(null,seq__10589_10636__$1);{
var G__10638 = cljs.core.chunk_rest.call(null,seq__10589_10636__$1);
var G__10639 = c__7182__auto___10637;
var G__10640 = cljs.core.count.call(null,c__7182__auto___10637);
var G__10641 = 0;
seq__10589_10624 = G__10638;
chunk__10590_10625 = G__10639;
count__10591_10626 = G__10640;
i__10592_10627 = G__10641;
continue;
}
} else
{var vec__10594_10642 = cljs.core.first.call(null,seq__10589_10636__$1);var tag_10643 = cljs.core.nth.call(null,vec__10594_10642,0,null);var node_10644 = cljs.core.nth.call(null,vec__10594_10642,1,null);cljs.core.println.call(null,("Line '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node_10644))+"' has overlapping tags. Put line under "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(tag_10643)));
{
var G__10645 = cljs.core.next.call(null,seq__10589_10636__$1);
var G__10646 = null;
var G__10647 = 0;
var G__10648 = 0;
seq__10589_10624 = G__10645;
chunk__10590_10625 = G__10646;
count__10591_10626 = G__10647;
i__10592_10627 = G__10648;
continue;
}
}
} else
{}
}
break;
}
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.call(null,((function (freqs,dups,most_popular_tag,tag_dups,disallowed_node_QMARK_){
return (function (p__10595){var vec__10596 = p__10595;var tag = cljs.core.nth.call(null,vec__10596,0,null);var nodes = cljs.core.nth.call(null,vec__10596,1,null);var new_nodes = cljs.core.remove.call(null,((function (vec__10596,tag,nodes,freqs,dups,most_popular_tag,tag_dups,disallowed_node_QMARK_){
return (function (p1__10568_SHARP_){return disallowed_node_QMARK_.call(null,p1__10568_SHARP_,tag);
});})(vec__10596,tag,nodes,freqs,dups,most_popular_tag,tag_dups,disallowed_node_QMARK_))
,nodes);if(cljs.core.seq.call(null,new_nodes))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag,cljs.core.vec.call(null,new_nodes)], null);
} else
{return null;
}
});})(freqs,dups,most_popular_tag,tag_dups,disallowed_node_QMARK_))
,tags_nodes));
});
/**
* Creates a view given a type or a view config and the editor (branch) to use. A view
* pivots the current branch by changing the parents of a branch.
* @param {...*} var_args
*/
lt.plugins.kukui.__GT_view = (function() { 
var __GT_view__delegate = function (ed,type_or_view,p__10598){var map__10600 = p__10598;var map__10600__$1 = ((cljs.core.seq_QMARK_.call(null,map__10600))?cljs.core.apply.call(null,cljs.core.hash_map,map__10600):map__10600);var lines = cljs.core.get.call(null,map__10600__$1,new cljs.core.Keyword(null,"lines","lines",1116881521));var query_tag = cljs.core.get.call(null,map__10600__$1,new cljs.core.Keyword(null,"query-tag","query-tag",3500842119));var level = cljs.core.get.call(null,map__10600__$1,new cljs.core.Keyword(null,"level","level",1116770038),1);var nodes = lt.plugins.kukui.ed__GT_nodes.call(null,ed,lines);var nodes__$1 = (cljs.core.truth_(query_tag)?cljs.core.filter.call(null,((function (nodes,map__10600,map__10600__$1,lines,query_tag,level){
return (function (p1__10597_SHARP_){return cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__10597_SHARP_),query_tag);
});})(nodes,map__10600,map__10600__$1,lines,query_tag,level))
,nodes):nodes);var view_config = ((cljs.core.map_QMARK_.call(null,type_or_view))?type_or_view:cljs.core.get_in.call(null,lt.plugins.kukui.config.dynamic_config.call(null,nodes__$1),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267),type_or_view], null)));var tags_nodes = lt.plugins.kukui.type_map.call(null,view_config,nodes__$1);var tags_nodes__$1 = lt.plugins.kukui.ensure_unique_nodes.call(null,tags_nodes);var tags_nodes__$2 = lt.plugins.kukui.save_tags.call(null,tags_nodes__$1);var new_nodes = cljs.core.mapcat.call(null,((function (nodes,nodes__$1,view_config,tags_nodes,tags_nodes__$1,tags_nodes__$2,map__10600,map__10600__$1,lines,query_tag,level){
return (function (tag){var temp__4126__auto__ = cljs.core.get.call(null,tags_nodes__$2,tag);if(cljs.core.truth_(temp__4126__auto__))
{var children = temp__4126__auto__;return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type-tag","type-tag",4631398905),true,new cljs.core.Keyword(null,"text","text",1017460895),(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,tag)))], null)], null),children);
} else
{return null;
}
});})(nodes,nodes__$1,view_config,tags_nodes,tags_nodes__$1,tags_nodes__$2,map__10600,map__10600__$1,lines,query_tag,level))
,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(view_config));var indented_nodes = lt.plugins.kukui.core.indent_nodes.call(null,new_nodes,lt.plugins.sacha.codemirror.line_indent.call(null,ed,lt.objs.editor.cursor.call(null,ed).line),lt.objs.editor.option.call(null,ed,"tabSize"),level);return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,"\n",indented_nodes))+"\n");
};
var __GT_view = function (ed,type_or_view,var_args){
var p__10598 = null;if (arguments.length > 2) {
  p__10598 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return __GT_view__delegate.call(this,ed,type_or_view,p__10598);};
__GT_view.cljs$lang$maxFixedArity = 2;
__GT_view.cljs$lang$applyTo = (function (arglist__10649){
var ed = cljs.core.first(arglist__10649);
arglist__10649 = cljs.core.next(arglist__10649);
var type_or_view = cljs.core.first(arglist__10649);
var p__10598 = cljs.core.rest(arglist__10649);
return __GT_view__delegate(ed,type_or_view,p__10598);
});
__GT_view.cljs$core$IFn$_invoke$arity$variadic = __GT_view__delegate;
return __GT_view;
})()
;
lt.plugins.kukui.type_selector = lt.plugins.kukui.selector.selector.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"items","items",1114430258),(function (){return cljs.core.map.call(null,(function (p1__10601_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"name","name",1017277949)],[cljs.core.name.call(null,p1__10601_SHARP_)]);
}),cljs.core.keys.call(null,new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.config.config)));
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
lt.plugins.kukui.replace_children = (function replace_children(ed,view_fn){var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line);return lt.plugins.kukui.check_types_counts.call(null,ed,((function (end_line){
return (function (){var new_body = view_fn.call(null,ed);lt.objs.editor.replace.call(null,lt.objs.editor.__GT_cm_ed.call(null,ed),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,ed)) + 1),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),end_line,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new_body);
return new_body;
});})(end_line))
);
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.type-replace-children","kukui.type-replace-children",2704104452),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: replaces current children with new type view",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.kukui.type_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){return lt.plugins.kukui.replace_children.call(null,lt.objs.editor.pool.last_active.call(null),(function (p1__10602_SHARP_){return lt.plugins.kukui.__GT_view.call(null,p1__10602_SHARP_,cljs.core.keyword.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(type)));
}));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.type-replace-branch","kukui.type-replace-branch",3632901223),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: replaces current branch with new type view",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.kukui.type_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line);return lt.plugins.kukui.check_types_counts.call(null,ed,((function (ed,line,end_line){
return (function (){var new_body = lt.plugins.kukui.__GT_view.call(null,ed,cljs.core.keyword.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(type)),new cljs.core.Keyword(null,"level","level",1116770038),0);lt.objs.editor.replace.call(null,lt.objs.editor.__GT_cm_ed.call(null,ed),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,ed)),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),end_line,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new_body);
return new_body;
});})(ed,line,end_line))
,cljs.core.range.call(null,line,end_line));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.insert-type-branch","kukui.insert-type-branch",1092237804),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: inserts new type view for current branch",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.kukui.type_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var ed = lt.objs.editor.pool.last_active.call(null);return lt.plugins.kukui.util.insert_at_next_line.call(null,ed,lt.plugins.kukui.__GT_view.call(null,ed,cljs.core.keyword.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(type))));
})], null));
/**
* Create a view given a query. There are two formats.
* With parent:    #type: tag1, tag2
* Without parent: tag1, tag2
* @param {...*} var_args
*/
lt.plugins.kukui.__GT_query_view = (function() { 
var __GT_query_view__delegate = function (ed,query,p__10604){var map__10607 = p__10604;var map__10607__$1 = ((cljs.core.seq_QMARK_.call(null,map__10607))?cljs.core.apply.call(null,cljs.core.hash_map,map__10607):map__10607);var lines = cljs.core.get.call(null,map__10607__$1,new cljs.core.Keyword(null,"lines","lines",1116881521));var types_config = cljs.core.get.call(null,map__10607__$1,new cljs.core.Keyword(null,"types-config","types-config",4798725768));var view_fn = cljs.core.get.call(null,map__10607__$1,new cljs.core.Keyword(null,"view-fn","view-fn",1468084322),((function (map__10607,map__10607__$1,lines,types_config){
return (function (p1__10603_SHARP_){return lt.plugins.kukui.config.__GT_type_config.call(null,p1__10603_SHARP_,true);
});})(map__10607,map__10607__$1,lines,types_config))
);var level = cljs.core.get.call(null,map__10607__$1,new cljs.core.Keyword(null,"level","level",1116770038),1);var map__10608 = lt.plugins.kukui.core.text__GT_tag_group.call(null,types_config,query);var map__10608__$1 = ((cljs.core.seq_QMARK_.call(null,map__10608))?cljs.core.apply.call(null,cljs.core.hash_map,map__10608):map__10608);var tags = cljs.core.get.call(null,map__10608__$1,new cljs.core.Keyword(null,"tags","tags",1017456523));var parent_tag = cljs.core.get.call(null,map__10608__$1,new cljs.core.Keyword(null,"parent-tag","parent-tag",768068457));var view_config = view_fn.call(null,tags);return lt.plugins.kukui.__GT_view.call(null,ed,view_config,new cljs.core.Keyword(null,"level","level",1116770038),level,new cljs.core.Keyword(null,"query-tag","query-tag",3500842119),parent_tag,new cljs.core.Keyword(null,"lines","lines",1116881521),lines);
};
var __GT_query_view = function (ed,query,var_args){
var p__10604 = null;if (arguments.length > 2) {
  p__10604 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return __GT_query_view__delegate.call(this,ed,query,p__10604);};
__GT_query_view.cljs$lang$maxFixedArity = 2;
__GT_query_view.cljs$lang$applyTo = (function (arglist__10650){
var ed = cljs.core.first(arglist__10650);
arglist__10650 = cljs.core.next(arglist__10650);
var query = cljs.core.first(arglist__10650);
var p__10604 = cljs.core.rest(arglist__10650);
return __GT_query_view__delegate(ed,query,p__10604);
});
__GT_query_view.cljs$core$IFn$_invoke$arity$variadic = __GT_query_view__delegate;
return __GT_query_view;
})()
;
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.query-replace-children","kukui.query-replace-children",3544797768),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: replaces current children based on current node's query",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line);var new_body = lt.plugins.kukui.__GT_query_view.call(null,ed,lt.objs.editor.line.call(null,ed,line),new cljs.core.Keyword(null,"types-config","types-config",4798725768),lt.plugins.kukui.config.config,new cljs.core.Keyword(null,"view-fn","view-fn",1468084322),((function (ed,line,end_line){
return (function (p1__10609_SHARP_){return lt.plugins.kukui.config.__GT_type_config.call(null,p1__10609_SHARP_,null);
});})(ed,line,end_line))
);return lt.objs.editor.replace.call(null,lt.objs.editor.__GT_cm_ed.call(null,ed),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),(line + 1),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),end_line,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new_body);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.query-insert-children","kukui.query-insert-children",2043705447),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: inserts children based on current node's query and parent's children",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var lines = lt.plugins.kukui.util.find_parent_lines.call(null,ed,line);var new_body = lt.plugins.kukui.__GT_query_view.call(null,ed,lt.objs.editor.line.call(null,ed,line),new cljs.core.Keyword(null,"types-config","types-config",4798725768),lt.plugins.kukui.config.config,new cljs.core.Keyword(null,"lines","lines",1116881521),lines);if(cljs.core.truth_(clojure.string.blank_QMARK_.call(null,new_body)))
{return lt.objs.notifos.set_msg_BANG_.call(null,("No results for '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.objs.editor.line.call(null,ed,line))+"'"));
} else
{return lt.plugins.kukui.util.insert_at_next_line.call(null,ed,new_body);
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.raise-node","kukui.raise-node",3970575278),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Raises node to replace parent and sets it to parent's level",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var parent_line = lt.plugins.kukui.util.find_parent_line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line);return lt.objs.editor.operation.call(null,ed,((function (ed,parent_line){
return (function (){lt.plugins.sacha.codemirror.delete_lines.call(null,ed,parent_line,parent_line);
return lt.plugins.sacha.indent_branch.call(null,"subtract");
});})(ed,parent_line))
);
})], null));
/**
* Similar to codemirror fold/unfold-all but condition is given line number
*/
lt.plugins.kukui.toggle_all = (function() {
var toggle_all = null;
var toggle_all__2 = (function (ed,condition){return toggle_all.call(null,ed,condition,cljs.core.range.call(null,lt.objs.editor.first_line.call(null,ed),(lt.objs.editor.last_line.call(null,ed) + 1)));
});
var toggle_all__3 = (function (ed,condition,lines){return lt.objs.editor.operation.call(null,ed,(function (){var seq__10614 = cljs.core.seq.call(null,lines);var chunk__10615 = null;var count__10616 = 0;var i__10617 = 0;while(true){
if((i__10617 < count__10616))
{var line = cljs.core._nth.call(null,chunk__10615,i__10617);if(cljs.core.truth_(condition.call(null,line)))
{lt.plugins.sacha.codemirror.fold_code.call(null,ed,{"ch": 0, "line": line},null);
} else
{}
{
var G__10651 = seq__10614;
var G__10652 = chunk__10615;
var G__10653 = count__10616;
var G__10654 = (i__10617 + 1);
seq__10614 = G__10651;
chunk__10615 = G__10652;
count__10616 = G__10653;
i__10617 = G__10654;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__10614);if(temp__4126__auto__)
{var seq__10614__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__10614__$1))
{var c__7182__auto__ = cljs.core.chunk_first.call(null,seq__10614__$1);{
var G__10655 = cljs.core.chunk_rest.call(null,seq__10614__$1);
var G__10656 = c__7182__auto__;
var G__10657 = cljs.core.count.call(null,c__7182__auto__);
var G__10658 = 0;
seq__10614 = G__10655;
chunk__10615 = G__10656;
count__10616 = G__10657;
i__10617 = G__10658;
continue;
}
} else
{var line = cljs.core.first.call(null,seq__10614__$1);if(cljs.core.truth_(condition.call(null,line)))
{lt.plugins.sacha.codemirror.fold_code.call(null,ed,{"ch": 0, "line": line},null);
} else
{}
{
var G__10659 = cljs.core.next.call(null,seq__10614__$1);
var G__10660 = null;
var G__10661 = 0;
var G__10662 = 0;
seq__10614 = G__10659;
chunk__10615 = G__10660;
count__10616 = G__10661;
i__10617 = G__10662;
continue;
}
}
} else
{return null;
}
}
break;
}
}));
});
toggle_all = function(ed,condition,lines){
switch(arguments.length){
case 2:
return toggle_all__2.call(this,ed,condition);
case 3:
return toggle_all__3.call(this,ed,condition,lines);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
toggle_all.cljs$core$IFn$_invoke$arity$2 = toggle_all__2;
toggle_all.cljs$core$IFn$_invoke$arity$3 = toggle_all__3;
return toggle_all;
})()
;
/**
* Stamp children nodes with parent tags
*/
lt.plugins.kukui.stamp_nodes = (function stamp_nodes(ed){var level = 0;var nodes = lt.plugins.kukui.ed__GT_nodes.call(null,ed);var parent_tags = lt.plugins.kukui.core.text__GT_tags.call(null,lt.objs.editor.line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line));var new_nodes = cljs.core.map.call(null,((function (level,nodes,parent_tags){
return (function (p1__10618_SHARP_){return lt.plugins.kukui.add_tags_to_node.call(null,p1__10618_SHARP_,parent_tags);
});})(level,nodes,parent_tags))
,nodes);var indented_nodes = lt.plugins.kukui.core.indent_nodes.call(null,new_nodes,lt.plugins.sacha.codemirror.line_indent.call(null,ed,lt.objs.editor.cursor.call(null,ed).line),lt.objs.editor.option.call(null,ed,"tabSize"),level);return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,"\n",indented_nodes))+"\n");
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.stamp-children","kukui.stamp-children",3918722228),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: stamps current children with parent tags",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.kukui.replace_children.call(null,lt.objs.editor.pool.last_active.call(null),lt.plugins.kukui.stamp_nodes);
})], null));
lt.plugins.kukui.sibling_nodes = (function sibling_nodes(ed,line){var parent_lines = lt.plugins.kukui.util.find_parent_lines.call(null,ed,line);var current_indent = lt.plugins.sacha.codemirror.line_indent.call(null,ed,line);var sibling_lines = cljs.core.filter.call(null,((function (parent_lines,current_indent){
return (function (p1__10619_SHARP_){if(cljs.core._EQ_.call(null,current_indent,lt.plugins.sacha.codemirror.line_indent.call(null,ed,p1__10619_SHARP_)))
{return p1__10619_SHARP_;
} else
{return null;
}
});})(parent_lines,current_indent))
,parent_lines);return cljs.core.map.call(null,cljs.core.partial.call(null,lt.plugins.kukui.line__GT_node,ed),sibling_lines);
});
cljs.core._add_method.call(null,lt.plugins.kukui.config.save,new cljs.core.Keyword(null,"level-type","level-type",1174838101),(function (_,p__10621){var map__10622 = p__10621;var map__10622__$1 = ((cljs.core.seq_QMARK_.call(null,map__10622))?cljs.core.apply.call(null,cljs.core.hash_map,map__10622):map__10622);var value = cljs.core.get.call(null,map__10622__$1,new cljs.core.Keyword(null,"value","value",1125876963));var editor = cljs.core.get.call(null,map__10622__$1,new cljs.core.Keyword(null,"editor","editor",4001043679));var line = lt.objs.editor.cursor.call(null,editor).line;var siblings = cljs.core.mapcat.call(null,((function (line,map__10622,map__10622__$1,value,editor){
return (function (p1__10620_SHARP_){return lt.plugins.kukui.core.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(p1__10620_SHARP_));
});})(line,map__10622,map__10622__$1,value,editor))
,lt.plugins.kukui.sibling_nodes.call(null,editor,line));return lt.plugins.kukui.config.merge_config.call(null,new cljs.core.PersistentArrayMap.fromArray([cljs.core.keyword.call(null,value),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"names","names",1118489274),siblings], null)], true, false),new cljs.core.Keyword(null,"into-type","into-type",1739536889));
}));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.save-current-config","kukui.save-current-config",4327925503),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Saves config for the current line",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.kukui.config.save_current_config.call(null,lt.objs.editor.pool.last_active.call(null));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.toggle-descs","kukui.toggle-descs",4779010676),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Toggle visibility of descs of current children",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line);return lt.plugins.kukui.toggle_all.call(null,ed,((function (ed,line,end_line){
return (function (p1__10623_SHARP_){var and__6414__auto__ = cljs.core.not.call(null,lt.plugins.kukui.core.desc_node_QMARK_.call(null,lt.plugins.kukui.line__GT_node.call(null,ed,p1__10623_SHARP_)));if(and__6414__auto__)
{return lt.plugins.kukui.core.desc_node_QMARK_.call(null,lt.plugins.kukui.line__GT_node.call(null,ed,(p1__10623_SHARP_ + 1)));
} else
{return and__6414__auto__;
}
});})(ed,line,end_line))
,cljs.core.range.call(null,line,end_line));
})], null));
}

//# sourceMappingURL=kukui_compiled.js.map