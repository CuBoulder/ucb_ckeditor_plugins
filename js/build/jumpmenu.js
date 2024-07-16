!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.jumpmenu=t())}(self,(()=>(()=>{var e=[(e,t,n)=>{e.exports=n(1)("./src/core.js")},e=>{"use strict";e.exports=CKEditor5.dll},(e,t,n)=>{e.exports=n(1)("./src/widget.js")},,(e,t,n)=>{e.exports=n(1)("./src/ui.js")}],t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,n),r.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};return(()=>{"use strict";n.d(i,{default:()=>c});var e=n(0),t=n(2);class o extends e.Command{constructor(e){super(e),this.set("isEnabled",!0)}execute(e={headerTag:"h2",title:""}){const t=e.headerTag.trim(),n=e.title.trim(),i=this.editor.model;i.change((e=>{const o=e.createElement("ucbJumpMenuContainer"),r=e.createElement("ucbJumpMenu",{headerTag:t,title:n});e.append(r,o),i.insertContent(o,i.document.selection)}))}refresh(){const{model:e}=this.editor,{selection:t}=e.document,n=(t.getSelectedElement(),e.schema.findAllowedParent(t.getFirstPosition(),"ucbJumpMenuContainer"));this.isEnabled=null!==n}}class r extends e.Command{constructor(e,t,n){super(e),this.attributeName=t,this.defaultValue=n,this.set("value",this.defaultValue)}execute(e={}){const{value:t}=e,n=this.editor.model,i=n.document.selection.getSelectedElement();n.change((e=>{if(i&&"ucbJumpMenuContainer"===i.name){const n=Array.from(i.getChildren()).find((e=>"ucbJumpMenu"===e.name));n&&e.setAttribute(this.attributeName,t,n)}})),this.value=t}refresh(){const e=this.editor.model.document.selection.getSelectedElement();if(e&&"ucbJumpMenuContainer"===e.name){const t=Array.from(e.getChildren()).find((e=>"ucbJumpMenu"===e.name));t?(this.value=t.getAttribute(this.attributeName)||this.defaultValue,this.isEnabled=!0):(this.value=this.defaultValue,this.isEnabled=!1)}else this.value=this.defaultValue,this.isEnabled=!1}}class a extends e.Plugin{static get requires(){return[t.Widget]}init(){this._defineSchema(),this._defineConverters(),this._defineCommands()}_defineSchema(){const e=this.editor.model.schema;e.register("ucbJumpMenuContainer",{isObject:!0,allowWhere:"$block",allowAttributes:["headerTag","title"],allowChildren:"ucbJumpMenu"}),e.register("ucbJumpMenu",{allowIn:"ucbJumpMenuContainer",isLimit:!0,allowAttributes:["headerTag","title"]})}_defineConverters(){const e=this.editor.conversion;e.for("upcast").elementToElement({view:{name:"div",classes:"ucb-jump-menu-container"},model:(e,{writer:t})=>t.createElement("ucbJumpMenuContainer")}),e.for("upcast").elementToElement({view:{name:"ucb-jump-menu",attributes:{headertag:!0,title:!0}},model:(e,{writer:t})=>t.createElement("ucbJumpMenu",{headerTag:e.getAttribute("headertag"),title:e.getAttribute("title")})}),e.for("dataDowncast").elementToElement({model:"ucbJumpMenuContainer",view:(e,{writer:t})=>t.createContainerElement("div",{class:"ucb-jump-menu-container"})}),e.for("dataDowncast").elementToElement({model:"ucbJumpMenu",view:(e,{writer:t})=>s(e,t)}),e.for("editingDowncast").elementToElement({model:"ucbJumpMenuContainer",view:(e,{writer:n})=>{const i=n.createContainerElement("div",{class:"ucb-jump-menu-container"});return(0,t.toWidget)(i,n,{label:"jump menu container",hasSelectionHandle:!0})}}),e.for("editingDowncast").elementToElement({model:"ucbJumpMenu",view:(e,{writer:t})=>s(e,t,!0)})}_defineCommands(){const e=this.editor;e.commands.add("jumpmenu",new o(e)),e.commands.add("modifyJumpMenuHeaderTag",new r(e,"headerTag","h2")),e.commands.add("modifyJumpMenuTitle",new r(e,"title",""))}}function s(e,n,i=!1){const o=e.getAttribute("headerTag")||"h2",r=e.getAttribute("title")||"",a=n.createContainerElement("ucb-jump-menu",{headertag:o,title:r});return i?(0,t.toWidget)(a,n):a}var u=n(4);class l extends e.Plugin{static get requires(){return[t.WidgetToolbarRepository]}init(){const e=this.editor,t=e.ui.componentFactory;t.add("jumpmenu",(t=>{const n=e.commands.get("jumpmenu"),i=new u.ButtonView(t);return i.set({label:"Insert Jump Menu",icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--\x3e<path d="M320 96a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm21.1 80C367 158.8 384 129.4 384 96c0-53-43-96-96-96s-96 43-96 96c0 33.4 17 62.8 42.9 80H224c-17.7 0-32 14.3-32 32s14.3 32 32 32h32V448H208c-53 0-96-43-96-96v-6.1l7 7c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97 263c-9.4-9.4-24.6-9.4-33.9 0L7 319c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l7-7V352c0 88.4 71.6 160 160 160h80 80c88.4 0 160-71.6 160-160v-6.1l7 7c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-56-56c-9.4-9.4-24.6-9.4-33.9 0l-56 56c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l7-7V352c0 53-43 96-96 96H320V240h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H341.1z"/></svg>',tooltip:!0}),i.bind("isEnabled").to(n,"isEnabled"),i.on("execute",(()=>{e.execute("jumpmenu"),e.editing.view.focus()})),i})),t.add("setHeaderTag",(t=>{const n=e.commands.get("modifyJumpMenuHeaderTag");return this._createDropdown(t,"Set Header Tag",n,{h2:{label:"H2"},h3:{label:"H3"},h4:{label:"H4"},h5:{label:"H5"}},"h2")})),t.add("setTitle",(t=>{const n=e.commands.get("modifyJumpMenuTitle"),i=new u.LabeledFieldView(t,u.createLabeledInputText);return i.label="Title",i.fieldView.bind("value").to(n,"value"),i.fieldView.on("input",(()=>{e.execute("modifyJumpMenuTitle",{value:i.fieldView.element.value})})),i})),this._registerWidgetToolbar()}_createDropdown(e,t,n,i,o){const r=(0,u.createDropdown)(e);return(0,u.addToolbarToDropdown)(r,Object.entries(i).map((([t,i])=>this._createButton(e,i.label,n,t)))),r.buttonView.set({label:e.t(t),withText:!0}),r.buttonView.bind("label").to(n,"value",(e=>i[e]?i[e].label:i[o].label)),r.bind("isEnabled").to(n,"isEnabled"),r}_createButton(e,t,n,i){const o=this.editor,r=new u.ButtonView(e);return r.set({label:e.t(t),withText:!0,isToggleable:!0}),r.bind("isEnabled").to(n),r.bind("isOn").to(n,"value",(e=>e===i)),r.on("execute",(()=>{o.execute("modifyJumpMenuHeaderTag",{value:i}),o.editing.view.focus()})),r}_registerWidgetToolbar(){this.editor.plugins.get(t.WidgetToolbarRepository).register("ucbJumpMenu",{items:["setHeaderTag","setTitle"],getRelatedElement:e=>{const t=e.getSelectedElement();if(t&&t.is("element")&&"div"===t.name){if(Array.from(t.getChildren()).some((e=>"ucb-jump-menu"===e.name)))return t}return null}})}}class d extends e.Plugin{static get requires(){return[a,l]}}const c={JumpMenu:d}})(),i=i.default})()));