!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.CKEditor5=e():(t.CKEditor5=t.CKEditor5||{},t.CKEditor5.button=e())}(self,(()=>(()=>{var __webpack_modules__={"./js/ckeditor5_plugins/button/src/button.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Button)\n/* harmony export */ });\n/* harmony import */ var _buttonediting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buttonediting */ "./js/ckeditor5_plugins/button/src/buttonediting.js");\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ckeditor5/src/core */ "ckeditor5/src/core.js");\n/* harmony import */ var _buttonui_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buttonui.js */ "./js/ckeditor5_plugins/button/src/buttonui.js");\n\n\n\n\n/**\n * @file This is what CKEditor refers to as a master (glue) plugin. Its role is\n * just to load the “editing” and “UI” components of this Plugin. Those\n * components could be included in this file, but\n *\n * I.e, this file\'s purpose is to integrate all the separate parts of the plugin\n * before it\'s made discoverable via index.js.\n */\n\n// The contents of ButtonUI and ButtonEditing could be included in this\n// file, but it is recommended to separate these concerns in different files.\n  class Button extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_1__.Plugin {\n    static get requires() {\n      return [ _buttonediting__WEBPACK_IMPORTED_MODULE_0__["default"], _buttonui_js__WEBPACK_IMPORTED_MODULE_2__["default"] ];\n    }\n  }\n\n//# sourceURL=webpack://CKEditor5.button/./js/ckeditor5_plugins/button/src/button.js?')},"./js/ckeditor5_plugins/button/src/buttonconfig.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"colorOptions\": () => (/* binding */ colorOptions),\n/* harmony export */   \"defaultColor\": () => (/* binding */ defaultColor),\n/* harmony export */   \"defaultSize\": () => (/* binding */ defaultSize),\n/* harmony export */   \"defaultStyle\": () => (/* binding */ defaultStyle),\n/* harmony export */   \"sizeOptions\": () => (/* binding */ sizeOptions),\n/* harmony export */   \"styleOptions\": () => (/* binding */ styleOptions)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n\n\nconst sizeOptions = {\n\tlarge: {\n\t\tlabel: 'Large',\n\t\ticon: ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.icons.large,\n\t\tclassName: 'ucb-button-large'\n\t},\n\tregular: {\n\t\tlabel: 'Regular',\n\t\ticon: ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.icons.regular,\n\t\tclassName: 'ucb-button-regular'\n\t},\n\tsmall: {\n\t\tlabel: 'Small',\n\t\ticon: ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.icons.small,\n\t\tclassName: 'ucb-button-small'\n\t},\n};\n\nconst defaultSize = 'regular'\n\nconst colorOptions = {\n\tblue: {\n\t\tlabel: 'Blue',\n\t\tclassName: 'ucb-button-blue'\n\t},\n\tblack: {\n\t\tlabel: 'Black',\n\t\tclassName: 'ucb-button-black'\n\t},\n\tgrey: {\n\t\tlabel: 'Grey',\n\t\tclassName: 'ucb-button-grey'\n\t},\n\twhite: {\n\t\tlabel: 'White',\n\t\tclassName: 'ucb-button-white'\n\t},\n\tgold: {\n\t\tlabel: 'Gold',\n\t\tclassName: 'ucb-button-gold'\n\t}\n};\n\nconst defaultColor = 'black'\n\nconst styleOptions = {\n\tfull: {\n\t\tlabel: 'Full',\n\t\ticon: ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.icons.objectFullWidth,\n\t\tclassName: 'ucb-button-full'\n\t},\n\tdefault: {\n\t\tlabel: 'Default',\n\t\ticon: ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.icons.objectCenter,\n\t\tclassName: 'ucb-button-default'\n\t},\n};\n\nconst defaultStyle = 'default'\n\n//# sourceURL=webpack://CKEditor5.button/./js/ckeditor5_plugins/button/src/buttonconfig.js?")},"./js/ckeditor5_plugins/button/src/buttonediting.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ButtonEditing)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var _insertbuttoncommand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insertbuttoncommand */ \"./js/ckeditor5_plugins/button/src/insertbuttoncommand.js\");\n/* harmony import */ var ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ckeditor5/src/widget */ \"ckeditor5/src/widget.js\");\n/* harmony import */ var _buttonconfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./buttonconfig */ \"./js/ckeditor5_plugins/button/src/buttonconfig.js\");\n\n\n\n\n\nclass ButtonEditing extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n  static get requires() {\n    return [ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_2__.Widget];\n  }\n\n  init() {\n    this._defineSchema();\n    this._defineConverters();\n    this.editor.commands.add('addButton', new _insertbuttoncommand__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.editor));\n  }\n\n  // Schemas are registered via the central `editor` object.\n  _defineSchema() {\n    const schema = this.editor.model.schema;\n    schema.register('ucb-button', {\n      isObject: true,\n      allowWhere: '$block',\n      allowContentOf: '$block',\n      allowAttributes: ['href'],\n      allowChildren: true\n    });\n\n    schema.register('ucb-button-wrapper', {\n      allowWhere: '$block',\n      allowContentOf: '$block',\n      isObject: true,\n      allowAttributes: ['color', 'style', 'size'],\n\t\t\tallowChildren: 'ucb-button'\n\t\t});\n\n  }\n\n\n  \t/**\n\t * Converters determine how CKEditor 5 models are converted into markup and\n\t * vice-versa.\n\t */\n  _defineConverters() {\n    \t\t// Converters are registered via the central editor object.\n    const { conversion } = this.editor;\n\n\n    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('size', _buttonconfig__WEBPACK_IMPORTED_MODULE_3__.sizeOptions));\n    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('color', _buttonconfig__WEBPACK_IMPORTED_MODULE_3__.colorOptions));\n    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('style', _buttonconfig__WEBPACK_IMPORTED_MODULE_3__.styleOptions));\n\n    /*\n    If <div class=\"ucb-button\"> is present in the existing markup,\n     processed by CKEditor, then CKEditor recognizes and loads it as a\n\t\t<ucb-button> model.  \n    */\n\n    conversion.for('upcast').add(dispatcher => {\n      // A converter for links (<a>).\n      dispatcher.on('element:a', (evt, data, conversionApi) => {\n          if (conversionApi.consumable.consume(data.viewItem, { name: '$text', attributes: ['href'] })) {\n              // The <a> element is inline and is represented by an attribute in the model.\n              // This is why you need to convert only children.\n              const { modelRange } = conversionApi.convertChildren(data.viewItem, data.modelCursor);\n    \n              for (let item of modelRange.getItems()) {\n                  if (conversionApi.schema.getAttribute(item, 'linkHref')) {\n                      conversionApi.writer.removeAttribute('linkHref', item);\n                  }\n                 const modelElement = conversionApi.writer.createElement('ucb-button')\n                  const href = conversionApi.schema('linkHref');\n                  if (href) {\n                    conversionApi.writer.setAttribute('href', href, modelElement);\n                  }\n\n              }\n          }\n      });\n    });\n  \nconversion.for('upcast').elementToElement({\n  view: {\n    name: 'a',\n    classes: 'ucb-button'\n  },\n  model: (viewElement, { writer: modelWriter }) => {\n    const modelElement = modelWriter.createElement('ucb-button');\n\n    // const color = viewElement.getAttribute('color');\n    // if (color) {\n    //   modelWriter.setAttribute('color', color, modelElement);\n    // }\n\n    // const style = viewElement.getAttribute('style');\n    // if (style) {\n    //   modelWriter.setAttribute('style', style, modelElement);\n    // }\n\n    // const size = viewElement.getAttribute('size');\n    // if (size) {\n    //   modelWriter.setAttribute('size', size, modelElement);\n    // }\n\n    const href = viewElement.getAttribute('href');\n    if (href) {\n      modelWriter.setAttribute('href', href, modelElement);\n    }\n\n    return modelElement;\n  }\n});\n\nconversion.for('upcast').elementToElement({\n  model: 'ucb-button-wrapper',\n  view: {\n    name: 'span',\n    classes: 'ucb-button-wrapper'\n  },\n  model: (viewElement, { writer: modelWriter }) => {\n    const modelElement = modelWriter.createElement('ucb-button-wrapper');\n\n    const color = viewElement.getAttribute('color');\n    if (color) {\n      modelWriter.setAttribute('color', color, modelElement);\n    }\n\n    const style = viewElement.getAttribute('style');\n    if (style) {\n      modelWriter.setAttribute('style', style, modelElement);\n    }\n\n    const size = viewElement.getAttribute('size');\n    if (size) {\n      modelWriter.setAttribute('size', size, modelElement);\n    }\n\n    return modelElement;\n  }\n});\n\n\n\n    // Data Downcast Converters: converts stored model data into HTML.\n\t\t// These trigger when content is saved.\n    conversion.for('dataDowncast').elementToElement({\n      model: 'ucb-button',\n      view: (modelElement, { writer: viewWriter }) => createButtonView(modelElement, viewWriter),\n    });\n    conversion.for('editingDowncast').elementToElement({\n      model: 'ucb-button',\n      view: (modelElement, { writer: viewWriter }) => createButtonView(modelElement, viewWriter, true),\n    });\n\n    conversion.for('editingDowncast').elementToElement({\n\t\t\tmodel: 'ucb-button-wrapper',\n\t\t\tview: (modelElement, { writer: viewWriter }) => viewWriter.createContainerElement('span', { class: 'ucb-button-wrapper' })\n\t\t});\n\n    conversion.for('dataDowncast').elementToElement({\n\t\t\tmodel: 'ucb-button-wrapper',\n\t\t\tview: {\n\t\t\t\tname: 'span',\n\t\t\t\tclasses: 'ucb-button-wrapper'\n\t\t\t}\n\t\t});\n  }\n}\n\n\n/**\n * @param {DowncastWriter} viewWriter\n *   The downcast writer.\n * @param {boolean} [widget=false]\n *   Whether or not to return a widget for editing. Defaults to `false`.\n * @returns {ContainerElement}\n *   The box container element or widget.\n */\nfunction createButtonView(modelElement, viewWriter, widget = false) {\n  const color = modelElement.getAttribute('color');\n  const style = modelElement.getAttribute('style');\n  const size = modelElement.getAttribute('size');\n  const href = modelElement.getAttribute('href') || '';\n\n  let button;\n  if(widget){\n    button = viewWriter.createContainerElement('a', {\n      class: `ucb-button ucb-button-${color} ucb-button-${style} ucb-button-${size}`,\n      href,\n      onclick: 'event.preventDefault()' // Prevents following the link when clicking the widget.\n    },{renderUnsafeAttributes: ['onclick']});\n  } else {\n    button = viewWriter.createContainerElement('a', {\n      class: `ucb-button ucb-button-${color} ucb-button-${style} ucb-button-${size}`,\n      href,\n    });\n  }\n\n  return widget ? (0,ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_2__.toWidget)(button, viewWriter, { label: 'button widget' }) : button;\n}\n\n\n\n\n\n\nfunction buildAttributeToAttributeDefinition(attributeName, attributeOptions) {\n\tconst view = {};\n\tfor (const [name, option] of Object.entries(attributeOptions))\n\t\tview[name] = { key: 'class', value: option.className };\n\treturn {\n\t\tmodel: {\n\t\t\tkey: attributeName,\n\t\t\tvalues: Object.keys(attributeOptions)\n\t\t},\n\t\tview\n\t};\n}\n\n//# sourceURL=webpack://CKEditor5.button/./js/ckeditor5_plugins/button/src/buttonediting.js?")},"./js/ckeditor5_plugins/button/src/buttonui.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ButtonUI)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ckeditor5/src/ui */ \"ckeditor5/src/ui.js\");\n/* harmony import */ var _buttonview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buttonview */ \"./js/ckeditor5_plugins/button/src/buttonview.js\");\n/* harmony import */ var _buttonutils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./buttonutils.js */ \"./js/ckeditor5_plugins/button/src/buttonutils.js\");\n/* harmony import */ var _icons_hand_pointer_regular_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../icons/hand-pointer-regular.svg */ \"./icons/hand-pointer-regular.svg\");\n/* harmony import */ var ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ckeditor5/src/widget */ \"ckeditor5/src/widget.js\");\n\n\n\n\n\n\n\n\nclass ButtonUI extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n\tstatic get requires() {\n\t\treturn [ ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__.ContextualBalloon ];\n\t}\n\n\tinit() {\n\t\tconst editor = this.editor;\n\t\tconst componentFactory = editor.ui.componentFactory;\n\t\tconst insertButtonCommand = editor.commands.get('addButton')\n\t\tconst viewDocument = editor.editing.view.document;\n\n        // Create the balloon and the form view.\n\t\tthis._balloon = this.editor.plugins.get( ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__.ContextualBalloon );\n\t\tthis.formView = this._createFormView(editor.locale);\n\n\t\t// This will register the Button button to the toolbar\n\t\tcomponentFactory.add( 'button', (locale) => {\n\t\t\tconst button = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__.ButtonView(locale);\n\n\t\t\tbutton.label = 'Button';\n\t\t\tbutton.icon = _icons_hand_pointer_regular_svg__WEBPACK_IMPORTED_MODULE_4__[\"default\"];\n\t\t\tbutton.tooltip = true;\n\t\t\tbutton.withText = false;\n\t\t\t\n\t\t\t// Show the UI on button click.\n\t\t\tthis.listenTo( button, 'execute', () => {\n\t\t\t\tthis._showUI();\n\t\t\t} );\n\n\n\t\t\t// Shows the UI on click of a map widget.\n\t\t\tthis.listenTo(viewDocument, 'click', () => {\n\t\t\t\tif (insertButtonCommand.existingButtonSelected)\n\t\t\t\t\tthis._showUI(insertButtonCommand.existingButtonSelected);\n\t\t\t});\n\n\t\t\treturn button;\n\t\t} );\n\t}\n\n\tafterInit() {\n\t\tconst editor = this.editor;\n\t\tconst widgetToolbarRepository = editor.plugins.get(ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_5__.WidgetToolbarRepository);\n\t\twidgetToolbarRepository.register('button', {\n\t\t\titems: ['buttonColor', 'buttonStyle', 'buttonSize'],\n\t\t\tgetRelatedElement: (selection) =>\n\t\t\t\tselection.focus.getAncestors()\n\t\t\t\t\t.find((node) => node.is('element') && node.hasClass('ucb-button'))\n\t\t});\n\t}\n\n\t_createFormView(locale) {\n\t\tconst editor = this.editor;\n\t\tconst componentFactory = editor.ui.componentFactory;\n\t\tconst formView = new _buttonview__WEBPACK_IMPORTED_MODULE_2__[\"default\"]( locale, componentFactory);\n\n\n\t\t// Execute the command after clicking the \"Save\" button.\n\t\tthis.listenTo( formView, 'submit', () => {\n\t\t\t// Grab values from the Form and title input fields.\n\t\t\tconst value = {\n\t\t\t\thref: formView.linkInputView.fieldView.element.value,\n\t\t\t\tinnerText: formView.innerTextInputView.fieldView.element.value,\n\t\t\t\tcolor: formView.color,\n\t\t\t\tsize: formView.size,\n\t\t\t\tstyle: formView.style\n\n\t\t\t};\n\t\t\teditor.execute( 'addButton', value );\n\n            // Hide the form view after submit.\n\t\t\tthis._hideUI();\n\t\t} );\n\n\t\t// Hide the form view after clicking the \"Cancel\" button.\n\t\tthis.listenTo( formView, 'cancel', () => {\n\t\t\tthis._hideUI();\n\t\t} );\n\n\t\t// Hide the form view when clicking outside the balloon.\n\t\t(0,ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__.clickOutsideHandler)( {\n\t\t\temitter: formView,\n\t\t\tactivator: () => this._balloon.visibleView === formView,\n\t\t\tcontextElements: [ this._balloon.view.element ],\n\t\t\tcallback: () => this._hideUI()\n\t\t} );\n\n\t\treturn formView;\n\t}\n\n\t_showUI(selectedButton) {\n\t\tconst selection = this.editor.model.document.selection;\n\n\t\t// Check the value of the command.\n\t\tconst commandValue = this.editor.commands.get( 'addButton' ).value;\n\n\t\tthis._balloon.add( {\n\t\t\tview: this.formView,\n\t\t\tposition: this._getBalloonPositionData()\n\t\t} );\n\n\t\tif(selectedButton){\n\t\t\tconst size = selectedButton.getAttribute('size');\n\t\t\tconst color = selectedButton.getAttribute('color')\n\t\t\tconst style = selectedButton.getAttribute('style')\n\t\t\tconst href = selectedButton.getAttribute('href')\n\n\t\t\tthis.formView.href = href\n\t\t\tthis.formView.color = color\n\t\t\tthis.formView.style = style\n\t\t\tthis.formView.size = size\n\n\t\t\tthis.formView.focus();\n\t\t}\n\n\t\t// Disable the input when the selection is not collapsed.\n\t\t// this.formView.linkInputView.isEnabled = selection.getFirstRange().isCollapsed;\n\n\t\t// Fill the form using the state (value) of the command.\n\t\tif ( commandValue ) {\n\t\t\tthis.formView.linkInputView.fieldView.value = commandValue.link;\n\t\t\tthis.formView.colorDropdown.fieldView.value = commandValue.color;\n\t\t\tthis.formView.sizeDropdown.fieldView.value = commandValue.size;\n\t\t\tthis.formView.styleDropdown.fieldView.value = commandValue.style\n\t\t\tconst selectedText = (0,_buttonutils_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])( selection.getFirstRange() );\n\t\t\tthis.formView.innerTextInputView.fieldView.value = selectedText;\n\n\t\t}\n\t\t// If the command has no value, put the currently selected text (not collapsed)\n\t\t// in the first field and empty the second in that case.\n\t\telse {\n\t\t\tconst selectedText = (0,_buttonutils_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])( selection.getFirstRange() );\n\n\t\t\tthis.formView.innerTextInputView.fieldView.value = selectedText;\n\t\t}\n\n\t\tthis.formView.focus();\n\t}\n\n\t_hideUI() {\n\t\t// Clear the input field values and reset the form.\n\t\tthis.formView.linkInputView.fieldView.value = '';\n\t\tthis.formView.innerTextInputView.fieldView.value = '';\n\t\t// this.formView.titleInputView.fieldView.value = '';\n\t\tthis.formView.element.reset();\n\n\t\tthis._balloon.remove( this.formView );\n\n\t\t// Focus the editing view after inserting the tooltip so the user can start typing the content\n\t\t// right away and keep the editor focused.\n\t\tthis.editor.editing.view.focus();\n\t}\n\n\t_getBalloonPositionData() {\n\t\tconst view = this.editor.editing.view;\n\t\tconst viewDocument = view.document;\n\t\tlet target = null;\n\n\t\t// Set a target position by converting view selection range to DOM\n\t\ttarget = () => view.domConverter.viewRangeToDom( viewDocument.selection.getFirstRange() );\n\n\t\treturn {\n\t\t\ttarget\n\t\t};\n\t}\n}\n\n//# sourceURL=webpack://CKEditor5.button/./js/ckeditor5_plugins/button/src/buttonui.js?")},"./js/ckeditor5_plugins/button/src/buttonutils.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ getRangeText)\n/* harmony export */ });\n// A helper function that retrieves and concatenates all text within the model range.\nfunction getRangeText( range ) {\n\treturn Array.from( range.getItems() ).reduce( ( rangeText, node ) => {\n\t\tif ( !( node.is( 'text' ) || node.is( 'textProxy' ) ) ) {\n\t\t\treturn rangeText;\n\t\t}\n\n\t\treturn rangeText + node.data;\n\t}, '' );\n}\n\n//# sourceURL=webpack://CKEditor5.button/./js/ckeditor5_plugins/button/src/buttonutils.js?")},"./js/ckeditor5_plugins/button/src/buttonview.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FormView)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/ui */ \"ckeditor5/src/ui.js\");\n/* harmony import */ var ckeditor5_src_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ckeditor5/src/utils */ \"ckeditor5/src/utils.js\");\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var _icons_paint_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../icons/paint.svg */ \"./icons/paint.svg\");\n/* harmony import */ var _buttonconfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./buttonconfig */ \"./js/ckeditor5_plugins/button/src/buttonconfig.js\");\n\n\n\n\n\n\nclass FormView extends ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.View {\n\tconstructor( locale, componentFactory) {\n\t\tsuper( locale);\n\t\tthis.focusTracker = new ckeditor5_src_utils__WEBPACK_IMPORTED_MODULE_1__.FocusTracker();\n\t\tthis.keystrokes = new ckeditor5_src_utils__WEBPACK_IMPORTED_MODULE_1__.KeystrokeHandler();\n\n\t\t// Creates Dropdowns for Color, Size, Style\n\t\tthis.colorDropdown = this._createSelectionDropdown(locale, 'Color', _icons_paint_svg__WEBPACK_IMPORTED_MODULE_3__[\"default\"], 'color', _buttonconfig__WEBPACK_IMPORTED_MODULE_4__.colorOptions, _buttonconfig__WEBPACK_IMPORTED_MODULE_4__.defaultColor)\n\t\tthis.sizeDropdown = this._createSelectionDropdown(locale, 'Size', _buttonconfig__WEBPACK_IMPORTED_MODULE_4__.sizeOptions[_buttonconfig__WEBPACK_IMPORTED_MODULE_4__.defaultSize].icon, 'size', _buttonconfig__WEBPACK_IMPORTED_MODULE_4__.sizeOptions, _buttonconfig__WEBPACK_IMPORTED_MODULE_4__.defaultSize )\n\t\tthis.styleDropdown = this._createSelectionDropdown(locale, 'Style', _buttonconfig__WEBPACK_IMPORTED_MODULE_4__.styleOptions[_buttonconfig__WEBPACK_IMPORTED_MODULE_4__.defaultStyle].icon, 'style', _buttonconfig__WEBPACK_IMPORTED_MODULE_4__.styleOptions, _buttonconfig__WEBPACK_IMPORTED_MODULE_4__.defaultStyle)\n\t\t\n\t\t// Creates the main input field.\n\t\tthis.innerTextInputView = this._createInput( 'Button Text' );\n\t\tthis.linkInputView = this._createInput( 'Add Link' );\n\t\t\n\t\t// Sets defaults\n\t\tthis.set('size', _buttonconfig__WEBPACK_IMPORTED_MODULE_4__.defaultSize)\n\t\tthis.set('color', _buttonconfig__WEBPACK_IMPORTED_MODULE_4__.defaultColor)\n\t\tthis.set('style', _buttonconfig__WEBPACK_IMPORTED_MODULE_4__.defaultStyle)\n\t\tthis.linkInputView.fieldView.bind('href').to(this, 'href');\n\t\tthis.set('href', '')\n\n\n\t\tthis.saveButtonView = this._createButton( 'Save', ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_2__.icons.check, 'ck-button-save' );\n\n\t\t// Submit type of the button will trigger the submit event on entire form when clicked \n\t\t//(see submitHandler() in render() below).\n\t\tthis.saveButtonView.type = 'submit';\n\n\t\tthis.cancelButtonView = this._createButton( 'Cancel', ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_2__.icons.cancel, 'ck-button-cancel' );\n\n\t\t// Delegate ButtonView#execute to FormView#cancel.\n\t\tthis.cancelButtonView.delegate( 'execute' ).to( this, 'cancel' );\n\n\t\tthis.childViews = this.createCollection( [\n\t\t\tthis.colorDropdown,\n\t\t\tthis.sizeDropdown,\n\t\t\tthis.styleDropdown,\n\t\t\tthis.innerTextInputView,\n\t\t\tthis.linkInputView,\n\t\t\tthis.saveButtonView,\n\t\t\tthis.cancelButtonView\n\t\t] );\n\n\t\tthis._focusCycler = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.FocusCycler( {\n\t\t\tfocusables: this.childViews,\n\t\t\tfocusTracker: this.focusTracker,\n\t\t\tkeystrokeHandler: this.keystrokes,\n\t\t\tactions: {\n\t\t\t\t// Navigate form fields backwards using the Shift + Tab keystroke.\n\t\t\t\tfocusPrevious: 'shift + tab',\n\n\t\t\t\t// Navigate form fields forwards using the Tab key.\n\t\t\t\tfocusNext: 'tab'\n\t\t\t}\n\t\t} );\n\n\t\tthis.setTemplate( {\n\t\t\ttag: 'form',\n\t\t\tattributes: {\n\t\t\t\tclass: [ 'ck', 'ck-button-form' ],\n\t\t\t\ttabindex: '-1'\n\t\t\t},\n\t\t\tchildren: this.childViews\n\t\t} );\n\t}\n\n\trender() {\n\t\tsuper.render();\n\n\t\t(0,ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.submitHandler)( {\n\t\t\tview: this\n\t\t} );\n\n\t\tthis.childViews._items.forEach( view => {\n\t\t\t// Register the view in the focus tracker.\n\t\t\tthis.focusTracker.add( view.element );\n\t\t} );\n\n\t\t// Start listening for the keystrokes coming from #element.\n\t\tthis.keystrokes.listenTo( this.element );\n\t}\n\n\tdestroy() {\n\t\tsuper.destroy();\n\n\t\tthis.focusTracker.destroy();\n\t\tthis.keystrokes.destroy();\n\t}\n\n\tfocus() {\n\t\t// If the abbreviation text field is enabled, focus it straight away to allow the user to type.\n\t\tif ( this.linkInputView.isEnabled ) {\n\t\t\tthis.linkInputView.focus();\n\t\t}\n\t\t// Focus the tooltip title field if the former is disabled.\n\t\telse {\n\t\t\tthis.linkInputView.focus();\n\t\t}\n\t}\n\n\t_createInput( label ) {\n\t\tconst labeledInput = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.LabeledFieldView( this.locale, ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.createLabeledInputText );\n\n\t\tlabeledInput.label = label;\n\n\t\treturn labeledInput;\n\t}\n\n\t_createButton( label, icon, className ) {\n\t\tconst button = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.ButtonView();\n\n\t\tbutton.set( {\n\t\t\tlabel,\n\t\t\ticon,\n\t\t\ttooltip: true,\n\t\t\tclass: className\n\t\t} );\n\n\t\treturn button;\n\t}\n\n\t_createSelectionDropdown(locale, tooltip, icon, attribute, options, defaultValue) {\n\t\tconst dropdownView = (0,ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.createDropdown)(locale), defaultOption = options[defaultValue];\n\t\t(0,ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.addToolbarToDropdown)(dropdownView, Object.entries(options).map(([optionValue, option]) => this._createSelectableButton(locale, option.label, option.icon, attribute, optionValue)));\n\t\tdropdownView.buttonView.set({\n\t\t\ticon,\n\t\t\ttooltip: locale.t(tooltip),\n\t\t\twithText: !icon\n\t\t});\n\t\tdropdownView.buttonView.bind('label').to(this, attribute, value => locale.t(options[value] ? options[value].label : defaultOption.label));\n\t\tif (icon === options[defaultValue].icon) // If the icon for the dropdown is the same as the icon for the default option, it changes to reflect the current selection.\n\t\t\tdropdownView.buttonView.bind('icon').to(this, attribute, value => options[value] ? options[value].icon : defaultOption.icon);\n\t\treturn dropdownView;\n\t}\n\n\t_createSelectableButton(locale, label, icon, attribute, value) {\n\t\tconst buttonView = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.ButtonView();\n\t\tbuttonView.set({\n\t\t\tlabel: locale.t(label),\n\t\t\ticon,\n\t\t\ttooltip: !!icon, // Displays the tooltip on hover if there is an icon\n\t\t\tisToggleable: true, // Allows the button with the attribute's current value to display as selected\n\t\t\twithText: !icon // Displays the button as text if the icon is falsey\n\t\t});\n\t\t// Allows the button with the attribute's current value to display as selected\n\t\tbuttonView.bind('isOn').to(this, attribute, attributeValue => attributeValue === value);\n\t\t// Sets the attribute to the button's value on click\n\t\tthis.listenTo(buttonView, 'execute', () => {\n\t\t\tthis.set(attribute, value);\n\t\t});\n\t\treturn buttonView;\n\t}\n}\n\n//# sourceURL=webpack://CKEditor5.button/./js/ckeditor5_plugins/button/src/buttonview.js?")},"./js/ckeditor5_plugins/button/src/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button */ "./js/ckeditor5_plugins/button/src/button.js");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  Button: _button__WEBPACK_IMPORTED_MODULE_0__["default"]\n});\n\n\n//# sourceURL=webpack://CKEditor5.button/./js/ckeditor5_plugins/button/src/index.js?')},"./js/ckeditor5_plugins/button/src/insertbuttoncommand.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ButtonCommand)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var _buttonconfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttonconfig */ \"./js/ckeditor5_plugins/button/src/buttonconfig.js\");\n\n\n\nclass ButtonCommand extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Command {\n  constructor(editor) {\n\t\tsuper(editor);\n\t\tthis.set('existingButtonSelected', false);\n\t}\n  execute({value = '', size = _buttonconfig__WEBPACK_IMPORTED_MODULE_1__.defaultSize, style = _buttonconfig__WEBPACK_IMPORTED_MODULE_1__.defaultStyle, color = _buttonconfig__WEBPACK_IMPORTED_MODULE_1__.defaultColor, href = '', classes = ''}) {\n    const model = this.editor.model;\n    const selection = model.document.selection;\n\n    model.change(writer => {\n      const button = addButton(writer, color, style, size, href, selection);\n      // const position = selection.getFirstPosition();\n\n      model.insertContent(button);\n      writer.setSelection(button, 'on');\n    });\n  }\n\n  refresh() {\n    const model = this.editor.model;\n    const selection = model.document.selection;\n\t\tconst selectedElement = selection.getSelectedElement();\n\n    const allowedIn = model.schema.findAllowedParent(\n      selection.getFirstPosition(),\n      'ucb-button'\n    );\n\n    this.isEnabled = allowedIn !== null;\n\n    this.existingButtonSelected = isButtonElement(selectedElement) ? selectedElement : null;\n\n  }\n}\n\n/**\n * @param {Writer} writer\n *   The writer used to create and append elements.\n * @returns {Element}\n *   The box element with all required child elements to match the box schema.\n */\nfunction addButton(writer, color, style, size, href, selection) {\n  const range = selection.getFirstRange();\n\n  const buttonSpan = writer.createElement('ucb-button-wrapper',{\n    color,\n    style,\n    size,\n  })\n  const button = writer.createElement('ucb-button', {\n    class: 'ucb-button',\n    href,\n  });\n  for (const item of range.getItems()) {\n    const textNode = writer.createText(item.data)\n    writer.append(textNode, button)\n  } \n\n  writer.append(button, buttonSpan)\n  return buttonSpan;\n}\n\n/**\n * @param {Element | null} element \n * @returns {boolean}\n *   Whether or not `element` is a map element.\n */\nfunction isButtonElement(element) {\n\treturn element && element.name === 'ucb-button';\n}\n\n\n\n//# sourceURL=webpack://CKEditor5.button/./js/ckeditor5_plugins/button/src/insertbuttoncommand.js?")},"./icons/hand-pointer-regular.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 448 512\\">\x3c!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --\x3e<path d=\\"M358.182 179.361c-19.493-24.768-52.679-31.945-79.872-19.098-15.127-15.687-36.182-22.487-56.595-19.629V67c0-36.944-29.736-67-66.286-67S89.143 30.056 89.143 67v161.129c-19.909-7.41-43.272-5.094-62.083 8.872-29.355 21.795-35.793 63.333-14.55 93.152l109.699 154.001C134.632 501.59 154.741 512 176 512h178.286c30.802 0 57.574-21.5 64.557-51.797l27.429-118.999A67.873 67.873 0 0 0 448 326v-84c0-46.844-46.625-79.273-89.818-62.639zM80.985 279.697l27.126 38.079c8.995 12.626 29.031 6.287 29.031-9.283V67c0-25.12 36.571-25.16 36.571 0v175c0 8.836 7.163 16 16 16h6.857c8.837 0 16-7.164 16-16v-35c0-25.12 36.571-25.16 36.571 0v35c0 8.836 7.163 16 16 16H272c8.837 0 16-7.164 16-16v-21c0-25.12 36.571-25.16 36.571 0v21c0 8.836 7.163 16 16 16h6.857c8.837 0 16-7.164 16-16 0-25.121 36.571-25.16 36.571 0v84c0 1.488-.169 2.977-.502 4.423l-27.43 119.001c-1.978 8.582-9.29 14.576-17.782 14.576H176c-5.769 0-11.263-2.878-14.697-7.697l-109.712-154c-14.406-20.223 14.994-42.818 29.394-22.606zM176.143 400v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.733 0-14-7.163-14-16zm75.428 0v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.732 0-14-7.163-14-16zM327 400v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.732 0-14-7.163-14-16z\\"/></svg>");\n\n//# sourceURL=webpack://CKEditor5.button/./icons/hand-pointer-regular.svg?')},"./icons/paint.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 384 512\\">\x3c!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --\x3e<path d=\\"M162.4 6c-1.5-3.6-5-6-8.9-6h-19c-3.9 0-7.5 2.4-8.9 6L104.9 57.7c-3.2 8-14.6 8-17.8 0L66.4 6c-1.5-3.6-5-6-8.9-6H48C21.5 0 0 21.5 0 48V224v22.4V256H9.6 374.4 384v-9.6V224 48c0-26.5-21.5-48-48-48H230.5c-3.9 0-7.5 2.4-8.9 6L200.9 57.7c-3.2 8-14.6 8-17.8 0L162.4 6zM0 288v32c0 35.3 28.7 64 64 64h64v64c0 35.3 28.7 64 64 64s64-28.7 64-64V384h64c35.3 0 64-28.7 64-64V288H0zM192 432a16 16 0 1 1 0 32 16 16 0 1 1 0-32z\\"/></svg>\\n");\n\n//# sourceURL=webpack://CKEditor5.button/./icons/paint.svg?')},"ckeditor5/src/core.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/core.js");\n\n//# sourceURL=webpack://CKEditor5.button/delegated_./core.js_from_dll-reference_CKEditor5.dll?')},"ckeditor5/src/ui.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/ui.js");\n\n//# sourceURL=webpack://CKEditor5.button/delegated_./ui.js_from_dll-reference_CKEditor5.dll?')},"ckeditor5/src/utils.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/utils.js");\n\n//# sourceURL=webpack://CKEditor5.button/delegated_./utils.js_from_dll-reference_CKEditor5.dll?')},"ckeditor5/src/widget.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/widget.js");\n\n//# sourceURL=webpack://CKEditor5.button/delegated_./widget.js_from_dll-reference_CKEditor5.dll?')},"dll-reference CKEditor5.dll":t=>{"use strict";t.exports=CKEditor5.dll}},__webpack_module_cache__={};function __webpack_require__(t){var e=__webpack_module_cache__[t];if(void 0!==e)return e.exports;var n=__webpack_module_cache__[t]={exports:{}};return __webpack_modules__[t](n,n.exports,__webpack_require__),n.exports}__webpack_require__.d=(t,e)=>{for(var n in e)__webpack_require__.o(e,n)&&!__webpack_require__.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},__webpack_require__.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),__webpack_require__.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__("./js/ckeditor5_plugins/button/src/index.js");return __webpack_exports__=__webpack_exports__.default,__webpack_exports__})()));