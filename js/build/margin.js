!function(e,_){"object"==typeof exports&&"object"==typeof module?module.exports=_():"function"==typeof define&&define.amd?define([],_):"object"==typeof exports?exports.CKEditor5=_():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.margin=_())}(self,(()=>(()=>{var __webpack_modules__={"./js/ckeditor5_plugins/margin/src/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _margin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./margin */ "./js/ckeditor5_plugins/margin/src/margin.js");\n/**\n * @file The build process always expects an index.js file. Anything exported\n * here will be recognized by CKEditor 5 as an available plugin. Multiple\n * plugins can be exported in this one file.\n *\n * I.e. this file\'s purpose is to make plugin(s) discoverable.\n */\n// cSpell:ignore tooltip\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  Margin: _margin__WEBPACK_IMPORTED_MODULE_0__["default"]\n});\n\n\n//# sourceURL=webpack://CKEditor5.margin/./js/ckeditor5_plugins/margin/src/index.js?')},"./js/ckeditor5_plugins/margin/src/insertmargincommand.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MarginCommand)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n\n\nclass MarginCommand extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Command {\n  execute() {\n    const model = this.editor.model;\n    const selection = model.document.selection;\n\n    model.change(writer => {\n      // Call the addCloseMargin function to create the div with the class\n      const closeMargin = addCloseMargin(writer);\n      \n      // Insert the created div at the current selection position\n      model.insertContent(closeMargin, selection);\n    });\n  }\n\n  refresh() {\n    const model = this.editor.model;\n    const selection = model.document.selection;\n\n    // Determine if the cursor (selection) is in a position where adding a\n    // div with the class \"close-margin\" is permitted.\n    const allowedIn = model.schema.findAllowedParent(\n      selection.getFirstPosition(),\n      'close-margin'\n    );\n\n    // Enable/disable the toolbar button based on whether it's allowed\n    this.isEnabled = allowedIn !== null;\n  }\n}\n\nfunction addCloseMargin(writer) {\n  const marginDiv = writer.createElement('close-margin');\n  \n  // Create an empty text node and append it to the div\n  const textNode = writer.createText('');\n  writer.append(textNode, marginDiv);\n\n  return marginDiv;\n}\n\n\n//# sourceURL=webpack://CKEditor5.margin/./js/ckeditor5_plugins/margin/src/insertmargincommand.js?")},"./js/ckeditor5_plugins/margin/src/margin.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Margin)\n/* harmony export */ });\n/* harmony import */ var _marginediting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./marginediting */ "./js/ckeditor5_plugins/margin/src/marginediting.js");\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ckeditor5/src/core */ "ckeditor5/src/core.js");\n/* harmony import */ var _marginui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./marginui */ "./js/ckeditor5_plugins/margin/src/marginui.js");\n/**\n * @file This is what CKEditor refers to as a master (glue) plugin. Its role is\n * just to load the “editing” and “UI” components of this Plugin. Those\n * components could be included in this file, but\n *\n * I.e, this file\'s purpose is to integrate all the separate parts of the plugin\n * before it\'s made discoverable via index.js.\n */\n// cSpell:ignore tooltipEditing tooltipUI\n\n// The contents of TooltipUI and TooltipEditing could be included in this\n// file, but it is recommended to separate these concerns in different files.\n\n\n\n\n// Note that TooltipEditing and TooltipUI also extend `Plugin`, but these\n  // are not seen as individual plugins by CKEditor 5. CKEditor 5 will only\n  // discover the plugins explicitly exported in index.js.\n  class Margin extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_1__.Plugin {\n    static get requires() {\n      return [ _marginediting__WEBPACK_IMPORTED_MODULE_0__["default"], _marginui__WEBPACK_IMPORTED_MODULE_2__["default"] ];\n    }\n\n    static get pluginName() {\n      return \'margin\';\n    }\n  }\n\n//# sourceURL=webpack://CKEditor5.margin/./js/ckeditor5_plugins/margin/src/margin.js?')},"./js/ckeditor5_plugins/margin/src/marginediting.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MarginEditing)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ckeditor5/src/widget */ \"ckeditor5/src/widget.js\");\n/* harmony import */ var _insertmargincommand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./insertmargincommand */ \"./js/ckeditor5_plugins/margin/src/insertmargincommand.js\");\n\n \n\n\nclass MarginEditing extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n  static get requires() {\n    return [ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_1__.Widget];\n  }\n\n  init() {\n    this._defineSchema();\n    this._defineConverters();\n    this.editor.commands.add('addCloseMargin', new _insertmargincommand__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.editor)); // Use 'addCloseMargin' as the command name\n  }\n\n\t_defineSchema() {\n\t\tconst schema = this.editor.model.schema;\n    \t// Extend the text node's schema to accept the tooltip attribute.\n\t\tschema.register( 'close-margin', {\n\t\t\tallowWhere: '$block',\n\t\t\tallowChildren: false\n\t\t} );\n\t}\n\t_defineConverters() {\n\t\tconst {conversion} = this.editor;\n\n\t\t// Conversion from a view element to a model attribute\n\t\tconversion.for( 'upcast' ).elementToElement( {\n\t\t\tmodel: 'close-margin',\n\t\t\tview: {\n\t\t\t\tname: 'div',\n\t\t\t\tclasses:  'margin-close'\n\t\t\t},\n\t\t} );\n\n        // Conversion from a model attribute to a view element\n\t\tconversion.for( 'dataDowncast' ).elementToElement( {\n\t\t\tmodel: 'close-margin',\n\n            // Callback function provides access to the model attribute value\n\t\t\t// and the DowncastWriter\n\t\t\tview: {\n\t\t\t\tname: 'div',\n\t\t\t\tclasses: 'margin-close',\n\t\t\t}\n\t\t} );\n\n\t\tconversion.for('editingDowncast').elementToElement({\n\t\t\tmodel: 'close-margin',\n\t\t\tview: {\n\t\t\t\tname: 'div',\n\t\t\t\tclasses: 'margin-close'\n\t\t\t}\n\t\t})\n\n\n\t}\n}\n\n//# sourceURL=webpack://CKEditor5.margin/./js/ckeditor5_plugins/margin/src/marginediting.js?")},"./js/ckeditor5_plugins/margin/src/marginui.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MarginUI)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ckeditor5/src/ui */ \"ckeditor5/src/ui.js\");\n/* harmony import */ var _icons_compress_alt_solid_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../icons/compress-alt-solid.svg */ \"./icons/compress-alt-solid.svg\");\n\n \n\n\nclass MarginUI extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n  init() {\n    const editor = this.editor;\n\n    editor.ui.componentFactory.add('margin', locale => { // Pass the locale argument\n      const command = editor.commands.get('addCloseMargin');\n      const t = locale.t; // Use the locale for translation\n\n      const button = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__.ButtonView();\n      button.set({\n        label: t('Close Margin'), // Translate the label\n        icon: _icons_compress_alt_solid_svg__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n        tooltip: true,\n        withText: false,\n      });\n\n      button.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');\n\n      this.listenTo(button, 'execute', () =>\n      editor.execute('addCloseMargin')\n      );\n\n      return button;\n    });\n  }\n}\n\n\n//# sourceURL=webpack://CKEditor5.margin/./js/ckeditor5_plugins/margin/src/marginui.js?")},"./icons/compress-alt-solid.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 448 512\\">\x3c!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --\x3e<path d=\\"M4.686 427.314L104 328l-32.922-31.029C55.958 281.851 66.666 256 88.048 256h112C213.303 256 224 266.745 224 280v112c0 21.382-25.803 32.09-40.922 16.971L152 376l-99.314 99.314c-6.248 6.248-16.379 6.248-22.627 0L4.686 449.941c-6.248-6.248-6.248-16.379 0-22.627zM443.314 84.686L344 184l32.922 31.029c15.12 15.12 4.412 40.971-16.97 40.971h-112C234.697 256 224 245.255 224 232V120c0-21.382 25.803-32.09 40.922-16.971L296 136l99.314-99.314c6.248-6.248 16.379-6.248 22.627 0l25.373 25.373c6.248 6.248 6.248 16.379 0 22.627z\\"/></svg>");\n\n//# sourceURL=webpack://CKEditor5.margin/./icons/compress-alt-solid.svg?')},"ckeditor5/src/core.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/core.js");\n\n//# sourceURL=webpack://CKEditor5.margin/delegated_./core.js_from_dll-reference_CKEditor5.dll?')},"ckeditor5/src/ui.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/ui.js");\n\n//# sourceURL=webpack://CKEditor5.margin/delegated_./ui.js_from_dll-reference_CKEditor5.dll?')},"ckeditor5/src/widget.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/widget.js");\n\n//# sourceURL=webpack://CKEditor5.margin/delegated_./widget.js_from_dll-reference_CKEditor5.dll?')},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},__webpack_module_cache__={};function __webpack_require__(e){var _=__webpack_module_cache__[e];if(void 0!==_)return _.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](n,n.exports,__webpack_require__),n.exports}__webpack_require__.d=(e,_)=>{for(var n in _)__webpack_require__.o(_,n)&&!__webpack_require__.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:_[n]})},__webpack_require__.o=(e,_)=>Object.prototype.hasOwnProperty.call(e,_),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__("./js/ckeditor5_plugins/margin/src/index.js");return __webpack_exports__=__webpack_exports__.default,__webpack_exports__})()));