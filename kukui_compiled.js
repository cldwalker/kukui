if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.util')) {
goog.provide('lt.plugins.kukui.util');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.plugins.sacha.codemirror');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.tabs');
goog.require('lt.objs.files');
goog.require('lt.objs.command');
goog.require('lt.objs.tabs');
goog.require('clojure.string');
goog.require('lt.plugins.sacha.codemirror');
goog.require('clojure.string');
goog.require('lt.objs.editor');
goog.require('lt.objs.files');
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
/**
* Returns range of lines for current selection or current branch
*/
lt.plugins.kukui.util.current_lines = (function current_lines(ed){var temp__4124__auto__ = lt.objs.editor.selection_bounds.call(null,ed);if(cljs.core.truth_(temp__4124__auto__))
{var selection = temp__4124__auto__;return cljs.core.range.call(null,cljs.core.get_in.call(null,selection,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"from","from",1017056028),new cljs.core.Keyword(null,"line","line",1017226086)], null)),(cljs.core.get_in.call(null,selection,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"to","to",1013907949),new cljs.core.Keyword(null,"line","line",1017226086)], null)) + 1));
} else
{var line = lt.objs.editor.cursor.call(null,ed).line;return cljs.core.range.call(null,line,lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,line));
}
});
lt.plugins.kukui.util.current_file = (function() {
var current_file = null;
var current_file__0 = (function (){return current_file.call(null,lt.objs.editor.pool.last_active.call(null));
});
var current_file__1 = (function (ed){return cljs.core.get_in.call(null,cljs.core.deref.call(null,ed),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",1017141280),new cljs.core.Keyword(null,"path","path",1017337751)], null));
});
current_file = function(ed){
switch(arguments.length){
case 0:
return current_file__0.call(this);
case 1:
return current_file__1.call(this,ed);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
current_file.cljs$core$IFn$_invoke$arity$0 = current_file__0;
current_file.cljs$core$IFn$_invoke$arity$1 = current_file__1;
return current_file;
})()
;
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
var toggle_all__3 = (function (ed,condition,lines){return lt.objs.editor.operation.call(null,ed,(function (){var seq__8987 = cljs.core.seq.call(null,lines);var chunk__8988 = null;var count__8989 = 0;var i__8990 = 0;while(true){
if((i__8990 < count__8989))
{var line = cljs.core._nth.call(null,chunk__8988,i__8990);if(cljs.core.truth_(condition.call(null,line)))
{lt.plugins.sacha.codemirror.fold_code.call(null,ed,{"ch": 0, "line": line},null);
} else
{}
{
var G__8994 = seq__8987;
var G__8995 = chunk__8988;
var G__8996 = count__8989;
var G__8997 = (i__8990 + 1);
seq__8987 = G__8994;
chunk__8988 = G__8995;
count__8989 = G__8996;
i__8990 = G__8997;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__8987);if(temp__4126__auto__)
{var seq__8987__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8987__$1))
{var c__7182__auto__ = cljs.core.chunk_first.call(null,seq__8987__$1);{
var G__8998 = cljs.core.chunk_rest.call(null,seq__8987__$1);
var G__8999 = c__7182__auto__;
var G__9000 = cljs.core.count.call(null,c__7182__auto__);
var G__9001 = 0;
seq__8987 = G__8998;
chunk__8988 = G__8999;
count__8989 = G__9000;
i__8990 = G__9001;
continue;
}
} else
{var line = cljs.core.first.call(null,seq__8987__$1);if(cljs.core.truth_(condition.call(null,line)))
{lt.plugins.sacha.codemirror.fold_code.call(null,ed,{"ch": 0, "line": line},null);
} else
{}
{
var G__9002 = cljs.core.next.call(null,seq__8987__$1);
var G__9003 = null;
var G__9004 = 0;
var G__9005 = 0;
seq__8987 = G__9002;
chunk__8988 = G__9003;
count__8989 = G__9004;
i__8990 = G__9005;
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
return (function (p1__8991_SHARP_){if(cljs.core._EQ_.call(null,current_indent,lt.plugins.sacha.codemirror.line_indent.call(null,ed,p1__8991_SHARP_)))
{return p1__8991_SHARP_;
} else
{return null;
}
});})(parent_lines,current_indent))
,parent_lines);
});
lt.plugins.kukui.util.tempfile = (function tempfile(seed,suffix){var dir = require("os").tmpdir();return lt.objs.files.join.call(null,dir,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(seed)+"-"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(Date.now())+cljs.core.str.cljs$core$IFn$_invoke$arity$1(suffix)));
});
lt.plugins.kukui.util.__GT_val_sorted_map = (function __GT_val_sorted_map(m){return cljs.core.into.call(null,cljs.core.sorted_map_by.call(null,(function (key1,key2){return cljs.core.compare.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.get.call(null,m,key2),key2], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.get.call(null,m,key1),key1], null));
})),m);
});
/**
* @param {...*} var_args
*/
lt.plugins.kukui.util.format = (function() { 
var format__delegate = function (fmt,args){return cljs.core.reduce.call(null,(function (acc,arg){var vec__8993 = cljs.core.re_find.call(null,/^(.*?)%s(.*)/,acc);var _ = cljs.core.nth.call(null,vec__8993,0,null);var matches = cljs.core.nthnext.call(null,vec__8993,1);if(matches)
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(("No %s found in"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.util.string)))+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,new cljs.core.Symbol(null,"matches","matches",-799669524,null))))));
}
return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,matches))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(arg)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,matches)));
}),fmt,args);
};
var format = function (fmt,var_args){
var args = null;if (arguments.length > 1) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return format__delegate.call(this,fmt,args);};
format.cljs$lang$maxFixedArity = 1;
format.cljs$lang$applyTo = (function (arglist__9006){
var fmt = cljs.core.first(arglist__9006);
var args = cljs.core.rest(arglist__9006);
return format__delegate(fmt,args);
});
format.cljs$core$IFn$_invoke$arity$variadic = format__delegate;
return format;
})()
;
lt.plugins.kukui.util.ensure_and_focus_second_tabset = (function ensure_and_focus_second_tabset(){if((cljs.core.count.call(null,new cljs.core.Keyword(null,"tabsets","tabsets",3756175576).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.tabs.multi))) < 2))
{lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"tabset.new","tabset.new",1444331601));
} else
{}
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"tabset.next","tabset.next",1472250630));
});
}
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
lt.plugins.kukui.core.text__GT_tags = (function text__GT_tags(text){return cljs.core.map.call(null,(function (p1__8841_SHARP_){return cljs.core.subs.call(null,p1__8841_SHARP_,1);
}),cljs.core.map.call(null,cljs.core.second,cljs.core.re_seq.call(null,lt.plugins.kukui.core.tag_pattern,text)));
});
lt.plugins.kukui.core.indent_node = (function indent_node(node,indent){return clojure.string.replace_first.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node),/^\s*/,cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,indent," ")));
});
lt.plugins.kukui.core.indent_nodes = (function indent_nodes(nodes,indent,tab_size,offset_level){var offset = (offset_level * tab_size);var tag_indent = (indent + offset);var node_indent = ((indent + offset) + tab_size);var desc_indent = (((indent + offset) + tab_size) + tab_size);return cljs.core.mapcat.call(null,((function (offset,tag_indent,node_indent,desc_indent){
return (function (p1__8842_SHARP_){if(cljs.core.truth_(new cljs.core.Keyword(null,"type-tag","type-tag",4631398905).cljs$core$IFn$_invoke$arity$1(p1__8842_SHARP_)))
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,tag_indent," ")))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(p1__8842_SHARP_)))], null);
} else
{return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.kukui.core.indent_node.call(null,p1__8842_SHARP_,node_indent)], null),cljs.core.map.call(null,((function (offset,tag_indent,node_indent,desc_indent){
return (function (x){return lt.plugins.kukui.core.indent_node.call(null,x,desc_indent);
});})(offset,tag_indent,node_indent,desc_indent))
,new cljs.core.Keyword(null,"desc","desc",1016984067).cljs$core$IFn$_invoke$arity$1(p1__8842_SHARP_)));
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
lt.plugins.kukui.core.add_node_with_parent_tags = (function add_node_with_parent_tags(nodes,curr,parent_tags){return lt.plugins.kukui.core.add_node_with_tags.call(null,nodes,curr,cljs.core.concat.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.filter.call(null,(function (p1__8843_SHARP_){return (new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(p1__8843_SHARP_) < new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
}),parent_tags)),lt.plugins.kukui.core.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr))));
});
lt.plugins.kukui.core.__GT_name_value = (function __GT_name_value(text){return cljs.core.second.call(null,cljs.core.re_find.call(null,cljs.core.re_pattern.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.name_attr)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.attr_delimiter)+"(\\S+)")),text));
});
lt.plugins.kukui.core.add_custom_attributes = (function add_custom_attributes(node){var vec__8849 = cljs.core.juxt.call(null,cljs.core.remove,cljs.core.filter).call(null,(function (p1__8844_SHARP_){return (p1__8844_SHARP_.indexOf(lt.plugins.kukui.core.attr_delimiter) > -1);
}),new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(node));var tags = cljs.core.nth.call(null,vec__8849,0,null);var attribute_tags = cljs.core.nth.call(null,vec__8849,1,null);return cljs.core.merge.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (vec__8849,tags,attribute_tags){
return (function (p__8850){var vec__8851 = p__8850;var k = cljs.core.nth.call(null,vec__8851,0,null);var v = cljs.core.nth.call(null,vec__8851,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,k),v], null);
});})(vec__8849,tags,attribute_tags))
,cljs.core.map.call(null,((function (vec__8849,tags,attribute_tags){
return (function (p1__8845_SHARP_){return clojure.string.split.call(null,p1__8845_SHARP_,cljs.core.re_pattern.call(null,lt.plugins.kukui.core.attr_delimiter));
});})(vec__8849,tags,attribute_tags))
,attribute_tags))),cljs.core.assoc.call(null,node,new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.set.call(null,tags)));
});
/**
* Adds :tags, :desc and custom attributes to nodes
*/
lt.plugins.kukui.core.add_attributes_to_nodes = (function add_attributes_to_nodes(nodes){return cljs.core.mapv.call(null,lt.plugins.kukui.core.add_custom_attributes,new cljs.core.Keyword(null,"nodes","nodes",1118897699).cljs$core$IFn$_invoke$arity$1(cljs.core.reduce.call(null,(function (accum,p__8858){var vec__8859 = p__8858;var curr = cljs.core.nth.call(null,vec__8859,0,null);var next = cljs.core.nth.call(null,vec__8859,1,null);if(cljs.core.truth_((function (){var and__6414__auto__ = lt.plugins.kukui.core.parent_node_QMARK_.call(null,curr,next);if(cljs.core.truth_(and__6414__auto__))
{return lt.plugins.kukui.core.__GT_name_value.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr));
} else
{return and__6414__auto__;
}
})()))
{return cljs.core.update_in.call(null,cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699)], null),((function (vec__8859,curr,next){
return (function (p1__8852_SHARP_){return lt.plugins.kukui.core.add_node_with_parent_tags.call(null,p1__8852_SHARP_,curr,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(accum));
});})(vec__8859,curr,next))
),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tags","tags",1017456523)], null),((function (vec__8859,curr,next){
return (function (p1__8853_SHARP_){return lt.plugins.kukui.core.add_node_with_tags.call(null,cljs.core.vec.call(null,cljs.core.remove.call(null,((function (vec__8859,curr,next){
return (function (tag){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(tag),new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
});})(vec__8859,curr,next))
,p1__8853_SHARP_)),curr,cljs.core._conj.call(null,cljs.core.List.EMPTY,lt.plugins.kukui.core.__GT_name_value.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr))));
});})(vec__8859,curr,next))
);
} else
{if(cljs.core.truth_(lt.plugins.kukui.core.parent_node_QMARK_.call(null,curr,next)))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tags","tags",1017456523)], null),((function (vec__8859,curr,next){
return (function (p1__8854_SHARP_){return lt.plugins.kukui.core.add_node_with_tags.call(null,cljs.core.vec.call(null,cljs.core.remove.call(null,((function (vec__8859,curr,next){
return (function (tag){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(tag),new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
});})(vec__8859,curr,next))
,p1__8854_SHARP_)),curr,lt.plugins.kukui.core.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr)));
});})(vec__8859,curr,next))
);
} else
{if(cljs.core.truth_(lt.plugins.kukui.core.desc_node_QMARK_.call(null,curr)))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699),(cljs.core.count.call(null,new cljs.core.Keyword(null,"nodes","nodes",1118897699).cljs$core$IFn$_invoke$arity$1(accum)) - 1),new cljs.core.Keyword(null,"desc","desc",1016984067)], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),curr);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699)], null),((function (vec__8859,curr,next){
return (function (p1__8855_SHARP_){return lt.plugins.kukui.core.add_node_with_parent_tags.call(null,p1__8855_SHARP_,curr,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(accum));
});})(vec__8859,curr,next))
);
} else
{return null;
}
}
}
}
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"nodes","nodes",1118897699),cljs.core.PersistentVector.EMPTY], null),cljs.core.partition.call(null,2,1,cljs.core.PersistentVector.EMPTY,nodes))));
});
/**
* Converts a tree of nodes to an outline. Nodes are expected to have :text and :level keys.
* :level is translated to whitespace based on indent. Example nodes:
* 
* [{:text 'parent' :level 1} {:text 'parent2' :level 2}]
*/
lt.plugins.kukui.core.tree__GT_string = (function tree__GT_string(nodes,indent){return clojure.string.join.call(null,"\n",cljs.core.reduce.call(null,(function (accum,node){return cljs.core.conj.call(null,accum,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,(indent * (new cljs.core.Keyword(null,"level","level",1116770038).cljs$core$IFn$_invoke$arity$1(node) - 1))," ")))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.triml.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node)))));
}),cljs.core.PersistentVector.EMPTY,nodes));
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.node')) {
goog.provide('lt.plugins.kukui.node');
goog.require('cljs.core');
goog.require('lt.plugins.kukui.core');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor');
goog.require('lt.plugins.kukui.util');
goog.require('lt.plugins.kukui.util');
goog.require('lt.plugins.kukui.core');
goog.require('lt.plugins.sacha.codemirror');
goog.require('lt.plugins.sacha.codemirror');
lt.plugins.kukui.node.line__GT_node = (function line__GT_node(ed,line){return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"line","line",1017226086),line,new cljs.core.Keyword(null,"indent","indent",4124632094),lt.plugins.sacha.codemirror.line_indent.call(null,ed,line),new cljs.core.Keyword(null,"text","text",1017460895),lt.objs.editor.line.call(null,ed,line),new cljs.core.Keyword(null,"file","file",1017047278),lt.plugins.kukui.util.current_file.call(null,ed)], null);
});
lt.plugins.kukui.node.ignore_tag = "ignore";
/**
* Returns nodes with :line, :indent, :text and :tags properties.
* Tags are picked up from parents and any words starting with '#'.
*/
lt.plugins.kukui.node.__GT_tagged_nodes = (function __GT_tagged_nodes(ed,lines){var nodes = lt.plugins.kukui.core.add_attributes_to_nodes.call(null,cljs.core.map.call(null,(function (p1__8926_SHARP_){return lt.plugins.kukui.node.line__GT_node.call(null,ed,p1__8926_SHARP_);
}),lines));return cljs.core.remove.call(null,((function (nodes){
return (function (p1__8927_SHARP_){return cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__8927_SHARP_),lt.plugins.kukui.node.ignore_tag);
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
clojure.walk.keywordize_keys = (function keywordize_keys(m){var f = (function (p__8823){var vec__8824 = p__8823;var k = cljs.core.nth.call(null,vec__8824,0,null);var v = cljs.core.nth.call(null,vec__8824,1,null);if(typeof k === 'string')
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
clojure.walk.stringify_keys = (function stringify_keys(m){var f = (function (p__8827){var vec__8828 = p__8827;var k = cljs.core.nth.call(null,vec__8828,0,null);var v = cljs.core.nth.call(null,vec__8828,1,null);if((k instanceof cljs.core.Keyword))
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
datascript.btset.level_shift = (cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__8759_SHARP_){return ((datascript.btset.max_len & (1 << p1__8759_SHARP_)) != 0);
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
var G__8779 = arr;
var G__8780 = (m + 1);
var G__8781 = r;
var G__8782 = k;
arr = G__8779;
l = G__8780;
r = G__8781;
k = G__8782;
continue;
}
} else
{{
var G__8783 = arr;
var G__8784 = l;
var G__8785 = (m - 1);
var G__8786 = k;
arr = G__8783;
l = G__8784;
r = G__8785;
k = G__8786;
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
var G__8787 = arr;
var G__8788 = l;
var G__8789 = (m - 1);
var G__8790 = k;
arr = G__8787;
l = G__8788;
r = G__8789;
k = G__8790;
continue;
}
} else
{{
var G__8791 = arr;
var G__8792 = (m + 1);
var G__8793 = r;
var G__8794 = k;
arr = G__8791;
l = G__8792;
r = G__8793;
k = G__8794;
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
datascript.btset.cut_n_splice = (function cut_n_splice(arr,cut_from,cut_to,splice_from,splice_to,xs){var arr_l = arr.length;var xs_l = xs.length;var l1 = (splice_from - cut_from);var l2 = (cut_to - splice_to);var l1xs = (l1 + xs_l);var new_arr = (new Array(((l1 + xs_l) + l2)));var n__7282__auto___8795 = l1;var i_8796 = 0;while(true){
if((i_8796 < n__7282__auto___8795))
{(new_arr[i_8796] = (arr[(cut_from + i_8796)]));
{
var G__8797 = (i_8796 + 1);
i_8796 = G__8797;
continue;
}
} else
{}
break;
}
var n__7282__auto___8798 = xs_l;var i_8799 = 0;while(true){
if((i_8799 < n__7282__auto___8798))
{(new_arr[(i_8799 + l1)] = (xs[i_8799]));
{
var G__8800 = (i_8799 + 1);
i_8799 = G__8800;
continue;
}
} else
{}
break;
}
var n__7282__auto___8801 = l2;var i_8802 = 0;while(true){
if((i_8802 < n__7282__auto___8801))
{(new_arr[(i_8802 + l1xs)] = (arr[(splice_to + i_8802)]));
{
var G__8803 = (i_8802 + 1);
i_8802 = G__8803;
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
datascript.btset.merge_n_split = (function merge_n_split(a1,a2){var a1_l = a1.length;var a2_l = a2.length;var total_l = (a1_l + a2_l);var r1_l = datascript.btset.half.call(null,total_l);var r2_l = (total_l - r1_l);var r1 = (new Array(r1_l));var r2 = (new Array(r2_l));var n__7282__auto___8804 = total_l;var i_8805 = 0;while(true){
if((i_8805 < n__7282__auto___8804))
{((((i_8805 < r1_l))?r1:r2)[(((i_8805 < r1_l))?i_8805:(i_8805 - r1_l))] = ((((i_8805 < a1_l))?a1:a2)[(((i_8805 < a1_l))?i_8805:(i_8805 - a1_l))]));
{
var G__8806 = (i_8805 + 1);
i_8805 = G__8806;
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
var G__8807 = (i + 1);
i = G__8807;
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
var G__8808 = (level - datascript.btset.level_shift);
var G__8809 = (node.pointers[datascript.btset.path_get.call(null,path,level)]);
level = G__8808;
node = G__8809;
continue;
}
} else
{return node.keys;
}
break;
}
});
datascript.btset.btset_conj = (function btset_conj(set,key){var _STAR_cmp_STAR_8761 = datascript.btset._STAR_cmp_STAR_;try{datascript.btset._STAR_cmp_STAR_ = set.comparator;
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
}finally {datascript.btset._STAR_cmp_STAR_ = _STAR_cmp_STAR_8761;
}});
datascript.btset.btset_disj = (function btset_disj(set,key){var _STAR_cmp_STAR_8763 = datascript.btset._STAR_cmp_STAR_;try{datascript.btset._STAR_cmp_STAR_ = set.comparator;
var new_roots = set.root.disj(key,true,null,null);if((new_roots == null))
{return set;
} else
{var new_root = (new_roots[0]);if(((new_root instanceof datascript.btset.Node)) && ((new_root.pointers.length === 1)))
{return datascript.btset.alter_btset.call(null,set,(new_root.pointers[0]),(set.shift - datascript.btset.level_shift),(set.cnt - 1));
} else
{return datascript.btset.alter_btset.call(null,set,new_root,set.shift,(set.cnt - 1));
}
}
}finally {datascript.btset._STAR_cmp_STAR_ = _STAR_cmp_STAR_8763;
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
var G__8810 = (node.pointers[idx]);
var G__8811 = datascript.btset.path_set.call(null,path,level,idx);
var G__8812 = (level - datascript.btset.level_shift);
node = G__8810;
path = G__8811;
level = G__8812;
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
var G__8813 = (node.pointers[idx]);
var G__8814 = datascript.btset.path_set.call(null,path,level,idx);
var G__8815 = (level - datascript.btset.level_shift);
node = G__8813;
path = G__8814;
level = G__8815;
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
var slice__3 = (function (set,key_from,key_to){var _STAR_cmp_STAR_8765 = datascript.btset._STAR_cmp_STAR_;try{datascript.btset._STAR_cmp_STAR_ = set.comparator;
return datascript.btset._slice.call(null,set,key_from,key_to);
}finally {datascript.btset._STAR_cmp_STAR_ = _STAR_cmp_STAR_8765;
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
var ___$1 = this;var _STAR_cmp_STAR_8768 = datascript.btset._STAR_cmp_STAR_;try{datascript.btset._STAR_cmp_STAR_ = self__.comparator;
var or__6426__auto__ = self__.root.lookup(k);if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return not_found;
}
}finally {datascript.btset._STAR_cmp_STAR_ = _STAR_cmp_STAR_8768;
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
return (function (p1__8766_SHARP_){return cljs.core.contains_QMARK_.call(null,this$__$1,p1__8766_SHARP_);
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
var G__8816 = null;
var G__8816__2 = (function (self__,k){var self__ = this;
var self____$1 = this;var coll = self____$1;return coll.cljs$core$ILookup$_lookup$arity$2(null,k);
});
var G__8816__3 = (function (self__,k,not_found){var self__ = this;
var self____$1 = this;var coll = self____$1;return coll.cljs$core$ILookup$_lookup$arity$3(null,k,not_found);
});
G__8816 = function(self__,k,not_found){
switch(arguments.length){
case 2:
return G__8816__2.call(this,self__,k);
case 3:
return G__8816__3.call(this,self__,k,not_found);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__8816;
})()
;
datascript.btset.BTSet.prototype.apply = (function (self__,args8767){var self__ = this;
var self____$1 = this;return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args8767)));
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
var G__8817__delegate = function (cmp,keys){return cljs.core.reduce.call(null,cljs.core._conj,btset_by.call(null,cmp),keys);
};
var G__8817 = function (cmp,var_args){
var keys = null;if (arguments.length > 1) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return G__8817__delegate.call(this,cmp,keys);};
G__8817.cljs$lang$maxFixedArity = 1;
G__8817.cljs$lang$applyTo = (function (arglist__8818){
var cmp = cljs.core.first(arglist__8818);
var keys = cljs.core.rest(arglist__8818);
return G__8817__delegate(cmp,keys);
});
G__8817.cljs$core$IFn$_invoke$arity$variadic = G__8817__delegate;
return G__8817;
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
var G__8819__delegate = function (keys){return cljs.core.reduce.call(null,cljs.core._conj,btset.call(null),keys);
};
var G__8819 = function (var_args){
var keys = null;if (arguments.length > 0) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return G__8819__delegate.call(this,keys);};
G__8819.cljs$lang$maxFixedArity = 0;
G__8819.cljs$lang$applyTo = (function (arglist__8820){
var keys = cljs.core.seq(arglist__8820);
return G__8819__delegate(keys);
});
G__8819.cljs$core$IFn$_invoke$arity$variadic = G__8819__delegate;
return G__8819;
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
datascript.Datom.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__7014__auto__,k8519,else__7015__auto__){var self__ = this;
var this__7014__auto____$1 = this;var G__8521 = (((k8519 instanceof cljs.core.Keyword))?k8519.fqn:null);var caseval__8673;
switch (G__8521){
case "added":
caseval__8673=self__.added
break;
case "tx":
caseval__8673=self__.tx
break;
case "v":
caseval__8673=self__.v
break;
case "a":
caseval__8673=self__.a
break;
case "e":
caseval__8673=self__.e
break;
default:
caseval__8673=cljs.core.get.call(null,self__.__extmap,k8519,else__7015__auto__)
}
return caseval__8673;
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
datascript.Datom.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__7019__auto__,k__7020__auto__,G__8518){var self__ = this;
var this__7019__auto____$1 = this;var pred__8522 = cljs.core.keyword_identical_QMARK_;var expr__8523 = k__7020__auto__;if(cljs.core.truth_(pred__8522.call(null,new cljs.core.Keyword(null,"e","e",1013904343),expr__8523)))
{return (new datascript.Datom(G__8518,self__.a,self__.v,self__.tx,self__.added,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8522.call(null,new cljs.core.Keyword(null,"a","a",1013904339),expr__8523)))
{return (new datascript.Datom(self__.e,G__8518,self__.v,self__.tx,self__.added,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8522.call(null,new cljs.core.Keyword(null,"v","v",1013904360),expr__8523)))
{return (new datascript.Datom(self__.e,self__.a,G__8518,self__.tx,self__.added,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8522.call(null,new cljs.core.Keyword(null,"tx","tx",1013907958),expr__8523)))
{return (new datascript.Datom(self__.e,self__.a,self__.v,G__8518,self__.added,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8522.call(null,new cljs.core.Keyword(null,"added","added",1106564210),expr__8523)))
{return (new datascript.Datom(self__.e,self__.a,self__.v,self__.tx,G__8518,self__.__meta,self__.__extmap,null));
} else
{return (new datascript.Datom(self__.e,self__.a,self__.v,self__.tx,self__.added,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__7020__auto__,G__8518),null));
}
}
}
}
}
});
datascript.Datom.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__7024__auto__){var self__ = this;
var this__7024__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"e","e",1013904343),self__.e],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"a","a",1013904339),self__.a],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"v","v",1013904360),self__.v],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"tx","tx",1013907958),self__.tx],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"added","added",1106564210),self__.added],null))], null),self__.__extmap));
});
datascript.Datom.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__7011__auto__,G__8518){var self__ = this;
var this__7011__auto____$1 = this;return (new datascript.Datom(self__.e,self__.a,self__.v,self__.tx,self__.added,G__8518,self__.__extmap,self__.__hash));
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
datascript.map__GT_Datom = (function map__GT_Datom(G__8520){return (new datascript.Datom(new cljs.core.Keyword(null,"e","e",1013904343).cljs$core$IFn$_invoke$arity$1(G__8520),new cljs.core.Keyword(null,"a","a",1013904339).cljs$core$IFn$_invoke$arity$1(G__8520),new cljs.core.Keyword(null,"v","v",1013904360).cljs$core$IFn$_invoke$arity$1(G__8520),new cljs.core.Keyword(null,"tx","tx",1013907958).cljs$core$IFn$_invoke$arity$1(G__8520),new cljs.core.Keyword(null,"added","added",1106564210).cljs$core$IFn$_invoke$arity$1(G__8520),null,cljs.core.dissoc.call(null,G__8520,new cljs.core.Keyword(null,"e","e",1013904343),new cljs.core.Keyword(null,"a","a",1013904339),new cljs.core.Keyword(null,"v","v",1013904360),new cljs.core.Keyword(null,"tx","tx",1013907958),new cljs.core.Keyword(null,"added","added",1106564210))));
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
datascript.ISearch = (function (){var obj8526 = {};return obj8526;
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
datascript.cmp_datoms_eavt = (function cmp_datoms_eavt(d1,d2){var c__7913__auto__ = datascript.cmp.call(null,d1.e,d2.e);if((0 === c__7913__auto__))
{var c__7913__auto____$1 = datascript.cmp.call(null,d1.a,d2.a);if((0 === c__7913__auto____$1))
{var c__7913__auto____$2 = datascript.cmp_val.call(null,d1.v,d2.v);if((0 === c__7913__auto____$2))
{var c__7913__auto____$3 = datascript.cmp.call(null,d1.tx,d2.tx);if((0 === c__7913__auto____$3))
{return 0;
} else
{return c__7913__auto____$3;
}
} else
{return c__7913__auto____$2;
}
} else
{return c__7913__auto____$1;
}
} else
{return c__7913__auto__;
}
});
datascript.cmp_datoms_aevt = (function cmp_datoms_aevt(d1,d2){var c__7913__auto__ = datascript.cmp.call(null,d1.a,d2.a);if((0 === c__7913__auto__))
{var c__7913__auto____$1 = datascript.cmp.call(null,d1.e,d2.e);if((0 === c__7913__auto____$1))
{var c__7913__auto____$2 = datascript.cmp_val.call(null,d1.v,d2.v);if((0 === c__7913__auto____$2))
{var c__7913__auto____$3 = datascript.cmp.call(null,d1.tx,d2.tx);if((0 === c__7913__auto____$3))
{return 0;
} else
{return c__7913__auto____$3;
}
} else
{return c__7913__auto____$2;
}
} else
{return c__7913__auto____$1;
}
} else
{return c__7913__auto__;
}
});
datascript.cmp_datoms_avet = (function cmp_datoms_avet(d1,d2){var c__7913__auto__ = datascript.cmp.call(null,d1.a,d2.a);if((0 === c__7913__auto__))
{var c__7913__auto____$1 = datascript.cmp_val.call(null,d1.v,d2.v);if((0 === c__7913__auto____$1))
{var c__7913__auto____$2 = datascript.cmp.call(null,d1.e,d2.e);if((0 === c__7913__auto____$2))
{var c__7913__auto____$3 = datascript.cmp.call(null,d1.tx,d2.tx);if((0 === c__7913__auto____$3))
{return 0;
} else
{return c__7913__auto____$3;
}
} else
{return c__7913__auto____$2;
}
} else
{return c__7913__auto____$1;
}
} else
{return c__7913__auto__;
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
datascript.DB.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__7014__auto__,k8537,else__7015__auto__){var self__ = this;
var this__7014__auto____$1 = this;var G__8539 = (((k8537 instanceof cljs.core.Keyword))?k8537.fqn:null);var caseval__8674;
switch (G__8539){
case "max-tx":
caseval__8674=self__.max_tx
break;
case "max-eid":
caseval__8674=self__.max_eid
break;
case "avet":
caseval__8674=self__.avet
break;
case "aevt":
caseval__8674=self__.aevt
break;
case "eavt":
caseval__8674=self__.eavt
break;
case "schema":
caseval__8674=self__.schema
break;
default:
caseval__8674=cljs.core.get.call(null,self__.__extmap,k8537,else__7015__auto__)
}
return caseval__8674;
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
datascript.DB.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__7019__auto__,k__7020__auto__,G__8536){var self__ = this;
var this__7019__auto____$1 = this;var pred__8540 = cljs.core.keyword_identical_QMARK_;var expr__8541 = k__7020__auto__;if(cljs.core.truth_(pred__8540.call(null,new cljs.core.Keyword(null,"schema","schema",4400883987),expr__8541)))
{return (new datascript.DB(G__8536,self__.eavt,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8540.call(null,new cljs.core.Keyword(null,"eavt","eavt",1017010124),expr__8541)))
{return (new datascript.DB(self__.schema,G__8536,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8540.call(null,new cljs.core.Keyword(null,"aevt","aevt",1016894804),expr__8541)))
{return (new datascript.DB(self__.schema,self__.eavt,G__8536,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8540.call(null,new cljs.core.Keyword(null,"avet","avet",1016910614),expr__8541)))
{return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,G__8536,self__.max_eid,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8540.call(null,new cljs.core.Keyword(null,"max-eid","max-eid",1856848841),expr__8541)))
{return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,G__8536,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8540.call(null,new cljs.core.Keyword(null,"max-tx","max-tx",4227685119),expr__8541)))
{return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,self__.max_eid,G__8536,self__.__meta,self__.__extmap,null));
} else
{return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__7020__auto__,G__8536),null));
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
datascript.DB.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__7011__auto__,G__8536){var self__ = this;
var this__7011__auto____$1 = this;return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,G__8536,self__.__extmap,self__.__hash));
});
datascript.DB.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__7017__auto__,entry__7018__auto__){var self__ = this;
var this__7017__auto____$1 = this;if(cljs.core.vector_QMARK_.call(null,entry__7018__auto__))
{return cljs.core._assoc.call(null,this__7017__auto____$1,cljs.core._nth.call(null,entry__7018__auto__,0),cljs.core._nth.call(null,entry__7018__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__7017__auto____$1,entry__7018__auto__);
}
});
datascript.DB.prototype.datascript$ISearch$ = true;
datascript.DB.prototype.datascript$ISearch$_search$arity$2 = (function (db,p__8543){var self__ = this;
var vec__8544 = p__8543;var e = cljs.core.nth.call(null,vec__8544,0,null);var a = cljs.core.nth.call(null,vec__8544,1,null);var v = cljs.core.nth.call(null,vec__8544,2,null);var tx = cljs.core.nth.call(null,vec__8544,3,null);var db__$1 = this;if(cljs.core.truth_(e))
{if(cljs.core.truth_(a))
{if(datascript.some_QMARK_.call(null,v))
{if(cljs.core.truth_(tx))
{return datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,a,v,tx,null)));
} else
{return datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,a,v,null,null)));
}
} else
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8544,e,a,v,tx){
return (function (p1__8527_SHARP_){return cljs.core._EQ_.call(null,tx,p1__8527_SHARP_.tx);
});})(db__$1,vec__8544,e,a,v,tx))
,datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,a,null,null,null))));
} else
{return datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,a,null,null,null)));
}
}
} else
{if(datascript.some_QMARK_.call(null,v))
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8544,e,a,v,tx){
return (function (p1__8528_SHARP_){return (cljs.core._EQ_.call(null,v,p1__8528_SHARP_.v)) && (cljs.core._EQ_.call(null,tx,p1__8528_SHARP_.tx));
});})(db__$1,vec__8544,e,a,v,tx))
,datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,null,null,null,null))));
} else
{return cljs.core.filter.call(null,((function (db__$1,vec__8544,e,a,v,tx){
return (function (p1__8529_SHARP_){return cljs.core._EQ_.call(null,v,p1__8529_SHARP_.v);
});})(db__$1,vec__8544,e,a,v,tx))
,datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,null,null,null,null))));
}
} else
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8544,e,a,v,tx){
return (function (p1__8530_SHARP_){return cljs.core._EQ_.call(null,tx,p1__8530_SHARP_.tx);
});})(db__$1,vec__8544,e,a,v,tx))
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
{return cljs.core.filter.call(null,((function (db__$1,vec__8544,e,a,v,tx){
return (function (p1__8531_SHARP_){return cljs.core._EQ_.call(null,tx,p1__8531_SHARP_.tx);
});})(db__$1,vec__8544,e,a,v,tx))
,datascript.btset.slice.call(null,self__.avet,(new datascript.Datom(null,a,v,null,null))));
} else
{return datascript.btset.slice.call(null,self__.avet,(new datascript.Datom(null,a,v,null,null)));
}
} else
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8544,e,a,v,tx){
return (function (p1__8532_SHARP_){return cljs.core._EQ_.call(null,tx,p1__8532_SHARP_.tx);
});})(db__$1,vec__8544,e,a,v,tx))
,datascript.btset.slice.call(null,self__.avet,(new datascript.Datom(null,a,null,null,null))));
} else
{return datascript.btset.slice.call(null,self__.avet,(new datascript.Datom(null,a,null,null,null)));
}
}
} else
{if(datascript.some_QMARK_.call(null,v))
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8544,e,a,v,tx){
return (function (p1__8533_SHARP_){return (cljs.core._EQ_.call(null,v,p1__8533_SHARP_.v)) && (cljs.core._EQ_.call(null,tx,p1__8533_SHARP_.tx));
});})(db__$1,vec__8544,e,a,v,tx))
,self__.eavt);
} else
{return cljs.core.filter.call(null,((function (db__$1,vec__8544,e,a,v,tx){
return (function (p1__8534_SHARP_){return cljs.core._EQ_.call(null,v,p1__8534_SHARP_.v);
});})(db__$1,vec__8544,e,a,v,tx))
,self__.eavt);
}
} else
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8544,e,a,v,tx){
return (function (p1__8535_SHARP_){return cljs.core._EQ_.call(null,tx,p1__8535_SHARP_.tx);
});})(db__$1,vec__8544,e,a,v,tx))
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
datascript.map__GT_DB = (function map__GT_DB(G__8538){return (new datascript.DB(new cljs.core.Keyword(null,"schema","schema",4400883987).cljs$core$IFn$_invoke$arity$1(G__8538),new cljs.core.Keyword(null,"eavt","eavt",1017010124).cljs$core$IFn$_invoke$arity$1(G__8538),new cljs.core.Keyword(null,"aevt","aevt",1016894804).cljs$core$IFn$_invoke$arity$1(G__8538),new cljs.core.Keyword(null,"avet","avet",1016910614).cljs$core$IFn$_invoke$arity$1(G__8538),new cljs.core.Keyword(null,"max-eid","max-eid",1856848841).cljs$core$IFn$_invoke$arity$1(G__8538),new cljs.core.Keyword(null,"max-tx","max-tx",4227685119).cljs$core$IFn$_invoke$arity$1(G__8538),null,cljs.core.dissoc.call(null,G__8538,new cljs.core.Keyword(null,"schema","schema",4400883987),new cljs.core.Keyword(null,"eavt","eavt",1017010124),new cljs.core.Keyword(null,"aevt","aevt",1016894804),new cljs.core.Keyword(null,"avet","avet",1016910614),new cljs.core.Keyword(null,"max-eid","max-eid",1856848841),new cljs.core.Keyword(null,"max-tx","max-tx",4227685119))));
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
datascript.TxReport.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__7014__auto__,k8546,else__7015__auto__){var self__ = this;
var this__7014__auto____$1 = this;var G__8548 = (((k8546 instanceof cljs.core.Keyword))?k8546.fqn:null);var caseval__8675;
switch (G__8548){
case "tempids":
caseval__8675=self__.tempids
break;
case "tx-data":
caseval__8675=self__.tx_data
break;
case "db-after":
caseval__8675=self__.db_after
break;
case "db-before":
caseval__8675=self__.db_before
break;
default:
caseval__8675=cljs.core.get.call(null,self__.__extmap,k8546,else__7015__auto__)
}
return caseval__8675;
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
datascript.TxReport.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__7019__auto__,k__7020__auto__,G__8545){var self__ = this;
var this__7019__auto____$1 = this;var pred__8549 = cljs.core.keyword_identical_QMARK_;var expr__8550 = k__7020__auto__;if(cljs.core.truth_(pred__8549.call(null,new cljs.core.Keyword(null,"db-before","db-before",3838846752),expr__8550)))
{return (new datascript.TxReport(G__8545,self__.db_after,self__.tx_data,self__.tempids,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8549.call(null,new cljs.core.Keyword(null,"db-after","db-after",1658340159),expr__8550)))
{return (new datascript.TxReport(self__.db_before,G__8545,self__.tx_data,self__.tempids,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8549.call(null,new cljs.core.Keyword(null,"tx-data","tx-data",4365248709),expr__8550)))
{return (new datascript.TxReport(self__.db_before,self__.db_after,G__8545,self__.tempids,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8549.call(null,new cljs.core.Keyword(null,"tempids","tempids",3880764886),expr__8550)))
{return (new datascript.TxReport(self__.db_before,self__.db_after,self__.tx_data,G__8545,self__.__meta,self__.__extmap,null));
} else
{return (new datascript.TxReport(self__.db_before,self__.db_after,self__.tx_data,self__.tempids,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__7020__auto__,G__8545),null));
}
}
}
}
});
datascript.TxReport.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__7024__auto__){var self__ = this;
var this__7024__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"db-before","db-before",3838846752),self__.db_before],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"db-after","db-after",1658340159),self__.db_after],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"tx-data","tx-data",4365248709),self__.tx_data],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"tempids","tempids",3880764886),self__.tempids],null))], null),self__.__extmap));
});
datascript.TxReport.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__7011__auto__,G__8545){var self__ = this;
var this__7011__auto____$1 = this;return (new datascript.TxReport(self__.db_before,self__.db_after,self__.tx_data,self__.tempids,G__8545,self__.__extmap,self__.__hash));
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
datascript.map__GT_TxReport = (function map__GT_TxReport(G__8547){return (new datascript.TxReport(new cljs.core.Keyword(null,"db-before","db-before",3838846752).cljs$core$IFn$_invoke$arity$1(G__8547),new cljs.core.Keyword(null,"db-after","db-after",1658340159).cljs$core$IFn$_invoke$arity$1(G__8547),new cljs.core.Keyword(null,"tx-data","tx-data",4365248709).cljs$core$IFn$_invoke$arity$1(G__8547),new cljs.core.Keyword(null,"tempids","tempids",3880764886).cljs$core$IFn$_invoke$arity$1(G__8547),null,cljs.core.dissoc.call(null,G__8547,new cljs.core.Keyword(null,"db-before","db-before",3838846752),new cljs.core.Keyword(null,"db-after","db-after",1658340159),new cljs.core.Keyword(null,"tx-data","tx-data",4365248709),new cljs.core.Keyword(null,"tempids","tempids",3880764886))));
});
datascript.multival_QMARK_ = (function multival_QMARK_(db,attr){return cljs.core._EQ_.call(null,cljs.core.get_in.call(null,db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"schema","schema",4400883987),attr,new cljs.core.Keyword("db","cardinality","db/cardinality",1859321681)], null)),new cljs.core.Keyword("db.cardinality","many","db.cardinality/many",2499141178));
});
datascript.ref_QMARK_ = (function ref_QMARK_(db,attr){return cljs.core._EQ_.call(null,cljs.core.get_in.call(null,db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"schema","schema",4400883987),attr,new cljs.core.Keyword("db","valueType","db/valueType",4543387286)], null)),new cljs.core.Keyword("db.type","ref","db.type/ref",2629452693));
});
datascript.match_tuple = (function match_tuple(tuple,pattern){return cljs.core.every_QMARK_.call(null,cljs.core.true_QMARK_,cljs.core.map.call(null,(function (p1__8553_SHARP_,p2__8552_SHARP_){return ((p2__8552_SHARP_ == null)) || (cljs.core._EQ_.call(null,p1__8553_SHARP_,p2__8552_SHARP_));
}),tuple,pattern));
});
datascript.search = (function search(data,pattern){if((function (){var G__8558 = data;if(G__8558)
{var bit__7076__auto__ = null;if(cljs.core.truth_((function (){var or__6426__auto__ = bit__7076__auto__;if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return G__8558.datascript$ISearch$;
}
})()))
{return true;
} else
{if((!G__8558.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,datascript.ISearch,G__8558);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,datascript.ISearch,G__8558);
}
})())
{return datascript._search.call(null,data,pattern);
} else
{if((function (){var or__6426__auto__ = (function (){var G__8560 = data;if(G__8560)
{var bit__7076__auto__ = (G__8560.cljs$lang$protocol_mask$partition0$ & 8388608);if((bit__7076__auto__) || (G__8560.cljs$core$ISeqable$))
{return true;
} else
{if((!G__8560.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__8560);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__8560);
}
})();if(or__6426__auto__)
{return or__6426__auto__;
} else
{return data instanceof Array;
}
})())
{return cljs.core.filter.call(null,(function (p1__8554_SHARP_){return datascript.match_tuple.call(null,p1__8554_SHARP_,pattern);
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
datascript.advance_max_eid = (function advance_max_eid(db,eid){var G__8562 = db;var G__8562__$1 = (((eid > new cljs.core.Keyword(null,"max-eid","max-eid",1856848841).cljs$core$IFn$_invoke$arity$1(db)))?cljs.core.assoc.call(null,G__8562,new cljs.core.Keyword(null,"max-eid","max-eid",1856848841),eid):G__8562);return G__8562__$1;
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
return (function iter__8571(s__8572){return (new cljs.core.LazySeq(null,((function (eid){
return (function (){var s__8572__$1 = s__8572;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__8572__$1);if(temp__4126__auto__)
{var xs__4624__auto__ = temp__4126__auto__;var vec__8578 = cljs.core.first.call(null,xs__4624__auto__);var a = cljs.core.nth.call(null,vec__8578,0,null);var vs = cljs.core.nth.call(null,vec__8578,1,null);var iterys__7147__auto__ = ((function (s__8572__$1,vec__8578,a,vs,xs__4624__auto__,temp__4126__auto__,eid){
return (function iter__8573(s__8574){return (new cljs.core.LazySeq(null,((function (s__8572__$1,vec__8578,a,vs,xs__4624__auto__,temp__4126__auto__,eid){
return (function (){var s__8574__$1 = s__8574;while(true){
var temp__4126__auto____$1 = cljs.core.seq.call(null,s__8574__$1);if(temp__4126__auto____$1)
{var s__8574__$2 = temp__4126__auto____$1;if(cljs.core.chunked_seq_QMARK_.call(null,s__8574__$2))
{var c__7149__auto__ = cljs.core.chunk_first.call(null,s__8574__$2);var size__7150__auto__ = cljs.core.count.call(null,c__7149__auto__);var b__8576 = cljs.core.chunk_buffer.call(null,size__7150__auto__);if((function (){var i__8575 = 0;while(true){
if((i__8575 < size__7150__auto__))
{var v = cljs.core._nth.call(null,c__7149__auto__,i__8575);cljs.core.chunk_append.call(null,b__8576,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db","add","db/add",1014207040),eid,a,v], null));
{
var G__8676 = (i__8575 + 1);
i__8575 = G__8676;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8576),iter__8573.call(null,cljs.core.chunk_rest.call(null,s__8574__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8576),null);
}
} else
{var v = cljs.core.first.call(null,s__8574__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db","add","db/add",1014207040),eid,a,v], null),iter__8573.call(null,cljs.core.rest.call(null,s__8574__$2)));
}
} else
{return null;
}
break;
}
});})(s__8572__$1,vec__8578,a,vs,xs__4624__auto__,temp__4126__auto__,eid))
,null,null));
});})(s__8572__$1,vec__8578,a,vs,xs__4624__auto__,temp__4126__auto__,eid))
;var fs__7148__auto__ = cljs.core.seq.call(null,iterys__7147__auto__.call(null,(((cljs.core.sequential_QMARK_.call(null,vs)) && (datascript.multival_QMARK_.call(null,db,a)))?vs:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [vs], null))));if(fs__7148__auto__)
{return cljs.core.concat.call(null,fs__7148__auto__,iter__8571.call(null,cljs.core.rest.call(null,s__8572__$1)));
} else
{{
var G__8677 = cljs.core.rest.call(null,s__8572__$1);
s__8572__$1 = G__8677;
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
datascript.transact_add = (function transact_add(report,p__8579){var vec__8581 = p__8579;var _ = cljs.core.nth.call(null,vec__8581,0,null);var e = cljs.core.nth.call(null,vec__8581,1,null);var a = cljs.core.nth.call(null,vec__8581,2,null);var v = cljs.core.nth.call(null,vec__8581,3,null);var tx = datascript.current_tx.call(null,report);var db = new cljs.core.Keyword(null,"db-after","db-after",1658340159).cljs$core$IFn$_invoke$arity$1(report);var datom = (new datascript.Datom(e,a,v,tx,true));if(datascript.multival_QMARK_.call(null,db,a))
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
datascript.transact_entities = (function transact_entities(report,p__8582){while(true){
var vec__8586 = p__8582;var entity = cljs.core.nth.call(null,vec__8586,0,null);var entities = cljs.core.nthnext.call(null,vec__8586,1);var es = vec__8586;var db = new cljs.core.Keyword(null,"db-after","db-after",1658340159).cljs$core$IFn$_invoke$arity$1(report);if((entity == null))
{return cljs.core.update_in.call(null,report,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db-after","db-after",1658340159),new cljs.core.Keyword(null,"max-tx","max-tx",4227685119)], null),cljs.core.inc);
} else
{if(cljs.core.map_QMARK_.call(null,entity))
{if(cljs.core.truth_(new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(entity)))
{{
var G__8678 = report;
var G__8679 = cljs.core.concat.call(null,datascript.explode.call(null,db,entity),entities);
report = G__8678;
p__8582 = G__8679;
continue;
}
} else
{var eid = datascript.next_eid.call(null,db);var entity__$1 = cljs.core.assoc.call(null,entity,new cljs.core.Keyword("db","id","db/id",1014111942),eid);{
var G__8680 = datascript.allocate_eid.call(null,report,eid);
var G__8681 = cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [entity__$1], null),entities);
report = G__8680;
p__8582 = G__8681;
continue;
}
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{var vec__8587 = entity;var op = cljs.core.nth.call(null,vec__8587,0,null);var e = cljs.core.nth.call(null,vec__8587,1,null);var a = cljs.core.nth.call(null,vec__8587,2,null);var v = cljs.core.nth.call(null,vec__8587,3,null);if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db.fn","call","db.fn/call",2901959894)))
{var vec__8588 = entity;var _ = cljs.core.nth.call(null,vec__8588,0,null);var f = cljs.core.nth.call(null,vec__8588,1,null);var args = cljs.core.nthnext.call(null,vec__8588,2);{
var G__8682 = report;
var G__8683 = cljs.core.concat.call(null,cljs.core.apply.call(null,f,db,args),entities);
report = G__8682;
p__8582 = G__8683;
continue;
}
} else
{if((e < 0))
{var temp__4124__auto__ = cljs.core.get_in.call(null,report,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tempids","tempids",3880764886),e], null));if(cljs.core.truth_(temp__4124__auto__))
{var eid = temp__4124__auto__;{
var G__8684 = report;
var G__8685 = cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [op,eid,a,v], null)], null),entities);
report = G__8684;
p__8582 = G__8685;
continue;
}
} else
{{
var G__8686 = datascript.allocate_eid.call(null,report,e,datascript.next_eid.call(null,db));
var G__8687 = es;
report = G__8686;
p__8582 = G__8687;
continue;
}
}
} else
{if((datascript.ref_QMARK_.call(null,db,a)) && ((v < 0)))
{var temp__4124__auto__ = cljs.core.get_in.call(null,report,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tempids","tempids",3880764886),v], null));if(cljs.core.truth_(temp__4124__auto__))
{var vid = temp__4124__auto__;{
var G__8688 = report;
var G__8689 = cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [op,e,a,vid], null)], null),entities);
report = G__8688;
p__8582 = G__8689;
continue;
}
} else
{{
var G__8690 = datascript.allocate_eid.call(null,report,v,datascript.next_eid.call(null,db));
var G__8691 = es;
report = G__8690;
p__8582 = G__8691;
continue;
}
}
} else
{if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db","add","db/add",1014207040)))
{{
var G__8692 = datascript.transact_add.call(null,report,entity);
var G__8693 = entities;
report = G__8692;
p__8582 = G__8693;
continue;
}
} else
{if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db","retract","db/retract",2112480480)))
{var temp__4124__auto__ = cljs.core.first.call(null,datascript._search.call(null,db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,v], null)));if(cljs.core.truth_(temp__4124__auto__))
{var old_datom = temp__4124__auto__;{
var G__8694 = datascript.transact_retract_datom.call(null,report,old_datom);
var G__8695 = entities;
report = G__8694;
p__8582 = G__8695;
continue;
}
} else
{{
var G__8696 = report;
var G__8697 = entities;
report = G__8696;
p__8582 = G__8697;
continue;
}
}
} else
{if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db.fn","retractAttribute","db.fn/retractAttribute",3416849171)))
{var datoms = datascript._search.call(null,db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a], null));{
var G__8698 = cljs.core.reduce.call(null,datascript.transact_retract_datom,report,datoms);
var G__8699 = entities;
report = G__8698;
p__8582 = G__8699;
continue;
}
} else
{if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db.fn","retractEntity","db.fn/retractEntity",4213852396)))
{var datoms = datascript._search.call(null,db,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [e], null));{
var G__8700 = cljs.core.reduce.call(null,datascript.transact_retract_datom,report,datoms);
var G__8701 = entities;
report = G__8700;
p__8582 = G__8701;
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
datascript.bind_symbols = (function bind_symbols(form,scope){return cljs.core.map.call(null,(function (p1__8589_SHARP_){return datascript.bind_symbol.call(null,p1__8589_SHARP_,scope);
}),form);
});
datascript.search_datoms = (function search_datoms(source,where,scope){return datascript.search.call(null,datascript.bind_symbol.call(null,source,scope),datascript.bind_symbols.call(null,where,scope));
});
datascript.populate_scope = (function populate_scope(scope,where,datom){return cljs.core.into.call(null,scope,cljs.core.remove.call(null,cljs.core.nil_QMARK_,cljs.core.map.call(null,(function (p1__8590_SHARP_,p2__8591_SHARP_){if(((p1__8590_SHARP_ instanceof cljs.core.Symbol)) && (!(cljs.core.contains_QMARK_.call(null,scope,p1__8590_SHARP_))))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__8590_SHARP_,p2__8591_SHARP_], null);
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
_differ_QMARK_.cljs$lang$applyTo = (function (arglist__8702){
var xs = cljs.core.seq(arglist__8702);
return _differ_QMARK___delegate(xs);
});
_differ_QMARK_.cljs$core$IFn$_invoke$arity$variadic = _differ_QMARK___delegate;
return _differ_QMARK_;
})()
;
datascript.built_ins = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Symbol(null,"true?","true?",-1529891286,null),new cljs.core.Symbol(null,"odd?","odd?",-1637125463,null),new cljs.core.Symbol(null,">=",">=",-1640529544,null),new cljs.core.Symbol(null,">",">",-1640531465,null),new cljs.core.Symbol(null,"nil?","nil?",-1637150201,null),new cljs.core.Symbol(null,"inc","inc",-1640427113,null),new cljs.core.Symbol(null,"/","/",-1640531480,null),new cljs.core.Symbol(null,"quot","quot",-1637049150,null),new cljs.core.Symbol(null,"false?","false?",1372554549,null),new cljs.core.Symbol(null,"-differ?","-differ?",1135976441,null),new cljs.core.Symbol(null,"<=","<=",-1640529606,null),new cljs.core.Symbol(null,"=","=",-1640531466,null),new cljs.core.Symbol(null,"min","min",-1640423413,null),new cljs.core.Symbol(null,"+","+",-1640531484,null),new cljs.core.Symbol(null,"==","==",-1640529575,null),new cljs.core.Symbol(null,"max","max",-1640423651,null),new cljs.core.Symbol(null,"*","*",-1640531485,null),new cljs.core.Symbol(null,"zero?","zero?",-1524740016,null),new cljs.core.Symbol(null,"!=","!=",-1640530443,null),new cljs.core.Symbol(null,"dec","dec",-1640432197,null),new cljs.core.Symbol(null,"not=","not=",-1637144189,null),new cljs.core.Symbol(null,"<","<",-1640531467,null),new cljs.core.Symbol(null,"-","-",-1640531482,null),new cljs.core.Symbol(null,"pos?","pos?",-1637084636,null),new cljs.core.Symbol(null,"mod","mod",-1640423237,null),new cljs.core.Symbol(null,"rem","rem",-1640418733,null),new cljs.core.Symbol(null,"even?","even?",-1543640034,null),new cljs.core.Symbol(null,"neg?","neg?",-1637154200,null)],[cljs.core.true_QMARK_,cljs.core.odd_QMARK_,cljs.core._GT__EQ_,cljs.core._GT_,cljs.core.nil_QMARK_,cljs.core.inc,cljs.core._SLASH_,cljs.core.quot,cljs.core.false_QMARK_,datascript._differ_QMARK_,cljs.core._LT__EQ_,cljs.core._EQ_,cljs.core.min,cljs.core._PLUS_,cljs.core._EQ__EQ_,cljs.core.max,cljs.core._STAR_,cljs.core.zero_QMARK_,cljs.core.not_EQ_,cljs.core.dec,cljs.core.not_EQ_,cljs.core._LT_,cljs.core._,cljs.core.pos_QMARK_,cljs.core.mod,cljs.core.rem,cljs.core.even_QMARK_,cljs.core.neg_QMARK_]);
datascript.call = (function call(p__8592,scope){var vec__8594 = p__8592;var f = cljs.core.nth.call(null,vec__8594,0,null);var args = cljs.core.nthnext.call(null,vec__8594,1);var bound_args = datascript.bind_symbols.call(null,args,scope);var f__$1 = (function (){var or__6426__auto__ = datascript.built_ins.call(null,f);if(cljs.core.truth_(or__6426__auto__))
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
{return (cljs.core.sequential_QMARK_.call(null,form)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,form),cljs.core.count.call(null,pattern))) && (cljs.core.every_QMARK_.call(null,(function (p__8601){var vec__8602 = p__8601;var pattern_el = cljs.core.nth.call(null,vec__8602,0,null);var form_el = cljs.core.nth.call(null,vec__8602,1,null);return looks_like_QMARK_.call(null,pattern_el,form_el);
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
datascript.collect = (function collect(f,coll){return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,(function (p1__8603_SHARP_,p2__8604_SHARP_){return cljs.core.reduce.call(null,cljs.core.conj_BANG_,p1__8603_SHARP_,f.call(null,p2__8604_SHARP_));
}),cljs.core.transient$.call(null,cljs.core.PersistentHashSet.EMPTY),coll));
});
datascript.bind_rule_branch = (function bind_rule_branch(branch,call_args,context){var vec__8612 = branch;var vec__8613 = cljs.core.nth.call(null,vec__8612,0,null);var rule = cljs.core.nth.call(null,vec__8613,0,null);var local_args = cljs.core.nthnext.call(null,vec__8613,1);var body = cljs.core.nthnext.call(null,vec__8612,1);var replacements = cljs.core.zipmap.call(null,local_args,call_args);var seqid = new cljs.core.Keyword(null,"__depth","__depth",2242649685).cljs$core$IFn$_invoke$arity$2(context,0);var bound_body = clojure.walk.postwalk.call(null,((function (vec__8612,vec__8613,rule,local_args,body,replacements,seqid){
return (function (p1__8605_SHARP_){if(((p1__8605_SHARP_ instanceof cljs.core.Symbol)) && (cljs.core._EQ_.call(null,"?",cljs.core.first.call(null,cljs.core.name.call(null,p1__8605_SHARP_)))))
{var or__6426__auto__ = replacements.call(null,p1__8605_SHARP_);if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return cljs.core.symbol.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,p1__8605_SHARP_))+"__auto__"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(seqid)));
}
} else
{return p1__8605_SHARP_;
}
});})(vec__8612,vec__8613,rule,local_args,body,replacements,seqid))
,body);return cljs.core.concat.call(null,(function (){var iter__7151__auto__ = ((function (vec__8612,vec__8613,rule,local_args,body,replacements,seqid,bound_body){
return (function iter__8614(s__8615){return (new cljs.core.LazySeq(null,((function (vec__8612,vec__8613,rule,local_args,body,replacements,seqid,bound_body){
return (function (){var s__8615__$1 = s__8615;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__8615__$1);if(temp__4126__auto__)
{var s__8615__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__8615__$2))
{var c__7149__auto__ = cljs.core.chunk_first.call(null,s__8615__$2);var size__7150__auto__ = cljs.core.count.call(null,c__7149__auto__);var b__8617 = cljs.core.chunk_buffer.call(null,size__7150__auto__);if((function (){var i__8616 = 0;while(true){
if((i__8616 < size__7150__auto__))
{var prev_call_args = cljs.core._nth.call(null,c__7149__auto__,i__8616);cljs.core.chunk_append.call(null,b__8617,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"-differ?","-differ?",1135976441,null)], null),call_args,prev_call_args)], null));
{
var G__8703 = (i__8616 + 1);
i__8616 = G__8703;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8617),iter__8614.call(null,cljs.core.chunk_rest.call(null,s__8615__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8617),null);
}
} else
{var prev_call_args = cljs.core.first.call(null,s__8615__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"-differ?","-differ?",1135976441,null)], null),call_args,prev_call_args)], null),iter__8614.call(null,cljs.core.rest.call(null,s__8615__$2)));
}
} else
{return null;
}
break;
}
});})(vec__8612,vec__8613,rule,local_args,body,replacements,seqid,bound_body))
,null,null));
});})(vec__8612,vec__8613,rule,local_args,body,replacements,seqid,bound_body))
;return iter__7151__auto__.call(null,cljs.core.get.call(null,context,rule));
})(),bound_body);
});
datascript._q = (function _q(in_PLUS_sources,wheres,scope){while(true){
if(cljs.core.truth_(cljs.core.not_empty.call(null,in_PLUS_sources)))
{var vec__8631 = cljs.core.first.call(null,in_PLUS_sources);var in$ = cljs.core.nth.call(null,vec__8631,0,null);var source = cljs.core.nth.call(null,vec__8631,1,null);var pred__8632 = datascript.looks_like_QMARK_;var expr__8633 = in$;if(cljs.core.truth_(pred__8632.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1640531432,null),new cljs.core.Symbol(null,"...","...",-1640485849,null)], null),expr__8633)))
{return datascript.collect.call(null,((function (in_PLUS_sources,wheres,scope,pred__8632,expr__8633,vec__8631,in$,source){
return (function (p1__8618_SHARP_){return _q.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,in$),p1__8618_SHARP_], null)], null),cljs.core.next.call(null,in_PLUS_sources)),wheres,scope);
});})(in_PLUS_sources,wheres,scope,pred__8632,expr__8633,vec__8631,in$,source))
,source);
} else
{if(cljs.core.truth_(pred__8632.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null)], null),expr__8633)))
{return datascript.collect.call(null,((function (in_PLUS_sources,wheres,scope,pred__8632,expr__8633,vec__8631,in$,source){
return (function (p1__8619_SHARP_){return _q.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,in$),p1__8619_SHARP_], null)], null),cljs.core.next.call(null,in_PLUS_sources)),wheres,scope);
});})(in_PLUS_sources,wheres,scope,pred__8632,expr__8633,vec__8631,in$,source))
,source);
} else
{if(cljs.core.truth_(pred__8632.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null),expr__8633)))
{{
var G__8704 = cljs.core.concat.call(null,cljs.core.zipmap.call(null,in$,source),cljs.core.next.call(null,in_PLUS_sources));
var G__8705 = wheres;
var G__8706 = scope;
in_PLUS_sources = G__8704;
wheres = G__8705;
scope = G__8706;
continue;
}
} else
{if(cljs.core.truth_(pred__8632.call(null,new cljs.core.Symbol(null,"%","%",-1640531490,null),expr__8633)))
{var rules = ((typeof source === 'string')?cljs.reader.read_string.call(null,source):source);{
var G__8707 = cljs.core.next.call(null,in_PLUS_sources);
var G__8708 = wheres;
var G__8709 = cljs.core.assoc.call(null,scope,new cljs.core.Keyword(null,"__rules","__rules",2256051337),cljs.core.group_by.call(null,cljs.core.ffirst,rules));
in_PLUS_sources = G__8707;
wheres = G__8708;
scope = G__8709;
continue;
}
} else
{if(cljs.core.truth_(pred__8632.call(null,new cljs.core.Symbol(null,"_","_",-1640531432,null),expr__8633)))
{{
var G__8710 = cljs.core.next.call(null,in_PLUS_sources);
var G__8711 = wheres;
var G__8712 = cljs.core.assoc.call(null,scope,in$,source);
in_PLUS_sources = G__8710;
wheres = G__8711;
scope = G__8712;
continue;
}
} else
{throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__8633))));
}
}
}
}
}
} else
{if(cljs.core.truth_(cljs.core.not_empty.call(null,wheres)))
{var where = cljs.core.first.call(null,wheres);var temp__4124__auto__ = cljs.core.get.call(null,new cljs.core.Keyword(null,"__rules","__rules",2256051337).cljs$core$IFn$_invoke$arity$1(scope),cljs.core.first.call(null,where));if(cljs.core.truth_(temp__4124__auto__))
{var rule_branches = temp__4124__auto__;var vec__8635 = where;var rule = cljs.core.nth.call(null,vec__8635,0,null);var call_args = cljs.core.nthnext.call(null,vec__8635,1);var next_scope = cljs.core.update_in.call(null,cljs.core.update_in.call(null,scope,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"__rules_ctx","__rules_ctx",2834098801),rule], null),cljs.core.conj,call_args),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"__rules_ctx","__rules_ctx",2834098801),new cljs.core.Keyword(null,"__depth","__depth",2242649685)], null),cljs.core.inc);var next_wheres = cljs.core.next.call(null,wheres);return datascript.collect.call(null,((function (in_PLUS_sources,wheres,scope,vec__8635,rule,call_args,next_scope,next_wheres,rule_branches,temp__4124__auto__,where){
return (function (p1__8620_SHARP_){return _q.call(null,null,cljs.core.concat.call(null,datascript.bind_rule_branch.call(null,p1__8620_SHARP_,call_args,new cljs.core.Keyword(null,"__rules_ctx","__rules_ctx",2834098801).cljs$core$IFn$_invoke$arity$1(scope)),next_wheres),next_scope);
});})(in_PLUS_sources,wheres,scope,vec__8635,rule,call_args,next_scope,next_wheres,rule_branches,temp__4124__auto__,where))
,rule_branches);
} else
{var pred__8636 = datascript.looks_like_QMARK_;var expr__8637 = where;if(cljs.core.truth_(pred__8636.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null)], null),expr__8637)))
{if(cljs.core.truth_(datascript.call.call(null,cljs.core.first.call(null,where),scope)))
{{
var G__8713 = null;
var G__8714 = cljs.core.next.call(null,wheres);
var G__8715 = scope;
in_PLUS_sources = G__8713;
wheres = G__8714;
scope = G__8715;
continue;
}
} else
{return null;
}
} else
{if(cljs.core.truth_(pred__8636.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null),new cljs.core.Symbol(null,"_","_",-1640531432,null)], null),expr__8637)))
{var res = datascript.call.call(null,cljs.core.first.call(null,where),scope);{
var G__8716 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.second.call(null,where),res], null)], null);
var G__8717 = cljs.core.next.call(null,wheres);
var G__8718 = scope;
in_PLUS_sources = G__8716;
wheres = G__8717;
scope = G__8718;
continue;
}
} else
{if(cljs.core.truth_(pred__8636.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null),expr__8637)))
{var vec__8639 = datascript.parse_where.call(null,where);var source = cljs.core.nth.call(null,vec__8639,0,null);var where__$1 = cljs.core.nth.call(null,vec__8639,1,null);var found = datascript.search_datoms.call(null,source,where__$1,scope);return datascript.collect.call(null,((function (in_PLUS_sources,wheres,scope,vec__8639,source,where__$1,found,pred__8636,expr__8637,temp__4124__auto__,where){
return (function (p1__8621_SHARP_){return _q.call(null,null,cljs.core.next.call(null,wheres),datascript.populate_scope.call(null,scope,where__$1,p1__8621_SHARP_));
});})(in_PLUS_sources,wheres,scope,vec__8639,source,where__$1,found,pred__8636,expr__8637,temp__4124__auto__,where))
,found);
} else
{throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__8637))));
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
var G__8719 = null;
var G__8719__1 = (function (coll){return cljs.core.reduce.call(null,cljs.core.min,coll);
});
var G__8719__2 = (function (n,coll){return cljs.core.vec.call(null,cljs.core.reduce.call(null,(function (acc,x){if((cljs.core.count.call(null,acc) < n))
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
G__8719 = function(n,coll){
switch(arguments.length){
case 1:
return G__8719__1.call(this,n);
case 2:
return G__8719__2.call(this,n,coll);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__8719;
})()
,new cljs.core.Symbol(null,"max","max",-1640423651,null),(function() {
var G__8720 = null;
var G__8720__1 = (function (coll){return cljs.core.reduce.call(null,cljs.core.max,coll);
});
var G__8720__2 = (function (n,coll){return cljs.core.vec.call(null,cljs.core.reduce.call(null,(function (acc,x){if((cljs.core.count.call(null,acc) < n))
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
G__8720 = function(n,coll){
switch(arguments.length){
case 1:
return G__8720__1.call(this,n);
case 2:
return G__8720__2.call(this,n,coll);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__8720;
})()
,new cljs.core.Symbol(null,"sum","sum",-1640417276,null),(function (p1__8640_SHARP_){return cljs.core.reduce.call(null,cljs.core._PLUS_,0,p1__8640_SHARP_);
}),new cljs.core.Symbol(null,"rand","rand",-1637038626,null),(function() {
var G__8721 = null;
var G__8721__1 = (function (coll){return cljs.core.rand_nth.call(null,coll);
});
var G__8721__2 = (function (n,coll){return cljs.core.vec.call(null,cljs.core.repeatedly.call(null,n,(function (){return cljs.core.rand_nth.call(null,coll);
})));
});
G__8721 = function(n,coll){
switch(arguments.length){
case 1:
return G__8721__1.call(this,n);
case 2:
return G__8721__2.call(this,n,coll);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__8721;
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
{var vec__8643 = sym;var f = cljs.core.nth.call(null,vec__8643,0,null);var args = cljs.core.nthnext.call(null,vec__8643,1);var vals = cljs.core.map.call(null,((function (vec__8643,f,args){
return (function (p1__8641_SHARP_){return cljs.core.get.call(null,p1__8641_SHARP_,i);
});})(vec__8643,f,args))
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
return (function (p__8647){var vec__8648 = p__8647;var _ = cljs.core.nth.call(null,vec__8648,0,null);var results__$1 = cljs.core.nth.call(null,vec__8648,1,null);return datascript._aggregate.call(null,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(query),scope,results__$1);
});})(find))
,cljs.core.group_by.call(null,((function (find){
return (function (p1__8644_SHARP_){return datascript.aggr_group_key.call(null,find,p1__8644_SHARP_);
});})(find))
,results));
});
datascript.parse_query = (function parse_query(query){var parsed = cljs.core.PersistentArrayMap.EMPTY;var key = null;var qs = query;while(true){
var temp__4124__auto__ = cljs.core.first.call(null,qs);if(cljs.core.truth_(temp__4124__auto__))
{var q = temp__4124__auto__;if((q instanceof cljs.core.Keyword))
{{
var G__8722 = parsed;
var G__8723 = q;
var G__8724 = cljs.core.next.call(null,qs);
parsed = G__8722;
key = G__8723;
qs = G__8724;
continue;
}
} else
{{
var G__8725 = cljs.core.update_in.call(null,parsed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),q);
var G__8726 = key;
var G__8727 = cljs.core.next.call(null,qs);
parsed = G__8725;
key = G__8726;
qs = G__8727;
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
return (function (p1__8649_SHARP_){if(cljs.core.sequential_QMARK_.call(null,p1__8649_SHARP_))
{return cljs.core.last.call(null,p1__8649_SHARP_);
} else
{return p1__8649_SHARP_;
}
});})(query__$1,ins__GT_sources))
,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(query__$1)),new cljs.core.Keyword(null,"with","with",1017553976).cljs$core$IFn$_invoke$arity$1(query__$1));var results = datascript._q.call(null,ins__GT_sources,new cljs.core.Keyword(null,"where","where",1127002201).cljs$core$IFn$_invoke$arity$1(query__$1),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__find","__find",3824551179),find], null));var G__8652 = results;var G__8652__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"with","with",1017553976).cljs$core$IFn$_invoke$arity$1(query__$1))?cljs.core.mapv.call(null,((function (G__8652,query__$1,ins__GT_sources,find,results){
return (function (p1__8650_SHARP_){return cljs.core.subvec.call(null,p1__8650_SHARP_,0,cljs.core.count.call(null,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(query__$1)));
});})(G__8652,query__$1,ins__GT_sources,find,results))
,G__8652):G__8652);var G__8652__$2 = (cljs.core.truth_(cljs.core.not_empty.call(null,cljs.core.filter.call(null,cljs.core.sequential_QMARK_,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(query__$1))))?datascript.aggregate.call(null,query__$1,ins__GT_sources,G__8652__$1):G__8652__$1);return G__8652__$2;
};
var q = function (query,var_args){
var sources = null;if (arguments.length > 1) {
  sources = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return q__delegate.call(this,query,sources);};
q.cljs$lang$maxFixedArity = 1;
q.cljs$lang$applyTo = (function (arglist__8728){
var query = cljs.core.first(arglist__8728);
var sources = cljs.core.rest(arglist__8728);
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
var empty_db__delegate = function (p__8653){var vec__8655 = p__8653;var schema = cljs.core.nth.call(null,vec__8655,0,null);return (new datascript.DB(schema,datascript.btset.btset_by.call(null,datascript.cmp_datoms_eavt),datascript.btset.btset_by.call(null,datascript.cmp_datoms_aevt),datascript.btset.btset_by.call(null,datascript.cmp_datoms_avet),0,datascript.tx0));
};
var empty_db = function (var_args){
var p__8653 = null;if (arguments.length > 0) {
  p__8653 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return empty_db__delegate.call(this,p__8653);};
empty_db.cljs$lang$maxFixedArity = 0;
empty_db.cljs$lang$applyTo = (function (arglist__8729){
var p__8653 = cljs.core.seq(arglist__8729);
return empty_db__delegate(p__8653);
});
empty_db.cljs$core$IFn$_invoke$arity$variadic = empty_db__delegate;
return empty_db;
})()
;
/**
* @param {...*} var_args
*/
datascript.create_conn = (function() { 
var create_conn__delegate = function (p__8656){var vec__8658 = p__8656;var schema = cljs.core.nth.call(null,vec__8658,0,null);return cljs.core.atom.call(null,datascript.empty_db.call(null,schema),new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"listeners","listeners",4090152369),cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY)], null));
};
var create_conn = function (var_args){
var p__8656 = null;if (arguments.length > 0) {
  p__8656 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return create_conn__delegate.call(this,p__8656);};
create_conn.cljs$lang$maxFixedArity = 0;
create_conn.cljs$lang$applyTo = (function (arglist__8730){
var p__8656 = cljs.core.seq(arglist__8730);
return create_conn__delegate(p__8656);
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
datascript.transact_BANG_ = (function transact_BANG_(conn,entities){var report = datascript._transact_BANG_.call(null,conn,entities);var seq__8665_8731 = cljs.core.seq.call(null,cljs.core.deref.call(null,new cljs.core.Keyword(null,"listeners","listeners",4090152369).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,conn))));var chunk__8666_8732 = null;var count__8667_8733 = 0;var i__8668_8734 = 0;while(true){
if((i__8668_8734 < count__8667_8733))
{var vec__8669_8735 = cljs.core._nth.call(null,chunk__8666_8732,i__8668_8734);var __8736 = cljs.core.nth.call(null,vec__8669_8735,0,null);var callback_8737 = cljs.core.nth.call(null,vec__8669_8735,1,null);callback_8737.call(null,report);
{
var G__8738 = seq__8665_8731;
var G__8739 = chunk__8666_8732;
var G__8740 = count__8667_8733;
var G__8741 = (i__8668_8734 + 1);
seq__8665_8731 = G__8738;
chunk__8666_8732 = G__8739;
count__8667_8733 = G__8740;
i__8668_8734 = G__8741;
continue;
}
} else
{var temp__4126__auto___8742 = cljs.core.seq.call(null,seq__8665_8731);if(temp__4126__auto___8742)
{var seq__8665_8743__$1 = temp__4126__auto___8742;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8665_8743__$1))
{var c__7182__auto___8744 = cljs.core.chunk_first.call(null,seq__8665_8743__$1);{
var G__8745 = cljs.core.chunk_rest.call(null,seq__8665_8743__$1);
var G__8746 = c__7182__auto___8744;
var G__8747 = cljs.core.count.call(null,c__7182__auto___8744);
var G__8748 = 0;
seq__8665_8731 = G__8745;
chunk__8666_8732 = G__8746;
count__8667_8733 = G__8747;
i__8668_8734 = G__8748;
continue;
}
} else
{var vec__8670_8749 = cljs.core.first.call(null,seq__8665_8743__$1);var __8750 = cljs.core.nth.call(null,vec__8670_8749,0,null);var callback_8751 = cljs.core.nth.call(null,vec__8670_8749,1,null);callback_8751.call(null,report);
{
var G__8752 = cljs.core.next.call(null,seq__8665_8743__$1);
var G__8753 = null;
var G__8754 = 0;
var G__8755 = 0;
seq__8665_8731 = G__8752;
chunk__8666_8732 = G__8753;
count__8667_8733 = G__8754;
i__8668_8734 = G__8755;
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
datascript.components__GT_pattern = (function components__GT_pattern(index,cs){var G__8672 = (((index instanceof cljs.core.Keyword))?index.fqn:null);var caseval__8756;
switch (G__8672){
case "avet":
caseval__8756=(new datascript.Datom(cljs.core.nth.call(null,cs,2,null),cljs.core.nth.call(null,cs,0,null),cljs.core.nth.call(null,cs,1,null),cljs.core.nth.call(null,cs,3,null),null))
break;
case "aevt":
caseval__8756=(new datascript.Datom(cljs.core.nth.call(null,cs,1,null),cljs.core.nth.call(null,cs,0,null),cljs.core.nth.call(null,cs,2,null),cljs.core.nth.call(null,cs,3,null),null))
break;
case "eavt":
caseval__8756=(new datascript.Datom(cljs.core.nth.call(null,cs,0,null),cljs.core.nth.call(null,cs,1,null),cljs.core.nth.call(null,cs,2,null),cljs.core.nth.call(null,cs,3,null),null))
break;
default:
caseval__8756=(function(){throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(index))))})()
}
return caseval__8756;
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
datoms.cljs$lang$applyTo = (function (arglist__8757){
var db = cljs.core.first(arglist__8757);
arglist__8757 = cljs.core.next(arglist__8757);
var index = cljs.core.first(arglist__8757);
var cs = cljs.core.rest(arglist__8757);
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
seek_datoms.cljs$lang$applyTo = (function (arglist__8758){
var db = cljs.core.first(arglist__8758);
arglist__8758 = cljs.core.next(arglist__8758);
var index = cljs.core.first(arglist__8758);
var cs = cljs.core.rest(arglist__8758);
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
return datascript.listen_BANG_.call(null,lt.plugins.kukui.datascript.conn,new cljs.core.Keyword(null,"db-history","db-history",3844499895),(function (p1__8860_SHARP_){return cljs.core.swap_BANG_.call(null,lt.plugins.kukui.datascript.reports,cljs.core.conj,p1__8860_SHARP_);
}));
};
var reset_connection_BANG_ = function (var_args){
var args = null;if (arguments.length > 0) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return reset_connection_BANG___delegate.call(this,args);};
reset_connection_BANG_.cljs$lang$maxFixedArity = 0;
reset_connection_BANG_.cljs$lang$applyTo = (function (arglist__8865){
var args = cljs.core.seq(arglist__8865);
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
q.cljs$lang$applyTo = (function (arglist__8866){
var query = cljs.core.first(arglist__8866);
var args = cljs.core.rest(arglist__8866);
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
qf.cljs$lang$applyTo = (function (arglist__8867){
var query = cljs.core.first(arglist__8867);
var args = cljs.core.rest(arglist__8867);
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
var qe__delegate = function (query,args){return cljs.core.map.call(null,(function (p1__8861_SHARP_){return lt.plugins.kukui.datascript.entity.call(null,cljs.core.first.call(null,p1__8861_SHARP_));
}),cljs.core.apply.call(null,lt.plugins.kukui.datascript.q,query,args));
};
var qe = function (query,var_args){
var args = null;if (arguments.length > 1) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return qe__delegate.call(this,query,args);};
qe.cljs$lang$maxFixedArity = 1;
qe.cljs$lang$applyTo = (function (arglist__8868){
var query = cljs.core.first(arglist__8868);
var args = cljs.core.rest(arglist__8868);
return qe__delegate(query,args);
});
qe.cljs$core$IFn$_invoke$arity$variadic = qe__delegate;
return qe;
})()
;
/**
* Expands entities for :find symbols that start with ?e
* @param {...*} var_args
*/
lt.plugins.kukui.datascript.qae = (function() { 
var qae__delegate = function (query,args){var fns = cljs.core.map.call(null,(function (p1__8862_SHARP_){if(cljs.core.truth_((''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__8862_SHARP_)).startsWith("?e")))
{return lt.plugins.kukui.datascript.entity;
} else
{return cljs.core.identity;
}
}),new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(datascript.parse_query.call(null,query)));return cljs.core.map.call(null,((function (fns){
return (function (result){return cljs.core.mapv.call(null,((function (fns){
return (function (p1__8863_SHARP_,p2__8864_SHARP_){return p1__8863_SHARP_.call(null,p2__8864_SHARP_);
});})(fns))
,fns,result);
});})(fns))
,cljs.core.apply.call(null,lt.plugins.kukui.datascript.q,query,args));
};
var qae = function (query,var_args){
var args = null;if (arguments.length > 1) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return qae__delegate.call(this,query,args);};
qae.cljs$lang$maxFixedArity = 1;
qae.cljs$lang$applyTo = (function (arglist__8869){
var query = cljs.core.first(arglist__8869);
var args = cljs.core.rest(arglist__8869);
return qae__delegate(query,args);
});
qae.cljs$core$IFn$_invoke$arity$variadic = qae__delegate;
return qae;
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
var counter_8870 = cljs.core.atom.call(null,0);lt.plugins.kukui.datascript.tempid = ((function (counter_8870){
return (function tempid(){return cljs.core.swap_BANG_.call(null,counter_8870,cljs.core.dec);
});})(counter_8870))
;
}
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.db')) {
goog.provide('lt.plugins.kukui.db');
goog.require('cljs.core');
goog.require('lt.plugins.kukui.datascript');
goog.require('lt.plugins.kukui.datascript');
/**
* Default type if none specified
*/
lt.plugins.kukui.db.unknown_type = "unknown";
lt.plugins.kukui.db.root_type = "type";
lt.plugins.kukui.db.lines_rule = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"lines","lines",-1537554248,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?first-line","?first-line",908436521,null),new cljs.core.Symbol(null,"?last-line","?last-line",830913829,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"file","file",1017047278),new cljs.core.Symbol(null,"?file","?file",-1579206668,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Symbol(null,"?line","?line",-1579027860,null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"<=","<=",-1640529606,null),new cljs.core.Symbol(null,"?first-line","?first-line",908436521,null),new cljs.core.Symbol(null,"?line","?line",-1579027860,null),new cljs.core.Symbol(null,"?last-line","?last-line",830913829,null))], null)], null)], null);
lt.plugins.kukui.db.tag_names_rule = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"tag-names","tag-names",-986478322,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?name","?name",-1578975997,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?name","?name",-1578975997,null)], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"tag-names","tag-names",-986478322,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?name","?name",-1578975997,null))], null)], null);
lt.plugins.kukui.db.tagged_with_rule = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"tagged-with","tagged-with",-1527128512,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?name","?name",-1578975997,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?name","?name",-1578975997,null)], null)], null)], null);
lt.plugins.kukui.db.tagged_ent_with_rule = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"tagged-ent-with","tagged-ent-with",-1271363230,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null),new cljs.core.Symbol(null,"?tag-name","?tag-name",-356231210,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?tag-name","?tag-name",-356231210,null)], null)], null)], null);
lt.plugins.kukui.db.rules = cljs.core.concat.call(null,lt.plugins.kukui.db.lines_rule,lt.plugins.kukui.db.tag_names_rule,lt.plugins.kukui.db.tagged_with_rule,lt.plugins.kukui.db.tagged_ent_with_rule);
/**
* Named datalog queries - accessible to db-query-temp-file cmd
*/
lt.plugins.kukui.db.named_queries = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Symbol(null,"tagged-tags","tagged-tags",-1527225965,null),new cljs.core.Symbol(null,"ent-by-type","ent-by-type",-689599033,null),new cljs.core.Symbol(null,"ent-by-tags","ent-by-tags",-689622362,null),new cljs.core.Symbol(null,"local-by-tags-of-type","local-by-tags-of-type",-740892471,null),new cljs.core.Symbol(null,"or-tags","or-tags",1396963196,null),new cljs.core.Symbol(null,"ent-tds","ent-tds",1060817370,null),new cljs.core.Symbol(null,"named-ents","named-ents",-1967655755,null),new cljs.core.Symbol(null,"search-all-attr","search-all-attr",801034971,null),new cljs.core.Symbol(null,"or-ents","or-ents",1396529227,null),new cljs.core.Symbol(null,"ent-by-tags-of-type","ent-by-tags-of-type",808421961,null),new cljs.core.Symbol(null,"types-names","types-names",2093530797,null),new cljs.core.Symbol(null,"search-attr","search-attr",2068469935,null)],[new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?tag1","?tag1",-1578797489,null),new cljs.core.Symbol(null,"?tag2","?tag2",-1578797488,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"tagged-ent-with","tagged-ent-with",-1271363230,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?t1","?t1",-1640467339,null),new cljs.core.Symbol(null,"?tag1","?tag1",-1578797489,null)),cljs.core.list(new cljs.core.Symbol(null,"tagged-with","tagged-with",-1527128512,null),new cljs.core.Symbol(null,"?t1","?t1",-1640467339,null),new cljs.core.Symbol(null,"?tag2","?tag2",-1578797488,null))], null),new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"tagged-with","tagged-with",-1527128512,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null)], null),new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"tagged-with","tagged-with",-1527128512,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null)),cljs.core.list(new cljs.core.Symbol(null,"tagged-with","tagged-with",-1527128512,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null))], null),new cljs.core.PersistentVector(null, 14, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?tag-name","?tag-name",-356231210,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?input-type","?input-type",-1838801259,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"tagged-ent-with","tagged-ent-with",-1271363230,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?t1","?t1",-1640467339,null),new cljs.core.Symbol(null,"?tag-name","?tag-name",-356231210,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t1","?t1",-1640467339,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?input-type","?input-type",-1838801259,null)], null),cljs.core.list(new cljs.core.Symbol(null,"lines","lines",-1537554248,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null))], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null),new cljs.core.Symbol(null,"...","...",-1640485849,null)], null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"tagged-with","tagged-with",-1527128512,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null))], null),new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?tag-name","?tag-name",-356231210,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"type","type",1017479852),"td"], null),cljs.core.list(new cljs.core.Symbol(null,"tagged-ent-with","tagged-ent-with",-1271363230,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?t1","?t1",-1640467339,null),new cljs.core.Symbol(null,"?tag-name","?tag-name",-356231210,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t1","?t1",-1640467339,null),new cljs.core.Keyword(null,"type","type",1017479852),"priority"], null),cljs.core.list(new cljs.core.Symbol(null,"tagged-with","tagged-with",-1527128512,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null))], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?n","?n",-1640529464,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?n","?n",-1640529464,null)], null)], null),new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?search-fn","?search-fn",642178919,null),new cljs.core.Symbol(null,"?query","?query",271049122,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"_","_",-1640531432,null),new cljs.core.Symbol(null,"?val","?val",-1638538181,null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"?search-fn","?search-fn",642178919,null),new cljs.core.Symbol(null,"?query","?query",271049122,null),new cljs.core.Symbol(null,"?val","?val",-1638538181,null))], null)], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?input-name","?input-name",-1839003162,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?input-name","?input-name",-1839003162,null),new cljs.core.Symbol(null,"...","...",-1640485849,null)], null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?input-name","?input-name",-1839003162,null)], null)], null),new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?tag-name","?tag-name",-356231210,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null),new cljs.core.Symbol(null,"?input-type","?input-type",-1838801259,null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"tagged-ent-with","tagged-ent-with",-1271363230,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?t1","?t1",-1640467339,null),new cljs.core.Symbol(null,"?tag-name","?tag-name",-356231210,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t1","?t1",-1640467339,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?input-type","?input-type",-1838801259,null)], null),cljs.core.list(new cljs.core.Symbol(null,"tagged-with","tagged-with",-1527128512,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null))], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Symbol(null,"?name","?name",-1578975997,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?children","?children",2113480951,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?children","?children",2113480951,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?name","?name",-1578975997,null)], null)], null),new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?search-fn","?search-fn",642178919,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.Symbol(null,"?query","?query",271049122,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.Symbol(null,"?val","?val",-1638538181,null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"?search-fn","?search-fn",642178919,null),new cljs.core.Symbol(null,"?query","?query",271049122,null),new cljs.core.Symbol(null,"?val","?val",-1638538181,null))], null)], null)]);
lt.plugins.kukui.db.name_id_map = (function name_id_map(){return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,lt.plugins.kukui.datascript.q.call(null,new cljs.core.Symbol(null,"named-ents","named-ents",-1967655755,null).call(null,lt.plugins.kukui.db.named_queries)));
});
lt.plugins.kukui.db.find_by_file_and_line = (function find_by_file_and_line(file,line){return cljs.core.first.call(null,lt.plugins.kukui.datascript.qe.call(null,new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?line","?line",-1579027860,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"file","file",1017047278),new cljs.core.Symbol(null,"?file","?file",-1579206668,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Symbol(null,"?line","?line",-1579027860,null)], null)], null),file,line));
});
lt.plugins.kukui.db.__GT_nodes_STAR_ = (function __GT_nodes_STAR_(results){return cljs.core.map.call(null,(function (p__8873){var vec__8874 = p__8873;var id = cljs.core.nth.call(null,vec__8874,0,null);var tag_tuples = cljs.core.nth.call(null,vec__8874,1,null);return cljs.core.assoc.call(null,lt.plugins.kukui.datascript.entity.call(null,id),new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.set.call(null,cljs.core.keep.call(null,cljs.core.second,tag_tuples)));
}),cljs.core.group_by.call(null,cljs.core.first,results));
});
/**
* Returns nodes and their :tags for a given file range
*/
lt.plugins.kukui.db.__GT_nodes = (function __GT_nodes(file,lines){return lt.plugins.kukui.db.__GT_nodes_STAR_.call(null,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?name","?name",-1578975997,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"tag-names","tag-names",-986478322,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?name","?name",-1578975997,null)),cljs.core.list(new cljs.core.Symbol(null,"lines","lines",-1537554248,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null))], null),lt.plugins.kukui.db.rules,file,cljs.core.first.call(null,lines),cljs.core.last.call(null,lines)));
});
/**
* Returns all nodes and their :tags
*/
lt.plugins.kukui.db.__GT_all_nodes = (function __GT_all_nodes(){return lt.plugins.kukui.db.__GT_nodes_STAR_.call(null,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?name","?name",-1578975997,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"tag-names","tag-names",-986478322,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?name","?name",-1578975997,null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"file","file",1017047278)], null)], null),lt.plugins.kukui.db.rules));
});
/**
* Returns pairs of attribute vals and their counts for a given file range
*/
lt.plugins.kukui.db.attr_counts = (function attr_counts(file,lines,attr){return cljs.core.sort_by.call(null,cljs.core.second,cljs.core._GT_,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 13, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?val","?val",-1638538181,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null)),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.Symbol(null,"?val","?val",-1638538181,null)], null),cljs.core.list(new cljs.core.Symbol(null,"lines","lines",-1537554248,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null))], null),lt.plugins.kukui.db.rules,file,cljs.core.first.call(null,lines),cljs.core.last.call(null,lines),attr));
});
lt.plugins.kukui.db.all_attr_counts = (function all_attr_counts(attr){return cljs.core.sort_by.call(null,cljs.core.second,cljs.core._GT_,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?val","?val",-1638538181,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null)),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.Symbol(null,"?val","?val",-1638538181,null)], null)], null),attr));
});
/**
* Returns tag types for a given file range
*/
lt.plugins.kukui.db.local_tag_types = (function local_tag_types(file,lines){return lt.plugins.kukui.datascript.qf.call(null,new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"lines","lines",-1537554248,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.Symbol(null,"?t","?t",-1640529458,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t","?t",-1640529458,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null)], null),lt.plugins.kukui.db.rules,file,cljs.core.first.call(null,lines),cljs.core.last.call(null,lines));
});
lt.plugins.kukui.db.__GT_tag_counts = (function __GT_tag_counts(results){return cljs.core.reduce.call(null,(function (p1__8875_SHARP_,p2__8876_SHARP_){return cljs.core.assoc_in.call(null,p1__8875_SHARP_,cljs.core.butlast.call(null,p2__8876_SHARP_),cljs.core.last.call(null,p2__8876_SHARP_));
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.mapcat.call(null,cljs.core.identity,cljs.core.vals.call(null,cljs.core.group_by.call(null,cljs.core.first,results))));
});
/**
* Returns a nested map of tag names and counts by tag type
*/
lt.plugins.kukui.db.tag_counts = (function tag_counts(file,lines){return lt.plugins.kukui.db.__GT_tag_counts.call(null,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 15, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null)),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.Symbol(null,"?t","?t",-1640529458,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t","?t",-1640529458,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t","?t",-1640529458,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null)], null),cljs.core.list(new cljs.core.Symbol(null,"lines","lines",-1537554248,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null))], null),lt.plugins.kukui.db.rules,file,cljs.core.first.call(null,lines),cljs.core.last.call(null,lines)));
});
lt.plugins.kukui.db.all_tag_counts = (function all_tag_counts(){return lt.plugins.kukui.db.__GT_tag_counts.call(null,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null)),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.Symbol(null,"?t","?t",-1640529458,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t","?t",-1640529458,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t","?t",-1640529458,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null)], null)], null)));
});
/**
* Returns a list of types with each type having entity names of that type
*/
lt.plugins.kukui.db.types_and_names = (function types_and_names(){return cljs.core.map.call(null,(function (p__8879){var vec__8880 = p__8879;var type = cljs.core.nth.call(null,vec__8880,0,null);var pairs = cljs.core.nth.call(null,vec__8880,1,null);return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1017479852),type,new cljs.core.Keyword(null,"names","names",1118489274),cljs.core.map.call(null,cljs.core.second,pairs)], null);
}),cljs.core.group_by.call(null,cljs.core.first,lt.plugins.kukui.datascript.q.call(null,new cljs.core.Symbol(null,"types-names","types-names",2093530797,null).call(null,lt.plugins.kukui.db.named_queries))));
});
lt.plugins.kukui.db.must_have_unique_name = (function must_have_unique_name(entities){var existing_tags = lt.plugins.kukui.db.name_id_map.call(null);var names = cljs.core.set.call(null,cljs.core.keys.call(null,existing_tags));var invalid = cljs.core.filter.call(null,((function (existing_tags,names){
return (function (p1__8881_SHARP_){var and__6414__auto__ = new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__8881_SHARP_);if(cljs.core.truth_(and__6414__auto__))
{return cljs.core.contains_QMARK_.call(null,names,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__8881_SHARP_));
} else
{return and__6414__auto__;
}
});})(existing_tags,names))
,entities);var invalid__$1 = cljs.core.into.call(null,invalid,cljs.core.mapcat.call(null,((function (existing_tags,names,invalid){
return (function (p1__8882_SHARP_){if((cljs.core.count.call(null,p1__8882_SHARP_) > 1))
{return p1__8882_SHARP_;
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
lt.plugins.kukui.db.must_have_string_name = (function must_have_string_name(entities){var temp__4126__auto___8888 = cljs.core.seq.call(null,cljs.core.remove.call(null,(function (p1__8884_SHARP_){return typeof new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__8884_SHARP_) === 'string';
}),cljs.core.filter.call(null,(function (p1__8883_SHARP_){return cljs.core.contains_QMARK_.call(null,p1__8883_SHARP_,new cljs.core.Keyword(null,"name","name",1017277949));
}),entities)));if(temp__4126__auto___8888)
{var invalid_8889 = temp__4126__auto___8888;cljs.core.prn.call(null,"INVALID",invalid_8889);
throw cljs.core.ex_info.call(null,("Names must be strings:"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.map.call(null,new cljs.core.Keyword(null,"name","name",1017277949),invalid_8889))),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"invalid","invalid",2973689193),invalid_8889], null));
} else
{}
return entities;
});
lt.plugins.kukui.db.must_require_type = (function must_require_type(entities){var invalid = cljs.core.remove.call(null,new cljs.core.Keyword(null,"type","type",1017479852),entities);if(cljs.core.seq.call(null,invalid))
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
return (function (p1__8953_SHARP_){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__8953_SHARP_),tag_name);
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
return (function (p1__8954_SHARP_){return cljs.core.assoc.call(null,p1__8954_SHARP_,new cljs.core.Keyword("db","id","db/id",1014111942),lt.plugins.kukui.datascript.tempid.call(null));
});})(new_tags))
,entities);var tag_id = cljs.core.partial.call(null,lt.plugins.kukui.sync.__GT_tag_id,entities__$1,lt.plugins.kukui.db.name_id_map.call(null),new_tags);var entities_with_tags = cljs.core.doall.call(null,cljs.core.mapcat.call(null,((function (new_tags,entities__$1,tag_id){
return (function (ent){return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.dissoc.call(null,ent,new cljs.core.Keyword(null,"tags","tags",1017456523))], null),cljs.core.map.call(null,((function (new_tags,entities__$1,tag_id){
return (function (p1__8955_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword("db","id","db/id",1014111942),new cljs.core.Keyword(null,"tags","tags",1017456523)],[new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(ent),tag_id.call(null,p1__8955_SHARP_)]);
});})(new_tags,entities__$1,tag_id))
,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(ent)));
});})(new_tags,entities__$1,tag_id))
,entities__$1));return cljs.core.into.call(null,cljs.core.map.call(null,((function (new_tags,entities__$1,tag_id,entities_with_tags){
return (function (p__8958){var vec__8959 = p__8958;var tag = cljs.core.nth.call(null,vec__8959,0,null);var id = cljs.core.nth.call(null,vec__8959,1,null);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("db","id","db/id",1014111942),id,new cljs.core.Keyword(null,"name","name",1017277949),tag,new cljs.core.Keyword(null,"type","type",1017479852),lt.plugins.kukui.db.unknown_type], null);
});})(new_tags,entities__$1,tag_id,entities_with_tags))
,cljs.core.deref.call(null,new_tags)),entities_with_tags);
});
lt.plugins.kukui.sync.add_types = (function add_types(entities){var existing_types = cljs.core.set.call(null,lt.plugins.kukui.datascript.qf.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null)], null)));return cljs.core.into.call(null,entities,cljs.core.map.call(null,((function (existing_types){
return (function (p1__8961_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"type","type",1017479852)],[p1__8961_SHARP_,lt.plugins.kukui.db.root_type]);
});})(existing_types))
,cljs.core.remove.call(null,((function (existing_types){
return (function (p1__8960_SHARP_){return cljs.core.contains_QMARK_.call(null,existing_types,p1__8960_SHARP_);
});})(existing_types))
,cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"type","type",1017479852),entities)))));
});
lt.plugins.kukui.sync.add_ids_by_line = (function add_ids_by_line(file,nodes){var line_entities = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?l","?l",-1640529466,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Symbol(null,"?l","?l",-1640529466,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"file","file",1017047278),new cljs.core.Symbol(null,"?file","?file",-1579206668,null)], null)], null),file));return cljs.core.map.call(null,((function (line_entities){
return (function (p1__8962_SHARP_){if(cljs.core.truth_(new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(p1__8962_SHARP_)))
{return p1__8962_SHARP_;
} else
{return cljs.core.assoc.call(null,p1__8962_SHARP_,new cljs.core.Keyword("db","id","db/id",1014111942),cljs.core.get.call(null,line_entities,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(p1__8962_SHARP_)));
}
});})(line_entities))
,nodes);
});
lt.plugins.kukui.sync.node_diff_STAR_ = (function node_diff_STAR_(nodes1,nodes2){var old_nodes = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,cljs.core.juxt.call(null,new cljs.core.Keyword(null,"text","text",1017460895),cljs.core.identity),nodes1));var name_entities = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (old_nodes){
return (function (p__8965){var vec__8966 = p__8965;var name = cljs.core.nth.call(null,vec__8966,0,null);var id = cljs.core.nth.call(null,vec__8966,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [name,lt.plugins.kukui.datascript.entity.call(null,id)], null);
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
lt.plugins.kukui.sync.node_diff = (function node_diff(file,nodes1,nodes2){return cljs.core.update_in.call(null,cljs.core.update_in.call(null,cljs.core.update_in.call(null,lt.plugins.kukui.sync.node_diff_STAR_.call(null,nodes1,nodes2),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"updated","updated",779473965)], null),cljs.core.partial.call(null,lt.plugins.kukui.sync.add_ids_by_line,file)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"updated","updated",779473965)], null),(function (nodes){return cljs.core.map.call(null,(function (p1__8967_SHARP_){if(cljs.core.truth_(new cljs.core.Keyword(null,"new-line","new-line",2344820595).cljs$core$IFn$_invoke$arity$1(p1__8967_SHARP_)))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("db","id","db/id",1014111942),new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(p1__8967_SHARP_),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"new-line","new-line",2344820595).cljs$core$IFn$_invoke$arity$1(p1__8967_SHARP_)], null);
} else
{return p1__8967_SHARP_;
}
}),nodes);
})),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"deleted","deleted",2564367243)], null),cljs.core.partial.call(null,lt.plugins.kukui.sync.add_ids_by_line,file));
});
lt.plugins.kukui.sync.ensure_type = (function ensure_type(entities){var vec__8970 = cljs.core.juxt.call(null,cljs.core.filter,cljs.core.remove).call(null,new cljs.core.Keyword(null,"type","type",1017479852),entities);var typed = cljs.core.nth.call(null,vec__8970,0,null);var untyped = cljs.core.nth.call(null,vec__8970,1,null);return cljs.core.concat.call(null,typed,((cljs.core.seq.call(null,untyped))?(function (){cljs.core.prn.call(null,"Untyped",untyped);
return cljs.core.map.call(null,((function (vec__8970,typed,untyped){
return (function (p1__8968_SHARP_){return cljs.core.assoc.call(null,p1__8968_SHARP_,new cljs.core.Keyword(null,"type","type",1017479852),lt.plugins.kukui.db.unknown_type);
});})(vec__8970,typed,untyped))
,untyped);
})():null));
});
lt.plugins.kukui.sync.__GT_new_entities = (function __GT_new_entities(nodes){var vec__8973 = cljs.core.juxt.call(null,cljs.core.filter,cljs.core.remove).call(null,(function (p1__8971_SHARP_){return (cljs.core.integer_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__8971_SHARP_))) || (cljs.core.seq.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__8971_SHARP_)));
}),lt.plugins.kukui.sync.expand_tags.call(null,lt.plugins.kukui.sync.add_types.call(null,nodes)));var relationships = cljs.core.nth.call(null,vec__8973,0,null);var ents = cljs.core.nth.call(null,vec__8973,1,null);return cljs.core.into.call(null,lt.plugins.kukui.db.must_require_type.call(null,lt.plugins.kukui.sync.ensure_type.call(null,lt.plugins.kukui.db.must_have_string_name.call(null,lt.plugins.kukui.db.must_have_unique_name.call(null,ents)))),relationships);
});
lt.plugins.kukui.sync.must_have_ids = (function must_have_ids(entities){var temp__4126__auto___8981 = cljs.core.seq.call(null,cljs.core.remove.call(null,new cljs.core.Keyword("db","id","db/id",1014111942),entities));if(temp__4126__auto___8981)
{var invalid_entities_8982 = temp__4126__auto___8981;cljs.core.prn.call(null,"Invalid entities",invalid_entities_8982);
throw cljs.core.ex_info.call(null,("Cannot update these entities without their ids: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,invalid_entities_8982))),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"invalid","invalid",2973689193),invalid_entities_8982], null));
} else
{}
return entities;
});
/**
* Maps files to their last few node snapshots.
* Used to determine what changed since last edit.
*/
lt.plugins.kukui.sync.last_edits = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lt.plugins.kukui.sync.sync_entities = (function sync_entities(nodes,file){var last_nodes = cljs.core.last.call(null,cljs.core.get.call(null,cljs.core.deref.call(null,lt.plugins.kukui.sync.last_edits),file));var map__8976 = lt.plugins.kukui.sync.node_diff.call(null,file,last_nodes,nodes);var map__8976__$1 = ((cljs.core.seq_QMARK_.call(null,map__8976))?cljs.core.apply.call(null,cljs.core.hash_map,map__8976):map__8976);var updated = cljs.core.get.call(null,map__8976__$1,new cljs.core.Keyword(null,"updated","updated",779473965));var deleted = cljs.core.get.call(null,map__8976__$1,new cljs.core.Keyword(null,"deleted","deleted",2564367243));var added = cljs.core.get.call(null,map__8976__$1,new cljs.core.Keyword(null,"added","added",1106564210));return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"added","added",1106564210),lt.plugins.kukui.sync.__GT_new_entities.call(null,added),new cljs.core.Keyword(null,"updated","updated",779473965),lt.plugins.kukui.sync.must_have_ids.call(null,updated),new cljs.core.Keyword(null,"deleted","deleted",2564367243),cljs.core.mapv.call(null,((function (last_nodes,map__8976,map__8976__$1,updated,deleted,added){
return (function (p1__8974_SHARP_){return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword("db.fn","retractEntity","db.fn/retractEntity",4213852396),new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(p1__8974_SHARP_)],null));
});})(last_nodes,map__8976,map__8976__$1,updated,deleted,added))
,lt.plugins.kukui.sync.must_have_ids.call(null,deleted))], null);
});
lt.plugins.kukui.sync.save_latest_edit = (function save_latest_edit(nodes,file){return cljs.core.swap_BANG_.call(null,lt.plugins.kukui.sync.last_edits,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file], null),(function (p1__8977_SHARP_){return cljs.core.concat.call(null,cljs.core.take_last.call(null,2,p1__8977_SHARP_),cljs.core._conj.call(null,cljs.core.List.EMPTY,nodes));
}));
});
lt.plugins.kukui.sync.sync = (function sync(nodes,file){var nodes__$1 = cljs.core.filter.call(null,(function (p1__8978_SHARP_){return cljs.core.not.call(null,cljs.core.re_find.call(null,/^\s*$/,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(p1__8978_SHARP_)));
}),nodes);var map__8980 = lt.plugins.kukui.sync.sync_entities.call(null,nodes__$1,file);var map__8980__$1 = ((cljs.core.seq_QMARK_.call(null,map__8980))?cljs.core.apply.call(null,cljs.core.hash_map,map__8980):map__8980);var updated = cljs.core.get.call(null,map__8980__$1,new cljs.core.Keyword(null,"updated","updated",779473965));var deleted = cljs.core.get.call(null,map__8980__$1,new cljs.core.Keyword(null,"deleted","deleted",2564367243));var added = cljs.core.get.call(null,map__8980__$1,new cljs.core.Keyword(null,"added","added",1106564210));cljs.core.println.call(null,"Added/deleted/updated: ",cljs.core.count.call(null,added),"/",cljs.core.count.call(null,deleted),"/",cljs.core.count.call(null,updated));
if(cljs.core.seq.call(null,nodes__$1))
{lt.plugins.kukui.datascript.transact_BANG_.call(null,deleted);
var tx_report = lt.plugins.kukui.datascript.transact_BANG_.call(null,cljs.core.into.call(null,updated,added));lt.plugins.kukui.sync.save_latest_edit.call(null,nodes__$1,file);
return tx_report;
} else
{return null;
}
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
return (function (p1__8890_SHARP_,p2__8891_SHARP_){return f.call(null,p1__8890_SHARP_,p2__8891_SHARP_,node);
});})(type_tags,type_tags__$1))
,accum,type_tags__$1);
}),cljs.core.PersistentArrayMap.EMPTY,nodes);
});
lt.plugins.kukui.live.type_counts = cljs.core.partial.call(null,lt.plugins.kukui.live.type_nodes__GT_tag_map,(function (p1__8892_SHARP_,p2__8893_SHARP_){return cljs.core.update_in.call(null,p1__8892_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p2__8893_SHARP_], null),cljs.core.inc);
}));
lt.plugins.kukui.live.types_counts = (function types_counts(ed,lines){var nodes = lt.plugins.kukui.node.ed__GT_nodes.call(null,ed,lines);var types = lt.plugins.kukui.db.types_and_names.call(null);return cljs.core.keep.call(null,((function (nodes,types){
return (function (p1__8894_SHARP_){var counts = lt.plugins.kukui.live.type_counts.call(null,cljs.core.some.call(null,((function (nodes,types){
return (function (x){if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(x),p1__8894_SHARP_))
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
{return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[p1__8894_SHARP_,counts],null));
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
return (function (p1__8895_SHARP_){if(cljs.core.contains_QMARK_.call(null,cljs.core.set.call(null,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(p1__8895_SHARP_)),tag))
{return new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(p1__8895_SHARP_);
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
lt.plugins.kukui.live.attribute_counts = (function attribute_counts(nodes){var seq__8900 = cljs.core.seq.call(null,cljs.core.disj.call(null,cljs.core.set.call(null,cljs.core.mapcat.call(null,cljs.core.keys,nodes)),new cljs.core.Keyword(null,"desc","desc",1016984067),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.Keyword(null,"indent","indent",4124632094),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"text","text",1017460895)));var chunk__8901 = null;var count__8902 = 0;var i__8903 = 0;while(true){
if((i__8903 < count__8902))
{var attr = cljs.core._nth.call(null,chunk__8901,i__8903);lt.plugins.kukui.live.attribute_counts_STAR_.call(null,nodes,attr);
{
var G__8914 = seq__8900;
var G__8915 = chunk__8901;
var G__8916 = count__8902;
var G__8917 = (i__8903 + 1);
seq__8900 = G__8914;
chunk__8901 = G__8915;
count__8902 = G__8916;
i__8903 = G__8917;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__8900);if(temp__4126__auto__)
{var seq__8900__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8900__$1))
{var c__7182__auto__ = cljs.core.chunk_first.call(null,seq__8900__$1);{
var G__8918 = cljs.core.chunk_rest.call(null,seq__8900__$1);
var G__8919 = c__7182__auto__;
var G__8920 = cljs.core.count.call(null,c__7182__auto__);
var G__8921 = 0;
seq__8900 = G__8918;
chunk__8901 = G__8919;
count__8902 = G__8920;
i__8903 = G__8921;
continue;
}
} else
{var attr = cljs.core.first.call(null,seq__8900__$1);lt.plugins.kukui.live.attribute_counts_STAR_.call(null,nodes,attr);
{
var G__8922 = cljs.core.next.call(null,seq__8900__$1);
var G__8923 = null;
var G__8924 = 0;
var G__8925 = 0;
seq__8900 = G__8922;
chunk__8901 = G__8923;
count__8902 = G__8924;
i__8903 = G__8925;
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
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.live-types-counts","kukui.live-types-counts",1795885234),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: tag counts of each type for current branch or selection",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var nodes = lt.plugins.kukui.node.ed__GT_nodes.call(null,ed,null);lt.plugins.kukui.util.pprint.call(null,lt.plugins.kukui.live.types_counts.call(null,ed,null));
cljs.core.prn.call(null,cljs.core.assoc.call(null,lt.plugins.kukui.live.total_types_counts.call(null,ed,null),"untagged",cljs.core.count.call(null,cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.empty_QMARK_,new cljs.core.Keyword(null,"tags","tags",1017456523)),nodes)),"nodes",cljs.core.count.call(null,nodes)));
return lt.plugins.kukui.live.attribute_counts.call(null,nodes);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.live-all-types-counts","kukui.live-all-types-counts",1674562910),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Same as types-counts but for whole file",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var lines = cljs.core.range.call(null,lt.objs.editor.first_line.call(null,ed),(lt.objs.editor.last_line.call(null,ed) + 1));var nodes = lt.plugins.kukui.node.ed__GT_nodes.call(null,ed,lines);lt.plugins.kukui.util.pprint.call(null,lt.plugins.kukui.live.types_counts.call(null,ed,lines));
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
lt.plugins.kukui.selector.selector = (function selector(opts){var G__8952 = lt.objs.sidebar.command.filter_list.call(null,opts);lt.object.add_behavior_BANG_.call(null,G__8952,new cljs.core.Keyword("lt.plugins.kukui.selector","set-selected","lt.plugins.kukui.selector/set-selected",3025761911));
return G__8952;
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.query')) {
goog.provide('lt.plugins.kukui.query');
goog.require('cljs.core');
goog.require('lt.plugins.kukui.core');
goog.require('lt.objs.command');
goog.require('lt.objs.editor');
goog.require('lt.plugins.kukui.selector');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('datascript');
goog.require('lt.plugins.kukui.selector');
goog.require('lt.objs.files');
goog.require('lt.plugins.kukui.db');
goog.require('clojure.set');
goog.require('lt.plugins.kukui.util');
goog.require('lt.objs.command');
goog.require('datascript');
goog.require('clojure.string');
goog.require('lt.plugins.kukui.db');
goog.require('clojure.set');
goog.require('lt.plugins.kukui.util');
goog.require('lt.plugins.kukui.core');
goog.require('clojure.string');
goog.require('cljs.reader');
goog.require('lt.plugins.kukui.datascript');
goog.require('cljs.reader');
goog.require('lt.objs.editor');
goog.require('lt.objs.files');
goog.require('lt.plugins.kukui.datascript');
lt.plugins.kukui.query.leftover_tag = "leftover";
lt.plugins.kukui.query.ent_text = (function ent_text(ent){var or__6426__auto__ = new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(ent);if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return cljs.core.pr_str.call(null,cljs.core.dissoc.call(null,ent,new cljs.core.Keyword("db","id","db/id",1014111942)));
}
});
/**
* Entity Attributes to hide in query results
*/
lt.plugins.kukui.query.hidden_attributes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"indent","indent",4124632094),null,new cljs.core.Keyword(null,"semtag","semtag",4402894033),null,new cljs.core.Keyword(null,"desc","desc",1016984067),null,new cljs.core.Keyword(null,"file","file",1017047278),null,new cljs.core.Keyword(null,"line","line",1017226086),null,new cljs.core.Keyword("db","id","db/id",1014111942),null,new cljs.core.Keyword(null,"text","text",1017460895),null], null), null);
lt.plugins.kukui.query.attr_node = (function attr_node(attr,ent,level,id__GT_name){return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"level","level",1116770038),(level + 1),new cljs.core.Keyword(null,"text","text",1017460895),("+ "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(attr)+": "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(((cljs.core._EQ_.call(null,attr,new cljs.core.Keyword(null,"tags","tags",1017456523)))?clojure.string.join.call(null,", ",cljs.core.map.call(null,id__GT_name,attr.call(null,ent))):attr.call(null,ent))))], null);
});
lt.plugins.kukui.query.ent__GT_nodes = (function ent__GT_nodes(ent,level,id__GT_name){var ent__$1 = ((typeof ent === 'string')?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"text","text",1017460895),ent], null):ent);return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"level","level",1116770038),level,new cljs.core.Keyword(null,"text","text",1017460895),lt.plugins.kukui.query.ent_text.call(null,ent__$1)], null)], null),cljs.core.into.call(null,cljs.core.mapv.call(null,((function (ent__$1){
return (function (p1__9293_SHARP_){return lt.plugins.kukui.query.attr_node.call(null,p1__9293_SHARP_,ent__$1,level,id__GT_name);
});})(ent__$1))
,cljs.core.sort.call(null,clojure.set.difference.call(null,cljs.core.set.call(null,cljs.core.keys.call(null,ent__$1)),lt.plugins.kukui.query.hidden_attributes))),cljs.core.map.call(null,((function (ent__$1){
return (function (p1__9294_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"level","level",1116770038),new cljs.core.Keyword(null,"text","text",1017460895)],[(level + 1),lt.plugins.kukui.query.ent_text.call(null,p1__9294_SHARP_)]);
});})(ent__$1))
,new cljs.core.Keyword(null,"desc","desc",1016984067).cljs$core$IFn$_invoke$arity$1(ent__$1))));
});
lt.plugins.kukui.query.find_one_query__GT_nodes = (function find_one_query__GT_nodes(query,args){var ents = cljs.core.apply.call(null,lt.plugins.kukui.datascript.qe,query,lt.plugins.kukui.db.rules,args);var id__GT_name = clojure.set.map_invert.call(null,lt.plugins.kukui.db.name_id_map.call(null));return cljs.core.vec.call(null,cljs.core.mapcat.call(null,((function (ents,id__GT_name){
return (function (p1__9295_SHARP_){return lt.plugins.kukui.query.ent__GT_nodes.call(null,p1__9295_SHARP_,1,id__GT_name);
});})(ents,id__GT_name))
,ents));
});
lt.plugins.kukui.query.find_two_query__GT_nodes = (function find_two_query__GT_nodes(query,args){var results = cljs.core.map.call(null,(function (p__9301){var vec__9302 = p__9301;var k = cljs.core.nth.call(null,vec__9302,0,null);var pairs = cljs.core.nth.call(null,vec__9302,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.map.call(null,cljs.core.second,pairs)], null);
}),cljs.core.group_by.call(null,cljs.core.first,cljs.core.apply.call(null,lt.plugins.kukui.datascript.qae,query,lt.plugins.kukui.db.rules,args)));var id__GT_name = clojure.set.map_invert.call(null,lt.plugins.kukui.db.name_id_map.call(null));return cljs.core.vec.call(null,cljs.core.mapcat.call(null,((function (results,id__GT_name){
return (function (p__9303){var vec__9304 = p__9303;var group_key = cljs.core.nth.call(null,vec__9304,0,null);var ents = cljs.core.nth.call(null,vec__9304,1,null);return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",1017460895),group_key,new cljs.core.Keyword(null,"level","level",1116770038),1], null)], null),cljs.core.mapcat.call(null,((function (vec__9304,group_key,ents,results,id__GT_name){
return (function (p1__9296_SHARP_){return lt.plugins.kukui.query.ent__GT_nodes.call(null,p1__9296_SHARP_,2,id__GT_name);
});})(vec__9304,group_key,ents,results,id__GT_name))
,ents));
});})(results,id__GT_name))
,results));
});
/**
* @param {...*} var_args
*/
lt.plugins.kukui.query.query__GT_nodes = (function() { 
var query__GT_nodes__delegate = function (query,args){cljs.core.println.call(null,"Query:",query,"\nArgs:",args);
var finds = cljs.core.count.call(null,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(datascript.parse_query.call(null,query)));var G__9306 = finds;var caseval__9314;
switch (G__9306){
case 1:
caseval__9314=lt.plugins.kukui.query.find_one_query__GT_nodes.call(null,query,args)
break;
case 2:
caseval__9314=lt.plugins.kukui.query.find_two_query__GT_nodes.call(null,query,args)
break;
default:
caseval__9314=(function(){throw cljs.core.ex_info.call(null,("No render found for "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(finds)+" finds"),cljs.core.PersistentArrayMap.EMPTY)})()
}
return caseval__9314;
};
var query__GT_nodes = function (query,var_args){
var args = null;if (arguments.length > 1) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return query__GT_nodes__delegate.call(this,query,args);};
query__GT_nodes.cljs$lang$maxFixedArity = 1;
query__GT_nodes.cljs$lang$applyTo = (function (arglist__9315){
var query = cljs.core.first(arglist__9315);
var args = cljs.core.rest(arglist__9315);
return query__GT_nodes__delegate(query,args);
});
query__GT_nodes.cljs$core$IFn$_invoke$arity$variadic = query__GT_nodes__delegate;
return query__GT_nodes;
})()
;
cljs.reader.register_tag_parser_BANG_.call(null,new cljs.core.Symbol(null,"fn","fn",-1640528255,null),(function (p1__9307_SHARP_){return (cljs.core[clojure.string.replace.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__9307_SHARP_)),"-","_")]);
}));
/**
* If db/named-queries has a matching entry, return it along with args.
* 
* For example:
* (tag1-type2 'kukui') => [:tag1-type2-query 'kukui']
*/
lt.plugins.kukui.query.fn_string__GT_query_args = (function fn_string__GT_query_args(query_string){var vec__9309 = cljs.reader.read_string.call(null,query_string);var named_query = cljs.core.nth.call(null,vec__9309,0,null);var args = cljs.core.nthnext.call(null,vec__9309,1);var temp__4126__auto__ = named_query.call(null,lt.plugins.kukui.db.named_queries);if(cljs.core.truth_(temp__4126__auto__))
{var query = temp__4126__auto__;return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [query], null),args);
} else
{return null;
}
});
lt.plugins.kukui.query.input__GT_query_and_args = (function input__GT_query_and_args(input){var named_query_args = lt.plugins.kukui.query.fn_string__GT_query_args.call(null,input);if(cljs.core.truth_(named_query_args))
{return named_query_args;
} else
{if(cljs.core.truth_(cljs.core.re_find.call(null,/^\s*\[:find/,input)))
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.reader.read_string.call(null,input)], null);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.reader.read_string.call(null,("[:find ?e :in $ % :where "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(input)+"]"))], null);
} else
{return null;
}
}
}
});
lt.plugins.kukui.query.input__GT_path = (function input__GT_path(ed,input){var query_and_args = lt.plugins.kukui.query.input__GT_query_and_args.call(null,input);var nodes = cljs.core.apply.call(null,lt.plugins.kukui.query.query__GT_nodes,query_and_args);var result = lt.plugins.kukui.core.tree__GT_string.call(null,nodes,lt.objs.editor.option.call(null,ed,"tabSize"));var path = lt.plugins.kukui.util.tempfile.call(null,"kukui-query",".otl");lt.objs.files.save.call(null,path,result);
return path;
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.query-and-open-file","kukui.query-and-open-file",606737661),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Opens query results in a temp file as an outline",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = clojure.string.triml.call(null,lt.objs.editor.line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line));var path = lt.plugins.kukui.query.input__GT_path.call(null,ed,line);return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"open-path","open-path",2513940794),path);
})], null));
lt.plugins.kukui.query.type_selector = lt.plugins.kukui.selector.selector.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"items","items",1114430258),(function (){var ed = lt.objs.editor.pool.last_active.call(null);return cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"name","name",1017277949),cljs.core.map.call(null,((function (ed){
return (function (p1__9310_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"name","name",1017277949)],[p1__9310_SHARP_]);
});})(ed))
,lt.plugins.kukui.db.local_tag_types.call(null,lt.plugins.kukui.util.current_file.call(null,ed),lt.plugins.kukui.util.current_lines.call(null,ed))));
}),new cljs.core.Keyword(null,"key","key",1014010321),new cljs.core.Keyword(null,"name","name",1017277949)], null));
lt.plugins.kukui.query.add_leftover_nodes = (function add_leftover_nodes(existing_nodes,original_nodes){var existing_text = cljs.core.set.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"text","text",1017460895),existing_nodes));var leftover_nodes = cljs.core.remove.call(null,((function (existing_text){
return (function (p1__9311_SHARP_){return cljs.core.contains_QMARK_.call(null,existing_text,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(p1__9311_SHARP_));
});})(existing_text))
,original_nodes);return cljs.core.into.call(null,existing_nodes,((cljs.core.seq.call(null,leftover_nodes))?(function (){var id__GT_name = clojure.set.map_invert.call(null,lt.plugins.kukui.db.name_id_map.call(null));return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"level","level",1116770038),1,new cljs.core.Keyword(null,"text","text",1017460895),lt.plugins.kukui.query.leftover_tag], null)], null),cljs.core.mapcat.call(null,((function (id__GT_name,existing_text,leftover_nodes){
return (function (p1__9312_SHARP_){return lt.plugins.kukui.query.ent__GT_nodes.call(null,p1__9312_SHARP_,2,id__GT_name);
});})(id__GT_name,existing_text,leftover_nodes))
,leftover_nodes));
})():null));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.query-with-local-type","kukui.query-with-local-type",4381653399),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Opens query over current branch for chosen tag type",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.kukui.query.type_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (ent){var ed = lt.objs.editor.pool.last_active.call(null);var lines = lt.plugins.kukui.util.current_lines.call(null,ed);var query = new cljs.core.Symbol(null,"local-by-tags-of-type","local-by-tags-of-type",-740892471,null).call(null,lt.plugins.kukui.db.named_queries);var args = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(ent),lt.plugins.kukui.util.current_file.call(null,ed),cljs.core.first.call(null,lines),cljs.core.last.call(null,lines)], null);var _ = cljs.core.println.call(null,"Query:",query,"\nArgs:",args);var nodes = lt.plugins.kukui.query.find_two_query__GT_nodes.call(null,query,args);var nodes__$1 = lt.plugins.kukui.query.add_leftover_nodes.call(null,nodes,lt.plugins.kukui.db.__GT_nodes.call(null,lt.plugins.kukui.util.current_file.call(null,ed),lines));var result = lt.plugins.kukui.core.tree__GT_string.call(null,nodes__$1,lt.objs.editor.option.call(null,ed,"tabSize"));var path = lt.plugins.kukui.util.tempfile.call(null,"kukui-query",".otl");lt.objs.files.save.call(null,path,result);
lt.plugins.kukui.util.ensure_and_focus_second_tabset.call(null);
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"open-path","open-path",2513940794),path);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.query-and-print","kukui.query-and-print",1374129803),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Prints query result to stdout/console",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line);var vec__9313 = lt.plugins.kukui.query.input__GT_query_and_args.call(null,line);var query = cljs.core.nth.call(null,vec__9313,0,null);var args = cljs.core.nthnext.call(null,vec__9313,1);var result = cljs.core.apply.call(null,lt.plugins.kukui.datascript.qae,query,lt.plugins.kukui.db.rules,args);return lt.plugins.kukui.util.pprint.call(null,result);
})], null));
/**
* Returns current word given string and cursor position in string
*/
lt.plugins.kukui.query.current_word_STAR_ = (function current_word_STAR_(string,cursor){return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.re_find.call(null,/[^\s:()\"]+$/,cljs.core.subs.call(null,string,0,cursor)))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.re_find.call(null,/^[^\s:()\"]+/,cljs.core.subs.call(null,string,cursor))));
});
/**
* Current word under cursor
*/
lt.plugins.kukui.query.current_word = (function current_word(ed){var cursor = lt.objs.editor.__GT_cursor.call(null,ed);return lt.plugins.kukui.query.current_word_STAR_.call(null,lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cursor)),new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(cursor));
});
lt.plugins.kukui.query.current_word_query = (function current_word_query(query){var ed = lt.objs.editor.pool.last_active.call(null);var input = lt.plugins.kukui.util.format.call(null,query,lt.plugins.kukui.query.current_word.call(null,ed));var path = lt.plugins.kukui.query.input__GT_path.call(null,ed,input);lt.plugins.kukui.util.ensure_and_focus_second_tabset.call(null);
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"open-path","open-path",2513940794),path);
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.open-entity-tagged","kukui.open-entity-tagged",2987956158),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Opens current word as tagged entity query",new cljs.core.Keyword(null,"exec","exec",1017031683),cljs.core.partial.call(null,lt.plugins.kukui.query.current_word_query,"(ent-by-type \"%s\")")], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.open-entity","kukui.open-entity",2583131743),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Opens current word as entity query",new cljs.core.Keyword(null,"exec","exec",1017031683),cljs.core.partial.call(null,lt.plugins.kukui.query.current_word_query,"[?e :name \"%s\"]")], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.open-entity-type","kukui.open-entity-type",2164583820),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Opens current word as entity type query",new cljs.core.Keyword(null,"exec","exec",1017031683),cljs.core.partial.call(null,lt.plugins.kukui.query.current_word_query,"[?e :type \"%s\"]")], null));
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
goog.require('lt.objs.files');
goog.require('lt.plugins.kukui.db');
goog.require('clojure.set');
goog.require('lt.plugins.sacha');
goog.require('lt.plugins.kukui.util');
goog.require('lt.objs.command');
goog.require('lt.plugins.kukui.sync');
goog.require('lt.plugins.kukui.sync');
goog.require('clojure.string');
goog.require('lt.plugins.kukui.node');
goog.require('lt.plugins.sacha.codemirror');
goog.require('lt.plugins.kukui.db');
goog.require('clojure.set');
goog.require('lt.plugins.kukui.util');
goog.require('clojure.string');
goog.require('lt.objs.notifos');
goog.require('cljs.reader');
goog.require('lt.plugins.kukui.datascript');
goog.require('cljs.reader');
goog.require('lt.objs.editor');
goog.require('lt.objs.files');
goog.require('lt.plugins.kukui.node');
goog.require('lt.plugins.kukui.datascript');
lt.plugins.kukui.db__GT_nodes = (function() {
var db__GT_nodes = null;
var db__GT_nodes__1 = (function (ed){return db__GT_nodes.call(null,ed,lt.plugins.kukui.util.current_lines.call(null,ed));
});
var db__GT_nodes__2 = (function (ed,lines){return cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"line","line",1017226086),lt.plugins.kukui.db.__GT_nodes.call(null,lt.plugins.kukui.util.current_file.call(null,ed),lines));
});
db__GT_nodes = function(ed,lines){
switch(arguments.length){
case 1:
return db__GT_nodes__1.call(this,ed);
case 2:
return db__GT_nodes__2.call(this,ed,lines);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
db__GT_nodes.cljs$core$IFn$_invoke$arity$1 = db__GT_nodes__1;
db__GT_nodes.cljs$core$IFn$_invoke$arity$2 = db__GT_nodes__2;
return db__GT_nodes;
})()
;
lt.plugins.kukui.types_counts = (function types_counts(file,lines){var nodes = lt.plugins.kukui.db.__GT_nodes.call(null,file,lines);cljs.core.println.call(null,"Tag counts");
lt.plugins.kukui.util.pprint.call(null,cljs.core.sort_by.call(null,cljs.core.first,cljs.core.map.call(null,((function (nodes){
return (function (p__9472){var vec__9473 = p__9472;var k = cljs.core.nth.call(null,vec__9473,0,null);var v = cljs.core.nth.call(null,vec__9473,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,lt.plugins.kukui.util.__GT_val_sorted_map.call(null,v)], null);
});})(nodes))
,lt.plugins.kukui.db.tag_counts.call(null,file,lines))));
cljs.core.println.call(null,"Tag counts by type");
cljs.core.prn.call(null,cljs.core.sort_by.call(null,cljs.core.second,cljs.core._GT_,cljs.core.map.call(null,((function (nodes){
return (function (p__9474){var vec__9475 = p__9474;var type = cljs.core.nth.call(null,vec__9475,0,null);var tag_map = cljs.core.nth.call(null,vec__9475,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.apply.call(null,cljs.core._PLUS_,cljs.core.vals.call(null,tag_map))], null);
});})(nodes))
,lt.plugins.kukui.db.tag_counts.call(null,file,lines))));
cljs.core.prn.call(null,"Misc counts",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"untagged","untagged",1019174071),cljs.core.count.call(null,cljs.core.filter.call(null,((function (nodes){
return (function (p1__9467_SHARP_){return (cljs.core.empty_QMARK_.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__9467_SHARP_))) && (cljs.core.empty_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__9467_SHARP_)));
});})(nodes))
,nodes)),new cljs.core.Keyword(null,"nodes","nodes",1118897699),cljs.core.count.call(null,nodes)], null));
cljs.core.println.call(null,"Node counts by type");
return lt.plugins.kukui.util.pprint.call(null,lt.plugins.kukui.db.attr_counts.call(null,file,lines,new cljs.core.Keyword(null,"type","type",1017479852)));
});
lt.plugins.kukui.all_types_counts = (function all_types_counts(){cljs.core.println.call(null,"Tag counts");
lt.plugins.kukui.util.pprint.call(null,cljs.core.sort_by.call(null,cljs.core.first,cljs.core.map.call(null,(function (p__9481){var vec__9482 = p__9481;var k = cljs.core.nth.call(null,vec__9482,0,null);var v = cljs.core.nth.call(null,vec__9482,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,lt.plugins.kukui.util.__GT_val_sorted_map.call(null,v)], null);
}),lt.plugins.kukui.db.all_tag_counts.call(null))));
cljs.core.println.call(null,"Tag counts by type");
cljs.core.prn.call(null,cljs.core.sort_by.call(null,cljs.core.second,cljs.core._GT_,cljs.core.map.call(null,(function (p__9483){var vec__9484 = p__9483;var type = cljs.core.nth.call(null,vec__9484,0,null);var tag_map = cljs.core.nth.call(null,vec__9484,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.apply.call(null,cljs.core._PLUS_,cljs.core.vals.call(null,tag_map))], null);
}),lt.plugins.kukui.db.all_tag_counts.call(null))));
var nodes_9497 = lt.plugins.kukui.db.__GT_all_nodes.call(null);cljs.core.prn.call(null,"Misc counts",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"untagged","untagged",1019174071),cljs.core.count.call(null,cljs.core.filter.call(null,((function (nodes_9497){
return (function (p1__9476_SHARP_){return (cljs.core.empty_QMARK_.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__9476_SHARP_))) && (cljs.core.empty_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__9476_SHARP_)));
});})(nodes_9497))
,nodes_9497)),new cljs.core.Keyword(null,"nodes","nodes",1118897699),cljs.core.count.call(null,nodes_9497)], null));
cljs.core.println.call(null,"Node counts by type");
return lt.plugins.kukui.util.pprint.call(null,lt.plugins.kukui.db.all_attr_counts.call(null,new cljs.core.Keyword(null,"type","type",1017479852)));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.types-counts","kukui.types-counts",4251463491),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: db tag counts of each type for current branch or selection",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);return lt.plugins.kukui.types_counts.call(null,lt.plugins.kukui.util.current_file.call(null,ed),lt.plugins.kukui.util.current_lines.call(null,ed));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.file-types-counts","kukui.file-types-counts",4370312738),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Same as types-counts but for whole file",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var lines = cljs.core.range.call(null,lt.objs.editor.first_line.call(null,ed),(lt.objs.editor.last_line.call(null,ed) + 1));return lt.plugins.kukui.types_counts.call(null,lt.plugins.kukui.util.current_file.call(null,ed),lines);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.all-types-counts","kukui.all-types-counts",2670019439),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Same as types-counts but for all files",new cljs.core.Keyword(null,"exec","exec",1017031683),lt.plugins.kukui.all_types_counts], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.live-debug-nodes","kukui.live-debug-nodes",4779623681),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: prints nodes for current branch or selection",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.kukui.util.pprint.call(null,lt.plugins.kukui.node.ed__GT_nodes.call(null,lt.objs.editor.pool.last_active.call(null)));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.debug-nodes","kukui.debug-nodes",1810794576),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: prints db nodes for current branch or selection",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.kukui.util.pprint.call(null,lt.plugins.kukui.db__GT_nodes.call(null,lt.objs.editor.pool.last_active.call(null)));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.raise-node","kukui.raise-node",3970575278),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Raises node to replace parent and sets it to parent's level",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var parent_line = lt.plugins.kukui.util.find_parent_line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line);return lt.objs.editor.operation.call(null,ed,((function (ed,parent_line){
return (function (){lt.plugins.sacha.codemirror.delete_lines.call(null,ed,parent_line,parent_line);
return lt.plugins.sacha.indent_branch.call(null,"subtract");
});})(ed,parent_line))
);
})], null));
lt.plugins.kukui.replace_children = (function replace_children(ed,view_fn){var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line);var new_body = view_fn.call(null,ed);return lt.objs.editor.replace.call(null,lt.objs.editor.__GT_cm_ed.call(null,ed),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,ed)) + 1),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),end_line,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new_body);
});
lt.plugins.kukui.add_tags_to_node = (function add_tags_to_node(node,tags){return cljs.core.update_in.call(null,node,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",1017460895)], null),cljs.core.str,clojure.string.join.call(null,cljs.core.map.call(null,(function (p1__9485_SHARP_){return (" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__9485_SHARP_));
}),tags)));
});
/**
* Stamp children nodes with parent tags
*/
lt.plugins.kukui.stamp_nodes = (function stamp_nodes(ed){var level = 0;var nodes = lt.plugins.kukui.db__GT_nodes.call(null,ed);var parent_tags = lt.plugins.kukui.core.text__GT_tags.call(null,lt.objs.editor.line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line));var new_nodes = cljs.core.map.call(null,((function (level,nodes,parent_tags){
return (function (p1__9486_SHARP_){return lt.plugins.kukui.add_tags_to_node.call(null,p1__9486_SHARP_,parent_tags);
});})(level,nodes,parent_tags))
,nodes);var indented_nodes = lt.plugins.kukui.core.indent_nodes.call(null,new_nodes,lt.plugins.sacha.codemirror.line_indent.call(null,ed,lt.objs.editor.cursor.call(null,ed).line),lt.objs.editor.option.call(null,ed,"tabSize"),level);return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,"\n",indented_nodes))+"\n");
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.stamp-children","kukui.stamp-children",3918722228),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: stamps current children with parent tags",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.kukui.replace_children.call(null,lt.objs.editor.pool.last_active.call(null),lt.plugins.kukui.stamp_nodes);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.toggle-descs","kukui.toggle-descs",4779010676),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Toggle visibility of descs of current children",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);return lt.plugins.kukui.util.toggle_all.call(null,ed,((function (ed){
return (function (p1__9487_SHARP_){var and__6414__auto__ = cljs.core.not.call(null,lt.plugins.kukui.core.desc_node_QMARK_.call(null,lt.plugins.kukui.node.line__GT_node.call(null,ed,p1__9487_SHARP_)));if(and__6414__auto__)
{return lt.plugins.kukui.core.desc_node_QMARK_.call(null,lt.plugins.kukui.node.line__GT_node.call(null,ed,(p1__9487_SHARP_ + 1)));
} else
{return and__6414__auto__;
}
});})(ed))
,lt.plugins.kukui.util.current_lines.call(null,ed));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.sync-file-to-db","kukui.sync-file-to-db",3023743498),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Syncs file to db",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var lines = cljs.core.range.call(null,lt.objs.editor.first_line.call(null,ed),(lt.objs.editor.last_line.call(null,ed) + 1));var nodes = lt.plugins.kukui.node.ed__GT_nodes.call(null,ed,lines);var file = lt.plugins.kukui.util.current_file.call(null,ed);lt.plugins.kukui.nodes = nodes;
try{return lt.plugins.kukui.sync.sync.call(null,nodes,file);
}catch (e9488){var e = e9488;lt.objs.notifos.set_msg_BANG_.call(null,("Failed to sync:"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
cljs.core.prn.call(null,e,cljs.core.ex_data.call(null,e));
return cljs.core.println.call(null,e.stack);
}})], null));
lt.plugins.kukui.entity_selector = lt.plugins.kukui.selector.selector.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"items","items",1114430258),(function (){return cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"name","name",1017277949),lt.plugins.kukui.datascript.qe.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"name","name",1017277949)], null)], null)));
}),new cljs.core.Keyword(null,"key","key",1014010321),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"transform","transform",2066570974),(function (p1__9491_SHARP_,p2__9492_SHARP_,p3__9489_SHARP_,p4__9490_SHARP_){return ("<p>"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p3__9489_SHARP_)+cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_((function (){var and__6414__auto__ = new cljs.core.Keyword(null,"file","file",1017047278).cljs$core$IFn$_invoke$arity$1(p4__9490_SHARP_);if(cljs.core.truth_(and__6414__auto__))
{return new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(p4__9490_SHARP_);
} else
{return and__6414__auto__;
}
})())?null:" (no file)"))+"</p>");
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.jump-to-entity","kukui.jump-to-entity",3638317185),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Jump to an entity's line and file",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.kukui.entity_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (entity){if(cljs.core.truth_((function (){var and__6414__auto__ = new cljs.core.Keyword(null,"file","file",1017047278).cljs$core$IFn$_invoke$arity$1(entity);if(cljs.core.truth_(and__6414__auto__))
{return new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(entity);
} else
{return and__6414__auto__;
}
})()))
{lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"open-path","open-path",2513940794),new cljs.core.Keyword(null,"file","file",1017047278).cljs$core$IFn$_invoke$arity$1(entity));
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"goto-line","goto-line",2802035088),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(entity) + 1));
} else
{return lt.objs.notifos.set_msg_BANG_.call(null,("No file and line exists for "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(entity))),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
}
})], null));
lt.plugins.kukui.__GT_ent = (function __GT_ent(__GT_id,id__GT_name,updated_names,thing){var G__9494 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("db","id","db/id",1014111942),__GT_id.call(null,new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(thing)),new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.mapv.call(null,__GT_id,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(thing)),new cljs.core.Keyword(null,"type","type",1017479852),(function (){var type = id__GT_name.call(null,cljs.core.first.call(null,new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(thing)));var type__$1 = ((cljs.core._EQ_.call(null,type,"tag"))?lt.plugins.kukui.db.unknown_type:type);return type__$1;
})(),new cljs.core.Keyword(null,"semtag","semtag",4402894033),true], null);var G__9494__$1 = ((cljs.core.seq.call(null,new cljs.core.Keyword(null,"desc","desc",1016984067).cljs$core$IFn$_invoke$arity$1(thing)))?cljs.core.assoc.call(null,G__9494,new cljs.core.Keyword(null,"text","text",1017460895),new cljs.core.Keyword(null,"desc","desc",1016984067).cljs$core$IFn$_invoke$arity$1(thing)):G__9494);var G__9494__$2 = ((cljs.core.seq.call(null,new cljs.core.Keyword(null,"url","url",1014020321).cljs$core$IFn$_invoke$arity$1(thing)))?cljs.core.assoc.call(null,G__9494__$1,new cljs.core.Keyword(null,"url","url",1014020321),new cljs.core.Keyword(null,"url","url",1014020321).cljs$core$IFn$_invoke$arity$1(thing)):G__9494__$1);var G__9494__$3 = (((function (){var name = (function (){var or__6426__auto__ = new cljs.core.Keyword(null,"alias","alias",1106807234).cljs$core$IFn$_invoke$arity$1(thing);if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(thing);
}
})();return (cljs.core.seq.call(null,name)) && (!(cljs.core.contains_QMARK_.call(null,updated_names,name)));
})())?cljs.core.assoc.call(null,G__9494__$2,new cljs.core.Keyword(null,"name","name",1017277949),(function (){var or__6426__auto__ = new cljs.core.Keyword(null,"alias","alias",1106807234).cljs$core$IFn$_invoke$arity$1(thing);if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(thing);
}
})()):G__9494__$2);return G__9494__$3;
});
lt.plugins.kukui.import_semtag_data = (function import_semtag_data(){var things = cljs.reader.read_string.call(null,new cljs.core.Keyword(null,"content","content",1965434859).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,lt.objs.files.join.call(null,lt.objs.files.lt_user_dir.call(null,"plugins"),"kukui","db.clj"))));var things__$1 = cljs.core.map.call(null,((function (things){
return (function (thing){return cljs.core.assoc.call(null,thing,new cljs.core.Keyword(null,"id","id",1013907597),(- new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(thing)),new cljs.core.Keyword(null,"types","types",1124748267),cljs.core.map.call(null,cljs.core.comp.call(null,cljs.core._,new cljs.core.Keyword("db","id","db/id",1014111942)),new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(thing)),new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.map.call(null,cljs.core.comp.call(null,cljs.core._,new cljs.core.Keyword("db","id","db/id",1014111942)),new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(thing)));
});})(things))
,things);var id__GT_name = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.call(null,((function (things,things__$1){
return (function (p1__9495_SHARP_){var temp__4126__auto__ = ((cljs.core.seq.call(null,new cljs.core.Keyword(null,"alias","alias",1106807234).cljs$core$IFn$_invoke$arity$1(p1__9495_SHARP_)))?new cljs.core.Keyword(null,"alias","alias",1106807234).cljs$core$IFn$_invoke$arity$1(p1__9495_SHARP_):((cljs.core.seq.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__9495_SHARP_)))?new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__9495_SHARP_):null));if(cljs.core.truth_(temp__4126__auto__))
{var n = temp__4126__auto__;return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(p1__9495_SHARP_),n], null);
} else
{return null;
}
});})(things,things__$1))
,things__$1));var existing_names = lt.plugins.kukui.db.name_id_map.call(null);var updated_names = clojure.set.intersection.call(null,cljs.core.set.call(null,cljs.core.keys.call(null,existing_names)),cljs.core.set.call(null,cljs.core.vals.call(null,id__GT_name)));var _ = cljs.core.prn.call(null,"Following names already exist but will thave their type updated:",updated_names);var __GT_id = ((function (things,things__$1,id__GT_name,existing_names,updated_names,_){
return (function (p1__9496_SHARP_){if(cljs.core.contains_QMARK_.call(null,updated_names,id__GT_name.call(null,p1__9496_SHARP_)))
{return existing_names.call(null,id__GT_name.call(null,p1__9496_SHARP_));
} else
{return p1__9496_SHARP_;
}
});})(things,things__$1,id__GT_name,existing_names,updated_names,_))
;var entities = cljs.core.map.call(null,cljs.core.partial.call(null,lt.plugins.kukui.__GT_ent,__GT_id,id__GT_name,updated_names),things__$1);cljs.core.println.call(null,"Saving",cljs.core.count.call(null,entities),"entities,",cljs.core.count.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523),entities)),"tags...");
return lt.plugins.kukui.datascript.transact_BANG_.call(null,lt.plugins.kukui.db.must_require_type.call(null,lt.plugins.kukui.db.must_have_string_name.call(null,lt.plugins.kukui.db.must_have_unique_name.call(null,entities))));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.import-semtag-data","kukui.import-semtag-data",1083232411),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Imports semtag data",new cljs.core.Keyword(null,"exec","exec",1017031683),lt.plugins.kukui.import_semtag_data], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.reset-sync","kukui.reset-sync",2173405380),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Resets sync",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){lt.plugins.kukui.sync.reset_sync_BANG_.call(null);
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,lt.objs.files.join.call(null,lt.objs.files.lt_user_dir.call(null,"plugins"),"kukui","db.clj"))))
{lt.plugins.kukui.import_semtag_data.call(null);
} else
{}
return lt.objs.notifos.set_msg_BANG_.call(null,"Reset!");
})], null));
}

//# sourceMappingURL=kukui_compiled.js.map