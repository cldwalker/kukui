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
lt.plugins.kukui.core.text__GT_tags = (function text__GT_tags(text){return cljs.core.map.call(null,(function (p1__9399_SHARP_){return cljs.core.subs.call(null,p1__9399_SHARP_,1);
}),cljs.core.map.call(null,cljs.core.second,cljs.core.re_seq.call(null,lt.plugins.kukui.core.tag_pattern,text)));
});
/**
* Expands a tag if it's a type
*/
lt.plugins.kukui.core.expand_tag = (function expand_tag(types,tag){if(cljs.core.contains_QMARK_.call(null,cljs.core.set.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"type","type",1017479852),types)),tag))
{return cljs.core.some.call(null,(function (p1__9400_SHARP_){if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(p1__9400_SHARP_),tag))
{return cljs.core.vec.call(null,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(p1__9400_SHARP_));
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
var vec__9406 = cljs.core.re_find.call(null,/^\s*(\S+:|)\s*(.*)$/,text);var _ = cljs.core.nth.call(null,vec__9406,0,null);var parent_tag = cljs.core.nth.call(null,vec__9406,1,null);var tags_string = cljs.core.nth.call(null,vec__9406,2,null);var parent_tag__$1 = ((cljs.core.seq.call(null,parent_tag))?cljs.core.first.call(null,lt.plugins.kukui.core.text__GT_tags.call(null,parent_tag)):null);var raw_tags = clojure.string.split.call(null,tags_string,/\s*,\s*/);var default_tag = (function (){var G__9407 = cljs.core.some.call(null,((function (vec__9406,_,parent_tag,tags_string,parent_tag__$1,raw_tags){
return (function (p1__9401_SHARP_){if(cljs.core._EQ_.call(null,lt.plugins.kukui.core.default_tag_char,cljs.core.subs.call(null,p1__9401_SHARP_,(cljs.core.count.call(null,p1__9401_SHARP_) - 1))))
{return p1__9401_SHARP_;
} else
{return null;
}
});})(vec__9406,_,parent_tag,tags_string,parent_tag__$1,raw_tags))
,raw_tags);var G__9407__$1 = (((G__9407 == null))?null:((function (G__9407,vec__9406,_,parent_tag,tags_string,parent_tag__$1,raw_tags){
return (function (p1__9402_SHARP_){return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.call(null,p1__9402_SHARP_,0,(cljs.core.count.call(null,p1__9402_SHARP_) - 1))));
});})(G__9407,vec__9406,_,parent_tag,tags_string,parent_tag__$1,raw_tags))
.call(null,G__9407));var G__9407__$2 = (((G__9407__$1 == null))?null:lt.plugins.kukui.core.text__GT_tags.call(null,G__9407__$1));var G__9407__$3 = (((G__9407__$2 == null))?null:cljs.core.first.call(null,G__9407__$2));return G__9407__$3;
})();var tags = lt.plugins.kukui.core.text__GT_tags.call(null,clojure.string.join.call(null," ",cljs.core.map.call(null,((function (vec__9406,_,parent_tag,tags_string,parent_tag__$1,raw_tags,default_tag){
return (function (p1__9403_SHARP_){return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__9403_SHARP_));
});})(vec__9406,_,parent_tag,tags_string,parent_tag__$1,raw_tags,default_tag))
,raw_tags)));var tags__$1 = cljs.core.mapcat.call(null,cljs.core.partial.call(null,lt.plugins.kukui.core.expand_tag,types),tags);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"parent-tag","parent-tag",768068457),parent_tag__$1,new cljs.core.Keyword(null,"tags","tags",1017456523),tags__$1,new cljs.core.Keyword(null,"default-tag","default-tag",575796608),default_tag], null);
});
lt.plugins.kukui.core.indent_node = (function indent_node(node,indent){return clojure.string.replace_first.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node),/^\s*/,cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,indent," ")));
});
lt.plugins.kukui.core.indent_nodes = (function indent_nodes(nodes,indent,tab_size,offset_level){var offset = (offset_level * tab_size);var tag_indent = (indent + offset);var node_indent = ((indent + offset) + tab_size);var desc_indent = (((indent + offset) + tab_size) + tab_size);return cljs.core.mapcat.call(null,((function (offset,tag_indent,node_indent,desc_indent){
return (function (p1__9408_SHARP_){if(cljs.core.truth_(new cljs.core.Keyword(null,"type-tag","type-tag",4631398905).cljs$core$IFn$_invoke$arity$1(p1__9408_SHARP_)))
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,tag_indent," ")))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(p1__9408_SHARP_)))], null);
} else
{return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.kukui.core.indent_node.call(null,p1__9408_SHARP_,node_indent)], null),cljs.core.map.call(null,((function (offset,tag_indent,node_indent,desc_indent){
return (function (x){return lt.plugins.kukui.core.indent_node.call(null,x,desc_indent);
});})(offset,tag_indent,node_indent,desc_indent))
,new cljs.core.Keyword(null,"desc","desc",1016984067).cljs$core$IFn$_invoke$arity$1(p1__9408_SHARP_)));
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
lt.plugins.kukui.core.add_node_with_parent_tags = (function add_node_with_parent_tags(nodes,curr,parent_tags){return lt.plugins.kukui.core.add_node_with_tags.call(null,nodes,curr,cljs.core.concat.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.filter.call(null,(function (p1__9409_SHARP_){return (new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(p1__9409_SHARP_) < new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
}),parent_tags)),lt.plugins.kukui.core.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr))));
});
lt.plugins.kukui.core.__GT_name_value = (function __GT_name_value(text){return cljs.core.second.call(null,cljs.core.re_find.call(null,cljs.core.re_pattern.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.name_attr)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.attr_delimiter)+"(\\S+)")),text));
});
lt.plugins.kukui.core.add_custom_attributes = (function add_custom_attributes(node){var vec__9415 = cljs.core.juxt.call(null,cljs.core.remove,cljs.core.filter).call(null,(function (p1__9410_SHARP_){return (p1__9410_SHARP_.indexOf(lt.plugins.kukui.core.attr_delimiter) > -1);
}),new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(node));var tags = cljs.core.nth.call(null,vec__9415,0,null);var attribute_tags = cljs.core.nth.call(null,vec__9415,1,null);return cljs.core.merge.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (vec__9415,tags,attribute_tags){
return (function (p__9416){var vec__9417 = p__9416;var k = cljs.core.nth.call(null,vec__9417,0,null);var v = cljs.core.nth.call(null,vec__9417,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,k),v], null);
});})(vec__9415,tags,attribute_tags))
,cljs.core.map.call(null,((function (vec__9415,tags,attribute_tags){
return (function (p1__9411_SHARP_){return clojure.string.split.call(null,p1__9411_SHARP_,cljs.core.re_pattern.call(null,lt.plugins.kukui.core.attr_delimiter));
});})(vec__9415,tags,attribute_tags))
,attribute_tags))),cljs.core.assoc.call(null,node,new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.set.call(null,tags)));
});
/**
* Adds :tags, :desc and custom attributes to nodes
*/
lt.plugins.kukui.core.add_attributes_to_nodes = (function add_attributes_to_nodes(nodes){return cljs.core.mapv.call(null,lt.plugins.kukui.core.add_custom_attributes,new cljs.core.Keyword(null,"nodes","nodes",1118897699).cljs$core$IFn$_invoke$arity$1(cljs.core.reduce.call(null,(function (accum,p__9424){var vec__9425 = p__9424;var curr = cljs.core.nth.call(null,vec__9425,0,null);var next = cljs.core.nth.call(null,vec__9425,1,null);if(cljs.core.truth_((function (){var and__6414__auto__ = lt.plugins.kukui.core.parent_node_QMARK_.call(null,curr,next);if(cljs.core.truth_(and__6414__auto__))
{return lt.plugins.kukui.core.__GT_name_value.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr));
} else
{return and__6414__auto__;
}
})()))
{return cljs.core.update_in.call(null,cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699)], null),((function (vec__9425,curr,next){
return (function (p1__9418_SHARP_){return lt.plugins.kukui.core.add_node_with_parent_tags.call(null,p1__9418_SHARP_,curr,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(accum));
});})(vec__9425,curr,next))
),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tags","tags",1017456523)], null),((function (vec__9425,curr,next){
return (function (p1__9419_SHARP_){return lt.plugins.kukui.core.add_node_with_tags.call(null,cljs.core.vec.call(null,cljs.core.remove.call(null,((function (vec__9425,curr,next){
return (function (tag){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(tag),new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
});})(vec__9425,curr,next))
,p1__9419_SHARP_)),curr,cljs.core._conj.call(null,cljs.core.List.EMPTY,lt.plugins.kukui.core.__GT_name_value.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr))));
});})(vec__9425,curr,next))
);
} else
{if(cljs.core.truth_(lt.plugins.kukui.core.parent_node_QMARK_.call(null,curr,next)))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tags","tags",1017456523)], null),((function (vec__9425,curr,next){
return (function (p1__9420_SHARP_){return lt.plugins.kukui.core.add_node_with_tags.call(null,cljs.core.vec.call(null,cljs.core.remove.call(null,((function (vec__9425,curr,next){
return (function (tag){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(tag),new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
});})(vec__9425,curr,next))
,p1__9420_SHARP_)),curr,lt.plugins.kukui.core.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr)));
});})(vec__9425,curr,next))
);
} else
{if(cljs.core.truth_(lt.plugins.kukui.core.desc_node_QMARK_.call(null,curr)))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699),(cljs.core.count.call(null,new cljs.core.Keyword(null,"nodes","nodes",1118897699).cljs$core$IFn$_invoke$arity$1(accum)) - 1),new cljs.core.Keyword(null,"desc","desc",1016984067)], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),curr);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699)], null),((function (vec__9425,curr,next){
return (function (p1__9421_SHARP_){return lt.plugins.kukui.core.add_node_with_parent_tags.call(null,p1__9421_SHARP_,curr,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(accum));
});})(vec__9425,curr,next))
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
lt.plugins.kukui.node.__GT_tagged_nodes = (function __GT_tagged_nodes(ed,lines){var nodes = lt.plugins.kukui.core.add_attributes_to_nodes.call(null,cljs.core.map.call(null,(function (p1__9479_SHARP_){return lt.plugins.kukui.node.line__GT_node.call(null,ed,p1__9479_SHARP_);
}),lines));return cljs.core.remove.call(null,((function (nodes){
return (function (p1__9480_SHARP_){return cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__9480_SHARP_),lt.plugins.kukui.node.ignore_tag);
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
clojure.walk.keywordize_keys = (function keywordize_keys(m){var f = (function (p__9381){var vec__9382 = p__9381;var k = cljs.core.nth.call(null,vec__9382,0,null);var v = cljs.core.nth.call(null,vec__9382,1,null);if(typeof k === 'string')
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
clojure.walk.stringify_keys = (function stringify_keys(m){var f = (function (p__9385){var vec__9386 = p__9385;var k = cljs.core.nth.call(null,vec__9386,0,null);var v = cljs.core.nth.call(null,vec__9386,1,null);if((k instanceof cljs.core.Keyword))
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
datascript.btset.level_shift = (cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__9317_SHARP_){return ((datascript.btset.max_len & (1 << p1__9317_SHARP_)) != 0);
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
var G__9337 = arr;
var G__9338 = (m + 1);
var G__9339 = r;
var G__9340 = k;
arr = G__9337;
l = G__9338;
r = G__9339;
k = G__9340;
continue;
}
} else
{{
var G__9341 = arr;
var G__9342 = l;
var G__9343 = (m - 1);
var G__9344 = k;
arr = G__9341;
l = G__9342;
r = G__9343;
k = G__9344;
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
var G__9345 = arr;
var G__9346 = l;
var G__9347 = (m - 1);
var G__9348 = k;
arr = G__9345;
l = G__9346;
r = G__9347;
k = G__9348;
continue;
}
} else
{{
var G__9349 = arr;
var G__9350 = (m + 1);
var G__9351 = r;
var G__9352 = k;
arr = G__9349;
l = G__9350;
r = G__9351;
k = G__9352;
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
datascript.btset.cut_n_splice = (function cut_n_splice(arr,cut_from,cut_to,splice_from,splice_to,xs){var arr_l = arr.length;var xs_l = xs.length;var l1 = (splice_from - cut_from);var l2 = (cut_to - splice_to);var l1xs = (l1 + xs_l);var new_arr = (new Array(((l1 + xs_l) + l2)));var n__7282__auto___9353 = l1;var i_9354 = 0;while(true){
if((i_9354 < n__7282__auto___9353))
{(new_arr[i_9354] = (arr[(cut_from + i_9354)]));
{
var G__9355 = (i_9354 + 1);
i_9354 = G__9355;
continue;
}
} else
{}
break;
}
var n__7282__auto___9356 = xs_l;var i_9357 = 0;while(true){
if((i_9357 < n__7282__auto___9356))
{(new_arr[(i_9357 + l1)] = (xs[i_9357]));
{
var G__9358 = (i_9357 + 1);
i_9357 = G__9358;
continue;
}
} else
{}
break;
}
var n__7282__auto___9359 = l2;var i_9360 = 0;while(true){
if((i_9360 < n__7282__auto___9359))
{(new_arr[(i_9360 + l1xs)] = (arr[(splice_to + i_9360)]));
{
var G__9361 = (i_9360 + 1);
i_9360 = G__9361;
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
datascript.btset.merge_n_split = (function merge_n_split(a1,a2){var a1_l = a1.length;var a2_l = a2.length;var total_l = (a1_l + a2_l);var r1_l = datascript.btset.half.call(null,total_l);var r2_l = (total_l - r1_l);var r1 = (new Array(r1_l));var r2 = (new Array(r2_l));var n__7282__auto___9362 = total_l;var i_9363 = 0;while(true){
if((i_9363 < n__7282__auto___9362))
{((((i_9363 < r1_l))?r1:r2)[(((i_9363 < r1_l))?i_9363:(i_9363 - r1_l))] = ((((i_9363 < a1_l))?a1:a2)[(((i_9363 < a1_l))?i_9363:(i_9363 - a1_l))]));
{
var G__9364 = (i_9363 + 1);
i_9363 = G__9364;
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
var G__9365 = (i + 1);
i = G__9365;
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
var G__9366 = (level - datascript.btset.level_shift);
var G__9367 = (node.pointers[datascript.btset.path_get.call(null,path,level)]);
level = G__9366;
node = G__9367;
continue;
}
} else
{return node.keys;
}
break;
}
});
datascript.btset.btset_conj = (function btset_conj(set,key){var _STAR_cmp_STAR_9319 = datascript.btset._STAR_cmp_STAR_;try{datascript.btset._STAR_cmp_STAR_ = set.comparator;
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
}finally {datascript.btset._STAR_cmp_STAR_ = _STAR_cmp_STAR_9319;
}});
datascript.btset.btset_disj = (function btset_disj(set,key){var _STAR_cmp_STAR_9321 = datascript.btset._STAR_cmp_STAR_;try{datascript.btset._STAR_cmp_STAR_ = set.comparator;
var new_roots = set.root.disj(key,true,null,null);if((new_roots == null))
{return set;
} else
{var new_root = (new_roots[0]);if(((new_root instanceof datascript.btset.Node)) && ((new_root.pointers.length === 1)))
{return datascript.btset.alter_btset.call(null,set,(new_root.pointers[0]),(set.shift - datascript.btset.level_shift),(set.cnt - 1));
} else
{return datascript.btset.alter_btset.call(null,set,new_root,set.shift,(set.cnt - 1));
}
}
}finally {datascript.btset._STAR_cmp_STAR_ = _STAR_cmp_STAR_9321;
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
var G__9368 = (node.pointers[idx]);
var G__9369 = datascript.btset.path_set.call(null,path,level,idx);
var G__9370 = (level - datascript.btset.level_shift);
node = G__9368;
path = G__9369;
level = G__9370;
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
var G__9371 = (node.pointers[idx]);
var G__9372 = datascript.btset.path_set.call(null,path,level,idx);
var G__9373 = (level - datascript.btset.level_shift);
node = G__9371;
path = G__9372;
level = G__9373;
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
var slice__3 = (function (set,key_from,key_to){var _STAR_cmp_STAR_9323 = datascript.btset._STAR_cmp_STAR_;try{datascript.btset._STAR_cmp_STAR_ = set.comparator;
return datascript.btset._slice.call(null,set,key_from,key_to);
}finally {datascript.btset._STAR_cmp_STAR_ = _STAR_cmp_STAR_9323;
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
var ___$1 = this;var _STAR_cmp_STAR_9326 = datascript.btset._STAR_cmp_STAR_;try{datascript.btset._STAR_cmp_STAR_ = self__.comparator;
var or__6426__auto__ = self__.root.lookup(k);if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return not_found;
}
}finally {datascript.btset._STAR_cmp_STAR_ = _STAR_cmp_STAR_9326;
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
return (function (p1__9324_SHARP_){return cljs.core.contains_QMARK_.call(null,this$__$1,p1__9324_SHARP_);
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
var G__9374 = null;
var G__9374__2 = (function (self__,k){var self__ = this;
var self____$1 = this;var coll = self____$1;return coll.cljs$core$ILookup$_lookup$arity$2(null,k);
});
var G__9374__3 = (function (self__,k,not_found){var self__ = this;
var self____$1 = this;var coll = self____$1;return coll.cljs$core$ILookup$_lookup$arity$3(null,k,not_found);
});
G__9374 = function(self__,k,not_found){
switch(arguments.length){
case 2:
return G__9374__2.call(this,self__,k);
case 3:
return G__9374__3.call(this,self__,k,not_found);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__9374;
})()
;
datascript.btset.BTSet.prototype.apply = (function (self__,args9325){var self__ = this;
var self____$1 = this;return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args9325)));
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
var G__9375__delegate = function (cmp,keys){return cljs.core.reduce.call(null,cljs.core._conj,btset_by.call(null,cmp),keys);
};
var G__9375 = function (cmp,var_args){
var keys = null;if (arguments.length > 1) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return G__9375__delegate.call(this,cmp,keys);};
G__9375.cljs$lang$maxFixedArity = 1;
G__9375.cljs$lang$applyTo = (function (arglist__9376){
var cmp = cljs.core.first(arglist__9376);
var keys = cljs.core.rest(arglist__9376);
return G__9375__delegate(cmp,keys);
});
G__9375.cljs$core$IFn$_invoke$arity$variadic = G__9375__delegate;
return G__9375;
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
var G__9377__delegate = function (keys){return cljs.core.reduce.call(null,cljs.core._conj,btset.call(null),keys);
};
var G__9377 = function (var_args){
var keys = null;if (arguments.length > 0) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return G__9377__delegate.call(this,keys);};
G__9377.cljs$lang$maxFixedArity = 0;
G__9377.cljs$lang$applyTo = (function (arglist__9378){
var keys = cljs.core.seq(arglist__9378);
return G__9377__delegate(keys);
});
G__9377.cljs$core$IFn$_invoke$arity$variadic = G__9377__delegate;
return G__9377;
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
datascript.Datom.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__7014__auto__,k9077,else__7015__auto__){var self__ = this;
var this__7014__auto____$1 = this;var G__9079 = (((k9077 instanceof cljs.core.Keyword))?k9077.fqn:null);var caseval__9231;
switch (G__9079){
case "added":
caseval__9231=self__.added
break;
case "tx":
caseval__9231=self__.tx
break;
case "v":
caseval__9231=self__.v
break;
case "a":
caseval__9231=self__.a
break;
case "e":
caseval__9231=self__.e
break;
default:
caseval__9231=cljs.core.get.call(null,self__.__extmap,k9077,else__7015__auto__)
}
return caseval__9231;
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
datascript.Datom.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__7019__auto__,k__7020__auto__,G__9076){var self__ = this;
var this__7019__auto____$1 = this;var pred__9080 = cljs.core.keyword_identical_QMARK_;var expr__9081 = k__7020__auto__;if(cljs.core.truth_(pred__9080.call(null,new cljs.core.Keyword(null,"e","e",1013904343),expr__9081)))
{return (new datascript.Datom(G__9076,self__.a,self__.v,self__.tx,self__.added,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__9080.call(null,new cljs.core.Keyword(null,"a","a",1013904339),expr__9081)))
{return (new datascript.Datom(self__.e,G__9076,self__.v,self__.tx,self__.added,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__9080.call(null,new cljs.core.Keyword(null,"v","v",1013904360),expr__9081)))
{return (new datascript.Datom(self__.e,self__.a,G__9076,self__.tx,self__.added,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__9080.call(null,new cljs.core.Keyword(null,"tx","tx",1013907958),expr__9081)))
{return (new datascript.Datom(self__.e,self__.a,self__.v,G__9076,self__.added,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__9080.call(null,new cljs.core.Keyword(null,"added","added",1106564210),expr__9081)))
{return (new datascript.Datom(self__.e,self__.a,self__.v,self__.tx,G__9076,self__.__meta,self__.__extmap,null));
} else
{return (new datascript.Datom(self__.e,self__.a,self__.v,self__.tx,self__.added,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__7020__auto__,G__9076),null));
}
}
}
}
}
});
datascript.Datom.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__7024__auto__){var self__ = this;
var this__7024__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"e","e",1013904343),self__.e],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"a","a",1013904339),self__.a],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"v","v",1013904360),self__.v],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"tx","tx",1013907958),self__.tx],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"added","added",1106564210),self__.added],null))], null),self__.__extmap));
});
datascript.Datom.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__7011__auto__,G__9076){var self__ = this;
var this__7011__auto____$1 = this;return (new datascript.Datom(self__.e,self__.a,self__.v,self__.tx,self__.added,G__9076,self__.__extmap,self__.__hash));
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
datascript.map__GT_Datom = (function map__GT_Datom(G__9078){return (new datascript.Datom(new cljs.core.Keyword(null,"e","e",1013904343).cljs$core$IFn$_invoke$arity$1(G__9078),new cljs.core.Keyword(null,"a","a",1013904339).cljs$core$IFn$_invoke$arity$1(G__9078),new cljs.core.Keyword(null,"v","v",1013904360).cljs$core$IFn$_invoke$arity$1(G__9078),new cljs.core.Keyword(null,"tx","tx",1013907958).cljs$core$IFn$_invoke$arity$1(G__9078),new cljs.core.Keyword(null,"added","added",1106564210).cljs$core$IFn$_invoke$arity$1(G__9078),null,cljs.core.dissoc.call(null,G__9078,new cljs.core.Keyword(null,"e","e",1013904343),new cljs.core.Keyword(null,"a","a",1013904339),new cljs.core.Keyword(null,"v","v",1013904360),new cljs.core.Keyword(null,"tx","tx",1013907958),new cljs.core.Keyword(null,"added","added",1106564210))));
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
datascript.ISearch = (function (){var obj9084 = {};return obj9084;
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
datascript.cmp_datoms_eavt = (function cmp_datoms_eavt(d1,d2){var c__7921__auto__ = datascript.cmp.call(null,d1.e,d2.e);if((0 === c__7921__auto__))
{var c__7921__auto____$1 = datascript.cmp.call(null,d1.a,d2.a);if((0 === c__7921__auto____$1))
{var c__7921__auto____$2 = datascript.cmp_val.call(null,d1.v,d2.v);if((0 === c__7921__auto____$2))
{var c__7921__auto____$3 = datascript.cmp.call(null,d1.tx,d2.tx);if((0 === c__7921__auto____$3))
{return 0;
} else
{return c__7921__auto____$3;
}
} else
{return c__7921__auto____$2;
}
} else
{return c__7921__auto____$1;
}
} else
{return c__7921__auto__;
}
});
datascript.cmp_datoms_aevt = (function cmp_datoms_aevt(d1,d2){var c__7921__auto__ = datascript.cmp.call(null,d1.a,d2.a);if((0 === c__7921__auto__))
{var c__7921__auto____$1 = datascript.cmp.call(null,d1.e,d2.e);if((0 === c__7921__auto____$1))
{var c__7921__auto____$2 = datascript.cmp_val.call(null,d1.v,d2.v);if((0 === c__7921__auto____$2))
{var c__7921__auto____$3 = datascript.cmp.call(null,d1.tx,d2.tx);if((0 === c__7921__auto____$3))
{return 0;
} else
{return c__7921__auto____$3;
}
} else
{return c__7921__auto____$2;
}
} else
{return c__7921__auto____$1;
}
} else
{return c__7921__auto__;
}
});
datascript.cmp_datoms_avet = (function cmp_datoms_avet(d1,d2){var c__7921__auto__ = datascript.cmp.call(null,d1.a,d2.a);if((0 === c__7921__auto__))
{var c__7921__auto____$1 = datascript.cmp_val.call(null,d1.v,d2.v);if((0 === c__7921__auto____$1))
{var c__7921__auto____$2 = datascript.cmp.call(null,d1.e,d2.e);if((0 === c__7921__auto____$2))
{var c__7921__auto____$3 = datascript.cmp.call(null,d1.tx,d2.tx);if((0 === c__7921__auto____$3))
{return 0;
} else
{return c__7921__auto____$3;
}
} else
{return c__7921__auto____$2;
}
} else
{return c__7921__auto____$1;
}
} else
{return c__7921__auto__;
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
datascript.DB.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__7014__auto__,k9095,else__7015__auto__){var self__ = this;
var this__7014__auto____$1 = this;var G__9097 = (((k9095 instanceof cljs.core.Keyword))?k9095.fqn:null);var caseval__9232;
switch (G__9097){
case "max-tx":
caseval__9232=self__.max_tx
break;
case "max-eid":
caseval__9232=self__.max_eid
break;
case "avet":
caseval__9232=self__.avet
break;
case "aevt":
caseval__9232=self__.aevt
break;
case "eavt":
caseval__9232=self__.eavt
break;
case "schema":
caseval__9232=self__.schema
break;
default:
caseval__9232=cljs.core.get.call(null,self__.__extmap,k9095,else__7015__auto__)
}
return caseval__9232;
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
datascript.DB.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__7019__auto__,k__7020__auto__,G__9094){var self__ = this;
var this__7019__auto____$1 = this;var pred__9098 = cljs.core.keyword_identical_QMARK_;var expr__9099 = k__7020__auto__;if(cljs.core.truth_(pred__9098.call(null,new cljs.core.Keyword(null,"schema","schema",4400883987),expr__9099)))
{return (new datascript.DB(G__9094,self__.eavt,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__9098.call(null,new cljs.core.Keyword(null,"eavt","eavt",1017010124),expr__9099)))
{return (new datascript.DB(self__.schema,G__9094,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__9098.call(null,new cljs.core.Keyword(null,"aevt","aevt",1016894804),expr__9099)))
{return (new datascript.DB(self__.schema,self__.eavt,G__9094,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__9098.call(null,new cljs.core.Keyword(null,"avet","avet",1016910614),expr__9099)))
{return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,G__9094,self__.max_eid,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__9098.call(null,new cljs.core.Keyword(null,"max-eid","max-eid",1856848841),expr__9099)))
{return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,G__9094,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__9098.call(null,new cljs.core.Keyword(null,"max-tx","max-tx",4227685119),expr__9099)))
{return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,self__.max_eid,G__9094,self__.__meta,self__.__extmap,null));
} else
{return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__7020__auto__,G__9094),null));
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
datascript.DB.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__7011__auto__,G__9094){var self__ = this;
var this__7011__auto____$1 = this;return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,G__9094,self__.__extmap,self__.__hash));
});
datascript.DB.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__7017__auto__,entry__7018__auto__){var self__ = this;
var this__7017__auto____$1 = this;if(cljs.core.vector_QMARK_.call(null,entry__7018__auto__))
{return cljs.core._assoc.call(null,this__7017__auto____$1,cljs.core._nth.call(null,entry__7018__auto__,0),cljs.core._nth.call(null,entry__7018__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__7017__auto____$1,entry__7018__auto__);
}
});
datascript.DB.prototype.datascript$ISearch$ = true;
datascript.DB.prototype.datascript$ISearch$_search$arity$2 = (function (db,p__9101){var self__ = this;
var vec__9102 = p__9101;var e = cljs.core.nth.call(null,vec__9102,0,null);var a = cljs.core.nth.call(null,vec__9102,1,null);var v = cljs.core.nth.call(null,vec__9102,2,null);var tx = cljs.core.nth.call(null,vec__9102,3,null);var db__$1 = this;if(cljs.core.truth_(e))
{if(cljs.core.truth_(a))
{if(datascript.some_QMARK_.call(null,v))
{if(cljs.core.truth_(tx))
{return datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,a,v,tx,null)));
} else
{return datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,a,v,null,null)));
}
} else
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__9102,e,a,v,tx){
return (function (p1__9085_SHARP_){return cljs.core._EQ_.call(null,tx,p1__9085_SHARP_.tx);
});})(db__$1,vec__9102,e,a,v,tx))
,datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,a,null,null,null))));
} else
{return datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,a,null,null,null)));
}
}
} else
{if(datascript.some_QMARK_.call(null,v))
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__9102,e,a,v,tx){
return (function (p1__9086_SHARP_){return (cljs.core._EQ_.call(null,v,p1__9086_SHARP_.v)) && (cljs.core._EQ_.call(null,tx,p1__9086_SHARP_.tx));
});})(db__$1,vec__9102,e,a,v,tx))
,datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,null,null,null,null))));
} else
{return cljs.core.filter.call(null,((function (db__$1,vec__9102,e,a,v,tx){
return (function (p1__9087_SHARP_){return cljs.core._EQ_.call(null,v,p1__9087_SHARP_.v);
});})(db__$1,vec__9102,e,a,v,tx))
,datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,null,null,null,null))));
}
} else
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__9102,e,a,v,tx){
return (function (p1__9088_SHARP_){return cljs.core._EQ_.call(null,tx,p1__9088_SHARP_.tx);
});})(db__$1,vec__9102,e,a,v,tx))
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
{return cljs.core.filter.call(null,((function (db__$1,vec__9102,e,a,v,tx){
return (function (p1__9089_SHARP_){return cljs.core._EQ_.call(null,tx,p1__9089_SHARP_.tx);
});})(db__$1,vec__9102,e,a,v,tx))
,datascript.btset.slice.call(null,self__.avet,(new datascript.Datom(null,a,v,null,null))));
} else
{return datascript.btset.slice.call(null,self__.avet,(new datascript.Datom(null,a,v,null,null)));
}
} else
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__9102,e,a,v,tx){
return (function (p1__9090_SHARP_){return cljs.core._EQ_.call(null,tx,p1__9090_SHARP_.tx);
});})(db__$1,vec__9102,e,a,v,tx))
,datascript.btset.slice.call(null,self__.avet,(new datascript.Datom(null,a,null,null,null))));
} else
{return datascript.btset.slice.call(null,self__.avet,(new datascript.Datom(null,a,null,null,null)));
}
}
} else
{if(datascript.some_QMARK_.call(null,v))
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__9102,e,a,v,tx){
return (function (p1__9091_SHARP_){return (cljs.core._EQ_.call(null,v,p1__9091_SHARP_.v)) && (cljs.core._EQ_.call(null,tx,p1__9091_SHARP_.tx));
});})(db__$1,vec__9102,e,a,v,tx))
,self__.eavt);
} else
{return cljs.core.filter.call(null,((function (db__$1,vec__9102,e,a,v,tx){
return (function (p1__9092_SHARP_){return cljs.core._EQ_.call(null,v,p1__9092_SHARP_.v);
});})(db__$1,vec__9102,e,a,v,tx))
,self__.eavt);
}
} else
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__9102,e,a,v,tx){
return (function (p1__9093_SHARP_){return cljs.core._EQ_.call(null,tx,p1__9093_SHARP_.tx);
});})(db__$1,vec__9102,e,a,v,tx))
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
datascript.map__GT_DB = (function map__GT_DB(G__9096){return (new datascript.DB(new cljs.core.Keyword(null,"schema","schema",4400883987).cljs$core$IFn$_invoke$arity$1(G__9096),new cljs.core.Keyword(null,"eavt","eavt",1017010124).cljs$core$IFn$_invoke$arity$1(G__9096),new cljs.core.Keyword(null,"aevt","aevt",1016894804).cljs$core$IFn$_invoke$arity$1(G__9096),new cljs.core.Keyword(null,"avet","avet",1016910614).cljs$core$IFn$_invoke$arity$1(G__9096),new cljs.core.Keyword(null,"max-eid","max-eid",1856848841).cljs$core$IFn$_invoke$arity$1(G__9096),new cljs.core.Keyword(null,"max-tx","max-tx",4227685119).cljs$core$IFn$_invoke$arity$1(G__9096),null,cljs.core.dissoc.call(null,G__9096,new cljs.core.Keyword(null,"schema","schema",4400883987),new cljs.core.Keyword(null,"eavt","eavt",1017010124),new cljs.core.Keyword(null,"aevt","aevt",1016894804),new cljs.core.Keyword(null,"avet","avet",1016910614),new cljs.core.Keyword(null,"max-eid","max-eid",1856848841),new cljs.core.Keyword(null,"max-tx","max-tx",4227685119))));
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
datascript.TxReport.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__7014__auto__,k9104,else__7015__auto__){var self__ = this;
var this__7014__auto____$1 = this;var G__9106 = (((k9104 instanceof cljs.core.Keyword))?k9104.fqn:null);var caseval__9233;
switch (G__9106){
case "tempids":
caseval__9233=self__.tempids
break;
case "tx-data":
caseval__9233=self__.tx_data
break;
case "db-after":
caseval__9233=self__.db_after
break;
case "db-before":
caseval__9233=self__.db_before
break;
default:
caseval__9233=cljs.core.get.call(null,self__.__extmap,k9104,else__7015__auto__)
}
return caseval__9233;
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
datascript.TxReport.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__7019__auto__,k__7020__auto__,G__9103){var self__ = this;
var this__7019__auto____$1 = this;var pred__9107 = cljs.core.keyword_identical_QMARK_;var expr__9108 = k__7020__auto__;if(cljs.core.truth_(pred__9107.call(null,new cljs.core.Keyword(null,"db-before","db-before",3838846752),expr__9108)))
{return (new datascript.TxReport(G__9103,self__.db_after,self__.tx_data,self__.tempids,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__9107.call(null,new cljs.core.Keyword(null,"db-after","db-after",1658340159),expr__9108)))
{return (new datascript.TxReport(self__.db_before,G__9103,self__.tx_data,self__.tempids,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__9107.call(null,new cljs.core.Keyword(null,"tx-data","tx-data",4365248709),expr__9108)))
{return (new datascript.TxReport(self__.db_before,self__.db_after,G__9103,self__.tempids,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__9107.call(null,new cljs.core.Keyword(null,"tempids","tempids",3880764886),expr__9108)))
{return (new datascript.TxReport(self__.db_before,self__.db_after,self__.tx_data,G__9103,self__.__meta,self__.__extmap,null));
} else
{return (new datascript.TxReport(self__.db_before,self__.db_after,self__.tx_data,self__.tempids,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__7020__auto__,G__9103),null));
}
}
}
}
});
datascript.TxReport.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__7024__auto__){var self__ = this;
var this__7024__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"db-before","db-before",3838846752),self__.db_before],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"db-after","db-after",1658340159),self__.db_after],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"tx-data","tx-data",4365248709),self__.tx_data],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"tempids","tempids",3880764886),self__.tempids],null))], null),self__.__extmap));
});
datascript.TxReport.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__7011__auto__,G__9103){var self__ = this;
var this__7011__auto____$1 = this;return (new datascript.TxReport(self__.db_before,self__.db_after,self__.tx_data,self__.tempids,G__9103,self__.__extmap,self__.__hash));
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
datascript.map__GT_TxReport = (function map__GT_TxReport(G__9105){return (new datascript.TxReport(new cljs.core.Keyword(null,"db-before","db-before",3838846752).cljs$core$IFn$_invoke$arity$1(G__9105),new cljs.core.Keyword(null,"db-after","db-after",1658340159).cljs$core$IFn$_invoke$arity$1(G__9105),new cljs.core.Keyword(null,"tx-data","tx-data",4365248709).cljs$core$IFn$_invoke$arity$1(G__9105),new cljs.core.Keyword(null,"tempids","tempids",3880764886).cljs$core$IFn$_invoke$arity$1(G__9105),null,cljs.core.dissoc.call(null,G__9105,new cljs.core.Keyword(null,"db-before","db-before",3838846752),new cljs.core.Keyword(null,"db-after","db-after",1658340159),new cljs.core.Keyword(null,"tx-data","tx-data",4365248709),new cljs.core.Keyword(null,"tempids","tempids",3880764886))));
});
datascript.multival_QMARK_ = (function multival_QMARK_(db,attr){return cljs.core._EQ_.call(null,cljs.core.get_in.call(null,db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"schema","schema",4400883987),attr,new cljs.core.Keyword("db","cardinality","db/cardinality",1859321681)], null)),new cljs.core.Keyword("db.cardinality","many","db.cardinality/many",2499141178));
});
datascript.ref_QMARK_ = (function ref_QMARK_(db,attr){return cljs.core._EQ_.call(null,cljs.core.get_in.call(null,db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"schema","schema",4400883987),attr,new cljs.core.Keyword("db","valueType","db/valueType",4543387286)], null)),new cljs.core.Keyword("db.type","ref","db.type/ref",2629452693));
});
datascript.match_tuple = (function match_tuple(tuple,pattern){return cljs.core.every_QMARK_.call(null,cljs.core.true_QMARK_,cljs.core.map.call(null,(function (p1__9111_SHARP_,p2__9110_SHARP_){return ((p2__9110_SHARP_ == null)) || (cljs.core._EQ_.call(null,p1__9111_SHARP_,p2__9110_SHARP_));
}),tuple,pattern));
});
datascript.search = (function search(data,pattern){if((function (){var G__9116 = data;if(G__9116)
{var bit__7076__auto__ = null;if(cljs.core.truth_((function (){var or__6426__auto__ = bit__7076__auto__;if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return G__9116.datascript$ISearch$;
}
})()))
{return true;
} else
{if((!G__9116.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,datascript.ISearch,G__9116);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,datascript.ISearch,G__9116);
}
})())
{return datascript._search.call(null,data,pattern);
} else
{if((function (){var or__6426__auto__ = (function (){var G__9118 = data;if(G__9118)
{var bit__7076__auto__ = (G__9118.cljs$lang$protocol_mask$partition0$ & 8388608);if((bit__7076__auto__) || (G__9118.cljs$core$ISeqable$))
{return true;
} else
{if((!G__9118.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__9118);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__9118);
}
})();if(or__6426__auto__)
{return or__6426__auto__;
} else
{return data instanceof Array;
}
})())
{return cljs.core.filter.call(null,(function (p1__9112_SHARP_){return datascript.match_tuple.call(null,p1__9112_SHARP_,pattern);
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
datascript.advance_max_eid = (function advance_max_eid(db,eid){var G__9120 = db;var G__9120__$1 = (((eid > new cljs.core.Keyword(null,"max-eid","max-eid",1856848841).cljs$core$IFn$_invoke$arity$1(db)))?cljs.core.assoc.call(null,G__9120,new cljs.core.Keyword(null,"max-eid","max-eid",1856848841),eid):G__9120);return G__9120__$1;
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
return (function iter__9129(s__9130){return (new cljs.core.LazySeq(null,((function (eid){
return (function (){var s__9130__$1 = s__9130;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__9130__$1);if(temp__4126__auto__)
{var xs__4624__auto__ = temp__4126__auto__;var vec__9136 = cljs.core.first.call(null,xs__4624__auto__);var a = cljs.core.nth.call(null,vec__9136,0,null);var vs = cljs.core.nth.call(null,vec__9136,1,null);var iterys__7147__auto__ = ((function (s__9130__$1,vec__9136,a,vs,xs__4624__auto__,temp__4126__auto__,eid){
return (function iter__9131(s__9132){return (new cljs.core.LazySeq(null,((function (s__9130__$1,vec__9136,a,vs,xs__4624__auto__,temp__4126__auto__,eid){
return (function (){var s__9132__$1 = s__9132;while(true){
var temp__4126__auto____$1 = cljs.core.seq.call(null,s__9132__$1);if(temp__4126__auto____$1)
{var s__9132__$2 = temp__4126__auto____$1;if(cljs.core.chunked_seq_QMARK_.call(null,s__9132__$2))
{var c__7149__auto__ = cljs.core.chunk_first.call(null,s__9132__$2);var size__7150__auto__ = cljs.core.count.call(null,c__7149__auto__);var b__9134 = cljs.core.chunk_buffer.call(null,size__7150__auto__);if((function (){var i__9133 = 0;while(true){
if((i__9133 < size__7150__auto__))
{var v = cljs.core._nth.call(null,c__7149__auto__,i__9133);cljs.core.chunk_append.call(null,b__9134,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db","add","db/add",1014207040),eid,a,v], null));
{
var G__9234 = (i__9133 + 1);
i__9133 = G__9234;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__9134),iter__9131.call(null,cljs.core.chunk_rest.call(null,s__9132__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__9134),null);
}
} else
{var v = cljs.core.first.call(null,s__9132__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db","add","db/add",1014207040),eid,a,v], null),iter__9131.call(null,cljs.core.rest.call(null,s__9132__$2)));
}
} else
{return null;
}
break;
}
});})(s__9130__$1,vec__9136,a,vs,xs__4624__auto__,temp__4126__auto__,eid))
,null,null));
});})(s__9130__$1,vec__9136,a,vs,xs__4624__auto__,temp__4126__auto__,eid))
;var fs__7148__auto__ = cljs.core.seq.call(null,iterys__7147__auto__.call(null,(((cljs.core.sequential_QMARK_.call(null,vs)) && (datascript.multival_QMARK_.call(null,db,a)))?vs:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [vs], null))));if(fs__7148__auto__)
{return cljs.core.concat.call(null,fs__7148__auto__,iter__9129.call(null,cljs.core.rest.call(null,s__9130__$1)));
} else
{{
var G__9235 = cljs.core.rest.call(null,s__9130__$1);
s__9130__$1 = G__9235;
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
datascript.transact_add = (function transact_add(report,p__9137){var vec__9139 = p__9137;var _ = cljs.core.nth.call(null,vec__9139,0,null);var e = cljs.core.nth.call(null,vec__9139,1,null);var a = cljs.core.nth.call(null,vec__9139,2,null);var v = cljs.core.nth.call(null,vec__9139,3,null);var tx = datascript.current_tx.call(null,report);var db = new cljs.core.Keyword(null,"db-after","db-after",1658340159).cljs$core$IFn$_invoke$arity$1(report);var datom = (new datascript.Datom(e,a,v,tx,true));if(datascript.multival_QMARK_.call(null,db,a))
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
datascript.transact_entities = (function transact_entities(report,p__9140){while(true){
var vec__9144 = p__9140;var entity = cljs.core.nth.call(null,vec__9144,0,null);var entities = cljs.core.nthnext.call(null,vec__9144,1);var es = vec__9144;var db = new cljs.core.Keyword(null,"db-after","db-after",1658340159).cljs$core$IFn$_invoke$arity$1(report);if((entity == null))
{return cljs.core.update_in.call(null,report,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db-after","db-after",1658340159),new cljs.core.Keyword(null,"max-tx","max-tx",4227685119)], null),cljs.core.inc);
} else
{if(cljs.core.map_QMARK_.call(null,entity))
{if(cljs.core.truth_(new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(entity)))
{{
var G__9236 = report;
var G__9237 = cljs.core.concat.call(null,datascript.explode.call(null,db,entity),entities);
report = G__9236;
p__9140 = G__9237;
continue;
}
} else
{var eid = datascript.next_eid.call(null,db);var entity__$1 = cljs.core.assoc.call(null,entity,new cljs.core.Keyword("db","id","db/id",1014111942),eid);{
var G__9238 = datascript.allocate_eid.call(null,report,eid);
var G__9239 = cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [entity__$1], null),entities);
report = G__9238;
p__9140 = G__9239;
continue;
}
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{var vec__9145 = entity;var op = cljs.core.nth.call(null,vec__9145,0,null);var e = cljs.core.nth.call(null,vec__9145,1,null);var a = cljs.core.nth.call(null,vec__9145,2,null);var v = cljs.core.nth.call(null,vec__9145,3,null);if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db.fn","call","db.fn/call",2901959894)))
{var vec__9146 = entity;var _ = cljs.core.nth.call(null,vec__9146,0,null);var f = cljs.core.nth.call(null,vec__9146,1,null);var args = cljs.core.nthnext.call(null,vec__9146,2);{
var G__9240 = report;
var G__9241 = cljs.core.concat.call(null,cljs.core.apply.call(null,f,db,args),entities);
report = G__9240;
p__9140 = G__9241;
continue;
}
} else
{if((e < 0))
{var temp__4124__auto__ = cljs.core.get_in.call(null,report,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tempids","tempids",3880764886),e], null));if(cljs.core.truth_(temp__4124__auto__))
{var eid = temp__4124__auto__;{
var G__9242 = report;
var G__9243 = cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [op,eid,a,v], null)], null),entities);
report = G__9242;
p__9140 = G__9243;
continue;
}
} else
{{
var G__9244 = datascript.allocate_eid.call(null,report,e,datascript.next_eid.call(null,db));
var G__9245 = es;
report = G__9244;
p__9140 = G__9245;
continue;
}
}
} else
{if((datascript.ref_QMARK_.call(null,db,a)) && ((v < 0)))
{var temp__4124__auto__ = cljs.core.get_in.call(null,report,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tempids","tempids",3880764886),v], null));if(cljs.core.truth_(temp__4124__auto__))
{var vid = temp__4124__auto__;{
var G__9246 = report;
var G__9247 = cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [op,e,a,vid], null)], null),entities);
report = G__9246;
p__9140 = G__9247;
continue;
}
} else
{{
var G__9248 = datascript.allocate_eid.call(null,report,v,datascript.next_eid.call(null,db));
var G__9249 = es;
report = G__9248;
p__9140 = G__9249;
continue;
}
}
} else
{if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db","add","db/add",1014207040)))
{{
var G__9250 = datascript.transact_add.call(null,report,entity);
var G__9251 = entities;
report = G__9250;
p__9140 = G__9251;
continue;
}
} else
{if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db","retract","db/retract",2112480480)))
{var temp__4124__auto__ = cljs.core.first.call(null,datascript._search.call(null,db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,v], null)));if(cljs.core.truth_(temp__4124__auto__))
{var old_datom = temp__4124__auto__;{
var G__9252 = datascript.transact_retract_datom.call(null,report,old_datom);
var G__9253 = entities;
report = G__9252;
p__9140 = G__9253;
continue;
}
} else
{{
var G__9254 = report;
var G__9255 = entities;
report = G__9254;
p__9140 = G__9255;
continue;
}
}
} else
{if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db.fn","retractAttribute","db.fn/retractAttribute",3416849171)))
{var datoms = datascript._search.call(null,db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a], null));{
var G__9256 = cljs.core.reduce.call(null,datascript.transact_retract_datom,report,datoms);
var G__9257 = entities;
report = G__9256;
p__9140 = G__9257;
continue;
}
} else
{if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db.fn","retractEntity","db.fn/retractEntity",4213852396)))
{var datoms = datascript._search.call(null,db,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [e], null));{
var G__9258 = cljs.core.reduce.call(null,datascript.transact_retract_datom,report,datoms);
var G__9259 = entities;
report = G__9258;
p__9140 = G__9259;
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
datascript.bind_symbols = (function bind_symbols(form,scope){return cljs.core.map.call(null,(function (p1__9147_SHARP_){return datascript.bind_symbol.call(null,p1__9147_SHARP_,scope);
}),form);
});
datascript.search_datoms = (function search_datoms(source,where,scope){return datascript.search.call(null,datascript.bind_symbol.call(null,source,scope),datascript.bind_symbols.call(null,where,scope));
});
datascript.populate_scope = (function populate_scope(scope,where,datom){return cljs.core.into.call(null,scope,cljs.core.remove.call(null,cljs.core.nil_QMARK_,cljs.core.map.call(null,(function (p1__9148_SHARP_,p2__9149_SHARP_){if(((p1__9148_SHARP_ instanceof cljs.core.Symbol)) && (!(cljs.core.contains_QMARK_.call(null,scope,p1__9148_SHARP_))))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__9148_SHARP_,p2__9149_SHARP_], null);
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
_differ_QMARK_.cljs$lang$applyTo = (function (arglist__9260){
var xs = cljs.core.seq(arglist__9260);
return _differ_QMARK___delegate(xs);
});
_differ_QMARK_.cljs$core$IFn$_invoke$arity$variadic = _differ_QMARK___delegate;
return _differ_QMARK_;
})()
;
datascript.built_ins = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Symbol(null,"true?","true?",-1529891286,null),new cljs.core.Symbol(null,"odd?","odd?",-1637125463,null),new cljs.core.Symbol(null,">=",">=",-1640529544,null),new cljs.core.Symbol(null,">",">",-1640531465,null),new cljs.core.Symbol(null,"nil?","nil?",-1637150201,null),new cljs.core.Symbol(null,"inc","inc",-1640427113,null),new cljs.core.Symbol(null,"/","/",-1640531480,null),new cljs.core.Symbol(null,"quot","quot",-1637049150,null),new cljs.core.Symbol(null,"false?","false?",1372554549,null),new cljs.core.Symbol(null,"-differ?","-differ?",1135976441,null),new cljs.core.Symbol(null,"<=","<=",-1640529606,null),new cljs.core.Symbol(null,"=","=",-1640531466,null),new cljs.core.Symbol(null,"min","min",-1640423413,null),new cljs.core.Symbol(null,"+","+",-1640531484,null),new cljs.core.Symbol(null,"==","==",-1640529575,null),new cljs.core.Symbol(null,"max","max",-1640423651,null),new cljs.core.Symbol(null,"*","*",-1640531485,null),new cljs.core.Symbol(null,"zero?","zero?",-1524740016,null),new cljs.core.Symbol(null,"!=","!=",-1640530443,null),new cljs.core.Symbol(null,"dec","dec",-1640432197,null),new cljs.core.Symbol(null,"not=","not=",-1637144189,null),new cljs.core.Symbol(null,"<","<",-1640531467,null),new cljs.core.Symbol(null,"-","-",-1640531482,null),new cljs.core.Symbol(null,"pos?","pos?",-1637084636,null),new cljs.core.Symbol(null,"mod","mod",-1640423237,null),new cljs.core.Symbol(null,"rem","rem",-1640418733,null),new cljs.core.Symbol(null,"even?","even?",-1543640034,null),new cljs.core.Symbol(null,"neg?","neg?",-1637154200,null)],[cljs.core.true_QMARK_,cljs.core.odd_QMARK_,cljs.core._GT__EQ_,cljs.core._GT_,cljs.core.nil_QMARK_,cljs.core.inc,cljs.core._SLASH_,cljs.core.quot,cljs.core.false_QMARK_,datascript._differ_QMARK_,cljs.core._LT__EQ_,cljs.core._EQ_,cljs.core.min,cljs.core._PLUS_,cljs.core._EQ__EQ_,cljs.core.max,cljs.core._STAR_,cljs.core.zero_QMARK_,cljs.core.not_EQ_,cljs.core.dec,cljs.core.not_EQ_,cljs.core._LT_,cljs.core._,cljs.core.pos_QMARK_,cljs.core.mod,cljs.core.rem,cljs.core.even_QMARK_,cljs.core.neg_QMARK_]);
datascript.call = (function call(p__9150,scope){var vec__9152 = p__9150;var f = cljs.core.nth.call(null,vec__9152,0,null);var args = cljs.core.nthnext.call(null,vec__9152,1);var bound_args = datascript.bind_symbols.call(null,args,scope);var f__$1 = (function (){var or__6426__auto__ = datascript.built_ins.call(null,f);if(cljs.core.truth_(or__6426__auto__))
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
{return (cljs.core.sequential_QMARK_.call(null,form)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,form),cljs.core.count.call(null,pattern))) && (cljs.core.every_QMARK_.call(null,(function (p__9159){var vec__9160 = p__9159;var pattern_el = cljs.core.nth.call(null,vec__9160,0,null);var form_el = cljs.core.nth.call(null,vec__9160,1,null);return looks_like_QMARK_.call(null,pattern_el,form_el);
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
datascript.collect = (function collect(f,coll){return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,(function (p1__9161_SHARP_,p2__9162_SHARP_){return cljs.core.reduce.call(null,cljs.core.conj_BANG_,p1__9161_SHARP_,f.call(null,p2__9162_SHARP_));
}),cljs.core.transient$.call(null,cljs.core.PersistentHashSet.EMPTY),coll));
});
datascript.bind_rule_branch = (function bind_rule_branch(branch,call_args,context){var vec__9170 = branch;var vec__9171 = cljs.core.nth.call(null,vec__9170,0,null);var rule = cljs.core.nth.call(null,vec__9171,0,null);var local_args = cljs.core.nthnext.call(null,vec__9171,1);var body = cljs.core.nthnext.call(null,vec__9170,1);var replacements = cljs.core.zipmap.call(null,local_args,call_args);var seqid = new cljs.core.Keyword(null,"__depth","__depth",2242649685).cljs$core$IFn$_invoke$arity$2(context,0);var bound_body = clojure.walk.postwalk.call(null,((function (vec__9170,vec__9171,rule,local_args,body,replacements,seqid){
return (function (p1__9163_SHARP_){if(((p1__9163_SHARP_ instanceof cljs.core.Symbol)) && (cljs.core._EQ_.call(null,"?",cljs.core.first.call(null,cljs.core.name.call(null,p1__9163_SHARP_)))))
{var or__6426__auto__ = replacements.call(null,p1__9163_SHARP_);if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return cljs.core.symbol.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,p1__9163_SHARP_))+"__auto__"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(seqid)));
}
} else
{return p1__9163_SHARP_;
}
});})(vec__9170,vec__9171,rule,local_args,body,replacements,seqid))
,body);return cljs.core.concat.call(null,(function (){var iter__7151__auto__ = ((function (vec__9170,vec__9171,rule,local_args,body,replacements,seqid,bound_body){
return (function iter__9172(s__9173){return (new cljs.core.LazySeq(null,((function (vec__9170,vec__9171,rule,local_args,body,replacements,seqid,bound_body){
return (function (){var s__9173__$1 = s__9173;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__9173__$1);if(temp__4126__auto__)
{var s__9173__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__9173__$2))
{var c__7149__auto__ = cljs.core.chunk_first.call(null,s__9173__$2);var size__7150__auto__ = cljs.core.count.call(null,c__7149__auto__);var b__9175 = cljs.core.chunk_buffer.call(null,size__7150__auto__);if((function (){var i__9174 = 0;while(true){
if((i__9174 < size__7150__auto__))
{var prev_call_args = cljs.core._nth.call(null,c__7149__auto__,i__9174);cljs.core.chunk_append.call(null,b__9175,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"-differ?","-differ?",1135976441,null)], null),call_args,prev_call_args)], null));
{
var G__9261 = (i__9174 + 1);
i__9174 = G__9261;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__9175),iter__9172.call(null,cljs.core.chunk_rest.call(null,s__9173__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__9175),null);
}
} else
{var prev_call_args = cljs.core.first.call(null,s__9173__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"-differ?","-differ?",1135976441,null)], null),call_args,prev_call_args)], null),iter__9172.call(null,cljs.core.rest.call(null,s__9173__$2)));
}
} else
{return null;
}
break;
}
});})(vec__9170,vec__9171,rule,local_args,body,replacements,seqid,bound_body))
,null,null));
});})(vec__9170,vec__9171,rule,local_args,body,replacements,seqid,bound_body))
;return iter__7151__auto__.call(null,cljs.core.get.call(null,context,rule));
})(),bound_body);
});
datascript._q = (function _q(in_PLUS_sources,wheres,scope){while(true){
if(cljs.core.truth_(cljs.core.not_empty.call(null,in_PLUS_sources)))
{var vec__9189 = cljs.core.first.call(null,in_PLUS_sources);var in$ = cljs.core.nth.call(null,vec__9189,0,null);var source = cljs.core.nth.call(null,vec__9189,1,null);var pred__9190 = datascript.looks_like_QMARK_;var expr__9191 = in$;if(cljs.core.truth_(pred__9190.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1640531432,null),new cljs.core.Symbol(null,"...","...",-1640485849,null)], null),expr__9191)))
{return datascript.collect.call(null,((function (in_PLUS_sources,wheres,scope,pred__9190,expr__9191,vec__9189,in$,source){
return (function (p1__9176_SHARP_){return _q.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,in$),p1__9176_SHARP_], null)], null),cljs.core.next.call(null,in_PLUS_sources)),wheres,scope);
});})(in_PLUS_sources,wheres,scope,pred__9190,expr__9191,vec__9189,in$,source))
,source);
} else
{if(cljs.core.truth_(pred__9190.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null)], null),expr__9191)))
{return datascript.collect.call(null,((function (in_PLUS_sources,wheres,scope,pred__9190,expr__9191,vec__9189,in$,source){
return (function (p1__9177_SHARP_){return _q.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,in$),p1__9177_SHARP_], null)], null),cljs.core.next.call(null,in_PLUS_sources)),wheres,scope);
});})(in_PLUS_sources,wheres,scope,pred__9190,expr__9191,vec__9189,in$,source))
,source);
} else
{if(cljs.core.truth_(pred__9190.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null),expr__9191)))
{{
var G__9262 = cljs.core.concat.call(null,cljs.core.zipmap.call(null,in$,source),cljs.core.next.call(null,in_PLUS_sources));
var G__9263 = wheres;
var G__9264 = scope;
in_PLUS_sources = G__9262;
wheres = G__9263;
scope = G__9264;
continue;
}
} else
{if(cljs.core.truth_(pred__9190.call(null,new cljs.core.Symbol(null,"%","%",-1640531490,null),expr__9191)))
{var rules = ((typeof source === 'string')?cljs.reader.read_string.call(null,source):source);{
var G__9265 = cljs.core.next.call(null,in_PLUS_sources);
var G__9266 = wheres;
var G__9267 = cljs.core.assoc.call(null,scope,new cljs.core.Keyword(null,"__rules","__rules",2256051337),cljs.core.group_by.call(null,cljs.core.ffirst,rules));
in_PLUS_sources = G__9265;
wheres = G__9266;
scope = G__9267;
continue;
}
} else
{if(cljs.core.truth_(pred__9190.call(null,new cljs.core.Symbol(null,"_","_",-1640531432,null),expr__9191)))
{{
var G__9268 = cljs.core.next.call(null,in_PLUS_sources);
var G__9269 = wheres;
var G__9270 = cljs.core.assoc.call(null,scope,in$,source);
in_PLUS_sources = G__9268;
wheres = G__9269;
scope = G__9270;
continue;
}
} else
{throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__9191))));
}
}
}
}
}
} else
{if(cljs.core.truth_(cljs.core.not_empty.call(null,wheres)))
{var where = cljs.core.first.call(null,wheres);var temp__4124__auto__ = cljs.core.get.call(null,new cljs.core.Keyword(null,"__rules","__rules",2256051337).cljs$core$IFn$_invoke$arity$1(scope),cljs.core.first.call(null,where));if(cljs.core.truth_(temp__4124__auto__))
{var rule_branches = temp__4124__auto__;var vec__9193 = where;var rule = cljs.core.nth.call(null,vec__9193,0,null);var call_args = cljs.core.nthnext.call(null,vec__9193,1);var next_scope = cljs.core.update_in.call(null,cljs.core.update_in.call(null,scope,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"__rules_ctx","__rules_ctx",2834098801),rule], null),cljs.core.conj,call_args),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"__rules_ctx","__rules_ctx",2834098801),new cljs.core.Keyword(null,"__depth","__depth",2242649685)], null),cljs.core.inc);var next_wheres = cljs.core.next.call(null,wheres);return datascript.collect.call(null,((function (in_PLUS_sources,wheres,scope,vec__9193,rule,call_args,next_scope,next_wheres,rule_branches,temp__4124__auto__,where){
return (function (p1__9178_SHARP_){return _q.call(null,null,cljs.core.concat.call(null,datascript.bind_rule_branch.call(null,p1__9178_SHARP_,call_args,new cljs.core.Keyword(null,"__rules_ctx","__rules_ctx",2834098801).cljs$core$IFn$_invoke$arity$1(scope)),next_wheres),next_scope);
});})(in_PLUS_sources,wheres,scope,vec__9193,rule,call_args,next_scope,next_wheres,rule_branches,temp__4124__auto__,where))
,rule_branches);
} else
{var pred__9194 = datascript.looks_like_QMARK_;var expr__9195 = where;if(cljs.core.truth_(pred__9194.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null)], null),expr__9195)))
{if(cljs.core.truth_(datascript.call.call(null,cljs.core.first.call(null,where),scope)))
{{
var G__9271 = null;
var G__9272 = cljs.core.next.call(null,wheres);
var G__9273 = scope;
in_PLUS_sources = G__9271;
wheres = G__9272;
scope = G__9273;
continue;
}
} else
{return null;
}
} else
{if(cljs.core.truth_(pred__9194.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null),new cljs.core.Symbol(null,"_","_",-1640531432,null)], null),expr__9195)))
{var res = datascript.call.call(null,cljs.core.first.call(null,where),scope);{
var G__9274 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.second.call(null,where),res], null)], null);
var G__9275 = cljs.core.next.call(null,wheres);
var G__9276 = scope;
in_PLUS_sources = G__9274;
wheres = G__9275;
scope = G__9276;
continue;
}
} else
{if(cljs.core.truth_(pred__9194.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null),expr__9195)))
{var vec__9197 = datascript.parse_where.call(null,where);var source = cljs.core.nth.call(null,vec__9197,0,null);var where__$1 = cljs.core.nth.call(null,vec__9197,1,null);var found = datascript.search_datoms.call(null,source,where__$1,scope);return datascript.collect.call(null,((function (in_PLUS_sources,wheres,scope,vec__9197,source,where__$1,found,pred__9194,expr__9195,temp__4124__auto__,where){
return (function (p1__9179_SHARP_){return _q.call(null,null,cljs.core.next.call(null,wheres),datascript.populate_scope.call(null,scope,where__$1,p1__9179_SHARP_));
});})(in_PLUS_sources,wheres,scope,vec__9197,source,where__$1,found,pred__9194,expr__9195,temp__4124__auto__,where))
,found);
} else
{throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__9195))));
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
var G__9277 = null;
var G__9277__1 = (function (coll){return cljs.core.reduce.call(null,cljs.core.min,coll);
});
var G__9277__2 = (function (n,coll){return cljs.core.vec.call(null,cljs.core.reduce.call(null,(function (acc,x){if((cljs.core.count.call(null,acc) < n))
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
G__9277 = function(n,coll){
switch(arguments.length){
case 1:
return G__9277__1.call(this,n);
case 2:
return G__9277__2.call(this,n,coll);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__9277;
})()
,new cljs.core.Symbol(null,"max","max",-1640423651,null),(function() {
var G__9278 = null;
var G__9278__1 = (function (coll){return cljs.core.reduce.call(null,cljs.core.max,coll);
});
var G__9278__2 = (function (n,coll){return cljs.core.vec.call(null,cljs.core.reduce.call(null,(function (acc,x){if((cljs.core.count.call(null,acc) < n))
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
G__9278 = function(n,coll){
switch(arguments.length){
case 1:
return G__9278__1.call(this,n);
case 2:
return G__9278__2.call(this,n,coll);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__9278;
})()
,new cljs.core.Symbol(null,"sum","sum",-1640417276,null),(function (p1__9198_SHARP_){return cljs.core.reduce.call(null,cljs.core._PLUS_,0,p1__9198_SHARP_);
}),new cljs.core.Symbol(null,"rand","rand",-1637038626,null),(function() {
var G__9279 = null;
var G__9279__1 = (function (coll){return cljs.core.rand_nth.call(null,coll);
});
var G__9279__2 = (function (n,coll){return cljs.core.vec.call(null,cljs.core.repeatedly.call(null,n,(function (){return cljs.core.rand_nth.call(null,coll);
})));
});
G__9279 = function(n,coll){
switch(arguments.length){
case 1:
return G__9279__1.call(this,n);
case 2:
return G__9279__2.call(this,n,coll);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__9279;
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
{var vec__9201 = sym;var f = cljs.core.nth.call(null,vec__9201,0,null);var args = cljs.core.nthnext.call(null,vec__9201,1);var vals = cljs.core.map.call(null,((function (vec__9201,f,args){
return (function (p1__9199_SHARP_){return cljs.core.get.call(null,p1__9199_SHARP_,i);
});})(vec__9201,f,args))
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
return (function (p__9205){var vec__9206 = p__9205;var _ = cljs.core.nth.call(null,vec__9206,0,null);var results__$1 = cljs.core.nth.call(null,vec__9206,1,null);return datascript._aggregate.call(null,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(query),scope,results__$1);
});})(find))
,cljs.core.group_by.call(null,((function (find){
return (function (p1__9202_SHARP_){return datascript.aggr_group_key.call(null,find,p1__9202_SHARP_);
});})(find))
,results));
});
datascript.parse_query = (function parse_query(query){var parsed = cljs.core.PersistentArrayMap.EMPTY;var key = null;var qs = query;while(true){
var temp__4124__auto__ = cljs.core.first.call(null,qs);if(cljs.core.truth_(temp__4124__auto__))
{var q = temp__4124__auto__;if((q instanceof cljs.core.Keyword))
{{
var G__9280 = parsed;
var G__9281 = q;
var G__9282 = cljs.core.next.call(null,qs);
parsed = G__9280;
key = G__9281;
qs = G__9282;
continue;
}
} else
{{
var G__9283 = cljs.core.update_in.call(null,parsed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),q);
var G__9284 = key;
var G__9285 = cljs.core.next.call(null,qs);
parsed = G__9283;
key = G__9284;
qs = G__9285;
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
return (function (p1__9207_SHARP_){if(cljs.core.sequential_QMARK_.call(null,p1__9207_SHARP_))
{return cljs.core.last.call(null,p1__9207_SHARP_);
} else
{return p1__9207_SHARP_;
}
});})(query__$1,ins__GT_sources))
,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(query__$1)),new cljs.core.Keyword(null,"with","with",1017553976).cljs$core$IFn$_invoke$arity$1(query__$1));var results = datascript._q.call(null,ins__GT_sources,new cljs.core.Keyword(null,"where","where",1127002201).cljs$core$IFn$_invoke$arity$1(query__$1),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__find","__find",3824551179),find], null));var G__9210 = results;var G__9210__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"with","with",1017553976).cljs$core$IFn$_invoke$arity$1(query__$1))?cljs.core.mapv.call(null,((function (G__9210,query__$1,ins__GT_sources,find,results){
return (function (p1__9208_SHARP_){return cljs.core.subvec.call(null,p1__9208_SHARP_,0,cljs.core.count.call(null,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(query__$1)));
});})(G__9210,query__$1,ins__GT_sources,find,results))
,G__9210):G__9210);var G__9210__$2 = (cljs.core.truth_(cljs.core.not_empty.call(null,cljs.core.filter.call(null,cljs.core.sequential_QMARK_,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(query__$1))))?datascript.aggregate.call(null,query__$1,ins__GT_sources,G__9210__$1):G__9210__$1);return G__9210__$2;
};
var q = function (query,var_args){
var sources = null;if (arguments.length > 1) {
  sources = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return q__delegate.call(this,query,sources);};
q.cljs$lang$maxFixedArity = 1;
q.cljs$lang$applyTo = (function (arglist__9286){
var query = cljs.core.first(arglist__9286);
var sources = cljs.core.rest(arglist__9286);
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
var empty_db__delegate = function (p__9211){var vec__9213 = p__9211;var schema = cljs.core.nth.call(null,vec__9213,0,null);return (new datascript.DB(schema,datascript.btset.btset_by.call(null,datascript.cmp_datoms_eavt),datascript.btset.btset_by.call(null,datascript.cmp_datoms_aevt),datascript.btset.btset_by.call(null,datascript.cmp_datoms_avet),0,datascript.tx0));
};
var empty_db = function (var_args){
var p__9211 = null;if (arguments.length > 0) {
  p__9211 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return empty_db__delegate.call(this,p__9211);};
empty_db.cljs$lang$maxFixedArity = 0;
empty_db.cljs$lang$applyTo = (function (arglist__9287){
var p__9211 = cljs.core.seq(arglist__9287);
return empty_db__delegate(p__9211);
});
empty_db.cljs$core$IFn$_invoke$arity$variadic = empty_db__delegate;
return empty_db;
})()
;
/**
* @param {...*} var_args
*/
datascript.create_conn = (function() { 
var create_conn__delegate = function (p__9214){var vec__9216 = p__9214;var schema = cljs.core.nth.call(null,vec__9216,0,null);return cljs.core.atom.call(null,datascript.empty_db.call(null,schema),new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"listeners","listeners",4090152369),cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY)], null));
};
var create_conn = function (var_args){
var p__9214 = null;if (arguments.length > 0) {
  p__9214 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return create_conn__delegate.call(this,p__9214);};
create_conn.cljs$lang$maxFixedArity = 0;
create_conn.cljs$lang$applyTo = (function (arglist__9288){
var p__9214 = cljs.core.seq(arglist__9288);
return create_conn__delegate(p__9214);
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
datascript.transact_BANG_ = (function transact_BANG_(conn,entities){var report = datascript._transact_BANG_.call(null,conn,entities);var seq__9223_9289 = cljs.core.seq.call(null,cljs.core.deref.call(null,new cljs.core.Keyword(null,"listeners","listeners",4090152369).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,conn))));var chunk__9224_9290 = null;var count__9225_9291 = 0;var i__9226_9292 = 0;while(true){
if((i__9226_9292 < count__9225_9291))
{var vec__9227_9293 = cljs.core._nth.call(null,chunk__9224_9290,i__9226_9292);var __9294 = cljs.core.nth.call(null,vec__9227_9293,0,null);var callback_9295 = cljs.core.nth.call(null,vec__9227_9293,1,null);callback_9295.call(null,report);
{
var G__9296 = seq__9223_9289;
var G__9297 = chunk__9224_9290;
var G__9298 = count__9225_9291;
var G__9299 = (i__9226_9292 + 1);
seq__9223_9289 = G__9296;
chunk__9224_9290 = G__9297;
count__9225_9291 = G__9298;
i__9226_9292 = G__9299;
continue;
}
} else
{var temp__4126__auto___9300 = cljs.core.seq.call(null,seq__9223_9289);if(temp__4126__auto___9300)
{var seq__9223_9301__$1 = temp__4126__auto___9300;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9223_9301__$1))
{var c__7182__auto___9302 = cljs.core.chunk_first.call(null,seq__9223_9301__$1);{
var G__9303 = cljs.core.chunk_rest.call(null,seq__9223_9301__$1);
var G__9304 = c__7182__auto___9302;
var G__9305 = cljs.core.count.call(null,c__7182__auto___9302);
var G__9306 = 0;
seq__9223_9289 = G__9303;
chunk__9224_9290 = G__9304;
count__9225_9291 = G__9305;
i__9226_9292 = G__9306;
continue;
}
} else
{var vec__9228_9307 = cljs.core.first.call(null,seq__9223_9301__$1);var __9308 = cljs.core.nth.call(null,vec__9228_9307,0,null);var callback_9309 = cljs.core.nth.call(null,vec__9228_9307,1,null);callback_9309.call(null,report);
{
var G__9310 = cljs.core.next.call(null,seq__9223_9301__$1);
var G__9311 = null;
var G__9312 = 0;
var G__9313 = 0;
seq__9223_9289 = G__9310;
chunk__9224_9290 = G__9311;
count__9225_9291 = G__9312;
i__9226_9292 = G__9313;
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
datascript.components__GT_pattern = (function components__GT_pattern(index,cs){var G__9230 = (((index instanceof cljs.core.Keyword))?index.fqn:null);var caseval__9314;
switch (G__9230){
case "avet":
caseval__9314=(new datascript.Datom(cljs.core.nth.call(null,cs,2,null),cljs.core.nth.call(null,cs,0,null),cljs.core.nth.call(null,cs,1,null),cljs.core.nth.call(null,cs,3,null),null))
break;
case "aevt":
caseval__9314=(new datascript.Datom(cljs.core.nth.call(null,cs,1,null),cljs.core.nth.call(null,cs,0,null),cljs.core.nth.call(null,cs,2,null),cljs.core.nth.call(null,cs,3,null),null))
break;
case "eavt":
caseval__9314=(new datascript.Datom(cljs.core.nth.call(null,cs,0,null),cljs.core.nth.call(null,cs,1,null),cljs.core.nth.call(null,cs,2,null),cljs.core.nth.call(null,cs,3,null),null))
break;
default:
caseval__9314=(function(){throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(index))))})()
}
return caseval__9314;
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
datoms.cljs$lang$applyTo = (function (arglist__9315){
var db = cljs.core.first(arglist__9315);
arglist__9315 = cljs.core.next(arglist__9315);
var index = cljs.core.first(arglist__9315);
var cs = cljs.core.rest(arglist__9315);
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
seek_datoms.cljs$lang$applyTo = (function (arglist__9316){
var db = cljs.core.first(arglist__9316);
arglist__9316 = cljs.core.next(arglist__9316);
var index = cljs.core.first(arglist__9316);
var cs = cljs.core.rest(arglist__9316);
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
return datascript.listen_BANG_.call(null,lt.plugins.kukui.datascript.conn,new cljs.core.Keyword(null,"db-history","db-history",3844499895),(function (p1__9426_SHARP_){return cljs.core.swap_BANG_.call(null,lt.plugins.kukui.datascript.reports,cljs.core.conj,p1__9426_SHARP_);
}));
};
var reset_connection_BANG_ = function (var_args){
var args = null;if (arguments.length > 0) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return reset_connection_BANG___delegate.call(this,args);};
reset_connection_BANG_.cljs$lang$maxFixedArity = 0;
reset_connection_BANG_.cljs$lang$applyTo = (function (arglist__9428){
var args = cljs.core.seq(arglist__9428);
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
q.cljs$lang$applyTo = (function (arglist__9429){
var query = cljs.core.first(arglist__9429);
var args = cljs.core.rest(arglist__9429);
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
qf.cljs$lang$applyTo = (function (arglist__9430){
var query = cljs.core.first(arglist__9430);
var args = cljs.core.rest(arglist__9430);
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
var qe__delegate = function (query,args){return cljs.core.map.call(null,(function (p1__9427_SHARP_){return lt.plugins.kukui.datascript.entity.call(null,cljs.core.first.call(null,p1__9427_SHARP_));
}),cljs.core.apply.call(null,lt.plugins.kukui.datascript.q,query,args));
};
var qe = function (query,var_args){
var args = null;if (arguments.length > 1) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return qe__delegate.call(this,query,args);};
qe.cljs$lang$maxFixedArity = 1;
qe.cljs$lang$applyTo = (function (arglist__9431){
var query = cljs.core.first(arglist__9431);
var args = cljs.core.rest(arglist__9431);
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
var counter_9432 = cljs.core.atom.call(null,0);lt.plugins.kukui.datascript.tempid = ((function (counter_9432){
return (function tempid(){return cljs.core.swap_BANG_.call(null,counter_9432,cljs.core.dec);
});})(counter_9432))
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
/**
* Similar to codemirror fold/unfold-all but condition is given line number
*/
lt.plugins.kukui.util.toggle_all = (function() {
var toggle_all = null;
var toggle_all__2 = (function (ed,condition){return toggle_all.call(null,ed,condition,cljs.core.range.call(null,lt.objs.editor.first_line.call(null,ed),(lt.objs.editor.last_line.call(null,ed) + 1)));
});
var toggle_all__3 = (function (ed,condition,lines){return lt.objs.editor.operation.call(null,ed,(function (){var seq__10058 = cljs.core.seq.call(null,lines);var chunk__10059 = null;var count__10060 = 0;var i__10061 = 0;while(true){
if((i__10061 < count__10060))
{var line = cljs.core._nth.call(null,chunk__10059,i__10061);if(cljs.core.truth_(condition.call(null,line)))
{lt.plugins.sacha.codemirror.fold_code.call(null,ed,{"ch": 0, "line": line},null);
} else
{}
{
var G__10063 = seq__10058;
var G__10064 = chunk__10059;
var G__10065 = count__10060;
var G__10066 = (i__10061 + 1);
seq__10058 = G__10063;
chunk__10059 = G__10064;
count__10060 = G__10065;
i__10061 = G__10066;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__10058);if(temp__4126__auto__)
{var seq__10058__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__10058__$1))
{var c__7182__auto__ = cljs.core.chunk_first.call(null,seq__10058__$1);{
var G__10067 = cljs.core.chunk_rest.call(null,seq__10058__$1);
var G__10068 = c__7182__auto__;
var G__10069 = cljs.core.count.call(null,c__7182__auto__);
var G__10070 = 0;
seq__10058 = G__10067;
chunk__10059 = G__10068;
count__10060 = G__10069;
i__10061 = G__10070;
continue;
}
} else
{var line = cljs.core.first.call(null,seq__10058__$1);if(cljs.core.truth_(condition.call(null,line)))
{lt.plugins.sacha.codemirror.fold_code.call(null,ed,{"ch": 0, "line": line},null);
} else
{}
{
var G__10071 = cljs.core.next.call(null,seq__10058__$1);
var G__10072 = null;
var G__10073 = 0;
var G__10074 = 0;
seq__10058 = G__10071;
chunk__10059 = G__10072;
count__10060 = G__10073;
i__10061 = G__10074;
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
lt.plugins.kukui.util.sibling_lines = (function sibling_lines(ed,line){var parent_lines = lt.plugins.kukui.util.find_parent_lines.call(null,ed,line);var current_indent = lt.plugins.sacha.codemirror.line_indent.call(null,ed,line);return cljs.core.filter.call(null,((function (parent_lines,current_indent){
return (function (p1__10062_SHARP_){if(cljs.core._EQ_.call(null,current_indent,lt.plugins.sacha.codemirror.line_indent.call(null,ed,p1__10062_SHARP_)))
{return p1__10062_SHARP_;
} else
{return null;
}
});})(parent_lines,current_indent))
,parent_lines);
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
lt.plugins.kukui.db.__GT_nodes = (function __GT_nodes(lines){return cljs.core.map.call(null,(function (p__9435){var vec__9436 = p__9435;var id = cljs.core.nth.call(null,vec__9436,0,null);var tag_tuples = cljs.core.nth.call(null,vec__9436,1,null);return cljs.core.assoc.call(null,lt.plugins.kukui.datascript.entity.call(null,id),new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.set.call(null,cljs.core.map.call(null,cljs.core.second,tag_tuples)));
}),cljs.core.group_by.call(null,cljs.core.first,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?name","?name",-1578975997,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?name","?name",-1578975997,null)], null),cljs.core.list(new cljs.core.Symbol(null,"lines","lines",-1537554248,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null))], null),lt.plugins.kukui.db.rules,cljs.core.first.call(null,lines),cljs.core.last.call(null,lines))));
});
lt.plugins.kukui.db.attr_counts = (function attr_counts(lines,attr){return cljs.core.sort_by.call(null,cljs.core.comp.call(null,cljs.core._,cljs.core.second),lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null)),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null),cljs.core.list(new cljs.core.Symbol(null,"lines","lines",-1537554248,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null))], null),lt.plugins.kukui.db.rules,cljs.core.first.call(null,lines),cljs.core.last.call(null,lines),attr));
});
lt.plugins.kukui.db.tag_counts = (function tag_counts(lines){return cljs.core.reduce.call(null,(function (p1__9437_SHARP_,p2__9438_SHARP_){return cljs.core.assoc_in.call(null,p1__9437_SHARP_,cljs.core.butlast.call(null,p2__9438_SHARP_),cljs.core.last.call(null,p2__9438_SHARP_));
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.mapcat.call(null,cljs.core.identity,cljs.core.vals.call(null,cljs.core.group_by.call(null,cljs.core.first,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 14, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null)),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.Symbol(null,"?t","?t",-1640529458,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t","?t",-1640529458,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t","?t",-1640529458,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null)], null),cljs.core.list(new cljs.core.Symbol(null,"lines","lines",-1537554248,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null))], null),lt.plugins.kukui.db.rules,cljs.core.first.call(null,lines),cljs.core.last.call(null,lines))))));
});
/**
* Returns a list of types with each type having entity names of that type
*/
lt.plugins.kukui.db.types_and_names = (function types_and_names(){return cljs.core.map.call(null,(function (p__9441){var vec__9442 = p__9441;var type = cljs.core.nth.call(null,vec__9442,0,null);var pairs = cljs.core.nth.call(null,vec__9442,1,null);return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1017479852),type,new cljs.core.Keyword(null,"names","names",1118489274),cljs.core.map.call(null,cljs.core.second,pairs)], null);
}),cljs.core.group_by.call(null,cljs.core.first,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Symbol(null,"?name","?name",-1578975997,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?children","?children",2113480951,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?children","?children",2113480951,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?name","?name",-1578975997,null)], null)], null))));
});
lt.plugins.kukui.db.must_have_unique_name = (function must_have_unique_name(entities){var existing_tags = lt.plugins.kukui.db.name_id_map.call(null);var names = cljs.core.set.call(null,cljs.core.keys.call(null,existing_tags));var invalid = cljs.core.filter.call(null,((function (existing_tags,names){
return (function (p1__9443_SHARP_){var and__6414__auto__ = new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__9443_SHARP_);if(cljs.core.truth_(and__6414__auto__))
{return cljs.core.contains_QMARK_.call(null,names,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__9443_SHARP_));
} else
{return and__6414__auto__;
}
});})(existing_tags,names))
,entities);var invalid__$1 = cljs.core.into.call(null,invalid,cljs.core.mapcat.call(null,((function (existing_tags,names,invalid){
return (function (p1__9444_SHARP_){if((cljs.core.count.call(null,p1__9444_SHARP_) > 1))
{return p1__9444_SHARP_;
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
lt.plugins.kukui.db.must_have_string_name = (function must_have_string_name(entities){var temp__4126__auto___9451 = cljs.core.seq.call(null,cljs.core.remove.call(null,(function (p1__9446_SHARP_){return typeof new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__9446_SHARP_) === 'string';
}),cljs.core.filter.call(null,(function (p1__9445_SHARP_){return cljs.core.contains_QMARK_.call(null,p1__9445_SHARP_,new cljs.core.Keyword(null,"name","name",1017277949));
}),entities)));if(temp__4126__auto___9451)
{var invalid_9452 = temp__4126__auto___9451;cljs.core.prn.call(null,"INVALID",invalid_9452);
throw cljs.core.ex_info.call(null,("Names must be strings:"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.map.call(null,new cljs.core.Keyword(null,"name","name",1017277949),invalid_9452))),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"invalid","invalid",2973689193),invalid_9452], null));
} else
{}
return entities;
});
lt.plugins.kukui.db.must_require_type = (function must_require_type(entities){var invalid = cljs.core.remove.call(null,new cljs.core.Keyword(null,"type","type",1017479852),cljs.core.remove.call(null,(function (p1__9447_SHARP_){return (cljs.core.integer_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__9447_SHARP_))) || (cljs.core.seq.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__9447_SHARP_)));
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
return (function (p1__9483_SHARP_){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__9483_SHARP_),tag_name);
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
return (function (p1__9484_SHARP_){return cljs.core.assoc.call(null,p1__9484_SHARP_,new cljs.core.Keyword("db","id","db/id",1014111942),lt.plugins.kukui.datascript.tempid.call(null));
});})(new_tags))
,entities);var tag_id = cljs.core.partial.call(null,lt.plugins.kukui.sync.__GT_tag_id,entities__$1,lt.plugins.kukui.db.name_id_map.call(null),new_tags);var entities_with_tags = cljs.core.doall.call(null,cljs.core.mapcat.call(null,((function (new_tags,entities__$1,tag_id){
return (function (ent){return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.dissoc.call(null,ent,new cljs.core.Keyword(null,"tags","tags",1017456523))], null),cljs.core.map.call(null,((function (new_tags,entities__$1,tag_id){
return (function (p1__9485_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword("db","id","db/id",1014111942),new cljs.core.Keyword(null,"tags","tags",1017456523)],[new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(ent),tag_id.call(null,p1__9485_SHARP_)]);
});})(new_tags,entities__$1,tag_id))
,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(ent)));
});})(new_tags,entities__$1,tag_id))
,entities__$1));return cljs.core.into.call(null,cljs.core.map.call(null,((function (new_tags,entities__$1,tag_id,entities_with_tags){
return (function (p__9488){var vec__9489 = p__9488;var tag = cljs.core.nth.call(null,vec__9489,0,null);var id = cljs.core.nth.call(null,vec__9489,1,null);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("db","id","db/id",1014111942),id,new cljs.core.Keyword(null,"name","name",1017277949),tag,new cljs.core.Keyword(null,"type","type",1017479852),lt.plugins.kukui.db.unknown_type], null);
});})(new_tags,entities__$1,tag_id,entities_with_tags))
,cljs.core.deref.call(null,new_tags)),entities_with_tags);
});
lt.plugins.kukui.sync.add_types = (function add_types(entities){var existing_types = cljs.core.set.call(null,lt.plugins.kukui.datascript.qf.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null)], null)));return cljs.core.into.call(null,entities,cljs.core.map.call(null,((function (existing_types){
return (function (p1__9491_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"type","type",1017479852)],[p1__9491_SHARP_,lt.plugins.kukui.db.root_type]);
});})(existing_types))
,cljs.core.remove.call(null,((function (existing_types){
return (function (p1__9490_SHARP_){return cljs.core.contains_QMARK_.call(null,existing_types,p1__9490_SHARP_);
});})(existing_types))
,cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"type","type",1017479852),entities)))));
});
lt.plugins.kukui.sync.add_ids_by_line = (function add_ids_by_line(nodes){var line_entities = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?l","?l",-1640529466,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Symbol(null,"?l","?l",-1640529466,null)], null)], null)));return cljs.core.map.call(null,((function (line_entities){
return (function (p1__9492_SHARP_){if(cljs.core.truth_(new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(p1__9492_SHARP_)))
{return p1__9492_SHARP_;
} else
{return cljs.core.assoc.call(null,p1__9492_SHARP_,new cljs.core.Keyword("db","id","db/id",1014111942),cljs.core.get.call(null,line_entities,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(p1__9492_SHARP_)));
}
});})(line_entities))
,nodes);
});
lt.plugins.kukui.sync.node_diff_STAR_ = (function node_diff_STAR_(nodes1,nodes2){var old_nodes = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,cljs.core.juxt.call(null,new cljs.core.Keyword(null,"text","text",1017460895),cljs.core.identity),nodes1));var name_entities = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (old_nodes){
return (function (p__9495){var vec__9496 = p__9495;var name = cljs.core.nth.call(null,vec__9496,0,null);var id = cljs.core.nth.call(null,vec__9496,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [name,lt.plugins.kukui.datascript.entity.call(null,id)], null);
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
lt.plugins.kukui.sync.node_diff = (function node_diff(nodes1,nodes2){return cljs.core.update_in.call(null,cljs.core.update_in.call(null,cljs.core.update_in.call(null,lt.plugins.kukui.sync.node_diff_STAR_.call(null,nodes1,nodes2),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"updated","updated",779473965)], null),lt.plugins.kukui.sync.add_ids_by_line),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"updated","updated",779473965)], null),(function (nodes){return cljs.core.map.call(null,(function (p1__9497_SHARP_){if(cljs.core.truth_(new cljs.core.Keyword(null,"new-line","new-line",2344820595).cljs$core$IFn$_invoke$arity$1(p1__9497_SHARP_)))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("db","id","db/id",1014111942),new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(p1__9497_SHARP_),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"new-line","new-line",2344820595).cljs$core$IFn$_invoke$arity$1(p1__9497_SHARP_)], null);
} else
{return p1__9497_SHARP_;
}
}),nodes);
})),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"deleted","deleted",2564367243)], null),lt.plugins.kukui.sync.add_ids_by_line);
});
lt.plugins.kukui.sync.__GT_new_entities = (function __GT_new_entities(nodes){return lt.plugins.kukui.db.must_require_type.call(null,lt.plugins.kukui.db.must_have_string_name.call(null,lt.plugins.kukui.db.must_have_unique_name.call(null,lt.plugins.kukui.sync.expand_tags.call(null,lt.plugins.kukui.sync.add_types.call(null,nodes)))));
});
lt.plugins.kukui.sync.must_have_ids = (function must_have_ids(entities){var temp__4126__auto___9504 = cljs.core.seq.call(null,cljs.core.remove.call(null,new cljs.core.Keyword("db","id","db/id",1014111942),entities));if(temp__4126__auto___9504)
{var invalid_entities_9505 = temp__4126__auto___9504;cljs.core.prn.call(null,"Invalid entities",invalid_entities_9505);
throw cljs.core.ex_info.call(null,("Cannot update these entities without their ids: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,invalid_entities_9505))),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"invalid","invalid",2973689193),invalid_entities_9505], null));
} else
{}
return entities;
});
/**
* Maps files to their last few node snapshots.
* Used to determine what changed since last edit.
*/
lt.plugins.kukui.sync.last_edits = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lt.plugins.kukui.sync.sync_entities = (function sync_entities(nodes,file){var map__9500 = lt.plugins.kukui.sync.node_diff.call(null,cljs.core.last.call(null,cljs.core.get.call(null,cljs.core.deref.call(null,lt.plugins.kukui.sync.last_edits),file)),nodes);var map__9500__$1 = ((cljs.core.seq_QMARK_.call(null,map__9500))?cljs.core.apply.call(null,cljs.core.hash_map,map__9500):map__9500);var updated = cljs.core.get.call(null,map__9500__$1,new cljs.core.Keyword(null,"updated","updated",779473965));var deleted = cljs.core.get.call(null,map__9500__$1,new cljs.core.Keyword(null,"deleted","deleted",2564367243));var added = cljs.core.get.call(null,map__9500__$1,new cljs.core.Keyword(null,"added","added",1106564210));return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"added","added",1106564210),lt.plugins.kukui.sync.__GT_new_entities.call(null,added),new cljs.core.Keyword(null,"updated","updated",779473965),lt.plugins.kukui.sync.must_have_ids.call(null,updated),new cljs.core.Keyword(null,"deleted","deleted",2564367243),cljs.core.mapv.call(null,((function (map__9500,map__9500__$1,updated,deleted,added){
return (function (p1__9498_SHARP_){return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword("db.fn","retractEntity","db.fn/retractEntity",4213852396),new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(p1__9498_SHARP_)],null));
});})(map__9500,map__9500__$1,updated,deleted,added))
,lt.plugins.kukui.sync.must_have_ids.call(null,deleted))], null);
});
lt.plugins.kukui.sync.save_latest_edit = (function save_latest_edit(nodes,file){return cljs.core.swap_BANG_.call(null,lt.plugins.kukui.sync.last_edits,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file], null),(function (p1__9501_SHARP_){return cljs.core.concat.call(null,cljs.core.take_last.call(null,2,p1__9501_SHARP_),cljs.core._conj.call(null,cljs.core.List.EMPTY,nodes));
}));
});
lt.plugins.kukui.sync.sync = (function sync(nodes,file){var map__9503 = lt.plugins.kukui.sync.sync_entities.call(null,nodes,file);var map__9503__$1 = ((cljs.core.seq_QMARK_.call(null,map__9503))?cljs.core.apply.call(null,cljs.core.hash_map,map__9503):map__9503);var updated = cljs.core.get.call(null,map__9503__$1,new cljs.core.Keyword(null,"updated","updated",779473965));var deleted = cljs.core.get.call(null,map__9503__$1,new cljs.core.Keyword(null,"deleted","deleted",2564367243));var added = cljs.core.get.call(null,map__9503__$1,new cljs.core.Keyword(null,"added","added",1106564210));cljs.core.println.call(null,"Added/deleted/updated: ",cljs.core.count.call(null,added),"/",cljs.core.count.call(null,deleted),"/",cljs.core.count.call(null,updated));
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
return (function (p1__9453_SHARP_,p2__9454_SHARP_){return f.call(null,p1__9453_SHARP_,p2__9454_SHARP_,node);
});})(type_tags,type_tags__$1))
,accum,type_tags__$1);
}),cljs.core.PersistentArrayMap.EMPTY,nodes);
});
lt.plugins.kukui.live.type_counts = cljs.core.partial.call(null,lt.plugins.kukui.live.type_nodes__GT_tag_map,(function (p1__9455_SHARP_,p2__9456_SHARP_){return cljs.core.update_in.call(null,p1__9455_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p2__9456_SHARP_], null),cljs.core.inc);
}));
lt.plugins.kukui.live.types_counts = (function types_counts(ed,lines){var nodes = lt.plugins.kukui.node.ed__GT_nodes.call(null,ed,lines);var types = lt.plugins.kukui.db.types_and_names.call(null);return cljs.core.keep.call(null,((function (nodes,types){
return (function (p1__9457_SHARP_){var counts = lt.plugins.kukui.live.type_counts.call(null,cljs.core.some.call(null,((function (nodes,types){
return (function (x){if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(x),p1__9457_SHARP_))
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
{return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[p1__9457_SHARP_,counts],null));
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
return (function (p1__9458_SHARP_){if(cljs.core.contains_QMARK_.call(null,cljs.core.set.call(null,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(p1__9458_SHARP_)),tag))
{return new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(p1__9458_SHARP_);
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
lt.plugins.kukui.live.attribute_counts = (function attribute_counts(nodes){var seq__9463 = cljs.core.seq.call(null,cljs.core.disj.call(null,cljs.core.set.call(null,cljs.core.mapcat.call(null,cljs.core.keys,nodes)),new cljs.core.Keyword(null,"desc","desc",1016984067),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.Keyword(null,"indent","indent",4124632094),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"text","text",1017460895)));var chunk__9464 = null;var count__9465 = 0;var i__9466 = 0;while(true){
if((i__9466 < count__9465))
{var attr = cljs.core._nth.call(null,chunk__9464,i__9466);lt.plugins.kukui.live.attribute_counts_STAR_.call(null,nodes,attr);
{
var G__9467 = seq__9463;
var G__9468 = chunk__9464;
var G__9469 = count__9465;
var G__9470 = (i__9466 + 1);
seq__9463 = G__9467;
chunk__9464 = G__9468;
count__9465 = G__9469;
i__9466 = G__9470;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__9463);if(temp__4126__auto__)
{var seq__9463__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9463__$1))
{var c__7182__auto__ = cljs.core.chunk_first.call(null,seq__9463__$1);{
var G__9471 = cljs.core.chunk_rest.call(null,seq__9463__$1);
var G__9472 = c__7182__auto__;
var G__9473 = cljs.core.count.call(null,c__7182__auto__);
var G__9474 = 0;
seq__9463 = G__9471;
chunk__9464 = G__9472;
count__9465 = G__9473;
i__9466 = G__9474;
continue;
}
} else
{var attr = cljs.core.first.call(null,seq__9463__$1);lt.plugins.kukui.live.attribute_counts_STAR_.call(null,nodes,attr);
{
var G__9475 = cljs.core.next.call(null,seq__9463__$1);
var G__9476 = null;
var G__9477 = 0;
var G__9478 = 0;
seq__9463 = G__9475;
chunk__9464 = G__9476;
count__9465 = G__9477;
i__9466 = G__9478;
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
lt.plugins.kukui.selector.selector = (function selector(opts){var G__9482 = lt.objs.sidebar.command.filter_list.call(null,opts);lt.object.add_behavior_BANG_.call(null,G__9482,new cljs.core.Keyword("lt.plugins.kukui.selector","set-selected","lt.plugins.kukui.selector/set-selected",3025761911));
return G__9482;
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
return (function (p__9905){var vec__9906 = p__9905;var type = cljs.core.nth.call(null,vec__9906,0,null);var tag_map = cljs.core.nth.call(null,vec__9906,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.apply.call(null,cljs.core._PLUS_,cljs.core.vals.call(null,tag_map))], null);
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
lt.plugins.kukui.type_map = cljs.core.partial.call(null,lt.plugins.kukui.live.type_nodes__GT_tag_map,(function (p1__9907_SHARP_,p2__9908_SHARP_,p3__9909_SHARP_){return cljs.core.update_in.call(null,p1__9907_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p2__9908_SHARP_], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),p3__9909_SHARP_);
}));
lt.plugins.kukui.add_tags_to_node = (function add_tags_to_node(node,tags){return cljs.core.update_in.call(null,node,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",1017460895)], null),cljs.core.str,clojure.string.join.call(null,cljs.core.map.call(null,(function (p1__9910_SHARP_){return (" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__9910_SHARP_));
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
return (function (p__9928){var vec__9929 = p__9928;var node = cljs.core.nth.call(null,vec__9929,0,null);var c = cljs.core.nth.call(null,vec__9929,1,null);if((c > 1))
{return node;
} else
{return null;
}
});})(freqs))
,freqs);var most_popular_tag = ((function (freqs,dups){
return (function (p1__9911_SHARP_){return cljs.core.first.call(null,cljs.core.apply.call(null,cljs.core.max_key,((function (freqs,dups){
return (function (p__9930){var vec__9931 = p__9930;var tag = cljs.core.nth.call(null,vec__9931,0,null);var nodes = cljs.core.nth.call(null,vec__9931,1,null);if(cljs.core.contains_QMARK_.call(null,p1__9911_SHARP_,tag))
{return cljs.core.count.call(null,nodes);
} else
{return null;
}
});})(freqs,dups))
,tags_nodes));
});})(freqs,dups))
;var tag_dups = cljs.core.map.call(null,((function (freqs,dups,most_popular_tag){
return (function (p1__9912_SHARP_){return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[most_popular_tag.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__9912_SHARP_)),p1__9912_SHARP_],null));
});})(freqs,dups,most_popular_tag))
,dups);var disallowed_node_QMARK_ = ((function (freqs,dups,most_popular_tag,tag_dups){
return (function (node,tag){return cljs.core.some.call(null,((function (freqs,dups,most_popular_tag,tag_dups){
return (function (p__9932){var vec__9933 = p__9932;var allowed_tag = cljs.core.nth.call(null,vec__9933,0,null);var dup_node = cljs.core.nth.call(null,vec__9933,1,null);return (cljs.core._EQ_.call(null,dup_node,node)) && (cljs.core.not_EQ_.call(null,allowed_tag,tag));
});})(freqs,dups,most_popular_tag,tag_dups))
,tag_dups);
});})(freqs,dups,most_popular_tag,tag_dups))
;var seq__9934_9964 = cljs.core.seq.call(null,tag_dups);var chunk__9935_9965 = null;var count__9936_9966 = 0;var i__9937_9967 = 0;while(true){
if((i__9937_9967 < count__9936_9966))
{var vec__9938_9968 = cljs.core._nth.call(null,chunk__9935_9965,i__9937_9967);var tag_9969 = cljs.core.nth.call(null,vec__9938_9968,0,null);var node_9970 = cljs.core.nth.call(null,vec__9938_9968,1,null);cljs.core.println.call(null,("Line '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node_9970))+"' has overlapping tags. Put line under "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(tag_9969)));
{
var G__9971 = seq__9934_9964;
var G__9972 = chunk__9935_9965;
var G__9973 = count__9936_9966;
var G__9974 = (i__9937_9967 + 1);
seq__9934_9964 = G__9971;
chunk__9935_9965 = G__9972;
count__9936_9966 = G__9973;
i__9937_9967 = G__9974;
continue;
}
} else
{var temp__4126__auto___9975 = cljs.core.seq.call(null,seq__9934_9964);if(temp__4126__auto___9975)
{var seq__9934_9976__$1 = temp__4126__auto___9975;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9934_9976__$1))
{var c__7182__auto___9977 = cljs.core.chunk_first.call(null,seq__9934_9976__$1);{
var G__9978 = cljs.core.chunk_rest.call(null,seq__9934_9976__$1);
var G__9979 = c__7182__auto___9977;
var G__9980 = cljs.core.count.call(null,c__7182__auto___9977);
var G__9981 = 0;
seq__9934_9964 = G__9978;
chunk__9935_9965 = G__9979;
count__9936_9966 = G__9980;
i__9937_9967 = G__9981;
continue;
}
} else
{var vec__9939_9982 = cljs.core.first.call(null,seq__9934_9976__$1);var tag_9983 = cljs.core.nth.call(null,vec__9939_9982,0,null);var node_9984 = cljs.core.nth.call(null,vec__9939_9982,1,null);cljs.core.println.call(null,("Line '"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node_9984))+"' has overlapping tags. Put line under "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(tag_9983)));
{
var G__9985 = cljs.core.next.call(null,seq__9934_9976__$1);
var G__9986 = null;
var G__9987 = 0;
var G__9988 = 0;
seq__9934_9964 = G__9985;
chunk__9935_9965 = G__9986;
count__9936_9966 = G__9987;
i__9937_9967 = G__9988;
continue;
}
}
} else
{}
}
break;
}
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.call(null,((function (freqs,dups,most_popular_tag,tag_dups,disallowed_node_QMARK_){
return (function (p__9940){var vec__9941 = p__9940;var tag = cljs.core.nth.call(null,vec__9941,0,null);var nodes = cljs.core.nth.call(null,vec__9941,1,null);var new_nodes = cljs.core.remove.call(null,((function (vec__9941,tag,nodes,freqs,dups,most_popular_tag,tag_dups,disallowed_node_QMARK_){
return (function (p1__9913_SHARP_){return disallowed_node_QMARK_.call(null,p1__9913_SHARP_,tag);
});})(vec__9941,tag,nodes,freqs,dups,most_popular_tag,tag_dups,disallowed_node_QMARK_))
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
var __GT_view__delegate = function (ed,type_or_view,p__9945){var map__9949 = p__9945;var map__9949__$1 = ((cljs.core.seq_QMARK_.call(null,map__9949))?cljs.core.apply.call(null,cljs.core.hash_map,map__9949):map__9949);var lines = cljs.core.get.call(null,map__9949__$1,new cljs.core.Keyword(null,"lines","lines",1116881521));var query_tag = cljs.core.get.call(null,map__9949__$1,new cljs.core.Keyword(null,"query-tag","query-tag",3500842119));var level = cljs.core.get.call(null,map__9949__$1,new cljs.core.Keyword(null,"level","level",1116770038),1);var nodes = lt.plugins.kukui.node.ed__GT_nodes.call(null,ed,lines);var nodes__$1 = (cljs.core.truth_(query_tag)?(((query_tag.indexOf(lt.plugins.kukui.core.attr_delimiter) > -1))?(function (){var vec__9950 = clojure.string.split.call(null,query_tag,cljs.core.re_pattern.call(null,lt.plugins.kukui.core.attr_delimiter));var attr = cljs.core.nth.call(null,vec__9950,0,null);var value = cljs.core.nth.call(null,vec__9950,1,null);var attr__$1 = cljs.core.keyword.call(null,attr);return cljs.core.filter.call(null,((function (vec__9950,attr,value,attr__$1,nodes,map__9949,map__9949__$1,lines,query_tag,level){
return (function (p1__9942_SHARP_){return cljs.core._EQ_.call(null,value,attr__$1.call(null,p1__9942_SHARP_));
});})(vec__9950,attr,value,attr__$1,nodes,map__9949,map__9949__$1,lines,query_tag,level))
,nodes);
})():cljs.core.filter.call(null,((function (nodes,map__9949,map__9949__$1,lines,query_tag,level){
return (function (p1__9943_SHARP_){return cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__9943_SHARP_),query_tag);
});})(nodes,map__9949,map__9949__$1,lines,query_tag,level))
,nodes)):nodes);var view_config = ((cljs.core.map_QMARK_.call(null,type_or_view))?type_or_view:new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"names","names",1118489274),cljs.core.conj.call(null,cljs.core.vec.call(null,cljs.core.sort.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"name","name",1017277949),lt.plugins.kukui.datascript.find_by.call(null,new cljs.core.Keyword(null,"type","type",1017479852),cljs.core.name.call(null,type_or_view))))),lt.plugins.kukui.live.leftover_tag),new cljs.core.Keyword(null,"default","default",2558708147),lt.plugins.kukui.live.leftover_tag], null));var tags_nodes = lt.plugins.kukui.type_map.call(null,view_config,nodes__$1);var tags_nodes__$1 = lt.plugins.kukui.ensure_unique_nodes.call(null,tags_nodes);var tags_nodes__$2 = lt.plugins.kukui.save_tags.call(null,tags_nodes__$1);var new_nodes = cljs.core.mapcat.call(null,((function (nodes,nodes__$1,view_config,tags_nodes,tags_nodes__$1,tags_nodes__$2,map__9949,map__9949__$1,lines,query_tag,level){
return (function (tag){var children = (((tag.indexOf(lt.plugins.kukui.core.attr_delimiter) > -1))?(function (){var vec__9951 = clojure.string.split.call(null,tag,cljs.core.re_pattern.call(null,lt.plugins.kukui.core.attr_delimiter));var attr = cljs.core.nth.call(null,vec__9951,0,null);var value = cljs.core.nth.call(null,vec__9951,1,null);var attr__$1 = cljs.core.keyword.call(null,attr);return cljs.core.filter.call(null,((function (vec__9951,attr,value,attr__$1,nodes,nodes__$1,view_config,tags_nodes,tags_nodes__$1,tags_nodes__$2,map__9949,map__9949__$1,lines,query_tag,level){
return (function (p1__9944_SHARP_){return cljs.core._EQ_.call(null,value,attr__$1.call(null,p1__9944_SHARP_));
});})(vec__9951,attr,value,attr__$1,nodes,nodes__$1,view_config,tags_nodes,tags_nodes__$1,tags_nodes__$2,map__9949,map__9949__$1,lines,query_tag,level))
,nodes__$1);
})():cljs.core.get.call(null,tags_nodes__$2,tag));if(cljs.core.seq.call(null,children))
{return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type-tag","type-tag",4631398905),true,new cljs.core.Keyword(null,"text","text",1017460895),(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,tag)))], null)], null),children);
} else
{return null;
}
});})(nodes,nodes__$1,view_config,tags_nodes,tags_nodes__$1,tags_nodes__$2,map__9949,map__9949__$1,lines,query_tag,level))
,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(view_config));var indented_nodes = lt.plugins.kukui.core.indent_nodes.call(null,new_nodes,lt.plugins.sacha.codemirror.line_indent.call(null,ed,lt.objs.editor.cursor.call(null,ed).line),lt.objs.editor.option.call(null,ed,"tabSize"),level);return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,"\n",indented_nodes))+"\n");
};
var __GT_view = function (ed,type_or_view,var_args){
var p__9945 = null;if (arguments.length > 2) {
  p__9945 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return __GT_view__delegate.call(this,ed,type_or_view,p__9945);};
__GT_view.cljs$lang$maxFixedArity = 2;
__GT_view.cljs$lang$applyTo = (function (arglist__9989){
var ed = cljs.core.first(arglist__9989);
arglist__9989 = cljs.core.next(arglist__9989);
var type_or_view = cljs.core.first(arglist__9989);
var p__9945 = cljs.core.rest(arglist__9989);
return __GT_view__delegate(ed,type_or_view,p__9945);
});
__GT_view.cljs$core$IFn$_invoke$arity$variadic = __GT_view__delegate;
return __GT_view;
})()
;
lt.plugins.kukui.type_selector = lt.plugins.kukui.selector.selector.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"items","items",1114430258),(function (){return cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"name","name",1017277949),cljs.core.map.call(null,(function (p1__9952_SHARP_){return cljs.core.select_keys.call(null,p1__9952_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1017277949)], null));
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
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.type-replace-children","kukui.type-replace-children",2704104452),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: replaces current children with new type view",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.kukui.type_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){return lt.plugins.kukui.replace_children.call(null,lt.objs.editor.pool.last_active.call(null),(function (p1__9953_SHARP_){return lt.plugins.kukui.__GT_view.call(null,p1__9953_SHARP_,cljs.core.keyword.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(type)));
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
var __GT_query_view__delegate = function (ed,query,p__9955){var map__9958 = p__9955;var map__9958__$1 = ((cljs.core.seq_QMARK_.call(null,map__9958))?cljs.core.apply.call(null,cljs.core.hash_map,map__9958):map__9958);var lines = cljs.core.get.call(null,map__9958__$1,new cljs.core.Keyword(null,"lines","lines",1116881521));var types = cljs.core.get.call(null,map__9958__$1,new cljs.core.Keyword(null,"types","types",1124748267));var view_fn = cljs.core.get.call(null,map__9958__$1,new cljs.core.Keyword(null,"view-fn","view-fn",1468084322),((function (map__9958,map__9958__$1,lines,types){
return (function (p1__9954_SHARP_){return lt.plugins.kukui.__GT_view_config.call(null,p1__9954_SHARP_,true);
});})(map__9958,map__9958__$1,lines,types))
);var level = cljs.core.get.call(null,map__9958__$1,new cljs.core.Keyword(null,"level","level",1116770038),1);var map__9959 = lt.plugins.kukui.core.text__GT_tag_group.call(null,types,query);var map__9959__$1 = ((cljs.core.seq_QMARK_.call(null,map__9959))?cljs.core.apply.call(null,cljs.core.hash_map,map__9959):map__9959);var tags = cljs.core.get.call(null,map__9959__$1,new cljs.core.Keyword(null,"tags","tags",1017456523));var parent_tag = cljs.core.get.call(null,map__9959__$1,new cljs.core.Keyword(null,"parent-tag","parent-tag",768068457));var view_config = view_fn.call(null,tags);return lt.plugins.kukui.__GT_view.call(null,ed,view_config,new cljs.core.Keyword(null,"level","level",1116770038),level,new cljs.core.Keyword(null,"query-tag","query-tag",3500842119),parent_tag,new cljs.core.Keyword(null,"lines","lines",1116881521),lines);
};
var __GT_query_view = function (ed,query,var_args){
var p__9955 = null;if (arguments.length > 2) {
  p__9955 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return __GT_query_view__delegate.call(this,ed,query,p__9955);};
__GT_query_view.cljs$lang$maxFixedArity = 2;
__GT_query_view.cljs$lang$applyTo = (function (arglist__9990){
var ed = cljs.core.first(arglist__9990);
arglist__9990 = cljs.core.next(arglist__9990);
var query = cljs.core.first(arglist__9990);
var p__9955 = cljs.core.rest(arglist__9990);
return __GT_query_view__delegate(ed,query,p__9955);
});
__GT_query_view.cljs$core$IFn$_invoke$arity$variadic = __GT_query_view__delegate;
return __GT_query_view;
})()
;
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.query-replace-children","kukui.query-replace-children",3544797768),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: replaces current children based on current node's query",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line);var new_body = lt.plugins.kukui.__GT_query_view.call(null,ed,lt.objs.editor.line.call(null,ed,line),new cljs.core.Keyword(null,"types","types",1124748267),lt.plugins.kukui.db.types_and_names.call(null),new cljs.core.Keyword(null,"view-fn","view-fn",1468084322),((function (ed,line,end_line){
return (function (p1__9960_SHARP_){return lt.plugins.kukui.__GT_view_config.call(null,p1__9960_SHARP_,null);
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
* Stamp children nodes with parent tags
*/
lt.plugins.kukui.stamp_nodes = (function stamp_nodes(ed){var level = 0;var nodes = lt.plugins.kukui.node.ed__GT_nodes.call(null,ed);var parent_tags = lt.plugins.kukui.core.text__GT_tags.call(null,lt.objs.editor.line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line));var new_nodes = cljs.core.map.call(null,((function (level,nodes,parent_tags){
return (function (p1__9961_SHARP_){return lt.plugins.kukui.add_tags_to_node.call(null,p1__9961_SHARP_,parent_tags);
});})(level,nodes,parent_tags))
,nodes);var indented_nodes = lt.plugins.kukui.core.indent_nodes.call(null,new_nodes,lt.plugins.sacha.codemirror.line_indent.call(null,ed,lt.objs.editor.cursor.call(null,ed).line),lt.objs.editor.option.call(null,ed,"tabSize"),level);return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,"\n",indented_nodes))+"\n");
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.stamp-children","kukui.stamp-children",3918722228),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: stamps current children with parent tags",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.kukui.replace_children.call(null,lt.objs.editor.pool.last_active.call(null),lt.plugins.kukui.stamp_nodes);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.toggle-descs","kukui.toggle-descs",4779010676),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Toggle visibility of descs of current children",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line);return lt.plugins.kukui.util.toggle_all.call(null,ed,((function (ed,line,end_line){
return (function (p1__9962_SHARP_){var and__6414__auto__ = cljs.core.not.call(null,lt.plugins.kukui.core.desc_node_QMARK_.call(null,lt.plugins.kukui.node.line__GT_node.call(null,ed,p1__9962_SHARP_)));if(and__6414__auto__)
{return lt.plugins.kukui.core.desc_node_QMARK_.call(null,lt.plugins.kukui.node.line__GT_node.call(null,ed,(p1__9962_SHARP_ + 1)));
} else
{return and__6414__auto__;
}
});})(ed,line,end_line))
,cljs.core.range.call(null,line,end_line));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.sync-file-to-db","kukui.sync-file-to-db",3023743498),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Syncs file to db",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var lines = cljs.core.range.call(null,lt.objs.editor.first_line.call(null,ed),(lt.objs.editor.last_line.call(null,ed) + 1));var nodes = lt.plugins.kukui.node.ed__GT_nodes.call(null,ed,lines);var file = lt.plugins.kukui.util.current_file.call(null);lt.plugins.kukui.nodes = nodes;
try{return lt.plugins.kukui.sync.sync.call(null,nodes,file);
}catch (e9963){var e = e9963;lt.objs.notifos.set_msg_BANG_.call(null,("Failed to sync:"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
cljs.core.prn.call(null,e,cljs.core.ex_data.call(null,e));
return cljs.core.println.call(null,e.stack);
}})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.reset-sync","kukui.reset-sync",2173405380),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Resets sync",new cljs.core.Keyword(null,"exec","exec",1017031683),lt.plugins.kukui.sync.reset_sync_BANG_], null));
}

//# sourceMappingURL=kukui_compiled.js.map