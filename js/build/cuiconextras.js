!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.cuiconextras=t())}(self,(()=>(()=>{var e=[(e,t,o)=>{e.exports=o(2)("./src/core.js")},function(e,t,o){"use strict";var c=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.backgroundStyleDefault=t.backgroundStyleOptions=t.colorDefault=t.colorOptions=void 0;const n=c(o(10)),i=c(o(11)),s=c(o(12)),l=c(o(13));t.colorOptions={none:{label:"Same as text"},black:{label:"Black",className:"ucb-icon-color-black"},white:{label:"White",className:"ucb-icon-color-white"},lightGray:{label:"Light Gray",className:"ucb-icon-color-lightgray"},gray:{label:"Gray",className:"ucb-icon-color-gray"},darkGray:{label:"Dark Gray",className:"ucb-icon-color-darkgray"},gold:{label:"Gold",className:"ucb-icon-color-gold"}},t.colorDefault="none",t.backgroundStyleOptions={none:{label:"No background",icon:n.default},square:{label:"Square",icon:i.default,className:"ucb-icon-style-square"},squareRounded:{label:"Rounded Square",icon:s.default,className:"ucb-icon-style-square-rounded"},circle:{label:"Circle",icon:l.default,className:"ucb-icon-style-circle"}},t.backgroundStyleDefault="none"},e=>{"use strict";e.exports=CKEditor5.dll},function(e,t,o){"use strict";var c=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=c(o(4));t.default={CUIconExtras:n.default}},function(e,t,o){"use strict";var c=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=c(o(5)),i=c(o(6)),s=o(0);class l extends s.Plugin{static get requires(){return[n.default,i.default]}}t.default=l},function(e,t,o){"use strict";var c=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=o(0),i=o(7),s=c(o(8)),l=o(1);class r extends n.Plugin{static get requires(){return[i.Widget]}init(){this._defineSchema(),this._defineConverters(),this._defineCommands()}_defineSchema(){this.editor.model.schema.extend("icon",{allowAttributes:["iconCUColor","iconCUBackgroundStyle"]})}_defineConverters(){const{conversion:e}=this.editor;e.attributeToAttribute(a("iconCUColor",l.colorOptions)),e.attributeToAttribute(a("iconCUBackgroundStyle",l.backgroundStyleOptions))}_defineCommands(){const e=this.editor.commands;e.add("changeIconCUColor",new s.default(this.editor,"iconCUColor",l.colorDefault)),e.add("changeIconCUBackgroundStyle",new s.default(this.editor,"iconCUBackgroundStyle",l.backgroundStyleDefault))}}function a(e,t){const o={},c=[];for(const[e,n]of Object.entries(t))n.className&&(c.push(e),o[e]={key:"class",value:n.className});return{model:{key:e,values:c},view:o}}t.default=r},function(e,t,o){"use strict";var c=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=o(14),i=o(1),s=o(0),l=o(7),r=c(o(15));class a extends s.Plugin{static get requires(){return[l.WidgetToolbarRepository]}init(){const e=this.editor,t=e.commands,o=e.ui.componentFactory;o.add("iconCUColor",(e=>u(e,"Icon theme color",r.default,t.get("changeIconCUColor"),i.colorOptions,i.colorDefault))),o.add("iconCUBackgroundStyle",(e=>u(e,"Icon background style",i.backgroundStyleOptions[i.backgroundStyleDefault].icon,t.get("changeIconCUBackgroundStyle"),i.backgroundStyleOptions,i.backgroundStyleDefault))),e.config.set("icon.toolbarItems",["iconSize","iconAlignment","iconStyle","iconCUColor","iconCUBackgroundStyle"])}}function u(e,t,o,c,i,s){const l=(0,n.createDropdown)(e),r=l.buttonView,a=e.t;return(0,n.addToolbarToDropdown)(l,Object.entries(i).map((([t,o])=>function(e,t,o,c,i){const s=c.editor,l=function(e,t,o,c,i){const s=new n.ButtonView(e);return s.set({label:"string"==typeof i?i:t,icon:o,tooltip:!!o&&t,withText:i||!o,class:c}),s}(e,t,o);return l.tooltip=!!o,l.isToggleable=!0,l.bind("isEnabled").to(c),l.bind("isOn").to(c,"value",(e=>e===i)),l.on("execute",(()=>{c.execute({value:i}),s.editing.view.focus()})),l}(e,o.label,o.icon,c,t)))),r.set({label:a(t),icon:o,tooltip:a(t),withText:!o,class:"ck-dropdown__button_label-width_auto"}),o===i[s].icon&&c.on("change:value",((e,t,o)=>{const c=i[o];r.label=a(c.label),r.icon&&!c.icon?r.children.remove(r.iconView):!r.icon&&c.icon&&r.children.add(r.iconView,0),r.icon=c.icon,r.withText=!c.icon})),l.bind("isEnabled").to(c,"isEnabled"),l}t.default=a},(e,t,o)=>{e.exports=o(2)("./src/widget.js")},(e,t,o)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const c=o(0),n=o(9);class i extends c.Command{constructor(e,t,o){super(e),this.iconWidget=null,this.attributeName=t,this.defaultValue=o,this.value=o}refresh(){const e=this.editor.model,t=this.attributeName,o=this.defaultValue;this.iconWidget=(0,n.getSelectedIconWidget)(e.document.selection),this.isEnabled=!!this.iconWidget,this.isEnabled?this.value=this.iconWidget.hasAttribute(t)?this.iconWidget.getAttribute(t):o:this.value=o}execute(e={value:this.defaultValue}){const t=this.editor.model,o=this.iconWidget,c=this.attributeName,n=this.defaultValue;o&&t.change((t=>t.setAttribute(c,e.value||n,o)))}}t.default=i},(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getSelectedIconWidget=void 0,t.getSelectedIconWidget=function(e){const t=e.getSelectedElement();return t&&t.is("element")&&"icon"===t.name?t:null}},(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>c});const c='<svg version="1.1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m5.28 15.095 0.97-0.97h7.5l0.97 0.97c0.099 0.099 0.155 0.235 0.155 0.375 0 0.293-0.237 0.53-0.53 0.53h-8.69c-0.293 0-0.53-0.237-0.53-0.53 0-0.14 0.056-0.276 0.155-0.375zm0.22-6.595v-3.375c0-0.206 0.169-0.375 0.375-0.375h1.5c0.206 0 0.375 0.169 0.375 0.375v0.938c0 0.103 0.084 0.187 0.188 0.187h0.75c0.103 0 0.187-0.084 0.187-0.187v-0.938c0-0.206 0.169-0.375 0.375-0.375h1.5c0.206 0 0.375 0.169 0.375 0.375v0.938c0 0.103 0.084 0.187 0.188 0.187h0.75c0.103 0 0.187-0.084 0.187-0.187v-0.938c0-0.206 0.169-0.375 0.375-0.375h1.5c0.206 0 0.375 0.169 0.375 0.375v3.375c0 0.237-0.11 0.459-0.3 0.6l-1.2 0.9 0.375 3.375h-6.75l0.375-3.375-1.2-0.9c-0.19-0.141-0.3-0.363-0.3-0.6zm4.125 2.25h0.75c0.206 0 0.375-0.169 0.375-0.375v-1.125c0-0.415-0.335-0.75-0.75-0.75s-0.75 0.335-0.75 0.75v1.125c0 0.206 0.169 0.375 0.375 0.375z"/></svg>'},(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>c});const c='<svg version="1.1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m19 1h-18v18h18v-18zm-13.72 14.095 0.97-0.97h7.5l0.97 0.97c0.099 0.099 0.155 0.235 0.155 0.375 0 0.293-0.237 0.53-0.53 0.53h-8.69c-0.293 0-0.53-0.237-0.53-0.53 0-0.14 0.056-0.276 0.155-0.375zm0.22-6.595v-3.375c0-0.206 0.169-0.375 0.375-0.375h1.5c0.206 0 0.375 0.169 0.375 0.375v0.938c0 0.103 0.084 0.187 0.188 0.187h0.75c0.103 0 0.187-0.084 0.187-0.187v-0.938c0-0.206 0.169-0.375 0.375-0.375h1.5c0.206 0 0.375 0.169 0.375 0.375v0.938c0 0.103 0.084 0.187 0.188 0.187h0.75c0.103 0 0.187-0.084 0.187-0.187v-0.938c0-0.206 0.169-0.375 0.375-0.375h1.5c0.206 0 0.375 0.169 0.375 0.375v3.375c0 0.237-0.11 0.459-0.3 0.6l-1.2 0.9 0.375 3.375h-6.75l0.375-3.375-1.2-0.9c-0.19-0.141-0.3-0.363-0.3-0.6zm4.125 2.25h0.75c0.206 0 0.375-0.169 0.375-0.375v-1.125c0-0.415-0.335-0.75-0.75-0.75s-0.75 0.335-0.75 0.75v1.125c0 0.206 0.169 0.375 0.375 0.375z"/></svg>'},(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>c});const c='<svg version="1.1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m19 5.5c0-2.484-2.016-4.5-4.5-4.5h-9c-2.484 0-4.5 2.016-4.5 4.5v9c0 2.484 2.016 4.5 4.5 4.5h9c2.484 0 4.5-2.016 4.5-4.5v-9zm-13.72 9.595 0.97-0.97h7.5l0.97 0.97c0.099 0.099 0.155 0.235 0.155 0.375 0 0.293-0.237 0.53-0.53 0.53h-8.69c-0.293 0-0.53-0.237-0.53-0.53 0-0.14 0.056-0.276 0.155-0.375zm0.22-6.595v-3.375c0-0.206 0.169-0.375 0.375-0.375h1.5c0.206 0 0.375 0.169 0.375 0.375v0.938c0 0.103 0.084 0.187 0.188 0.187h0.75c0.103 0 0.187-0.084 0.187-0.187v-0.938c0-0.206 0.169-0.375 0.375-0.375h1.5c0.206 0 0.375 0.169 0.375 0.375v0.938c0 0.103 0.084 0.187 0.188 0.187h0.75c0.103 0 0.187-0.084 0.187-0.187v-0.938c0-0.206 0.169-0.375 0.375-0.375h1.5c0.206 0 0.375 0.169 0.375 0.375v3.375c0 0.237-0.11 0.459-0.3 0.6l-1.2 0.9 0.375 3.375h-6.75l0.375-3.375-1.2-0.9c-0.19-0.141-0.3-0.363-0.3-0.6zm4.125 2.25h0.75c0.206 0 0.375-0.169 0.375-0.375v-1.125c0-0.415-0.335-0.75-0.75-0.75s-0.75 0.335-0.75 0.75v1.125c0 0.206 0.169 0.375 0.375 0.375z"/></svg>'},(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>c});const c='<svg version="1.1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m10 1.4004a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9zm-4.125 3.3496h1.5c0.206 0 0.375 0.169 0.375 0.375v0.9375c0 0.103 0.0835 0.1875 0.1875 0.1875h0.75c0.103 0 0.1875-0.0845 0.1875-0.1875v-0.9375c0-0.206 0.169-0.375 0.375-0.375h1.5c0.206 0 0.375 0.169 0.375 0.375v0.9375c0 0.103 0.0835 0.1875 0.1875 0.1875h0.75c0.103 0 0.1875-0.0845 0.1875-0.1875v-0.9375c0-0.206 0.169-0.375 0.375-0.375h1.5c0.206 0 0.375 0.169 0.375 0.375v3.375c0 0.237-0.11078 0.45861-0.30078 0.59961l-1.1992 0.90039 0.375 3.375h-6.75l0.375-3.375-1.1992-0.90039c-0.19-0.141-0.30078-0.36261-0.30078-0.59961v-3.375c0-0.206 0.169-0.375 0.375-0.375zm4.125 3.75c-0.415 0-0.75 0.335-0.75 0.75v1.125c0 0.206 0.169 0.375 0.375 0.375h0.75c0.206 0 0.375-0.169 0.375-0.375v-1.125c0-0.415-0.335-0.75-0.75-0.75zm-3.75 5.625h7.5l0.9707 0.9707c0.099 0.099 0.1543 0.235 0.1543 0.375 0 0.293-0.2363 0.5293-0.5293 0.5293h-8.6914c-0.293 0-0.5293-0.2363-0.5293-0.5293 0-0.14 0.055297-0.276 0.1543-0.375l0.9707-0.9707z"/></svg>'},(e,t,o)=>{e.exports=o(2)("./src/ui.js")},(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>c});const c='<svg version="1.1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">\x3c!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --\x3e<path d="m18 10v0.08437c-0.012504 1.1406-1.05 1.9156-2.1906 1.9156h-3.0594c-0.82812 0-1.5 0.67188-1.5 1.5 0 0.10625 0.0125 0.20938 0.03125 0.30938 0.06562 0.31875 0.20312 0.625 0.3375 0.93438 0.19062 0.43125 0.37812 0.85938 0.37812 1.3125 0 0.99375-0.675 1.8969-1.6688 1.9375-0.10938 0.003125-0.21875 0.00625-0.33125 0.00625-4.4156 0-7.9969-3.5812-7.9969-8s3.5812-8 8-8 8 3.5812 8 8zm-12 1a1 1 0 1 0-2 0 1 1 0 1 0 2 0zm0-3a1 1 0 1 0 0-2 1 1 0 1 0 0 2zm5-3a1 1 0 1 0-2 0 1 1 0 1 0 2 0zm3 3a1 1 0 1 0 0-2 1 1 0 1 0 0 2z" stroke-width=".03125"/></svg>'}],t={};function o(c){var n=t[c];if(void 0!==n)return n.exports;var i=t[c]={exports:{}};return e[c].call(i.exports,i,i.exports,o),i.exports}o.d=(e,t)=>{for(var c in t)o.o(t,c)&&!o.o(e,c)&&Object.defineProperty(e,c,{enumerable:!0,get:t[c]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var c=o(3);return c=c.default})()));