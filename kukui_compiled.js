if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.util')) {
goog.provide('lt.plugins.kukui.util');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.plugins.sacha.codemirror');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.tabs');
goog.require('lt.objs.files');
goog.require('lt.objs.command');
goog.require('lt.objs.tabs');
goog.require('lt.objs.jump_stack');
goog.require('clojure.string');
goog.require('lt.plugins.sacha.codemirror');
goog.require('clojure.string');
goog.require('lt.objs.editor');
goog.require('lt.objs.files');
goog.require('lt.objs.jump_stack');
goog.require('lt.object');
/**
* Insert string at the beginning of the next line
*/
lt.plugins.kukui.util.insert_at_next_line = (function insert_at_next_line(ed,s){lt.objs.editor.replace.call(null,lt.objs.editor.__GT_cm_ed.call(null,ed),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,ed)) + 1),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),s);
return ed;
});
/**
* Finds range of lines for parent and returns all lines in file when no parent
*/
lt.plugins.kukui.util.find_parent_lines = (function find_parent_lines(ed,line){var temp__4124__auto__ = lt.plugins.sacha.codemirror.find_parent_line.call(null,ed,line);if(cljs.core.truth_(temp__4124__auto__))
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
var toggle_all__3 = (function (ed,condition,lines){return lt.objs.editor.operation.call(null,ed,(function (){var seq__8988 = cljs.core.seq.call(null,lines);var chunk__8989 = null;var count__8990 = 0;var i__8991 = 0;while(true){
if((i__8991 < count__8990))
{var line = cljs.core._nth.call(null,chunk__8989,i__8991);if(cljs.core.truth_(condition.call(null,line)))
{lt.plugins.sacha.codemirror.fold_code.call(null,ed,{"ch": 0, "line": line},null);
} else
{}
{
var G__8996 = seq__8988;
var G__8997 = chunk__8989;
var G__8998 = count__8990;
var G__8999 = (i__8991 + 1);
seq__8988 = G__8996;
chunk__8989 = G__8997;
count__8990 = G__8998;
i__8991 = G__8999;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__8988);if(temp__4126__auto__)
{var seq__8988__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8988__$1))
{var c__7182__auto__ = cljs.core.chunk_first.call(null,seq__8988__$1);{
var G__9000 = cljs.core.chunk_rest.call(null,seq__8988__$1);
var G__9001 = c__7182__auto__;
var G__9002 = cljs.core.count.call(null,c__7182__auto__);
var G__9003 = 0;
seq__8988 = G__9000;
chunk__8989 = G__9001;
count__8990 = G__9002;
i__8991 = G__9003;
continue;
}
} else
{var line = cljs.core.first.call(null,seq__8988__$1);if(cljs.core.truth_(condition.call(null,line)))
{lt.plugins.sacha.codemirror.fold_code.call(null,ed,{"ch": 0, "line": line},null);
} else
{}
{
var G__9004 = cljs.core.next.call(null,seq__8988__$1);
var G__9005 = null;
var G__9006 = 0;
var G__9007 = 0;
seq__8988 = G__9004;
chunk__8989 = G__9005;
count__8990 = G__9006;
i__8991 = G__9007;
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
return (function (p1__8992_SHARP_){if(cljs.core._EQ_.call(null,current_indent,lt.plugins.sacha.codemirror.line_indent.call(null,ed,p1__8992_SHARP_)))
{return p1__8992_SHARP_;
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
var format__delegate = function (fmt,args){return cljs.core.reduce.call(null,(function (acc,arg){var vec__8994 = cljs.core.re_find.call(null,/^(.*?)%s(.*)/,acc);var _ = cljs.core.nth.call(null,vec__8994,0,null);var matches = cljs.core.nthnext.call(null,vec__8994,1);if(matches)
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
format.cljs$lang$applyTo = (function (arglist__9008){
var fmt = cljs.core.first(arglist__9008);
var args = cljs.core.rest(arglist__9008);
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
/**
* Updates given editor to edit a new path. Appropriately swaps CM doc object,
* refreshes editor keys and updates editor's tab, :tags, :info and :listeners.
*/
lt.plugins.kukui.util.update_editor_path_BANG_ = (function update_editor_path_BANG_(ed,path){var info = cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mime","mime",1017255846),"plaintext",new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.plaintext","editor.plaintext",4474629672)], null)], null),lt.objs.opener.path__GT_info.call(null,path));var content = new cljs.core.Keyword(null,"content","content",1965434859).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,path));var doc = lt.objs.document.create.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"line-ending","line-ending",4015468690),lt.objs.files.line_ending,new cljs.core.Keyword(null,"mime","mime",1017255846),new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Keyword(null,"mtime","mtime",1118128172),lt.objs.files.stats.call(null,path),new cljs.core.Keyword(null,"content","content",1965434859),content], null));var default_tags = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"editor.keys.emacs","editor.keys.emacs",3283998978),null,new cljs.core.Keyword(null,"editor.inline-result","editor.inline-result",1965420162),null,new cljs.core.Keyword(null,"editor.file-backed","editor.file-backed",4684256680),null,new cljs.core.Keyword(null,"editor","editor",4001043679),null,new cljs.core.Keyword(null,"editor.keys.vim","editor.keys.vim",1440863219),null,new cljs.core.Keyword(null,"object","object",4285503153),null,new cljs.core.Keyword(null,"tabset.tab","tabset.tab",1444337222),null,new cljs.core.Keyword(null,"editor.keys.vim.normal","editor.keys.vim.normal",2715619942),null], null), null);var default_editor_keys = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 14, [new cljs.core.Keyword(null,"tags","tags",1017456523),null,new cljs.core.Keyword("lt.object","type","lt.object/type",701613666),null,new cljs.core.Keyword(null,"children","children",2673430897),null,new cljs.core.Keyword(null,"content","content",1965434859),null,new cljs.core.Keyword(null,"behaviors","behaviors",607554515),null,new cljs.core.Keyword(null,"triggers","triggers",2516997421),null,new cljs.core.Keyword("lt.object","id","lt.object/id",706431105),null,new cljs.core.Keyword(null,"ed","ed",1013907473),null,new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",3378091779),null,new cljs.core.Keyword("lt.objs.editor.pool","comment-options","lt.objs.editor.pool/comment-options",1136977589),null,new cljs.core.Keyword(null,"info","info",1017141280),null,new cljs.core.Keyword(null,"doc","doc",1014003882),null,new cljs.core.Keyword(null,"listeners","listeners",4090152369),null,new cljs.core.Keyword(null,"editor.generation","editor.generation",4482163627),null], null), null);var outdated_editor_keys = clojure.set.difference.call(null,cljs.core.set.call(null,cljs.core.keys.call(null,cljs.core.deref.call(null,ed))),default_editor_keys);lt.objs.document.register_doc.call(null,doc,path);
lt.objs.editor.set_doc_BANG_.call(null,ed,doc);
lt.object.remove_tags.call(null,ed,clojure.set.difference.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)),default_tags));
lt.object.add_tags.call(null,ed,cljs.core.into.call(null,default_tags,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$2(info,cljs.core.PersistentVector.EMPTY)));
lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"info","info",1017141280),info], null));
cljs.core.swap_BANG_.call(null,ed,((function (info,content,doc,default_tags,default_editor_keys,outdated_editor_keys){
return (function (p1__8995_SHARP_){return cljs.core.apply.call(null,cljs.core.dissoc,p1__8995_SHARP_,outdated_editor_keys);
});})(info,content,doc,default_tags,default_editor_keys,outdated_editor_keys))
);
var temp__4126__auto__ = new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",3378091779).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed));if(cljs.core.truth_(temp__4126__auto__))
{var ts = temp__4126__auto__;return lt.object.raise.call(null,ts,new cljs.core.Keyword(null,"tab.updated","tab.updated",2727558868));
} else
{return null;
}
});
/**
* Jumps to given file and optional line and adds last cursor to jump-stack
*/
lt.plugins.kukui.util.jump_to = (function() {
var jump_to = null;
var jump_to__2 = (function (ed,path){return jump_to.call(null,ed,path,0);
});
var jump_to__3 = (function (ed,path,line){return lt.object.raise.call(null,lt.objs.jump_stack.jump_stack,new cljs.core.Keyword(null,"jump-stack.push!","jump-stack.push!",4063822260),ed,path,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),line,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null));
});
jump_to = function(ed,path,line){
switch(arguments.length){
case 2:
return jump_to__2.call(this,ed,path);
case 3:
return jump_to__3.call(this,ed,path,line);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
jump_to.cljs$core$IFn$_invoke$arity$2 = jump_to__2;
jump_to.cljs$core$IFn$_invoke$arity$3 = jump_to__3;
return jump_to;
})()
;
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
lt.plugins.kukui.core.text__GT_tags = (function text__GT_tags(text){return cljs.core.map.call(null,(function (p1__8784_SHARP_){return cljs.core.subs.call(null,p1__8784_SHARP_,1);
}),cljs.core.map.call(null,cljs.core.second,cljs.core.re_seq.call(null,lt.plugins.kukui.core.tag_pattern,text)));
});
lt.plugins.kukui.core.indent_node = (function indent_node(node,indent){return clojure.string.replace_first.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(node),/^\s*/,cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,indent," ")));
});
lt.plugins.kukui.core.indent_nodes = (function indent_nodes(nodes,indent,tab_size,offset_level){var offset = (offset_level * tab_size);var tag_indent = (indent + offset);var node_indent = ((indent + offset) + tab_size);var desc_indent = (((indent + offset) + tab_size) + tab_size);return cljs.core.mapcat.call(null,((function (offset,tag_indent,node_indent,desc_indent){
return (function (p1__8785_SHARP_){if(cljs.core.truth_(new cljs.core.Keyword(null,"type-tag","type-tag",4631398905).cljs$core$IFn$_invoke$arity$1(p1__8785_SHARP_)))
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,tag_indent," ")))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(p1__8785_SHARP_)))], null);
} else
{return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.kukui.core.indent_node.call(null,p1__8785_SHARP_,node_indent)], null),cljs.core.map.call(null,((function (offset,tag_indent,node_indent,desc_indent){
return (function (x){return lt.plugins.kukui.core.indent_node.call(null,x,desc_indent);
});})(offset,tag_indent,node_indent,desc_indent))
,new cljs.core.Keyword(null,"desc","desc",1016984067).cljs$core$IFn$_invoke$arity$1(p1__8785_SHARP_)));
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
lt.plugins.kukui.core.add_node_with_parent_tags = (function add_node_with_parent_tags(nodes,curr,parent_tags){return lt.plugins.kukui.core.add_node_with_tags.call(null,nodes,curr,cljs.core.concat.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.filter.call(null,(function (p1__8786_SHARP_){return (new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(p1__8786_SHARP_) < new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
}),parent_tags)),lt.plugins.kukui.core.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr))));
});
lt.plugins.kukui.core.__GT_name_value = (function __GT_name_value(text){return cljs.core.second.call(null,cljs.core.re_find.call(null,cljs.core.re_pattern.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.name_attr)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.attr_delimiter)+"(\\S+)")),text));
});
lt.plugins.kukui.core.add_custom_attributes = (function add_custom_attributes(node){var vec__8792 = cljs.core.juxt.call(null,cljs.core.remove,cljs.core.filter).call(null,(function (p1__8787_SHARP_){return (p1__8787_SHARP_.indexOf(lt.plugins.kukui.core.attr_delimiter) > -1);
}),new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(node));var tags = cljs.core.nth.call(null,vec__8792,0,null);var attribute_tags = cljs.core.nth.call(null,vec__8792,1,null);return cljs.core.merge.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (vec__8792,tags,attribute_tags){
return (function (p__8793){var vec__8794 = p__8793;var k = cljs.core.nth.call(null,vec__8794,0,null);var v = cljs.core.nth.call(null,vec__8794,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,k),v], null);
});})(vec__8792,tags,attribute_tags))
,cljs.core.map.call(null,((function (vec__8792,tags,attribute_tags){
return (function (p1__8788_SHARP_){return clojure.string.split.call(null,p1__8788_SHARP_,cljs.core.re_pattern.call(null,lt.plugins.kukui.core.attr_delimiter));
});})(vec__8792,tags,attribute_tags))
,attribute_tags))),cljs.core.assoc.call(null,node,new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.set.call(null,tags)));
});
lt.plugins.kukui.core.add_from_desc = (function add_from_desc(desc,node){var temp__4124__auto__ = cljs.core.re_find.call(null,/\s*\+\s*:(\S*):\s*(.*)/,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(desc));if(cljs.core.truth_(temp__4124__auto__))
{var vec__8796 = temp__4124__auto__;var _ = cljs.core.nth.call(null,vec__8796,0,null);var attr = cljs.core.nth.call(null,vec__8796,1,null);var value = cljs.core.nth.call(null,vec__8796,2,null);return cljs.core.assoc.call(null,node,cljs.core.keyword.call(null,attr),value);
} else
{return cljs.core.assoc.call(null,node,new cljs.core.Keyword(null,"desc","desc",1016984067),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY).call(null,new cljs.core.Keyword(null,"desc","desc",1016984067).cljs$core$IFn$_invoke$arity$1(node),desc));
}
});
/**
* Adds :tags, :desc and custom attributes to nodes
*/
lt.plugins.kukui.core.add_attributes_to_nodes = (function add_attributes_to_nodes(nodes){return cljs.core.mapv.call(null,lt.plugins.kukui.core.add_custom_attributes,new cljs.core.Keyword(null,"nodes","nodes",1118897699).cljs$core$IFn$_invoke$arity$1(cljs.core.reduce.call(null,(function (accum,p__8803){var vec__8804 = p__8803;var curr = cljs.core.nth.call(null,vec__8804,0,null);var next = cljs.core.nth.call(null,vec__8804,1,null);if(cljs.core.truth_((function (){var and__6414__auto__ = lt.plugins.kukui.core.parent_node_QMARK_.call(null,curr,next);if(cljs.core.truth_(and__6414__auto__))
{return lt.plugins.kukui.core.__GT_name_value.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr));
} else
{return and__6414__auto__;
}
})()))
{return cljs.core.update_in.call(null,cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699)], null),((function (vec__8804,curr,next){
return (function (p1__8797_SHARP_){return lt.plugins.kukui.core.add_node_with_parent_tags.call(null,p1__8797_SHARP_,curr,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(accum));
});})(vec__8804,curr,next))
),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tags","tags",1017456523)], null),((function (vec__8804,curr,next){
return (function (p1__8798_SHARP_){return lt.plugins.kukui.core.add_node_with_tags.call(null,cljs.core.vec.call(null,cljs.core.remove.call(null,((function (vec__8804,curr,next){
return (function (tag){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(tag),new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
});})(vec__8804,curr,next))
,p1__8798_SHARP_)),curr,cljs.core._conj.call(null,cljs.core.List.EMPTY,lt.plugins.kukui.core.__GT_name_value.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr))));
});})(vec__8804,curr,next))
);
} else
{if(cljs.core.truth_(lt.plugins.kukui.core.parent_node_QMARK_.call(null,curr,next)))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tags","tags",1017456523)], null),((function (vec__8804,curr,next){
return (function (p1__8799_SHARP_){return lt.plugins.kukui.core.add_node_with_tags.call(null,cljs.core.vec.call(null,cljs.core.remove.call(null,((function (vec__8804,curr,next){
return (function (tag){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(tag),new cljs.core.Keyword(null,"indent","indent",4124632094).cljs$core$IFn$_invoke$arity$1(curr));
});})(vec__8804,curr,next))
,p1__8799_SHARP_)),curr,lt.plugins.kukui.core.text__GT_tags.call(null,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(curr)));
});})(vec__8804,curr,next))
);
} else
{if(cljs.core.truth_(lt.plugins.kukui.core.desc_node_QMARK_.call(null,curr)))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699),(cljs.core.count.call(null,new cljs.core.Keyword(null,"nodes","nodes",1118897699).cljs$core$IFn$_invoke$arity$1(accum)) - 1)], null),cljs.core.partial.call(null,lt.plugins.kukui.core.add_from_desc,curr),curr);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.update_in.call(null,accum,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nodes","nodes",1118897699)], null),((function (vec__8804,curr,next){
return (function (p1__8800_SHARP_){return lt.plugins.kukui.core.add_node_with_parent_tags.call(null,p1__8800_SHARP_,curr,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(accum));
});})(vec__8804,curr,next))
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
lt.plugins.kukui.node.__GT_tagged_nodes = (function __GT_tagged_nodes(ed,lines){var nodes = lt.plugins.kukui.core.add_attributes_to_nodes.call(null,cljs.core.map.call(null,(function (p1__8871_SHARP_){return lt.plugins.kukui.node.line__GT_node.call(null,ed,p1__8871_SHARP_);
}),lines));return cljs.core.remove.call(null,((function (nodes){
return (function (p1__8872_SHARP_){return cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__8872_SHARP_),lt.plugins.kukui.node.ignore_tag);
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
clojure.walk.keywordize_keys = (function keywordize_keys(m){var f = (function (p__8766){var vec__8767 = p__8766;var k = cljs.core.nth.call(null,vec__8767,0,null);var v = cljs.core.nth.call(null,vec__8767,1,null);if(typeof k === 'string')
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
clojure.walk.stringify_keys = (function stringify_keys(m){var f = (function (p__8770){var vec__8771 = p__8770;var k = cljs.core.nth.call(null,vec__8771,0,null);var v = cljs.core.nth.call(null,vec__8771,1,null);if((k instanceof cljs.core.Keyword))
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
datascript.btset.level_shift = (cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__8702_SHARP_){return ((datascript.btset.max_len & (1 << p1__8702_SHARP_)) != 0);
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
var G__8722 = arr;
var G__8723 = (m + 1);
var G__8724 = r;
var G__8725 = k;
arr = G__8722;
l = G__8723;
r = G__8724;
k = G__8725;
continue;
}
} else
{{
var G__8726 = arr;
var G__8727 = l;
var G__8728 = (m - 1);
var G__8729 = k;
arr = G__8726;
l = G__8727;
r = G__8728;
k = G__8729;
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
var G__8730 = arr;
var G__8731 = l;
var G__8732 = (m - 1);
var G__8733 = k;
arr = G__8730;
l = G__8731;
r = G__8732;
k = G__8733;
continue;
}
} else
{{
var G__8734 = arr;
var G__8735 = (m + 1);
var G__8736 = r;
var G__8737 = k;
arr = G__8734;
l = G__8735;
r = G__8736;
k = G__8737;
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
datascript.btset.cut_n_splice = (function cut_n_splice(arr,cut_from,cut_to,splice_from,splice_to,xs){var arr_l = arr.length;var xs_l = xs.length;var l1 = (splice_from - cut_from);var l2 = (cut_to - splice_to);var l1xs = (l1 + xs_l);var new_arr = (new Array(((l1 + xs_l) + l2)));var n__7282__auto___8738 = l1;var i_8739 = 0;while(true){
if((i_8739 < n__7282__auto___8738))
{(new_arr[i_8739] = (arr[(cut_from + i_8739)]));
{
var G__8740 = (i_8739 + 1);
i_8739 = G__8740;
continue;
}
} else
{}
break;
}
var n__7282__auto___8741 = xs_l;var i_8742 = 0;while(true){
if((i_8742 < n__7282__auto___8741))
{(new_arr[(i_8742 + l1)] = (xs[i_8742]));
{
var G__8743 = (i_8742 + 1);
i_8742 = G__8743;
continue;
}
} else
{}
break;
}
var n__7282__auto___8744 = l2;var i_8745 = 0;while(true){
if((i_8745 < n__7282__auto___8744))
{(new_arr[(i_8745 + l1xs)] = (arr[(splice_to + i_8745)]));
{
var G__8746 = (i_8745 + 1);
i_8745 = G__8746;
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
datascript.btset.merge_n_split = (function merge_n_split(a1,a2){var a1_l = a1.length;var a2_l = a2.length;var total_l = (a1_l + a2_l);var r1_l = datascript.btset.half.call(null,total_l);var r2_l = (total_l - r1_l);var r1 = (new Array(r1_l));var r2 = (new Array(r2_l));var n__7282__auto___8747 = total_l;var i_8748 = 0;while(true){
if((i_8748 < n__7282__auto___8747))
{((((i_8748 < r1_l))?r1:r2)[(((i_8748 < r1_l))?i_8748:(i_8748 - r1_l))] = ((((i_8748 < a1_l))?a1:a2)[(((i_8748 < a1_l))?i_8748:(i_8748 - a1_l))]));
{
var G__8749 = (i_8748 + 1);
i_8748 = G__8749;
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
var G__8750 = (i + 1);
i = G__8750;
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
var G__8751 = (level - datascript.btset.level_shift);
var G__8752 = (node.pointers[datascript.btset.path_get.call(null,path,level)]);
level = G__8751;
node = G__8752;
continue;
}
} else
{return node.keys;
}
break;
}
});
datascript.btset.btset_conj = (function btset_conj(set,key){var _STAR_cmp_STAR_8704 = datascript.btset._STAR_cmp_STAR_;try{datascript.btset._STAR_cmp_STAR_ = set.comparator;
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
}finally {datascript.btset._STAR_cmp_STAR_ = _STAR_cmp_STAR_8704;
}});
datascript.btset.btset_disj = (function btset_disj(set,key){var _STAR_cmp_STAR_8706 = datascript.btset._STAR_cmp_STAR_;try{datascript.btset._STAR_cmp_STAR_ = set.comparator;
var new_roots = set.root.disj(key,true,null,null);if((new_roots == null))
{return set;
} else
{var new_root = (new_roots[0]);if(((new_root instanceof datascript.btset.Node)) && ((new_root.pointers.length === 1)))
{return datascript.btset.alter_btset.call(null,set,(new_root.pointers[0]),(set.shift - datascript.btset.level_shift),(set.cnt - 1));
} else
{return datascript.btset.alter_btset.call(null,set,new_root,set.shift,(set.cnt - 1));
}
}
}finally {datascript.btset._STAR_cmp_STAR_ = _STAR_cmp_STAR_8706;
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
var G__8753 = (node.pointers[idx]);
var G__8754 = datascript.btset.path_set.call(null,path,level,idx);
var G__8755 = (level - datascript.btset.level_shift);
node = G__8753;
path = G__8754;
level = G__8755;
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
var G__8756 = (node.pointers[idx]);
var G__8757 = datascript.btset.path_set.call(null,path,level,idx);
var G__8758 = (level - datascript.btset.level_shift);
node = G__8756;
path = G__8757;
level = G__8758;
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
var slice__3 = (function (set,key_from,key_to){var _STAR_cmp_STAR_8708 = datascript.btset._STAR_cmp_STAR_;try{datascript.btset._STAR_cmp_STAR_ = set.comparator;
return datascript.btset._slice.call(null,set,key_from,key_to);
}finally {datascript.btset._STAR_cmp_STAR_ = _STAR_cmp_STAR_8708;
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
var ___$1 = this;var _STAR_cmp_STAR_8711 = datascript.btset._STAR_cmp_STAR_;try{datascript.btset._STAR_cmp_STAR_ = self__.comparator;
var or__6426__auto__ = self__.root.lookup(k);if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return not_found;
}
}finally {datascript.btset._STAR_cmp_STAR_ = _STAR_cmp_STAR_8711;
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
return (function (p1__8709_SHARP_){return cljs.core.contains_QMARK_.call(null,this$__$1,p1__8709_SHARP_);
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
var G__8759 = null;
var G__8759__2 = (function (self__,k){var self__ = this;
var self____$1 = this;var coll = self____$1;return coll.cljs$core$ILookup$_lookup$arity$2(null,k);
});
var G__8759__3 = (function (self__,k,not_found){var self__ = this;
var self____$1 = this;var coll = self____$1;return coll.cljs$core$ILookup$_lookup$arity$3(null,k,not_found);
});
G__8759 = function(self__,k,not_found){
switch(arguments.length){
case 2:
return G__8759__2.call(this,self__,k);
case 3:
return G__8759__3.call(this,self__,k,not_found);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__8759;
})()
;
datascript.btset.BTSet.prototype.apply = (function (self__,args8710){var self__ = this;
var self____$1 = this;return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args8710)));
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
var G__8760__delegate = function (cmp,keys){return cljs.core.reduce.call(null,cljs.core._conj,btset_by.call(null,cmp),keys);
};
var G__8760 = function (cmp,var_args){
var keys = null;if (arguments.length > 1) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return G__8760__delegate.call(this,cmp,keys);};
G__8760.cljs$lang$maxFixedArity = 1;
G__8760.cljs$lang$applyTo = (function (arglist__8761){
var cmp = cljs.core.first(arglist__8761);
var keys = cljs.core.rest(arglist__8761);
return G__8760__delegate(cmp,keys);
});
G__8760.cljs$core$IFn$_invoke$arity$variadic = G__8760__delegate;
return G__8760;
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
var G__8762__delegate = function (keys){return cljs.core.reduce.call(null,cljs.core._conj,btset.call(null),keys);
};
var G__8762 = function (var_args){
var keys = null;if (arguments.length > 0) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return G__8762__delegate.call(this,keys);};
G__8762.cljs$lang$maxFixedArity = 0;
G__8762.cljs$lang$applyTo = (function (arglist__8763){
var keys = cljs.core.seq(arglist__8763);
return G__8762__delegate(keys);
});
G__8762.cljs$core$IFn$_invoke$arity$variadic = G__8762__delegate;
return G__8762;
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
datascript.Datom.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__7014__auto__,k8462,else__7015__auto__){var self__ = this;
var this__7014__auto____$1 = this;var G__8464 = (((k8462 instanceof cljs.core.Keyword))?k8462.fqn:null);var caseval__8616;
switch (G__8464){
case "added":
caseval__8616=self__.added
break;
case "tx":
caseval__8616=self__.tx
break;
case "v":
caseval__8616=self__.v
break;
case "a":
caseval__8616=self__.a
break;
case "e":
caseval__8616=self__.e
break;
default:
caseval__8616=cljs.core.get.call(null,self__.__extmap,k8462,else__7015__auto__)
}
return caseval__8616;
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
datascript.Datom.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__7019__auto__,k__7020__auto__,G__8461){var self__ = this;
var this__7019__auto____$1 = this;var pred__8465 = cljs.core.keyword_identical_QMARK_;var expr__8466 = k__7020__auto__;if(cljs.core.truth_(pred__8465.call(null,new cljs.core.Keyword(null,"e","e",1013904343),expr__8466)))
{return (new datascript.Datom(G__8461,self__.a,self__.v,self__.tx,self__.added,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8465.call(null,new cljs.core.Keyword(null,"a","a",1013904339),expr__8466)))
{return (new datascript.Datom(self__.e,G__8461,self__.v,self__.tx,self__.added,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8465.call(null,new cljs.core.Keyword(null,"v","v",1013904360),expr__8466)))
{return (new datascript.Datom(self__.e,self__.a,G__8461,self__.tx,self__.added,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8465.call(null,new cljs.core.Keyword(null,"tx","tx",1013907958),expr__8466)))
{return (new datascript.Datom(self__.e,self__.a,self__.v,G__8461,self__.added,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8465.call(null,new cljs.core.Keyword(null,"added","added",1106564210),expr__8466)))
{return (new datascript.Datom(self__.e,self__.a,self__.v,self__.tx,G__8461,self__.__meta,self__.__extmap,null));
} else
{return (new datascript.Datom(self__.e,self__.a,self__.v,self__.tx,self__.added,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__7020__auto__,G__8461),null));
}
}
}
}
}
});
datascript.Datom.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__7024__auto__){var self__ = this;
var this__7024__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"e","e",1013904343),self__.e],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"a","a",1013904339),self__.a],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"v","v",1013904360),self__.v],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"tx","tx",1013907958),self__.tx],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"added","added",1106564210),self__.added],null))], null),self__.__extmap));
});
datascript.Datom.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__7011__auto__,G__8461){var self__ = this;
var this__7011__auto____$1 = this;return (new datascript.Datom(self__.e,self__.a,self__.v,self__.tx,self__.added,G__8461,self__.__extmap,self__.__hash));
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
datascript.map__GT_Datom = (function map__GT_Datom(G__8463){return (new datascript.Datom(new cljs.core.Keyword(null,"e","e",1013904343).cljs$core$IFn$_invoke$arity$1(G__8463),new cljs.core.Keyword(null,"a","a",1013904339).cljs$core$IFn$_invoke$arity$1(G__8463),new cljs.core.Keyword(null,"v","v",1013904360).cljs$core$IFn$_invoke$arity$1(G__8463),new cljs.core.Keyword(null,"tx","tx",1013907958).cljs$core$IFn$_invoke$arity$1(G__8463),new cljs.core.Keyword(null,"added","added",1106564210).cljs$core$IFn$_invoke$arity$1(G__8463),null,cljs.core.dissoc.call(null,G__8463,new cljs.core.Keyword(null,"e","e",1013904343),new cljs.core.Keyword(null,"a","a",1013904339),new cljs.core.Keyword(null,"v","v",1013904360),new cljs.core.Keyword(null,"tx","tx",1013907958),new cljs.core.Keyword(null,"added","added",1106564210))));
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
datascript.ISearch = (function (){var obj8469 = {};return obj8469;
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
datascript.cmp_datoms_eavt = (function cmp_datoms_eavt(d1,d2){var c__8021__auto__ = datascript.cmp.call(null,d1.e,d2.e);if((0 === c__8021__auto__))
{var c__8021__auto____$1 = datascript.cmp.call(null,d1.a,d2.a);if((0 === c__8021__auto____$1))
{var c__8021__auto____$2 = datascript.cmp_val.call(null,d1.v,d2.v);if((0 === c__8021__auto____$2))
{var c__8021__auto____$3 = datascript.cmp.call(null,d1.tx,d2.tx);if((0 === c__8021__auto____$3))
{return 0;
} else
{return c__8021__auto____$3;
}
} else
{return c__8021__auto____$2;
}
} else
{return c__8021__auto____$1;
}
} else
{return c__8021__auto__;
}
});
datascript.cmp_datoms_aevt = (function cmp_datoms_aevt(d1,d2){var c__8021__auto__ = datascript.cmp.call(null,d1.a,d2.a);if((0 === c__8021__auto__))
{var c__8021__auto____$1 = datascript.cmp.call(null,d1.e,d2.e);if((0 === c__8021__auto____$1))
{var c__8021__auto____$2 = datascript.cmp_val.call(null,d1.v,d2.v);if((0 === c__8021__auto____$2))
{var c__8021__auto____$3 = datascript.cmp.call(null,d1.tx,d2.tx);if((0 === c__8021__auto____$3))
{return 0;
} else
{return c__8021__auto____$3;
}
} else
{return c__8021__auto____$2;
}
} else
{return c__8021__auto____$1;
}
} else
{return c__8021__auto__;
}
});
datascript.cmp_datoms_avet = (function cmp_datoms_avet(d1,d2){var c__8021__auto__ = datascript.cmp.call(null,d1.a,d2.a);if((0 === c__8021__auto__))
{var c__8021__auto____$1 = datascript.cmp_val.call(null,d1.v,d2.v);if((0 === c__8021__auto____$1))
{var c__8021__auto____$2 = datascript.cmp.call(null,d1.e,d2.e);if((0 === c__8021__auto____$2))
{var c__8021__auto____$3 = datascript.cmp.call(null,d1.tx,d2.tx);if((0 === c__8021__auto____$3))
{return 0;
} else
{return c__8021__auto____$3;
}
} else
{return c__8021__auto____$2;
}
} else
{return c__8021__auto____$1;
}
} else
{return c__8021__auto__;
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
datascript.DB.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__7014__auto__,k8480,else__7015__auto__){var self__ = this;
var this__7014__auto____$1 = this;var G__8482 = (((k8480 instanceof cljs.core.Keyword))?k8480.fqn:null);var caseval__8617;
switch (G__8482){
case "max-tx":
caseval__8617=self__.max_tx
break;
case "max-eid":
caseval__8617=self__.max_eid
break;
case "avet":
caseval__8617=self__.avet
break;
case "aevt":
caseval__8617=self__.aevt
break;
case "eavt":
caseval__8617=self__.eavt
break;
case "schema":
caseval__8617=self__.schema
break;
default:
caseval__8617=cljs.core.get.call(null,self__.__extmap,k8480,else__7015__auto__)
}
return caseval__8617;
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
datascript.DB.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__7019__auto__,k__7020__auto__,G__8479){var self__ = this;
var this__7019__auto____$1 = this;var pred__8483 = cljs.core.keyword_identical_QMARK_;var expr__8484 = k__7020__auto__;if(cljs.core.truth_(pred__8483.call(null,new cljs.core.Keyword(null,"schema","schema",4400883987),expr__8484)))
{return (new datascript.DB(G__8479,self__.eavt,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8483.call(null,new cljs.core.Keyword(null,"eavt","eavt",1017010124),expr__8484)))
{return (new datascript.DB(self__.schema,G__8479,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8483.call(null,new cljs.core.Keyword(null,"aevt","aevt",1016894804),expr__8484)))
{return (new datascript.DB(self__.schema,self__.eavt,G__8479,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8483.call(null,new cljs.core.Keyword(null,"avet","avet",1016910614),expr__8484)))
{return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,G__8479,self__.max_eid,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8483.call(null,new cljs.core.Keyword(null,"max-eid","max-eid",1856848841),expr__8484)))
{return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,G__8479,self__.max_tx,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8483.call(null,new cljs.core.Keyword(null,"max-tx","max-tx",4227685119),expr__8484)))
{return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,self__.max_eid,G__8479,self__.__meta,self__.__extmap,null));
} else
{return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__7020__auto__,G__8479),null));
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
datascript.DB.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__7011__auto__,G__8479){var self__ = this;
var this__7011__auto____$1 = this;return (new datascript.DB(self__.schema,self__.eavt,self__.aevt,self__.avet,self__.max_eid,self__.max_tx,G__8479,self__.__extmap,self__.__hash));
});
datascript.DB.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__7017__auto__,entry__7018__auto__){var self__ = this;
var this__7017__auto____$1 = this;if(cljs.core.vector_QMARK_.call(null,entry__7018__auto__))
{return cljs.core._assoc.call(null,this__7017__auto____$1,cljs.core._nth.call(null,entry__7018__auto__,0),cljs.core._nth.call(null,entry__7018__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__7017__auto____$1,entry__7018__auto__);
}
});
datascript.DB.prototype.datascript$ISearch$ = true;
datascript.DB.prototype.datascript$ISearch$_search$arity$2 = (function (db,p__8486){var self__ = this;
var vec__8487 = p__8486;var e = cljs.core.nth.call(null,vec__8487,0,null);var a = cljs.core.nth.call(null,vec__8487,1,null);var v = cljs.core.nth.call(null,vec__8487,2,null);var tx = cljs.core.nth.call(null,vec__8487,3,null);var db__$1 = this;if(cljs.core.truth_(e))
{if(cljs.core.truth_(a))
{if(datascript.some_QMARK_.call(null,v))
{if(cljs.core.truth_(tx))
{return datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,a,v,tx,null)));
} else
{return datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,a,v,null,null)));
}
} else
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8487,e,a,v,tx){
return (function (p1__8470_SHARP_){return cljs.core._EQ_.call(null,tx,p1__8470_SHARP_.tx);
});})(db__$1,vec__8487,e,a,v,tx))
,datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,a,null,null,null))));
} else
{return datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,a,null,null,null)));
}
}
} else
{if(datascript.some_QMARK_.call(null,v))
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8487,e,a,v,tx){
return (function (p1__8471_SHARP_){return (cljs.core._EQ_.call(null,v,p1__8471_SHARP_.v)) && (cljs.core._EQ_.call(null,tx,p1__8471_SHARP_.tx));
});})(db__$1,vec__8487,e,a,v,tx))
,datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,null,null,null,null))));
} else
{return cljs.core.filter.call(null,((function (db__$1,vec__8487,e,a,v,tx){
return (function (p1__8472_SHARP_){return cljs.core._EQ_.call(null,v,p1__8472_SHARP_.v);
});})(db__$1,vec__8487,e,a,v,tx))
,datascript.btset.slice.call(null,self__.eavt,(new datascript.Datom(e,null,null,null,null))));
}
} else
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8487,e,a,v,tx){
return (function (p1__8473_SHARP_){return cljs.core._EQ_.call(null,tx,p1__8473_SHARP_.tx);
});})(db__$1,vec__8487,e,a,v,tx))
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
{return cljs.core.filter.call(null,((function (db__$1,vec__8487,e,a,v,tx){
return (function (p1__8474_SHARP_){return cljs.core._EQ_.call(null,tx,p1__8474_SHARP_.tx);
});})(db__$1,vec__8487,e,a,v,tx))
,datascript.btset.slice.call(null,self__.avet,(new datascript.Datom(null,a,v,null,null))));
} else
{return datascript.btset.slice.call(null,self__.avet,(new datascript.Datom(null,a,v,null,null)));
}
} else
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8487,e,a,v,tx){
return (function (p1__8475_SHARP_){return cljs.core._EQ_.call(null,tx,p1__8475_SHARP_.tx);
});})(db__$1,vec__8487,e,a,v,tx))
,datascript.btset.slice.call(null,self__.avet,(new datascript.Datom(null,a,null,null,null))));
} else
{return datascript.btset.slice.call(null,self__.avet,(new datascript.Datom(null,a,null,null,null)));
}
}
} else
{if(datascript.some_QMARK_.call(null,v))
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8487,e,a,v,tx){
return (function (p1__8476_SHARP_){return (cljs.core._EQ_.call(null,v,p1__8476_SHARP_.v)) && (cljs.core._EQ_.call(null,tx,p1__8476_SHARP_.tx));
});})(db__$1,vec__8487,e,a,v,tx))
,self__.eavt);
} else
{return cljs.core.filter.call(null,((function (db__$1,vec__8487,e,a,v,tx){
return (function (p1__8477_SHARP_){return cljs.core._EQ_.call(null,v,p1__8477_SHARP_.v);
});})(db__$1,vec__8487,e,a,v,tx))
,self__.eavt);
}
} else
{if(cljs.core.truth_(tx))
{return cljs.core.filter.call(null,((function (db__$1,vec__8487,e,a,v,tx){
return (function (p1__8478_SHARP_){return cljs.core._EQ_.call(null,tx,p1__8478_SHARP_.tx);
});})(db__$1,vec__8487,e,a,v,tx))
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
datascript.map__GT_DB = (function map__GT_DB(G__8481){return (new datascript.DB(new cljs.core.Keyword(null,"schema","schema",4400883987).cljs$core$IFn$_invoke$arity$1(G__8481),new cljs.core.Keyword(null,"eavt","eavt",1017010124).cljs$core$IFn$_invoke$arity$1(G__8481),new cljs.core.Keyword(null,"aevt","aevt",1016894804).cljs$core$IFn$_invoke$arity$1(G__8481),new cljs.core.Keyword(null,"avet","avet",1016910614).cljs$core$IFn$_invoke$arity$1(G__8481),new cljs.core.Keyword(null,"max-eid","max-eid",1856848841).cljs$core$IFn$_invoke$arity$1(G__8481),new cljs.core.Keyword(null,"max-tx","max-tx",4227685119).cljs$core$IFn$_invoke$arity$1(G__8481),null,cljs.core.dissoc.call(null,G__8481,new cljs.core.Keyword(null,"schema","schema",4400883987),new cljs.core.Keyword(null,"eavt","eavt",1017010124),new cljs.core.Keyword(null,"aevt","aevt",1016894804),new cljs.core.Keyword(null,"avet","avet",1016910614),new cljs.core.Keyword(null,"max-eid","max-eid",1856848841),new cljs.core.Keyword(null,"max-tx","max-tx",4227685119))));
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
datascript.TxReport.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__7014__auto__,k8489,else__7015__auto__){var self__ = this;
var this__7014__auto____$1 = this;var G__8491 = (((k8489 instanceof cljs.core.Keyword))?k8489.fqn:null);var caseval__8618;
switch (G__8491){
case "tempids":
caseval__8618=self__.tempids
break;
case "tx-data":
caseval__8618=self__.tx_data
break;
case "db-after":
caseval__8618=self__.db_after
break;
case "db-before":
caseval__8618=self__.db_before
break;
default:
caseval__8618=cljs.core.get.call(null,self__.__extmap,k8489,else__7015__auto__)
}
return caseval__8618;
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
datascript.TxReport.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__7019__auto__,k__7020__auto__,G__8488){var self__ = this;
var this__7019__auto____$1 = this;var pred__8492 = cljs.core.keyword_identical_QMARK_;var expr__8493 = k__7020__auto__;if(cljs.core.truth_(pred__8492.call(null,new cljs.core.Keyword(null,"db-before","db-before",3838846752),expr__8493)))
{return (new datascript.TxReport(G__8488,self__.db_after,self__.tx_data,self__.tempids,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8492.call(null,new cljs.core.Keyword(null,"db-after","db-after",1658340159),expr__8493)))
{return (new datascript.TxReport(self__.db_before,G__8488,self__.tx_data,self__.tempids,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8492.call(null,new cljs.core.Keyword(null,"tx-data","tx-data",4365248709),expr__8493)))
{return (new datascript.TxReport(self__.db_before,self__.db_after,G__8488,self__.tempids,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__8492.call(null,new cljs.core.Keyword(null,"tempids","tempids",3880764886),expr__8493)))
{return (new datascript.TxReport(self__.db_before,self__.db_after,self__.tx_data,G__8488,self__.__meta,self__.__extmap,null));
} else
{return (new datascript.TxReport(self__.db_before,self__.db_after,self__.tx_data,self__.tempids,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__7020__auto__,G__8488),null));
}
}
}
}
});
datascript.TxReport.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__7024__auto__){var self__ = this;
var this__7024__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"db-before","db-before",3838846752),self__.db_before],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"db-after","db-after",1658340159),self__.db_after],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"tx-data","tx-data",4365248709),self__.tx_data],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"tempids","tempids",3880764886),self__.tempids],null))], null),self__.__extmap));
});
datascript.TxReport.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__7011__auto__,G__8488){var self__ = this;
var this__7011__auto____$1 = this;return (new datascript.TxReport(self__.db_before,self__.db_after,self__.tx_data,self__.tempids,G__8488,self__.__extmap,self__.__hash));
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
datascript.map__GT_TxReport = (function map__GT_TxReport(G__8490){return (new datascript.TxReport(new cljs.core.Keyword(null,"db-before","db-before",3838846752).cljs$core$IFn$_invoke$arity$1(G__8490),new cljs.core.Keyword(null,"db-after","db-after",1658340159).cljs$core$IFn$_invoke$arity$1(G__8490),new cljs.core.Keyword(null,"tx-data","tx-data",4365248709).cljs$core$IFn$_invoke$arity$1(G__8490),new cljs.core.Keyword(null,"tempids","tempids",3880764886).cljs$core$IFn$_invoke$arity$1(G__8490),null,cljs.core.dissoc.call(null,G__8490,new cljs.core.Keyword(null,"db-before","db-before",3838846752),new cljs.core.Keyword(null,"db-after","db-after",1658340159),new cljs.core.Keyword(null,"tx-data","tx-data",4365248709),new cljs.core.Keyword(null,"tempids","tempids",3880764886))));
});
datascript.multival_QMARK_ = (function multival_QMARK_(db,attr){return cljs.core._EQ_.call(null,cljs.core.get_in.call(null,db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"schema","schema",4400883987),attr,new cljs.core.Keyword("db","cardinality","db/cardinality",1859321681)], null)),new cljs.core.Keyword("db.cardinality","many","db.cardinality/many",2499141178));
});
datascript.ref_QMARK_ = (function ref_QMARK_(db,attr){return cljs.core._EQ_.call(null,cljs.core.get_in.call(null,db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"schema","schema",4400883987),attr,new cljs.core.Keyword("db","valueType","db/valueType",4543387286)], null)),new cljs.core.Keyword("db.type","ref","db.type/ref",2629452693));
});
datascript.match_tuple = (function match_tuple(tuple,pattern){return cljs.core.every_QMARK_.call(null,cljs.core.true_QMARK_,cljs.core.map.call(null,(function (p1__8496_SHARP_,p2__8495_SHARP_){return ((p2__8495_SHARP_ == null)) || (cljs.core._EQ_.call(null,p1__8496_SHARP_,p2__8495_SHARP_));
}),tuple,pattern));
});
datascript.search = (function search(data,pattern){if((function (){var G__8501 = data;if(G__8501)
{var bit__7076__auto__ = null;if(cljs.core.truth_((function (){var or__6426__auto__ = bit__7076__auto__;if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return G__8501.datascript$ISearch$;
}
})()))
{return true;
} else
{if((!G__8501.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,datascript.ISearch,G__8501);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,datascript.ISearch,G__8501);
}
})())
{return datascript._search.call(null,data,pattern);
} else
{if((function (){var or__6426__auto__ = (function (){var G__8503 = data;if(G__8503)
{var bit__7076__auto__ = (G__8503.cljs$lang$protocol_mask$partition0$ & 8388608);if((bit__7076__auto__) || (G__8503.cljs$core$ISeqable$))
{return true;
} else
{if((!G__8503.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__8503);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__8503);
}
})();if(or__6426__auto__)
{return or__6426__auto__;
} else
{return data instanceof Array;
}
})())
{return cljs.core.filter.call(null,(function (p1__8497_SHARP_){return datascript.match_tuple.call(null,p1__8497_SHARP_,pattern);
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
datascript.advance_max_eid = (function advance_max_eid(db,eid){var G__8505 = db;var G__8505__$1 = (((eid > new cljs.core.Keyword(null,"max-eid","max-eid",1856848841).cljs$core$IFn$_invoke$arity$1(db)))?cljs.core.assoc.call(null,G__8505,new cljs.core.Keyword(null,"max-eid","max-eid",1856848841),eid):G__8505);return G__8505__$1;
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
return (function iter__8514(s__8515){return (new cljs.core.LazySeq(null,((function (eid){
return (function (){var s__8515__$1 = s__8515;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__8515__$1);if(temp__4126__auto__)
{var xs__4624__auto__ = temp__4126__auto__;var vec__8521 = cljs.core.first.call(null,xs__4624__auto__);var a = cljs.core.nth.call(null,vec__8521,0,null);var vs = cljs.core.nth.call(null,vec__8521,1,null);var iterys__7147__auto__ = ((function (s__8515__$1,vec__8521,a,vs,xs__4624__auto__,temp__4126__auto__,eid){
return (function iter__8516(s__8517){return (new cljs.core.LazySeq(null,((function (s__8515__$1,vec__8521,a,vs,xs__4624__auto__,temp__4126__auto__,eid){
return (function (){var s__8517__$1 = s__8517;while(true){
var temp__4126__auto____$1 = cljs.core.seq.call(null,s__8517__$1);if(temp__4126__auto____$1)
{var s__8517__$2 = temp__4126__auto____$1;if(cljs.core.chunked_seq_QMARK_.call(null,s__8517__$2))
{var c__7149__auto__ = cljs.core.chunk_first.call(null,s__8517__$2);var size__7150__auto__ = cljs.core.count.call(null,c__7149__auto__);var b__8519 = cljs.core.chunk_buffer.call(null,size__7150__auto__);if((function (){var i__8518 = 0;while(true){
if((i__8518 < size__7150__auto__))
{var v = cljs.core._nth.call(null,c__7149__auto__,i__8518);cljs.core.chunk_append.call(null,b__8519,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db","add","db/add",1014207040),eid,a,v], null));
{
var G__8619 = (i__8518 + 1);
i__8518 = G__8619;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8519),iter__8516.call(null,cljs.core.chunk_rest.call(null,s__8517__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8519),null);
}
} else
{var v = cljs.core.first.call(null,s__8517__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db","add","db/add",1014207040),eid,a,v], null),iter__8516.call(null,cljs.core.rest.call(null,s__8517__$2)));
}
} else
{return null;
}
break;
}
});})(s__8515__$1,vec__8521,a,vs,xs__4624__auto__,temp__4126__auto__,eid))
,null,null));
});})(s__8515__$1,vec__8521,a,vs,xs__4624__auto__,temp__4126__auto__,eid))
;var fs__7148__auto__ = cljs.core.seq.call(null,iterys__7147__auto__.call(null,(((cljs.core.sequential_QMARK_.call(null,vs)) && (datascript.multival_QMARK_.call(null,db,a)))?vs:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [vs], null))));if(fs__7148__auto__)
{return cljs.core.concat.call(null,fs__7148__auto__,iter__8514.call(null,cljs.core.rest.call(null,s__8515__$1)));
} else
{{
var G__8620 = cljs.core.rest.call(null,s__8515__$1);
s__8515__$1 = G__8620;
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
datascript.transact_add = (function transact_add(report,p__8522){var vec__8524 = p__8522;var _ = cljs.core.nth.call(null,vec__8524,0,null);var e = cljs.core.nth.call(null,vec__8524,1,null);var a = cljs.core.nth.call(null,vec__8524,2,null);var v = cljs.core.nth.call(null,vec__8524,3,null);var tx = datascript.current_tx.call(null,report);var db = new cljs.core.Keyword(null,"db-after","db-after",1658340159).cljs$core$IFn$_invoke$arity$1(report);var datom = (new datascript.Datom(e,a,v,tx,true));if(datascript.multival_QMARK_.call(null,db,a))
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
datascript.transact_entities = (function transact_entities(report,p__8525){while(true){
var vec__8529 = p__8525;var entity = cljs.core.nth.call(null,vec__8529,0,null);var entities = cljs.core.nthnext.call(null,vec__8529,1);var es = vec__8529;var db = new cljs.core.Keyword(null,"db-after","db-after",1658340159).cljs$core$IFn$_invoke$arity$1(report);if((entity == null))
{return cljs.core.update_in.call(null,report,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db-after","db-after",1658340159),new cljs.core.Keyword(null,"max-tx","max-tx",4227685119)], null),cljs.core.inc);
} else
{if(cljs.core.map_QMARK_.call(null,entity))
{if(cljs.core.truth_(new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(entity)))
{{
var G__8621 = report;
var G__8622 = cljs.core.concat.call(null,datascript.explode.call(null,db,entity),entities);
report = G__8621;
p__8525 = G__8622;
continue;
}
} else
{var eid = datascript.next_eid.call(null,db);var entity__$1 = cljs.core.assoc.call(null,entity,new cljs.core.Keyword("db","id","db/id",1014111942),eid);{
var G__8623 = datascript.allocate_eid.call(null,report,eid);
var G__8624 = cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [entity__$1], null),entities);
report = G__8623;
p__8525 = G__8624;
continue;
}
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{var vec__8530 = entity;var op = cljs.core.nth.call(null,vec__8530,0,null);var e = cljs.core.nth.call(null,vec__8530,1,null);var a = cljs.core.nth.call(null,vec__8530,2,null);var v = cljs.core.nth.call(null,vec__8530,3,null);if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db.fn","call","db.fn/call",2901959894)))
{var vec__8531 = entity;var _ = cljs.core.nth.call(null,vec__8531,0,null);var f = cljs.core.nth.call(null,vec__8531,1,null);var args = cljs.core.nthnext.call(null,vec__8531,2);{
var G__8625 = report;
var G__8626 = cljs.core.concat.call(null,cljs.core.apply.call(null,f,db,args),entities);
report = G__8625;
p__8525 = G__8626;
continue;
}
} else
{if((e < 0))
{var temp__4124__auto__ = cljs.core.get_in.call(null,report,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tempids","tempids",3880764886),e], null));if(cljs.core.truth_(temp__4124__auto__))
{var eid = temp__4124__auto__;{
var G__8627 = report;
var G__8628 = cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [op,eid,a,v], null)], null),entities);
report = G__8627;
p__8525 = G__8628;
continue;
}
} else
{{
var G__8629 = datascript.allocate_eid.call(null,report,e,datascript.next_eid.call(null,db));
var G__8630 = es;
report = G__8629;
p__8525 = G__8630;
continue;
}
}
} else
{if((datascript.ref_QMARK_.call(null,db,a)) && ((v < 0)))
{var temp__4124__auto__ = cljs.core.get_in.call(null,report,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tempids","tempids",3880764886),v], null));if(cljs.core.truth_(temp__4124__auto__))
{var vid = temp__4124__auto__;{
var G__8631 = report;
var G__8632 = cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [op,e,a,vid], null)], null),entities);
report = G__8631;
p__8525 = G__8632;
continue;
}
} else
{{
var G__8633 = datascript.allocate_eid.call(null,report,v,datascript.next_eid.call(null,db));
var G__8634 = es;
report = G__8633;
p__8525 = G__8634;
continue;
}
}
} else
{if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db","add","db/add",1014207040)))
{{
var G__8635 = datascript.transact_add.call(null,report,entity);
var G__8636 = entities;
report = G__8635;
p__8525 = G__8636;
continue;
}
} else
{if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db","retract","db/retract",2112480480)))
{var temp__4124__auto__ = cljs.core.first.call(null,datascript._search.call(null,db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a,v], null)));if(cljs.core.truth_(temp__4124__auto__))
{var old_datom = temp__4124__auto__;{
var G__8637 = datascript.transact_retract_datom.call(null,report,old_datom);
var G__8638 = entities;
report = G__8637;
p__8525 = G__8638;
continue;
}
} else
{{
var G__8639 = report;
var G__8640 = entities;
report = G__8639;
p__8525 = G__8640;
continue;
}
}
} else
{if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db.fn","retractAttribute","db.fn/retractAttribute",3416849171)))
{var datoms = datascript._search.call(null,db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,a], null));{
var G__8641 = cljs.core.reduce.call(null,datascript.transact_retract_datom,report,datoms);
var G__8642 = entities;
report = G__8641;
p__8525 = G__8642;
continue;
}
} else
{if(cljs.core._EQ_.call(null,op,new cljs.core.Keyword("db.fn","retractEntity","db.fn/retractEntity",4213852396)))
{var datoms = datascript._search.call(null,db,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [e], null));{
var G__8643 = cljs.core.reduce.call(null,datascript.transact_retract_datom,report,datoms);
var G__8644 = entities;
report = G__8643;
p__8525 = G__8644;
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
datascript.bind_symbols = (function bind_symbols(form,scope){return cljs.core.map.call(null,(function (p1__8532_SHARP_){return datascript.bind_symbol.call(null,p1__8532_SHARP_,scope);
}),form);
});
datascript.search_datoms = (function search_datoms(source,where,scope){return datascript.search.call(null,datascript.bind_symbol.call(null,source,scope),datascript.bind_symbols.call(null,where,scope));
});
datascript.populate_scope = (function populate_scope(scope,where,datom){return cljs.core.into.call(null,scope,cljs.core.remove.call(null,cljs.core.nil_QMARK_,cljs.core.map.call(null,(function (p1__8533_SHARP_,p2__8534_SHARP_){if(((p1__8533_SHARP_ instanceof cljs.core.Symbol)) && (!(cljs.core.contains_QMARK_.call(null,scope,p1__8533_SHARP_))))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__8533_SHARP_,p2__8534_SHARP_], null);
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
_differ_QMARK_.cljs$lang$applyTo = (function (arglist__8645){
var xs = cljs.core.seq(arglist__8645);
return _differ_QMARK___delegate(xs);
});
_differ_QMARK_.cljs$core$IFn$_invoke$arity$variadic = _differ_QMARK___delegate;
return _differ_QMARK_;
})()
;
datascript.built_ins = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Symbol(null,"true?","true?",-1529891286,null),new cljs.core.Symbol(null,"odd?","odd?",-1637125463,null),new cljs.core.Symbol(null,">=",">=",-1640529544,null),new cljs.core.Symbol(null,">",">",-1640531465,null),new cljs.core.Symbol(null,"nil?","nil?",-1637150201,null),new cljs.core.Symbol(null,"inc","inc",-1640427113,null),new cljs.core.Symbol(null,"/","/",-1640531480,null),new cljs.core.Symbol(null,"quot","quot",-1637049150,null),new cljs.core.Symbol(null,"false?","false?",1372554549,null),new cljs.core.Symbol(null,"-differ?","-differ?",1135976441,null),new cljs.core.Symbol(null,"<=","<=",-1640529606,null),new cljs.core.Symbol(null,"=","=",-1640531466,null),new cljs.core.Symbol(null,"min","min",-1640423413,null),new cljs.core.Symbol(null,"+","+",-1640531484,null),new cljs.core.Symbol(null,"==","==",-1640529575,null),new cljs.core.Symbol(null,"max","max",-1640423651,null),new cljs.core.Symbol(null,"*","*",-1640531485,null),new cljs.core.Symbol(null,"zero?","zero?",-1524740016,null),new cljs.core.Symbol(null,"!=","!=",-1640530443,null),new cljs.core.Symbol(null,"dec","dec",-1640432197,null),new cljs.core.Symbol(null,"not=","not=",-1637144189,null),new cljs.core.Symbol(null,"<","<",-1640531467,null),new cljs.core.Symbol(null,"-","-",-1640531482,null),new cljs.core.Symbol(null,"pos?","pos?",-1637084636,null),new cljs.core.Symbol(null,"mod","mod",-1640423237,null),new cljs.core.Symbol(null,"rem","rem",-1640418733,null),new cljs.core.Symbol(null,"even?","even?",-1543640034,null),new cljs.core.Symbol(null,"neg?","neg?",-1637154200,null)],[cljs.core.true_QMARK_,cljs.core.odd_QMARK_,cljs.core._GT__EQ_,cljs.core._GT_,cljs.core.nil_QMARK_,cljs.core.inc,cljs.core._SLASH_,cljs.core.quot,cljs.core.false_QMARK_,datascript._differ_QMARK_,cljs.core._LT__EQ_,cljs.core._EQ_,cljs.core.min,cljs.core._PLUS_,cljs.core._EQ__EQ_,cljs.core.max,cljs.core._STAR_,cljs.core.zero_QMARK_,cljs.core.not_EQ_,cljs.core.dec,cljs.core.not_EQ_,cljs.core._LT_,cljs.core._,cljs.core.pos_QMARK_,cljs.core.mod,cljs.core.rem,cljs.core.even_QMARK_,cljs.core.neg_QMARK_]);
datascript.call = (function call(p__8535,scope){var vec__8537 = p__8535;var f = cljs.core.nth.call(null,vec__8537,0,null);var args = cljs.core.nthnext.call(null,vec__8537,1);var bound_args = datascript.bind_symbols.call(null,args,scope);var f__$1 = (function (){var or__6426__auto__ = datascript.built_ins.call(null,f);if(cljs.core.truth_(or__6426__auto__))
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
{return (cljs.core.sequential_QMARK_.call(null,form)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,form),cljs.core.count.call(null,pattern))) && (cljs.core.every_QMARK_.call(null,(function (p__8544){var vec__8545 = p__8544;var pattern_el = cljs.core.nth.call(null,vec__8545,0,null);var form_el = cljs.core.nth.call(null,vec__8545,1,null);return looks_like_QMARK_.call(null,pattern_el,form_el);
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
datascript.collect = (function collect(f,coll){return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,(function (p1__8546_SHARP_,p2__8547_SHARP_){return cljs.core.reduce.call(null,cljs.core.conj_BANG_,p1__8546_SHARP_,f.call(null,p2__8547_SHARP_));
}),cljs.core.transient$.call(null,cljs.core.PersistentHashSet.EMPTY),coll));
});
datascript.bind_rule_branch = (function bind_rule_branch(branch,call_args,context){var vec__8555 = branch;var vec__8556 = cljs.core.nth.call(null,vec__8555,0,null);var rule = cljs.core.nth.call(null,vec__8556,0,null);var local_args = cljs.core.nthnext.call(null,vec__8556,1);var body = cljs.core.nthnext.call(null,vec__8555,1);var replacements = cljs.core.zipmap.call(null,local_args,call_args);var seqid = new cljs.core.Keyword(null,"__depth","__depth",2242649685).cljs$core$IFn$_invoke$arity$2(context,0);var bound_body = clojure.walk.postwalk.call(null,((function (vec__8555,vec__8556,rule,local_args,body,replacements,seqid){
return (function (p1__8548_SHARP_){if(((p1__8548_SHARP_ instanceof cljs.core.Symbol)) && (cljs.core._EQ_.call(null,"?",cljs.core.first.call(null,cljs.core.name.call(null,p1__8548_SHARP_)))))
{var or__6426__auto__ = replacements.call(null,p1__8548_SHARP_);if(cljs.core.truth_(or__6426__auto__))
{return or__6426__auto__;
} else
{return cljs.core.symbol.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,p1__8548_SHARP_))+"__auto__"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(seqid)));
}
} else
{return p1__8548_SHARP_;
}
});})(vec__8555,vec__8556,rule,local_args,body,replacements,seqid))
,body);return cljs.core.concat.call(null,(function (){var iter__7151__auto__ = ((function (vec__8555,vec__8556,rule,local_args,body,replacements,seqid,bound_body){
return (function iter__8557(s__8558){return (new cljs.core.LazySeq(null,((function (vec__8555,vec__8556,rule,local_args,body,replacements,seqid,bound_body){
return (function (){var s__8558__$1 = s__8558;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__8558__$1);if(temp__4126__auto__)
{var s__8558__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__8558__$2))
{var c__7149__auto__ = cljs.core.chunk_first.call(null,s__8558__$2);var size__7150__auto__ = cljs.core.count.call(null,c__7149__auto__);var b__8560 = cljs.core.chunk_buffer.call(null,size__7150__auto__);if((function (){var i__8559 = 0;while(true){
if((i__8559 < size__7150__auto__))
{var prev_call_args = cljs.core._nth.call(null,c__7149__auto__,i__8559);cljs.core.chunk_append.call(null,b__8560,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"-differ?","-differ?",1135976441,null)], null),call_args,prev_call_args)], null));
{
var G__8646 = (i__8559 + 1);
i__8559 = G__8646;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8560),iter__8557.call(null,cljs.core.chunk_rest.call(null,s__8558__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8560),null);
}
} else
{var prev_call_args = cljs.core.first.call(null,s__8558__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"-differ?","-differ?",1135976441,null)], null),call_args,prev_call_args)], null),iter__8557.call(null,cljs.core.rest.call(null,s__8558__$2)));
}
} else
{return null;
}
break;
}
});})(vec__8555,vec__8556,rule,local_args,body,replacements,seqid,bound_body))
,null,null));
});})(vec__8555,vec__8556,rule,local_args,body,replacements,seqid,bound_body))
;return iter__7151__auto__.call(null,cljs.core.get.call(null,context,rule));
})(),bound_body);
});
datascript._q = (function _q(in_PLUS_sources,wheres,scope){while(true){
if(cljs.core.truth_(cljs.core.not_empty.call(null,in_PLUS_sources)))
{var vec__8574 = cljs.core.first.call(null,in_PLUS_sources);var in$ = cljs.core.nth.call(null,vec__8574,0,null);var source = cljs.core.nth.call(null,vec__8574,1,null);var pred__8575 = datascript.looks_like_QMARK_;var expr__8576 = in$;if(cljs.core.truth_(pred__8575.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1640531432,null),new cljs.core.Symbol(null,"...","...",-1640485849,null)], null),expr__8576)))
{return datascript.collect.call(null,((function (in_PLUS_sources,wheres,scope,pred__8575,expr__8576,vec__8574,in$,source){
return (function (p1__8561_SHARP_){return _q.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,in$),p1__8561_SHARP_], null)], null),cljs.core.next.call(null,in_PLUS_sources)),wheres,scope);
});})(in_PLUS_sources,wheres,scope,pred__8575,expr__8576,vec__8574,in$,source))
,source);
} else
{if(cljs.core.truth_(pred__8575.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null)], null),expr__8576)))
{return datascript.collect.call(null,((function (in_PLUS_sources,wheres,scope,pred__8575,expr__8576,vec__8574,in$,source){
return (function (p1__8562_SHARP_){return _q.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,in$),p1__8562_SHARP_], null)], null),cljs.core.next.call(null,in_PLUS_sources)),wheres,scope);
});})(in_PLUS_sources,wheres,scope,pred__8575,expr__8576,vec__8574,in$,source))
,source);
} else
{if(cljs.core.truth_(pred__8575.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null),expr__8576)))
{{
var G__8647 = cljs.core.concat.call(null,cljs.core.zipmap.call(null,in$,source),cljs.core.next.call(null,in_PLUS_sources));
var G__8648 = wheres;
var G__8649 = scope;
in_PLUS_sources = G__8647;
wheres = G__8648;
scope = G__8649;
continue;
}
} else
{if(cljs.core.truth_(pred__8575.call(null,new cljs.core.Symbol(null,"%","%",-1640531490,null),expr__8576)))
{var rules = ((typeof source === 'string')?cljs.reader.read_string.call(null,source):source);{
var G__8650 = cljs.core.next.call(null,in_PLUS_sources);
var G__8651 = wheres;
var G__8652 = cljs.core.assoc.call(null,scope,new cljs.core.Keyword(null,"__rules","__rules",2256051337),cljs.core.group_by.call(null,cljs.core.ffirst,rules));
in_PLUS_sources = G__8650;
wheres = G__8651;
scope = G__8652;
continue;
}
} else
{if(cljs.core.truth_(pred__8575.call(null,new cljs.core.Symbol(null,"_","_",-1640531432,null),expr__8576)))
{{
var G__8653 = cljs.core.next.call(null,in_PLUS_sources);
var G__8654 = wheres;
var G__8655 = cljs.core.assoc.call(null,scope,in$,source);
in_PLUS_sources = G__8653;
wheres = G__8654;
scope = G__8655;
continue;
}
} else
{throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__8576))));
}
}
}
}
}
} else
{if(cljs.core.truth_(cljs.core.not_empty.call(null,wheres)))
{var where = cljs.core.first.call(null,wheres);var temp__4124__auto__ = cljs.core.get.call(null,new cljs.core.Keyword(null,"__rules","__rules",2256051337).cljs$core$IFn$_invoke$arity$1(scope),cljs.core.first.call(null,where));if(cljs.core.truth_(temp__4124__auto__))
{var rule_branches = temp__4124__auto__;var vec__8578 = where;var rule = cljs.core.nth.call(null,vec__8578,0,null);var call_args = cljs.core.nthnext.call(null,vec__8578,1);var next_scope = cljs.core.update_in.call(null,cljs.core.update_in.call(null,scope,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"__rules_ctx","__rules_ctx",2834098801),rule], null),cljs.core.conj,call_args),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"__rules_ctx","__rules_ctx",2834098801),new cljs.core.Keyword(null,"__depth","__depth",2242649685)], null),cljs.core.inc);var next_wheres = cljs.core.next.call(null,wheres);return datascript.collect.call(null,((function (in_PLUS_sources,wheres,scope,vec__8578,rule,call_args,next_scope,next_wheres,rule_branches,temp__4124__auto__,where){
return (function (p1__8563_SHARP_){return _q.call(null,null,cljs.core.concat.call(null,datascript.bind_rule_branch.call(null,p1__8563_SHARP_,call_args,new cljs.core.Keyword(null,"__rules_ctx","__rules_ctx",2834098801).cljs$core$IFn$_invoke$arity$1(scope)),next_wheres),next_scope);
});})(in_PLUS_sources,wheres,scope,vec__8578,rule,call_args,next_scope,next_wheres,rule_branches,temp__4124__auto__,where))
,rule_branches);
} else
{var pred__8579 = datascript.looks_like_QMARK_;var expr__8580 = where;if(cljs.core.truth_(pred__8579.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null)], null),expr__8580)))
{if(cljs.core.truth_(datascript.call.call(null,cljs.core.first.call(null,where),scope)))
{{
var G__8656 = null;
var G__8657 = cljs.core.next.call(null,wheres);
var G__8658 = scope;
in_PLUS_sources = G__8656;
wheres = G__8657;
scope = G__8658;
continue;
}
} else
{return null;
}
} else
{if(cljs.core.truth_(pred__8579.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null),new cljs.core.Symbol(null,"_","_",-1640531432,null)], null),expr__8580)))
{var res = datascript.call.call(null,cljs.core.first.call(null,where),scope);{
var G__8659 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.second.call(null,where),res], null)], null);
var G__8660 = cljs.core.next.call(null,wheres);
var G__8661 = scope;
in_PLUS_sources = G__8659;
wheres = G__8660;
scope = G__8661;
continue;
}
} else
{if(cljs.core.truth_(pred__8579.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",-1640531485,null)], null),expr__8580)))
{var vec__8582 = datascript.parse_where.call(null,where);var source = cljs.core.nth.call(null,vec__8582,0,null);var where__$1 = cljs.core.nth.call(null,vec__8582,1,null);var found = datascript.search_datoms.call(null,source,where__$1,scope);return datascript.collect.call(null,((function (in_PLUS_sources,wheres,scope,vec__8582,source,where__$1,found,pred__8579,expr__8580,temp__4124__auto__,where){
return (function (p1__8564_SHARP_){return _q.call(null,null,cljs.core.next.call(null,wheres),datascript.populate_scope.call(null,scope,where__$1,p1__8564_SHARP_));
});})(in_PLUS_sources,wheres,scope,vec__8582,source,where__$1,found,pred__8579,expr__8580,temp__4124__auto__,where))
,found);
} else
{throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__8580))));
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
var G__8662 = null;
var G__8662__1 = (function (coll){return cljs.core.reduce.call(null,cljs.core.min,coll);
});
var G__8662__2 = (function (n,coll){return cljs.core.vec.call(null,cljs.core.reduce.call(null,(function (acc,x){if((cljs.core.count.call(null,acc) < n))
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
G__8662 = function(n,coll){
switch(arguments.length){
case 1:
return G__8662__1.call(this,n);
case 2:
return G__8662__2.call(this,n,coll);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__8662;
})()
,new cljs.core.Symbol(null,"max","max",-1640423651,null),(function() {
var G__8663 = null;
var G__8663__1 = (function (coll){return cljs.core.reduce.call(null,cljs.core.max,coll);
});
var G__8663__2 = (function (n,coll){return cljs.core.vec.call(null,cljs.core.reduce.call(null,(function (acc,x){if((cljs.core.count.call(null,acc) < n))
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
G__8663 = function(n,coll){
switch(arguments.length){
case 1:
return G__8663__1.call(this,n);
case 2:
return G__8663__2.call(this,n,coll);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__8663;
})()
,new cljs.core.Symbol(null,"sum","sum",-1640417276,null),(function (p1__8583_SHARP_){return cljs.core.reduce.call(null,cljs.core._PLUS_,0,p1__8583_SHARP_);
}),new cljs.core.Symbol(null,"rand","rand",-1637038626,null),(function() {
var G__8664 = null;
var G__8664__1 = (function (coll){return cljs.core.rand_nth.call(null,coll);
});
var G__8664__2 = (function (n,coll){return cljs.core.vec.call(null,cljs.core.repeatedly.call(null,n,(function (){return cljs.core.rand_nth.call(null,coll);
})));
});
G__8664 = function(n,coll){
switch(arguments.length){
case 1:
return G__8664__1.call(this,n);
case 2:
return G__8664__2.call(this,n,coll);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__8664;
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
{var vec__8586 = sym;var f = cljs.core.nth.call(null,vec__8586,0,null);var args = cljs.core.nthnext.call(null,vec__8586,1);var vals = cljs.core.map.call(null,((function (vec__8586,f,args){
return (function (p1__8584_SHARP_){return cljs.core.get.call(null,p1__8584_SHARP_,i);
});})(vec__8586,f,args))
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
return (function (p__8590){var vec__8591 = p__8590;var _ = cljs.core.nth.call(null,vec__8591,0,null);var results__$1 = cljs.core.nth.call(null,vec__8591,1,null);return datascript._aggregate.call(null,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(query),scope,results__$1);
});})(find))
,cljs.core.group_by.call(null,((function (find){
return (function (p1__8587_SHARP_){return datascript.aggr_group_key.call(null,find,p1__8587_SHARP_);
});})(find))
,results));
});
datascript.parse_query = (function parse_query(query){var parsed = cljs.core.PersistentArrayMap.EMPTY;var key = null;var qs = query;while(true){
var temp__4124__auto__ = cljs.core.first.call(null,qs);if(cljs.core.truth_(temp__4124__auto__))
{var q = temp__4124__auto__;if((q instanceof cljs.core.Keyword))
{{
var G__8665 = parsed;
var G__8666 = q;
var G__8667 = cljs.core.next.call(null,qs);
parsed = G__8665;
key = G__8666;
qs = G__8667;
continue;
}
} else
{{
var G__8668 = cljs.core.update_in.call(null,parsed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),q);
var G__8669 = key;
var G__8670 = cljs.core.next.call(null,qs);
parsed = G__8668;
key = G__8669;
qs = G__8670;
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
return (function (p1__8592_SHARP_){if(cljs.core.sequential_QMARK_.call(null,p1__8592_SHARP_))
{return cljs.core.last.call(null,p1__8592_SHARP_);
} else
{return p1__8592_SHARP_;
}
});})(query__$1,ins__GT_sources))
,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(query__$1)),new cljs.core.Keyword(null,"with","with",1017553976).cljs$core$IFn$_invoke$arity$1(query__$1));var results = datascript._q.call(null,ins__GT_sources,new cljs.core.Keyword(null,"where","where",1127002201).cljs$core$IFn$_invoke$arity$1(query__$1),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__find","__find",3824551179),find], null));var G__8595 = results;var G__8595__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"with","with",1017553976).cljs$core$IFn$_invoke$arity$1(query__$1))?cljs.core.mapv.call(null,((function (G__8595,query__$1,ins__GT_sources,find,results){
return (function (p1__8593_SHARP_){return cljs.core.subvec.call(null,p1__8593_SHARP_,0,cljs.core.count.call(null,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(query__$1)));
});})(G__8595,query__$1,ins__GT_sources,find,results))
,G__8595):G__8595);var G__8595__$2 = (cljs.core.truth_(cljs.core.not_empty.call(null,cljs.core.filter.call(null,cljs.core.sequential_QMARK_,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(query__$1))))?datascript.aggregate.call(null,query__$1,ins__GT_sources,G__8595__$1):G__8595__$1);return G__8595__$2;
};
var q = function (query,var_args){
var sources = null;if (arguments.length > 1) {
  sources = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return q__delegate.call(this,query,sources);};
q.cljs$lang$maxFixedArity = 1;
q.cljs$lang$applyTo = (function (arglist__8671){
var query = cljs.core.first(arglist__8671);
var sources = cljs.core.rest(arglist__8671);
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
var empty_db__delegate = function (p__8596){var vec__8598 = p__8596;var schema = cljs.core.nth.call(null,vec__8598,0,null);return (new datascript.DB(schema,datascript.btset.btset_by.call(null,datascript.cmp_datoms_eavt),datascript.btset.btset_by.call(null,datascript.cmp_datoms_aevt),datascript.btset.btset_by.call(null,datascript.cmp_datoms_avet),0,datascript.tx0));
};
var empty_db = function (var_args){
var p__8596 = null;if (arguments.length > 0) {
  p__8596 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return empty_db__delegate.call(this,p__8596);};
empty_db.cljs$lang$maxFixedArity = 0;
empty_db.cljs$lang$applyTo = (function (arglist__8672){
var p__8596 = cljs.core.seq(arglist__8672);
return empty_db__delegate(p__8596);
});
empty_db.cljs$core$IFn$_invoke$arity$variadic = empty_db__delegate;
return empty_db;
})()
;
/**
* @param {...*} var_args
*/
datascript.create_conn = (function() { 
var create_conn__delegate = function (p__8599){var vec__8601 = p__8599;var schema = cljs.core.nth.call(null,vec__8601,0,null);return cljs.core.atom.call(null,datascript.empty_db.call(null,schema),new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"listeners","listeners",4090152369),cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY)], null));
};
var create_conn = function (var_args){
var p__8599 = null;if (arguments.length > 0) {
  p__8599 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return create_conn__delegate.call(this,p__8599);};
create_conn.cljs$lang$maxFixedArity = 0;
create_conn.cljs$lang$applyTo = (function (arglist__8673){
var p__8599 = cljs.core.seq(arglist__8673);
return create_conn__delegate(p__8599);
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
datascript.transact_BANG_ = (function transact_BANG_(conn,entities){var report = datascript._transact_BANG_.call(null,conn,entities);var seq__8608_8674 = cljs.core.seq.call(null,cljs.core.deref.call(null,new cljs.core.Keyword(null,"listeners","listeners",4090152369).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,conn))));var chunk__8609_8675 = null;var count__8610_8676 = 0;var i__8611_8677 = 0;while(true){
if((i__8611_8677 < count__8610_8676))
{var vec__8612_8678 = cljs.core._nth.call(null,chunk__8609_8675,i__8611_8677);var __8679 = cljs.core.nth.call(null,vec__8612_8678,0,null);var callback_8680 = cljs.core.nth.call(null,vec__8612_8678,1,null);callback_8680.call(null,report);
{
var G__8681 = seq__8608_8674;
var G__8682 = chunk__8609_8675;
var G__8683 = count__8610_8676;
var G__8684 = (i__8611_8677 + 1);
seq__8608_8674 = G__8681;
chunk__8609_8675 = G__8682;
count__8610_8676 = G__8683;
i__8611_8677 = G__8684;
continue;
}
} else
{var temp__4126__auto___8685 = cljs.core.seq.call(null,seq__8608_8674);if(temp__4126__auto___8685)
{var seq__8608_8686__$1 = temp__4126__auto___8685;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8608_8686__$1))
{var c__7182__auto___8687 = cljs.core.chunk_first.call(null,seq__8608_8686__$1);{
var G__8688 = cljs.core.chunk_rest.call(null,seq__8608_8686__$1);
var G__8689 = c__7182__auto___8687;
var G__8690 = cljs.core.count.call(null,c__7182__auto___8687);
var G__8691 = 0;
seq__8608_8674 = G__8688;
chunk__8609_8675 = G__8689;
count__8610_8676 = G__8690;
i__8611_8677 = G__8691;
continue;
}
} else
{var vec__8613_8692 = cljs.core.first.call(null,seq__8608_8686__$1);var __8693 = cljs.core.nth.call(null,vec__8613_8692,0,null);var callback_8694 = cljs.core.nth.call(null,vec__8613_8692,1,null);callback_8694.call(null,report);
{
var G__8695 = cljs.core.next.call(null,seq__8608_8686__$1);
var G__8696 = null;
var G__8697 = 0;
var G__8698 = 0;
seq__8608_8674 = G__8695;
chunk__8609_8675 = G__8696;
count__8610_8676 = G__8697;
i__8611_8677 = G__8698;
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
datascript.components__GT_pattern = (function components__GT_pattern(index,cs){var G__8615 = (((index instanceof cljs.core.Keyword))?index.fqn:null);var caseval__8699;
switch (G__8615){
case "avet":
caseval__8699=(new datascript.Datom(cljs.core.nth.call(null,cs,2,null),cljs.core.nth.call(null,cs,0,null),cljs.core.nth.call(null,cs,1,null),cljs.core.nth.call(null,cs,3,null),null))
break;
case "aevt":
caseval__8699=(new datascript.Datom(cljs.core.nth.call(null,cs,1,null),cljs.core.nth.call(null,cs,0,null),cljs.core.nth.call(null,cs,2,null),cljs.core.nth.call(null,cs,3,null),null))
break;
case "eavt":
caseval__8699=(new datascript.Datom(cljs.core.nth.call(null,cs,0,null),cljs.core.nth.call(null,cs,1,null),cljs.core.nth.call(null,cs,2,null),cljs.core.nth.call(null,cs,3,null),null))
break;
default:
caseval__8699=(function(){throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(index))))})()
}
return caseval__8699;
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
datoms.cljs$lang$applyTo = (function (arglist__8700){
var db = cljs.core.first(arglist__8700);
arglist__8700 = cljs.core.next(arglist__8700);
var index = cljs.core.first(arglist__8700);
var cs = cljs.core.rest(arglist__8700);
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
seek_datoms.cljs$lang$applyTo = (function (arglist__8701){
var db = cljs.core.first(arglist__8701);
arglist__8701 = cljs.core.next(arglist__8701);
var index = cljs.core.first(arglist__8701);
var cs = cljs.core.rest(arglist__8701);
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
return datascript.listen_BANG_.call(null,lt.plugins.kukui.datascript.conn,new cljs.core.Keyword(null,"db-history","db-history",3844499895),(function (p1__8805_SHARP_){return cljs.core.swap_BANG_.call(null,lt.plugins.kukui.datascript.reports,cljs.core.conj,p1__8805_SHARP_);
}));
};
var reset_connection_BANG_ = function (var_args){
var args = null;if (arguments.length > 0) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return reset_connection_BANG___delegate.call(this,args);};
reset_connection_BANG_.cljs$lang$maxFixedArity = 0;
reset_connection_BANG_.cljs$lang$applyTo = (function (arglist__8810){
var args = cljs.core.seq(arglist__8810);
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
q.cljs$lang$applyTo = (function (arglist__8811){
var query = cljs.core.first(arglist__8811);
var args = cljs.core.rest(arglist__8811);
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
qf.cljs$lang$applyTo = (function (arglist__8812){
var query = cljs.core.first(arglist__8812);
var args = cljs.core.rest(arglist__8812);
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
var qe__delegate = function (query,args){return cljs.core.map.call(null,(function (p1__8806_SHARP_){return lt.plugins.kukui.datascript.entity.call(null,cljs.core.first.call(null,p1__8806_SHARP_));
}),cljs.core.apply.call(null,lt.plugins.kukui.datascript.q,query,args));
};
var qe = function (query,var_args){
var args = null;if (arguments.length > 1) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return qe__delegate.call(this,query,args);};
qe.cljs$lang$maxFixedArity = 1;
qe.cljs$lang$applyTo = (function (arglist__8813){
var query = cljs.core.first(arglist__8813);
var args = cljs.core.rest(arglist__8813);
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
var qae__delegate = function (query,args){var fns = cljs.core.map.call(null,(function (p1__8807_SHARP_){if(cljs.core.truth_((''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__8807_SHARP_)).startsWith("?e")))
{return lt.plugins.kukui.datascript.entity;
} else
{return cljs.core.identity;
}
}),new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(datascript.parse_query.call(null,query)));return cljs.core.map.call(null,((function (fns){
return (function (result){return cljs.core.mapv.call(null,((function (fns){
return (function (p1__8808_SHARP_,p2__8809_SHARP_){return p1__8808_SHARP_.call(null,p2__8809_SHARP_);
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
qae.cljs$lang$applyTo = (function (arglist__8814){
var query = cljs.core.first(arglist__8814);
var args = cljs.core.rest(arglist__8814);
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
var counter_8815 = cljs.core.atom.call(null,0);lt.plugins.kukui.datascript.tempid = ((function (counter_8815){
return (function tempid(){return cljs.core.swap_BANG_.call(null,counter_8815,cljs.core.dec);
});})(counter_8815))
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
* Named datalog queries - used mostly by query cmds
*/
lt.plugins.kukui.db.named_queries = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Symbol(null,"all-attr-counts","all-attr-counts",1985944621,null),new cljs.core.Symbol(null,"tagged-tags","tagged-tags",-1527225965,null),new cljs.core.Symbol(null,"all-attr-counts-for-ids","all-attr-counts-for-ids",-155822316,null),new cljs.core.Symbol(null,"ent-by-type","ent-by-type",-689599033,null),new cljs.core.Symbol(null,"ent-by-tags","ent-by-tags",-689622362,null),new cljs.core.Symbol(null,"local-by-tags-of-type","local-by-tags-of-type",-740892471,null),new cljs.core.Symbol(null,"or-tags","or-tags",1396963196,null),new cljs.core.Symbol(null,"ent-tds","ent-tds",1060817370,null),new cljs.core.Symbol(null,"tag-counts","tag-counts",1153504400,null),new cljs.core.Symbol(null,"named-ents","named-ents",-1967655755,null),new cljs.core.Symbol(null,"search-all-attr","search-all-attr",801034971,null),new cljs.core.Symbol(null,"or-ents","or-ents",1396529227,null),new cljs.core.Symbol(null,"ent-by-tags-of-type","ent-by-tags-of-type",808421961,null),new cljs.core.Symbol(null,"types-names","types-names",2093530797,null),new cljs.core.Symbol(null,"search-attr","search-attr",2068469935,null)],[new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?val","?val",-1638538181,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null)),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.Symbol(null,"?val","?val",-1638538181,null)], null)], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?tag1","?tag1",-1578797489,null),new cljs.core.Symbol(null,"?tag2","?tag2",-1578797488,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"tagged-ent-with","tagged-ent-with",-1271363230,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?t1","?t1",-1640467339,null),new cljs.core.Symbol(null,"?tag1","?tag1",-1578797489,null)),cljs.core.list(new cljs.core.Symbol(null,"tagged-with","tagged-with",-1527128512,null),new cljs.core.Symbol(null,"?t1","?t1",-1640467339,null),new cljs.core.Symbol(null,"?tag2","?tag2",-1578797488,null))], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?val","?val",-1638538181,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null)),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"...","...",-1640485849,null)], null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.Symbol(null,"?val","?val",-1638538181,null)], null)], null),new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"tagged-with","tagged-with",-1527128512,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null)], null),new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"tagged-with","tagged-with",-1527128512,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null)),cljs.core.list(new cljs.core.Symbol(null,"tagged-with","tagged-with",-1527128512,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null))], null),new cljs.core.PersistentVector(null, 14, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?tag-name","?tag-name",-356231210,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?input-type","?input-type",-1838801259,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"tagged-ent-with","tagged-ent-with",-1271363230,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?t1","?t1",-1640467339,null),new cljs.core.Symbol(null,"?tag-name","?tag-name",-356231210,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t1","?t1",-1640467339,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?input-type","?input-type",-1838801259,null)], null),cljs.core.list(new cljs.core.Symbol(null,"lines","lines",-1537554248,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null))], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null),new cljs.core.Symbol(null,"...","...",-1640485849,null)], null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"tagged-with","tagged-with",-1527128512,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null))], null),new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?tag-name","?tag-name",-356231210,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"type","type",1017479852),"td"], null),cljs.core.list(new cljs.core.Symbol(null,"tagged-ent-with","tagged-ent-with",-1271363230,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?t1","?t1",-1640467339,null),new cljs.core.Symbol(null,"?tag-name","?tag-name",-356231210,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t1","?t1",-1640467339,null),new cljs.core.Keyword(null,"type","type",1017479852),"priority"], null),cljs.core.list(new cljs.core.Symbol(null,"tagged-with","tagged-with",-1527128512,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null))], null),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null)),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"tagged-with","tagged-with",-1527128512,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null))], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?n","?n",-1640529464,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?n","?n",-1640529464,null)], null)], null),new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?search-fn","?search-fn",642178919,null),new cljs.core.Symbol(null,"?query","?query",271049122,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"_","_",-1640531432,null),new cljs.core.Symbol(null,"?val","?val",-1638538181,null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"?search-fn","?search-fn",642178919,null),new cljs.core.Symbol(null,"?query","?query",271049122,null),new cljs.core.Symbol(null,"?val","?val",-1638538181,null))], null)], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?input-name","?input-name",-1839003162,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?input-name","?input-name",-1839003162,null),new cljs.core.Symbol(null,"...","...",-1640485849,null)], null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?input-name","?input-name",-1839003162,null)], null)], null),new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?tag-name","?tag-name",-356231210,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null),new cljs.core.Symbol(null,"?input-type","?input-type",-1838801259,null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"tagged-ent-with","tagged-ent-with",-1271363230,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?t1","?t1",-1640467339,null),new cljs.core.Symbol(null,"?tag-name","?tag-name",-356231210,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t1","?t1",-1640467339,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?input-type","?input-type",-1838801259,null)], null),cljs.core.list(new cljs.core.Symbol(null,"tagged-with","tagged-with",-1527128512,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?input-tag","?input-tag",569829233,null))], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Symbol(null,"?name","?name",-1578975997,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?children","?children",2113480951,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?children","?children",2113480951,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?name","?name",-1578975997,null)], null)], null),new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?search-fn","?search-fn",642178919,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.Symbol(null,"?query","?query",271049122,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?attr","?attr",-1579344791,null),new cljs.core.Symbol(null,"?val","?val",-1638538181,null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"?search-fn","?search-fn",642178919,null),new cljs.core.Symbol(null,"?query","?query",271049122,null),new cljs.core.Symbol(null,"?val","?val",-1638538181,null))], null)], null)]);
lt.plugins.kukui.db.name_id_map = (function name_id_map(){return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,lt.plugins.kukui.datascript.q.call(null,new cljs.core.Symbol(null,"named-ents","named-ents",-1967655755,null).call(null,lt.plugins.kukui.db.named_queries)));
});
lt.plugins.kukui.db.find_by_file_and_line = (function find_by_file_and_line(file,line){return cljs.core.first.call(null,lt.plugins.kukui.datascript.qe.call(null,new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?line","?line",-1579027860,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"file","file",1017047278),new cljs.core.Symbol(null,"?file","?file",-1579206668,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Symbol(null,"?line","?line",-1579027860,null)], null)], null),file,line));
});
lt.plugins.kukui.db.__GT_nodes_STAR_ = (function __GT_nodes_STAR_(results){return cljs.core.map.call(null,(function (p__8818){var vec__8819 = p__8818;var id = cljs.core.nth.call(null,vec__8819,0,null);var tag_tuples = cljs.core.nth.call(null,vec__8819,1,null);return cljs.core.assoc.call(null,lt.plugins.kukui.datascript.entity.call(null,id),new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.set.call(null,cljs.core.keep.call(null,cljs.core.second,tag_tuples)));
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
lt.plugins.kukui.db.attr_counts_for_ids = (function attr_counts_for_ids(attr,ids){return cljs.core.sort_by.call(null,cljs.core.second,cljs.core._GT_,lt.plugins.kukui.datascript.q.call(null,new cljs.core.Symbol(null,"all-attr-counts-for-ids","all-attr-counts-for-ids",-155822316,null).call(null,lt.plugins.kukui.db.named_queries),attr,ids));
});
lt.plugins.kukui.db.all_attr_counts = (function all_attr_counts(attr){return cljs.core.sort_by.call(null,cljs.core.second,cljs.core._GT_,lt.plugins.kukui.datascript.q.call(null,new cljs.core.Symbol(null,"all-attr-counts","all-attr-counts",1985944621,null).call(null,lt.plugins.kukui.db.named_queries),attr));
});
/**
* Returns tag types for a given file range
*/
lt.plugins.kukui.db.local_tag_types = (function local_tag_types(file,lines){return lt.plugins.kukui.datascript.qf.call(null,new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"lines","lines",-1537554248,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.Symbol(null,"?t","?t",-1640529458,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t","?t",-1640529458,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null)], null),lt.plugins.kukui.db.rules,file,cljs.core.first.call(null,lines),cljs.core.last.call(null,lines));
});
lt.plugins.kukui.db.tag_counts = (function tag_counts(){return cljs.core.sort_by.call(null,cljs.core.comp.call(null,cljs.core._,cljs.core.second),lt.plugins.kukui.datascript.q.call(null,new cljs.core.Symbol(null,"tag-counts","tag-counts",1153504400,null).call(null,lt.plugins.kukui.db.named_queries),lt.plugins.kukui.db.rules));
});
lt.plugins.kukui.db.__GT_tag_counts = (function __GT_tag_counts(results){return cljs.core.reduce.call(null,(function (p1__8820_SHARP_,p2__8821_SHARP_){return cljs.core.assoc_in.call(null,p1__8820_SHARP_,cljs.core.butlast.call(null,p2__8821_SHARP_),cljs.core.last.call(null,p2__8821_SHARP_));
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.mapcat.call(null,cljs.core.identity,cljs.core.vals.call(null,cljs.core.group_by.call(null,cljs.core.first,results))));
});
/**
* Returns a nested map of tag names and counts by tag type
*/
lt.plugins.kukui.db.tag_counts_by_type_and_tag = (function tag_counts_by_type_and_tag(file,lines){return lt.plugins.kukui.db.__GT_tag_counts.call(null,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 14, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null)),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"lines","lines",-1537554248,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Symbol(null,"?first","?first",260545418,null),new cljs.core.Symbol(null,"?last","?last",-1579035378,null)),cljs.core.list(new cljs.core.Symbol(null,"tagged-ent-with","tagged-ent-with",-1271363230,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?t","?t",-1640529458,null),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t","?t",-1640529458,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null)], null),lt.plugins.kukui.db.rules,file,cljs.core.first.call(null,lines),cljs.core.last.call(null,lines)));
});
lt.plugins.kukui.db.tag_counts_by_type_and_tag_for_ids = (function tag_counts_by_type_and_tag_for_ids(ids){return lt.plugins.kukui.db.__GT_tag_counts.call(null,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null)),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"...","...",-1640485849,null)], null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"tagged-ent-with","tagged-ent-with",-1271363230,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?t","?t",-1640529458,null),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t","?t",-1640529458,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null)], null),lt.plugins.kukui.db.rules,ids));
});
lt.plugins.kukui.db.all_tag_counts_by_type_and_tag = (function all_tag_counts_by_type_and_tag(){return lt.plugins.kukui.db.__GT_tag_counts.call(null,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null)),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"%","%",-1640531490,null),new cljs.core.Keyword(null,"where","where",1127002201),cljs.core.list(new cljs.core.Symbol(null,"tagged-ent-with","tagged-ent-with",-1271363230,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Symbol(null,"?t","?t",-1640529458,null),new cljs.core.Symbol(null,"?tag","?tag",-1638540108,null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?t","?t",-1640529458,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null)], null),lt.plugins.kukui.db.rules));
});
/**
* Returns a list of types with each type having entity names of that type
*/
lt.plugins.kukui.db.types_and_names = (function types_and_names(){return cljs.core.map.call(null,(function (p__8824){var vec__8825 = p__8824;var type = cljs.core.nth.call(null,vec__8825,0,null);var pairs = cljs.core.nth.call(null,vec__8825,1,null);return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1017479852),type,new cljs.core.Keyword(null,"names","names",1118489274),cljs.core.map.call(null,cljs.core.second,pairs)], null);
}),cljs.core.group_by.call(null,cljs.core.first,lt.plugins.kukui.datascript.q.call(null,new cljs.core.Symbol(null,"types-names","types-names",2093530797,null).call(null,lt.plugins.kukui.db.named_queries))));
});
lt.plugins.kukui.db.must_have_unique_name = (function must_have_unique_name(entities){var existing_tags = lt.plugins.kukui.db.name_id_map.call(null);var names = cljs.core.set.call(null,cljs.core.keys.call(null,existing_tags));var invalid = cljs.core.filter.call(null,((function (existing_tags,names){
return (function (p1__8826_SHARP_){var and__6414__auto__ = new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__8826_SHARP_);if(cljs.core.truth_(and__6414__auto__))
{return cljs.core.contains_QMARK_.call(null,names,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__8826_SHARP_));
} else
{return and__6414__auto__;
}
});})(existing_tags,names))
,entities);var invalid__$1 = cljs.core.into.call(null,invalid,cljs.core.mapcat.call(null,((function (existing_tags,names,invalid){
return (function (p1__8827_SHARP_){if((cljs.core.count.call(null,p1__8827_SHARP_) > 1))
{return p1__8827_SHARP_;
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
lt.plugins.kukui.db.must_have_string_name = (function must_have_string_name(entities){var temp__4126__auto___8833 = cljs.core.seq.call(null,cljs.core.remove.call(null,(function (p1__8829_SHARP_){return typeof new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__8829_SHARP_) === 'string';
}),cljs.core.filter.call(null,(function (p1__8828_SHARP_){return cljs.core.contains_QMARK_.call(null,p1__8828_SHARP_,new cljs.core.Keyword(null,"name","name",1017277949));
}),entities)));if(temp__4126__auto___8833)
{var invalid_8834 = temp__4126__auto___8833;cljs.core.prn.call(null,"INVALID",invalid_8834);
throw cljs.core.ex_info.call(null,("Names must be strings:"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.map.call(null,new cljs.core.Keyword(null,"name","name",1017277949),invalid_8834))),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"invalid","invalid",2973689193),invalid_8834], null));
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
return (function (p1__8954_SHARP_){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__8954_SHARP_),tag_name);
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
return (function (p1__8955_SHARP_){return cljs.core.assoc.call(null,p1__8955_SHARP_,new cljs.core.Keyword("db","id","db/id",1014111942),lt.plugins.kukui.datascript.tempid.call(null));
});})(new_tags))
,entities);var tag_id = cljs.core.partial.call(null,lt.plugins.kukui.sync.__GT_tag_id,entities__$1,lt.plugins.kukui.db.name_id_map.call(null),new_tags);var entities_with_tags = cljs.core.doall.call(null,cljs.core.mapcat.call(null,((function (new_tags,entities__$1,tag_id){
return (function (ent){return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.dissoc.call(null,ent,new cljs.core.Keyword(null,"tags","tags",1017456523))], null),cljs.core.map.call(null,((function (new_tags,entities__$1,tag_id){
return (function (p1__8956_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword("db","id","db/id",1014111942),new cljs.core.Keyword(null,"tags","tags",1017456523)],[new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(ent),tag_id.call(null,p1__8956_SHARP_)]);
});})(new_tags,entities__$1,tag_id))
,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(ent)));
});})(new_tags,entities__$1,tag_id))
,entities__$1));return cljs.core.into.call(null,cljs.core.map.call(null,((function (new_tags,entities__$1,tag_id,entities_with_tags){
return (function (p__8959){var vec__8960 = p__8959;var tag = cljs.core.nth.call(null,vec__8960,0,null);var id = cljs.core.nth.call(null,vec__8960,1,null);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("db","id","db/id",1014111942),id,new cljs.core.Keyword(null,"name","name",1017277949),tag,new cljs.core.Keyword(null,"type","type",1017479852),lt.plugins.kukui.db.unknown_type], null);
});})(new_tags,entities__$1,tag_id,entities_with_tags))
,cljs.core.deref.call(null,new_tags)),entities_with_tags);
});
lt.plugins.kukui.sync.add_types = (function add_types(entities){var existing_types = clojure.set.union.call(null,cljs.core.set.call(null,lt.plugins.kukui.datascript.qf.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?name","?name",-1578975997,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"type","type",1017479852),"type"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Symbol(null,"?name","?name",-1578975997,null)], null)], null))),cljs.core.set.call(null,lt.plugins.kukui.datascript.qf.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?type","?type",-1578774094,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Symbol(null,"?type","?type",-1578774094,null)], null)], null))));return cljs.core.into.call(null,entities,cljs.core.map.call(null,((function (existing_types){
return (function (p1__8962_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"type","type",1017479852)],[p1__8962_SHARP_,lt.plugins.kukui.db.root_type]);
});})(existing_types))
,cljs.core.remove.call(null,((function (existing_types){
return (function (p1__8961_SHARP_){return cljs.core.contains_QMARK_.call(null,existing_types,p1__8961_SHARP_);
});})(existing_types))
,cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"type","type",1017479852),entities)))));
});
lt.plugins.kukui.sync.add_ids_by_line = (function add_ids_by_line(file,nodes){var line_entities = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,lt.plugins.kukui.datascript.q.call(null,new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?l","?l",-1640529466,null),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"in","in",1013907607),new cljs.core.Symbol(null,"$","$",-1640531491,null),new cljs.core.Symbol(null,"?file","?file",-1579206668,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Symbol(null,"?l","?l",-1640529466,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"file","file",1017047278),new cljs.core.Symbol(null,"?file","?file",-1579206668,null)], null)], null),file));return cljs.core.map.call(null,((function (line_entities){
return (function (p1__8963_SHARP_){if(cljs.core.truth_(new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(p1__8963_SHARP_)))
{return p1__8963_SHARP_;
} else
{return cljs.core.assoc.call(null,p1__8963_SHARP_,new cljs.core.Keyword("db","id","db/id",1014111942),cljs.core.get.call(null,line_entities,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(p1__8963_SHARP_)));
}
});})(line_entities))
,nodes);
});
lt.plugins.kukui.sync.node_diff_STAR_ = (function node_diff_STAR_(nodes1,nodes2){var old_nodes = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,cljs.core.juxt.call(null,new cljs.core.Keyword(null,"text","text",1017460895),cljs.core.identity),nodes1));var name_entities = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (old_nodes){
return (function (p__8966){var vec__8967 = p__8966;var name = cljs.core.nth.call(null,vec__8967,0,null);var id = cljs.core.nth.call(null,vec__8967,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [name,lt.plugins.kukui.datascript.entity.call(null,id)], null);
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
lt.plugins.kukui.sync.node_diff = (function node_diff(file,nodes1,nodes2){return cljs.core.update_in.call(null,cljs.core.update_in.call(null,cljs.core.update_in.call(null,lt.plugins.kukui.sync.node_diff_STAR_.call(null,nodes1,nodes2),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"updated","updated",779473965)], null),cljs.core.partial.call(null,lt.plugins.kukui.sync.add_ids_by_line,file)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"updated","updated",779473965)], null),(function (nodes){return cljs.core.map.call(null,(function (p1__8968_SHARP_){if(cljs.core.truth_(new cljs.core.Keyword(null,"new-line","new-line",2344820595).cljs$core$IFn$_invoke$arity$1(p1__8968_SHARP_)))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("db","id","db/id",1014111942),new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(p1__8968_SHARP_),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"new-line","new-line",2344820595).cljs$core$IFn$_invoke$arity$1(p1__8968_SHARP_)], null);
} else
{return p1__8968_SHARP_;
}
}),nodes);
})),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"deleted","deleted",2564367243)], null),cljs.core.partial.call(null,lt.plugins.kukui.sync.add_ids_by_line,file));
});
lt.plugins.kukui.sync.ensure_type = (function ensure_type(entities){var vec__8971 = cljs.core.juxt.call(null,cljs.core.filter,cljs.core.remove).call(null,new cljs.core.Keyword(null,"type","type",1017479852),entities);var typed = cljs.core.nth.call(null,vec__8971,0,null);var untyped = cljs.core.nth.call(null,vec__8971,1,null);return cljs.core.concat.call(null,typed,((cljs.core.seq.call(null,untyped))?(function (){cljs.core.prn.call(null,"Untyped",untyped);
return cljs.core.map.call(null,((function (vec__8971,typed,untyped){
return (function (p1__8969_SHARP_){return cljs.core.assoc.call(null,p1__8969_SHARP_,new cljs.core.Keyword(null,"type","type",1017479852),lt.plugins.kukui.db.unknown_type);
});})(vec__8971,typed,untyped))
,untyped);
})():null));
});
lt.plugins.kukui.sync.__GT_new_entities = (function __GT_new_entities(nodes){var vec__8974 = cljs.core.juxt.call(null,cljs.core.filter,cljs.core.remove).call(null,(function (p1__8972_SHARP_){return (cljs.core.integer_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__8972_SHARP_))) || (cljs.core.seq.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__8972_SHARP_)));
}),lt.plugins.kukui.sync.expand_tags.call(null,lt.plugins.kukui.sync.add_types.call(null,nodes)));var relationships = cljs.core.nth.call(null,vec__8974,0,null);var ents = cljs.core.nth.call(null,vec__8974,1,null);return cljs.core.into.call(null,lt.plugins.kukui.db.must_require_type.call(null,lt.plugins.kukui.sync.ensure_type.call(null,lt.plugins.kukui.db.must_have_string_name.call(null,lt.plugins.kukui.db.must_have_unique_name.call(null,ents)))),relationships);
});
lt.plugins.kukui.sync.must_have_ids = (function must_have_ids(entities){var temp__4126__auto___8982 = cljs.core.seq.call(null,cljs.core.remove.call(null,new cljs.core.Keyword("db","id","db/id",1014111942),entities));if(temp__4126__auto___8982)
{var invalid_entities_8983 = temp__4126__auto___8982;cljs.core.prn.call(null,"Invalid entities",invalid_entities_8983);
throw cljs.core.ex_info.call(null,("Cannot update these entities without their ids: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,invalid_entities_8983))),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"invalid","invalid",2973689193),invalid_entities_8983], null));
} else
{}
return entities;
});
/**
* Maps files to their last few node snapshots.
* Used to determine what changed since last edit.
*/
lt.plugins.kukui.sync.last_edits = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lt.plugins.kukui.sync.sync_entities = (function sync_entities(nodes,file){var last_nodes = cljs.core.last.call(null,cljs.core.get.call(null,cljs.core.deref.call(null,lt.plugins.kukui.sync.last_edits),file));var map__8977 = lt.plugins.kukui.sync.node_diff.call(null,file,last_nodes,nodes);var map__8977__$1 = ((cljs.core.seq_QMARK_.call(null,map__8977))?cljs.core.apply.call(null,cljs.core.hash_map,map__8977):map__8977);var updated = cljs.core.get.call(null,map__8977__$1,new cljs.core.Keyword(null,"updated","updated",779473965));var deleted = cljs.core.get.call(null,map__8977__$1,new cljs.core.Keyword(null,"deleted","deleted",2564367243));var added = cljs.core.get.call(null,map__8977__$1,new cljs.core.Keyword(null,"added","added",1106564210));return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"added","added",1106564210),lt.plugins.kukui.sync.__GT_new_entities.call(null,added),new cljs.core.Keyword(null,"updated","updated",779473965),lt.plugins.kukui.sync.must_have_ids.call(null,updated),new cljs.core.Keyword(null,"deleted","deleted",2564367243),cljs.core.mapv.call(null,((function (last_nodes,map__8977,map__8977__$1,updated,deleted,added){
return (function (p1__8975_SHARP_){return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword("db.fn","retractEntity","db.fn/retractEntity",4213852396),new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(p1__8975_SHARP_)],null));
});})(last_nodes,map__8977,map__8977__$1,updated,deleted,added))
,lt.plugins.kukui.sync.must_have_ids.call(null,deleted))], null);
});
lt.plugins.kukui.sync.save_latest_edit = (function save_latest_edit(nodes,file){return cljs.core.swap_BANG_.call(null,lt.plugins.kukui.sync.last_edits,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file], null),(function (p1__8978_SHARP_){return cljs.core.concat.call(null,cljs.core.take_last.call(null,2,p1__8978_SHARP_),cljs.core._conj.call(null,cljs.core.List.EMPTY,nodes));
}));
});
lt.plugins.kukui.sync.sync = (function sync(nodes,file){var nodes__$1 = cljs.core.filter.call(null,(function (p1__8979_SHARP_){return cljs.core.not.call(null,cljs.core.re_find.call(null,/^\s*$/,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(p1__8979_SHARP_)));
}),nodes);var map__8981 = lt.plugins.kukui.sync.sync_entities.call(null,nodes__$1,file);var map__8981__$1 = ((cljs.core.seq_QMARK_.call(null,map__8981))?cljs.core.apply.call(null,cljs.core.hash_map,map__8981):map__8981);var updated = cljs.core.get.call(null,map__8981__$1,new cljs.core.Keyword(null,"updated","updated",779473965));var deleted = cljs.core.get.call(null,map__8981__$1,new cljs.core.Keyword(null,"deleted","deleted",2564367243));var added = cljs.core.get.call(null,map__8981__$1,new cljs.core.Keyword(null,"added","added",1106564210));cljs.core.println.call(null,"Added/deleted/updated: ",cljs.core.count.call(null,added),"/",cljs.core.count.call(null,deleted),"/",cljs.core.count.call(null,updated));
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
return (function (p1__8835_SHARP_,p2__8836_SHARP_){return f.call(null,p1__8835_SHARP_,p2__8836_SHARP_,node);
});})(type_tags,type_tags__$1))
,accum,type_tags__$1);
}),cljs.core.PersistentArrayMap.EMPTY,nodes);
});
lt.plugins.kukui.live.type_counts = cljs.core.partial.call(null,lt.plugins.kukui.live.type_nodes__GT_tag_map,(function (p1__8837_SHARP_,p2__8838_SHARP_){return cljs.core.update_in.call(null,p1__8837_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p2__8838_SHARP_], null),cljs.core.inc);
}));
lt.plugins.kukui.live.types_counts = (function types_counts(ed,lines){var nodes = lt.plugins.kukui.node.ed__GT_nodes.call(null,ed,lines);var types = lt.plugins.kukui.db.types_and_names.call(null);return cljs.core.keep.call(null,((function (nodes,types){
return (function (p1__8839_SHARP_){var counts = lt.plugins.kukui.live.type_counts.call(null,cljs.core.some.call(null,((function (nodes,types){
return (function (x){if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(x),p1__8839_SHARP_))
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
{return (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[p1__8839_SHARP_,counts],null));
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
return (function (p1__8840_SHARP_){if(cljs.core.contains_QMARK_.call(null,cljs.core.set.call(null,new cljs.core.Keyword(null,"names","names",1118489274).cljs$core$IFn$_invoke$arity$1(p1__8840_SHARP_)),tag))
{return new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(p1__8840_SHARP_);
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
lt.plugins.kukui.live.attribute_counts = (function attribute_counts(nodes){var seq__8845 = cljs.core.seq.call(null,cljs.core.disj.call(null,cljs.core.set.call(null,cljs.core.mapcat.call(null,cljs.core.keys,nodes)),new cljs.core.Keyword(null,"desc","desc",1016984067),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.Keyword(null,"indent","indent",4124632094),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"text","text",1017460895)));var chunk__8846 = null;var count__8847 = 0;var i__8848 = 0;while(true){
if((i__8848 < count__8847))
{var attr = cljs.core._nth.call(null,chunk__8846,i__8848);lt.plugins.kukui.live.attribute_counts_STAR_.call(null,nodes,attr);
{
var G__8859 = seq__8845;
var G__8860 = chunk__8846;
var G__8861 = count__8847;
var G__8862 = (i__8848 + 1);
seq__8845 = G__8859;
chunk__8846 = G__8860;
count__8847 = G__8861;
i__8848 = G__8862;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__8845);if(temp__4126__auto__)
{var seq__8845__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8845__$1))
{var c__7182__auto__ = cljs.core.chunk_first.call(null,seq__8845__$1);{
var G__8863 = cljs.core.chunk_rest.call(null,seq__8845__$1);
var G__8864 = c__7182__auto__;
var G__8865 = cljs.core.count.call(null,c__7182__auto__);
var G__8866 = 0;
seq__8845 = G__8863;
chunk__8846 = G__8864;
count__8847 = G__8865;
i__8848 = G__8866;
continue;
}
} else
{var attr = cljs.core.first.call(null,seq__8845__$1);lt.plugins.kukui.live.attribute_counts_STAR_.call(null,nodes,attr);
{
var G__8867 = cljs.core.next.call(null,seq__8845__$1);
var G__8868 = null;
var G__8869 = 0;
var G__8870 = 0;
seq__8845 = G__8867;
chunk__8846 = G__8868;
count__8847 = G__8869;
i__8848 = G__8870;
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
lt.plugins.kukui.selector.selector = (function selector(opts){var G__8953 = lt.objs.sidebar.command.filter_list.call(null,opts);lt.object.add_behavior_BANG_.call(null,G__8953,new cljs.core.Keyword("lt.plugins.kukui.selector","set-selected","lt.plugins.kukui.selector/set-selected",3025761911));
return G__8953;
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.kukui.query')) {
goog.provide('lt.plugins.kukui.query');
goog.require('cljs.core');
goog.require('lt.plugins.kukui.core');
goog.require('lt.objs.command');
goog.require('lt.objs.notifos');
goog.require('lt.objs.find');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.objs.find');
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
goog.require('lt.objs.notifos');
goog.require('cljs.reader');
goog.require('lt.plugins.kukui.datascript');
goog.require('cljs.reader');
goog.require('lt.objs.editor');
goog.require('lt.objs.files');
goog.require('lt.object');
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
lt.plugins.kukui.query.ent__GT_nodes = (function ent__GT_nodes(ent,level,id__GT_name){var ent__$1 = ((cljs.core.map_QMARK_.call(null,ent))?ent:new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"text","text",1017460895),(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(ent))], null));return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__9190 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"level","level",1116770038),level,new cljs.core.Keyword(null,"text","text",1017460895),lt.plugins.kukui.query.ent_text.call(null,ent__$1)], null);var G__9190__$1 = (cljs.core.truth_(new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(ent__$1))?cljs.core.assoc.call(null,G__9190,new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword("db","id","db/id",1014111942).cljs$core$IFn$_invoke$arity$1(ent__$1)):G__9190);return G__9190__$1;
})()], null),cljs.core.into.call(null,cljs.core.mapv.call(null,((function (ent__$1){
return (function (p1__9187_SHARP_){return lt.plugins.kukui.query.attr_node.call(null,p1__9187_SHARP_,ent__$1,level,id__GT_name);
});})(ent__$1))
,cljs.core.sort.call(null,clojure.set.difference.call(null,cljs.core.set.call(null,cljs.core.keys.call(null,ent__$1)),lt.plugins.kukui.query.hidden_attributes))),cljs.core.map.call(null,((function (ent__$1){
return (function (p1__9188_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"level","level",1116770038),new cljs.core.Keyword(null,"text","text",1017460895)],[(level + 1),lt.plugins.kukui.query.ent_text.call(null,p1__9188_SHARP_)]);
});})(ent__$1))
,new cljs.core.Keyword(null,"desc","desc",1016984067).cljs$core$IFn$_invoke$arity$1(ent__$1))));
});
/**
* Only works when in non-advanced mode e.g. no munging.
*/
lt.plugins.kukui.query.resolve_fn = (function resolve_fn(ns_obj,f){return (ns_obj[clojure.string.replace.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(f)),"-","_")]);
});
lt.plugins.kukui.query.execute_query = (function execute_query(default_executor,query,args){var temp__4124__auto__ = (function (){var G__9194 = query;var G__9194__$1 = (((G__9194 == null))?null:cljs.core.get.call(null,clojure.set.map_invert.call(null,lt.plugins.kukui.db.named_queries),G__9194));var G__9194__$2 = (((G__9194__$1 == null))?null:lt.plugins.kukui.query.resolve_fn.call(null,lt.plugins.kukui.db,G__9194__$1));return G__9194__$2;
})();if(cljs.core.truth_(temp__4124__auto__))
{var executor = temp__4124__auto__;return cljs.core.map.call(null,((function (executor,temp__4124__auto__){
return (function (p__9195){var vec__9196 = p__9195;var k = cljs.core.nth.call(null,vec__9196,0,null);var v = cljs.core.nth.call(null,vec__9196,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [v], null)], null);
});})(executor,temp__4124__auto__))
,cljs.core.apply.call(null,executor,args));
} else
{return cljs.core.apply.call(null,default_executor,query,args);
}
});
lt.plugins.kukui.query.find_one_query__GT_nodes = (function find_one_query__GT_nodes(query,args){var ents = cljs.core.apply.call(null,lt.plugins.kukui.datascript.qe,query,lt.plugins.kukui.db.rules,args);var id__GT_name = clojure.set.map_invert.call(null,lt.plugins.kukui.db.name_id_map.call(null));return cljs.core.vec.call(null,cljs.core.mapcat.call(null,((function (ents,id__GT_name){
return (function (p1__9197_SHARP_){return lt.plugins.kukui.query.ent__GT_nodes.call(null,p1__9197_SHARP_,1,id__GT_name);
});})(ents,id__GT_name))
,ents));
});
/**
* @param {...*} var_args
*/
lt.plugins.kukui.query.default_second_executor = (function() { 
var default_second_executor__delegate = function (query,args){return cljs.core.map.call(null,(function (p__9200){var vec__9201 = p__9200;var k = cljs.core.nth.call(null,vec__9201,0,null);var pairs = cljs.core.nth.call(null,vec__9201,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.map.call(null,cljs.core.second,pairs)], null);
}),cljs.core.group_by.call(null,cljs.core.first,cljs.core.apply.call(null,lt.plugins.kukui.datascript.qae,query,lt.plugins.kukui.db.rules,args)));
};
var default_second_executor = function (query,var_args){
var args = null;if (arguments.length > 1) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return default_second_executor__delegate.call(this,query,args);};
default_second_executor.cljs$lang$maxFixedArity = 1;
default_second_executor.cljs$lang$applyTo = (function (arglist__9241){
var query = cljs.core.first(arglist__9241);
var args = cljs.core.rest(arglist__9241);
return default_second_executor__delegate(query,args);
});
default_second_executor.cljs$core$IFn$_invoke$arity$variadic = default_second_executor__delegate;
return default_second_executor;
})()
;
lt.plugins.kukui.query.find_two_query__GT_nodes = (function find_two_query__GT_nodes(query,args){var results = lt.plugins.kukui.query.execute_query.call(null,lt.plugins.kukui.query.default_second_executor,query,args);var id__GT_name = clojure.set.map_invert.call(null,lt.plugins.kukui.db.name_id_map.call(null));return cljs.core.vec.call(null,cljs.core.mapcat.call(null,((function (results,id__GT_name){
return (function (p__9205){var vec__9206 = p__9205;var group_key = cljs.core.nth.call(null,vec__9206,0,null);var ents = cljs.core.nth.call(null,vec__9206,1,null);return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",1017460895),group_key,new cljs.core.Keyword(null,"level","level",1116770038),1], null)], null),cljs.core.mapcat.call(null,((function (vec__9206,group_key,ents,results,id__GT_name){
return (function (p1__9202_SHARP_){return lt.plugins.kukui.query.ent__GT_nodes.call(null,p1__9202_SHARP_,2,id__GT_name);
});})(vec__9206,group_key,ents,results,id__GT_name))
,ents));
});})(results,id__GT_name))
,results));
});
/**
* @param {...*} var_args
*/
lt.plugins.kukui.query.query__GT_nodes = (function() { 
var query__GT_nodes__delegate = function (query,args){cljs.core.println.call(null,"Query:",query,"\nArgs:",cljs.core.pr_str.call(null,args));
var finds = cljs.core.count.call(null,new cljs.core.Keyword(null,"find","find",1017047339).cljs$core$IFn$_invoke$arity$1(datascript.parse_query.call(null,query)));var G__9208 = finds;var caseval__9242;
switch (G__9208){
case 1:
caseval__9242=lt.plugins.kukui.query.find_one_query__GT_nodes.call(null,query,args)
break;
case 2:
caseval__9242=lt.plugins.kukui.query.find_two_query__GT_nodes.call(null,query,args)
break;
default:
caseval__9242=(function(){throw cljs.core.ex_info.call(null,("No render found for "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(finds)+" finds"),cljs.core.PersistentArrayMap.EMPTY)})()
}
return caseval__9242;
};
var query__GT_nodes = function (query,var_args){
var args = null;if (arguments.length > 1) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return query__GT_nodes__delegate.call(this,query,args);};
query__GT_nodes.cljs$lang$maxFixedArity = 1;
query__GT_nodes.cljs$lang$applyTo = (function (arglist__9243){
var query = cljs.core.first(arglist__9243);
var args = cljs.core.rest(arglist__9243);
return query__GT_nodes__delegate(query,args);
});
query__GT_nodes.cljs$core$IFn$_invoke$arity$variadic = query__GT_nodes__delegate;
return query__GT_nodes;
})()
;
cljs.reader.register_tag_parser_BANG_.call(null,new cljs.core.Symbol(null,"fn","fn",-1640528255,null),(function (p1__9209_SHARP_){return lt.plugins.kukui.query.resolve_fn.call(null,cljs.core,p1__9209_SHARP_);
}));
/**
* If db/named-queries has a matching entry, return it along with args.
* 
* For example:
* (tag1-type2 'kukui') => [:tag1-type2-query 'kukui']
*/
lt.plugins.kukui.query.fn_string__GT_query_args = (function fn_string__GT_query_args(query_string){var vec__9211 = cljs.reader.read_string.call(null,query_string);var named_query = cljs.core.nth.call(null,vec__9211,0,null);var args = cljs.core.nthnext.call(null,vec__9211,1);var temp__4126__auto__ = named_query.call(null,lt.plugins.kukui.db.named_queries);if(cljs.core.truth_(temp__4126__auto__))
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
lt.plugins.kukui.query.query_history = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
lt.plugins.kukui.query.nodes__GT_path = (function nodes__GT_path(ed,nodes,input){var result = lt.plugins.kukui.core.tree__GT_string.call(null,nodes,lt.objs.editor.option.call(null,ed,"tabSize"));var path = lt.plugins.kukui.util.tempfile.call(null,"kukui-query",".otl");var lines_ids = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,cljs.core.juxt.call(null,new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"id","id",1013907597)),cljs.core.filter.call(null,new cljs.core.Keyword(null,"id","id",1013907597),cljs.core.map_indexed.call(null,((function (result,path){
return (function (p1__9213_SHARP_,p2__9212_SHARP_){return cljs.core.assoc.call(null,p2__9212_SHARP_,new cljs.core.Keyword(null,"line","line",1017226086),p1__9213_SHARP_);
});})(result,path))
,nodes))));lt.objs.files.save.call(null,path,result);
cljs.core.swap_BANG_.call(null,lt.plugins.kukui.query.query_history,cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"input","input",1114262332),input,new cljs.core.Keyword(null,"path","path",1017337751),path,new cljs.core.Keyword(null,"lines-ids","lines-ids",3529160284),lines_ids], null));
return path;
});
lt.plugins.kukui.query.input__GT_path = (function input__GT_path(ed,input){var query_and_args = lt.plugins.kukui.query.input__GT_query_and_args.call(null,input);var nodes = cljs.core.apply.call(null,lt.plugins.kukui.query.query__GT_nodes,query_and_args);return lt.plugins.kukui.query.nodes__GT_path.call(null,ed,nodes,input);
});
lt.plugins.kukui.query.add_ids_to_query_file = (function() {
var add_ids_to_query_file = null;
var add_ids_to_query_file__0 = (function (){return add_ids_to_query_file.call(null,cljs.core.last.call(null,cljs.core.deref.call(null,lt.plugins.kukui.query.query_history)));
});
var add_ids_to_query_file__1 = (function (query){var ed = cljs.core.first.call(null,lt.objs.editor.pool.by_path.call(null,new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(query)));var seq__9220 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"lines-ids","lines-ids",3529160284).cljs$core$IFn$_invoke$arity$1(query));var chunk__9221 = null;var count__9222 = 0;var i__9223 = 0;while(true){
if((i__9223 < count__9222))
{var vec__9224 = cljs.core._nth.call(null,chunk__9221,i__9223);var line = cljs.core.nth.call(null,vec__9224,0,null);var id = cljs.core.nth.call(null,vec__9224,1,null);(lt.objs.editor.line_handle.call(null,ed,line)["kukui-id"] = id);
{
var G__9244 = seq__9220;
var G__9245 = chunk__9221;
var G__9246 = count__9222;
var G__9247 = (i__9223 + 1);
seq__9220 = G__9244;
chunk__9221 = G__9245;
count__9222 = G__9246;
i__9223 = G__9247;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__9220);if(temp__4126__auto__)
{var seq__9220__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9220__$1))
{var c__7182__auto__ = cljs.core.chunk_first.call(null,seq__9220__$1);{
var G__9248 = cljs.core.chunk_rest.call(null,seq__9220__$1);
var G__9249 = c__7182__auto__;
var G__9250 = cljs.core.count.call(null,c__7182__auto__);
var G__9251 = 0;
seq__9220 = G__9248;
chunk__9221 = G__9249;
count__9222 = G__9250;
i__9223 = G__9251;
continue;
}
} else
{var vec__9225 = cljs.core.first.call(null,seq__9220__$1);var line = cljs.core.nth.call(null,vec__9225,0,null);var id = cljs.core.nth.call(null,vec__9225,1,null);(lt.objs.editor.line_handle.call(null,ed,line)["kukui-id"] = id);
{
var G__9252 = cljs.core.next.call(null,seq__9220__$1);
var G__9253 = null;
var G__9254 = 0;
var G__9255 = 0;
seq__9220 = G__9252;
chunk__9221 = G__9253;
count__9222 = G__9254;
i__9223 = G__9255;
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
add_ids_to_query_file = function(query){
switch(arguments.length){
case 0:
return add_ids_to_query_file__0.call(this);
case 1:
return add_ids_to_query_file__1.call(this,query);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
add_ids_to_query_file.cljs$core$IFn$_invoke$arity$0 = add_ids_to_query_file__0;
add_ids_to_query_file.cljs$core$IFn$_invoke$arity$1 = add_ids_to_query_file__1;
return add_ids_to_query_file;
})()
;
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.query-and-open-file","kukui.query-and-open-file",606737661),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Opens query results in a temp file as an outline",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = clojure.string.triml.call(null,lt.objs.editor.line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line));var path = lt.plugins.kukui.query.input__GT_path.call(null,ed,line);lt.plugins.kukui.util.jump_to.call(null,ed,path);
return lt.plugins.kukui.query.add_ids_to_query_file.call(null);
})], null));
lt.plugins.kukui.query.type_selector = lt.plugins.kukui.selector.selector.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"items","items",1114430258),(function (){var ed = lt.objs.editor.pool.last_active.call(null);return cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"name","name",1017277949),cljs.core.map.call(null,((function (ed){
return (function (p1__9226_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"name","name",1017277949)],[p1__9226_SHARP_]);
});})(ed))
,lt.plugins.kukui.db.local_tag_types.call(null,lt.plugins.kukui.util.current_file.call(null,ed),lt.plugins.kukui.util.current_lines.call(null,ed))));
}),new cljs.core.Keyword(null,"key","key",1014010321),new cljs.core.Keyword(null,"name","name",1017277949)], null));
lt.plugins.kukui.query.add_leftover_nodes = (function add_leftover_nodes(existing_nodes,original_nodes){var existing_text = cljs.core.set.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"text","text",1017460895),existing_nodes));var leftover_nodes = cljs.core.remove.call(null,((function (existing_text){
return (function (p1__9227_SHARP_){return cljs.core.contains_QMARK_.call(null,existing_text,new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(p1__9227_SHARP_));
});})(existing_text))
,original_nodes);return cljs.core.into.call(null,existing_nodes,((cljs.core.seq.call(null,leftover_nodes))?(function (){var id__GT_name = clojure.set.map_invert.call(null,lt.plugins.kukui.db.name_id_map.call(null));return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"level","level",1116770038),1,new cljs.core.Keyword(null,"text","text",1017460895),lt.plugins.kukui.query.leftover_tag], null)], null),cljs.core.mapcat.call(null,((function (id__GT_name,existing_text,leftover_nodes){
return (function (p1__9228_SHARP_){return lt.plugins.kukui.query.ent__GT_nodes.call(null,p1__9228_SHARP_,2,id__GT_name);
});})(id__GT_name,existing_text,leftover_nodes))
,leftover_nodes));
})():null));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.query-with-local-type","kukui.query-with-local-type",4381653399),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Opens query over current branch for chosen tag type",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.kukui.query.type_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (ent){var ed = lt.objs.editor.pool.last_active.call(null);var lines = lt.plugins.kukui.util.current_lines.call(null,ed);var query = new cljs.core.Symbol(null,"local-by-tags-of-type","local-by-tags-of-type",-740892471,null).call(null,lt.plugins.kukui.db.named_queries);var args = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(ent),lt.plugins.kukui.util.current_file.call(null,ed),cljs.core.first.call(null,lines),cljs.core.last.call(null,lines)], null);var _ = cljs.core.println.call(null,"Query:",query,"\nArgs:",args);var nodes = lt.plugins.kukui.query.find_two_query__GT_nodes.call(null,query,args);var nodes__$1 = lt.plugins.kukui.query.add_leftover_nodes.call(null,nodes,lt.plugins.kukui.db.__GT_nodes.call(null,lt.plugins.kukui.util.current_file.call(null,ed),lines));var path = lt.plugins.kukui.query.nodes__GT_path.call(null,ed,nodes__$1,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(query)));lt.plugins.kukui.util.ensure_and_focus_second_tabset.call(null);
lt.plugins.kukui.util.jump_to.call(null,ed,path);
return lt.plugins.kukui.query.add_ids_to_query_file.call(null);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.query-and-print","kukui.query-and-print",1374129803),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Prints query result to stdout/console",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line);var vec__9229 = lt.plugins.kukui.query.input__GT_query_and_args.call(null,line);var query = cljs.core.nth.call(null,vec__9229,0,null);var args = cljs.core.nthnext.call(null,vec__9229,1);var result = cljs.core.apply.call(null,lt.plugins.kukui.datascript.qae,query,lt.plugins.kukui.db.rules,args);return lt.plugins.kukui.util.pprint.call(null,result);
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
lt.plugins.kukui.util.jump_to.call(null,ed,path);
return lt.plugins.kukui.query.add_ids_to_query_file.call(null);
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.open-entity-tagged","kukui.open-entity-tagged",2987956158),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Opens current word as tagged entity query",new cljs.core.Keyword(null,"exec","exec",1017031683),cljs.core.partial.call(null,lt.plugins.kukui.query.current_word_query,"(ent-by-type \"%s\")")], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.open-entity","kukui.open-entity",2583131743),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Opens current word as entity query",new cljs.core.Keyword(null,"exec","exec",1017031683),cljs.core.partial.call(null,lt.plugins.kukui.query.current_word_query,"[?e :name \"%s\"]")], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.open-entity-type","kukui.open-entity-type",2164583820),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Opens current word as entity type query",new cljs.core.Keyword(null,"exec","exec",1017031683),cljs.core.partial.call(null,lt.plugins.kukui.query.current_word_query,"[?e :type \"%s\"]")], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.open-regex-search","kukui.open-regex-search",1535571178),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Opens current word as regex search",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);lt.plugins.kukui.query.current_word_query.call(null,"(search-all-attr #fn re-find #\"%s\")");
return lt.object.raise.call(null,lt.objs.find.bar,new cljs.core.Keyword(null,"search!","search!",2982232811),lt.plugins.kukui.query.current_word.call(null,ed));
})], null));
lt.plugins.kukui.query.query_history_selector = lt.plugins.kukui.selector.selector.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"items","items",1114430258),(function (){return cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"index","index",1114250308),cljs.core.map_indexed.call(null,(function (p1__9231_SHARP_,p2__9230_SHARP_){return cljs.core.assoc.call(null,p2__9230_SHARP_,new cljs.core.Keyword(null,"index","index",1114250308),p1__9231_SHARP_,new cljs.core.Keyword(null,"desc","desc",1016984067),(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1((p1__9231_SHARP_ + 1))+". "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"input","input",1114262332).cljs$core$IFn$_invoke$arity$1(p2__9230_SHARP_))));
}),cljs.core.reverse.call(null,cljs.core.deref.call(null,lt.plugins.kukui.query.query_history))));
}),new cljs.core.Keyword(null,"key","key",1014010321),new cljs.core.Keyword(null,"desc","desc",1016984067)], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.previous-query","kukui.previous-query",2064375389),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Opens previous query",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.kukui.query.query_history_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (query_item){if(cljs.core.truth_(lt.plugins.kukui.util.current_file.call(null).contains("kukui-query")))
{lt.plugins.kukui.util.update_editor_path_BANG_.call(null,lt.objs.editor.pool.last_active.call(null),new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(query_item));
} else
{lt.plugins.kukui.util.jump_to.call(null,lt.objs.editor.pool.last_active.call(null),new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(query_item));
}
return lt.plugins.kukui.query.add_ids_to_query_file.call(null,query_item);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.jump-to-query-result-source","kukui.jump-to-query-result-source",816016716),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Jump to a query result's line and file",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var line = lt.objs.editor.cursor.call(null,ed).line;var temp__4124__auto__ = (function (){var G__9232 = (lt.objs.editor.line_handle.call(null,ed,line)["kukui-id"]);var G__9232__$1 = (((G__9232 == null))?null:lt.plugins.kukui.datascript.entity.call(null,G__9232));return G__9232__$1;
})();if(cljs.core.truth_(temp__4124__auto__))
{var entity = temp__4124__auto__;if(cljs.core.truth_((function (){var and__6414__auto__ = new cljs.core.Keyword(null,"file","file",1017047278).cljs$core$IFn$_invoke$arity$1(entity);if(cljs.core.truth_(and__6414__auto__))
{return new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(entity);
} else
{return and__6414__auto__;
}
})()))
{return lt.plugins.kukui.util.jump_to.call(null,ed,new cljs.core.Keyword(null,"file","file",1017047278).cljs$core$IFn$_invoke$arity$1(entity),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(entity));
} else
{return lt.objs.notifos.set_msg_BANG_.call(null,("No file and line exists for entity "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(entity))),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
}
} else
{return lt.objs.notifos.set_msg_BANG_.call(null,("No entity found for line "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((line + 1))),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
}
})], null));
/**
* Returns db ids for given editor of a query result file
*/
lt.plugins.kukui.query.ed__GT_ids = (function ed__GT_ids(ed){return cljs.core.remove.call(null,cljs.core.nil_QMARK_,(function (){var ids = cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY);new cljs.core.Keyword(null,"doc","doc",1014003882).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,new cljs.core.Keyword(null,"doc","doc",1014003882).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)))).eachLine(((function (ids){
return (function (lh){cljs.core.conj_BANG_.call(null,ids,(lh["kukui-id"]));
return null;
});})(ids))
);
return cljs.core.persistent_BANG_.call(null,ids);
})());
});
lt.plugins.kukui.query.query_types_counts = (function query_types_counts(ed){var ids = lt.plugins.kukui.query.ed__GT_ids.call(null,ed);cljs.core.println.call(null,"Tag counts");
lt.plugins.kukui.util.pprint.call(null,cljs.core.sort_by.call(null,cljs.core.first,cljs.core.map.call(null,((function (ids){
return (function (p__9237){var vec__9238 = p__9237;var k = cljs.core.nth.call(null,vec__9238,0,null);var v = cljs.core.nth.call(null,vec__9238,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,lt.plugins.kukui.util.__GT_val_sorted_map.call(null,v)], null);
});})(ids))
,lt.plugins.kukui.db.tag_counts_by_type_and_tag_for_ids.call(null,ids))));
cljs.core.println.call(null,"Tag counts by type");
cljs.core.prn.call(null,cljs.core.sort_by.call(null,cljs.core.second,cljs.core._GT_,cljs.core.map.call(null,((function (ids){
return (function (p__9239){var vec__9240 = p__9239;var type = cljs.core.nth.call(null,vec__9240,0,null);var tag_map = cljs.core.nth.call(null,vec__9240,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.apply.call(null,cljs.core._PLUS_,cljs.core.vals.call(null,tag_map))], null);
});})(ids))
,lt.plugins.kukui.db.tag_counts_by_type_and_tag_for_ids.call(null,ids))));
cljs.core.println.call(null,"Node counts by type");
return lt.plugins.kukui.util.pprint.call(null,lt.plugins.kukui.db.attr_counts_for_ids.call(null,new cljs.core.Keyword(null,"type","type",1017479852),ids));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.query-types-counts","kukui.query-types-counts",2689405288),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Same as :types-counts but for query file",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.kukui.query.query_types_counts.call(null,lt.objs.editor.pool.last_active.call(null));
})], null));
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
goog.require('lt.plugins.kukui.selector');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.plugins.kukui.selector');
goog.require('lt.objs.files');
goog.require('lt.plugins.kukui.db');
goog.require('clojure.set');
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
return (function (p__8257){var vec__8258 = p__8257;var k = cljs.core.nth.call(null,vec__8258,0,null);var v = cljs.core.nth.call(null,vec__8258,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,lt.plugins.kukui.util.__GT_val_sorted_map.call(null,v)], null);
});})(nodes))
,lt.plugins.kukui.db.tag_counts_by_type_and_tag.call(null,file,lines))));
cljs.core.println.call(null,"Tag counts by type");
cljs.core.prn.call(null,cljs.core.sort_by.call(null,cljs.core.second,cljs.core._GT_,cljs.core.map.call(null,((function (nodes){
return (function (p__8259){var vec__8260 = p__8259;var type = cljs.core.nth.call(null,vec__8260,0,null);var tag_map = cljs.core.nth.call(null,vec__8260,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.apply.call(null,cljs.core._PLUS_,cljs.core.vals.call(null,tag_map))], null);
});})(nodes))
,lt.plugins.kukui.db.tag_counts_by_type_and_tag.call(null,file,lines))));
cljs.core.prn.call(null,"Misc counts",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"untagged","untagged",1019174071),cljs.core.count.call(null,cljs.core.filter.call(null,((function (nodes){
return (function (p1__8252_SHARP_){return (cljs.core.empty_QMARK_.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__8252_SHARP_))) && (cljs.core.empty_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__8252_SHARP_)));
});})(nodes))
,nodes)),new cljs.core.Keyword(null,"nodes","nodes",1118897699),cljs.core.count.call(null,nodes)], null));
cljs.core.println.call(null,"Node counts by type");
return lt.plugins.kukui.util.pprint.call(null,lt.plugins.kukui.db.attr_counts.call(null,file,lines,new cljs.core.Keyword(null,"type","type",1017479852)));
});
lt.plugins.kukui.all_types_counts = (function all_types_counts(){cljs.core.println.call(null,"Tag counts");
lt.plugins.kukui.util.pprint.call(null,cljs.core.sort_by.call(null,cljs.core.first,cljs.core.map.call(null,(function (p__8266){var vec__8267 = p__8266;var k = cljs.core.nth.call(null,vec__8267,0,null);var v = cljs.core.nth.call(null,vec__8267,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,lt.plugins.kukui.util.__GT_val_sorted_map.call(null,v)], null);
}),lt.plugins.kukui.db.all_tag_counts_by_type_and_tag.call(null))));
cljs.core.println.call(null,"Tag counts by type");
cljs.core.prn.call(null,cljs.core.sort_by.call(null,cljs.core.second,cljs.core._GT_,cljs.core.map.call(null,(function (p__8268){var vec__8269 = p__8268;var type = cljs.core.nth.call(null,vec__8269,0,null);var tag_map = cljs.core.nth.call(null,vec__8269,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.apply.call(null,cljs.core._PLUS_,cljs.core.vals.call(null,tag_map))], null);
}),lt.plugins.kukui.db.all_tag_counts_by_type_and_tag.call(null))));
var nodes_8292 = lt.plugins.kukui.db.__GT_all_nodes.call(null);cljs.core.prn.call(null,"Misc counts",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"untagged","untagged",1019174071),cljs.core.count.call(null,cljs.core.filter.call(null,((function (nodes_8292){
return (function (p1__8261_SHARP_){return (cljs.core.empty_QMARK_.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__8261_SHARP_))) && (cljs.core.empty_QMARK_.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(p1__8261_SHARP_)));
});})(nodes_8292))
,nodes_8292)),new cljs.core.Keyword(null,"nodes","nodes",1118897699),cljs.core.count.call(null,nodes_8292)], null));
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
lt.plugins.kukui.replace_children = (function replace_children(ed,view_fn){var end_line = lt.plugins.sacha.codemirror.safe_next_non_child_line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line);var new_body = view_fn.call(null,ed);return lt.objs.editor.replace.call(null,lt.objs.editor.__GT_cm_ed.call(null,ed),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,ed)) + 1),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),end_line,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new_body);
});
lt.plugins.kukui.add_tags_to_node = (function add_tags_to_node(node,tags){return cljs.core.update_in.call(null,node,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",1017460895)], null),cljs.core.str,clojure.string.join.call(null,cljs.core.map.call(null,(function (p1__8270_SHARP_){return (" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(lt.plugins.kukui.core.tag_prefix)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__8270_SHARP_));
}),tags)));
});
/**
* Stamp children nodes with parent tags
*/
lt.plugins.kukui.stamp_nodes = (function stamp_nodes(ed){var level = 0;var nodes = lt.plugins.kukui.db__GT_nodes.call(null,ed);var parent_tags = lt.plugins.kukui.core.text__GT_tags.call(null,lt.objs.editor.line.call(null,ed,lt.objs.editor.cursor.call(null,ed).line));var new_nodes = cljs.core.map.call(null,((function (level,nodes,parent_tags){
return (function (p1__8271_SHARP_){return lt.plugins.kukui.add_tags_to_node.call(null,p1__8271_SHARP_,parent_tags);
});})(level,nodes,parent_tags))
,nodes);var indented_nodes = lt.plugins.kukui.core.indent_nodes.call(null,new_nodes,lt.plugins.sacha.codemirror.line_indent.call(null,ed,lt.objs.editor.cursor.call(null,ed).line),lt.objs.editor.option.call(null,ed,"tabSize"),level);return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,"\n",indented_nodes))+"\n");
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.stamp-children","kukui.stamp-children",3918722228),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: stamps current children with parent tags",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.kukui.replace_children.call(null,lt.objs.editor.pool.last_active.call(null),lt.plugins.kukui.stamp_nodes);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.toggle-descs","kukui.toggle-descs",4779010676),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Toggle visibility of descs of current children",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);return lt.plugins.kukui.util.toggle_all.call(null,ed,((function (ed){
return (function (p1__8272_SHARP_){var and__6414__auto__ = cljs.core.not.call(null,lt.plugins.kukui.core.desc_node_QMARK_.call(null,lt.plugins.kukui.node.line__GT_node.call(null,ed,p1__8272_SHARP_)));if(and__6414__auto__)
{return lt.plugins.kukui.core.desc_node_QMARK_.call(null,lt.plugins.kukui.node.line__GT_node.call(null,ed,(p1__8272_SHARP_ + 1)));
} else
{return and__6414__auto__;
}
});})(ed))
,lt.plugins.kukui.util.current_lines.call(null,ed));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"kukui.sync-file-to-db","kukui.sync-file-to-db",3023743498),new cljs.core.Keyword(null,"desc","desc",1016984067),"kukui: Syncs file to db",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var lines = cljs.core.range.call(null,lt.objs.editor.first_line.call(null,ed),(lt.objs.editor.last_line.call(null,ed) + 1));var nodes = lt.plugins.kukui.node.ed__GT_nodes.call(null,ed,lines);var file = lt.plugins.kukui.util.current_file.call(null,ed);lt.plugins.kukui.nodes = nodes;
try{return lt.plugins.kukui.sync.sync.call(null,nodes,file);
}catch (e8273){var e = e8273;lt.objs.notifos.set_msg_BANG_.call(null,("Failed to sync:"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
cljs.core.prn.call(null,e,cljs.core.ex_data.call(null,e));
return cljs.core.println.call(null,e.stack);
}})], null));
lt.plugins.kukui.entity_selector = lt.plugins.kukui.selector.selector.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"items","items",1114430258),(function (){return cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"name","name",1017277949),lt.plugins.kukui.datascript.qe.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",1017047339),new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"where","where",1127002201),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?e","?e",-1640529473,null),new cljs.core.Keyword(null,"name","name",1017277949)], null)], null)));
}),new cljs.core.Keyword(null,"key","key",1014010321),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"transform","transform",2066570974),(function (p1__8276_SHARP_,p2__8277_SHARP_,p3__8274_SHARP_,p4__8275_SHARP_){return ("<p>"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p3__8274_SHARP_)+cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_((function (){var and__6414__auto__ = new cljs.core.Keyword(null,"file","file",1017047278).cljs$core$IFn$_invoke$arity$1(p4__8275_SHARP_);if(cljs.core.truth_(and__6414__auto__))
{return new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(p4__8275_SHARP_);
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
{return lt.plugins.kukui.util.jump_to.call(null,lt.objs.editor.pool.last_active.call(null),new cljs.core.Keyword(null,"file","file",1017047278).cljs$core$IFn$_invoke$arity$1(entity),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(entity));
} else
{return lt.objs.notifos.set_msg_BANG_.call(null,("No file and line exists for "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(entity))),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
}
})], null));
lt.plugins.kukui.__GT_semtag_name = (function __GT_semtag_name(thing){if(cljs.core.seq.call(null,new cljs.core.Keyword(null,"alias","alias",1106807234).cljs$core$IFn$_invoke$arity$1(thing)))
{return new cljs.core.Keyword(null,"alias","alias",1106807234).cljs$core$IFn$_invoke$arity$1(thing);
} else
{if(cljs.core.seq.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(thing)))
{return new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(thing);
} else
{return null;
}
}
});
lt.plugins.kukui.__GT_ent = (function __GT_ent(__GT_id,id__GT_name,updated_names,thing){var G__8279 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("db","id","db/id",1014111942),__GT_id.call(null,new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(thing)),new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.mapv.call(null,__GT_id,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(thing)),new cljs.core.Keyword(null,"type","type",1017479852),(function (){var type = id__GT_name.call(null,cljs.core.first.call(null,new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(thing)));var type__$1 = ((cljs.core._EQ_.call(null,type,"tag"))?lt.plugins.kukui.db.unknown_type:type);return type__$1;
})(),new cljs.core.Keyword(null,"semtag","semtag",4402894033),true], null);var G__8279__$1 = ((cljs.core.seq.call(null,new cljs.core.Keyword(null,"desc","desc",1016984067).cljs$core$IFn$_invoke$arity$1(thing)))?cljs.core.assoc.call(null,G__8279,new cljs.core.Keyword(null,"text","text",1017460895),new cljs.core.Keyword(null,"desc","desc",1016984067).cljs$core$IFn$_invoke$arity$1(thing)):G__8279);var G__8279__$2 = ((cljs.core.seq.call(null,new cljs.core.Keyword(null,"url","url",1014020321).cljs$core$IFn$_invoke$arity$1(thing)))?cljs.core.assoc.call(null,G__8279__$1,new cljs.core.Keyword(null,"url","url",1014020321),new cljs.core.Keyword(null,"url","url",1014020321).cljs$core$IFn$_invoke$arity$1(thing)):G__8279__$1);var G__8279__$3 = (((function (){var name = lt.plugins.kukui.__GT_semtag_name.call(null,thing);return (cljs.core.seq.call(null,name)) && (!(cljs.core.contains_QMARK_.call(null,updated_names,name)));
})())?cljs.core.assoc.call(null,G__8279__$2,new cljs.core.Keyword(null,"name","name",1017277949),lt.plugins.kukui.__GT_semtag_name.call(null,thing)):G__8279__$2);return G__8279__$3;
});
lt.plugins.kukui.import_semtag_data = (function import_semtag_data(){var things = cljs.reader.read_string.call(null,new cljs.core.Keyword(null,"content","content",1965434859).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,lt.objs.files.join.call(null,lt.objs.files.lt_user_dir.call(null,"plugins"),"kukui","db.clj"))));var things__$1 = cljs.core.map.call(null,((function (things){
return (function (thing){return cljs.core.assoc.call(null,thing,new cljs.core.Keyword(null,"id","id",1013907597),(- new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(thing)),new cljs.core.Keyword(null,"types","types",1124748267),cljs.core.map.call(null,cljs.core.comp.call(null,cljs.core._,new cljs.core.Keyword("db","id","db/id",1014111942)),new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(thing)),new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.map.call(null,cljs.core.comp.call(null,cljs.core._,new cljs.core.Keyword("db","id","db/id",1014111942)),new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(thing)));
});})(things))
,things);var id__GT_name = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.call(null,((function (things,things__$1){
return (function (p1__8280_SHARP_){var temp__4126__auto__ = lt.plugins.kukui.__GT_semtag_name.call(null,p1__8280_SHARP_);if(cljs.core.truth_(temp__4126__auto__))
{var n = temp__4126__auto__;return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(p1__8280_SHARP_),n], null);
} else
{return null;
}
});})(things,things__$1))
,things__$1));var existing_names = lt.plugins.kukui.db.name_id_map.call(null);var updated_names = clojure.set.intersection.call(null,cljs.core.set.call(null,cljs.core.keys.call(null,existing_names)),cljs.core.set.call(null,cljs.core.vals.call(null,id__GT_name)));var _ = cljs.core.prn.call(null,"Following names already exist but will thave their type updated:",updated_names);var __GT_id = ((function (things,things__$1,id__GT_name,existing_names,updated_names,_){
return (function (p1__8281_SHARP_){if(cljs.core.contains_QMARK_.call(null,updated_names,id__GT_name.call(null,p1__8281_SHARP_)))
{return existing_names.call(null,id__GT_name.call(null,p1__8281_SHARP_));
} else
{return p1__8281_SHARP_;
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