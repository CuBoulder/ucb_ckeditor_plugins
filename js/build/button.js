!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.button=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,i)=>{e.exports=i("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(e,t,i)=>{e.exports=i("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/utils.js":(e,t,i)=>{e.exports=i("dll-reference CKEditor5.dll")("./src/utils.js")},"ckeditor5/src/widget.js":(e,t,i)=>{e.exports=i("dll-reference CKEditor5.dll")("./src/widget.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function i(s){var l=t[s];if(void 0!==l)return l.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,i),o.exports}i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var s={};return(()=>{"use strict";i.d(s,{default:()=>d});var e=i("ckeditor5/src/core.js");class t extends e.Command{execute({color:e,style:t,size:i,href:s,classes:l}){const o=this.editor.model,c=o.document.selection;o.change((o=>{const n=function(e,t,i,s,l,o){const c=e.createElement("ucb-button",{class:`ucb-button-${t} ucb-button-${i} ucb-button-${s} ${o}`,href:l});return c}(o,e,t,i,s,l),r=c.getFirstPosition();o.insert(n,r),o.setSelection(n,"on")}))}refresh(){const e=this.editor.model,t=e.document.selection,i=e.schema.findAllowedParent(t.getFirstPosition(),"ucb-button");this.isEnabled=null!==i;const s=t.getSelectedElement();if(s&&"ucb-button"===s.name){const t=s.getAttributes(),i=e.getAttribute("color"),l=e.getAttribute("style"),o=e.getAttribute("size"),c=[];i&&c.push(`ucb-button-${i}`),l&&c.push(`ucb-button-${l}`),o&&c.push(`ucb-button-${o}`);const n=c.join(" ");n!==t.class&&e.change((e=>{e.setAttribute("class",n,s)}));const r=e.getAttribute("link");r!==t.href&&e.change((e=>{e.setAttribute("href",r,s)}))}}}var l=i("ckeditor5/src/widget.js");class o extends e.Plugin{static get requires(){return[l.Widget]}init(){this._defineSchema(),this._defineConverters(),this.editor.commands.add("addButton",new t(this.editor))}_defineSchema(){this.editor.model.schema.register("ucb-button",{isObject:!0,allowWhere:"$block",allowContentOf:"$block",allowAttributes:["class","href"]})}_defineConverters(){const{conversion:e}=this.editor;e.for("upcast").elementToElement({model:"ucb-button",view:(e,{model:t,styles:i})=>{const s=e.getAttribute("href"),l=Array.from(e.classList).filter((e=>e.startsWith("ucb-button-"))).map((e=>e.replace("ucb-button-","")));return t.createElement("ucb-button",{href:s,class:l.join(" ")})}}),e.for("dataDowncast").elementToElement({model:"ucb-button",view:(e,{writer:t})=>{const i=e.getAttribute("href"),s=e.getAttribute("class")||"";return t.createContainerElement("ucb-button",{href:i,class:`${s}`})}}),e.for("editingDowncast").elementToElement({model:"ucb-button",view:(e,{writer:t})=>{const i=e.getAttribute("href"),s=e.getAttribute("class")||"";return t.createContainerElement("ucb-button",{href:i,class:`${s}`})}})}}var c=i("ckeditor5/src/ui.js"),n=i("ckeditor5/src/utils.js");class r extends c.View{constructor(t){super(t),this.focusTracker=new n.FocusTracker,this.keystrokes=new n.KeystrokeHandler,this.colorSelectView=new c.LabeledFieldView(t),this.colorSelectView.label="Color",this.colorSelect=(0,c.createDropdown)(this.locale,{choices:[{value:"blue",label:"Blue"},{value:"black",label:"Black"},{value:"grey",label:"Grey"},{value:"white",label:"White"}]}),this.colorSelectView.fieldView=this.colorSelect,this.styleSelectView=new c.LabeledFieldView(t),this.styleSelectView.label="Style",this.styleSelect=(0,c.createDropdown)(this.locale,{choices:[{value:"Regular",label:"Regular"},{value:"Full",label:"Full"}]}),this.styleSelectView.fieldView=this.styleSelect,this.sizeSelectView=new c.LabeledFieldView(t),this.sizeSelectView.label="Size",this.sizeSelect=(0,c.createDropdown)(this.locale,{choices:[{value:"Large",label:"Large"},{value:"Regular",label:"Regular"},{value:"Small",label:"Small"}]}),this.sizeSelectView.fieldView=this.sizeSelect,this.linkView=new c.LabeledFieldView(t),this.linkView.label="Link",this.linkInput=document.createElement("input"),this.linkInput.type="text",this.linkInput.placeholder="Enter link URL here",this.linkView.fieldView=this.linkInput,this.saveButtonView=new c.ButtonView(t),this.saveButtonView.label="Save",this.saveButtonView.icon=e.icons.check,this.saveButtonView.class="ck-button-save",this.saveButtonView.type="submit",this.cancelButtonView=new c.ButtonView(t),this.cancelButtonView.label="Cancel",this.cancelButtonView.icon=e.icons.cancel,this.cancelButtonView.class="ck-button-cancel",this.cancelButtonView.set({type:"button"}),this.childViews=this.createCollection([this.linkInput,this.sizeSelect,this.colorSelect,this.styleSelect,this.saveButtonView,this.cancelButtonView]),this._focusCycler=new c.FocusCycler({focusables:this.childViews,focusTracker:this.focusTracker,keystrokeHandler:this.keystrokes,actions:{focusPrevious:"shift + tab",focusNext:"tab"}}),this.setTemplate({tag:"form",attributes:{class:["ck","ck-button-form"],tabindex:"-1"},children:this.childViews})}render(){super.render(),(0,c.submitHandler)({view:this}),this.childViews._items.forEach((e=>{this.focusTracker.add(e.element)})),this.keystrokes.listenTo(this.element)}destroy(){super.destroy(),this.focusTracker.destroy(),this.keystrokes.destroy()}}class a extends e.Plugin{static get requires(){return[c.ContextualBalloon]}init(){const e=this.editor;this._balloon=this.editor.plugins.get(c.ContextualBalloon),e.ui.componentFactory.add("ucb-button",(()=>{const t=e.commands.get("addButton"),i=new c.ButtonView;return i.set({label:"Add Button",icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --\x3e<path d="M358.182 179.361c-19.493-24.768-52.679-31.945-79.872-19.098-15.127-15.687-36.182-22.487-56.595-19.629V67c0-36.944-29.736-67-66.286-67S89.143 30.056 89.143 67v161.129c-19.909-7.41-43.272-5.094-62.083 8.872-29.355 21.795-35.793 63.333-14.55 93.152l109.699 154.001C134.632 501.59 154.741 512 176 512h178.286c30.802 0 57.574-21.5 64.557-51.797l27.429-118.999A67.873 67.873 0 0 0 448 326v-84c0-46.844-46.625-79.273-89.818-62.639zM80.985 279.697l27.126 38.079c8.995 12.626 29.031 6.287 29.031-9.283V67c0-25.12 36.571-25.16 36.571 0v175c0 8.836 7.163 16 16 16h6.857c8.837 0 16-7.164 16-16v-35c0-25.12 36.571-25.16 36.571 0v35c0 8.836 7.163 16 16 16H272c8.837 0 16-7.164 16-16v-21c0-25.12 36.571-25.16 36.571 0v21c0 8.836 7.163 16 16 16h6.857c8.837 0 16-7.164 16-16 0-25.121 36.571-25.16 36.571 0v84c0 1.488-.169 2.977-.502 4.423l-27.43 119.001c-1.978 8.582-9.29 14.576-17.782 14.576H176c-5.769 0-11.263-2.878-14.697-7.697l-109.712-154c-14.406-20.223 14.994-42.818 29.394-22.606zM176.143 400v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.733 0-14-7.163-14-16zm75.428 0v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.732 0-14-7.163-14-16zM327 400v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.732 0-14-7.163-14-16z"/></svg>',tooltip:!0}),i.bind("isEnabled").to(t),i.bind("isOn").to(t,"value","isEnabled").withDefaultValue(!1),this.listenTo(i,"execute",(()=>{this._showUI(),e.execute("addButton")})),i}))}_createFormView(){const e=this.editor,t=new r(e.locale);return this.listenTo(t,"submit",(()=>{const i={color:t.colorSelect.fieldView.element.value,style:t.styleSelect.fieldView.element.value,size:t.sizeSelect.fieldView.element.value,link:t.linkInput.fieldView.element.value};e.execute("addButton",i),this._hideUI()})),this.listenTo(t,"cancel",(()=>{this._hideUI()})),clickOutsideHandler({emitter:t,activator:()=>this._balloon.visibleView===t,contextElements:[this._balloon.view.element],callback:()=>this._hideUI()}),t}_showUI(){const e=this.editor.model.document.selection,t=this.editor.commands.get("addButton").value;if(this._balloon.add({view:this.formView,position:this._getBalloonPositionData()}),this.formView.abbrInputView.isEnabled=e.getFirstRange().isCollapsed,t)this.formView.colorSelect.fieldView.value=t.color,this.formView.styleSelect.fieldView.value=t.title,this.formView.sizeSelect.fieldView.value=t.size,this.formView.linkInput.fieldView.value=t.link;else{const t=getRangeText(e.getFirstRange());this.formView.linkInput.fieldView.value=t}this.formView.focus()}_hideUI(){this.formView.linkInput.fieldView.value="",this.formView.element.reset(),this._balloon.remove(this.formView),this.editor.editing.view.focus()}_getBalloonPositionData(){const e=this.editor.editing.view,t=e.document;let i=null;return i=()=>e.domConverter.viewRangeToDom(t.selection.getFirstRange()),{target:i}}}class u extends e.Plugin{static get requires(){return[o,a]}}const d={Button:u}})(),s=s.default})()));