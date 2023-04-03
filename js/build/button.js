!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.button=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,s)=>{e.exports=s("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(e,t,s)=>{e.exports=s("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/utils.js":(e,t,s)=>{e.exports=s("dll-reference CKEditor5.dll")("./src/utils.js")},"ckeditor5/src/widget.js":(e,t,s)=>{e.exports=s("dll-reference CKEditor5.dll")("./src/widget.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function s(i){var c=t[i];if(void 0!==c)return c.exports;var l=t[i]={exports:{}};return e[i](l,l.exports,s),l.exports}s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};return(()=>{"use strict";s.d(i,{default:()=>d});var e=s("ckeditor5/src/core.js");class t extends e.Command{execute({color:e,style:t,size:s,href:i,classes:c}){const l=this.editor.model,o=l.document.selection;l.change((l=>{const n=function(e,t,s,i,c,l){const o=e.createElement("ucb-button",{class:`ucb-button-${t} ucb-button-${s} ucb-button-${i} ${l}`,href:c});return o}(l,e,t,s,i,c),r=o.getFirstPosition();l.insert(n,r),l.setSelection(n,"on")}))}refresh(){const e=this.editor.model,t=e.document.selection,s=e.schema.findAllowedParent(t.getFirstPosition(),"ucb-button");this.isEnabled=null!==s;const i=t.getSelectedElement();if(i&&"ucb-button"===i.name){const t=i.getAttributes(),s=e.getAttribute("color"),c=e.getAttribute("style"),l=e.getAttribute("size"),o=[];s&&o.push(`ucb-button-${s}`),c&&o.push(`ucb-button-${c}`),l&&o.push(`ucb-button-${l}`);const n=o.join(" ");n!==t.class&&e.change((e=>{e.setAttribute("class",n,i)}));const r=e.getAttribute("link");r!==t.href&&e.change((e=>{e.setAttribute("href",r,i)}))}}}var c=s("ckeditor5/src/widget.js");class l extends e.Plugin{static get requires(){return[c.Widget]}init(){this._defineSchema(),this._defineConverters(),this.editor.commands.add("addButton",new t(this.editor))}_defineSchema(){this.editor.model.schema.register("ucb-button",{isObject:!0,allowWhere:"$block",allowContentOf:"$block",allowAttributes:["class","href"]})}_defineConverters(){const{conversion:e}=this.editor;e.for("upcast").elementToElement({model:"ucb-button",view:(e,{model:t,styles:s})=>{const i=e.getAttribute("href"),c=Array.from(e.classList).filter((e=>e.startsWith("ucb-button-"))).map((e=>e.replace("ucb-button-","")));return t.createElement("ucb-button",{href:i,class:c.join(" ")})}}),e.for("dataDowncast").elementToElement({model:"ucb-button",view:(e,{writer:t})=>{const s=e.getAttribute("href"),i=e.getAttribute("class")||"";return t.createContainerElement("button",{href:s,class:`ucb-button ${i}`})}}),e.for("editingDowncast").elementToElement({model:"ucb-button",view:(e,{writer:t})=>{const s=e.getAttribute("href"),i=e.getAttribute("class")||"";return t.createContainerElement("button",{href:s,class:`ucb-button ${i}`})}})}}var o=s("ckeditor5/src/ui.js"),n=s("ckeditor5/src/utils.js");class r extends o.View{constructor(t){super(t),this.focusTracker=new n.FocusTracker,this.keystrokes=new n.KeystrokeHandler,this.colorSelectView=new o.LabeledFieldView(t),this.colorSelectView.label="Color",this.colorSelect=(0,o.createDropdown)(this.locale,{choices:[{value:"blue",label:"Blue"},{value:"black",label:"Black"},{value:"grey",label:"Grey"},{value:"white",label:"White"}]}),this.colorSelectView.fieldView=this.colorSelect,this.styleSelectView=new o.LabeledFieldView(t),this.styleSelectView.label="Style",this.styleSelect=(0,o.createDropdown)(this.locale,{choices:[{value:"Regular",label:"Regular"},{value:"Full",label:"Full"}]}),this.styleSelectView.fieldView=this.styleSelect,this.sizeSelectView=new o.LabeledFieldView(t),this.sizeSelectView.label="Size",this.sizeSelect=(0,o.createDropdown)(this.locale,{choices:[{value:"Large",label:"Large"},{value:"Regular",label:"Regular"},{value:"Small",label:"Small"}]}),this.sizeSelectView.fieldView=this.sizeSelect,this.linkView=new o.LabeledFieldView(t),this.linkView.label="Link",this.linkInput=document.createElement("input"),this.linkInput.type="text",this.linkInput.placeholder="Enter link URL here",this.linkView.fieldView=this.linkInput,this.saveButtonView=new o.ButtonView(t),this.saveButtonView.label="Save",this.saveButtonView.icon=e.icons.check,this.saveButtonView.class="ck-button-save",this.saveButtonView.type="submit",this.cancelButtonView=new o.ButtonView(t),this.cancelButtonView.label="Cancel",this.cancelButtonView.icon=e.icons.cancel,this.cancelButtonView.class="ck-button-cancel",this.cancelButtonView.delegate("execute").to(this,"cancel"),this.focusCycler=new o.FocusCycler({actions:{focusPrevious:"up",focusNext:"down"}}),this.focusCycler.add(this.colorSelectView),this.focusCycler.add(this.styleSelectView),this.focusCycler.add(this.sizeSelectView),this.focusCycler.add(this.linkView),this.focusCycler.add(this.saveButtonView),this.focusCycler.add(this.cancelButtonView),this.submitHandler=new o.submitHandler,this.submitHandler.delegate("submit").to(this,"save"),this.keystrokes.listenTo(this.element),this.focusTracker.add(this.element)}}class u extends e.Plugin{init(){const e=this.editor;e.ui.componentFactory.add("button",(t=>{const s=e.commands.get("addButton"),i=new r(t);return i.set({label:"button",icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --\x3e<path d="M358.182 179.361c-19.493-24.768-52.679-31.945-79.872-19.098-15.127-15.687-36.182-22.487-56.595-19.629V67c0-36.944-29.736-67-66.286-67S89.143 30.056 89.143 67v161.129c-19.909-7.41-43.272-5.094-62.083 8.872-29.355 21.795-35.793 63.333-14.55 93.152l109.699 154.001C134.632 501.59 154.741 512 176 512h178.286c30.802 0 57.574-21.5 64.557-51.797l27.429-118.999A67.873 67.873 0 0 0 448 326v-84c0-46.844-46.625-79.273-89.818-62.639zM80.985 279.697l27.126 38.079c8.995 12.626 29.031 6.287 29.031-9.283V67c0-25.12 36.571-25.16 36.571 0v175c0 8.836 7.163 16 16 16h6.857c8.837 0 16-7.164 16-16v-35c0-25.12 36.571-25.16 36.571 0v35c0 8.836 7.163 16 16 16H272c8.837 0 16-7.164 16-16v-21c0-25.12 36.571-25.16 36.571 0v21c0 8.836 7.163 16 16 16h6.857c8.837 0 16-7.164 16-16 0-25.121 36.571-25.16 36.571 0v84c0 1.488-.169 2.977-.502 4.423l-27.43 119.001c-1.978 8.582-9.29 14.576-17.782 14.576H176c-5.769 0-11.263-2.878-14.697-7.697l-109.712-154c-14.406-20.223 14.994-42.818 29.394-22.606zM176.143 400v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.733 0-14-7.163-14-16zm75.428 0v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.732 0-14-7.163-14-16zM327 400v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.732 0-14-7.163-14-16z"/></svg>',tooltip:!0,withText:!0}),i.bind("isEnabled").to(s),i.bind("isOn").to(s,"value","isEnabled").withDefaultValue(!1),this.listenTo(i,"execute",(()=>{const t={title:"Add Button",body:i.element,buttons:[{label:"Save",type:"submit",class:"ck-button"},{label:"Cancel",type:"button",class:"ck-button ck-button-secondary",onClick:()=>{e.editing.view.focus()}}],focus:(e,t)=>{i.focus()}};e.plugins.get("Dialog").open(t)})),i}))}}class a extends e.Plugin{static get requires(){return[l,u]}}const d={Button:a}})(),i=i.default})()));