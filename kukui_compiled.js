if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.core')) {
goog.provide('lt.plugins.kukui.core');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('clojure.string');
lt.plugins.kukui.core.default_tag_char = "*";
lt.plugins.kukui.core.tag_prefix = "#";
lt.plugins.kukui.core.attr_delimiter = ":";
lt.plugins.kukui.core.name_attr = "name";
/**
* Regex for pulling out tags with tag-prefix. To escape having a tag parsed,
* put a backslash before it e.g. \#escaped
*/
lt.plugins.kukui.core.tag_pattern = (function (){var disallowed_chars = " \\t\\n,;\\*";return cljs.core.re_pattern.call(null,("(?:[^\\\\]|^)("+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+"[^"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(disallowed_chars)+"]+[^"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(disallowed_chars)+".:]|"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+"[^"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(disallowed_chars)+".:])"));
})();
lt.plugins.kukui.core.text__GT_tags = (function text__GT_tags(text){return cljs.core.map.call(null,(function (p1__8862_SHARP_){return cljs.core.subs.call(null,p1__8862_SHARP_,1);
}),cljs.core.map.call(null,cljs.core.second,cljs.core.re_seq.call(null,lt.plugins.kukui.core.tag_pattern,text)));
});
/**
* Expands a tag if it's a type
*/
lt.plugins.kukui.core.expand_tag = (function expand_tag(types,tag){if(cljs.core.contains_QMARK_.call(null,cljs.core.set.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"type","type",1017479852),types)),tag))
{return cljs.core.some.call(null,(function (p1__8863_SHARP_){if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(p1__8863_SHARP_),tag))
{return cljs.core.vec.call(null,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(p1__8863_SHARP_));
} else
{return null;
}
}),types);
} else
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag], null);
}
});
/**
* Used by query view and config to associate a parent tag (type) with its tags.
* To specify a default tag use an asterisk after a tag. For example:
* #type: tag1, tag2*
*/
lt.plugins.kukui.core.text__GT_tag_group = (function text__GT_tag_group(types,text){if(cljs.core.seq.call(null,text))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"seq","seq",-1640417768,null),new cljs.core.Symbol(null,"text","text",-1636974874,null)))))));
}
var vec__8869 = cljs.core.re_find.call(null,/^\s*(\S+:|)\s*(.*)$/,text);var _ = cljs.core.nth.call(null,vec__8869,0,null);var parent_tag = cljs.core.nth.call(null,vec__8869,1,null);var tags_string = cljs.core.nth.call(null,vec__8869,2,null);var parent_tag__$1 = ((cljs.core.seq.call(null,parent_tag))?cljs.core.first.call(null,lt.plugins.kukui.core.text__GT_tags.call(null,parent_tag)):null);var raw_tags = clojure.string.split.call(null,tags_string,/\s*,\s*/);var default_tag = (function (){var G__8870 = cljs.core.some.call(null,((function (vec__8869,_,parent_tag,tags_string,parent_tag__$1,raw_tags){
return (function (p1__8864_SHARP_){if(cljs.core._EQ_.call(null,lt.plugins.kukui.core.default_tag_char,cljs.core.subs.call(null,p1__8864_SHARP_,(cljs.core.count.call(null,p1__8864_SHARP_) - 1))))
{return p1__8864_SHARP_;
} else
{return null;
}
});})(vec__8869,_,parent_tag,tags_string,parent_tag__$1,raw_tags))
,raw_tags);var G__8870__$1 = (((G__8870 == null))?null:((function (G__8870,vec__8869,_,parent_tag,tags_string,parent_tag__$1,raw_tags){
return (function (p1__8865_SHARP_){return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.call(null,p1__8865_SHARP_,0,(cljs.core.count.call(null,p1__8865_SHARP_) - 1))));
});})(G__8870,vec__8869,_,parent_tag,tags_string,parent_tag__$1,raw_tags))
.call(null,G__8870));var G__8870__$2 = (((G__8870__$1 == null))?null:lt.plugins.kukui.core.text__GT_tags.call(null,G__8870__$1));var G__8870__$3 = (((G__8870__$2 == null))?null:cljs.core.first.call(null,G__8870__$2));return G__8870__$3;
})();var tags = lt.plugins.kukui.core.text__GT_tags.call(null,clojure.string.join.call(null," ",cljs.core.map.call(null,((function (vec__8869,_,parent_tag,tags_string,parent_tag__$1,raw_tags,default_tag){
return (function (p1__8866_SHARP_){return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__8866_SHARP_));
});})(vec__8869,_,parent_tag,tags_string,parent_tag__$1,raw_tags,default_tag))
,raw_tags)));var tags__$1 = cljs.core.mapcat.call(null,cljs.core.partial.call(null,lt.plugins.kukui.core.expand_tag,types),tags);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"parent-tag","parent-tag",768068457),parent_tag__$1,new cljs.core.Keyword(null,"tags","tags",1017456523),tags__$1,new cljs.core.Keyword(null,"default-tag","default-tag",575796608),default_tag], null);
});
lt.plugins.kukui.core.indent_node = (function indent_node(node,indent){return clojure.string.replace_first.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node),/^\s*/,cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,indent," ")));
});
lt.plugins.kukui.core.indent_nodes = (function indent_nodes(nodes,indent,tab_size,offset_level){var offset = (offset_level * tab_size);var tag_indent = (indent + offset);var node_indent = ((indent + offset) + tab_size);var desc_indent = (((indent + offset) + tab_size) + tab_size);return cljs.core.mapcat.call(null,((function (offset,tag_indent,node_indent,desc_indent){
return (function (p1__8871_SHARP_){if(cljs.core.truth_(new cljs.core.Keyword(null,"type-tag","type-tag",4631398905).cljs$core$IFn$_invoke$arity$1(p1__8871_SHARP_)))
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,tag_indent," ")))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(p1__8871_SHARP_)))], null);
} else
{return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.kukui.core.indent_node.call(null,p1__8871_SHARP_,node_indent)], null),cljs.core.map.call(null,((function (offset,tag_indent,node_indent,desc_indent){
return (function (x){return lt.plugins.kukui.core.indent_node.call(null,x,desc_indent);
});})(offset,tag_indent,node_indent,desc_indent))
,new cljs.core.Keyword(null,"desc","desc",1016984067).cljs$core$IFn$_invoke$arity$1(p1__8871_SHARP_)));
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
lt.plugins.kukui.core.add_node_with_parent_tags = (function add_node_with_parent_tags(nodes,curr,parent_tags){return lt.plugins.kukui.core.add_node_with_tags.call(null,nodes,curr,cljs.core.concat.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.filter.call(null,(function (p1__8872_SHARP_){return (new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(p1__8872_SHARP_) < new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
}),parent_tags)),lt.plugins.kukui.core.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr))));
});
lt.plugins.kukui.core.__GT_name_value = (function __GT_name_value(text){return cljs.core.second.call(null,cljs.core.re_find.call(null,cljs.core.re_pattern.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.name_attr)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.attr_delimiter)+"(\\S+)")),text));
});
lt.plugins.kukui.core.add_custom_attributes = (function add_custom_attributes(node){var vec__8878 = cljs.core.juxt.call(null,cljs.core.remove,cljs.core.filter).call(null,(function (p1__8873_SHARP_){return (p1__8873_SHARP_.indexOf(lt.plugins.kukui.core.attr_delimiter) > -1);
}),new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(node));var tags = cljs.core.nth.call(null,vec__8878,0,null);var attribute_tags = cljs.core.nth.call(null,vec__8878,1,null);return cljs.core.merge.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (vec__8878,tags,attribute_tags){
return (function (p__8879){var vec__8880 = p__8879;var k = cljs.core.nth.call(null,vec__8880,0,null);var v = cljs.core.nth.call(null,vec__8880,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,k),v], null);
});})(vec__8878,tags,attribute_tags))
,cljs.core.map.call(null,((function (vec__8878,tags,attribute_tags){
return (function (p1__8874_SHARP_){return clojure.string.split.call(null,p1__8874_SHARP_,cljs.core.re_pattern.call(null,lt.plugins.kukui.core.attr_delimiter));
});})(vec__8878,tags,attribute_tags))
,attribute_tags))),cljs.core.assoc.call(null,node,new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.set.call(null,tags)));
});
/**
* Adds :tags, :desc and custom attributes to nodes
*/
lt.plugins.kukui.core.add_attributes_to_nodes = (function add_attributes_to_nodes(nodes){return cljs.core.mapv.call(null,lt.plugins.kukui.core.add_custom_attributes,new cljs.core.Keyword(null,"nodes","nodes",1118897699).cljs$core$IFn$_invoke$arity$1(cljs.core.reduce.call(null,(function (accum,p__8887){var vec__8888 = p__8887;var curr = cljs.core.nth.call(null,vec__8888,0,null);var next = cljs.core.nth.call(null,vec__8888,1,null);if(cljs.core.truth_((function (){var and__6414__auto__ = lt.plugins.kukui.core.parent_node_QMARK_.call(null,curr,next);if(cljs.core.truth_(and__6414__auto__))
{return lt.plugins.kukui.core.__GT_name_value.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr));
} else
{return and__6414__auto__;
}
})()))
{return cljs.core.update_in.call(null,cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699)], null),((function (vec__8888,curr,next){
return (function (p1__8881_SHARP_){return lt.plugins.kukui.core.add_node_with_parent_tags.call(null,p1__8881_SHARP_,curr,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(accum));
});})(vec__8888,curr,next))
),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tags","tags",1017456523)], null),((function (vec__8888,curr,next){
return (function (p1__8882_SHARP_){return lt.plugins.kukui.core.add_node_with_tags.call(null,cljs.core.vec.call(null,cljs.core.remove.call(null,((function (vec__8888,curr,next){
return (function (tag){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(tag),new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
});})(vec__8888,curr,next))
,p1__8882_SHARP_)),curr,cljs.core._conj.call(null,cljs.core.List.EMPTY,lt.plugins.kukui.core.__GT_name_value.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr))));
});})(vec__8888,curr,next))
);
} else
{if(cljs.core.truth_(lt.plugins.kukui.core.parent_node_QMARK_.call(null,curr,next)))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tags","tags",1017456523)], null),((function (vec__8888,curr,next){
return (function (p1__8883_SHARP_){return lt.plugins.kukui.core.add_node_with_tags.call(null,cljs.core.vec.call(null,cljs.core.remove.call(null,((function (vec__8888,curr,next){
return (function (tag){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(tag),new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
});})(vec__8888,curr,next))
,p1__8883_SHARP_)),curr,lt.plugins.kukui.core.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr)));
});})(vec__8888,curr,next))
);
} else
{if(cljs.core.truth_(lt.plugins.kukui.core.desc_node_QMARK_.call(null,curr)))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699),(cljs.core.count.call(null,new cljs.core.Keyword(null,"nodes","nodes",1118897699).cljs$core$IFn$_invoke$arity$1(accum)) - 1),new cljs.core.Keyword(null,"desc","desc",1016984067)], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),curr);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699)], null),((function (vec__8888,curr,next){
return (function (p1__8884_SHARP_){return lt.plugins.kukui.core.add_node_with_parent_tags.call(null,p1__8884_SHARP_,curr,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(accum));
});})(vec__8888,curr,next))
);
} else
{return null;
}
}
}
}
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"nodes","nodes",1118897699),cljs.core.PersistentVector.EMPTY], null),cljs.core.partition.call(null,2,1,cljs.core.PersistentVector.EMPTY,nodes))));
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.node')) {
goog.provide('lt.plugins.kukui.node');
goog.require('cljs.core');
goog.require('lt.plugins.kukui.core');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor');
goog.require('lt.plugins.kukui.core');
goog.require('lt.plugins.sacha.codemirror');
goog.require('lt.plugins.sacha.codemirror');
lt.plugins.kukui.node.line__GT_node = (function line__GT_node(ed,line){return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),line,new cljs.core.Keyword(null,"indent","indent",4124632094),lt.plugins.sacha.codemirror.line_indent.call(null,ed,line),new cljs.core.Keyword(null,"text","text",1017460895),lt.objs.editor.line.call(null,ed,line)], null);
});
lt.plugins.kukui.node.ignore_tag = "ignore";
/**
* Returns nodes with :line, :indent, :text and :tags properties.
* Tags are picked up from parents and any words starting with '#'.
*/
lt.plugins.kukui.node.__GT_tagged_nodes = (function __GT_tagged_nodes(ed,lines){var nodes = lt.plugins.kukui.core.add_attributes_to_nodes.call(null,cljs.core.map.call(null,(function (p1__8938_SHARP_){return lt.plugins.kukui.node.line__GT_node.call(null,ed,p1__8938_SHARP_);
}),lines));return cljs.core.remove.call(null,((function (nodes){
return (function (p1__8939_SHARP_){return cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__8939_SHARP_),lt.plugins.kukui.node.ignore_tag);
});})(nodes))
,nodes);
});
lt.plugins.kukui.node.ed__GT_nodes = (function() {
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
})();return lt.plugins.kukui.node.__GT_tagged_nodes.call(null,ed,lines__$1);
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
}
if(!lt.util.load.provided_QMARK_('clojure.walk')) {
goog.provide('clojure.walk');
goog.require('cljs.core');
/**
* Traverses form, an arbitrary data structure.  inner and outer are
* functions.  Applies inner to each element of form, building up a
* data structure of the same type, then applies outer to the result.
* Recognizes all Clojure data structures. Consumes seqs as with doall.
*/
clojure.walk.walk = (function walk(inner,outer,form){if(cljs.core.seq_QMARK_.call(null,form))
{return outer.call(null,cljs.core.doall.call(null,cljs.core.map.call(null,inner,form)));
} else
{if(cljs.core.coll_QMARK_.call(null,form))
{return outer.call(null,cljs.core.into.call(null,cljs.core.empty.call(null,form),cljs.core.map.call(null,inner,form)));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return outer.call(null,form);
} else
{return null;
}
}
}
});
/**
* Performs a depth-first, post-order traversal of form.  Calls f on
* each sub-form, uses f's return value in place of the original.
* Recognizes all Clojure data structures. Consumes seqs as with doall.
*/
clojure.walk.postwalk = (function postwalk(f,form){return clojure.walk.walk.call(null,cljs.core.partial.call(null,postwalk,f),f,form);
});
/**
* Like postwalk, but does pre-order traversal.
*/
clojure.walk.prewalk = (function prewalk(f,form){return clojure.walk.walk.call(null,cljs.core.partial.call(null,prewalk,f),cljs.core.identity,f.call(null,form));
});
/**
* Recursively transforms all map keys from strings to keywords.
*/
clojure.walk.keywordize_keys = (function keywordize_keys(m){var f = (function (p__8844){var vec__8845 = p__8844;var k = cljs.core.nth.call(null,vec__8845,0,null);var v = cljs.core.nth.call(null,vec__8845,1,null);if(typeof k === 'string')
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,k),v], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null);
}
});return clojure.walk.postwalk.call(null,((function (f){
return (function (x){if(cljs.core.map_QMARK_.call(null,x))
{return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,f,x));
} else
{return x;
}
});})(f))
,m);
});
/**
* Recursively transforms all map keys from keywords to strings.
*/
clojure.walk.stringify_keys = (function stringify_keys(m){var f = (function (p__8848){var vec__8849 = p__8848;var k = cljs.core.nth.call(null,vec__8849,0,null);var v = cljs.core.nth.call(null,vec__8849,1,null);if((k instanceof cljs.core.Keyword))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.name.call(null,k),v], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null);
}
});return clojure.walk.postwalk.call(null,((function (f){
return (function (x){if(cljs.core.map_QMARK_.call(null,x))
{return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,f,x));
} else
{return x;
}
});})(f))
,m);
});
/**
* Recursively transforms form by replacing keys in smap with their
* values.  Like clojure/replace but works on any data structure.  Does
* replacement at the root of the tree first.
*/
clojure.walk.prewalk_replace = (function prewalk_replace(smap,form){return clojure.walk.prewalk.call(null,(function (x){if(cljs.core.contains_QMARK_.call(null,smap,x))
{return smap.call(null,x);
} else
{return x;
}
}),form);
});
/**
* Recursively transforms form by replacing keys in smap with their
* values.  Like clojure/replace but works on any data structure.  Does
* replacement at the leaves of the tree first.
*/
clojure.walk.postwalk_replace = (function postwalk_replace(smap,form){return clojure.walk.postwalk.call(null,(function (x){if(cljs.core.contains_QMARK_.call(null,smap,x))
{return smap.call(null,x);
} else
{return x;
}
}),form);
});
}
if(!lt.util.load.provided_QMARK_('datascript.btset')) {
goog.provide('datascript.btset');
goog.require('cljs.core');
datascript.btset.min_len = 64;
datascript.btset.max_len = 128;
datascript.btset.level_shift = (cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__8780_SHARP_){return ((datascript.btset.max_len & (1 << p1__8780_SHARP_)) != 0);
}),cljs.core.range.call(null,31,-1,-1))) + 1);
datascript.btset.path_mask = ((1 << datascript.btset.level_shift) - 1);
datascript.btset.empty_path = 0;
datascript.btset.path_get = (function path_get(path,level){return (datascript.btset.path_mask & (path >>> level));
});
datascript.btset.path_set = (function path_set(path,level,idx){return (path | (idx << level));
});
datascript.btset.eq = (function eq(a,b){return (0 === datascript.btset._STAR_cmp_STAR_.call(null,a,b));
});
datascript.btset.half = (function half(x){return (x >>> 1);
});
datascript.btset.binary_search_l = (function binary_search_l(arr,l,r,k){while(true){
if((l <= r))
{var m = datascript.btset.half.call(null,(l + r));var mk = (arr[m]);var cmp = datascript.btset._STAR_cmp_STAR_.call(null,mk,k);if((cmp < 0))
{{
var G__8800 = arr;
var G__8801 = (m + 1);
var G__8802 = r;
var G__8803 = k;
arr = G__8800;
l = G__8801;
r = G__8802;
k = G__8803;
continue;
}
} else
{{
var G__8804 = arr;
var G__8805 = l;
var G__8806 = (m - 1);
var G__8807 = k;
arr = G__8804;
l = G__8805;
r = G__8806;
k = G__8807;
continue;
}
}
} else
{return l;
}
break;
}
});
datascript.btset.binary_search_r = (function binary_search_r(arr,l,r,k){while(true){
if((l <= r))
{var m = datascript.btset.half.call(null,(l + r));var mk = (arr[m]);var cmp = datascript.btset._STAR_cmp_STAR_.call(null,mk,k);if((cmp > 0))
{{
var G__8808 = arr;
var G__8809 = l;
var G__8810 = (m - 1);
var G__8811 = k;
arr = G__8808;
l = G__8809;
r = G__8810;
k = G__8811;
continue;
}
} else
{{
var G__8812 = arr;
var G__8813 = (m + 1);
var G__8814 = r;
var G__8815 = k;
arr = G__8812;
l = G__8813;
r = G__8814;
k = G__8815;
continue;
}
}
} else
{return l;
}
break;
}
});
datascript.btset.lookup_exact = (function lookup_exact(arr,key){var arr_l = arr.length;var idx = datascript.btset.binary_search_l.call(null,arr,0,(arr_l - 1),key);if(((idx < arr_l)) && (datascript.btset.eq.call(null,(arr[idx]),key)))
{return idx;
} else
{return -1;
}
});
datascript.btset.lookup_range = (function lookup_range(arr,key){var arr_l = arr.length;var idx = datascript.btset.binary_search_l.call(null,arr,0,(arr_l - 1),key);if((idx === arr_l))
{return -1;
} else
{return idx;
}
});
datascript.btset.cut_n_splice = (function cut_n_splice(arr,cut_from,cut_to,splice_from,splice_to,xs){var arr_l = arr.length;var xs_l = xs.length;var l1 = (splice_from - cut_from);var l2 = (cut_to - splice_to);var l1xs = (l1 + xs_l);var new_arr = (new Array(((l1 + xs_l) + l2)));var n__7282__auto___8816 = l1;var i_8817 = 0;while(true){
if((i_8817 < n__7282__auto___8816))
{(new_arr[i_8817] = (arr[(cut_from + i_8817)]));
{
var G__8818 = (i_8817 + 1);
i_8817 = G__8818;
continue;
}
} else
{}
break;
}
var n__7282__auto___8819 = xs_l;var i_8820 = 0;while(true){
if((i_8820 < n__7282__auto___8819))
{(new_arr[(i_8820 + l1)] = (xs[i_8820]));
{
var G__8821 = (i_8820 + 1);
i_8820 = G__8821;
continue;
}
} else
{}
break;
}
var n__7282__auto___8822 = l2;var i_8823 = 0;while(true){
if((i_8823 < n__7282__auto___8822))
{(new_arr[(i_8823 + l1xs)] = (arr[(splice_to + i_8823)]));
{
var G__8824 = (i_8823 + 1);
i_8823 = G__8824;
continue;
}
} else
{}
break;
}
return new_arr;
});
datascript.btset.cut = (function() {
var cut = null;
var cut__2 = (function (arr,cut_from){return arr.slice(cut_from);
});
var cut__3 = (function (arr,cut_from,cut_to){return arr.slice(cut_from,cut_to);
});
cut = function(arr,cut_from,cut_to){
switch(arguments.length){
case 2:
return cut__2.call(this,arr,cut_from);
case 3:
return cut__3.call(this,arr,cut_from,cut_to);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cut.cljs$core$IFn$_invoke$arity$2 = cut__2;
cut.cljs$core$IFn$_invoke$arity$3 = cut__3;
return cut;
})()
;
datascript.btset.splice = (function splice(arr,splice_from,splice_to,xs){return datascript.btset.cut_n_splice.call(null,arr,0,arr.length,splice_from,splice_to,xs);
});
datascript.btset.insert = (function insert(arr,idx,xs){return datascript.btset.cut_n_splice.call(null,arr,0,arr.length,idx,idx,xs);
});
datascript.btset.merge_n_split = (function merge_n_split(a1,a2){var a1_l = a1.length;var a2_l = a2.length;var total_l = (a1_l + a2_l);var r1_l = datascript.btset.half.call(null,total_l);var r2_l = (total_l - r1_l);var r1 = (new Array(r1_l));var r2 = (new Array(r2_l));var n__7282__auto___8825 = total_l;var i_8826 = 0;while(true){
if((i_8826 < n__7282__auto___8825))
{((((i_8826 < r1_l))?r1:r2)[(((i_8826 < r1_l))?i_8826:(i_8826 - r1_l))] = ((((i_8826 < a1_l))?a1:a2)[(((i_8826 < a1_l))?i_8826:(i_8826 - a1_l))]));
{
var G__8827 = (i_8826 + 1);
i_8826 = G__8827;
continue;
}
} else
{}
break;
}
return [r1,r2];
});
datascript.btset.eq_arr = (function eq_arr(a1,a1_from,a1_to,a2,a2_from,a2_to,cmp){var len = (a1_to - a1_from);var and__6414__auto__ = (len === (a2_to - a2_from));if(and__6414__auto__)
{var i = 0;while(true){
if((i === len))
{return true;
} else
{if(cljs.core.not.call(null,cmp.call(null,(a1[(i + a1_from)]),(a2[(i + a2_from)]))))
{return false;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{{
var G__8828 = (i + 1);
i = G__8828;
continue;
}
} else
{return null;
}
}
}
break;
}
} else
{return and__6414__auto__;
}
});
datascript.btset.check_n_splice = (function check_n_splice(arr,from,to,new_arr){if(datascript.btset.eq_arr.call(null,arr,from,to,new_arr,0,new_arr.length,datascript.btset.eq))
{return arr;
} else
{return datascript.btset.splice.call(null,arr,from,to,new_arr);
}
});
datascript.btset.lim_key = (function lim_key(node){return (node.keys[(node.keys.length - 1)]);
});
/**
* Drop non-nil references and return array of arguments
*/
datascript.btset.return_array = (function() {
var return_array = null;
var return_array__1 = (function (a1){return [a1];
});
var return_array__2 = (function (a1,a2){if(cljs.core.truth_(a1))
{if(cljs.core.truth_(a2))
{return [a1,a2];
} else
{return [a1];
}
} else
{return [a2];
}
});
var return_array__3 = (function (a1,a2,a3){if(cljs.core.truth_(a1))
{if(cljs.core.truth_(a2))
{if(cljs.core.truth_(a3))
{return [a1,a2,a3];
} else
{return [a1,a2];
}
} else
{if(cljs.core.truth_(a3))
{return [a1,a3];
} else
{return [a1];
}
}
} else
{if(cljs.core.truth_(a2))
{if(cljs.core.truth_(a3))
{return [a2,a3];
} else
{return [a2];
}
} else
{return [a3];
}
}
});
return_array = function(a1,a2,a3){
switch(arguments.length){
case 1:
return return_array__1.call(this,a1);
case 2:
return return_array__2.call(this,a1,a2);
case 3:
return return_array__3.call(this,a1,a2,a3);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return_array.cljs$core$IFn$_invoke$arity$1 = return_array__1;
return_array.cljs$core$IFn$_invoke$arity$2 = return_array__2;
return_array.cljs$core$IFn$_invoke$arity$3 = return_array__3;
return return_array;
})()
;
datascript.btset.rotate = (function rotate(node,root_QMARK_,left,right){if(cljs.core.truth_(root_QMARK_))
{return datascript.btset.return_array.call(null,node);
} else
{if((node.len() > datascript.btset.min_len))
{return datascript.btset.return_array.call(null,left,node,right);
} else
{if(cljs.core.truth_((function (){var and__6414__auto__ = left;if(cljs.core.truth_(and__6414__auto__))
{return (left.len() <= datascript.btset.min_len);
} else
{return and__6414__auto__;
}
})()))
{return datascript.btset.return_array.call(null,left.merge(node),right);
} else
{if(cljs.core.truth_((function (){var and__6414__auto__ = right;if(cljs.core.truth_(and__6414__auto__))
{return (right.len() <= datascript.btset.min_len);
} else
{return and__6414__auto__;
}
})()))
{return datascript.btset.return_array.call(null,left,node.merge(right));
} else
{if(cljs.core.truth_((function (){var and__6414__auto__ = left;if(cljs.core.truth_(and__6414__auto__))
{return ((right == null)) || ((left.len() < right.len()));
} else
{return and__6414__auto__;
}
})()))
{var nodes = left.merge_n_split(node);return datascript.btset.return_array.call(null,(nodes[0]),(nodes[1]),right);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{var nodes = node.merge_n_split(right);return datascript.btset.return_array.call(null,left,(nodes[0]),(nodes[1]));
} else
{return null;
}
}
}
}
}
}
});

/**
* @constructor
*/
datascript.btset.Node = (function (keys,pointers){
this.keys = keys;
this.pointers = pointers;
})
datascript.btset.Node.cljs$lang$type = true;
datascript.btset.Node.cljs$lang$ctorStr = "datascript.btset/Node";
datascript.btset.Node.cljs$lang$ctorPrWriter = (function (this__6993__auto__,writer__6994__auto__,opt__6995__auto__){return cljs.core._write.call(null,writer__6994__auto__,"datascript.btset/Node");
});
datascript.btset.Node.prototype.len = (function (){var self__ = this;
var _ = this;return self__.keys.length;
});
datascript.btset.Node.prototype.merge = (function (next){var self__ = this;
var _ = this;return (new datascript.btset.Node(self__.keys.concat(next.keys),self__.pointers.concat(next.pointers)));
});
datascript.btset.Node.prototype.merge_n_split = (function (next){var self__ = this;
var _ = this;var ks = datascript.btset.merge_n_split.call(null,self__.keys,next.keys);var ps = datascript.btset.merge_n_split.call(null,self__.pointers,next.pointers);return datascript.btset.return_array.call(null,(new datascript.btset.Node((ks[0]),(ps[0]))),(new datascript.btset.Node((ks[1]),(ps[1]))));
});
datascript.btset.Node.prototype.lookup = (function (key){var self__ = this;
var _ = this;var idx = datascript.btset.lookup_range.call(null,self__.keys,key);if((-1 === idx))
{return null;
} else
{return (self__.pointers[idx]).lookup(key);
}
});
datascript.btset.Node.prototype.conj = (function (key){var self__ = this;
var this$ = this;var idx = datascript.btset.binary_search_l.call(null,self__.keys,0,(self__.keys.length - 2),key);var nodes = (self__.pointers[idx]).conj(key);if(cljs.core.truth_(nodes))
{var new_keys = datascript.btset.check_n_splice.call(null,self__.keys,idx,(idx + 1),nodes.map(datascript.btset.lim_key));var new_pointers = datascript.btset.splice.call(null,self__.pointers,idx,(idx + 1),nodes);if((new_pointers.length <= datascript.btset.max_len))
{return [(new datascript.btset.Node(new_keys,new_pointers))];
} else
{var middle = datascript.btset.half.call(null,new_pointers.length);return [(new datascript.btset.Node(datascript.btset.cut.call(null,new_keys,0,middle),datascript.btset.cut.call(null,new_pointers,0,middle))),(new datascript.btset.Node(datascript.btset.cut.call(null,new_keys,middle),datascript.btset.cut.call(null,new_pointers,middle)))];
}
} else
{return null;
}
});
datascript.btset.Node.prototype.disj = (function (key,root_QMARK_,left,right){var self__ = this;
var this$ = this;var idx = datascript.btset.lookup_range.call(null,self__.keys,key);if((-1 === idx))
{return null;
} else
{var child = (self__.pointers[idx]);var left_child = ((((idx - 1) >= 0))?(self__.pointers[(idx - 1)]):null);var right_child = ((((idx + 1) < self__.pointers.length))?(self__.pointers[(idx + 1)]):null);var disjned = child.disj(key,false,left_child,right_child);if(cljs.core.truth_(disjned))
{var left_idx = (cljs.core.truth_(left_child)?(idx - 1):idx);var right_idx = (cljs.core.truth_(right_child)?(2 + idx):(1 + idx));var new_keys = datascript.btset.check_n_splice.call(null,self__.keys,left_idx,right_idx,disjned.map(datascript.btset.lim_key));var new_pointers = datascript.btset.splice.call(null,self__.pointers,left_idx,right_idx,disjned);return datascript.btset.rotate.call(null,(new datascript.btset.Node(new_keys,new_pointers)),root_QMARK_,left,right);
} else
{return null;
}
}
});
datascript.btset.__GT_Node = (function __GT_Node(keys,pointers){return (new datascript.btset.Node(keys,pointers));
});

/**
* @constructor
*/
datascript.btset.LeafNode = (function (keys){
this.keys = keys;
})
datascript.btset.LeafNode.cljs$lang$type = true;
datascript.btset.LeafNode.cljs$lang$ctorStr = "datascript.btset/LeafNode";
datascript.btset.LeafNode.cljs$lang$ctorPrWriter = (function (this__6993__auto__,writer__6994__auto__,opt__6995__auto__){return cljs.core._write.call(null,writer__6994__auto__,"datascript.btset/LeafNode");
});
datascript.btset.LeafNode.prototype.toString = (function (){var self__ = this;
var _ = this;return cljs.core.pr_str_STAR_.call(null,cljs.core.vec.call(null,self__.keys));
});
datascript.btset.LeafNode.prototype.len = (function (){var self__ = this;
var _ = this;return self__.keys.length;
});
datascript.btset.LeafNode.prototype.merge = (function (next){var self__ = this;
var _ = this;return (new datascript.btset.LeafNode(self__.keys.concat(next.keys)));
});
datascript.btset.LeafNode.prototype.merge_n_split = (function (next){var self__ = this;
var _ = this;var ks = datascript.btset.merge_n_split.call(null,self__.keys,next.keys);return datascript.btset.return_array.call(null,(new datascript.btset.LeafNode((ks[0]))),(new datascript.btset.LeafNode((ks[1]))));
});
datascript.btset.LeafNode.prototype.lookup = (function (key){var self__ = this;
var _ = this;var idx = datascript.btset.lookup_exact.call(null,self__.keys,key);if((-1 === idx))
{return null;
} else
{return (self__.keys[idx]);
}
});
datascript.btset.LeafNode.prototype.conj = (function (key){var self__ = this;
var this$ = this;var idx = datascript.btset.binary_search_l.call(null,self__.keys,0,(self__.keys.length - 1),key);var keys_l = self__.keys.length;if(((idx < keys_l)) && (datascript.btset.eq.call(null,key,(self__.keys[idx]))))
{return null;
} else
{if((keys_l === datascript.btset.max_len))
{var middle = datascript.btset.half.call(null,(keys_l + 1));if((idx > middle))
{return [(new datascript.btset.LeafNode(datascript.btset.cut.call(null,self__.keys,0,middle))),(new datascript.btset.LeafNode(datascript.btset.cut_n_splice.call(null,self__.keys,middle,keys_l,idx,idx,[key])))];
} else
{return [(new datascript.btset.LeafNode(datascript.btset.cut_n_splice.call(null,self__.keys,0,middle,idx,idx,[key]))),(new datascript.btset.LeafNode(datascript.btset.cut.call(null,self__.keys,middle,keys_l)))];
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return [(new datascript.btset.LeafNode(datascript.btset.splice.call(null,self__.keys,idx,idx,[key])))];
} else
{return null;
}
}
}
});
datascript.btset.LeafNode.prototype.disj = (function (key,root_QMARK_,left,right){var self__ = this;
var this$ = this;var idx = datascript.btset.lookup_exact.call(null,self__.keys,key);if((-1 === idx))
{return null;
} else
{var new_keys = datascript.btset.splice.call(null,self__.keys,idx,(idx + 1),[]);return datascript.btset.rotate.call(null,(new datascript.btset.LeafNode(new_keys)),root_QMARK_,left,right);
}
});
datascript.btset.__GT_LeafNode = (function __GT_LeafNode(keys){return (new datascript.btset.LeafNode(keys));
});
datascript.btset.keys_for = (function keys_for(set,path){var level = set.shift;var node = set.root;while(true){
if((level > 0))
{{
var G__8829 = (level - datascript.btset.level_shift);
var G__8830 = (node.pointers[datascript.btset.path_get.call(null,path,level)]);
level = G__8829;
node = G__8830;
continue;
}
} else
{return node.keys;
}
break;
}
});
datascript.btset.btset_conj = (function btset_conj(set,key){var _STAR_cmp_STAR_8782 = datascript.btset._STAR_cmp_STAR_;try{datascript.btset._STAR_cmp_STAR_ = set.comparator;
var roots = set.root.conj(key);if((roots == null))
{return set;
} else
{if((roots.length === 1))
{return datascript.btset.alter_btset.call(null,set,(roots[0]),set.shift,(set.cnt + 1));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return datascript.btset.alter_btset.call(null,set,(new datascript.btset.Node(roots.map(datascript.btset.lim_key),roots)),(set.shift + datascript.btset.level_shift),(set.cnt + 1));
} else
{return null;
}
}
}
}finally {datascript.btset._STAR_cmp_STAR_ = _STAR_cmp_STAR_8782;
}});
datascript.btset.btset_disj = (function btset_disj(set,key){var _STAR_cmp_STAR_8784 = datascript.btset._STAR_cmp_STAR_;try{datascript.btset._STAR_cmp_STAR_ = set.comparator;
var new_roots = set.root.disj(key,true,null,null);if((new_roots == null))
{return set;
} else
{var new_root = (new_roots[0]);if(((new_root instanceof datascript.btset.Node)) && ((new_root.pointers.length === 1)))
{return datascript.btset.alter_btset.call(null,set,(new_root.pointers[0]),(set.shift - datascript.btset.level_shift),(set.cnt - 1));
} else
{return datascript.btset.alter_btset.call(null,set,new_root,set.shift,(set.cnt - 1));
}
}
}finally {datascript.btset._STAR_cmp_STAR_ = _STAR_cmp_STAR_8784;
}});
datascript.btset._next_path = (function _next_path(node,path,level){var idx = datascript.btset.path_get.call(null,path,level);if((level > 0))
{var sub_path = _next_path.call(null,(node.pointers[idx]),path,(level - datascript.btset.level_shift));if((-1 === sub_path))
{if(((idx + 1) < node.pointers.length))
{return datascript.btset.path_set.call(null,datascript.btset.empty_path,level,(idx + 1));
} else
{return -1;
}
} else
{return datascript.btset.path_set.call(null,sub_path,level,idx);
}
} else
{if(((idx + 1) < node.keys.length))
{return datascript.btset.path_set.call(null,datascript.btset.empty_path,0,(idx + 1));
} else
{return -1;
}
}
});
datascript.btset.next_path = (function next_path(set,path){return datascript.btset._next_path.call(null,set.root,path,set.shift);
});

/**
* @constructor
*/
datascript.btset.BTSetIter = (function (set,path,till_path,keys,idx){
this.set = set;
this.path = path;
this.till_path = till_path;
this.keys = keys;
this.idx = idx;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 8388800;
})
datascript.btset.BTSetIter.cljs$lang$type = true;
datascript.btset.BTSetIter.cljs$lang$ctorStr = "datascript.btset/BTSetIter";
datascript.btset.BTSetIter.cljs$lang$ctorPrWriter = (function (this__6993__auto__,writer__6994__auto__,opt__6995__auto__){return cljs.core._write.call(null,writer__6994__auto__,"datascript.btset/BTSetIter");
});
datascript.btset.BTSetIter.prototype.cljs$core$INext$_next$arity$1 = (function (_){var self__ = this;
var ___$1 = this;if(((self__.idx + 1) < self__.keys.length))
{if(((self__.path + 1) < self__.till_path))
{return (new datascript.btset.BTSetIter(self__.set,(self__.path + 1),self__.till_path,self__.keys,(self__.idx + 1)));
} else
{return null;
}
} else
{var path__$1 = datascript.btset.next_path.call(null,self__.set,self__.path);if((cljs.core.not_EQ_.call(null,-1,path__$1)) && ((path__$1 < self__.till_path)))
{return (new datascript.btset.BTSetIter(self__.set,path__$1,self__.till_path,datascript.btset.keys_for.call(null,self__.set,path__$1),datascript.btset.path_get.call(null,path__$1,0)));
} else
{return null;
}
}
});
datascript.btset.BTSetIter.prototype.cljs$core$ISeq$_first$arity$1 = (function (_){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.keys))
{return (self__.keys[self__.idx]);
} else
{return null;
}
});
datascript.btset.BTSetIter.prototype.cljs$core$ISeq$_rest$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var temp__4124__auto__ = cljs.core._next.call(null,this$__$1);if(cljs.core.truth_(temp__4124__auto__))
{var next = temp__4124__auto__;return next;
} else
{return (new datascript.btset.BTSetIter(self__.set,-1,self__.till_path,null,-1));
}
});
datascript.btset.BTSetIter.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;if(cljs.core.truth_(self__.keys))
{return this$__$1;
} else
{return null;
}
});
datascript.btset.__GT_BTSetIter = (function __GT_BTSetIter(set,path,till_path,keys,idx){return (new datascript.btset.BTSetIter(set,path,till_path,keys,idx));
});
datascript.btset.btset_iter = (function btset_iter(set){var root_l = set.root.keys.length;if((root_l > 0))
{return (new datascript.btset.BTSetIter(set,datascript.btset.empty_path,datascript.btset.path_set.call(null,datascript.btset.empty_path,set.shift,root_l),datascript.btset.keys_for.call(null,set,datascript.btset.empty_path),0));
} else
{return null;
}
});
datascript.btset._seek = (function _seek(set,key){var node = set.root;var path = datascript.btset.empty_path;var level = set.shift;while(true){
var keys = node.keys;var keys_l = keys.length;if((0 === level))
{var idx = datascript.btset.binary_search_l.call(null,keys,0,(keys_l - 1),key);if((keys_l === idx))
{return -1;
} else
{return datascript.btset.path_set.call(null,path,0,idx);
}
} else
{var idx = datascript.btset.binary_search_l.call(null,keys,0,(keys_l - 2),key);{
var G__8831 = (node.pointers[idx]);
var G__8832 = datascript.btset.path_set.call(null,path,level,idx);
var G__8833 = (level - datascript.btset.level_shift);
node = G__8831;
path = G__8832;
level = G__8833;
continue;
}
}
break;
}
});
datascript.btset._rseek = (function _rseek(set,key){var node = set.root;var path = datascript.btset.empty_path;var level = set.shift;while(true){
var keys = node.keys;var keys_l = keys.length;if((0 === level))
{var idx = datascript.btset.binary_search_r.call(null,keys,0,(keys_l - 1),key);return datascript.btset.path_set.call(null,path,0,idx);
} else
{var idx = datascript.btset.binary_search_r.call(null,keys,0,(keys_l - 2),key);{
var G__8834 = (node.pointers[idx]);
var G__8835 = datascript.btset.path_set.call(null,path,level,idx);
var G__8836 = (level - datascript.btset.level_shift);
node = G__8834;
path = G__8835;
level = G__8836;
continue;
}
}
break;
}
});
datascript.btset._slice = (function _slice(set,key_from,key_to){var path = datascript.btset._seek.call(null,set,key_from);if((path < 0))
{return null;
} else
{var till_path = datascript.btset._rseek.call(null,set,key_to);if((till_path > path))
{return (new datascript.btset.BTSetIter(set,path,till_path,datascript.btset.keys_for.call(null,set,path),datascript.btset.path_get.call(null,path,0)));
} else
{return null;
}
}
});
datascript.btset.slice = (function() {
var slice = null;
var slice__2 = (function (set,key){return slice.call(null,set,key,key);
});
var slice__3 = (function (set,key_from,key_to){var _STAR_cmp_STAR_8786 = datascript.btset._STAR_cmp_STAR_;try{datascript.btset._STAR_cmp_STAR_ = set.comparator;
return datascript.btset._slice.call(null,set,key_from,key_to);
}finally {datascript.btset._STAR_cmp_STAR_ = _STAR_cmp_STAR_8786;
}});
slice = function(set,key_from,key_to){
switch(arguments.length){
case 2:
return slice__2.call(this,set,key_from);
case 3:
return slice__3.call(this,set,key_from,key_to);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
slice.cljs$core$IFn$_invoke$arity$2 = slice__2;
slice.cljs$core$IFn$_invoke$arity$3 = slice__3;
return slice;
})()
;

/**
* @constructor
*/
datascript.btset.BTSet = (function (root,shift,cnt,comparator,meta,__hash){
this.root = root;
this.shift = shift;
this.cnt = cnt;
this.comparator = comparator;
this.meta = meta;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2162561295;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
datascript.btset.BTSet.cljs$lang$type = true;
datascript.btset.BTSet.cljs$lang$ctorStr = "datascript.btset/BTSet";
datascript.btset.BTSet.cljs$lang$ctorPrWriter = (function (this__6993__auto__,writer__6994__auto__,opt__6995__auto__){return cljs.core._write.call(null,writer__6994__auto__,"datascript.btset/BTSet");
});
datascript.btset.BTSet.prototype.toString = (function (){var self__ = this;
var this$ = this;return cljs.core.pr_str_STAR_.call(null,this$);
});
datascript.btset.BTSet.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (set,k){var self__ = this;
var set__$1 = this;return cljs.core._lookup.call(null,set__$1,k,null);
});
datascript.btset.BTSet.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (_,k,not_found){var self__ = this;
var ___$1 = this;var _STAR_cmp_STAR_8789 = datascript.btset._STAR_cmp_STAR_;try{datascript.btset._STAR_cmp_STAR_ = self__.comparator;
var or__6426__auto__ = self__.root.lookup(k);if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return not_found;
}
}finally {datascript.btset._STAR_cmp_STAR_ = _STAR_cmp_STAR_8789;
}});
datascript.btset.BTSet.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this$,writer,opts){var self__ = this;
var this$__$1 = this;return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"#{"," ","}",opts,cljs.core.seq.call(null,this$__$1));
});
datascript.btset.BTSet.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.meta;
});
datascript.btset.BTSet.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return (new datascript.btset.BTSet(self__.root,self__.shift,self__.cnt,self__.comparator,self__.meta,self__.__hash));
});
datascript.btset.BTSet.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.cnt;
});
datascript.btset.BTSet.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){var self__ = this;
var coll__$1 = this;var h__6837__auto__ = self__.__hash;if(!((h__6837__auto__ == null)))
{return h__6837__auto__;
} else
{var h__6837__auto____$1 = cljs.core.hash_iset.call(null,coll__$1);self__.__hash = h__6837__auto____$1;
return h__6837__auto____$1;
}
});
datascript.btset.BTSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){var self__ = this;
var this$__$1 = this;return (cljs.core.set_QMARK_.call(null,other)) && ((self__.cnt === cljs.core.count.call(null,other))) && (cljs.core.every_QMARK_.call(null,((function (this$__$1){
return (function (p1__8787_SHARP_){return cljs.core.contains_QMARK_.call(null,this$__$1,p1__8787_SHARP_);
});})(this$__$1))
,other));
});
datascript.btset.BTSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return (new datascript.btset.BTSet((new datascript.btset.LeafNode([])),0,0,self__.comparator,self__.meta,0));
});
datascript.btset.BTSet.prototype.cljs$core$ISet$_disjoin$arity$2 = (function (set,key){var self__ = this;
var set__$1 = this;return datascript.btset.btset_disj.call(null,set__$1,key);
});
datascript.btset.BTSet.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return datascript.btset.btset_iter.call(null,this$__$1);
});
datascript.btset.BTSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_,new_meta){var self__ = this;
var ___$1 = this;return (new datascript.btset.BTSet(self__.root,self__.shift,self__.cnt,self__.comparator,new_meta,self__.__hash));
});
datascript.btset.BTSet.prototype.cljs$core$ICollection$_conj$arity$2 = (function (set,key){var self__ = this;
var set__$1 = this;return datascript.btset.btset_conj.call(null,set__$1,key);
});
datascript.btset.BTSet.prototype.call = (function() {
var G__8837 = null;
var G__8837__2 = (function (self__,k){var self__ = this;
var self____$1 = this;var coll = self____$1;return coll.cljs$core$ILookup$_lookup$arity$2(null,k);
});
var G__8837__3 = (function (self__,k,not_found){var self__ = this;
var self____$1 = this;var coll = self____$1;return coll.cljs$core$ILookup$_lookup$arity$3(null,k,not_found);
});
G__8837 = function(self__,k,not_found){
switch(arguments.length){
case 2:
return G__8837__2.call(this,self__,k);
case 3:
return G__8837__3.call(this,self__,k,not_found);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__8837;
})()
;
datascript.btset.BTSet.prototype.apply = (function (self__,args8788){var self__ = this;
var self____$1 = this;return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args8788)));
});
datascript.btset.BTSet.prototype.cljs$core$IFn$_invoke$arity$1 = (function (k){var self__ = this;
var coll = this;return coll.cljs$core$ILookup$_lookup$arity$2(null,k);
});
datascript.btset.BTSet.prototype.cljs$core$IFn$_invoke$arity$2 = (function (k,not_found){var self__ = this;
var coll = this;return coll.cljs$core$ILookup$_lookup$arity$3(null,k,not_found);
});
datascript.btset.__GT_BTSet = (function __GT_BTSet(root,shift,cnt,comparator,meta,__hash){return (new datascript.btset.BTSet(root,shift,cnt,comparator,meta,__hash));
});
datascript.btset.alter_btset = (function alter_btset(set,root,shift,cnt){return (new datascript.btset.BTSet(root,shift,cnt,set.comparator,set.meta,null));
});
/**
* @param {...*} var_args
*/
datascript.btset.btset_by = (function() {
var btset_by = null;
var btset_by__1 = (function (cmp){return (new datascript.btset.BTSet((new datascript.btset.LeafNode([])),0,0,cmp,null,0));
});
var btset_by__2 = (function() { 
var G__8838__delegate = function (cmp,keys){return cljs.core.reduce.call(null,cljs.core._conj,btset_by.call(null,cmp),keys);
};
var G__8838 = function (cmp,var_args){
var keys = null;if (arguments.length > 1) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return G__8838__delegate.call(this,cmp,keys);};
G__8838.cljs$lang$maxFixedArity = 1;
G__8838.cljs$lang$applyTo = (function (arglist__8839){
var cmp = cljs.core.first(arglist__8839);
var keys = cljs.core.rest(arglist__8839);
return G__8838__delegate(cmp,keys);
});
G__8838.cljs$core$IFn$_invoke$arity$variadic = G__8838__delegate;
return G__8838;
})()
;
btset_by = function(cmp,var_args){
var keys = var_args;
switch(arguments.length){
case 1:
return btset_by__1.call(this,cmp);
default:
return btset_by__2.cljs$core$IFn$_invoke$arity$variadic(cmp, cljs.core.array_seq(arguments, 1));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
btset_by.cljs$lang$maxFixedArity = 1;
btset_by.cljs$lang$applyTo = btset_by__2.cljs$lang$applyTo;
btset_by.cljs$core$IFn$_invoke$arity$1 = btset_by__1;
btset_by.cljs$core$IFn$_invoke$arity$variadic = btset_by__2.cljs$core$IFn$_invoke$arity$variadic;
return btset_by;
})()
;
/**
* @param {...*} var_args
*/
datascript.btset.btset = (function() {
var btset = null;
var btset__0 = (function (){return datascript.btset.btset_by.call(null,cljs.core.compare);
});
var btset__1 = (function() { 
var G__8840__delegate = function (keys){return cljs.core.reduce.call(null,cljs.core._conj,btset.call(null),keys);
};
var G__8840 = function (var_args){
var keys = null;if (arguments.length > 0) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return G__8840__delegate.call(this,keys);};
G__8840.cljs$lang$maxFixedArity = 0;
G__8840.cljs$lang$applyTo = (function (arglist__8841){
var keys = cljs.core.seq(arglist__8841);
return G__8840__delegate(keys);
});
G__8840.cljs$core$IFn$_invoke$arity$variadic = G__8840__delegate;
return G__8840;
})()
;
btset = function(var_args){
var keys = var_args;
switch(arguments.length){
case 0:
return btset__0.call(this);
default:
return btset__1.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(arguments, 0));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
btset.cljs$lang$maxFixedArity = 0;
btset.cljs$lang$applyTo = btset__1.cljs$lang$applyTo;
btset.cljs$core$IFn$_invoke$arity$0 = btset__0;
btset.cljs$core$IFn$_invoke$arity$variadic = btset__1.cljs$core$IFn$_invoke$arity$variadic;
return btset;
})()
;
}
if(!lt.util.load.provided_QMARK_('datascript')) {
goog.provide('datascript');
goog.require('cljs.core');
goog.require('cljs.reader');
goog.require('datascript.btset');
goog.require('datascript.btset');
goog.require('cljs.reader');
goog.require('clojure.walk');
goog.require('clojure.walk');
goog.require('clojure.set');
goog.require('clojure.set');

/**
* @constructor
* @param {*} e
* @param {*} a
* @param {*} v
* @param {*} tx
* @param {*} added
* @param {*} __meta
* @param {*} __extmap
* @param {*=} __meta 
* @param {*=} __extmap
*/
datascript.Datom = (function (e,a,v,tx,added,__meta,__extmap){
this.e = e;
this.a = a;
this.v = v;
this.tx = tx;
this.added = added;
this.__meta = __meta;
this.__extmap = __extmap;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
if(arguments.length>5){
this.__meta = __meta;
this.__extmap = __extmap;
} else {
this.__meta=null;
this.__extmap=null;
}
})
datascript.Datom.prototype.toString = (function (){var self__ = this;
var this$ = this;return cljs.core.pr_str.call(null,this$);
});
datascript.Datom.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__7012__auto__,k__7013__auto__){var self__ = this;
var this__7012__auto____$1 = this;return cljs.core._lookup.call(null,this__7012__auto____$1,k__7013__auto__,null);
});
datascript.Datom.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__7014__auto__,k8540,else__7015__auto__){var self__ = this;
var this__7014__auto____$1 = this;var G__8542 = (((k8540 instanceof cljs.core.Keyword))?k8540.fqn:null);var caseval__8694;
switch (G__8542){
case "added":
caseval__8694=self__.added
break;
case "tx":
caseval__8694=self__.tx
break;
case "v":
caseval__8694=self__.v
break;
case "a":
caseval__8694=self__.a
break;
case "e":
caseval__8694=self__.e
break;
default:
caseval__8694=cljs.core.get.call(null,self__.__extmap,k8540,else__7015__auto__)
}
return caseval__8694;
});
datascript.Datom.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__7026__auto__,writer__7027__auto__,opts__7028__auto__){var self__ = this;
var this__7026__auto____$1 = this;var pr_pair__7029__auto__ = ((function (this__7026__auto____$1){
return (function (keyval__7030__auto__){return cljs.core.pr_sequential_writer.call(null,writer__7027__auto__,cljs.core.pr_writer,""," ","",opts__7028__auto__,keyval__7030__auto__);
});})(this__7026__auto____$1))
;return cljs.core.pr_sequential_writer.call(null,writer__7027__auto__,pr_pair__7029__auto__,"#datascript.Datom{",", ","}",opts__7028__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"e","e",1013904343),self__.e],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"a","a",1013904339),self__.a],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"v","v",1013904360),self__.v],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"tx","tx",1013907958),self__.tx],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"added","added",1106564210),self__.added],null))], null),self__.__extmap));
});
datascript.Datom.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__7010__auto__){var self__ = this;
var this__7010__auto____$1 = this;return self__.__meta;
});
datascript.Datom.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__7006__auto__){var self__ = this;
var this__7006__auto____$1 = this;return (new datascript.Datom(self__.e,self__.a,self__.v,self__.tx,self__.added,self__.__meta,self__.__extmap,self__.__hash));
});
datascript.Datom.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__7016__auto__){var self__ = this;
var this__7016__auto____$1 = this;return (5 + cljs.core.count.call(null,self__.__extmap));
});
datascript.Datom.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__7007__auto__){var self__ = this;
var this__7007__auto____$1 = this;var h__6837__auto__ = self__.__hash;if(!((h__6837__auto__ == null)))
{return h__6837__auto__;
} else
{var h__6837__auto____$1 = cljs.core.hash_imap.call(null,this__7007__auto____$1);self__.__hash = h__6837__auto____$1;
return h__6837__auto____$1;
}
});
datascript.Datom.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__7008__auto__,other__7009__auto__){var self__ = this;
var this__7008__auto____$1 = this;if(cljs.core.truth_((function (){var and__6414__auto__ = other__7009__auto__;if(cljs.core.truth_(and__6414__auto__))
{return ((this__7008__auto____$1.constructor === other__7009__auto__.constructor)) && (cljs.core.equiv_map.call(null,this__7008__auto____$1,other__7009__auto__));
} else
{return and__6414__auto__;
}
})()))
{return true;
} else
{return false;
}
});
datascript.Datom.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__7021__auto__,k__7022__auto__){var self__ = this;
var this__7021__auto____$1 = this;if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"v","v",1013904360),null,new cljs.core.Keyword(null,"added","added",1106564210),null,new cljs.core.Keyword(null,"e","e",1013904343),null,new cljs.core.Keyword(null,"tx","tx",1013907958),null,new cljs.core.Keyword(null,"a","a",1013904339),null], null), null),k__7022__auto__))
{return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__7021__auto____$1),self__.__meta),k__7022__auto__);
} else
{return (new datascript.Datom(self__.e,self__.a,self__.v,self__.tx,self__.added,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__7022__auto__)),null));
}
});
datascript.Datom.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__7019__auto__,k__7020__auto__,G__8539){var self__ = this;
var this__7019__auto____$1 = this;var pred__8543 = cljs.core.keyword_identical_QMARK_;var expr__8544 = k__7020__auto__;if(cljs.core.truth_(pred__8543.call(null,new cljs.core.Keyword(null,"e","e",1013904343),expr__8544)))
{return (new datascript.Datom(G__8539,self__.a,self__.v,self__.tx,self__.added,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8543.call(null,new cljs.core.Keyword(null,"a","a",1013904339),expr__8544)))
{return (new datascript.Datom(self__.e,G__8539,self__.v,self__.tx,self__.added,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8543.call(null,new cljs.core.Keyword(null,"v","v",1013904360),expr__8544)))
{return (new datascript.Datom(self__.e,self__.a,G__8539,self__.tx,self__.added,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8543.call(null,new cljs.core.Keyword(null,"tx","tx",1013907958),expr__8544)))
{return (new datascript.Datom(self__.e,self__.a,self__.v,G__8539,self__.added,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8543.call(null,new cljs.core.Keyword(null,"added","added",1106564210),expr__8544)))
{return (new datascript.Datom(self__.e,self__.a,self__.v,self__.tx,G__8539,self__.__meta,self__.__extmap,null));
} else
{return (new datascript.Datom(self__.e,self__.a,self__.v,self__.tx,self__.added,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__7020__auto__,G__8539),null));
}
}
}
}
}
});
datascript.Datom.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__7024__auto__){var self__ = this;
var this__7024__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"e","e",1013904343),self__.e],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"a","a",1013904339),self__.a],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"v","v",1013904360),self__.v],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"tx","tx",1013907958),self__.tx],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"added","added",1106564210),self__.added],null))], null),self__.__extmap));
});
datascript.Datom.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__7011__auto__,G__8539){var self__ = this;
var this__7011__auto____$1 = this;return (new datascript.Datom(self__.e,self__.a,self__.v,self__.tx,self__.added,G__8539,self__.__extmap,self__.__hash));
});
datascript.Datom.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__7017__auto__,entry__7018__auto__){var self__ = this;
var this__7017__auto____$1 = this;if(cljs.core.vector_QMARK_.call(null,entry__7018__auto__))
{return cljs.core._assoc.call(null,this__7017__auto____$1,cljs.core._nth.call(null,entry__7018__auto__,0),cljs.core._nth.call(null,entry__7018__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__7017__auto____$1,entry__7018__auto__);
}
});
datascript.Datom.cljs$lang$type = true;
datascript.Datom.cljs$lang$ctorPrSeq = (function (this__7046__auto__){return cljs.core._conj.call(null,cljs.core.List.EMPTY,"datascript/Datom");
});
datascript.Datom.cljs$lang$ctorPrWriter = (function (this__7046__auto__,writer__7047__auto__){return cljs.core._write.call(null,writer__7047__auto__,"datascript/Datom");
});
datascript.__GT_Datom = (function __GT_Datom(e,a,v,tx,added){return (new datascript.Datom(e,a,v,tx,added));
});
datascript.map__GT_Datom = (function map__GT_Datom(G__8541){return (new datascript.Datom(new cljs.core.Keyword(null,"e","e",1013904343).cljs$core$IFn$_invoke$arity$1(G__8541),new cljs.core.Keyword(null,"a","a",1013904339).cljs$core$IFn$_invoke$arity$1(G__8541),new cljs.core.Keyword(null,"v","v",1013904360).cljs$core$IFn$_invoke$arity$1(G__8541),new cljs.core.Keyword(null,"tx","tx",1013907958).cljs$core$IFn$_invoke$arity$1(G__8541),new cljs.core.Keyword(null,"added","added",1106564210).cljs$core$IFn$_invoke$arity$1(G__8541),null,cljs.core.dissoc.call(null,G__8541,new cljs.core.Keyword(null,"e","e",1013904343),new cljs.core.Keyword(null,"a","a",1013904339),new cljs.core.Keyword(null,"v","v",1013904360),new cljs.core.Keyword(null,"tx","tx",1013907958),new cljs.core.Keyword(null,"added","added",1106564210))));
});
datascript.Datom.prototype.cljs$core$ISeqable$ = true;
datascript.Datom.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (d){var d__$1 = this;return cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,d__$1.added),d__$1.tx),d__$1.v),d__$1.a),d__$1.e);
});
datascript.Datom.prototype.cljs$core$IEquiv$ = true;
datascript.Datom.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (d,o){var d__$1 = this;return (cljs.core._EQ_.call(null,d__$1.e,o.e)) && (cljs.core._EQ_.call(null,d__$1.a,o.a)) && (cljs.core._EQ_.call(null,d__$1.v,o.v));
});
datascript.Datom.prototype.cljs$core$IHash$ = true;
datascript.Datom.prototype.cljs$core$IHash$_hash$arity$1 = (function (d){var d__$1 = this;var or__6426__auto__ = d__$1.__hash;if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return d__$1.__hash = cljs.core.hash_coll.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [d__$1.e,d__$1.a,d__$1.v], null));
}
});
datascript.ISearch = (function (){var obj8547 = {};return obj8547;
})();
datascript._search = (function _search(data,pattern){if((function (){var and__6414__auto__ = data;if(and__6414__auto__)
{return data.datascript$ISearch$_search$arity$2;
} else
{return and__6414__auto__;
}
})())
{return data.datascript$ISearch$_search$arity$2(data,pattern);
} else
{var x__7053__auto__ = (((data == null))?null:data);return (function (){var or__6426__auto__ = (datascript._search[goog.typeOf(x__7053__auto__)]);if(or__6426__auto__)
{return or__6426__auto__;
} else
{var or__6426__auto____$1 = (datascript._search["_"]);if(or__6426__auto____$1)
{return or__6426__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISearch.-search",data);
}
}
})().call(null,data,pattern);
}
});
datascript.some_QMARK_ = (function some_QMARK_(x){return !((x == null));
});
datascript.compare_key = (function compare_key(k,o1,o2){var k1 = cljs.core.get.call(null,o1,k);var k2 = cljs.core.get.call(null,o2,k);if((datascript.some_QMARK_.call(null,k1)) && (datascript.some_QMARK_.call(null,k2)))
{var t1 = cljs.core.type.call(null,k1);var t2 = cljs.core.type.call(null,k2);if(cljs.core._EQ_.call(null,t1,t2))
{return cljs.core.compare.call(null,k1,k2);
} else
{return cljs.core.compare.call(null,t1,t2);
}
} else
{return 0;
}
});
datascript.cmp_val = (function cmp_val(o1,o2){if((datascript.some_QMARK_.call(null,o1)) && (datascript.some_QMARK_.call(null,o2)))
{var t1 = cljs.core.type.call(null,o1);var t2 = cljs.core.type.call(null,o2);if(cljs.core._EQ_.call(null,t1,t2))
{return cljs.core.compare.call(null,o1,o2);
} else
{return cljs.core.compare.call(null,t1,t2);
}
} else
{return 0;
}
});
datascript.cmp = (function cmp(o1,o2){if(cljs.core.truth_((function (){var and__6414__auto__ = o1;if(cljs.core.truth_(and__6414__auto__))
{return o2;
} else
{return and__6414__auto__;
}
})()))
{return cljs.core.compare.call(null,o1,o2);
} else
{return 0;
}
});
datascript.cmp_datoms_eavt = (function cmp_datoms_eavt(d1,d2){var c__8027__auto__ = datascript.cmp.call(null,d1.e,d2.e);if((0 === c__8027__auto__))
{var c__8027__auto____$1 = datascript.cmp.call(null,d1.a,d2.a);if((0 === c__8027__auto____$1))
{var c__8027__auto____$2 = datascript.cmp_val.call(null,d1.v,d2.v);if((0 === c__8027__auto____$2))
{var c__8027__auto____$3 = datascript.cmp.call(null,d1.tx,d2.tx);if((0 === c__8027__auto____$3))
{return 0;
} else
{return c__8027__auto____$3;
}
} else
{return c__8027__auto____$2;
}
} else
{return c__8027__auto____$1;
}
} else
{return c__8027__auto__;
}
});
datascript.cmp_datoms_aevt = (function cmp_datoms_aevt(d1,d2){var c__8027__auto__ = datascript.cmp.call(null,d1.a,d2.a);if((0 === c__8027__auto__))
{var c__8027__auto____$1 = datascript.cmp.call(null,d1.e,d2.e);if((0 === c__8027__auto____$1))
{var c__8027__auto____$2 = datascript.cmp_val.call(null,d1.v,d2.v);if((0 === c__8027__auto____$2))
{var c__8027__auto____$3 = datascript.cmp.call(null,d1.tx,d2.tx);if((0 === c__8027__auto____$3))
{return 0;
} else
{return c__8027__auto____$3;
}
} else
{return c__8027__auto____$2;
}
} else
{return c__8027__auto____$1;
}
} else
{return c__8027__auto__;
}
});
datascript.cmp_datoms_avet = (function cmp_datoms_avet(d1,d2){var c__8027__auto__ = datascript.cmp.call(null,d1.a,d2.a);if((0 === c__8027__auto__))
{var c__8027__auto____$1 = datascript.cmp_val.call(null,d1.v,d2.v);if((0 === c__8027__auto____$1))
{var c__8027__auto____$2 = datascript.cmp.call(null,d1.e,d2.e);if((0 === c__8027__auto____$2))
{var c__8027__auto____$3 = datascript.cmp.call(null,d1.tx,d2.tx);if((0 === c__8027__auto____$3))
{return 0;
} else
{return c__8027__auto____$3;
}
} else
{return c__8027__auto____$2;
}
} else
{return c__8027__auto____$1;
}
} else
{return c__8027__auto__;
}
});

/**
* @constructor
* @param {*} schema
* @param {*} eavt
* @param {*} aevt
* @param {*} avet
* @param {*} max_eid
* @param {*} max_tx
* @param {*} __meta
* @param {*} __extmap
* @param {*=} __meta 
* @param {*=} __extmap
*/
datascript.DB = (function (schema,eavt,aevt,avet,max_eid,max_tx,__meta,__extmap){
this.schema = schema;
this.eavt = eavt;
this.aevt = aevt;
this.avet = avet;
this.max_eid = max_eid;
this.max_tx = max_tx;
this.__meta = __meta;
this.__extmap = __extmap;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
if(arguments.length>6){
this.__meta = __meta;
this.__extmap = __extmap;
} else {
this.__meta=null;
this.__extmap=null;
}
})
datascript.DB.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__7012__auto__,k__7013__auto__){var self__ = this;
var this__7012__auto____$1 = this;return cljs.core._lookup.call(null,this__7012__auto____$1,k__7013__auto__,null);
});
datascript.DB.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__7014__auto__,k8558,else__7015__auto__){var self__ = this;
var this__7014__auto____$1 = this;var G__8560 = (((k8558 instanceof cljs.core.Keyword))?k8558.fqn:null);var caseval__8695;
switch (G__8560){
case "max-tx":
caseval__8695=self__.max_tx
break;
case "max-eid":
caseval__8695=self__.max_eid
break;
case "avet":
caseval__8695=self__.avet
break;
case "aevt":
caseval__8695=self__.aevt
break;
case "eavt":
caseval__8695=self__.eavt
break;
case "schema":
caseval__8695=self__.schema
break;
default:
caseval__8695=cljs.core.get.call(null,self__.__extmap,k8558,else__7015__auto__)
}
return caseval__8695;
});
datascript.DB.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__7026__auto__,writer__7027__auto__,opts__7028__auto__){var self__ = this;
var this__7026__auto____$1 = this;var pr_pair__7029__auto__ = ((function (this__7026__auto____$1){
return (function (keyval__7030__auto__){return cljs.core.pr_sequential_writer.call(null,writer__7027__auto__,cljs.core.pr_writer,""," ","",opts__7028__auto__,keyval__7030__auto__);
});})(this__7026__auto____$1))
;return cljs.core.pr_sequential_writer.call(null,writer__7027__auto__,pr_pair__7029__auto__,"#datascript.DB{",", ","}",opts__7028__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"schema","schema",4400883987),self__.schema],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"eavt","eavt",1017010124),self__.eavt],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"aevt","aevt",1016894804),self__.aevt],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"avet","avet",1016910614),self__.avet],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"max-eid","max-eid",1856848841),self__.max_eid],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"max-tx","max-tx",4227685119),self__.max_tx],null))], null),self__.__extmap));
});
datascript.DB.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__7010__auto__){var self__ = this;
var this__7010__auto____$1 = this;return self__.__meta;
});
datascript.DB.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__7006__auto__){var self__ = this;
var this__7006__auto____$1 = this;return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,self__.__extmap,self__.__hash));
});
datascript.DB.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__7016__auto__){var self__ = this;
var this__7016__auto____$1 = this;return (6 + cljs.core.count.call(null,self__.__extmap));
});
datascript.DB.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__7007__auto__){var self__ = this;
var this__7007__auto____$1 = this;var h__6837__auto__ = self__.__hash;if(!((h__6837__auto__ == null)))
{return h__6837__auto__;
} else
{var h__6837__auto____$1 = cljs.core.hash_imap.call(null,this__7007__auto____$1);self__.__hash = h__6837__auto____$1;
return h__6837__auto____$1;
}
});
datascript.DB.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__7008__auto__,other__7009__auto__){var self__ = this;
var this__7008__auto____$1 = this;if(cljs.core.truth_((function (){var and__6414__auto__ = other__7009__auto__;if(cljs.core.truth_(and__6414__auto__))
{return ((this__7008__auto____$1.constructor === other__7009__auto__.constructor)) && (cljs.core.equiv_map.call(null,this__7008__auto____$1,other__7009__auto__));
} else
{return and__6414__auto__;
}
})()))
{return true;
} else
{return false;
}
});
datascript.DB.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__7021__auto__,k__7022__auto__){var self__ = this;
var this__7021__auto____$1 = this;if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"schema","schema",4400883987),null,new cljs.core.Keyword(null,"max-tx","max-tx",4227685119),null,new cljs.core.Keyword(null,"aevt","aevt",1016894804),null,new cljs.core.Keyword(null,"avet","avet",1016910614),null,new cljs.core.Keyword(null,"max-eid","max-eid",1856848841),null,new cljs.core.Keyword(null,"eavt","eavt",1017010124),null], null), null),k__7022__auto__))
{return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__7021__auto____$1),self__.__meta),k__7022__auto__);
} else
{return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__7022__auto__)),null));
}
});
datascript.DB.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__7019__auto__,k__7020__auto__,G__8557){var self__ = this;
var this__7019__auto____$1 = this;var pred__8561 = cljs.core.keyword_identical_QMARK_;var expr__8562 = k__7020__auto__;if(cljs.core.truth_(pred__8561.call(null,new cljs.core.Keyword(null,"schema","schema",4400883987),expr__8562)))
{return (new datascript.DB(G__8557,self__.eavt,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8561.call(null,new cljs.core.Keyword(null,"eavt","eavt",1017010124),expr__8562)))
{return (new datascript.DB(self__.schema,G__8557,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8561.call(null,new cljs.core.Keyword(null,"aevt","aevt",1016894804),expr__8562)))
{return (new datascript.DB(self__.schema,self__.eavt,G__8557,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8561.call(null,new cljs.core.Keyword(null,"avet","avet",1016910614),expr__8562)))
{return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,G__8557,self__.max_eid,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8561.call(null,new cljs.core.Keyword(null,"max-eid","max-eid",1856848841),expr__8562)))
{return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,G__8557,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8561.call(null,new cljs.core.Keyword(null,"max-tx","max-tx",4227685119),expr__8562)))
{return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,self__.max_eid,G__8557,self__.__meta,self__.__extmap,null));
} else
{return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__7020__auto__,G__8557),null));
}
}
}
}
}
}
});
datascript.DB.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__7024__auto__){var self__ = this;
var this__7024__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"schema","schema",4400883987),self__.schema],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"eavt","eavt",1017010124),self__.eavt],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"aevt","aevt",1016894804),self__.aevt],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"avet","avet",1016910614),self__.avet],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"max-eid","max-eid",1856848841),self__.max_eid],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"max-tx","max-tx",4227685119),self__.max_tx],null))], null),self__.__extmap));
});
datascript.DB.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__7011__auto__,G__8557){var self__ = this;
var this__7011__auto____$1 = this;return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,G__8557,self__.__extmap,self__.__hash));
});
datascript.DB.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__7017__auto__,entry__7018__auto__){var self__ = this;
var this__7017__auto____$1 = this;if(cljs.core.vector_QMARK_.call(null,entry__7018__auto__))
{return cljs.core._assoc.call(null,this__7017__auto____$1,cljs.core._nth.call(null,entry__7018__auto__,0),cljs.core._nth.call(null,entry__7018__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__7017__auto____$1,entry__7018__auto__);
}
});
datascript.DB.prototype.datascript$ISearch$ = true;
datascript.DB.prototype.datascript$ISearch$_search$arity$2 = (function (db,p__8564){var self__ = this;
var vec__8565 = p__8564;var e = cljs.core.nth.call(null,vec__8565,0,null);var a = cljs.core.nth.call(null,vec__8565,1,null);var v = cljs.core.nth.call(null,vec__8565,2,null);var tx = cljs.core.nth.call(null,vec__8565,3,null);var db__$1 = this;if(cljs.core.truth_(e))
{if(cljs.core.truth_(a))
{if(datascript.some_QMARK_.call(null,v))
{if(cljs.core.truth_(tx))
{return datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,a,v,tx,null)));
} else
{return datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,a,v,null,null)));
}
} else
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8565,e,a,v,tx){
return (function (p1__8548_SHARP_){return cljs.core._EQ_.call(null,tx,p1__8548_SHARP_.tx);
});})(db__$1,vec__8565,e,a,v,tx))
,datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,a,null,null,null))));
} else
{return datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,a,null,null,null)));
}
}
} else
{if(datascript.some_QMARK_.call(null,v))
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8565,e,a,v,tx){
return (function (p1__8549_SHARP_){return (cljs.core._EQ_.call(null,v,p1__8549_SHARP_.v)) && (cljs.core._EQ_.call(null,tx,p1__8549_SHARP_.tx));
});})(db__$1,vec__8565,e,a,v,tx))
,datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,null,null,null,null))));
} else
{return cljs.core.filter.call(null,((function (db__$1,vec__8565,e,a,v,tx){
return (function (p1__8550_SHARP_){return cljs.core._EQ_.call(null,v,p1__8550_SHARP_.v);
});})(db__$1,vec__8565,e,a,v,tx))
,datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,null,null,null,null))));
}
} else
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8565,e,a,v,tx){
return (function (p1__8551_SHARP_){return cljs.core._EQ_.call(null,tx,p1__8551_SHARP_.tx);
});})(db__$1,vec__8565,e,a,v,tx))
,datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,null,null,null,null))));
} else
{return datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,null,null,null,null)));
}
}
}
} else
{if(cljs.core.truth_(a))
{if(datascript.some_QMARK_.call(null,v))
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8565,e,a,v,tx){
return (function (p1__8552_SHARP_){return cljs.core._EQ_.call(null,tx,p1__8552_SHARP_.tx);
});})(db__$1,vec__8565,e,a,v,tx))
,datascript.btset.slice.call(null,self__.avet,(new datascript.Datom(null,a,v,null,null))));
} else
{return datascript.btset.slice.call(null,self__.avet,(new datascript.Datom(null,a,v,null,null)));
}
} else
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8565,e,a,v,tx){
return (function (p1__8553_SHARP_){return cljs.core._EQ_.call(null,tx,p1__8553_SHARP_.tx);
});})(db__$1,vec__8565,e,a,v,tx))
,datascript.btset.slice.call(null,self__.avet,(new datascript.Datom(null,a,null,null,null))));
} else
{return datascript.btset.slice.call(null,self__.avet,(new datascript.Datom(null,a,null,null,null)));
}
}
} else
{if(datascript.some_QMARK_.call(null,v))
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8565,e,a,v,tx){
return (function (p1__8554_SHARP_){return (cljs.core._EQ_.call(null,v,p1__8554_SHARP_.v)) && (cljs.core._EQ_.call(null,tx,p1__8554_SHARP_.tx));
});})(db__$1,vec__8565,e,a,v,tx))
,self__.eavt);
} else
{return cljs.core.filter.call(null,((function (db__$1,vec__8565,e,a,v,tx){
return (function (p1__8555_SHARP_){return cljs.core._EQ_.call(null,v,p1__8555_SHARP_.v);
});})(db__$1,vec__8565,e,a,v,tx))
,self__.eavt);
}
} else
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8565,e,a,v,tx){
return (function (p1__8556_SHARP_){return cljs.core._EQ_.call(null,tx,p1__8556_SHARP_.tx);
});})(db__$1,vec__8565,e,a,v,tx))
,self__.eavt);
} else
{return self__.eavt;
}
}
}
}
});
datascript.DB.cljs$lang$type = true;
datascript.DB.cljs$lang$ctorPrSeq = (function (this__7046__auto__){return cljs.core._conj.call(null,cljs.core.List.EMPTY,"datascript/DB");
});
datascript.DB.cljs$lang$ctorPrWriter = (function (this__7046__auto__,writer__7047__auto__){return cljs.core._write.call(null,writer__7047__auto__,"datascript/DB");
});
datascript.__GT_DB = (function __GT_DB(schema,eavt,aevt,avet,max_eid,max_tx){return (new datascript.DB(schema,eavt,aevt,avet,max_eid,max_tx));
});
datascript.map__GT_DB = (function map__GT_DB(G__8559){return (new datascript.DB(new cljs.core.Keyword(null,"schema","schema",4400883987).cljs$core$IFn$_invoke$arity$1(G__8559),new cljs.core.Keyword(null,"eavt","eavt",1017010124).cljs$core$IFn$_invoke$arity$1(G__8559),new cljs.core.Keyword(null,"aevt","aevt",1016894804).cljs$core$IFn$_invoke$arity$1(G__8559),new cljs.core.Keyword(null,"avet","avet",1016910614).cljs$core$IFn$_invoke$arity$1(G__8559),new cljs.core.Keyword(null,"max-eid","max-eid",1856848841).cljs$core$IFn$_invoke$arity$1(G__8559),new cljs.core.Keyword(null,"max-tx","max-tx",4227685119).cljs$core$IFn$_invoke$arity$1(G__8559),null,cljs.core.dissoc.call(null,G__8559,new cljs.core.Keyword(null,"schema","schema",4400883987),new cljs.core.Keyword(null,"eavt","eavt",1017010124),new cljs.core.Keyword(null,"aevt","aevt",1016894804),new cljs.core.Keyword(null,"avet","avet",1016910614),new cljs.core.Keyword(null,"max-eid","max-eid",1856848841),new cljs.core.Keyword(null,"max-tx","max-tx",4227685119))));
});

/**
* @constructor
* @param {*} db_before
* @param {*} db_after
* @param {*} tx_data
* @param {*} tempids
* @param {*} __meta
* @param {*} __extmap
* @param {*=} __meta 
* @param {*=} __extmap
*/
datascript.TxReport = (function (db_before,db_after,tx_data,tempids,__meta,__extmap){
this.db_before = db_before;
this.db_after = db_after;
this.tx_data = tx_data;
this.tempids = tempids;
this.__meta = __meta;
this.__extmap = __extmap;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
if(arguments.length>4){
this.__meta = __meta;
this.__extmap = __extmap;
} else {
this.__meta=null;
this.__extmap=null;
}
})
datascript.TxReport.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__7012__auto__,k__7013__auto__){var self__ = this;
var this__7012__auto____$1 = this;return cljs.core._lookup.call(null,this__7012__auto____$1,k__7013__auto__,null);
});
datascript.TxReport.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__7014__auto__,k8567,else__7015__auto__){var self__ = this;
var this__7014__auto____$1 = this;var G__8569 = (((k8567 instanceof cljs.core.Keyword))?k8567.fqn:null);var caseval__8696;
switch (G__8569){
case "tempids":
caseval__8696=self__.tempids
break;
case "tx-data":
caseval__8696=self__.tx_data
break;
case "db-after":
caseval__8696=self__.db_after
break;
case "db-before":
caseval__8696=self__.db_before
break;
default:
caseval__8696=cljs.core.get.call(null,self__.__extmap,k8567,else__7015__auto__)
}
return caseval__8696;
});
datascript.TxReport.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__7026__auto__,writer__7027__auto__,opts__7028__auto__){var self__ = this;
var this__7026__auto____$1 = this;var pr_pair__7029__auto__ = ((function (this__7026__auto____$1){
return (function (keyval__7030__auto__){return cljs.core.pr_sequential_writer.call(null,writer__7027__auto__,cljs.core.pr_writer,""," ","",opts__7028__auto__,keyval__7030__auto__);
});})(this__7026__auto____$1))
;return cljs.core.pr_sequential_writer.call(null,writer__7027__auto__,pr_pair__7029__auto__,"#datascript.TxReport{",", ","}",opts__7028__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"db-before","db-before",3838846752),self__.db_before],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"db-after","db-after",1658340159),self__.db_after],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"tx-data","tx-data",4365248709),self__.tx_data],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"tempids","tempids",3880764886),self__.tempids],null))], null),self__.__extmap));
});
datascript.TxReport.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__7010__auto__){var self__ = this;
var this__7010__auto____$1 = this;return self__.__meta;
});
datascript.TxReport.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__7006__auto__){var self__ = this;
var this__7006__auto____$1 = this;return (new datascript.TxReport(self__.db_before,self__.db_after,self__.tx_data,self__.tempids,self__.__meta,self__.__extmap,self__.__hash));
});
datascript.TxReport.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__7016__auto__){var self__ = this;
var this__7016__auto____$1 = this;return (4 + cljs.core.count.call(null,self__.__extmap));
});
datascript.TxReport.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__7007__auto__){var self__ = this;
var this__7007__auto____$1 = this;var h__6837__auto__ = self__.__hash;if(!((h__6837__auto__ == null)))
{return h__6837__auto__;
} else
{var h__6837__auto____$1 = cljs.core.hash_imap.call(null,this__7007__auto____$1);self__.__hash = h__6837__auto____$1;
return h__6837__auto____$1;
}
});
datascript.TxReport.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__7008__auto__,other__7009__auto__){var self__ = this;
var this__7008__auto____$1 = this;if(cljs.core.truth_((function (){var and__6414__auto__ = other__7009__auto__;if(cljs.core.truth_(and__6414__auto__))
{return ((this__7008__auto____$1.constructor === other__7009__auto__.constructor)) && (cljs.core.equiv_map.call(null,this__7008__auto____$1,other__7009__auto__));
} else
{return and__6414__auto__;
}
})()))
{return true;
} else
{return false;
}
});
datascript.TxReport.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__7021__auto__,k__7022__auto__){var self__ = this;
var this__7021__auto____$1 = this;if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"tempids","tempids",3880764886),null,new cljs.core.Keyword(null,"db-after","db-after",1658340159),null,new cljs.core.Keyword(null,"db-before","db-before",3838846752),null,new cljs.core.Keyword(null,"tx-data","tx-data",4365248709),null], null), null),k__7022__auto__))
{return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__7021__auto____$1),self__.__meta),k__7022__auto__);
} else
{return (new datascript.TxReport(self__.db_before,self__.db_after,self__.tx_data,self__.tempids,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__7022__auto__)),null));
}
});
datascript.TxReport.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__7019__auto__,k__7020__auto__,G__8566){var self__ = this;
var this__7019__auto____$1 = this;var pred__8570 = cljs.core.keyword_identical_QMARK_;var expr__8571 = k__7020__auto__;if(cljs.core.truth_(pred__8570.call(null,new cljs.core.Keyword(null,"db-before","db-before",3838846752),expr__8571)))
{return (new datascript.TxReport(G__8566,self__.db_after,self__.tx_data,self__.tempids,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8570.call(null,new cljs.core.Keyword(null,"db-after","db-after",1658340159),expr__8571)))
{return (new datascript.TxReport(self__.db_before,G__8566,self__.tx_data,self__.tempids,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8570.call(null,new cljs.core.Keyword(null,"tx-data","tx-data",4365248709),expr__8571)))
{return (new datascript.TxReport(self__.db_before,self__.db_after,G__8566,self__.tempids,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8570.call(null,new cljs.core.Keyword(null,"tempids","tempids",3880764886),expr__8571)))
{return (new datascript.TxReport(self__.db_before,self__.db_after,self__.tx_data,G__8566,self__.__meta,self__.__extmap,null));
} else
{return (new datascript.TxReport(self__.db_before,self__.db_after,self__.tx_data,self__.tempids,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__7020__auto__,G__8566),null));
}
}
}
}
});
datascript.TxReport.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__7024__auto__){var self__ = this;
var this__7024__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"db-before","db-before",3838846752),self__.db_before],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"db-after","db-after",1658340159),self__.db_after],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"tx-data","tx-data",4365248709),self__.tx_data],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"tempids","tempids",3880764886),self__.tempids],null))], null),self__.__extmap));
});
datascript.TxReport.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__7011__auto__,G__8566){var self__ = this;
var this__7011__auto____$1 = this;return (new datascript.TxReport(self__.db_before,self__.db_after,self__.tx_data,self__.tempids,G__8566,self__.__extmap,self__.__hash));
});
datascript.TxReport.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__7017__auto__,entry__7018__auto__){var self__ = this;
var this__7017__auto____$1 = this;if(cljs.core.vector_QMARK_.call(null,entry__7018__auto__))
{return cljs.core._assoc.call(null,this__7017__auto____$1,cljs.core._nth.call(null,entry__7018__auto__,0),cljs.core._nth.call(null,entry__7018__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__7017__auto____$1,entry__7018__auto__);
}
});
datascript.TxReport.cljs$lang$type = true;
datascript.TxReport.cljs$lang$ctorPrSeq = (function (this__7046__auto__){return cljs.core._conj.call(null,cljs.core.List.EMPTY,"datascript/TxReport");
});
datascript.TxReport.cljs$lang$ctorPrWriter = (function (this__7046__auto__,writer__7047__auto__){return cljs.core._write.call(null,writer__7047__auto__,"datascript/TxReport");
});
datascript.__GT_TxReport = (function __GT_TxReport(db_before,db_after,tx_data,tempids){return (new datascript.TxReport(db_before,db_after,tx_data,tempids));
});
datascript.map__GT_TxReport = (function map__GT_TxReport(G__8568){return (new datascript.TxReport(new cljs.core.Keyword(null,"db-before","db-before",3838846752).cljs$core$IFn$_invoke$arity$1(G__8568),new cljs.core.Keyword(null,"db-after","db-after",1658340159).cljs$core$IFn$_invoke$arity$1(G__8568),new cljs.core.Keyword(null,"tx-data","tx-data",4365248709).cljs$core$IFn$_invoke$arity$1(G__8568),new cljs.core.Keyword(null,"tempids","tempids",3880764886).cljs$core$IFn$_invoke$arity$1(G__8568),null,cljs.core.dissoc.call(null,G__8568,new cljs.core.Keyword(null,"db-before","db-before",3838846752),new cljs.core.Keyword(null,"db-after","db-after",1658340159),new cljs.core.Keyword(null,"tx-data","tx-data",4365248709),new cljs.core.Keyword(null,"tempids","tempids",3880764886))));
});
datascript.multival_QMARK_ = (function multival_QMARK_(db,attr){return cljs.core._EQ_.call(null,cljs.core.get_in.call(null,db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"schema","schema",4400883987),attr,new cljs.core.Keyword("db","cardinality","db/cardinality",1859321681)], null)),new cljs.core.Keyword("db.cardinality","many","db.cardinality/many",2499141178));
});
datascript.ref_QMARK_ = (function ref_QMARK_(db,attr){return cljs.core._EQ_.call(null,cljs.core.get_in.call(null,db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"schema","schema",4400883987),attr,new cljs.core.Keyword("db","valueType","db/valueType",4543387286)], null)),new cljs.core.Keyword("db.type","ref","db.type/ref",2629452693));
});
datascript.match_tuple = (function match_tuple(tuple,pattern){return cljs.core.every_QMARK_.call(null,cljs.core.true_QMARK_,cljs.core.map.call(null,(function (p1__8574_SHARP_,p2__8573_SHARP_){return ((p2__8573_SHARP_ == null)) || (cljs.core._EQ_.call(null,p1__8574_SHARP_,p2__8573_SHARP_));
}),tuple,pattern));
});
datascript.search = (function search(data,pattern){if((function (){var G__8579 = data;if(G__8579)
{var bit__7076__auto__ = null;if(cljs.core.truth_((function (){var or__6426__auto__ = bit__7076__auto__;if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return G__8579.datascript$ISearch$;
}
})()))
{return true;
} else
{if((!G__8579.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,datascript.ISearch,G__8579);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,datascript.ISearch,G__8579);
}
})())
{return datascript._search.call(null,data,pattern);
} else
{if((function (){var or__6426__auto__ = (function (){var G__8581 = data;if(G__8581)
{var bit__7076__auto__ = (G__8581.cljs$lang$protocol_mask$partition0$ & 8388608);if((bit__7076__auto__) || (G__8581.cljs$core$ISeqable$))
{return true;
} else
{if((!G__8581.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__8581);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__8581);
}
})();if(or__6426__auto__)
{return or__6426__auto__;
} else
{return data instanceof Array;
}
})())
{return cljs.core.filter.call(null,(function (p1__8575_SHARP_){return datascript.match_tuple.call(null,p1__8575_SHARP_,pattern);
}),data);
} else
{return null;
}
}
});
datascript.current_tx = (function current_tx(report){return (cljs.core.get_in.call(null,report,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db-before","db-before",3838846752),new cljs.core.Keyword(null,"max-tx","max-tx",4227685119)], null)) + 1);
});
datascript.next_eid = (function next_eid(db){return (new cljs.core.Keyword(null,"max-eid","max-eid",1856848841).cljs$core$IFn$_invoke$arity$1(db) + 1);
});
datascript.advance_max_eid = (function advance_max_eid(db,eid){var G__8583 = db;var G__8583__$1 = (((eid > new cljs.core.Keyword(null,"max-eid","max-eid",1856848841).cljs$core$IFn$_invoke$arity$1(db)))?cljs.core.assoc.call(null,G__8583,new cljs.core.Keyword(null,"max-eid","max-eid",1856848841),eid):G__8583);return G__8583__$1;
});
datascript.allocate_eid = (function() {
var allocate_eid = null;
var allocate_eid__2 = (function (report,eid){return cljs.core.update_in.call(null,report,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db-after","db-after",1658340159)], null),datascript.advance_max_eid,eid);
});
var allocate_eid__3 = (function (report,e,eid){return cljs.core.update_in.call(null,cljs.core.assoc_in.call(null,report,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tempids","tempids",3880764886),e], null),eid),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db-after","db-after",1658340159)], null),datascript.advance_max_eid,eid);
});
allocate_eid = function(report,e,eid){
switch(arguments.length){
case 2:
return allocate_eid__2.call(this,report,e);
case 3:
return allocate_eid__3.call(this,report,e,eid);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
allocate_eid.cljs$core$IFn$_invoke$arity$2 = allocate_eid__2;
allocate_eid.cljs$core$IFn$_invoke$arity$3 = allocate_eid__3;
return allocate_eid;
})()
;
datascript.with_datom = (function with_datom(db,datom){if(cljs.core.truth_(datom.added))
{return datascript.advance_max_eid.call(null,cljs.core.update_in.call(null,cljs.core.update_in.call(null,cljs.core.update_in.call(null,db,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"eavt","eavt",1017010124)], null),cljs.core.conj,datom),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"aevt","aevt",1016894804)], null),cljs.core.conj,datom),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"avet","avet",1016910614)], null),cljs.core.conj,datom),datom.e);
} else
{var removing = cljs.core.first.call(null,datascript._search.call(null,db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [datom.e,datom.a,datom.v], null)));return cljs.core.update_in.call(null,cljs.core.update_in.call(null,cljs.core.update_in.call(null,db,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"eavt","eavt",1017010124)], null),cljs.core.disj,removing),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"aevt","aevt",1016894804)], null),cljs.core.disj,removing),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"avet","avet",1016910614)], null),cljs.core.disj,removing);
}
});
datascript.transact_report = (function transact_report(report,datom){return cljs.core.update_in.call(null,cljs.core.update_in.call(null,report,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db-after","db-after",1658340159)], null),datascript.with_datom,datom),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tx-data","tx-data",4365248709)], null),cljs.core.conj,datom);
});
datascript.explode = (function explode(db,entity){var eid = new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(entity);var iter__7151__auto__ = ((function (eid){
return (function iter__8592(s__8593){return (new cljs.core.LazySeq(null,((function (eid){
return (function (){var s__8593__$1 = s__8593;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__8593__$1);if(temp__4126__auto__)
{var xs__4624__auto__ = temp__4126__auto__;var vec__8599 = cljs.core.first.call(null,xs__4624__auto__);var a = cljs.core.nth.call(null,vec__8599,0,null);var vs = cljs.core.nth.call(null,vec__8599,1,null);var iterys__7147__auto__ = ((function (s__8593__$1,vec__8599,a,vs,xs__4624__auto__,temp__4126__auto__,eid){
return (function iter__8594(s__8595){return (new cljs.core.LazySeq(null,((function (s__8593__$1,vec__8599,a,vs,xs__4624__auto__,temp__4126__auto__,eid){
return (function (){var s__8595__$1 = s__8595;while(true){
var temp__4126__auto____$1 = cljs.core.seq.call(null,s__8595__$1);if(temp__4126__auto____$1)
{var s__8595__$2 = temp__4126__auto____$1;if(cljs.core.chunked_seq_QMARK_.call(null,s__8595__$2))
{var c__7149__auto__ = cljs.core.chunk_first.call(null,s__8595__$2);var size__7150__auto__ = cljs.core.count.call(null,c__7149__auto__);var b__8597 = cljs.core.chunk_buffer.call(null,size__7150__auto__);if((function (){var i__8596 = 0;while(true){
if((i__8596 < size__7150__auto__))
{var v = cljs.core._nth.call(null,c__7149__auto__,i__8596);cljs.core.chunk_append.call(null,b__8597,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db","add","db/add",1014207040),eid,a,v], null));
{
var G__8697 = (i__8596 + 1);
i__8596 = G__8697;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8597),iter__8594.call(null,cljs.core.chunk_rest.call(null,s__8595__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8597),null);
}
} else
{var v = cljs.core.first.call(null,s__8595__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db","add","db/add",1014207040),eid,a,v], null),iter__8594.call(null,cljs.core.rest.call(null,s__8595__$2)));
}
} else
{return null;
}
break;
}
});})(s__8593__$1,vec__8599,a,vs,xs__4624__auto__,temp__4126__auto__,eid))
,null,null));
});})(s__8593__$1,vec__8599,a,vs,xs__4624__auto__,temp__4126__auto__,eid))
;var fs__7148__auto__ = cljs.core.seq.call(null,iterys__7147__auto__.call(null,(((cljs.core.sequential_QMARK_.call(null,vs)) && (datascript.multival_QMARK_.call(null,db,a)))?vs:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [vs], null))));if(fs__7148__auto__)
{return cljs.core.concat.call(null,fs__7148__auto__,iter__8592.call(null,cljs.core.rest.call(null,s__8593__$1)));
} else
{{
var G__8698 = cljs.core.rest.call(null,s__8593__$1);
s__8593__$1 = G__8698;
continue;
}
}
} else
{return null;
}
break;
}
});})(eid))
,null,null));
});})(eid))
;return iter__7151__auto__.call(null,cljs.core.dissoc.call(null,entity,new cljs.core.Keyword("db","id","db/id",1014111942)));
});
datascript.transact_add = (function transact_add(report,p__8600){var vec__8602 = p__8600;var _ = cljs.core.nth.call(null,vec__8602,0,null);var e = cljs.core.nth.call(null,vec__8602,1,null);var a = cljs.core.nth.call(null,vec__8602,2,null);var v = cljs.core.nth.call(null,vec__8602,3,null);var tx = datascript.current_tx.call(null,report);var db = new cljs.core.Keyword(null,"db-after","db-after",1658340159).cljs$core$IFn$_invoke$arity$1(report);var datom = (new datascript.Datom(e,a,v,tx,true));if(datascript.multival_QMARK_.call(null,db,a))
{if(cljs.core.empty_QMARK_.call(null,datascript._search.call(null,db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,v], null))))
{return datascript.transact_report.call(null,report,datom);
} else
{return report;
}
} else
{var temp__4124__auto__ = cljs.core.first.call(null,datascript._search.call(null,db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a], null)));if(cljs.core.truth_(temp__4124__auto__))
{var old_datom = temp__4124__auto__;if(cljs.core._EQ_.call(null,old_datom.v,v))
{return report;
} else
{return datascript.transact_report.call(null,datascript.transact_report.call(null,report,(new datascript.Datom(e,a,old_datom.v,tx,false))),datom);
}
} else
{return datascript.transact_report.call(null,report,datom);
}
}
});
datascript.transact_retract_datom = (function transact_retract_datom(report,d){var tx = datascript.current_tx.call(null,report);return datascript.transact_report.call(null,report,(new datascript.Datom(d.e,d.a,d.v,tx,false)));
});
datascript.transact_entities = (function transact_entities(report,p__8603){while(true){
var vec__8607 = p__8603;var entity = cljs.core.nth.call(null,vec__8607,0,null);var entities = cljs.core.nthnext.call(null,vec__8607,1);var es = vec__8607;var db = new cljs.core.Keyword(null,"db-after","db-after",1658340159).cljs$core$IFn$_invoke$arity$1(report);if((entity == null))
{return cljs.core.update_in.call(null,report,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db-after","db-after",1658340159),new cljs.core.Keyword(null,"max-tx","max-tx",4227685119)], null),cljs.core.inc);
} else
{if(cljs.core.map_QMARK_.call(null,entity))
{if(cljs.core.truth_(new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(entity)))
{{
var G__8699 = report;
var G__8700 = cljs.core.concat.call(null,datascript.explode.call(null,db,entity),entities);
report = G__8699;
p__8603 = G__8700;
continue;
}
} else
{var eid = datascript.next_eid.call(null,db);var entity__$1 = cljs.core.assoc.call(null,entity,new cljs.core.Keyword("db","id","db/id",1014111942),eid);{
var G__8701 = datascript.allocate_eid.call(null,report,eid);
var G__8702 = cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [entity__$1], null),entities);
report = G__8701;
p__8603 = G__8702;
continue;
}
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{var vec__8608 = entity;var op = cljs.core.nth.call(null,vec__8608,0,null);var e = cljs.core.nth.call(null,vec__8608,1,null);var a = cljs.core.nth.call(null,vec__8608,2,null);var v = cljs.core.nth.call(null,vec__8608,3,null);if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db.fn","call","db.fn/call",2901959894)))
{var vec__8609 = entity;var _ = cljs.core.nth.call(null,vec__8609,0,null);var f = cljs.core.nth.call(null,vec__8609,1,null);var args = cljs.core.nthnext.call(null,vec__8609,2);{
var G__8703 = report;
var G__8704 = cljs.core.concat.call(null,cljs.core.apply.call(null,f,db,args),entities);
report = G__8703;
p__8603 = G__8704;
continue;
}
} else
{if((e < 0))
{var temp__4124__auto__ = cljs.core.get_in.call(null,report,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tempids","tempids",3880764886),e], null));if(cljs.core.truth_(temp__4124__auto__))
{var eid = temp__4124__auto__;{
var G__8705 = report;
var G__8706 = cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [op,eid,a,v], null)], null),entities);
report = G__8705;
p__8603 = G__8706;
continue;
}
} else
{{
var G__8707 = datascript.allocate_eid.call(null,report,e,datascript.next_eid.call(null,db));
var G__8708 = es;
report = G__8707;
p__8603 = G__8708;
continue;
}
}
} else
{if((datascript.ref_QMARK_.call(null,db,a)) && ((v < 0)))
{var temp__4124__auto__ = cljs.core.get_in.call(null,report,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tempids","tempids",3880764886),v], null));if(cljs.core.truth_(temp__4124__auto__))
{var vid = temp__4124__auto__;{
var G__8709 = report;
var G__8710 = cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [op,e,a,vid], null)], null),entities);
report = G__8709;
p__8603 = G__8710;
continue;
}
} else
{{
var G__8711 = datascript.allocate_eid.call(null,report,v,datascript.next_eid.call(null,db));
var G__8712 = es;
report = G__8711;
p__8603 = G__8712;
continue;
}
}
} else
{if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db","add","db/add",1014207040)))
{{
var G__8713 = datascript.transact_add.call(null,report,entity);
var G__8714 = entities;
report = G__8713;
p__8603 = G__8714;
continue;
}
} else
{if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db","retract","db/retract",2112480480)))
{var temp__4124__auto__ = cljs.core.first.call(null,datascript._search.call(null,db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,v], null)));if(cljs.core.truth_(temp__4124__auto__))
{var old_datom = temp__4124__auto__;{
var G__8715 = datascript.transact_retract_datom.call(null,report,old_datom);
var G__8716 = entities;
report = G__8715;
p__8603 = G__8716;
continue;
}
} else
{{
var G__8717 = report;
var G__8718 = entities;
report = G__8717;
p__8603 = G__8718;
continue;
}
}
} else
{if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db.fn","retractAttribute","db.fn/retractAttribute",3416849171)))
{var datoms = datascript._search.call(null,db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a], null));{
var G__8719 = cljs.core.reduce.call(null,datascript.transact_retract_datom,report,datoms);
var G__8720 = entities;
report = G__8719;
p__8603 = G__8720;
continue;
}
} else
{if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db.fn","retractEntity","db.fn/retractEntity",4213852396)))
{var datoms = datascript._search.call(null,db,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [e], null));{
var G__8721 = cljs.core.reduce.call(null,datascript.transact_retract_datom,report,datoms);
var G__8722 = entities;
report = G__8721;
p__8603 = G__8722;
continue;
}
} else
{return null;
}
}
}
}
}
}
}
} else
{return null;
}
}
}
break;
}
});
datascript.parse_where = (function parse_where(where){var source = cljs.core.first.call(null,where);if(((source instanceof cljs.core.Symbol)) && (cljs.core._EQ_.call(null,"$",cljs.core.first.call(null,cljs.core.name.call(null,source)))))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,where),cljs.core.next.call(null,where)], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"$","$",-1640531491,null),where], null);
}
});
datascript.bind_symbol = (function bind_symbol(sym,scope){if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"_","_",-1640531432,null),sym))
{return null;
} else
{if((sym instanceof cljs.core.Symbol))
{return cljs.core.get.call(null,scope,sym,null);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return sym;
} else
{return null;
}
}
}
});
datascript.bind_symbols = (function bind_symbols(form,scope){return cljs.core.map.call(null,(function (p1__8610_SHARP_){return datascript.bind_symbol.call(null,p1__8610_SHARP_,scope);
}),form);
});
datascript.search_datoms = (function search_datoms(source,where,scope){return datascript.search.call(null,datascript.bind_symbol.call(null,source,scope),datascript.bind_symbols.call(null,where,scope));
});
datascript.populate_scope = (function populate_scope(scope,where,datom){return cljs.core.into.call(null,scope,cljs.core.remove.call(null,cljs.core.nil_QMARK_,cljs.core.map.call(null,(function (p1__8611_SHARP_,p2__8612_SHARP_){if(((p1__8611_SHARP_ instanceof cljs.core.Symbol)) && (!(cljs.core.contains_QMARK_.call(null,scope,p1__8611_SHARP_))))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__8611_SHARP_,p2__8612_SHARP_], null);
} else
{return null;
}
}),where,datom)));
});
/**
* @param {...*} var_args
*/
datascript._differ_QMARK_ = (function() { 
var _differ_QMARK___delegate = function (xs){var l = cljs.core.count.call(null,xs);return cljs.core.not_EQ_.call(null,cljs.core.take.call(null,(l / 2),xs),cljs.core.drop.call(null,(l / 2),xs));
};
var _differ_QMARK_ = function (var_args){
var xs = null;if (arguments.length > 0) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return _differ_QMARK___delegate.call(this,xs);};
_differ_QMARK_.cljs$lang$maxFixedArity = 0;
_differ_QMARK_.cljs$lang$applyTo = (function (arglist__8723){
var xs = cljs.core.seq(arglist__8723);
return _differ_QMARK___delegate(xs);
});
_differ_QMARK_.cljs$core$IFn$_invoke$arity$variadic = _differ_QMARK___delegate;
return _differ_QMARK_;
})()
;
datascript.built_ins = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Symbol(null,"true?","true?",-1529891286,null),new cljs.core.Symbol(null,"odd?","odd?",-1637125463,null),new cljs.core.Symbol(null,">=",">=",-1640529544,null),new cljs.core.Symbol(null,">",">",-1640531465,null),new cljs.core.Symbol(null,"nil?","nil?",-1637150201,null),new cljs.core.Symbol(null,"inc","inc",-1640427113,null),new cljs.core.Symbol(null,"/","/",-1640531480,null),new cljs.core.Symbol(null,"quot","quot",-1637049150,null),new cljs.core.Symbol(null,"false?","false?",1372554549,null),new cljs.core.Symbol(null,"-differ?","-differ?",1135976441,null),new cljs.core.Symbol(null,"<=","<=",-1640529606,null),new cljs.core.Symbol(null,"=","=",-1640531466,null),new cljs.core.Symbol(null,"min","min",-1640423413,null),new cljs.core.Symbol(null,"+","+",-1640531484,null),new cljs.core.Symbol(null,"==","==",-1640529575,null),new cljs.core.Symbol(null,"max","max",-1640423651,null),new cljs.core.Symbol(null,"*","*",-1640531485,null),new cljs.core.Symbol(null,"zero?","zero?",-1524740016,null),new cljs.core.Symbol(null,"!=","!=",-1640530443,null),new cljs.core.Symbol(null,"dec","dec",-1640432197,null),new cljs.core.Symbol(null,"not=","not=",-1637144189,null),new cljs.core.Symbol(null,"<","<",-1640531467,null),new cljs.core.Symbol(null,"-","-",-1640531482,null),new cljs.core.Symbol(null,"pos?","pos?",-1637084636,null),new cljs.core.Symbol(null,"mod","mod",-1640423237,null),new cljs.core.Symbol(null,"rem","rem",-1640418733,null),new cljs.core.Symbol(null,"even?","even?",-1543640034,null),new cljs.core.Symbol(null,"neg?","neg?",-1637154200,null)],[cljs.core.true_QMARK_,cljs.core.odd_QMARK_,cljs.core._GT__EQ_,cljs.core._GT_,cljs.core.nil_QMARK_,cljs.core.inc,cljs.core._SLASH_,cljs.core.quot,cljs.core.false_QMARK_,datascript._differ_QMARK_,cljs.core._LT__EQ_,cljs.core._EQ_,cljs.core.min,cljs.core._PLUS_,cljs.core._EQ__EQ_,cljs.core.max,cljs.core._STAR_,cljs.core.zero_QMARK_,cljs.core.not_EQ_,cljs.core.dec,cljs.core.not_EQ_,cljs.core._LT_,cljs.core._,cljs.core.pos_QMARK_,cljs.core.mod,cljs.core.rem,cljs.core.even_QMARK_,cljs.core.neg_QMARK_]);
datascript.call = (function call(p__8613,scope){var vec__8615 = p__8613;var f = cljs.core.nth.call(null,vec__8615,0,null);var args = cljs.core.nthnext.call(null,vec__8615,1);var bound_args = datascript.bind_symbols.call(null,args,scope);var f__$1 = (function (){var or__6426__auto__ = datascript.built_ins.call(null,f);if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return scope.call(null,f);
}
})();return cljs.core.apply.call(null,f__$1,bound_args);
});
datascript.looks_like_QMARK_ = (function looks_like_QMARK_(pattern,form){if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"_","_",-1640531432,null),pattern))
{return true;
} else
{if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null),pattern))
{return cljs.core.sequential_QMARK_.call(null,form);
} else
{if(cljs.core.sequential_QMARK_.call(null,pattern))
{return (cljs.core.sequential_QMARK_.call(null,form)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,form),cljs.core.count.call(null,pattern))) && (cljs.core.every_QMARK_.call(null,(function (p__8622){var vec__8623 = p__8622;var pattern_el = cljs.core.nth.call(null,vec__8623,0,null);var form_el = cljs.core.nth.call(null,vec__8623,1,null);return looks_like_QMARK_.call(null,pattern_el,form_el);
}),cljs.core.map.call(null,cljs.core.vector,pattern,form)));
} else
{if((pattern instanceof cljs.core.Symbol))
{return cljs.core._EQ_.call(null,form,pattern);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return pattern.call(null,form);
} else
{return null;
}
}
}
}
}
});
datascript.collect = (function collect(f,coll){return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,(function (p1__8624_SHARP_,p2__8625_SHARP_){return cljs.core.reduce.call(null,cljs.core.conj_BANG_,p1__8624_SHARP_,f.call(null,p2__8625_SHARP_));
}),cljs.core.transient$.call(null,cljs.core.PersistentHashSet.EMPTY),coll));
});
datascript.bind_rule_branch = (function bind_rule_branch(branch,call_args,context){var vec__8633 = branch;var vec__8634 = cljs.core.nth.call(null,vec__8633,0,null);var rule = cljs.core.nth.call(null,vec__8634,0,null);var local_args = cljs.core.nthnext.call(null,vec__8634,1);var body = cljs.core.nthnext.call(null,vec__8633,1);var replacements = cljs.core.zipmap.call(null,local_args,call_args);var seqid = new cljs.core.Keyword(null,"__depth","__depth",2242649685).cljs$core$IFn$_invoke$arity$2(context,0);var bound_body = clojure.walk.postwalk.call(null,((function (vec__8633,vec__8634,rule,local_args,body,replacements,seqid){
return (function (p1__8626_SHARP_){if(((p1__8626_SHARP_ instanceof cljs.core.Symbol)) && (cljs.core._EQ_.call(null,"?",cljs.core.first.call(null,cljs.core.name.call(null,p1__8626_SHARP_)))))
{var or__6426__auto__ = replacements.call(null,p1__8626_SHARP_);if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return cljs.core.symbol.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,p1__8626_SHARP_))+"__auto__"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(seqid)));
}
} else
{return p1__8626_SHARP_;
}
});})(vec__8633,vec__8634,rule,local_args,body,replacements,seqid))
,body);return cljs.core.concat.call(null,(function (){var iter__7151__auto__ = ((function (vec__8633,vec__8634,rule,local_args,body,replacements,seqid,bound_body){
return (function iter__8635(s__8636){return (new cljs.core.LazySeq(null,((function (vec__8633,vec__8634,rule,local_args,body,replacements,seqid,bound_body){
return (function (){var s__8636__$1 = s__8636;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__8636__$1);if(temp__4126__auto__)
{var s__8636__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__8636__$2))
{var c__7149__auto__ = cljs.core.chunk_first.call(null,s__8636__$2);var size__7150__auto__ = cljs.core.count.call(null,c__7149__auto__);var b__8638 = cljs.core.chunk_buffer.call(null,size__7150__auto__);if((function (){var i__8637 = 0;while(true){
if((i__8637 < size__7150__auto__))
{var prev_call_args = cljs.core._nth.call(null,c__7149__auto__,i__8637);cljs.core.chunk_append.call(null,b__8638,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"-differ?","-differ?",1135976441,null)], null),call_args,prev_call_args)], null));
{
var G__8724 = (i__8637 + 1);
i__8637 = G__8724;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8638),iter__8635.call(null,cljs.core.chunk_rest.call(null,s__8636__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8638),null);
}
} else
{var prev_call_args = cljs.core.first.call(null,s__8636__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"-differ?","-differ?",1135976441,null)], null),call_args,prev_call_args)], null),iter__8635.call(null,cljs.core.rest.call(null,s__8636__$2)));
}
} else
{return null;
}
break;
}
});})(vec__8633,vec__8634,rule,local_args,body,replacements,seqid,bound_body))
,null,null));
});})(vec__8633,vec__8634,rule,local_args,body,replacements,seqid,bound_body))
;return iter__7151__auto__.call(null,cljs.core.get.call(null,context,rule));
})(),bound_body);
});
datascript._q = (function _q(in_PLUS_sources,wheres,scope){while(true){
if(cljs.core.truth_(cljs.core.not_empty.call(null,in_PLUS_sources)))
{var vec__8652 = cljs.core.first.call(null,in_PLUS_sources);var in$ = cljs.core.nth.call(null,vec__8652,0,null);var source = cljs.core.nth.call(null,vec__8652,1,null);var pred__8653 = datascript.looks_like_QMARK_;var expr__8654 = in$;if(cljs.core.truth_(pred__8653.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1640531432,null),new cljs.core.Symbol(null,"...","...",-1640485849,null)], null),expr__8654)))
{return datascript.collect.call(null,((function (in_PLUS_sources,wheres,scope,pred__8653,expr__8654,vec__8652,in$,source){
return (function (p1__8639_SHARP_){return _q.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,in$),p1__8639_SHARP_], null)], null),cljs.core.next.call(null,in_PLUS_sources)),wheres,scope);
});})(in_PLUS_sources,wheres,scope,pred__8653,expr__8654,vec__8652,in$,source))
,source);
} else
{if(cljs.core.truth_(pred__8653.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null)], null),expr__8654)))
{return datascript.collect.call(null,((function (in_PLUS_sources,wheres,scope,pred__8653,expr__8654,vec__8652,in$,source){
return (function (p1__8640_SHARP_){return _q.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,in$),p1__8640_SHARP_], null)], null),cljs.core.next.call(null,in_PLUS_sources)),wheres,scope);
});})(in_PLUS_sources,wheres,scope,pred__8653,expr__8654,vec__8652,in$,source))
,source);
} else
{if(cljs.core.truth_(pred__8653.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null),expr__8654)))
{{
var G__8725 = cljs.core.concat.call(null,cljs.core.zipmap.call(null,in$,source),cljs.core.next.call(null,in_PLUS_sources));
var G__8726 = wheres;
var G__8727 = scope;
in_PLUS_sources = G__8725;
wheres = G__8726;
scope = G__8727;
continue;
}
} else
{if(cljs.core.truth_(pred__8653.call(null,new cljs.core.Symbol(null,"%","%",-1640531490,null),expr__8654)))
{var rules = ((typeof source === 'string')?cljs.reader.read_string.call(null,source):source);{
var G__8728 = cljs.core.next.call(null,in_PLUS_sources);
var G__8729 = wheres;
var G__8730 = cljs.core.assoc.call(null,scope,new cljs.core.Keyword(null,"__rules","__rules",2256051337),cljs.core.group_by.call(null,cljs.core.ffirst,rules));
in_PLUS_sources = G__8728;
wheres = G__8729;
scope = G__8730;
continue;
}
} else
{if(cljs.core.truth_(pred__8653.call(null,new cljs.core.Symbol(null,"_","_",-1640531432,null),expr__8654)))
{{
var G__8731 = cljs.core.next.call(null,in_PLUS_sources);
var G__8732 = wheres;
var G__8733 = cljs.core.assoc.call(null,scope,in$,source);
in_PLUS_sources = G__8731;
wheres = G__8732;
scope = G__8733;
continue;
}
} else
{throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__8654))));
}
}
}
}
}
} else
{if(cljs.core.truth_(cljs.core.not_empty.call(null,wheres)))
{var where = cljs.core.first.call(null,wheres);var temp__4124__auto__ = cljs.core.get.call(null,new cljs.core.Keyword(null,"__rules","__rules",2256051337).cljs$core$IFn$_invoke$arity$1(scope),cljs.core.first.call(null,where));if(cljs.core.truth_(temp__4124__auto__))
{var rule_branches = temp__4124__auto__;var vec__8656 = where;var rule = cljs.core.nth.call(null,vec__8656,0,null);var call_args = cljs.core.nthnext.call(null,vec__8656,1);var next_scope = cljs.core.update_in.call(null,cljs.core.update_in.call(null,scope,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"__rules_ctx","__rules_ctx",2834098801),rule], null),cljs.core.conj,call_args),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"__rules_ctx","__rules_ctx",2834098801),new cljs.core.Keyword(null,"__depth","__depth",2242649685)], null),cljs.core.inc);var next_wheres = cljs.core.next.call(null,wheres);return datascript.collect.call(null,((function (in_PLUS_sources,wheres,scope,vec__8656,rule,call_args,next_scope,next_wheres,rule_branches,temp__4124__auto__,where){
return (function (p1__8641_SHARP_){return _q.call(null,null,cljs.core.concat.call(null,datascript.bind_rule_branch.call(null,p1__8641_SHARP_,call_args,new cljs.core.Keyword(null,"__rules_ctx","__rules_ctx",2834098801).cljs$core$IFn$_invoke$arity$1(scope)),next_wheres),next_scope);
});})(in_PLUS_sources,wheres,scope,vec__8656,rule,call_args,next_scope,next_wheres,rule_branches,temp__4124__auto__,where))
,rule_branches);
} else
{var pred__8657 = datascript.looks_like_QMARK_;var expr__8658 = where;if(cljs.core.truth_(pred__8657.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null)], null),expr__8658)))
{if(cljs.core.truth_(datascript.call.call(null,cljs.core.first.call(null,where),scope)))
{{
var G__8734 = null;
var G__8735 = cljs.core.next.call(null,wheres);
var G__8736 = scope;
in_PLUS_sources = G__8734;
wheres = G__8735;
scope = G__8736;
continue;
}
} else
{return null;
}
} else
{if(cljs.core.truth_(pred__8657.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null),new cljs.core.Symbol(null,"_","_",-1640531432,null)], null),expr__8658)))
{var res = datascript.call.call(null,cljs.core.first.call(null,where),scope);{
var G__8737 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.second.call(null,where),res], null)], null);
var G__8738 = cljs.core.next.call(null,wheres);
var G__8739 = scope;
in_PLUS_sources = G__8737;
wheres = G__8738;
scope = G__8739;
continue;
}
} else
{if(cljs.core.truth_(pred__8657.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null),expr__8658)))
{var vec__8660 = datascript.parse_where.call(null,where);var source = cljs.core.nth.call(null,vec__8660,0,null);var where__$1 = cljs.core.nth.call(null,vec__8660,1,null);var found = datascript.search_datoms.call(null,source,where__$1,scope);return datascript.collect.call(null,((function (in_PLUS_sources,wheres,scope,vec__8660,source,where__$1,found,pred__8657,expr__8658,temp__4124__auto__,where){
return (function (p1__8642_SHARP_){return _q.call(null,null,cljs.core.next.call(null,wheres),datascript.populate_scope.call(null,scope,where__$1,p1__8642_SHARP_));
});})(in_PLUS_sources,wheres,scope,vec__8660,source,where__$1,found,pred__8657,expr__8658,temp__4124__auto__,where))
,found);
} else
{throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__8658))));
}
}
}
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.PersistentHashSet.fromArray([cljs.core.mapv.call(null,scope,new cljs.core.Keyword(null,"__find","__find",3824551179).cljs$core$IFn$_invoke$arity$1(scope))], true);
} else
{return null;
}
}
}
break;
}
});
datascript.built_in_aggregates = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Symbol(null,"distinct","distinct",-1351833419,null),cljs.core.comp.call(null,cljs.core.vec,cljs.core.distinct),new cljs.core.Symbol(null,"min","min",-1640423413,null),(function() {
var G__8740 = null;
var G__8740__1 = (function (coll){return cljs.core.reduce.call(null,cljs.core.min,coll);
});
var G__8740__2 = (function (n,coll){return cljs.core.vec.call(null,cljs.core.reduce.call(null,(function (acc,x){if((cljs.core.count.call(null,acc) < n))
{return cljs.core.sort.call(null,cljs.core.conj.call(null,acc,x));
} else
{if((x < cljs.core.last.call(null,acc)))
{return cljs.core.sort.call(null,cljs.core.conj.call(null,cljs.core.butlast.call(null,acc),x));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return acc;
} else
{return null;
}
}
}
}),cljs.core.PersistentVector.EMPTY,coll));
});
G__8740 = function(n,coll){
switch(arguments.length){
case 1:
return G__8740__1.call(this,n);
case 2:
return G__8740__2.call(this,n,coll);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__8740;
})()
,new cljs.core.Symbol(null,"max","max",-1640423651,null),(function() {
var G__8741 = null;
var G__8741__1 = (function (coll){return cljs.core.reduce.call(null,cljs.core.max,coll);
});
var G__8741__2 = (function (n,coll){return cljs.core.vec.call(null,cljs.core.reduce.call(null,(function (acc,x){if((cljs.core.count.call(null,acc) < n))
{return cljs.core.sort.call(null,cljs.core.conj.call(null,acc,x));
} else
{if((x > cljs.core.first.call(null,acc)))
{return cljs.core.sort.call(null,cljs.core.conj.call(null,cljs.core.next.call(null,acc),x));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return acc;
} else
{return null;
}
}
}
}),cljs.core.PersistentVector.EMPTY,coll));
});
G__8741 = function(n,coll){
switch(arguments.length){
case 1:
return G__8741__1.call(this,n);
case 2:
return G__8741__2.call(this,n,coll);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__8741;
})()
,new cljs.core.Symbol(null,"sum","sum",-1640417276,null),(function (p1__8661_SHARP_){return cljs.core.reduce.call(null,cljs.core._PLUS_,0,p1__8661_SHARP_);
}),new cljs.core.Symbol(null,"rand","rand",-1637038626,null),(function() {
var G__8742 = null;
var G__8742__1 = (function (coll){return cljs.core.rand_nth.call(null,coll);
});
var G__8742__2 = (function (n,coll){return cljs.core.vec.call(null,cljs.core.repeatedly.call(null,n,(function (){return cljs.core.rand_nth.call(null,coll);
})));
});
G__8742 = function(n,coll){
switch(arguments.length){
case 1:
return G__8742__1.call(this,n);
case 2:
return G__8742__2.call(this,n,coll);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__8742;
})()
,new cljs.core.Symbol(null,"sample","sample",1744760675,null),(function (n,coll){return cljs.core.vec.call(null,cljs.core.take.call(null,n,cljs.core.shuffle.call(null,coll)));
}),new cljs.core.Symbol(null,"count","count",-1545680184,null),cljs.core.count], null);
datascript.aggr_group_key = (function aggr_group_key(find,result){return cljs.core.mapv.call(null,(function (val,sym){if(cljs.core.sequential_QMARK_.call(null,sym))
{return null;
} else
{return val;
}
}),result,find);
});
datascript._aggregate = (function _aggregate(find,scope,results){return cljs.core.mapv.call(null,(function (sym,val,i){if(cljs.core.sequential_QMARK_.call(null,sym))
{var vec__8664 = sym;var f = cljs.core.nth.call(null,vec__8664,0,null);var args = cljs.core.nthnext.call(null,vec__8664,1);var vals = cljs.core.map.call(null,((function (vec__8664,f,args){
return (function (p1__8662_SHARP_){return cljs.core.get.call(null,p1__8662_SHARP_,i);
});})(vec__8664,f,args))
,results);var args__$1 = cljs.core.concat.call(null,datascript.bind_symbols.call(null,cljs.core.butlast.call(null,args),scope),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [vals], null));var f__$1 = (function (){var or__6426__auto__ = datascript.built_in_aggregates.call(null,f);if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return scope.call(null,f);
}
})();return cljs.core.apply.call(null,f__$1,args__$1);
} else
{return val;
}
}),find,cljs.core.first.call(null,results),cljs.core.range.call(null));
});
datascript.aggregate = (function aggregate(query,scope,results){var find = cljs.core.concat.call(null,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(query),new cljs.core.Keyword(null,"with","with",1017553976).cljs$core$IFn$_invoke$arity$1(query));return cljs.core.mapv.call(null,((function (find){
return (function (p__8668){var vec__8669 = p__8668;var _ = cljs.core.nth.call(null,vec__8669,0,null);var results__$1 = cljs.core.nth.call(null,vec__8669,1,null);return datascript._aggregate.call(null,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(query),scope,results__$1);
});})(find))
,cljs.core.group_by.call(null,((function (find){
return (function (p1__8665_SHARP_){return datascript.aggr_group_key.call(null,find,p1__8665_SHARP_);
});})(find))
,results));
});
datascript.parse_query = (function parse_query(query){var parsed = cljs.core.PersistentArrayMap.EMPTY;var key = null;var qs = query;while(true){
var temp__4124__auto__ = cljs.core.first.call(null,qs);if(cljs.core.truth_(temp__4124__auto__))
{var q = temp__4124__auto__;if((q instanceof cljs.core.Keyword))
{{
var G__8743 = parsed;
var G__8744 = q;
var G__8745 = cljs.core.next.call(null,qs);
parsed = G__8743;
key = G__8744;
qs = G__8745;
continue;
}
} else
{{
var G__8746 = cljs.core.update_in.call(null,parsed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),q);
var G__8747 = key;
var G__8748 = cljs.core.next.call(null,qs);
parsed = G__8746;
key = G__8747;
qs = G__8748;
continue;
}
}
} else
{return parsed;
}
break;
}
});
/**
* @param {...*} var_args
*/
datascript.q = (function() { 
var q__delegate = function (query,sources){var query__$1 = ((cljs.core.sequential_QMARK_.call(null,query))?datascript.parse_query.call(null,query):query);var ins__GT_sources = cljs.core.zipmap.call(null,new cljs.core.Keyword(null,"in","in",1013907607).cljs$core$IFn$_invoke$arity$2(query__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"$","$",-1640531491,null)], null)),sources);var find = cljs.core.concat.call(null,cljs.core.map.call(null,((function (query__$1,ins__GT_sources){
return (function (p1__8670_SHARP_){if(cljs.core.sequential_QMARK_.call(null,p1__8670_SHARP_))
{return cljs.core.last.call(null,p1__8670_SHARP_);
} else
{return p1__8670_SHARP_;
}
});})(query__$1,ins__GT_sources))
,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(query__$1)),new cljs.core.Keyword(null,"with","with",1017553976).cljs$core$IFn$_invoke$arity$1(query__$1));var results = datascript._q.call(null,ins__GT_sources,new cljs.core.Keyword(null,"where","where",1127002201).cljs$core$IFn$_invoke$arity$1(query__$1),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__find","__find",3824551179),find], null));var G__8673 = results;var G__8673__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"with","with",1017553976).cljs$core$IFn$_invoke$arity$1(query__$1))?cljs.core.mapv.call(null,((function (G__8673,query__$1,ins__GT_sources,find,results){
return (function (p1__8671_SHARP_){return cljs.core.subvec.call(null,p1__8671_SHARP_,0,cljs.core.count.call(null,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(query__$1)));
});})(G__8673,query__$1,ins__GT_sources,find,results))
,G__8673):G__8673);var G__8673__$2 = (cljs.core.truth_(cljs.core.not_empty.call(null,cljs.core.filter.call(null,cljs.core.sequential_QMARK_,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(query__$1))))?datascript.aggregate.call(null,query__$1,ins__GT_sources,G__8673__$1):G__8673__$1);return G__8673__$2;
};
var q = function (query,var_args){
var sources = null;if (arguments.length > 1) {
  sources = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return q__delegate.call(this,query,sources);};
q.cljs$lang$maxFixedArity = 1;
q.cljs$lang$applyTo = (function (arglist__8749){
var query = cljs.core.first(arglist__8749);
var sources = cljs.core.rest(arglist__8749);
return q__delegate(query,sources);
});
q.cljs$core$IFn$_invoke$arity$variadic = q__delegate;
return q;
})()
;
datascript.entity = (function entity(db,eid){var temp__4126__auto__ = cljs.core.not_empty.call(null,datascript._search.call(null,db,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [eid], null)));if(cljs.core.truth_(temp__4126__auto__))
{var datoms = temp__4126__auto__;return cljs.core.reduce.call(null,((function (datoms,temp__4126__auto__){
return (function (entity__$1,datom){var a = datom.a;var v = datom.v;if(datascript.multival_QMARK_.call(null,db,datom.a))
{return cljs.core.update_in.call(null,entity__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [a], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),v);
} else
{return cljs.core.assoc.call(null,entity__$1,a,v);
}
});})(datoms,temp__4126__auto__))
,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("db","id","db/id",1014111942),eid], null),datoms);
} else
{return null;
}
});
datascript.tx0 = 536870912;
/**
* @param {...*} var_args
*/
datascript.empty_db = (function() { 
var empty_db__delegate = function (p__8674){var vec__8676 = p__8674;var schema = cljs.core.nth.call(null,vec__8676,0,null);return (new datascript.DB(schema,datascript.btset.btset_by.call(null,datascript.cmp_datoms_eavt),datascript.btset.btset_by.call(null,datascript.cmp_datoms_aevt),datascript.btset.btset_by.call(null,datascript.cmp_datoms_avet),0,datascript.tx0));
};
var empty_db = function (var_args){
var p__8674 = null;if (arguments.length > 0) {
  p__8674 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return empty_db__delegate.call(this,p__8674);};
empty_db.cljs$lang$maxFixedArity = 0;
empty_db.cljs$lang$applyTo = (function (arglist__8750){
var p__8674 = cljs.core.seq(arglist__8750);
return empty_db__delegate(p__8674);
});
empty_db.cljs$core$IFn$_invoke$arity$variadic = empty_db__delegate;
return empty_db;
})()
;
/**
* @param {...*} var_args
*/
datascript.create_conn = (function() { 
var create_conn__delegate = function (p__8677){var vec__8679 = p__8677;var schema = cljs.core.nth.call(null,vec__8679,0,null);return cljs.core.atom.call(null,datascript.empty_db.call(null,schema),new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"listeners","listeners",4090152369),cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY)], null));
};
var create_conn = function (var_args){
var p__8677 = null;if (arguments.length > 0) {
  p__8677 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return create_conn__delegate.call(this,p__8677);};
create_conn.cljs$lang$maxFixedArity = 0;
create_conn.cljs$lang$applyTo = (function (arglist__8751){
var p__8677 = cljs.core.seq(arglist__8751);
return create_conn__delegate(p__8677);
});
create_conn.cljs$core$IFn$_invoke$arity$variadic = create_conn__delegate;
return create_conn;
})()
;
datascript.transact = (function transact(db,entities){return datascript.transact_entities.call(null,(new datascript.TxReport(db,db,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentArrayMap.EMPTY)),entities);
});
datascript.with$ = (function with$(db,entities){return new cljs.core.Keyword(null,"db-after","db-after",1658340159).cljs$core$IFn$_invoke$arity$1(datascript.transact.call(null,db,entities));
});
datascript._transact_BANG_ = (function _transact_BANG_(conn,entities){var report = cljs.core.atom.call(null,null);cljs.core.swap_BANG_.call(null,conn,((function (report){
return (function (db){var r = datascript.transact.call(null,db,entities);cljs.core.reset_BANG_.call(null,report,r);
return new cljs.core.Keyword(null,"db-after","db-after",1658340159).cljs$core$IFn$_invoke$arity$1(r);
});})(report))
);
return cljs.core.deref.call(null,report);
});
datascript.transact_BANG_ = (function transact_BANG_(conn,entities){var report = datascript._transact_BANG_.call(null,conn,entities);var seq__8686_8752 = cljs.core.seq.call(null,cljs.core.deref.call(null,new cljs.core.Keyword(null,"listeners","listeners",4090152369).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,conn))));var chunk__8687_8753 = null;var count__8688_8754 = 0;var i__8689_8755 = 0;while(true){
if((i__8689_8755 < count__8688_8754))
{var vec__8690_8756 = cljs.core._nth.call(null,chunk__8687_8753,i__8689_8755);var __8757 = cljs.core.nth.call(null,vec__8690_8756,0,null);var callback_8758 = cljs.core.nth.call(null,vec__8690_8756,1,null);callback_8758.call(null,report);
{
var G__8759 = seq__8686_8752;
var G__8760 = chunk__8687_8753;
var G__8761 = count__8688_8754;
var G__8762 = (i__8689_8755 + 1);
seq__8686_8752 = G__8759;
chunk__8687_8753 = G__8760;
count__8688_8754 = G__8761;
i__8689_8755 = G__8762;
continue;
}
} else
{var temp__4126__auto___8763 = cljs.core.seq.call(null,seq__8686_8752);if(temp__4126__auto___8763)
{var seq__8686_8764__$1 = temp__4126__auto___8763;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8686_8764__$1))
{var c__7182__auto___8765 = cljs.core.chunk_first.call(null,seq__8686_8764__$1);{
var G__8766 = cljs.core.chunk_rest.call(null,seq__8686_8764__$1);
var G__8767 = c__7182__auto___8765;
var G__8768 = cljs.core.count.call(null,c__7182__auto___8765);
var G__8769 = 0;
seq__8686_8752 = G__8766;
chunk__8687_8753 = G__8767;
count__8688_8754 = G__8768;
i__8689_8755 = G__8769;
continue;
}
} else
{var vec__8691_8770 = cljs.core.first.call(null,seq__8686_8764__$1);var __8771 = cljs.core.nth.call(null,vec__8691_8770,0,null);var callback_8772 = cljs.core.nth.call(null,vec__8691_8770,1,null);callback_8772.call(null,report);
{
var G__8773 = cljs.core.next.call(null,seq__8686_8764__$1);
var G__8774 = null;
var G__8775 = 0;
var G__8776 = 0;
seq__8686_8752 = G__8773;
chunk__8687_8753 = G__8774;
count__8688_8754 = G__8775;
i__8689_8755 = G__8776;
continue;
}
}
} else
{}
}
break;
}
return report;
});
datascript.listen_BANG_ = (function() {
var listen_BANG_ = null;
var listen_BANG___2 = (function (conn,callback){return listen_BANG_.call(null,conn,cljs.core.rand.call(null),callback);
});
var listen_BANG___3 = (function (conn,key,callback){cljs.core.swap_BANG_.call(null,new cljs.core.Keyword(null,"listeners","listeners",4090152369).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,conn)),cljs.core.assoc,key,callback);
return key;
});
listen_BANG_ = function(conn,key,callback){
switch(arguments.length){
case 2:
return listen_BANG___2.call(this,conn,key);
case 3:
return listen_BANG___3.call(this,conn,key,callback);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
listen_BANG_.cljs$core$IFn$_invoke$arity$2 = listen_BANG___2;
listen_BANG_.cljs$core$IFn$_invoke$arity$3 = listen_BANG___3;
return listen_BANG_;
})()
;
datascript.unlisten_BANG_ = (function unlisten_BANG_(conn,key){return cljs.core.swap_BANG_.call(null,new cljs.core.Keyword(null,"listeners","listeners",4090152369).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,conn)),cljs.core.dissoc,key);
});
datascript.components__GT_pattern = (function components__GT_pattern(index,cs){var G__8693 = (((index instanceof cljs.core.Keyword))?index.fqn:null);var caseval__8777;
switch (G__8693){
case "avet":
caseval__8777=(new datascript.Datom(cljs.core.nth.call(null,cs,2,null),cljs.core.nth.call(null,cs,0,null),cljs.core.nth.call(null,cs,1,null),cljs.core.nth.call(null,cs,3,null),null))
break;
case "aevt":
caseval__8777=(new datascript.Datom(cljs.core.nth.call(null,cs,1,null),cljs.core.nth.call(null,cs,0,null),cljs.core.nth.call(null,cs,2,null),cljs.core.nth.call(null,cs,3,null),null))
break;
case "eavt":
caseval__8777=(new datascript.Datom(cljs.core.nth.call(null,cs,0,null),cljs.core.nth.call(null,cs,1,null),cljs.core.nth.call(null,cs,2,null),cljs.core.nth.call(null,cs,3,null),null))
break;
default:
caseval__8777=(function(){throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(index))))})()
}
return caseval__8777;
});
/**
* @param {...*} var_args
*/
datascript.datoms = (function() { 
var datoms__delegate = function (db,index,cs){return datascript.btset.slice.call(null,cljs.core.get.call(null,db,index),datascript.components__GT_pattern.call(null,index,cs));
};
var datoms = function (db,index,var_args){
var cs = null;if (arguments.length > 2) {
  cs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return datoms__delegate.call(this,db,index,cs);};
datoms.cljs$lang$maxFixedArity = 2;
datoms.cljs$lang$applyTo = (function (arglist__8778){
var db = cljs.core.first(arglist__8778);
arglist__8778 = cljs.core.next(arglist__8778);
var index = cljs.core.first(arglist__8778);
var cs = cljs.core.rest(arglist__8778);
return datoms__delegate(db,index,cs);
});
datoms.cljs$core$IFn$_invoke$arity$variadic = datoms__delegate;
return datoms;
})()
;
/**
* @param {...*} var_args
*/
datascript.seek_datoms = (function() { 
var seek_datoms__delegate = function (db,index,cs){return datascript.btset.slice.call(null,cljs.core.get.call(null,db,index),datascript.components__GT_pattern.call(null,index,cs),(new datascript.Datom(null,null,null,null,null)));
};
var seek_datoms = function (db,index,var_args){
var cs = null;if (arguments.length > 2) {
  cs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return seek_datoms__delegate.call(this,db,index,cs);};
seek_datoms.cljs$lang$maxFixedArity = 2;
seek_datoms.cljs$lang$applyTo = (function (arglist__8779){
var db = cljs.core.first(arglist__8779);
arglist__8779 = cljs.core.next(arglist__8779);
var index = cljs.core.first(arglist__8779);
var cs = cljs.core.rest(arglist__8779);
return seek_datoms__delegate(db,index,cs);
});
seek_datoms.cljs$core$IFn$_invoke$arity$variadic = seek_datoms__delegate;
return seek_datoms;
})()
;
}
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.datascript')) {
goog.provide('lt.plugins.kukui.datascript');
goog.require('cljs.core');
goog.require('datascript');
goog.require('datascript');
/**
* A datascript connection
*/
lt.plugins.kukui.datascript.conn = null;
/**
* Holds a history of all entities with their TxReports
*/
lt.plugins.kukui.datascript.reports = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
lt.plugins.kukui.datascript.last_tx = (function last_tx(){return new cljs.core.Keyword(null,"tx-data","tx-data",4365248709).cljs$core$IFn$_invoke$arity$1(cljs.core.last.call(null,cljs.core.deref.call(null,lt.plugins.kukui.datascript.reports)));
});
/**
* @param {...*} var_args
*/
lt.plugins.kukui.datascript.reset_connection_BANG_ = (function() { 
var reset_connection_BANG___delegate = function (args){lt.plugins.kukui.datascript.conn = cljs.core.apply.call(null,datascript.create_conn,args);
cljs.core.reset_BANG_.call(null,lt.plugins.kukui.datascript.reports,cljs.core.PersistentVector.EMPTY);
return datascript.listen_BANG_.call(null,lt.plugins.kukui.datascript.conn,new cljs.core.Keyword(null,"db-history","db-history",3844499895),(function (p1__8889_SHARP_){return cljs.core.swap_BANG_.call(null,lt.plugins.kukui.datascript.reports,cljs.core.conj,p1__8889_SHARP_);
}));
};
var reset_connection_BANG_ = function (var_args){
var args = null;if (arguments.length > 0) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return reset_connection_BANG___delegate.call(this,args);};
reset_connection_BANG_.cljs$lang$maxFixedArity = 0;
reset_connection_BANG_.cljs$lang$applyTo = (function (arglist__8891){
var args = cljs.core.seq(arglist__8891);
return reset_connection_BANG___delegate(args);
});
reset_connection_BANG_.cljs$core$IFn$_invoke$arity$variadic = reset_connection_BANG___delegate;
return reset_connection_BANG_;
})()
;
lt.plugins.kukui.datascript.transact_BANG_ = (function transact_BANG_(records){return datascript.transact_BANG_.call(null,lt.plugins.kukui.datascript.conn,records);
});
/**
* @param {...*} var_args
*/
lt.plugins.kukui.datascript.q = (function() { 
var q__delegate = function (query,args){return cljs.core.apply.call(null,datascript.q,query,cljs.core.deref.call(null,lt.plugins.kukui.datascript.conn),args);
};
var q = function (query,var_args){
var args = null;if (arguments.length > 1) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return q__delegate.call(this,query,args);};
q.cljs$lang$maxFixedArity = 1;
q.cljs$lang$applyTo = (function (arglist__8892){
var query = cljs.core.first(arglist__8892);
var args = cljs.core.rest(arglist__8892);
return q__delegate(query,args);
});
q.cljs$core$IFn$_invoke$arity$variadic = q__delegate;
return q;
})()
;
/**
* @param {...*} var_args
*/
lt.plugins.kukui.datascript.qf = (function() { 
var qf__delegate = function (query,args){return cljs.core.map.call(null,cljs.core.first,cljs.core.apply.call(null,lt.plugins.kukui.datascript.q,query,args));
};
var qf = function (query,var_args){
var args = null;if (arguments.length > 1) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return qf__delegate.call(this,query,args);};
qf.cljs$lang$maxFixedArity = 1;
qf.cljs$lang$applyTo = (function (arglist__8893){
var query = cljs.core.first(arglist__8893);
var args = cljs.core.rest(arglist__8893);
return qf__delegate(query,args);
});
qf.cljs$core$IFn$_invoke$arity$variadic = qf__delegate;
return qf;
})()
;
lt.plugins.kukui.datascript.entity = (function entity(id){return datascript.entity.call(null,cljs.core.deref.call(null,lt.plugins.kukui.datascript.conn),id);
});
/**
* @param {...*} var_args
*/
lt.plugins.kukui.datascript.qe = (function() { 
var qe__delegate = function (query,args){return cljs.core.map.call(null,(function (p1__8890_SHARP_){return lt.plugins.kukui.datascript.entity.call(null,cljs.core.first.call(null,p1__8890_SHARP_));
}),cljs.core.apply.call(null,lt.plugins.kukui.datascript.q,query,args));
};
var qe = function (query,var_args){
var args = null;if (arguments.length > 1) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return qe__delegate.call(this,query,args);};
qe.cljs$lang$maxFixedArity = 1;
qe.cljs$lang$applyTo = (function (arglist__8894){
var query = cljs.core.first(arglist__8894);
var args = cljs.core.rest(arglist__8894);
return qe__delegate(query,args);
});
qe.cljs$core$IFn$_invoke$arity$variadic = qe__delegate;
return qe;
})()
;
/**
* Returns entity maps for given attr and value
*/
lt.plugins.kukui.datascript.find_by = (function find_by(attr,value){return lt.plugins.kukui.datascript.qe.call(null,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null)], null),attr,value);
});
/**
* Returns first entity map for given attr and value
*/
lt.plugins.kukui.datascript.find_first = (function find_first(attr,value){return cljs.core.first.call(null,lt.plugins.kukui.datascript.find_by.call(null,attr,value));
});
/**
* Returns all entities as maps
*/
lt.plugins.kukui.datascript.find_all = (function find_all(){return lt.plugins.kukui.datascript.qe.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null)], null)], null));
});
/**
* Return total entity count
*/
lt.plugins.kukui.datascript.count = (function count(){return cljs.core.ffirst.call(null,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null)),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null)], null)], null)));
});
var counter_8895 = cljs.core.atom.call(null,0);lt.plugins.kukui.datascript.tempid = ((function (counter_8895){
return (function tempid(){return cljs.core.swap_BANG_.call(null,counter_8895,cljs.core.dec);
});})(counter_8895))
;
}
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.util')) {
goog.provide('lt.plugins.kukui.util');
goog.require('cljs.core');
goog.require('lt.plugins.sacha.codemirror');
goog.require('lt.plugins.sacha.codemirror');
goog.require('clojure.string');
goog.require('clojure.string');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
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
lt.plugins.kukui.util.current_file = (function current_file(){return new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.editor.pool.last_active.call(null))));
});
/**
* Useful for printing list or vec of maps. Hack until actual cljs.pprint exists
*/
lt.plugins.kukui.util.pprint = (function pprint(data){return cljs.core.println.call(null,clojure.string.join.call(null,"\n",data));
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.db')) {
goog.provide('lt.plugins.kukui.db');
goog.require('cljs.core');
goog.require('lt.plugins.kukui.datascript');
goog.require('lt.plugins.kukui.datascript');
lt.plugins.kukui.db.unknown_type = "unknown";
lt.plugins.kukui.db.root_type = "type";
lt.plugins.kukui.db.lines_rule = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"lines","lines",-1537554248,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?first-line","?first-line",908436521,null),new cljs.core.Symbol(null,"?last-line","?last-line",830913829,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Symbol(null,"?line","?line",-1579027860,null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"<=","<=",-1640529606,null),new cljs.core.Symbol(null,"?first-line","?first-line",908436521,null),new cljs.core.Symbol(null,"?line","?line",-1579027860,null),new cljs.core.Symbol(null,"?last-line","?last-line",830913829,null))], null)], null)], null);
lt.plugins.kukui.db.rules = cljs.core.concat.call(null,lt.plugins.kukui.db.lines_rule);
lt.plugins.kukui.db.name_id_map = (function name_id_map(){return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?n","?n",-1640529464,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?n","?n",-1640529464,null)], null)], null)));
});
/**
* Returns nodes with :tags for given range of lines
*/
lt.plugins.kukui.db.__GT_nodes = (function __GT_nodes(lines){return cljs.core.map.call(null,(function (p__8898){var vec__8899 = p__8898;var id = cljs.core.nth.call(null,vec__8899,0,null);var tag_tuples = cljs.core.nth.call(null,vec__8899,1,null);return cljs.core.assoc.call(null,lt.plugins.kukui.datascript.entity.call(null,id),new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.set.call(null,cljs.core.map.call(null,cljs.core.second,tag_tuples)));
}),cljs.core.group_by.call(null,cljs.core.first,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?name","?name",-1578975997,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?name","?name",-1578975997,null)], null),cljs.core.list(new cljs.core.Symbol(null,"lines","lines",-1537554248,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null))], null),lt.plugins.kukui.db.rules,cljs.core.first.call(null,lines),cljs.core.last.call(null,lines))));
});
lt.plugins.kukui.db.attr_counts = (function attr_counts(lines,attr){return cljs.core.sort_by.call(null,cljs.core.comp.call(null,cljs.core._,cljs.core.second),lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null)),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null),cljs.core.list(new cljs.core.Symbol(null,"lines","lines",-1537554248,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null))], null),lt.plugins.kukui.db.rules,cljs.core.first.call(null,lines),cljs.core.last.call(null,lines),attr));
});
lt.plugins.kukui.db.tag_counts = (function tag_counts(lines){return cljs.core.reduce.call(null,(function (p1__8900_SHARP_,p2__8901_SHARP_){return cljs.core.assoc_in.call(null,p1__8900_SHARP_,cljs.core.butlast.call(null,p2__8901_SHARP_),cljs.core.last.call(null,p2__8901_SHARP_));
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.mapcat.call(null,cljs.core.identity,cljs.core.vals.call(null,cljs.core.group_by.call(null,cljs.core.first,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 14, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null)),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.Symbol(null,"?t","?t",-1640529458,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t","?t",-1640529458,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t","?t",-1640529458,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null)], null),cljs.core.list(new cljs.core.Symbol(null,"lines","lines",-1537554248,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null))], null),lt.plugins.kukui.db.rules,cljs.core.first.call(null,lines),cljs.core.last.call(null,lines))))));
});
/**
* Returns a list of types with each type having entity names of that type
*/
lt.plugins.kukui.db.types_and_names = (function types_and_names(){return cljs.core.map.call(null,(function (p__8904){var vec__8905 = p__8904;var type = cljs.core.nth.call(null,vec__8905,0,null);var pairs = cljs.core.nth.call(null,vec__8905,1,null);return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1017479852),type,new cljs.core.Keyword(null,"names","names",1118489274),cljs.core.map.call(null,cljs.core.second,pairs)], null);
}),cljs.core.group_by.call(null,cljs.core.first,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Symbol(null,"?name","?name",-1578975997,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?children","?children",2113480951,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?children","?children",2113480951,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?name","?name",-1578975997,null)], null)], null))));
});
lt.plugins.kukui.db.must_have_unique_name = (function must_have_unique_name(entities){var existing_tags = lt.plugins.kukui.db.name_id_map.call(null);var names = cljs.core.set.call(null,cljs.core.keys.call(null,existing_tags));var invalid = cljs.core.filter.call(null,((function (existing_tags,names){
return (function (p1__8906_SHARP_){var and__6414__auto__ = new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__8906_SHARP_);if(cljs.core.truth_(and__6414__auto__))
{return cljs.core.contains_QMARK_.call(null,names,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__8906_SHARP_));
} else
{return and__6414__auto__;
}
});})(existing_tags,names))
,entities);var invalid__$1 = cljs.core.into.call(null,invalid,cljs.core.mapcat.call(null,((function (existing_tags,names,invalid){
return (function (p1__8907_SHARP_){if((cljs.core.count.call(null,p1__8907_SHARP_) > 1))
{return p1__8907_SHARP_;
} else
{return null;
}
});})(existing_tags,names,invalid))
,cljs.core.vals.call(null,cljs.core.group_by.call(null,new cljs.core.Keyword(null,"name","name",1017277949),cljs.core.filter.call(null,new cljs.core.Keyword(null,"name","name",1017277949),entities)))));if(cljs.core.seq.call(null,invalid__$1))
{cljs.core.prn.call(null,"INVALID",invalid__$1);
throw cljs.core.ex_info.call(null,("Names must be unique: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.map.call(null,new cljs.core.Keyword(null,"name","name",1017277949),invalid__$1))),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"names","names",1118489274),cljs.core.map.call(null,new cljs.core.Keyword(null,"name","name",1017277949),invalid__$1)], null));
} else
{}
return entities;
});
lt.plugins.kukui.db.must_require_type = (function must_require_type(entities){var invalid = cljs.core.remove.call(null,new cljs.core.Keyword(null,"type","type",1017479852),cljs.core.remove.call(null,(function (p1__8908_SHARP_){return (cljs.core.integer_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__8908_SHARP_))) || (cljs.core.seq.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__8908_SHARP_)));
}),entities));if(cljs.core.seq.call(null,invalid))
{cljs.core.prn.call(null,"INVALID",invalid);
throw cljs.core.ex_info.call(null,("Type must be present"),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"invalid","invalid",2973689193),invalid], null));
} else
{}
return entities;
});
lt.plugins.kukui.db.init = (function init(){lt.plugins.kukui.datascript.reset_connection_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("db","valueType","db/valueType",4543387286),new cljs.core.Keyword("db.type","ref","db.type/ref",2629452693),new cljs.core.Keyword("db","cardinality","db/cardinality",1859321681),new cljs.core.Keyword("db.cardinality","many","db.cardinality/many",2499141178)], null)], null));
return lt.plugins.kukui.datascript.transact_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),lt.plugins.kukui.db.root_type,new cljs.core.Keyword(null,"type","type",1017479852),lt.plugins.kukui.db.root_type], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),lt.plugins.kukui.db.unknown_type,new cljs.core.Keyword(null,"type","type",1017479852),lt.plugins.kukui.db.root_type], null)], null));
});
lt.plugins.kukui.db.init.call(null);
}
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.sync')) {
goog.provide('lt.plugins.kukui.sync');
goog.require('cljs.core');
goog.require('clojure.set');
goog.require('clojure.set');
goog.require('lt.plugins.kukui.datascript');
goog.require('lt.plugins.kukui.datascript');
goog.require('lt.plugins.kukui.db');
goog.require('lt.plugins.kukui.db');
/**
* Given a tag name and a number of data structures it could be in,
* return an existing or new :db/id for it
*/
lt.plugins.kukui.sync.__GT_tag_id = (function __GT_tag_id(entities,existing_tags,new_tags,tag_name){var or__6426__auto__ = cljs.core.get.call(null,existing_tags,tag_name);if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{var or__6426__auto____$1 = cljs.core.get.call(null,cljs.core.deref.call(null,new_tags),tag_name);if(cljs.core.truth_(or__6426__auto____$1))
{return or__6426__auto____$1;
} else
{var or__6426__auto____$2 = new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,cljs.core.filter.call(null,((function (or__6426__auto____$1,or__6426__auto__){
return (function (p1__11358_SHARP_){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__11358_SHARP_),tag_name);
});})(or__6426__auto____$1,or__6426__auto__))
,entities)));if(cljs.core.truth_(or__6426__auto____$2))
{return or__6426__auto____$2;
} else
{var id = lt.plugins.kukui.datascript.tempid.call(null);cljs.core.swap_BANG_.call(null,new_tags,cljs.core.assoc,tag_name,id);
return id;
}
}
}
});
lt.plugins.kukui.sync.expand_tags = (function expand_tags(entities){var new_tags = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var entities__$1 = cljs.core.map.call(null,((function (new_tags){
return (function (p1__11359_SHARP_){return cljs.core.assoc.call(null,p1__11359_SHARP_,new cljs.core.Keyword("db","id","db/id",1014111942),lt.plugins.kukui.datascript.tempid.call(null));
});})(new_tags))
,entities);var tag_id = cljs.core.partial.call(null,lt.plugins.kukui.sync.__GT_tag_id,entities__$1,lt.plugins.kukui.db.name_id_map.call(null),new_tags);var entities_with_tags = cljs.core.doall.call(null,cljs.core.mapcat.call(null,((function (new_tags,entities__$1,tag_id){
return (function (ent){return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.dissoc.call(null,ent,new cljs.core.Keyword(null,"tags","tags",1017456523))], null),cljs.core.map.call(null,((function (new_tags,entities__$1,tag_id){
return (function (p1__11360_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword("db","id","db/id",1014111942),new cljs.core.Keyword(null,"tags","tags",1017456523)],[new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(ent),tag_id.call(null,p1__11360_SHARP_)]);
});})(new_tags,entities__$1,tag_id))
,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(ent)));
});})(new_tags,entities__$1,tag_id))
,entities__$1));return cljs.core.into.call(null,cljs.core.map.call(null,((function (new_tags,entities__$1,tag_id,entities_with_tags){
return (function (p__11363){var vec__11364 = p__11363;var tag = cljs.core.nth.call(null,vec__11364,0,null);var id = cljs.core.nth.call(null,vec__11364,1,null);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("db","id","db/id",1014111942),id,new cljs.core.Keyword(null,"name","name",1017277949),tag,new cljs.core.Keyword(null,"type","type",1017479852),lt.plugins.kukui.db.unknown_type], null);
});})(new_tags,entities__$1,tag_id,entities_with_tags))
,cljs.core.deref.call(null,new_tags)),entities_with_tags);
});
lt.plugins.kukui.sync.add_types = (function add_types(entities){var existing_types = cljs.core.set.call(null,lt.plugins.kukui.datascript.qf.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null)], null)));return cljs.core.into.call(null,entities,cljs.core.map.call(null,((function (existing_types){
return (function (p1__11366_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"type","type",1017479852)],[p1__11366_SHARP_,lt.plugins.kukui.db.root_type]);
});})(existing_types))
,cljs.core.remove.call(null,((function (existing_types){
return (function (p1__11365_SHARP_){return cljs.core.contains_QMARK_.call(null,existing_types,p1__11365_SHARP_);
});})(existing_types))
,cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"type","type",1017479852),entities)))));
});
lt.plugins.kukui.sync.add_ids_by_line = (function add_ids_by_line(nodes){var line_entities = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?l","?l",-1640529466,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Symbol(null,"?l","?l",-1640529466,null)], null)], null)));return cljs.core.map.call(null,((function (line_entities){
return (function (p1__11367_SHARP_){if(cljs.core.truth_(new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(p1__11367_SHARP_)))
{return p1__11367_SHARP_;
} else
{return cljs.core.assoc.call(null,p1__11367_SHARP_,new cljs.core.Keyword("db","id","db/id",1014111942),cljs.core.get.call(null,line_entities,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(p1__11367_SHARP_)));
}
});})(line_entities))
,nodes);
});
lt.plugins.kukui.sync.node_diff_STAR_ = (function node_diff_STAR_(nodes1,nodes2){var old_nodes = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,cljs.core.juxt.call(null,new cljs.core.Keyword(null,"text","text",1017460895),cljs.core.identity),nodes1));var name_entities = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (old_nodes){
return (function (p__11370){var vec__11371 = p__11370;var name = cljs.core.nth.call(null,vec__11371,0,null);var id = cljs.core.nth.call(null,vec__11371,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [name,lt.plugins.kukui.datascript.entity.call(null,id)], null);
});})(old_nodes))
,lt.plugins.kukui.db.name_id_map.call(null)));var changes = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"deleted","deleted",2564367243),clojure.set.difference.call(null,cljs.core.set.call(null,nodes1),cljs.core.set.call(null,nodes2))], null);return cljs.core.reduce.call(null,((function (old_nodes,name_entities,changes){
return (function (accum,node){var old_node = cljs.core.get.call(null,old_nodes,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node));if(cljs.core.truth_((function (){var temp__4126__auto__ = cljs.core.get.call(null,name_entities,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(node));if(cljs.core.truth_(temp__4126__auto__))
{var existing = temp__4126__auto__;return cljs.core.not_EQ_.call(null,cljs.core.dissoc.call(null,existing,new cljs.core.Keyword("db","id","db/id",1014111942)),cljs.core.dissoc.call(null,node,new cljs.core.Keyword(null,"tags","tags",1017456523)));
} else
{return null;
}
})()))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"updated","updated",779473965)], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),cljs.core.assoc.call(null,cljs.core.dissoc.call(null,node,new cljs.core.Keyword(null,"tags","tags",1017456523)),new cljs.core.Keyword("db","id","db/id",1014111942),new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,name_entities,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(node)))));
} else
{if((old_node == null))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"added","added",1106564210)], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),node);
} else
{if(cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(old_node),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(node)))
{return cljs.core.update_in.call(null,cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"updated","updated",779473965)], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(old_node),new cljs.core.Keyword(null,"new-line","new-line",2344820595),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(node)], null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"deleted","deleted",2564367243)], null),cljs.core.disj,old_node);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return accum;
} else
{return null;
}
}
}
}
});})(old_nodes,name_entities,changes))
,changes,nodes2);
});
lt.plugins.kukui.sync.node_diff = (function node_diff(nodes1,nodes2){return cljs.core.update_in.call(null,cljs.core.update_in.call(null,cljs.core.update_in.call(null,lt.plugins.kukui.sync.node_diff_STAR_.call(null,nodes1,nodes2),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"updated","updated",779473965)], null),lt.plugins.kukui.sync.add_ids_by_line),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"updated","updated",779473965)], null),(function (nodes){return cljs.core.map.call(null,(function (p1__11372_SHARP_){if(cljs.core.truth_(new cljs.core.Keyword(null,"new-line","new-line",2344820595).cljs$core$IFn$_invoke$arity$1(p1__11372_SHARP_)))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("db","id","db/id",1014111942),new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(p1__11372_SHARP_),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"new-line","new-line",2344820595).cljs$core$IFn$_invoke$arity$1(p1__11372_SHARP_)], null);
} else
{return p1__11372_SHARP_;
}
}),nodes);
})),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"deleted","deleted",2564367243)], null),lt.plugins.kukui.sync.add_ids_by_line);
});
lt.plugins.kukui.sync.__GT_new_entities = (function __GT_new_entities(nodes){return lt.plugins.kukui.db.must_require_type.call(null,lt.plugins.kukui.db.must_have_unique_name.call(null,lt.plugins.kukui.sync.expand_tags.call(null,lt.plugins.kukui.sync.add_types.call(null,nodes))));
});
lt.plugins.kukui.sync.must_have_ids = (function must_have_ids(entities){var temp__4126__auto___11379 = cljs.core.seq.call(null,cljs.core.remove.call(null,new cljs.core.Keyword("db","id","db/id",1014111942),entities));if(temp__4126__auto___11379)
{var invalid_entities_11380 = temp__4126__auto___11379;cljs.core.prn.call(null,"Invalid entities",invalid_entities_11380);
throw cljs.core.ex_info.call(null,("Cannot update these entities without their ids: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,invalid_entities_11380))),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"invalid","invalid",2973689193),invalid_entities_11380], null));
} else
{}
return entities;
});
/**
* Maps files to their last few node snapshots.
* Used to determine what changed since last edit.
*/
lt.plugins.kukui.sync.last_edits = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lt.plugins.kukui.sync.sync_entities = (function sync_entities(nodes,file){var map__11375 = lt.plugins.kukui.sync.node_diff.call(null,cljs.core.last.call(null,cljs.core.get.call(null,cljs.core.deref.call(null,lt.plugins.kukui.sync.last_edits),file)),nodes);var map__11375__$1 = ((cljs.core.seq_QMARK_.call(null,map__11375))?cljs.core.apply.call(null,cljs.core.hash_map,map__11375):map__11375);var updated = cljs.core.get.call(null,map__11375__$1,new cljs.core.Keyword(null,"updated","updated",779473965));var deleted = cljs.core.get.call(null,map__11375__$1,new cljs.core.Keyword(null,"deleted","deleted",2564367243));var added = cljs.core.get.call(null,map__11375__$1,new cljs.core.Keyword(null,"added","added",1106564210));return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"added","added",1106564210),lt.plugins.kukui.sync.__GT_new_entities.call(null,added),new cljs.core.Keyword(null,"updated","updated",779473965),lt.plugins.kukui.sync.must_have_ids.call(null,updated),new cljs.core.Keyword(null,"deleted","deleted",2564367243),cljs.core.mapv.call(null,((function (map__11375,map__11375__$1,updated,deleted,added){
return (function (p1__11373_SHARP_){return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword("db.fn","retractEntity","db.fn/retractEntity",4213852396),new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(p1__11373_SHARP_)],null));
});})(map__11375,map__11375__$1,updated,deleted,added))
,lt.plugins.kukui.sync.must_have_ids.call(null,deleted))], null);
});
lt.plugins.kukui.sync.save_latest_edit = (function save_latest_edit(nodes,file){return cljs.core.swap_BANG_.call(null,lt.plugins.kukui.sync.last_edits,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file], null),(function (p1__11376_SHARP_){return cljs.core.concat.call(null,cljs.core.take_last.call(null,2,p1__11376_SHARP_),cljs.core._conj.call(null,cljs.core.List.EMPTY,nodes));
}));
});
lt.plugins.kukui.sync.sync = (function sync(nodes,file){var map__11378 = lt.plugins.kukui.sync.sync_entities.call(null,nodes,file);var map__11378__$1 = ((cljs.core.seq_QMARK_.call(null,map__11378))?cljs.core.apply.call(null,cljs.core.hash_map,map__11378):map__11378);var updated = cljs.core.get.call(null,map__11378__$1,new cljs.core.Keyword(null,"updated","updated",779473965));var deleted = cljs.core.get.call(null,map__11378__$1,new cljs.core.Keyword(null,"deleted","deleted",2564367243));var added = cljs.core.get.call(null,map__11378__$1,new cljs.core.Keyword(null,"added","added",1106564210));cljs.core.println.call(null,"Added/deleted/updated: ",cljs.core.count.call(null,added),"/",cljs.core.count.call(null,deleted),"/",cljs.core.count.call(null,updated));
lt.plugins.kukui.datascript.transact_BANG_.call(null,deleted);
var tx_report = lt.plugins.kukui.datascript.transact_BANG_.call(null,cljs.core.into.call(null,updated,added));lt.plugins.kukui.sync.save_latest_edit.call(null,nodes,file);
return tx_report;
});
lt.plugins.kukui.sync.reset_sync_BANG_ = (function reset_sync_BANG_(){lt.plugins.kukui.db.init.call(null);
return cljs.core.reset_BANG_.call(null,lt.plugins.kukui.sync.last_edits,cljs.core.PersistentArrayMap.EMPTY);
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.live')) {
goog.provide('lt.plugins.kukui.live');
goog.require('cljs.core');
goog.require('lt.plugins.kukui.node');
goog.require('lt.objs.command');
goog.require('lt.plugins.sacha.codemirror');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.plugins.kukui.db');
goog.require('clojure.set');
goog.require('lt.plugins.kukui.util');
goog.require('lt.objs.command');
goog.require('lt.plugins.sacha.codemirror');
goog.require('lt.plugins.kukui.db');
goog.require('clojure.set');
goog.require('lt.plugins.kukui.util');
goog.require('lt.objs.editor');
goog.require('lt.plugins.kukui.node');
lt.plugins.kukui.live.leftover_tag = "leftover";
/**
* Reduces a type's nodes to a tag map with a reducer fn.
*/
lt.plugins.kukui.live.type_nodes__GT_tag_map = (function type_nodes__GT_tag_map(f,types,nodes){return cljs.core.reduce.call(null,(function (accum,node){var type_tags = clojure.set.intersection.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(node),cljs.core.set.call(null,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(types)));var type_tags__$1 = ((cljs.core.empty_QMARK_.call(null,type_tags))?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.kukui.live.leftover_tag], null):type_tags);return cljs.core.reduce.call(null,((function (type_tags,type_tags__$1){
return (function (p1__9713_SHARP_,p2__9714_SHARP_){return f.call(null,p1__9713_SHARP_,p2__9714_SHARP_,node);
});})(type_tags,type_tags__$1))
,accum,type_tags__$1);
}),cljs.core.PersistentArrayMap.EMPTY,nodes);
});
lt.plugins.kukui.live.type_counts = cljs.core.partial.call(null,lt.plugins.kukui.live.type_nodes__GT_tag_map,(function (p1__9715_SHARP_,p2__9716_SHARP_){return cljs.core.update_in.call(null,p1__9715_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p2__9716_SHARP_], null),cljs.core.inc);
}));
lt.plugins.kukui.live.types_counts = (function types_counts(ed,lines){var nodes = lt.plugins.kukui.node.ed__GT_nodes.call(null,ed,lines);var types = lt.plugins.kukui.db.types_and_names.call(null);return cljs.core.keep.call(null,((function (nodes,types){
return (function (p1__9717_SHARP_){var counts = lt.plugins.kukui.live.type_counts.call(null,cljs.core.some.call(null,((function (nodes,types){
return (function (x){if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(x),p1__9717_SHARP_))
{return x;
} else
{return null;
}
});})(nodes,types))
,types),nodes);if(cljs.core.truth_((function (){var and__6414__auto__ = cljs.core._EQ_.call(null,1,cljs.core.count.call(null,counts));if(and__6414__auto__)
{return cljs.core.get.call(null,counts,lt.plugins.kukui.live.leftover_tag);
} else
{return and__6414__auto__;
}
})()))
{return null;
} else
{return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[p1__9717_SHARP_,counts],null));
}
});})(nodes,types))
,cljs.core.map.call(null,new cljs.core.Keyword(null,"type","type",1017479852),types));
});
/**
* For given lines, returns map of tags and how many nodes have that tag.
*/
lt.plugins.kukui.live.__GT_tagged_counts = (function __GT_tagged_counts(ed,lines){return cljs.core.frequencies.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523),lt.plugins.kukui.node.ed__GT_nodes.call(null,ed,lines)));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.tag-counts","kukui.tag-counts",2395081538),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: tag counts in current branch's nodes",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var lines = cljs.core.range.call(null,line,lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line));return cljs.core.prn.call(null,lt.plugins.kukui.live.__GT_tagged_counts.call(null,ed,null));
})], null));
/**
* Different than type-counts in that this only counts total for each type
* and is only based on explicit tags - no defaults are taken into account.
* Also, one node gets counted for each of its tags.
*/
lt.plugins.kukui.live.total_types_counts = (function total_types_counts(ed,lines){var line = lt.objs.editor.cursor.call(null,ed).line;var lines__$1 = (function (){var or__6426__auto__ = lines;if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return cljs.core.range.call(null,line,lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line));
}
})();var tagged_counts = lt.plugins.kukui.live.__GT_tagged_counts.call(null,ed,lines__$1);var types = lt.plugins.kukui.db.types_and_names.call(null);var find_type = ((function (line,lines__$1,tagged_counts,types){
return (function (tag){return cljs.core.some.call(null,((function (line,lines__$1,tagged_counts,types){
return (function (p1__9718_SHARP_){if(cljs.core.contains_QMARK_.call(null,cljs.core.set.call(null,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(p1__9718_SHARP_)),tag))
{return new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(p1__9718_SHARP_);
} else
{return null;
}
});})(line,lines__$1,tagged_counts,types))
,types);
});})(line,lines__$1,tagged_counts,types))
;return cljs.core.reduce_kv.call(null,((function (line,lines__$1,tagged_counts,types,find_type){
return (function (accum,tag,count){return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [find_type.call(null,tag)], null),cljs.core.fnil.call(null,cljs.core._PLUS_,0),count);
});})(line,lines__$1,tagged_counts,types,find_type))
,cljs.core.PersistentArrayMap.EMPTY,tagged_counts);
});
lt.plugins.kukui.live.attribute_counts_STAR_ = (function attribute_counts_STAR_(nodes,attr){cljs.core.println.call(null,"Attribute:",attr,"exists for",cljs.core.count.call(null,cljs.core.filter.call(null,attr,nodes)),"of",cljs.core.count.call(null,nodes),"nodes");
return cljs.core.prn.call(null,cljs.core.reduce.call(null,(function (accum,val){return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [val], null),cljs.core.inc);
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,attr,nodes)));
});
lt.plugins.kukui.live.attribute_counts = (function attribute_counts(nodes){var seq__9723 = cljs.core.seq.call(null,cljs.core.disj.call(null,cljs.core.set.call(null,cljs.core.mapcat.call(null,cljs.core.keys,nodes)),new cljs.core.Keyword(null,"desc","desc",1016984067),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.Keyword(null,"indent","indent",4124632094),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"text","text",1017460895)));var chunk__9724 = null;var count__9725 = 0;var i__9726 = 0;while(true){
if((i__9726 < count__9725))
{var attr = cljs.core._nth.call(null,chunk__9724,i__9726);lt.plugins.kukui.live.attribute_counts_STAR_.call(null,nodes,attr);
{
var G__9727 = seq__9723;
var G__9728 = chunk__9724;
var G__9729 = count__9725;
var G__9730 = (i__9726 + 1);
seq__9723 = G__9727;
chunk__9724 = G__9728;
count__9725 = G__9729;
i__9726 = G__9730;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__9723);if(temp__4126__auto__)
{var seq__9723__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9723__$1))
{var c__7182__auto__ = cljs.core.chunk_first.call(null,seq__9723__$1);{
var G__9731 = cljs.core.chunk_rest.call(null,seq__9723__$1);
var G__9732 = c__7182__auto__;
var G__9733 = cljs.core.count.call(null,c__7182__auto__);
var G__9734 = 0;
seq__9723 = G__9731;
chunk__9724 = G__9732;
count__9725 = G__9733;
i__9726 = G__9734;
continue;
}
} else
{var attr = cljs.core.first.call(null,seq__9723__$1);lt.plugins.kukui.live.attribute_counts_STAR_.call(null,nodes,attr);
{
var G__9735 = cljs.core.next.call(null,seq__9723__$1);
var G__9736 = null;
var G__9737 = 0;
var G__9738 = 0;
seq__9723 = G__9735;
chunk__9724 = G__9736;
count__9725 = G__9737;
i__9726 = G__9738;
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
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.types-counts","kukui.types-counts",4251463491),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: tag counts of each type for current branch or selection",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var nodes = lt.plugins.kukui.node.ed__GT_nodes.call(null,ed,null);lt.plugins.kukui.util.pprint.call(null,lt.plugins.kukui.live.types_counts.call(null,ed,null));
cljs.core.prn.call(null,cljs.core.assoc.call(null,lt.plugins.kukui.live.total_types_counts.call(null,ed,null),"untagged",cljs.core.count.call(null,cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.empty_QMARK_,new cljs.core.Keyword(null,"tags","tags",1017456523)),nodes)),"nodes",cljs.core.count.call(null,nodes)));
return lt.plugins.kukui.live.attribute_counts.call(null,nodes);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.all-types-counts","kukui.all-types-counts",2670019439),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Same as types-counts but for whole file",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var lines = cljs.core.range.call(null,lt.objs.editor.first_line.call(null,ed),(lt.objs.editor.last_line.call(null,ed) + 1));var nodes = lt.plugins.kukui.node.ed__GT_nodes.call(null,ed,lines);lt.plugins.kukui.util.pprint.call(null,lt.plugins.kukui.live.types_counts.call(null,ed,lines));
cljs.core.prn.call(null,cljs.core.assoc.call(null,lt.plugins.kukui.live.total_types_counts.call(null,ed,lines),"untagged",cljs.core.count.call(null,cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.empty_QMARK_,new cljs.core.Keyword(null,"tags","tags",1017456523)),nodes)),"nodes",cljs.core.count.call(null,nodes)));
return lt.plugins.kukui.live.attribute_counts.call(null,nodes);
})], null));
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
lt.plugins.kukui.selector.selector = (function selector(opts){var G__8941 = lt.objs.sidebar.command.filter_list.call(null,opts);lt.object.add_behavior_BANG_.call(null,G__8941,new cljs.core.Keyword("lt.plugins.kukui.selector","set-selected","lt.plugins.kukui.selector/set-selected",3025761911));
return G__8941;
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui')) {
goog.provide('lt.plugins.kukui');
goog.require('cljs.core');
goog.require('lt.plugins.kukui.node');
goog.require('lt.plugins.kukui.core');
goog.require('lt.plugins.kukui.core');
goog.require('lt.plugins.kukui.live');
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
goog.require('lt.plugins.kukui.live');
goog.require('clojure.set');
goog.require('lt.plugins.sacha');
goog.require('lt.plugins.kukui.util');
goog.require('lt.objs.command');
goog.require('lt.plugins.kukui.sync');
goog.require('lt.plugins.kukui.sync');
goog.require('clojure.string');
goog.require('lt.plugins.sacha.codemirror');
goog.require('lt.plugins.kukui.db');
goog.require('clojure.set');
goog.require('lt.plugins.kukui.util');
goog.require('clojure.string');
goog.require('lt.objs.notifos');
goog.require('lt.plugins.kukui.datascript');
goog.require('lt.objs.editor');
goog.require('lt.plugins.kukui.node');
goog.require('lt.plugins.kukui.datascript');
lt.plugins.kukui.db__GT_nodes = (function db__GT_nodes(ed,lines){return lt.plugins.kukui.db.__GT_nodes.call(null,(function (){var or__6426__auto__ = lines;if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{var temp__4124__auto__ = lt.objs.editor.selection_bounds.call(null,ed);if(cljs.core.truth_(temp__4124__auto__))
{var selection = temp__4124__auto__;return cljs.core.range.call(null,cljs.core.get_in.call(null,selection,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"from","from",1017056028),new cljs.core.Keyword(null,"line","line",1017226086)], null)),(cljs.core.get_in.call(null,selection,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"to","to",1013907949),new cljs.core.Keyword(null,"line","line",1017226086)], null)) + 1));
} else
{var line = lt.objs.editor.cursor.call(null,ed).line;return cljs.core.range.call(null,line,lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line));
}
}
})());
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.db-tag-counts","kukui.db-tag-counts",952239967),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: db tag counts in current branch's nodes",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);return cljs.core.prn.call(null,cljs.core.frequencies.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523),lt.plugins.kukui.db__GT_nodes.call(null,ed,null))));
})], null));
lt.plugins.kukui.db_types_counts = (function db_types_counts(lines){var nodes = lt.plugins.kukui.db.__GT_nodes.call(null,lines);cljs.core.println.call(null,"Tag counts");
lt.plugins.kukui.util.pprint.call(null,lt.plugins.kukui.db.tag_counts.call(null,lines));
cljs.core.println.call(null,"Tag counts by type");
cljs.core.prn.call(null,cljs.core.map.call(null,((function (nodes){
return (function (p__10312){var vec__10313 = p__10312;var type = cljs.core.nth.call(null,vec__10313,0,null);var tag_map = cljs.core.nth.call(null,vec__10313,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.apply.call(null,cljs.core._PLUS_,cljs.core.vals.call(null,tag_map))], null);
});})(nodes))
,lt.plugins.kukui.db.tag_counts.call(null,lines)));
cljs.core.prn.call(null,"Misc counts",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"untagged","untagged",1019174071),cljs.core.count.call(null,cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.empty_QMARK_,new cljs.core.Keyword(null,"tags","tags",1017456523)),nodes)),new cljs.core.Keyword(null,"nodes","nodes",1118897699),cljs.core.count.call(null,nodes)], null));
cljs.core.println.call(null,"Type counts");
return lt.plugins.kukui.util.pprint.call(null,lt.plugins.kukui.db.attr_counts.call(null,lines,new cljs.core.Keyword(null,"type","type",1017479852)));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.db-types-counts","kukui.db-types-counts",660183072),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: db tag counts of each type for current branch or selection",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var lines = cljs.core.range.call(null,line,lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line));return lt.plugins.kukui.db_types_counts.call(null,lines);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.db-all-types-counts","kukui.db-all-types-counts",776795596),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Same as types-counts but for whole file",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var lines = cljs.core.range.call(null,lt.objs.editor.first_line.call(null,ed),(lt.objs.editor.last_line.call(null,ed) + 1));return lt.plugins.kukui.db_types_counts.call(null,lines);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.debug-nodes","kukui.debug-nodes",1810794576),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: prints nodes for current branch or selection",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.kukui.util.pprint.call(null,lt.plugins.kukui.node.ed__GT_nodes.call(null,lt.objs.editor.pool.last_active.call(null)));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.debug-db-nodes","kukui.debug-db-nodes",2422407879),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: prints db nodes for current branch or selection",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.kukui.util.pprint.call(null,lt.plugins.kukui.db__GT_nodes.call(null,lt.objs.editor.pool.last_active.call(null),null));
})], null));
lt.plugins.kukui.type_map = cljs.core.partial.call(null,lt.plugins.kukui.live.type_nodes__GT_tag_map,(function (p1__10314_SHARP_,p2__10315_SHARP_,p3__10316_SHARP_){return cljs.core.update_in.call(null,p1__10314_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p2__10315_SHARP_], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),p3__10316_SHARP_);
}));
lt.plugins.kukui.add_tags_to_node = (function add_tags_to_node(node,tags){return cljs.core.update_in.call(null,node,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",1017460895)], null),cljs.core.str,clojure.string.join.call(null,cljs.core.map.call(null,(function (p1__10317_SHARP_){return (" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__10317_SHARP_));
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
return (function (p__10335){var vec__10336 = p__10335;var node = cljs.core.nth.call(null,vec__10336,0,null);var c = cljs.core.nth.call(null,vec__10336,1,null);if((c > 1))
{return node;
} else
{return null;
}
});})(freqs))
,freqs);var most_popular_tag = ((function (freqs,dups){
return (function (p1__10318_SHARP_){return cljs.core.first.call(null,cljs.core.apply.call(null,cljs.core.max_key,((function (freqs,dups){
return (function (p__10337){var vec__10338 = p__10337;var tag = cljs.core.nth.call(null,vec__10338,0,null);var nodes = cljs.core.nth.call(null,vec__10338,1,null);if(cljs.core.contains_QMARK_.call(null,p1__10318_SHARP_,tag))
{return cljs.core.count.call(null,nodes);
} else
{return null;
}
});})(freqs,dups))
,tags_nodes));
});})(freqs,dups))
;var tag_dups = cljs.core.map.call(null,((function (freqs,dups,most_popular_tag){
return (function (p1__10319_SHARP_){return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[most_popular_tag.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__10319_SHARP_)),p1__10319_SHARP_],null));
});})(freqs,dups,most_popular_tag))
,dups);var disallowed_node_QMARK_ = ((function (freqs,dups,most_popular_tag,tag_dups){
return (function (node,tag){return cljs.core.some.call(null,((function (freqs,dups,most_popular_tag,tag_dups){
return (function (p__10339){var vec__10340 = p__10339;var allowed_tag = cljs.core.nth.call(null,vec__10340,0,null);var dup_node = cljs.core.nth.call(null,vec__10340,1,null);return (cljs.core._EQ_.call(null,dup_node,node)) && (cljs.core.not_EQ_.call(null,allowed_tag,tag));
});})(freqs,dups,most_popular_tag,tag_dups))
,tag_dups);
});})(freqs,dups,most_popular_tag,tag_dups))
;var seq__10341_10380 = cljs.core.seq.call(null,tag_dups);var chunk__10342_10381 = null;var count__10343_10382 = 0;var i__10344_10383 = 0;while(true){
if((i__10344_10383 < count__10343_10382))
{var vec__10345_10384 = cljs.core._nth.call(null,chunk__10342_10381,i__10344_10383);var tag_10385 = cljs.core.nth.call(null,vec__10345_10384,0,null);var node_10386 = cljs.core.nth.call(null,vec__10345_10384,1,null);cljs.core.println.call(null,("Line '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node_10386))+"' has overlapping tags. Put line under "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(tag_10385)));
{
var G__10387 = seq__10341_10380;
var G__10388 = chunk__10342_10381;
var G__10389 = count__10343_10382;
var G__10390 = (i__10344_10383 + 1);
seq__10341_10380 = G__10387;
chunk__10342_10381 = G__10388;
count__10343_10382 = G__10389;
i__10344_10383 = G__10390;
continue;
}
} else
{var temp__4126__auto___10391 = cljs.core.seq.call(null,seq__10341_10380);if(temp__4126__auto___10391)
{var seq__10341_10392__$1 = temp__4126__auto___10391;if(cljs.core.chunked_seq_QMARK_.call(null,seq__10341_10392__$1))
{var c__7182__auto___10393 = cljs.core.chunk_first.call(null,seq__10341_10392__$1);{
var G__10394 = cljs.core.chunk_rest.call(null,seq__10341_10392__$1);
var G__10395 = c__7182__auto___10393;
var G__10396 = cljs.core.count.call(null,c__7182__auto___10393);
var G__10397 = 0;
seq__10341_10380 = G__10394;
chunk__10342_10381 = G__10395;
count__10343_10382 = G__10396;
i__10344_10383 = G__10397;
continue;
}
} else
{var vec__10346_10398 = cljs.core.first.call(null,seq__10341_10392__$1);var tag_10399 = cljs.core.nth.call(null,vec__10346_10398,0,null);var node_10400 = cljs.core.nth.call(null,vec__10346_10398,1,null);cljs.core.println.call(null,("Line '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node_10400))+"' has overlapping tags. Put line under "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(tag_10399)));
{
var G__10401 = cljs.core.next.call(null,seq__10341_10392__$1);
var G__10402 = null;
var G__10403 = 0;
var G__10404 = 0;
seq__10341_10380 = G__10401;
chunk__10342_10381 = G__10402;
count__10343_10382 = G__10403;
i__10344_10383 = G__10404;
continue;
}
}
} else
{}
}
break;
}
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.call(null,((function (freqs,dups,most_popular_tag,tag_dups,disallowed_node_QMARK_){
return (function (p__10347){var vec__10348 = p__10347;var tag = cljs.core.nth.call(null,vec__10348,0,null);var nodes = cljs.core.nth.call(null,vec__10348,1,null);var new_nodes = cljs.core.remove.call(null,((function (vec__10348,tag,nodes,freqs,dups,most_popular_tag,tag_dups,disallowed_node_QMARK_){
return (function (p1__10320_SHARP_){return disallowed_node_QMARK_.call(null,p1__10320_SHARP_,tag);
});})(vec__10348,tag,nodes,freqs,dups,most_popular_tag,tag_dups,disallowed_node_QMARK_))
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
var __GT_view__delegate = function (ed,type_or_view,p__10352){var map__10356 = p__10352;var map__10356__$1 = ((cljs.core.seq_QMARK_.call(null,map__10356))?cljs.core.apply.call(null,cljs.core.hash_map,map__10356):map__10356);var lines = cljs.core.get.call(null,map__10356__$1,new cljs.core.Keyword(null,"lines","lines",1116881521));var query_tag = cljs.core.get.call(null,map__10356__$1,new cljs.core.Keyword(null,"query-tag","query-tag",3500842119));var level = cljs.core.get.call(null,map__10356__$1,new cljs.core.Keyword(null,"level","level",1116770038),1);var nodes = lt.plugins.kukui.node.ed__GT_nodes.call(null,ed,lines);var nodes__$1 = (cljs.core.truth_(query_tag)?(((query_tag.indexOf(lt.plugins.kukui.core.attr_delimiter) > -1))?(function (){var vec__10357 = clojure.string.split.call(null,query_tag,cljs.core.re_pattern.call(null,lt.plugins.kukui.core.attr_delimiter));var attr = cljs.core.nth.call(null,vec__10357,0,null);var value = cljs.core.nth.call(null,vec__10357,1,null);var attr__$1 = cljs.core.keyword.call(null,attr);return cljs.core.filter.call(null,((function (vec__10357,attr,value,attr__$1,nodes,map__10356,map__10356__$1,lines,query_tag,level){
return (function (p1__10349_SHARP_){return cljs.core._EQ_.call(null,value,attr__$1.call(null,p1__10349_SHARP_));
});})(vec__10357,attr,value,attr__$1,nodes,map__10356,map__10356__$1,lines,query_tag,level))
,nodes);
})():cljs.core.filter.call(null,((function (nodes,map__10356,map__10356__$1,lines,query_tag,level){
return (function (p1__10350_SHARP_){return cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__10350_SHARP_),query_tag);
});})(nodes,map__10356,map__10356__$1,lines,query_tag,level))
,nodes)):nodes);var view_config = ((cljs.core.map_QMARK_.call(null,type_or_view))?type_or_view:new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"names","names",1118489274),cljs.core.conj.call(null,cljs.core.vec.call(null,cljs.core.sort.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"name","name",1017277949),lt.plugins.kukui.datascript.find_by.call(null,new cljs.core.Keyword(null,"type","type",1017479852),cljs.core.name.call(null,type_or_view))))),lt.plugins.kukui.live.leftover_tag),new cljs.core.Keyword(null,"default","default",2558708147),lt.plugins.kukui.live.leftover_tag], null));var tags_nodes = lt.plugins.kukui.type_map.call(null,view_config,nodes__$1);var tags_nodes__$1 = lt.plugins.kukui.ensure_unique_nodes.call(null,tags_nodes);var tags_nodes__$2 = lt.plugins.kukui.save_tags.call(null,tags_nodes__$1);var new_nodes = cljs.core.mapcat.call(null,((function (nodes,nodes__$1,view_config,tags_nodes,tags_nodes__$1,tags_nodes__$2,map__10356,map__10356__$1,lines,query_tag,level){
return (function (tag){var children = (((tag.indexOf(lt.plugins.kukui.core.attr_delimiter) > -1))?(function (){var vec__10358 = clojure.string.split.call(null,tag,cljs.core.re_pattern.call(null,lt.plugins.kukui.core.attr_delimiter));var attr = cljs.core.nth.call(null,vec__10358,0,null);var value = cljs.core.nth.call(null,vec__10358,1,null);var attr__$1 = cljs.core.keyword.call(null,attr);return cljs.core.filter.call(null,((function (vec__10358,attr,value,attr__$1,nodes,nodes__$1,view_config,tags_nodes,tags_nodes__$1,tags_nodes__$2,map__10356,map__10356__$1,lines,query_tag,level){
return (function (p1__10351_SHARP_){return cljs.core._EQ_.call(null,value,attr__$1.call(null,p1__10351_SHARP_));
});})(vec__10358,attr,value,attr__$1,nodes,nodes__$1,view_config,tags_nodes,tags_nodes__$1,tags_nodes__$2,map__10356,map__10356__$1,lines,query_tag,level))
,nodes__$1);
})():cljs.core.get.call(null,tags_nodes__$2,tag));if(cljs.core.seq.call(null,children))
{return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type-tag","type-tag",4631398905),true,new cljs.core.Keyword(null,"text","text",1017460895),(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,tag)))], null)], null),children);
} else
{return null;
}
});})(nodes,nodes__$1,view_config,tags_nodes,tags_nodes__$1,tags_nodes__$2,map__10356,map__10356__$1,lines,query_tag,level))
,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(view_config));var indented_nodes = lt.plugins.kukui.core.indent_nodes.call(null,new_nodes,lt.plugins.sacha.codemirror.line_indent.call(null,ed,lt.objs.editor.cursor.call(null,ed).line),lt.objs.editor.option.call(null,ed,"tabSize"),level);return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,"\n",indented_nodes))+"\n");
};
var __GT_view = function (ed,type_or_view,var_args){
var p__10352 = null;if (arguments.length > 2) {
  p__10352 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return __GT_view__delegate.call(this,ed,type_or_view,p__10352);};
__GT_view.cljs$lang$maxFixedArity = 2;
__GT_view.cljs$lang$applyTo = (function (arglist__10405){
var ed = cljs.core.first(arglist__10405);
arglist__10405 = cljs.core.next(arglist__10405);
var type_or_view = cljs.core.first(arglist__10405);
var p__10352 = cljs.core.rest(arglist__10405);
return __GT_view__delegate(ed,type_or_view,p__10352);
});
__GT_view.cljs$core$IFn$_invoke$arity$variadic = __GT_view__delegate;
return __GT_view;
})()
;
lt.plugins.kukui.type_selector = lt.plugins.kukui.selector.selector.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"items","items",1114430258),(function (){return cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"name","name",1017277949),cljs.core.map.call(null,(function (p1__10359_SHARP_){return cljs.core.select_keys.call(null,p1__10359_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1017277949)], null));
}),lt.plugins.kukui.datascript.find_by.call(null,new cljs.core.Keyword(null,"type","type",1017479852),lt.plugins.kukui.db.root_type)));
}),new cljs.core.Keyword(null,"key","key",1014010321),new cljs.core.Keyword(null,"name","name",1017277949)], null));
lt.plugins.kukui.check_types_counts = (function() {
var check_types_counts = null;
var check_types_counts__2 = (function (ed,editor_fn){return check_types_counts.call(null,ed,editor_fn,null);
});
var check_types_counts__3 = (function (ed,editor_fn,lines){var before_replace_counts = lt.plugins.kukui.live.types_counts.call(null,ed,lines);var new_body_count = cljs.core.count.call(null,clojure.string.split_lines.call(null,editor_fn.call(null)));var new_lines = (cljs.core.truth_(lines)?cljs.core.range.call(null,cljs.core.first.call(null,lines),(new_body_count + cljs.core.first.call(null,lines))):null);var after_replace_counts = lt.plugins.kukui.live.types_counts.call(null,ed,new_lines);if(cljs.core._EQ_.call(null,before_replace_counts,after_replace_counts))
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
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.type-replace-children","kukui.type-replace-children",2704104452),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: replaces current children with new type view",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.kukui.type_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){return lt.plugins.kukui.replace_children.call(null,lt.objs.editor.pool.last_active.call(null),(function (p1__10360_SHARP_){return lt.plugins.kukui.__GT_view.call(null,p1__10360_SHARP_,cljs.core.keyword.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(type)));
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
lt.plugins.kukui.__GT_view_config = (function __GT_view_config(names,no_default){return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"names","names",1118489274),(cljs.core.truth_(no_default)?names:cljs.core.conj.call(null,names,lt.plugins.kukui.live.leftover_tag)),new cljs.core.Keyword(null,"default","default",2558708147),lt.plugins.kukui.live.leftover_tag], null);
});
/**
* Create a view given a query. There are two formats.
* With parent:    #type: tag1, tag2, type:note
* Without parent: tag1, tag2
* @param {...*} var_args
*/
lt.plugins.kukui.__GT_query_view = (function() { 
var __GT_query_view__delegate = function (ed,query,p__10362){var map__10365 = p__10362;var map__10365__$1 = ((cljs.core.seq_QMARK_.call(null,map__10365))?cljs.core.apply.call(null,cljs.core.hash_map,map__10365):map__10365);var lines = cljs.core.get.call(null,map__10365__$1,new cljs.core.Keyword(null,"lines","lines",1116881521));var types = cljs.core.get.call(null,map__10365__$1,new cljs.core.Keyword(null,"types","types",1124748267));var view_fn = cljs.core.get.call(null,map__10365__$1,new cljs.core.Keyword(null,"view-fn","view-fn",1468084322),((function (map__10365,map__10365__$1,lines,types){
return (function (p1__10361_SHARP_){return lt.plugins.kukui.__GT_view_config.call(null,p1__10361_SHARP_,true);
});})(map__10365,map__10365__$1,lines,types))
);var level = cljs.core.get.call(null,map__10365__$1,new cljs.core.Keyword(null,"level","level",1116770038),1);var map__10366 = lt.plugins.kukui.core.text__GT_tag_group.call(null,types,query);var map__10366__$1 = ((cljs.core.seq_QMARK_.call(null,map__10366))?cljs.core.apply.call(null,cljs.core.hash_map,map__10366):map__10366);var tags = cljs.core.get.call(null,map__10366__$1,new cljs.core.Keyword(null,"tags","tags",1017456523));var parent_tag = cljs.core.get.call(null,map__10366__$1,new cljs.core.Keyword(null,"parent-tag","parent-tag",768068457));var view_config = view_fn.call(null,tags);return lt.plugins.kukui.__GT_view.call(null,ed,view_config,new cljs.core.Keyword(null,"level","level",1116770038),level,new cljs.core.Keyword(null,"query-tag","query-tag",3500842119),parent_tag,new cljs.core.Keyword(null,"lines","lines",1116881521),lines);
};
var __GT_query_view = function (ed,query,var_args){
var p__10362 = null;if (arguments.length > 2) {
  p__10362 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return __GT_query_view__delegate.call(this,ed,query,p__10362);};
__GT_query_view.cljs$lang$maxFixedArity = 2;
__GT_query_view.cljs$lang$applyTo = (function (arglist__10406){
var ed = cljs.core.first(arglist__10406);
arglist__10406 = cljs.core.next(arglist__10406);
var query = cljs.core.first(arglist__10406);
var p__10362 = cljs.core.rest(arglist__10406);
return __GT_query_view__delegate(ed,query,p__10362);
});
__GT_query_view.cljs$core$IFn$_invoke$arity$variadic = __GT_query_view__delegate;
return __GT_query_view;
})()
;
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.query-replace-children","kukui.query-replace-children",3544797768),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: replaces current children based on current node's query",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line);var new_body = lt.plugins.kukui.__GT_query_view.call(null,ed,lt.objs.editor.line.call(null,ed,line),new cljs.core.Keyword(null,"types","types",1124748267),lt.plugins.kukui.db.types_and_names.call(null),new cljs.core.Keyword(null,"view-fn","view-fn",1468084322),((function (ed,line,end_line){
return (function (p1__10367_SHARP_){return lt.plugins.kukui.__GT_view_config.call(null,p1__10367_SHARP_,null);
});})(ed,line,end_line))
);return lt.objs.editor.replace.call(null,lt.objs.editor.__GT_cm_ed.call(null,ed),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),(line + 1),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),end_line,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new_body);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.query-insert-children","kukui.query-insert-children",2043705447),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: inserts children based on current node's query and parent's children",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var lines = lt.plugins.kukui.util.find_parent_lines.call(null,ed,line);var new_body = lt.plugins.kukui.__GT_query_view.call(null,ed,lt.objs.editor.line.call(null,ed,line),new cljs.core.Keyword(null,"types","types",1124748267),lt.plugins.kukui.db.types_and_names.call(null),new cljs.core.Keyword(null,"lines","lines",1116881521),lines);if(cljs.core.truth_(clojure.string.blank_QMARK_.call(null,new_body)))
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
var toggle_all__3 = (function (ed,condition,lines){return lt.objs.editor.operation.call(null,ed,(function (){var seq__10372 = cljs.core.seq.call(null,lines);var chunk__10373 = null;var count__10374 = 0;var i__10375 = 0;while(true){
if((i__10375 < count__10374))
{var line = cljs.core._nth.call(null,chunk__10373,i__10375);if(cljs.core.truth_(condition.call(null,line)))
{lt.plugins.sacha.codemirror.fold_code.call(null,ed,{"ch": 0, "line": line},null);
} else
{}
{
var G__10407 = seq__10372;
var G__10408 = chunk__10373;
var G__10409 = count__10374;
var G__10410 = (i__10375 + 1);
seq__10372 = G__10407;
chunk__10373 = G__10408;
count__10374 = G__10409;
i__10375 = G__10410;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__10372);if(temp__4126__auto__)
{var seq__10372__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__10372__$1))
{var c__7182__auto__ = cljs.core.chunk_first.call(null,seq__10372__$1);{
var G__10411 = cljs.core.chunk_rest.call(null,seq__10372__$1);
var G__10412 = c__7182__auto__;
var G__10413 = cljs.core.count.call(null,c__7182__auto__);
var G__10414 = 0;
seq__10372 = G__10411;
chunk__10373 = G__10412;
count__10374 = G__10413;
i__10375 = G__10414;
continue;
}
} else
{var line = cljs.core.first.call(null,seq__10372__$1);if(cljs.core.truth_(condition.call(null,line)))
{lt.plugins.sacha.codemirror.fold_code.call(null,ed,{"ch": 0, "line": line},null);
} else
{}
{
var G__10415 = cljs.core.next.call(null,seq__10372__$1);
var G__10416 = null;
var G__10417 = 0;
var G__10418 = 0;
seq__10372 = G__10415;
chunk__10373 = G__10416;
count__10374 = G__10417;
i__10375 = G__10418;
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
lt.plugins.kukui.stamp_nodes = (function stamp_nodes(ed){var level = 0;var nodes = lt.plugins.kukui.node.ed__GT_nodes.call(null,ed);var parent_tags = lt.plugins.kukui.core.text__GT_tags.call(null,lt.objs.editor.line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line));var new_nodes = cljs.core.map.call(null,((function (level,nodes,parent_tags){
return (function (p1__10376_SHARP_){return lt.plugins.kukui.add_tags_to_node.call(null,p1__10376_SHARP_,parent_tags);
});})(level,nodes,parent_tags))
,nodes);var indented_nodes = lt.plugins.kukui.core.indent_nodes.call(null,new_nodes,lt.plugins.sacha.codemirror.line_indent.call(null,ed,lt.objs.editor.cursor.call(null,ed).line),lt.objs.editor.option.call(null,ed,"tabSize"),level);return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,"\n",indented_nodes))+"\n");
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.stamp-children","kukui.stamp-children",3918722228),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: stamps current children with parent tags",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.kukui.replace_children.call(null,lt.objs.editor.pool.last_active.call(null),lt.plugins.kukui.stamp_nodes);
})], null));
lt.plugins.kukui.sibling_nodes = (function sibling_nodes(ed,line){var parent_lines = lt.plugins.kukui.util.find_parent_lines.call(null,ed,line);var current_indent = lt.plugins.sacha.codemirror.line_indent.call(null,ed,line);var sibling_lines = cljs.core.filter.call(null,((function (parent_lines,current_indent){
return (function (p1__10377_SHARP_){if(cljs.core._EQ_.call(null,current_indent,lt.plugins.sacha.codemirror.line_indent.call(null,ed,p1__10377_SHARP_)))
{return p1__10377_SHARP_;
} else
{return null;
}
});})(parent_lines,current_indent))
,parent_lines);return cljs.core.map.call(null,cljs.core.partial.call(null,lt.plugins.kukui.node.line__GT_node,ed),sibling_lines);
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.toggle-descs","kukui.toggle-descs",4779010676),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Toggle visibility of descs of current children",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line);return lt.plugins.kukui.toggle_all.call(null,ed,((function (ed,line,end_line){
return (function (p1__10378_SHARP_){var and__6414__auto__ = cljs.core.not.call(null,lt.plugins.kukui.core.desc_node_QMARK_.call(null,lt.plugins.kukui.node.line__GT_node.call(null,ed,p1__10378_SHARP_)));if(and__6414__auto__)
{return lt.plugins.kukui.core.desc_node_QMARK_.call(null,lt.plugins.kukui.node.line__GT_node.call(null,ed,(p1__10378_SHARP_ + 1)));
} else
{return and__6414__auto__;
}
});})(ed,line,end_line))
,cljs.core.range.call(null,line,end_line));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.sync-file-to-db","kukui.sync-file-to-db",3023743498),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Syncs file to db",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var lines = cljs.core.range.call(null,lt.objs.editor.first_line.call(null,ed),(lt.objs.editor.last_line.call(null,ed) + 1));var nodes = lt.plugins.kukui.node.ed__GT_nodes.call(null,ed,lines);var file = lt.plugins.kukui.util.current_file.call(null);lt.plugins.kukui.nodes = nodes;
try{return lt.plugins.kukui.sync.sync.call(null,nodes,file);
}catch (e10379){var e = e10379;lt.objs.notifos.set_msg_BANG_.call(null,("Failed to sync:"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
cljs.core.prn.call(null,e,cljs.core.ex_data.call(null,e));
return cljs.core.println.call(null,e.stack);
}})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.reset-sync","kukui.reset-sync",2173405380),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Resets sync",new cljs.core.Keyword(null,"exec","exec",1017031683),lt.plugins.kukui.sync.reset_sync_BANG_], null));
}

//# sourceMappingURL=kukui_compiled.js.map