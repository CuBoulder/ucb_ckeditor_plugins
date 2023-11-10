!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.invisible=t())}(self,(()=>(()=>{var e=[(e,t,i)=>{e.exports=i(1)("./src/core.js")},e=>{"use strict";e.exports=CKEditor5.dll},(e,t,i)=>{e.exports=i(1)("./src/widget.js")},,(e,t,i)=>{e.exports=i(1)("./src/ui.js")}],t={};function i(n){var s=t[n];if(void 0!==s)return s.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,i),o.exports}i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var n={};return(()=>{"use strict";i.d(n,{default:()=>u});var e=i(0);class t extends e.Command{constructor(e){super(e)}execute(e){const t=this.editor.model,i=t.document.selection,n=s(i.getSelectedElement())?o(i.getSelectedElement()):null,l=function(e){const t=e.getFirstRange();let i="";for(const e of t.getItems())console.log(e.data),i+=e.data;return i}(i);t.change((i=>{let s=!1;if(n){const t=n.getChild(0);t&&i.remove(t),i.appendText(e||"Invisible Content",n)}else{const n=i.createElement("ucb-invisible");i.appendText(e||l||"Invisible Content",n),t.insertContent(n),i.setSelection(n,"on"),s=!0,s&&setTimeout((()=>{const t=this.editor.ui.labeledInput;t&&(t.fieldView.value=e||l,t.fieldView.focus())}),0)}}))}refresh(){const e=this.editor.model,t=e.document.selection,i=e.schema.findAllowedParent(t.getFirstPosition(),"ucb-invisible"),n=o(t.getSelectedElement());this.isEnabled=null!==i||null!==n,this.value=!!n;const s=this.editor.ui.labeledInput;if(s)if(n){const e=n.getChild(0);s.fieldView.value=e?e.data:""}else s.fieldView.value=""}updateText(e){this._text=e}}function s(e){return e&&"ucb-invisible"===e.name}function o(e){return s(e)?e:null}var l=i(2);class r extends e.Plugin{static get requires(){return[l.Widget]}init(){this._defineSchema(),this._defineConverters(),this.editor.commands.add("addInvisible",new t(this.editor))}_defineSchema(){this.editor.model.schema.register("ucb-invisible",{isObject:!0,allowWhere:"$text",allowContentOf:"$block",isInline:!0})}_defineConverters(){const{conversion:e}=this.editor;e.for("upcast").elementToElement({model:(e,{writer:t})=>t.createElement("ucb-invisible"),view:{name:"span",classes:"sr-only"}}),e.for("dataDowncast").elementToElement({model:"ucb-invisible",view:{name:"span",classes:"sr-only"}}),e.for("editingDowncast").elementToElement({model:"ucb-invisible",view:(e,{writer:t})=>{const i=function(e){const t=e.createContainerElement("span",{class:"ucb-invisible"});return(0,l.toWidget)(t,e,{label:"invisible widget",hasSelectionHandle:!0})}(t);return i}})}}var c=i(4);class d extends e.Plugin{static get requires(){return[l.WidgetToolbarRepository]}init(){const e=this.editor,t=e.commands,i=e.ui.componentFactory;i.add("invisible",(i=>{const n=new c.ButtonView(i),s=t.get("addInvisible");return n.label="Screen-Reader Only",n.icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM213.5 173.3l72 144c5.9 11.9 1.1 26.3-10.7 32.2s-26.3 1.1-32.2-10.7l-9.4-18.9H150.9l-9.4 18.9c-5.9 11.9-20.3 16.7-32.2 10.7s-16.7-20.3-10.7-32.2l72-144c4.1-8.1 12.4-13.3 21.5-13.3s17.4 5.1 21.5 13.3zm-.4 106.6L192 237.7l-21.1 42.2h42.2zM304 184c0-13.3 10.7-24 24-24h56c53 0 96 43 96 96s-43 96-96 96H328c-13.3 0-24-10.7-24-24V184zm48 24v96h32c26.5 0 48-21.5 48-48s-21.5-48-48-48H352z"/></svg>',n.tooltip=!0,n.withText=!1,n.isToggleable=!0,n.bind("isOn","isEnabled").to(s,"value","isEnabled"),this.listenTo(n,"execute",(()=>e.execute("addInvisible"))),n})),i.add("invisibleInnerText",(e=>this._createInput(e,"Screen-Reader Text")))}afterInit(){this.editor.plugins.get(l.WidgetToolbarRepository).register("invisible",{items:["invisibleInnerText"],getRelatedElement:e=>{const t=e.getSelectedElement();if(t&&t.is("element")&&t.hasClass("ucb-invisible")){const e=t.getChild(0),i=e?e.data:"",n=this.editor.ui.labeledInput;return n&&(n.fieldView.value=i),t}return null}})}_createInput(e,t){const i=new c.LabeledFieldView(e,c.createLabeledInputText);return i.label=e.t(t),this.listenTo(i.fieldView,"input",(()=>{const e=i.fieldView.element.value,t=this.editor.commands.get("addInvisible");t&&(t.updateText(e),t.execute(e))})),this.editor.ui.labeledInput=i,i}}class a extends e.Plugin{static get requires(){return[r,d]}static get pluginName(){return"ucb-invisible"}}const u={Invisible:a}})(),n=n.default})()));