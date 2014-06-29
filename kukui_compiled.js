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
lt.plugins.kukui.core.tag_pattern = (function (){var disallowed_chars = " \\t\\n,;\\*";return cljs.core.re_pattern.call(null,("(?:[^\\\\]|^)("+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+"[^"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(disallowed_chars)+"]+[^"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(disallowed_chars)+".:]|"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+"[^"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(disallowed_chars)+".:])"));
})();
lt.plugins.kukui.core.text__GT_tags = (function text__GT_tags(text){return cljs.core.map.call(null,(function (p1__8782_SHARP_){return cljs.core.subs.call(null,p1__8782_SHARP_,1);
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
var vec__8788 = cljs.core.re_find.call(null,/^\s*(\S+:|)\s*(.*)$/,text);var _ = cljs.core.nth.call(null,vec__8788,0,null);var parent_tag = cljs.core.nth.call(null,vec__8788,1,null);var tags_string = cljs.core.nth.call(null,vec__8788,2,null);var parent_tag__$1 = ((cljs.core.seq.call(null,parent_tag))?cljs.core.first.call(null,lt.plugins.kukui.core.text__GT_tags.call(null,parent_tag)):null);var raw_tags = clojure.string.split.call(null,tags_string,/\s*,\s*/);var default_tag = (function (){var G__8789 = cljs.core.some.call(null,((function (vec__8788,_,parent_tag,tags_string,parent_tag__$1,raw_tags){
return (function (p1__8783_SHARP_){if(cljs.core._EQ_.call(null,lt.plugins.kukui.core.default_tag_char,cljs.core.subs.call(null,p1__8783_SHARP_,(cljs.core.count.call(null,p1__8783_SHARP_) - 1))))
{return p1__8783_SHARP_;
} else
{return null;
}
});})(vec__8788,_,parent_tag,tags_string,parent_tag__$1,raw_tags))
,raw_tags);var G__8789__$1 = (((G__8789 == null))?null:((function (G__8789,vec__8788,_,parent_tag,tags_string,parent_tag__$1,raw_tags){
return (function (p1__8784_SHARP_){return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.call(null,p1__8784_SHARP_,0,(cljs.core.count.call(null,p1__8784_SHARP_) - 1))));
});})(G__8789,vec__8788,_,parent_tag,tags_string,parent_tag__$1,raw_tags))
.call(null,G__8789));var G__8789__$2 = (((G__8789__$1 == null))?null:lt.plugins.kukui.core.text__GT_tags.call(null,G__8789__$1));var G__8789__$3 = (((G__8789__$2 == null))?null:cljs.core.first.call(null,G__8789__$2));return G__8789__$3;
})();var tags = lt.plugins.kukui.core.text__GT_tags.call(null,clojure.string.join.call(null," ",cljs.core.map.call(null,((function (vec__8788,_,parent_tag,tags_string,parent_tag__$1,raw_tags,default_tag){
return (function (p1__8785_SHARP_){return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__8785_SHARP_));
});})(vec__8788,_,parent_tag,tags_string,parent_tag__$1,raw_tags,default_tag))
,raw_tags)));var tags__$1 = cljs.core.mapcat.call(null,cljs.core.partial.call(null,lt.plugins.kukui.core.expand_tag,types_config),tags);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"parent-tag","parent-tag",768068457),parent_tag__$1,new cljs.core.Keyword(null,"tags","tags",1017456523),tags__$1,new cljs.core.Keyword(null,"default-tag","default-tag",575796608),default_tag], null);
});
lt.plugins.kukui.core.indent_node = (function indent_node(node,indent){return clojure.string.replace_first.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node),/^\s*/,cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,indent," ")));
});
lt.plugins.kukui.core.indent_nodes = (function indent_nodes(nodes,indent,tab_size,offset_level){var offset = (offset_level * tab_size);var tag_indent = (indent + offset);var node_indent = ((indent + offset) + tab_size);var desc_indent = (((indent + offset) + tab_size) + tab_size);return cljs.core.mapcat.call(null,((function (offset,tag_indent,node_indent,desc_indent){
return (function (p1__8790_SHARP_){if(cljs.core.truth_(new cljs.core.Keyword(null,"type-tag","type-tag",4631398905).cljs$core$IFn$_invoke$arity$1(p1__8790_SHARP_)))
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,tag_indent," ")))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(p1__8790_SHARP_)))], null);
} else
{return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.kukui.core.indent_node.call(null,p1__8790_SHARP_,node_indent)], null),cljs.core.map.call(null,((function (offset,tag_indent,node_indent,desc_indent){
return (function (x){return lt.plugins.kukui.core.indent_node.call(null,x,desc_indent);
});})(offset,tag_indent,node_indent,desc_indent))
,new cljs.core.Keyword(null,"desc","desc",1016984067).cljs$core$IFn$_invoke$arity$1(p1__8790_SHARP_)));
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
lt.plugins.kukui.core.add_attributes_to_nodes = (function add_attributes_to_nodes(nodes){return cljs.core.mapv.call(null,(function (node){var vec__8800 = cljs.core.juxt.call(null,cljs.core.remove,cljs.core.filter).call(null,(function (p1__8793_SHARP_){return (p1__8793_SHARP_.indexOf(":") > -1);
}),new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(node));var tags = cljs.core.nth.call(null,vec__8800,0,null);var attribute_tags = cljs.core.nth.call(null,vec__8800,1,null);return cljs.core.merge.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (vec__8800,tags,attribute_tags){
return (function (p__8801){var vec__8802 = p__8801;var k = cljs.core.nth.call(null,vec__8802,0,null);var v = cljs.core.nth.call(null,vec__8802,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,k),v], null);
});})(vec__8800,tags,attribute_tags))
,cljs.core.map.call(null,((function (vec__8800,tags,attribute_tags){
return (function (p1__8794_SHARP_){return clojure.string.split.call(null,p1__8794_SHARP_,/:/);
});})(vec__8800,tags,attribute_tags))
,attribute_tags))),cljs.core.assoc.call(null,node,new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.set.call(null,tags)));
}),new cljs.core.Keyword(null,"nodes","nodes",1118897699).cljs$core$IFn$_invoke$arity$1(cljs.core.reduce.call(null,(function (accum,p__8803){var vec__8804 = p__8803;var curr = cljs.core.nth.call(null,vec__8804,0,null);var next = cljs.core.nth.call(null,vec__8804,1,null);if(cljs.core.truth_(lt.plugins.kukui.core.parent_node_QMARK_.call(null,curr,next)))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tags","tags",1017456523)], null),((function (vec__8804,curr,next){
return (function (p1__8791_SHARP_){return lt.plugins.kukui.core.add_node_with_tags.call(null,cljs.core.vec.call(null,cljs.core.remove.call(null,((function (vec__8804,curr,next){
return (function (tag){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(tag),new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
});})(vec__8804,curr,next))
,p1__8791_SHARP_)),curr,lt.plugins.kukui.core.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr)));
});})(vec__8804,curr,next))
);
} else
{if(cljs.core.truth_(lt.plugins.kukui.core.desc_node_QMARK_.call(null,curr)))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699),(cljs.core.count.call(null,new cljs.core.Keyword(null,"nodes","nodes",1118897699).cljs$core$IFn$_invoke$arity$1(accum)) - 1),new cljs.core.Keyword(null,"desc","desc",1016984067)], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),curr);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699)], null),((function (vec__8804,curr,next){
return (function (nodes__$1){return lt.plugins.kukui.core.add_node_with_tags.call(null,nodes__$1,curr,cljs.core.concat.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.filter.call(null,((function (vec__8804,curr,next){
return (function (p1__8792_SHARP_){return (new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(p1__8792_SHARP_) < new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
});})(vec__8804,curr,next))
,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(accum))),lt.plugins.kukui.core.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr))));
});})(vec__8804,curr,next))
);
} else
{return null;
}
}
}
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"nodes","nodes",1118897699),cljs.core.PersistentVector.EMPTY], null),cljs.core.partition.call(null,2,1,cljs.core.PersistentVector.EMPTY,nodes))));
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
return (function (p1__8539_SHARP_){return cljs.core.into.call(null,unaccounted_tags,p1__8539_SHARP_);
});})(unaccounted_tags))
);
});
/**
* Finds a tag's type. Returns unknown-type if none found.
*/
lt.plugins.kukui.config.find_type = (function find_type(tag){var or__6426__auto__ = cljs.core.some.call(null,(function (p__8546){var vec__8547 = p__8546;var type = cljs.core.nth.call(null,vec__8547,0,null);var type_map = cljs.core.nth.call(null,vec__8547,1,null);if(cljs.core.contains_QMARK_.call(null,cljs.core.set.call(null,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(type_map)),tag))
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
deep_merge.cljs$lang$applyTo = (function (arglist__8558){
var vals = cljs.core.seq(arglist__8558);
return deep_merge__delegate(vals);
});
deep_merge.cljs$core$IFn$_invoke$arity$variadic = deep_merge__delegate;
return deep_merge;
})()
;
lt.plugins.kukui.config.merge_config = (function merge_config(user_config,merge_type){var new_config = (function (){var G__8550 = (((merge_type instanceof cljs.core.Keyword))?merge_type.fqn:null);var caseval__8559;
switch (G__8550){
case "into-type":
caseval__8559=cljs.core.update_in.call(null,lt.plugins.kukui.config.config,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267)], null),((function (G__8550){
return (function (p1__8548_SHARP_){return cljs.core.merge_with.call(null,lt.plugins.kukui.config.deep_merge,p1__8548_SHARP_,user_config);
});})(G__8550))
)
break;
case "reset":
caseval__8559=cljs.core.update_in.call(null,cljs.core.merge_with.call(null,cljs.core.merge,lt.plugins.kukui.config.base_config,lt.plugins.kukui.config.global_config),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267)], null),cljs.core.merge,user_config)
break;
default:
caseval__8559=cljs.core.update_in.call(null,lt.plugins.kukui.config.config,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267)], null),cljs.core.merge,user_config)
}
return caseval__8559;
})();cljs.core.println.call(null,"New config is: ",cljs.core.pr_str.call(null,new_config));
lt.objs.notifos.set_msg_BANG_.call(null,"Saved config");
lt.plugins.kukui.config.config = new_config;
});
/**
* Updates :types in config using children nodes as tag groups.
*/
lt.plugins.kukui.config.tag_group_merge_config = (function tag_group_merge_config(ed,merge_type){var line = lt.objs.editor.cursor.call(null,ed).line;var children_lines = cljs.core.range.call(null,(line + 1),lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line));var user_config = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (line,children_lines){
return (function (p1__8553_SHARP_){return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.keyword.call(null,new cljs.core.Keyword(null,"parent-tag","parent-tag",768068457).cljs$core$IFn$_invoke$arity$1(p1__8553_SHARP_)),lt.plugins.kukui.config.__GT_type_config.call(null,cljs.core.vec.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__8553_SHARP_)),new cljs.core.Keyword(null,"default-tag","default-tag",575796608).cljs$core$IFn$_invoke$arity$1(p1__8553_SHARP_))],null));
});})(line,children_lines))
,cljs.core.remove.call(null,((function (line,children_lines){
return (function (p1__8552_SHARP_){var no_parent = cljs.core.not.call(null,new cljs.core.Keyword(null,"parent-tag","parent-tag",768068457).cljs$core$IFn$_invoke$arity$1(p1__8552_SHARP_));if(no_parent)
{cljs.core.println.call(null,"Skipping line with no parent-tag: ",cljs.core.pr_str.call(null,p1__8552_SHARP_));
} else
{}
return no_parent;
});})(line,children_lines))
,cljs.core.map.call(null,cljs.core.partial.call(null,lt.plugins.kukui.core.text__GT_tag_group,lt.plugins.kukui.config.config),cljs.core.map.call(null,((function (line,children_lines){
return (function (p1__8551_SHARP_){return lt.objs.editor.line.call(null,ed,p1__8551_SHARP_);
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
cljs.core._add_method.call(null,lt.plugins.kukui.config.save,new cljs.core.Keyword(null,"types","types",1124748267),(function (_,p__8554){var map__8555 = p__8554;var map__8555__$1 = ((cljs.core.seq_QMARK_.call(null,map__8555))?cljs.core.apply.call(null,cljs.core.hash_map,map__8555):map__8555);var value = cljs.core.get.call(null,map__8555__$1,new cljs.core.Keyword(null,"value","value",1125876963));var editor = cljs.core.get.call(null,map__8555__$1,new cljs.core.Keyword(null,"editor","editor",4001043679));return lt.plugins.kukui.config.tag_group_merge_config.call(null,editor,cljs.core.keyword.call(null,value));
}));
/**
* Saves config of current line. Save behavior depends on config key.
*/
lt.plugins.kukui.config.save_current_config = (function save_current_config(ed){var line_text = lt.objs.editor.line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line);var vec__8557 = lt.plugins.kukui.config.read_config_line.call(null,line_text);var config_key = cljs.core.nth.call(null,vec__8557,0,null);var config_val = cljs.core.nth.call(null,vec__8557,1,null);return lt.plugins.kukui.config.save.call(null,cljs.core.keyword.call(null,config_key),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",1125876963),config_val,new cljs.core.Keyword(null,"editor","editor",4001043679),ed], null));
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
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.db')) {
goog.provide('lt.plugins.kukui.db');
goog.require('cljs.core');
lt.plugins.kukui.db.store = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"names","names",1118489274),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"db","db",1013907440),cljs.core.PersistentVector.EMPTY], null));
/**
* @param {...*} var_args
*/
lt.plugins.kukui.db.create_BANG_ = (function() { 
var create_BANG___delegate = function (records){var names = new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.kukui.db.store));var dups = cljs.core.filter.call(null,((function (names){
return (function (p1__13193_SHARP_){var and__6414__auto__ = new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__13193_SHARP_);if(cljs.core.truth_(and__6414__auto__))
{return cljs.core.contains_QMARK_.call(null,names,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__13193_SHARP_));
} else
{return and__6414__auto__;
}
});})(names))
,records);if(cljs.core.seq.call(null,dups))
{cljs.core.prn.call(null,"DUPS",dups);
throw cljs.core.ex_info.call(null,("Names must be unique: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.map.call(null,new cljs.core.Keyword(null,"name","name",1017277949),dups))),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"names","names",1118489274),cljs.core.map.call(null,new cljs.core.Keyword(null,"name","name",1017277949),dups)], null));
} else
{}
return cljs.core.swap_BANG_.call(null,lt.plugins.kukui.db.store,((function (names,dups){
return (function (p1__13194_SHARP_){return cljs.core.update_in.call(null,cljs.core.update_in.call(null,p1__13194_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db","db",1013907440)], null),cljs.core.into,records),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"names","names",1118489274)], null),cljs.core.into,cljs.core.keep.call(null,new cljs.core.Keyword(null,"name","name",1017277949),records));
});})(names,dups))
);
};
var create_BANG_ = function (var_args){
var records = null;if (arguments.length > 0) {
  records = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return create_BANG___delegate.call(this,records);};
create_BANG_.cljs$lang$maxFixedArity = 0;
create_BANG_.cljs$lang$applyTo = (function (arglist__13195){
var records = cljs.core.seq(arglist__13195);
return create_BANG___delegate(records);
});
create_BANG_.cljs$core$IFn$_invoke$arity$variadic = create_BANG___delegate;
return create_BANG_;
})()
;
lt.plugins.kukui.db.create_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),"type",new cljs.core.Keyword(null,"type","type",1017479852),"type"], null));
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
lt.plugins.kukui.selector.selector = (function selector(opts){var G__8577 = lt.objs.sidebar.command.filter_list.call(null,opts);lt.object.add_behavior_BANG_.call(null,G__8577,new cljs.core.Keyword("lt.plugins.kukui.selector","set-selected","lt.plugins.kukui.selector/set-selected",3025761911));
return G__8577;
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
goog.require('lt.plugins.kukui.db');
goog.require('lt.plugins.kukui.config');
goog.require('clojure.set');
goog.require('lt.plugins.sacha');
goog.require('lt.plugins.kukui.util');
goog.require('lt.objs.command');
goog.require('clojure.string');
goog.require('lt.plugins.sacha.codemirror');
goog.require('lt.plugins.kukui.db');
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
lt.plugins.kukui.__GT_tagged_nodes = (function __GT_tagged_nodes(ed,lines){var nodes = lt.plugins.kukui.core.add_attributes_to_nodes.call(null,cljs.core.map.call(null,(function (p1__13197_SHARP_){if(cljs.core.truth_(cljs.core.re_find.call(null,/^\s*:config/,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(p1__13197_SHARP_))))
{return cljs.core.update_in.call(null,p1__13197_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",1017460895)], null),cljs.core.str," ",lt.plugins.kukui.core.tag_prefix,lt.plugins.kukui.ignore_tag);
} else
{return p1__13197_SHARP_;
}
}),cljs.core.map.call(null,(function (p1__13196_SHARP_){return lt.plugins.kukui.line__GT_node.call(null,ed,p1__13196_SHARP_);
}),lines)));return cljs.core.remove.call(null,((function (nodes){
return (function (p1__13198_SHARP_){return cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__13198_SHARP_),lt.plugins.kukui.ignore_tag);
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
return (function (p1__13199_SHARP_,p2__13200_SHARP_){return f.call(null,p1__13199_SHARP_,p2__13200_SHARP_,node);
});})(type_tags,type_tags__$1))
,accum,type_tags__$1);
}),cljs.core.PersistentArrayMap.EMPTY,nodes);
});
lt.plugins.kukui.type_counts = cljs.core.partial.call(null,lt.plugins.kukui.type_nodes__GT_tag_map,(function (p1__13201_SHARP_,p2__13202_SHARP_){return cljs.core.update_in.call(null,p1__13201_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p2__13202_SHARP_], null),cljs.core.inc);
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
return (function (p1__13203_SHARP_){var counts = lt.plugins.kukui.type_counts.call(null,cljs.core.get_in.call(null,types_config,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267),p1__13203_SHARP_], null)),nodes);if(cljs.core.truth_((function (){var and__6414__auto__ = cljs.core._EQ_.call(null,1,cljs.core.count.call(null,counts));if(and__6414__auto__)
{return cljs.core.get.call(null,counts,cljs.core.get_in.call(null,types_config,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267),p1__13203_SHARP_,new cljs.core.Keyword(null,"default","default",2558708147)], null)));
} else
{return and__6414__auto__;
}
})()))
{return null;
} else
{return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[p1__13203_SHARP_,counts],null));
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
lt.plugins.kukui.attribute_counts_STAR_ = (function attribute_counts_STAR_(nodes,attr){cljs.core.println.call(null,"Attribute:",attr,"exists for",cljs.core.count.call(null,cljs.core.filter.call(null,attr,nodes)),"of",cljs.core.count.call(null,nodes),"nodes");
return cljs.core.prn.call(null,cljs.core.reduce.call(null,(function (accum,val){return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [val], null),cljs.core.inc);
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,attr,nodes)));
});
lt.plugins.kukui.attribute_counts = (function attribute_counts(nodes){var seq__13208 = cljs.core.seq.call(null,cljs.core.disj.call(null,cljs.core.set.call(null,cljs.core.mapcat.call(null,cljs.core.keys,nodes)),new cljs.core.Keyword(null,"desc","desc",1016984067),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.Keyword(null,"indent","indent",4124632094),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"text","text",1017460895)));var chunk__13209 = null;var count__13210 = 0;var i__13211 = 0;while(true){
if((i__13211 < count__13210))
{var attr = cljs.core._nth.call(null,chunk__13209,i__13211);lt.plugins.kukui.attribute_counts_STAR_.call(null,nodes,attr);
{
var G__13279 = seq__13208;
var G__13280 = chunk__13209;
var G__13281 = count__13210;
var G__13282 = (i__13211 + 1);
seq__13208 = G__13279;
chunk__13209 = G__13280;
count__13210 = G__13281;
i__13211 = G__13282;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__13208);if(temp__4126__auto__)
{var seq__13208__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__13208__$1))
{var c__7182__auto__ = cljs.core.chunk_first.call(null,seq__13208__$1);{
var G__13283 = cljs.core.chunk_rest.call(null,seq__13208__$1);
var G__13284 = c__7182__auto__;
var G__13285 = cljs.core.count.call(null,c__7182__auto__);
var G__13286 = 0;
seq__13208 = G__13283;
chunk__13209 = G__13284;
count__13210 = G__13285;
i__13211 = G__13286;
continue;
}
} else
{var attr = cljs.core.first.call(null,seq__13208__$1);lt.plugins.kukui.attribute_counts_STAR_.call(null,nodes,attr);
{
var G__13287 = cljs.core.next.call(null,seq__13208__$1);
var G__13288 = null;
var G__13289 = 0;
var G__13290 = 0;
seq__13208 = G__13287;
chunk__13209 = G__13288;
count__13210 = G__13289;
i__13211 = G__13290;
continue;
}
}
} else
{return null;
}
}
break;
}
});
/**
* Useful for printing list or vec of maps. Hack until actual cljs.pprint exists
*/
lt.plugins.kukui.pprint = (function pprint(data){return cljs.core.println.call(null,clojure.string.join.call(null,"\n",data));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.types-counts","kukui.types-counts",4251463491),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: tag counts of each type for current branch or selection",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var nodes = lt.plugins.kukui.ed__GT_nodes.call(null,ed,null);lt.plugins.kukui.pprint.call(null,lt.plugins.kukui.types_counts.call(null,ed,null));
cljs.core.prn.call(null,cljs.core.assoc.call(null,lt.plugins.kukui.total_types_counts.call(null,ed,null),"untagged",cljs.core.count.call(null,cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.empty_QMARK_,new cljs.core.Keyword(null,"tags","tags",1017456523)),nodes)),"nodes",cljs.core.count.call(null,nodes)));
return lt.plugins.kukui.attribute_counts.call(null,nodes);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.all-types-counts","kukui.all-types-counts",2670019439),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Same as types-counts but for whole file",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var lines = cljs.core.range.call(null,lt.objs.editor.first_line.call(null,ed),(lt.objs.editor.last_line.call(null,ed) + 1));var nodes = lt.plugins.kukui.ed__GT_nodes.call(null,ed,lines);lt.plugins.kukui.pprint.call(null,lt.plugins.kukui.types_counts.call(null,ed,lines));
cljs.core.prn.call(null,cljs.core.assoc.call(null,lt.plugins.kukui.total_types_counts.call(null,ed,lines),"untagged",cljs.core.count.call(null,cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.empty_QMARK_,new cljs.core.Keyword(null,"tags","tags",1017456523)),nodes)),"nodes",cljs.core.count.call(null,nodes)));
return lt.plugins.kukui.attribute_counts.call(null,nodes);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.debug-nodes","kukui.debug-nodes",1810794576),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: prints nodes for current branch or selection",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.kukui.pprint.call(null,lt.plugins.kukui.ed__GT_nodes.call(null,lt.objs.editor.pool.last_active.call(null)));
})], null));
lt.plugins.kukui.type_map = cljs.core.partial.call(null,lt.plugins.kukui.type_nodes__GT_tag_map,(function (p1__13212_SHARP_,p2__13213_SHARP_,p3__13214_SHARP_){return cljs.core.update_in.call(null,p1__13212_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p2__13213_SHARP_], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),p3__13214_SHARP_);
}));
lt.plugins.kukui.add_tags_to_node = (function add_tags_to_node(node,tags){return cljs.core.update_in.call(null,node,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",1017460895)], null),cljs.core.str,clojure.string.join.call(null,cljs.core.map.call(null,(function (p1__13215_SHARP_){return (" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__13215_SHARP_));
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
return (function (p__13233){var vec__13234 = p__13233;var node = cljs.core.nth.call(null,vec__13234,0,null);var c = cljs.core.nth.call(null,vec__13234,1,null);if((c > 1))
{return node;
} else
{return null;
}
});})(freqs))
,freqs);var most_popular_tag = ((function (freqs,dups){
return (function (p1__13216_SHARP_){return cljs.core.first.call(null,cljs.core.apply.call(null,cljs.core.max_key,((function (freqs,dups){
return (function (p__13235){var vec__13236 = p__13235;var tag = cljs.core.nth.call(null,vec__13236,0,null);var nodes = cljs.core.nth.call(null,vec__13236,1,null);if(cljs.core.contains_QMARK_.call(null,p1__13216_SHARP_,tag))
{return cljs.core.count.call(null,nodes);
} else
{return null;
}
});})(freqs,dups))
,tags_nodes));
});})(freqs,dups))
;var tag_dups = cljs.core.map.call(null,((function (freqs,dups,most_popular_tag){
return (function (p1__13217_SHARP_){return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[most_popular_tag.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__13217_SHARP_)),p1__13217_SHARP_],null));
});})(freqs,dups,most_popular_tag))
,dups);var disallowed_node_QMARK_ = ((function (freqs,dups,most_popular_tag,tag_dups){
return (function (node,tag){return cljs.core.some.call(null,((function (freqs,dups,most_popular_tag,tag_dups){
return (function (p__13237){var vec__13238 = p__13237;var allowed_tag = cljs.core.nth.call(null,vec__13238,0,null);var dup_node = cljs.core.nth.call(null,vec__13238,1,null);return (cljs.core._EQ_.call(null,dup_node,node)) && (cljs.core.not_EQ_.call(null,allowed_tag,tag));
});})(freqs,dups,most_popular_tag,tag_dups))
,tag_dups);
});})(freqs,dups,most_popular_tag,tag_dups))
;var seq__13239_13291 = cljs.core.seq.call(null,tag_dups);var chunk__13240_13292 = null;var count__13241_13293 = 0;var i__13242_13294 = 0;while(true){
if((i__13242_13294 < count__13241_13293))
{var vec__13243_13295 = cljs.core._nth.call(null,chunk__13240_13292,i__13242_13294);var tag_13296 = cljs.core.nth.call(null,vec__13243_13295,0,null);var node_13297 = cljs.core.nth.call(null,vec__13243_13295,1,null);cljs.core.println.call(null,("Line '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node_13297))+"' has overlapping tags. Put line under "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(tag_13296)));
{
var G__13298 = seq__13239_13291;
var G__13299 = chunk__13240_13292;
var G__13300 = count__13241_13293;
var G__13301 = (i__13242_13294 + 1);
seq__13239_13291 = G__13298;
chunk__13240_13292 = G__13299;
count__13241_13293 = G__13300;
i__13242_13294 = G__13301;
continue;
}
} else
{var temp__4126__auto___13302 = cljs.core.seq.call(null,seq__13239_13291);if(temp__4126__auto___13302)
{var seq__13239_13303__$1 = temp__4126__auto___13302;if(cljs.core.chunked_seq_QMARK_.call(null,seq__13239_13303__$1))
{var c__7182__auto___13304 = cljs.core.chunk_first.call(null,seq__13239_13303__$1);{
var G__13305 = cljs.core.chunk_rest.call(null,seq__13239_13303__$1);
var G__13306 = c__7182__auto___13304;
var G__13307 = cljs.core.count.call(null,c__7182__auto___13304);
var G__13308 = 0;
seq__13239_13291 = G__13305;
chunk__13240_13292 = G__13306;
count__13241_13293 = G__13307;
i__13242_13294 = G__13308;
continue;
}
} else
{var vec__13244_13309 = cljs.core.first.call(null,seq__13239_13303__$1);var tag_13310 = cljs.core.nth.call(null,vec__13244_13309,0,null);var node_13311 = cljs.core.nth.call(null,vec__13244_13309,1,null);cljs.core.println.call(null,("Line '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node_13311))+"' has overlapping tags. Put line under "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(tag_13310)));
{
var G__13312 = cljs.core.next.call(null,seq__13239_13303__$1);
var G__13313 = null;
var G__13314 = 0;
var G__13315 = 0;
seq__13239_13291 = G__13312;
chunk__13240_13292 = G__13313;
count__13241_13293 = G__13314;
i__13242_13294 = G__13315;
continue;
}
}
} else
{}
}
break;
}
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.call(null,((function (freqs,dups,most_popular_tag,tag_dups,disallowed_node_QMARK_){
return (function (p__13245){var vec__13246 = p__13245;var tag = cljs.core.nth.call(null,vec__13246,0,null);var nodes = cljs.core.nth.call(null,vec__13246,1,null);var new_nodes = cljs.core.remove.call(null,((function (vec__13246,tag,nodes,freqs,dups,most_popular_tag,tag_dups,disallowed_node_QMARK_){
return (function (p1__13218_SHARP_){return disallowed_node_QMARK_.call(null,p1__13218_SHARP_,tag);
});})(vec__13246,tag,nodes,freqs,dups,most_popular_tag,tag_dups,disallowed_node_QMARK_))
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
var __GT_view__delegate = function (ed,type_or_view,p__13248){var map__13250 = p__13248;var map__13250__$1 = ((cljs.core.seq_QMARK_.call(null,map__13250))?cljs.core.apply.call(null,cljs.core.hash_map,map__13250):map__13250);var lines = cljs.core.get.call(null,map__13250__$1,new cljs.core.Keyword(null,"lines","lines",1116881521));var query_tag = cljs.core.get.call(null,map__13250__$1,new cljs.core.Keyword(null,"query-tag","query-tag",3500842119));var level = cljs.core.get.call(null,map__13250__$1,new cljs.core.Keyword(null,"level","level",1116770038),1);var nodes = lt.plugins.kukui.ed__GT_nodes.call(null,ed,lines);var nodes__$1 = (cljs.core.truth_(query_tag)?cljs.core.filter.call(null,((function (nodes,map__13250,map__13250__$1,lines,query_tag,level){
return (function (p1__13247_SHARP_){return cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__13247_SHARP_),query_tag);
});})(nodes,map__13250,map__13250__$1,lines,query_tag,level))
,nodes):nodes);var view_config = ((cljs.core.map_QMARK_.call(null,type_or_view))?type_or_view:cljs.core.get_in.call(null,lt.plugins.kukui.config.dynamic_config.call(null,nodes__$1),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"types","types",1124748267),type_or_view], null)));var tags_nodes = lt.plugins.kukui.type_map.call(null,view_config,nodes__$1);var tags_nodes__$1 = lt.plugins.kukui.ensure_unique_nodes.call(null,tags_nodes);var tags_nodes__$2 = lt.plugins.kukui.save_tags.call(null,tags_nodes__$1);var new_nodes = cljs.core.mapcat.call(null,((function (nodes,nodes__$1,view_config,tags_nodes,tags_nodes__$1,tags_nodes__$2,map__13250,map__13250__$1,lines,query_tag,level){
return (function (tag){var temp__4126__auto__ = cljs.core.get.call(null,tags_nodes__$2,tag);if(cljs.core.truth_(temp__4126__auto__))
{var children = temp__4126__auto__;return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type-tag","type-tag",4631398905),true,new cljs.core.Keyword(null,"text","text",1017460895),(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,tag)))], null)], null),children);
} else
{return null;
}
});})(nodes,nodes__$1,view_config,tags_nodes,tags_nodes__$1,tags_nodes__$2,map__13250,map__13250__$1,lines,query_tag,level))
,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(view_config));var indented_nodes = lt.plugins.kukui.core.indent_nodes.call(null,new_nodes,lt.plugins.sacha.codemirror.line_indent.call(null,ed,lt.objs.editor.cursor.call(null,ed).line),lt.objs.editor.option.call(null,ed,"tabSize"),level);return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,"\n",indented_nodes))+"\n");
};
var __GT_view = function (ed,type_or_view,var_args){
var p__13248 = null;if (arguments.length > 2) {
  p__13248 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return __GT_view__delegate.call(this,ed,type_or_view,p__13248);};
__GT_view.cljs$lang$maxFixedArity = 2;
__GT_view.cljs$lang$applyTo = (function (arglist__13316){
var ed = cljs.core.first(arglist__13316);
arglist__13316 = cljs.core.next(arglist__13316);
var type_or_view = cljs.core.first(arglist__13316);
var p__13248 = cljs.core.rest(arglist__13316);
return __GT_view__delegate(ed,type_or_view,p__13248);
});
__GT_view.cljs$core$IFn$_invoke$arity$variadic = __GT_view__delegate;
return __GT_view;
})()
;
lt.plugins.kukui.type_selector = lt.plugins.kukui.selector.selector.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"items","items",1114430258),(function (){return cljs.core.map.call(null,(function (p1__13251_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"name","name",1017277949)],[cljs.core.name.call(null,p1__13251_SHARP_)]);
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
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.type-replace-children","kukui.type-replace-children",2704104452),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: replaces current children with new type view",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.kukui.type_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){return lt.plugins.kukui.replace_children.call(null,lt.objs.editor.pool.last_active.call(null),(function (p1__13252_SHARP_){return lt.plugins.kukui.__GT_view.call(null,p1__13252_SHARP_,cljs.core.keyword.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(type)));
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
var __GT_query_view__delegate = function (ed,query,p__13254){var map__13257 = p__13254;var map__13257__$1 = ((cljs.core.seq_QMARK_.call(null,map__13257))?cljs.core.apply.call(null,cljs.core.hash_map,map__13257):map__13257);var lines = cljs.core.get.call(null,map__13257__$1,new cljs.core.Keyword(null,"lines","lines",1116881521));var types_config = cljs.core.get.call(null,map__13257__$1,new cljs.core.Keyword(null,"types-config","types-config",4798725768));var view_fn = cljs.core.get.call(null,map__13257__$1,new cljs.core.Keyword(null,"view-fn","view-fn",1468084322),((function (map__13257,map__13257__$1,lines,types_config){
return (function (p1__13253_SHARP_){return lt.plugins.kukui.config.__GT_type_config.call(null,p1__13253_SHARP_,true);
});})(map__13257,map__13257__$1,lines,types_config))
);var level = cljs.core.get.call(null,map__13257__$1,new cljs.core.Keyword(null,"level","level",1116770038),1);var map__13258 = lt.plugins.kukui.core.text__GT_tag_group.call(null,types_config,query);var map__13258__$1 = ((cljs.core.seq_QMARK_.call(null,map__13258))?cljs.core.apply.call(null,cljs.core.hash_map,map__13258):map__13258);var tags = cljs.core.get.call(null,map__13258__$1,new cljs.core.Keyword(null,"tags","tags",1017456523));var parent_tag = cljs.core.get.call(null,map__13258__$1,new cljs.core.Keyword(null,"parent-tag","parent-tag",768068457));var view_config = view_fn.call(null,tags);return lt.plugins.kukui.__GT_view.call(null,ed,view_config,new cljs.core.Keyword(null,"level","level",1116770038),level,new cljs.core.Keyword(null,"query-tag","query-tag",3500842119),parent_tag,new cljs.core.Keyword(null,"lines","lines",1116881521),lines);
};
var __GT_query_view = function (ed,query,var_args){
var p__13254 = null;if (arguments.length > 2) {
  p__13254 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return __GT_query_view__delegate.call(this,ed,query,p__13254);};
__GT_query_view.cljs$lang$maxFixedArity = 2;
__GT_query_view.cljs$lang$applyTo = (function (arglist__13317){
var ed = cljs.core.first(arglist__13317);
arglist__13317 = cljs.core.next(arglist__13317);
var query = cljs.core.first(arglist__13317);
var p__13254 = cljs.core.rest(arglist__13317);
return __GT_query_view__delegate(ed,query,p__13254);
});
__GT_query_view.cljs$core$IFn$_invoke$arity$variadic = __GT_query_view__delegate;
return __GT_query_view;
})()
;
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.query-replace-children","kukui.query-replace-children",3544797768),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: replaces current children based on current node's query",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line);var new_body = lt.plugins.kukui.__GT_query_view.call(null,ed,lt.objs.editor.line.call(null,ed,line),new cljs.core.Keyword(null,"types-config","types-config",4798725768),lt.plugins.kukui.config.config,new cljs.core.Keyword(null,"view-fn","view-fn",1468084322),((function (ed,line,end_line){
return (function (p1__13259_SHARP_){return lt.plugins.kukui.config.__GT_type_config.call(null,p1__13259_SHARP_,null);
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
var toggle_all__3 = (function (ed,condition,lines){return lt.objs.editor.operation.call(null,ed,(function (){var seq__13264 = cljs.core.seq.call(null,lines);var chunk__13265 = null;var count__13266 = 0;var i__13267 = 0;while(true){
if((i__13267 < count__13266))
{var line = cljs.core._nth.call(null,chunk__13265,i__13267);if(cljs.core.truth_(condition.call(null,line)))
{lt.plugins.sacha.codemirror.fold_code.call(null,ed,{"ch": 0, "line": line},null);
} else
{}
{
var G__13318 = seq__13264;
var G__13319 = chunk__13265;
var G__13320 = count__13266;
var G__13321 = (i__13267 + 1);
seq__13264 = G__13318;
chunk__13265 = G__13319;
count__13266 = G__13320;
i__13267 = G__13321;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__13264);if(temp__4126__auto__)
{var seq__13264__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__13264__$1))
{var c__7182__auto__ = cljs.core.chunk_first.call(null,seq__13264__$1);{
var G__13322 = cljs.core.chunk_rest.call(null,seq__13264__$1);
var G__13323 = c__7182__auto__;
var G__13324 = cljs.core.count.call(null,c__7182__auto__);
var G__13325 = 0;
seq__13264 = G__13322;
chunk__13265 = G__13323;
count__13266 = G__13324;
i__13267 = G__13325;
continue;
}
} else
{var line = cljs.core.first.call(null,seq__13264__$1);if(cljs.core.truth_(condition.call(null,line)))
{lt.plugins.sacha.codemirror.fold_code.call(null,ed,{"ch": 0, "line": line},null);
} else
{}
{
var G__13326 = cljs.core.next.call(null,seq__13264__$1);
var G__13327 = null;
var G__13328 = 0;
var G__13329 = 0;
seq__13264 = G__13326;
chunk__13265 = G__13327;
count__13266 = G__13328;
i__13267 = G__13329;
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
return (function (p1__13268_SHARP_){return lt.plugins.kukui.add_tags_to_node.call(null,p1__13268_SHARP_,parent_tags);
});})(level,nodes,parent_tags))
,nodes);var indented_nodes = lt.plugins.kukui.core.indent_nodes.call(null,new_nodes,lt.plugins.sacha.codemirror.line_indent.call(null,ed,lt.objs.editor.cursor.call(null,ed).line),lt.objs.editor.option.call(null,ed,"tabSize"),level);return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,"\n",indented_nodes))+"\n");
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.stamp-children","kukui.stamp-children",3918722228),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: stamps current children with parent tags",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.kukui.replace_children.call(null,lt.objs.editor.pool.last_active.call(null),lt.plugins.kukui.stamp_nodes);
})], null));
lt.plugins.kukui.sibling_nodes = (function sibling_nodes(ed,line){var parent_lines = lt.plugins.kukui.util.find_parent_lines.call(null,ed,line);var current_indent = lt.plugins.sacha.codemirror.line_indent.call(null,ed,line);var sibling_lines = cljs.core.filter.call(null,((function (parent_lines,current_indent){
return (function (p1__13269_SHARP_){if(cljs.core._EQ_.call(null,current_indent,lt.plugins.sacha.codemirror.line_indent.call(null,ed,p1__13269_SHARP_)))
{return p1__13269_SHARP_;
} else
{return null;
}
});})(parent_lines,current_indent))
,parent_lines);return cljs.core.map.call(null,cljs.core.partial.call(null,lt.plugins.kukui.line__GT_node,ed),sibling_lines);
});
cljs.core._add_method.call(null,lt.plugins.kukui.config.save,new cljs.core.Keyword(null,"level-type","level-type",1174838101),(function (_,p__13271){var map__13272 = p__13271;var map__13272__$1 = ((cljs.core.seq_QMARK_.call(null,map__13272))?cljs.core.apply.call(null,cljs.core.hash_map,map__13272):map__13272);var value = cljs.core.get.call(null,map__13272__$1,new cljs.core.Keyword(null,"value","value",1125876963));var editor = cljs.core.get.call(null,map__13272__$1,new cljs.core.Keyword(null,"editor","editor",4001043679));var line = lt.objs.editor.cursor.call(null,editor).line;var siblings = cljs.core.mapcat.call(null,((function (line,map__13272,map__13272__$1,value,editor){
return (function (p1__13270_SHARP_){return lt.plugins.kukui.core.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(p1__13270_SHARP_));
});})(line,map__13272,map__13272__$1,value,editor))
,lt.plugins.kukui.sibling_nodes.call(null,editor,line));return lt.plugins.kukui.config.merge_config.call(null,new cljs.core.PersistentArrayMap.fromArray([cljs.core.keyword.call(null,value),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"names","names",1118489274),siblings], null)], true, false),new cljs.core.Keyword(null,"into-type","into-type",1739536889));
}));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.save-current-config","kukui.save-current-config",4327925503),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Saves config for the current line",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.kukui.config.save_current_config.call(null,lt.objs.editor.pool.last_active.call(null));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.toggle-descs","kukui.toggle-descs",4779010676),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Toggle visibility of descs of current children",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line);return lt.plugins.kukui.toggle_all.call(null,ed,((function (ed,line,end_line){
return (function (p1__13273_SHARP_){var and__6414__auto__ = cljs.core.not.call(null,lt.plugins.kukui.core.desc_node_QMARK_.call(null,lt.plugins.kukui.line__GT_node.call(null,ed,p1__13273_SHARP_)));if(and__6414__auto__)
{return lt.plugins.kukui.core.desc_node_QMARK_.call(null,lt.plugins.kukui.line__GT_node.call(null,ed,(p1__13273_SHARP_ + 1)));
} else
{return and__6414__auto__;
}
});})(ed,line,end_line))
,cljs.core.range.call(null,line,end_line));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.save-file-to-db","kukui.save-file-to-db",4478157288),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Saves types and entities of types to db",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var lines = cljs.core.range.call(null,lt.objs.editor.first_line.call(null,ed),(lt.objs.editor.last_line.call(null,ed) + 1));var nodes = lt.plugins.kukui.ed__GT_nodes.call(null,ed,lines);var type_records = cljs.core.map.call(null,((function (ed,lines,nodes){
return (function (p1__13274_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"type","type",1017479852)],[p1__13274_SHARP_,"type"]);
});})(ed,lines,nodes))
,cljs.core.distinct.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"type","type",1017479852),nodes)));var entity_records = cljs.core.mapcat.call(null,((function (ed,lines,nodes,type_records){
return (function (p__13277){var vec__13278 = p__13277;var type = cljs.core.nth.call(null,vec__13278,0,null);var count_map = cljs.core.nth.call(null,vec__13278,1,null);return cljs.core.map.call(null,((function (vec__13278,type,count_map,ed,lines,nodes,type_records){
return (function (p1__13275_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"type","type",1017479852)],[p1__13275_SHARP_,cljs.core.name.call(null,type)]);
});})(vec__13278,type,count_map,ed,lines,nodes,type_records))
,cljs.core.keep.call(null,cljs.core.identity,cljs.core.keys.call(null,count_map)));
});})(ed,lines,nodes,type_records))
,lt.plugins.kukui.types_counts.call(null,ed,lines));var entity_records__$1 = cljs.core.remove.call(null,((function (ed,lines,nodes,type_records,entity_records){
return (function (p1__13276_SHARP_){return (cljs.core._EQ_.call(null,"unknown",new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(p1__13276_SHARP_))) && (cljs.core.contains_QMARK_.call(null,cljs.core.set.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"name","name",1017277949),type_records)),new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__13276_SHARP_)));
});})(ed,lines,nodes,type_records,entity_records))
,entity_records);cljs.core.apply.call(null,lt.plugins.kukui.db.create_BANG_,type_records);
cljs.core.println.call(null,"Saving",cljs.core.count.call(null,type_records),"types");
cljs.core.prn.call(null,entity_records__$1);
cljs.core.apply.call(null,lt.plugins.kukui.db.create_BANG_,entity_records__$1);
return cljs.core.println.call(null,"Saving",cljs.core.count.call(null,entity_records__$1),"entities");
})], null));
}

//# sourceMappingURL=kukui_compiled.js.map