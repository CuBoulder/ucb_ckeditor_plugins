!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.map=t())}(self,(()=>(()=>{var e=[(e,t,i)=>{e.exports=i(1)("./src/core.js")},e=>{"use strict";e.exports=CKEditor5.dll},(e,t,i)=>{e.exports=i(1)("./src/widget.js")},(e,t,i)=>{e.exports=i(1)("./src/ui.js")},,(e,t,i)=>{e.exports=i(1)("./src/utils.js")}],t={};function i(o){var s=t[o];if(void 0!==s)return s.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,i),n.exports}i.d=(e,t)=>{for(var o in t)i.o(t,o)&&!i.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var o={};return(()=>{"use strict";i.d(o,{default:()=>f});var e=i(0),t=i(2);const s={small:{label:"Small",className:"ucb-map-size-small"},medium:{label:"Medium",className:"ucb-map-size-medium"},large:{label:"Large",className:"ucb-map-size-large"}},n="small";function a(e){const t=(new DOMParser).parseFromString(e,"text/html").querySelector("iframe");return t?t.getAttribute("src"):null}function c(e){return"https://www.colorado.edu/map/?id=336"+(e?"#!m/"+e:"")}function r(e){return"https://www.google.com/maps/embed?pb="+encodeURIComponent(e)}class l extends e.Command{constructor(e){super(e),this.set("existingMapSelected",!1)}execute(e={value:"",size:n}){const t=e.value.trim(),i=this.editor.model,o=e.size;if(!t)return;let s="campusMap",c=function(e){if("<"===e[0]&&!(e=a(e)))return;let t;try{t=new URL(e)}catch(e){return}return"colorado.edu"!==t.hostname&&"www.colorado.edu"!==t.hostname||"/map"!==t.pathname&&"/map/"!==t.pathname||!t.hash?void 0:t.hash.match(/m\/(\d+)/)[1]}(t);c||(s="googleMap",c=function(e){if("<"===e[0]&&!(e=a(e)))return null;let t;try{t=new URL(e)}catch(e){return null}return"google.com"!==t.hostname&&"www.google.com"!==t.hostname||"/maps/embed"!==t.pathname&&"/maps/embed/"!==t.pathname?null:decodeURIComponent(t.searchParams.get("pb")||"")||null}(t)),c&&i.change((e=>i.insertContent(e.createElement(s,{mapLocation:c,mapSize:o}))))}refresh(){const{model:e}=this.editor,{selection:t}=e.document,i=t.getSelectedElement(),o=e.schema.findAllowedParent(t.getFirstPosition(),"campusMap");var s;this.isEnabled=null!==o,this.existingMapSelected=!(s=i)||"campusMap"!==s.name&&"googleMap"!==s.name?null:i}}class u extends e.Plugin{static get requires(){return[t.Widget]}init(){this._defineSchema(),this._defineConverters(),this._defineCommands()}_defineSchema(){const e=this.editor.model.schema;e.register("campusMap",{isObject:!0,allowWhere:"$block",allowAttributes:["mapLocation","mapSize"],allowChildren:!1}),e.register("googleMap",{isObject:!0,allowWhere:"$block",allowAttributes:["mapLocation","mapSize"],allowChildren:!1})}_defineConverters(){const e=this.editor.conversion;e.attributeToAttribute({model:"mapLocation",view:"data-map-location"}),e.attributeToAttribute(function(e,t){const i={};for(const[e,o]of Object.entries(t))i[e]={key:"class",value:o.className};return{model:{key:e,values:Object.keys(t)},view:i}}("mapSize",s)),e.for("upcast").elementToElement({model:"campusMap",view:{name:"ucb-map",classes:["ucb-map","ucb-campus-map"]}}),e.for("upcast").elementToElement({model:"googleMap",view:{name:"ucb-map",classes:["ucb-map","ucb-google-map"]}}),e.for("dataDowncast").elementToElement({model:"campusMap",view:(e,{writer:t})=>m(e,t)}),e.for("dataDowncast").elementToElement({model:"googleMap",view:(e,{writer:t})=>d(e,t)}),e.for("editingDowncast").elementToElement({model:"campusMap",view:(e,{writer:t})=>m(e,t,!0)}),e.for("editingDowncast").elementToElement({model:"googleMap",view:(e,{writer:t})=>d(e,t,!0)})}_defineCommands(){this.editor.commands.add("insertMap",new l(this.editor))}}function m(e,i,o=!1){if(o){const o=(e.getAttribute("mapLocation")||"").replace(/\D/g,"");return(0,t.toWidget)(i.createContainerElement("div",{class:"ucb-map ucb-campus-map",style:`background-image: url('https://staticmap.concept3d.com/map/static-map/?map=336&loc=${o}&scale=2')`},[i.createRawElement("a",{href:c(o)},(e=>{e.innerHTML="<span>View location on the Campus Map</span>",e.onclick=e=>e.preventDefault()}))]),i,{label:"map widget"})}return i.createContainerElement("ucb-map",{class:"ucb-map ucb-campus-map"})}function d(e,i,o=!1){if(o){const o=e.getAttribute("mapLocation")||"";return(0,t.toWidget)(i.createContainerElement("div",{class:"ucb-map ucb-google-map"},[i.createEmptyElement("iframe",{src:r(o),loading:"lazy",referrerpolicy:"no-referrer"}),i.createEmptyElement("div",{class:"ucb-map-editing-cover"})]),i,{label:"map widget"})}return i.createContainerElement("ucb-map",{class:"ucb-map ucb-google-map"})}var p=i(3),h=i(5);class w extends p.View{constructor(t){super(t),this.valueInputView=this._createInput(t,"Map embed"),this.set("value",""),this.valueInputView.fieldView.bind("value").to(this,"value"),this.sizeDropdownView=this._createSelectionDropdown(t,"Map size",null,"size",s,n),this.set("size",n),this.saveButtonView=this._createActionButton(t,"Save",e.icons.check,"ck-button-save"),this.cancelButtonView=this._createActionButton(t,"Cancel",e.icons.cancel,"ck-button-cancel"),this.saveButtonView.type="submit",this.cancelButtonView.delegate("execute").to(this,"cancel"),this.childViews=this.createCollection([this.valueInputView,this.sizeDropdownView,this.saveButtonView,this.cancelButtonView]),this._enableFocusTracking(),this.setTemplate({tag:"form",attributes:{class:["ck","ck-map-form"],tabindex:"-1"},children:this.childViews})}render(){super.render();for(const e of this.childViews)this.focusTracker.add(e.element);(0,p.submitHandler)({view:this}),this.keystrokes.listenTo(this.element)}focus(){this.valueInputView.focus()}reset(){this.value="",this.size=n,this.valueInputView.fieldView.element.blur(),this.element.reset()}destroy(){this.keystrokes.destroy()}_createSelectionDropdown(e,t,i,o,s,n){const a=(0,p.createDropdown)(e),c=s[n];return(0,p.addToolbarToDropdown)(a,Object.entries(s).map((([t,i])=>this._createSelectableButton(e,i.label,i.icon,o,t)))),a.buttonView.set({icon:i,tooltip:e.t(t),withText:!i}),a.buttonView.bind("label").to(this,o,(t=>e.t(s[t]?s[t].label:c.label))),i===s[n].icon&&a.buttonView.bind("icon").to(this,o,(e=>s[e]?s[e].icon:c.icon)),a}_createSelectableButton(e,t,i,o,s){const n=new p.ButtonView;return n.set({label:e.t(t),icon:i,tooltip:!!i,isToggleable:!0,withText:!i}),n.bind("isOn").to(this,o,(e=>e===s)),this.listenTo(n,"execute",(()=>{this.set(o,s)})),n}_createActionButton(e,t,i,o){const s=new p.ButtonView;return s.set({label:e.t(t),icon:i,class:o,tooltip:!!i,withText:!i}),s}_createInput(e,t){const i=new p.LabeledFieldView(e,p.createLabeledInputText);return i.label=e.t(t),i}_enableFocusTracking(){this.focusTracker=new h.FocusTracker,this.keystrokes=new h.KeystrokeHandler,this.focusTracker.on("change:focusedElement",((e,t,i)=>{i===this.valueInputView.element&&this.valueInputView.fieldView.element.select()})),this.focusCycler=new p.FocusCycler({focusables:this.childViews,focusTracker:this.focusTracker,keystrokeHandler:this.keystrokes,actions:{focusPrevious:"shift + tab",focusNext:"tab"}})}}class b extends e.Plugin{static get requires(){return[p.ContextualBalloon]}init(){const e=this.editor,t=e.commands.get("insertMap"),i=e.editing.view.document,o=e.ui.componentFactory;this._balloon=e.plugins.get(p.ContextualBalloon),this.formView=this._createFormView(e.locale),o.add("map",(e=>{const o=new p.ButtonView(e);return o.set({label:e.t("Map"),icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>',tooltip:!0,isToggleable:!0}),o.bind("isEnabled").to(t,"isEnabled"),o.bind("isOn").to(t,"existingMapSelected"),this.listenTo(o,"execute",(()=>{this._showUI(t.existingMapSelected)})),this.listenTo(i,"click",(()=>{t.existingMapSelected&&this._showUI(t.existingMapSelected)})),o}))}_createFormView(e){const t=this.editor,i=new w(e);return this.listenTo(i,"submit",(()=>{t.execute("insertMap",{value:i.valueInputView.fieldView.element.value,size:i.size}),this._hideUI()})),this.listenTo(i,"cancel",(()=>this._hideUI())),(0,p.clickOutsideHandler)({emitter:i,activator:()=>this._balloon.visibleView===i,contextElements:[this._balloon.view.element],callback:()=>this._hideUI()}),i.keystrokes.set("Esc",((e,t)=>{this._hideUI(),t()})),i}_showUI(e){if(this._balloon.add({view:this.formView,position:this._getBalloonPositionData()}),e){const t=e.getAttribute("mapLocation");t&&"campusMap"===e.name?this.formView.value=c(t):t&&"googleMap"===e.name&&(this.formView.value=r(t)),this.formView.size=e.getAttribute("mapSize"),this.editor.model.change((t=>t.setSelection(e,"on")))}this.formView.focus()}_hideUI(){this.formView.reset(),this._balloon.remove(this.formView),this.editor.editing.view.focus()}_getBalloonPositionData(){const e=this.editor.editing.view,t=e.document;return{target:()=>e.domConverter.viewRangeToDom(t.selection.getFirstRange())}}}class g extends e.Plugin{static get requires(){return[u,b]}}const f={Map:g}})(),o=o.default})()));