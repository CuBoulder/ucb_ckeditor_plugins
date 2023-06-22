!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.button=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,i)=>{e.exports=i("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(e,t,i)=>{e.exports=i("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/utils.js":(e,t,i)=>{e.exports=i("dll-reference CKEditor5.dll")("./src/utils.js")},"ckeditor5/src/widget.js":(e,t,i)=>{e.exports=i("dll-reference CKEditor5.dll")("./src/widget.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function i(o){var n=t[o];if(void 0!==n)return n.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,i),s.exports}i.d=(e,t)=>{for(var o in t)i.o(t,o)&&!i.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var o={};return(()=>{"use strict";i.d(o,{default:()=>p});var e=i("ckeditor5/src/core.js");const t={large:{label:"Large",icon:e.icons.large,className:"ucb-link-button-large"},regular:{label:"Regular",icon:e.icons.regular,className:"ucb-link-button-regular"},small:{label:"Small",icon:e.icons.small,className:"ucb-link-button-small"}},n="regular",s={blue:{label:"Blue",className:"ucb-link-button-blue"},black:{label:"Black",className:"ucb-link-button-black"},gray:{label:"Gray",className:"ucb-link-button-gray"},white:{label:"White",className:"ucb-link-button-white"},gold:{label:"Gold",className:"ucb-link-button-gold"}},l="black",c={full:{label:"Full",icon:e.icons.objectFullWidth,className:"ucb-link-button-full"},default:{label:"Default",icon:e.icons.objectCenter,className:"ucb-link-button-default"}},r="default";class a extends e.Command{constructor(e){super(e),this.set("existingButtonSelected",!1)}execute({value:e="",size:t=n,style:i=r,color:o=l,href:s="",classes:c=""}){const a=this.editor.model,u=a.document.selection;a.change((e=>{const n=u.getFirstRange(),l=e.createElement("linkButton",{linkButtonColor:o,linkButtonSize:t,linkButtonStyle:i,linkButtonHref:s}),c=e.createElement("linkButtonContents");for(const t of n.getItems()){let i;t.is("textProxy")?i=e.createText(t.data,t.textNode.getAttributes()):t.is("element")&&(i=e.cloneElement(t)),i&&a.schema.checkChild(c,i)&&e.append(i,c)}e.append(c,l),a.insertContent(l),e.setSelection(c,"in")}))}refresh(){const e=this.editor.model,t=e.document.selection,i=t.getSelectedElement(),o=e.schema.findAllowedParent(t.getFirstPosition(),"linkButton");var n;this.isEnabled=null!==o,this.existingButtonSelected=(n=i)&&"linkButton"===n.name?i:null}}var u=i("ckeditor5/src/widget.js");class d extends e.Plugin{static get requires(){return[u.Widget]}init(){this._defineSchema(),this._defineConverters(),this.editor.commands.add("addButton",new a(this.editor))}_defineSchema(){const e=this.editor.model.schema;e.register("linkButton",{allowWhere:"$text",isObject:!0,isInline:!0,allowAttributes:["linkButtonColor","linkButtonStyle","linkButtonSize","linkButtonHref"]}),e.register("linkButtonContents",{isLimit:!0,allowIn:"linkButton",allowContentOf:"$block"}),e.addChildCheck(((e,t)=>{if(e.endsWith("linkButtonContents")&&"linkButton"===t.name)return!1}))}_defineConverters(){const{conversion:e}=this.editor;e.attributeToAttribute(h("linkButtonColor",s)),e.attributeToAttribute(h("linkButtonStyle",c)),e.attributeToAttribute(h("linkButtonSize",t)),e.for("upcast").add((e=>{e.on("element:a",((e,t,i)=>{if(i.consumable.consume(t.viewItem,{name:!0,classes:"ucb-link-button",attributes:["href"]})){const e=i.writer.createElement("linkButton",{linkButtonHref:t.viewItem.getAttribute("href")});if(!i.safeInsert(e,t.modelCursor))return;i.convertChildren(t.viewItem,e),i.updateConversionResult(e,t)}}))})),e.for("upcast").elementToElement({model:"linkButtonContents",view:{name:"span",classes:"ucb-link-button-contents"}}),e.for("downcast").attributeToAttribute({model:"linkButtonHref",view:"href"}),e.for("dataDowncast").elementToElement({model:"linkButton",view:{name:"a",classes:"ucb-link-button"}}),e.for("dataDowncast").elementToElement({model:"linkButtonContents",view:{name:"span",classes:"ucb-link-button-contents"}}),e.for("editingDowncast").elementToElement({model:"linkButton",view:(e,{writer:t})=>(0,u.toWidget)(t.createContainerElement("a",{class:"ucb-link-button",onclick:"event.preventDefault()"},{renderUnsafeAttributes:["onclick"]}),t,{label:"button widget"})}),e.for("editingDowncast").elementToElement({model:"linkButtonContents",view:(e,{writer:t})=>(0,u.toWidgetEditable)(t.createEditableElement("span",{class:"ucb-link-button-contents"}),t)})}}function h(e,t){const i={};for(const[e,o]of Object.entries(t))i[e]={key:"class",value:o.className};return{model:{key:e,values:Object.keys(t)},view:i}}var w=i("ckeditor5/src/ui.js"),m=i("ckeditor5/src/utils.js");class b extends w.View{constructor(i,o){super(i),this.focusTracker=new m.FocusTracker,this.keystrokes=new m.KeystrokeHandler,this.colorDropdown=this._createSelectionDropdown(i,"Color",'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\x3c!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M162.4 6c-1.5-3.6-5-6-8.9-6h-19c-3.9 0-7.5 2.4-8.9 6L104.9 57.7c-3.2 8-14.6 8-17.8 0L66.4 6c-1.5-3.6-5-6-8.9-6H48C21.5 0 0 21.5 0 48V224v22.4V256H9.6 374.4 384v-9.6V224 48c0-26.5-21.5-48-48-48H230.5c-3.9 0-7.5 2.4-8.9 6L200.9 57.7c-3.2 8-14.6 8-17.8 0L162.4 6zM0 288v32c0 35.3 28.7 64 64 64h64v64c0 35.3 28.7 64 64 64s64-28.7 64-64V384h64c35.3 0 64-28.7 64-64V288H0zM192 432a16 16 0 1 1 0 32 16 16 0 1 1 0-32z"/></svg>\n',"color",s,l),this.sizeDropdown=this._createSelectionDropdown(i,"Size",t[n].icon,"size",t,n),this.styleDropdown=this._createSelectionDropdown(i,"Style",c[r].icon,"style",c,r),this.linkInputView=this._createInput("Add Link"),this.set("size",n),this.set("color",l),this.set("style",r),this.linkInputView.fieldView.bind("href").to(this,"href"),this.set("href",""),this.saveButtonView=this._createButton("Save",e.icons.check,"ck-button-save"),this.saveButtonView.type="submit",this.cancelButtonView=this._createButton("Cancel",e.icons.cancel,"ck-button-cancel"),this.cancelButtonView.delegate("execute").to(this,"cancel"),this.childViews=this.createCollection([this.sizeDropdown,this.colorDropdown,this.styleDropdown,this.linkInputView,this.saveButtonView,this.cancelButtonView]),this._focusCycler=new w.FocusCycler({focusables:this.childViews,focusTracker:this.focusTracker,keystrokeHandler:this.keystrokes,actions:{focusPrevious:"shift + tab",focusNext:"tab"}}),this.setTemplate({tag:"form",attributes:{class:["ck","ck-button-form"],tabindex:"-1"},children:this.childViews})}render(){super.render(),(0,w.submitHandler)({view:this}),this.childViews._items.forEach((e=>{this.focusTracker.add(e.element)})),this.keystrokes.listenTo(this.element)}destroy(){super.destroy(),this.focusTracker.destroy(),this.keystrokes.destroy()}focus(){this.linkInputView.isEnabled,this.linkInputView.focus()}_createInput(e){const t=new w.LabeledFieldView(this.locale,w.createLabeledInputText);return t.label=e,t}_createButton(e,t,i){const o=new w.ButtonView;return o.set({label:e,icon:t,tooltip:!0,class:i}),o}_createSelectionDropdown(e,t,i,o,n,s){const l=(0,w.createDropdown)(e),c=n[s];return(0,w.addToolbarToDropdown)(l,Object.entries(n).map((([t,i])=>this._createSelectableButton(e,i.label,i.icon,o,t)))),l.buttonView.set({icon:i,tooltip:e.t(t),withText:!i}),l.buttonView.bind("label").to(this,o,(t=>e.t(n[t]?n[t].label:c.label))),i===n[s].icon&&l.buttonView.bind("icon").to(this,o,(e=>n[e]?n[e].icon:c.icon)),l}_createSelectableButton(e,t,i,o,n){const s=new w.ButtonView;return s.set({label:e.t(t),icon:i,tooltip:!!i,isToggleable:!0,withText:!i}),s.bind("isOn").to(this,o,(e=>e===n)),this.listenTo(s,"execute",(()=>{this.set(o,n)})),s}}class f extends e.Plugin{static get requires(){return[w.ContextualBalloon]}init(){const e=this.editor,t=e.ui.componentFactory,i=e.commands.get("addButton"),o=e.editing.view.document;this._balloon=this.editor.plugins.get(w.ContextualBalloon),this.formView=this._createFormView(e.locale),this.buttonView=null,t.add("button",(e=>{const t=new w.ButtonView(e);t.label="Button",t.icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --\x3e<path d="M358.182 179.361c-19.493-24.768-52.679-31.945-79.872-19.098-15.127-15.687-36.182-22.487-56.595-19.629V67c0-36.944-29.736-67-66.286-67S89.143 30.056 89.143 67v161.129c-19.909-7.41-43.272-5.094-62.083 8.872-29.355 21.795-35.793 63.333-14.55 93.152l109.699 154.001C134.632 501.59 154.741 512 176 512h178.286c30.802 0 57.574-21.5 64.557-51.797l27.429-118.999A67.873 67.873 0 0 0 448 326v-84c0-46.844-46.625-79.273-89.818-62.639zM80.985 279.697l27.126 38.079c8.995 12.626 29.031 6.287 29.031-9.283V67c0-25.12 36.571-25.16 36.571 0v175c0 8.836 7.163 16 16 16h6.857c8.837 0 16-7.164 16-16v-35c0-25.12 36.571-25.16 36.571 0v35c0 8.836 7.163 16 16 16H272c8.837 0 16-7.164 16-16v-21c0-25.12 36.571-25.16 36.571 0v21c0 8.836 7.163 16 16 16h6.857c8.837 0 16-7.164 16-16 0-25.121 36.571-25.16 36.571 0v84c0 1.488-.169 2.977-.502 4.423l-27.43 119.001c-1.978 8.582-9.29 14.576-17.782 14.576H176c-5.769 0-11.263-2.878-14.697-7.697l-109.712-154c-14.406-20.223 14.994-42.818 29.394-22.606zM176.143 400v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.733 0-14-7.163-14-16zm75.428 0v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.732 0-14-7.163-14-16zM327 400v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.732 0-14-7.163-14-16z"/></svg>',t.tooltip=!0,t.withText=!1,t.isToggleable=!0,this.listenTo(t,"execute",(()=>{this._showUI(i.existingButtonSelected)})),this.buttonView=t;const n=()=>{const e=i.existingButtonSelected;t.isOn=!!e};return this.listenTo(i,"change:value",n),this.listenTo(i,"change:existingButtonSelected",n),this.listenTo(o,"click",(()=>{i.existingButtonSelected&&this._showUI(i.existingButtonSelected)})),t.bind("isOn","isEnabled").to(i,"value","isEnabled"),t}))}_createFormView(e){const t=this.editor,i=t.ui.componentFactory,o=new b(e,i);return this.listenTo(o,"submit",(()=>{const e={href:o.linkInputView.fieldView.element.value,color:o.color,size:o.size,style:o.style};t.execute("addButton",e),this._hideUI()})),this.listenTo(o,"cancel",(()=>{this._hideUI()})),(0,w.clickOutsideHandler)({emitter:o,activator:()=>this._balloon.visibleView===o,contextElements:[this._balloon.view.element],callback:()=>this._hideUI()}),o}_showUI(e){this.editor.model.document.selection;this.buttonView.isOn=!0;const t=this.editor.commands.get("addButton").value;if(this._balloon.add({view:this.formView,position:this._getBalloonPositionData()}),e){const t=e.getAttribute("linkButtonSize"),i=e.getAttribute("linkButtonColor"),o=e.getAttribute("linkButtonStyle"),n=e.getAttribute("linkButtonHref");this.formView.color=i,this.formView.style=o,this.formView.size=t,this.formView.linkInputView.fieldView.value=n,this.formView.linkInputView.fieldView.element.value=n,this.formView.linkInputView.fieldView.set("value",n)}t&&(this.formView.linkInputView.fieldView.value=t.link,this.formView.colorDropdown.fieldView.value=t.color,this.formView.sizeDropdown.fieldView.value=t.size,this.formView.styleDropdown.fieldView.value=t.style),this.formView.focus()}_hideUI(){this.formView.element.reset(),this.buttonView.isOn=!1,this._balloon.remove(this.formView),this.editor.editing.view.focus()}_getBalloonPositionData(){const e=this.editor.editing.view,t=e.document;let i=null;return i=()=>e.domConverter.viewRangeToDom(t.selection.getFirstRange()),{target:i}}}class k extends e.Plugin{static get requires(){return[d,f]}}const p={Button:k}})(),o=o.default})()));