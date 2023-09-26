!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.CKEditor5=e():(t.CKEditor5=t.CKEditor5||{},t.CKEditor5.buttongroup=e())}(self,(()=>(()=>{var t=[(t,e,o)=>{t.exports=o(1)("./src/core.js")},t=>{"use strict";t.exports=CKEditor5.dll},(t,e,o)=>{t.exports=o(1)("./src/widget.js")},,(t,e,o)=>{t.exports=o(1)("./src/ui.js")}],e={};function o(n){var i=e[n];if(void 0!==i)return i.exports;var r=e[n]={exports:{}};return t[n](r,r.exports,o),r.exports}o.d=(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var n={};return(()=>{"use strict";o.d(n,{default:()=>f});var t=o(0),e=o(2),i=o(4);const r={large:{label:"Large",icon:t.icons.objectSizeLarge,className:"ucb-link-button-large"},regular:{label:"Regular",icon:t.icons.objectSizeMedium,className:"ucb-link-button-regular"},small:{label:"Small",icon:t.icons.objectSizeSmall,className:"ucb-link-button-small"}},l="regular",u={blue:{label:"Blue",className:"ucb-link-button-blue"},black:{label:"Black",className:"ucb-link-button-black"},gray:{label:"Gray",className:"ucb-link-button-gray"},white:{label:"White",className:"ucb-link-button-white"},gold:{label:"Gold",className:"ucb-link-button-gold"}},s="black";class a extends t.Plugin{static get requires(){return[e.WidgetToolbarRepository]}init(){const e=this.editor,o=e.commands,n=e.ui.componentFactory;n.add("buttonGroup",(t=>{const n=new i.ButtonView(t),r=o.get("insertButtonGroup");return n.label="Button Group",n.icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M297.4 9.4c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3l-96 96c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L338.7 160H128c-35.3 0-64 28.7-64 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V224C0 153.3 57.3 96 128 96H338.7L297.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm-96 256c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3l-96 96c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 416H96c-17.7 0-32 14.3-32 32v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V448c0-53 43-96 96-96H242.7l-41.4-41.4c-12.5-12.5-12.5-32.8 0-45.3z"/></svg>',n.tooltip=!0,n.withText=!1,n.isToggleable=!0,n.bind("isOn","isEnabled").to(r,"value","isEnabled"),this.listenTo(n,"execute",(()=>e.execute("insertButtonGroup"))),n})),n.add("buttonGroupSize",(t=>this._createDropdown(t,"Size",r[l].icon,o.get("buttonGroupSize"),r,l))),n.add("buttonGroupColor",(t=>this._createDropdown(t,"Color",u[s].icon,o.get("buttonGroupColor"),u,s))),n.add("addNewButtonBG",(e=>this._createButton(e,"Add Button",t.icons.plus,o.get("addNewButtonBG"),null)))}afterInit(){this.editor.plugins.get(e.WidgetToolbarRepository).register("buttonGroup",{items:["buttonGroupSize","buttonGroupColor","addNewButtonBG"],getRelatedElement:t=>{const e=t.getSelectedElement();return e&&e.is("element")&&e.hasClass("ucb-button-group")?e:null}})}_createDropdown(t,e,o,n,r,l){const u=(0,i.createDropdown)(t);return(0,i.addToolbarToDropdown)(u,Object.entries(r).map((([e,o])=>this._createButton(t,o.label,o.icon,n,e)))),u.buttonView.set({label:t.t(e),icon:o,tooltip:!0,withText:!o}),o?o===r[l].icon&&u.buttonView.bind("icon").to(n,"value",(t=>r[t]?r[t].icon:r[l].icon)):u.buttonView.bind("label").to(n,"value",(t=>r[t]?r[t].label:r[l].label)),u.bind("isEnabled").to(n,"isEnabled"),u}_createButton(t,e,o,n,r){const l=this.editor,u=new i.ButtonView;return u.set({label:t.t(e),icon:o,tooltip:!0,isToggleable:!0,withText:!o}),u.bind("isEnabled").to(n),u.bind("isOn").to(n,"value",(t=>t===r)),this.listenTo(u,"execute",(()=>{n.execute({value:r}),l.editing.view.focus()})),u}}class c extends t.Command{execute(){const{model:t}=this.editor;t.change((e=>{t.insertContent(function(t){const e=t.model,o=e.document.selection,n=t.createElement("buttonGroup",{buttonGroupColor:s,buttonGroupSize:l}),i=o.getFirstRange();for(const e of i.getItems())if("linkButton"==e.name){const o=!!e._children&&t.cloneElement(e._children._nodes[0]),i=e._clone();i._setAttribute("linkButtonColor",s),i._setAttribute("linkButtonSize",l),o&&t.append(o,i),t.append(i,n)}return n}(e))}))}refresh(){const t=this.editor.model,e=t.document.selection,o=e.getSelectedElement();if(o&&"buttonGroup"==o.name){const t=o.getAttribute("buttonGroupColor"),e=o.getAttribute("buttonGroupSize");Array.from(o.getChildren()).forEach((o=>{o._setAttribute("linkButtonColor",t),o._setAttribute("linkButtonSize",e)}))}const n=t.schema.findAllowedParent(e.getFirstPosition(),"buttonGroup");var i;this.isEnabled=null!==n,this.existingButtonGroupSelected=(i=o)&&"buttonGroup"===i.name?o:null}}class d extends t.Command{attributeName;defaultValue;constructor(t,e,o){super(t),this.attributeName=e,this.defaultValue=o}refresh(){const t=this.editor.model.document.selection.getSelectedElement(),e=this.attributeName,o=this.defaultValue;this.isEnabled=!!t,this.isEnabled?this.value=t.getAttribute(e):this.value=o}execute(t={value:""}){const e=this.editor.model,o=e.document.selection.getSelectedElement(),n=this.attributeName,i=this.defaultValue;o&&e.change((e=>{e.setAttribute(n,t.value||i,o);for(const t of o.getChildren())"linkButton"===t.name&&(e.setAttribute("linkButtonColor",o.getAttribute("buttonGroupColor")||defaultColor,t),e.setAttribute("linkButtonSize",o.getAttribute("buttonGroupSize")||defaultSize,t))}))}}class b extends t.Command{execute(){const{model:t}=this.editor,e=t.document.selection.getSelectedElement();t.change((t=>{if(m(e)){const o=function(t){const e=t.model,o=e.document.selection,n=o.getSelectedElement();if(m(n)){const e=n.getAttribute("buttonGroupColor"),o=n.getAttribute("buttonGroupSize");return t.createElement("linkButton",{linkButtonColor:e,linkButtonSize:o,linkButtonHref:""})}return null}(t);t.append(o,e),t.setSelection(o,"on")}}))}refresh(){const t=this.editor.model,e=t.document.selection,o=e.getSelectedElement(),n=t.schema.findAllowedParent(e.getFirstPosition(),"buttonGroup");this.isEnabled=null!==n,this.existingButtonGroupSelected=m(o)?o:null}}function m(t){return t&&"buttonGroup"===t.name}class p extends t.Plugin{static get requires(){return[e.Widget]}init(){this._defineSchema(),this._defineConverters(),this._defineCommands()}_defineSchema(){this.editor.model.schema.register("buttonGroup",{allowWhere:"$block",isObject:!0,isInline:!0,allowAttributes:["buttonGroupColor","buttonGroupSize"],allowChildren:"linkButton"})}_defineConverters(){const{conversion:t,editing:o}=this.editor;t.attributeToAttribute(g("buttonGroupColor",u)),t.attributeToAttribute(g("buttonGroupSize",r)),t.for("upcast").elementToElement({model:"buttonGroup",view:{name:"div",classes:"ucb-button-group"}}),t.for("dataDowncast").elementToElement({model:"buttonGroup",view:{name:"div",classes:"ucb-button-group"}}),t.for("editingDowncast").elementToElement({model:"buttonGroup",view:(t,{writer:o})=>function(t,o=!1){const n=t.createContainerElement("div",{class:"ucb-button-group"});return o?(0,e.toWidget)(n,t,{label:"button group widget",hasSelectionHandle:!0}):n}(o,!0)})}_defineCommands(){const t=this.editor.commands;t.add("insertButtonGroup",new c(this.editor)),t.add("buttonGroupSize",new d(this.editor,"buttonGroupSize",l)),t.add("buttonGroupColor",new d(this.editor,"buttonGroupColor",s)),t.add("addNewButtonBG",new b(this.editor))}}function g(t,e){const o={};for(const[t,n]of Object.entries(e))o[t]={key:"class",value:n.className};return{model:{key:t,values:Object.keys(e)},view:o}}class h extends t.Plugin{static get requires(){return[p,a]}}const f={ButtonGroup:h}})(),n=n.default})()));