!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.column=t())}(self,(()=>(()=>{var e=[(e,t,o)=>{e.exports=o(1)("./src/core.js")},e=>{"use strict";e.exports=CKEditor5.dll},(e,t,o)=>{e.exports=o(1)("./src/widget.js")},,(e,t,o)=>{e.exports=o(1)("./src/ui.js")}],t={};function o(n){var s=t[n];if(void 0!==s)return s.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,o),i.exports}o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var n={};return(()=>{"use strict";o.d(n,{default:()=>h});var e=o(0),t=o(2);class s extends e.Command{execute(){const e=this.editor;e.model.change((t=>{const o=t.createElement("ucb-row"),n=t.createElement("ucb-column"),s=t.createElement("ucb-column"),i=t.createElement("paragraph"),c=t.createElement("paragraph");t.append(i,n),t.append(c,s),t.append(n,o),t.append(s,o),e.model.insertContent(o),t.setSelection(i,"in")}))}refresh(){this.isEnabled=!0}}function i(e){const t=e.getSelectedElement();return t&&t.is("element")&&"ucb-row"===t.name?t:null}class c extends e.Command{execute(){const e=this.editor.model,t=i(e.document.selection);t&&e.change((e=>{const o=e.createElement("paragraph"),n=e.createElement("ucb-column");e.append(o,n),e.append(n,t),e.setSelection(o,"in")}))}refresh(){const e=i(this.editor.model.document.selection);if(e){const t=Array.from(e.getChildren()).filter((e=>e.is("element","ucb-column"))).length;this.isEnabled=t<4}else this.isEnabled=!1}}class r extends e.Command{execute(){const e=this.editor.model,t=e.document.selection.getFirstPosition().findAncestor("ucb-column");t&&e.change((e=>{e.remove(t)}))}refresh(){const e=this.editor.model.document.selection.getFirstPosition().findAncestor("ucb-column");this.isEnabled=!!e}}class l extends e.Plugin{static get requires(){return[t.Widget]}init(){this._defineSchema(),this._defineConverters(),this._defineCommands()}_defineSchema(){const e=this.editor.model.schema;e.register("ucb-row",{isObject:!0,allowWhere:"$block",allowChildren:"ucb-column"}),e.register("ucb-column",{allowIn:"ucb-row",allowContentOf:"$root"})}_defineConverters(){const{conversion:e}=this.editor;e.for("upcast").elementToElement({model:"ucb-row",view:{name:"div",classes:["row","ucb-column-container"]}}),e.for("upcast").elementToElement({model:"ucb-column",view:{name:"div",classes:["col","ucb-column"]}}),e.for("dataDowncast").elementToElement({model:"ucb-row",view:(e,{writer:o})=>{const n=o.createContainerElement("div",{class:"row ucb-column-container"});return(0,t.toWidget)(n,o,{label:"row widget",hasSelectionHandle:!0})}}),e.for("dataDowncast").elementToElement({model:"ucb-column",view:(e,{writer:o})=>{const n=o.createEditableElement("div",{class:"col ucb-column"});return(0,t.toWidgetEditable)(n,o)}}),e.for("editingDowncast").elementToElement({model:"ucb-row",view:(e,{writer:o})=>{const n=o.createContainerElement("div",{class:"row ucb-column-container"});return(0,t.toWidget)(n,o,{label:"row widget",hasSelectionHandle:!0})}}),e.for("editingDowncast").elementToElement({model:"ucb-column",view:(e,{writer:o})=>{const n=o.createEditableElement("div",{class:"col ucb-column"});return(0,t.toWidgetEditable)(n,o)}}),e.for("editingDowncast").add((e=>{e.on("insert:ucb-row",((e,t,o)=>{const n=o.mapper.toViewElement(t.item);o.writer.addClass("ucb-row_selected",n)}))}))}_defineCommands(){const e=this.editor.commands;e.add("insertRowWithColumns",new s(this.editor)),e.add("addColumn",new c(this.editor)),e.add("removeColumn",new r(this.editor))}}var d=o(4);class a extends e.Command{execute({position:e}){const t=this.editor.model,o=t.document.selection.getFirstPosition().findAncestor("ucb-column");o&&t.change((t=>{const n=t.createElement("ucb-column"),s=t.createElement("paragraph");t.append(s,n),"left"===e?t.insert(n,o,"before"):"right"===e&&t.insert(n,o,"after"),t.setSelection(s,"in")}))}refresh(){const e=this.editor.model.document.selection.getFirstPosition().findAncestor("ucb-column");if(e){const t=e.parent,o=Array.from(t.getChildren()).filter((e=>e.is("element","ucb-column"))).length;this.isEnabled=o<4}else this.isEnabled=!1}}class m extends e.Plugin{static get requires(){return[t.WidgetToolbarRepository]}init(){const t=this.editor,o=t.commands,n=t.ui.componentFactory;n.add("Column",(e=>{const n=new d.ButtonView(e),s=o.get("insertRowWithColumns");return n.label="Column",n.icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--\x3e<path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 64V416H224V160H64zm384 0H288V416H448V160z"/></svg>',n.tooltip=!0,n.withText=!1,n.isToggleable=!0,n.bind("isOn","isEnabled").to(s,"value","isEnabled"),this.listenTo(n,"execute",(()=>t.execute("insertRowWithColumns"))),n})),n.add("addColumn",(t=>this._createButton(t,"Add Column",e.icons.plus,o.get("addColumn")))),n.add("removeColumn",(t=>this._createButton(t,"Remove Column",e.icons.eraser,o.get("removeColumn")))),n.add("addColumnLeft",(e=>this._createButton(e,"Add Column Left",'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--\x3e<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>',o.get("addColumnPosition"),"left"))),n.add("addColumnRight",(e=>this._createButton(e,"Add Column Right",'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--\x3e<path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>',o.get("addColumnPosition"),"right"))),t.commands.add("addColumnPosition",new a(t))}afterInit(){const e=this.editor.plugins.get(t.WidgetToolbarRepository);e.register("ucb-row",{items:["addColumn"],getRelatedElement:e=>{const t=e.getSelectedElement();if(t&&t.is("element")&&t.hasClass("ucb-column-container")){return t.childCount>5?null:t}return null}}),e.register("ucb-column",{items:["addColumnLeft","removeColumn","addColumnRight"],getRelatedElement:e=>e.focus?e.focus.getAncestors().find((e=>e.is("element")&&e.hasClass("ucb-column"))):null})}_createButton(e,t,o,n,s){const i=new d.ButtonView(e);return i.set({label:t,icon:o,tooltip:!0,withText:!o}),s?(i.bind("isEnabled").to(n,"isEnabled"),this.listenTo(i,"execute",(()=>{this.editor.execute("addColumnPosition",{position:s}),this.editor.editing.view.focus()}))):(i.bind("isEnabled").to(n,"isEnabled"),this.listenTo(i,"execute",(()=>{n.execute(),this.editor.editing.view.focus()}))),i}}class u extends e.Plugin{static get requires(){return[l,m]}static get pluginName(){return"Column"}}const h={Column:u}})(),n=n.default})()));