!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.CKEditor5=e():(t.CKEditor5=t.CKEditor5||{},t.CKEditor5.buttongroup=e())}(self,(()=>(()=>{var __webpack_modules__={"./js/ckeditor5_plugins/buttongroup/src/buttongroup.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ ButtonGroup)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ "ckeditor5/src/core.js");\n/* harmony import */ var _buttongroupui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttongroupui */ "./js/ckeditor5_plugins/buttongroup/src/buttongroupui.js");\n/* harmony import */ var _buttongroupediting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buttongroupediting */ "./js/ckeditor5_plugins/buttongroup/src/buttongroupediting.js");\n\n\n\n\n/**\n * @file This is what CKEditor refers to as a master (glue) plugin. Its role is\n * just to load the “editing” and “UI” components of this Plugin. Those\n * components could be included in this file, but\n *\n * I.e, this file\'s purpose is to integrate all the separate parts of the plugin\n * before it\'s made discoverable via index.js.\n */\n\n// The contents of ButtonUI and ButtonEditing could be included in this\n// file, but it is recommended to separate these concerns in different files.\n  class ButtonGroup extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n    static get requires() {\n      return [ _buttongroupediting__WEBPACK_IMPORTED_MODULE_2__["default"], _buttongroupui__WEBPACK_IMPORTED_MODULE_1__["default"] ];\n    }\n  }\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./js/ckeditor5_plugins/buttongroup/src/buttongroup.js?')},"./js/ckeditor5_plugins/buttongroup/src/buttongroupconfig.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"colorOptions\": () => (/* binding */ colorOptions),\n/* harmony export */   \"defaultColor\": () => (/* binding */ defaultColor),\n/* harmony export */   \"defaultSize\": () => (/* binding */ defaultSize),\n/* harmony export */   \"sizeOptions\": () => (/* binding */ sizeOptions)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n\n\nconst sizeOptions = {\n\tlarge: {\n\t\tlabel: 'Large',\n\t\ticon: ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.icons.large,\n\t\tclassName: 'ucb-link-button-large'\n\t},\n\tregular: {\n\t\tlabel: 'Regular',\n\t\ticon: ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.icons.regular,\n\t\tclassName: 'ucb-link-button-regular'\n\t},\n\tsmall: {\n\t\tlabel: 'Small',\n\t\ticon: ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.icons.small,\n\t\tclassName: 'ucb-link-button-small'\n\t},\n};\n\nconst defaultSize = 'regular'\n\nconst colorOptions = {\n\tblue: {\n\t\tlabel: 'Blue',\n\t\tclassName: 'ucb-link-button-blue'\n\t},\n\tblack: {\n\t\tlabel: 'Black',\n\t\tclassName: 'ucb-link-button-black'\n\t},\n\tgray: {\n\t\tlabel: 'Gray',\n\t\tclassName: 'ucb-link-button-gray'\n\t},\n\twhite: {\n\t\tlabel: 'White',\n\t\tclassName: 'ucb-link-button-white'\n\t},\n\tgold: {\n\t\tlabel: 'Gold',\n\t\tclassName: 'ucb-link-button-gold'\n\t}\n};\n\nconst defaultColor = 'black'\n\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./js/ckeditor5_plugins/buttongroup/src/buttongroupconfig.js?")},"./js/ckeditor5_plugins/buttongroup/src/buttongroupediting.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ButtonGroupEditing)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var _insertbuttongroupcommand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insertbuttongroupcommand */ \"./js/ckeditor5_plugins/buttongroup/src/insertbuttongroupcommand.js\");\n/* harmony import */ var ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ckeditor5/src/widget */ \"ckeditor5/src/widget.js\");\n/* harmony import */ var _buttongroupconfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./buttongroupconfig */ \"./js/ckeditor5_plugins/buttongroup/src/buttongroupconfig.js\");\n/**\n * @file defines schemas, converters, and commands for the button plugin.\n * \n * @typedef { import('@types/ckeditor__ckeditor5-engine').DowncastWriter } DowncastWriter\n * @typedef { import('@types/ckeditor__ckeditor5-engine/src/view/containerelement').default } ContainerElement\n */\n\n\n\n\n\n\n/*\n * The Link Button is based on a specific schema defined in this file.\n * \n * Model (for the plugin's internal use only):\n * <linkButton linkButtonColor=\"blue|black|gray|white|gold\" linkButtonStyle=\"default|full\" linkButtonSize=\"large|regular|small\" linkButtonHref=\"{ ... }\">\n *    <linkButtonContents>\n *       { contents of: $block }\n *    </linkButtonContents>\n * </linkButton>\n * \n * View (the saved and interpreted plain HTML):\n * <a class=\"ucb-link-button ucb-link-button-(blue|black|gray|white|gold) ucb-link-button-(default|full) ucb-link-button-(large|regular|small)\" href=\"{ ... }\">\n *    <span class=\"ucb-link-button-contents\">\n *       { contents }\n *    </span>\n * </a>\n */\nclass ButtonGroupEditing extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n\tstatic get requires() {\n\t\treturn [ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_2__.Widget];\n\t}\n\n\tinit() {\n\t\tthis._defineSchema();\n\t\tthis._defineConverters();\n\t\tthis.editor.commands.add('addButtonGroup', new _insertbuttongroupcommand__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.editor));\n\t}\n\n\t// Schemas are registered via the central `editor` object.\n\t_defineSchema() {\n\t\tconst schema = this.editor.model.schema;\n\t\tschema.register('buttonGroup', {\n\t\t\tallowWhere: '$block',\n\t\t\tisObject: true,\n\t\t\tisInline: true,\n\t\t\tallowAttributes: ['buttonGroupColor', 'buttonGroupSize'],\n\t\t\tallowChildren: 'linkButton'\n\t\t});\n\t}\n\n\t/**\n\t * Converters determine how CKEditor 5 models are converted into markup and\n\t * vice-versa.\n\t */\n\t_defineConverters() {\n\t\t// Converters are registered via the central editor object.\n\t\tconst { conversion } = this.editor;\n\n\t\t// Attributes convertable to/from a class name need no separate upcast and downcast definitions\n\t\tconversion.attributeToAttribute(buildAttributeToAttributeDefinition('buttonGroupColor', _buttongroupconfig__WEBPACK_IMPORTED_MODULE_3__.colorOptions));\n\t\tconversion.attributeToAttribute(buildAttributeToAttributeDefinition('buttonGroupSize', _buttongroupconfig__WEBPACK_IMPORTED_MODULE_3__.sizeOptions));\n\n\t\t// // Element upcasts\n\t\t// conversion.for('upcast').add(dispatcher => {\n\t\t// \t// A custom upcast prevents the CKEditor 5 Link plugin from overriding via its `linkHref` attribute `$text` element.\n\t\t// \tdispatcher.on('element:a', (evt, data, conversionApi) => {\n\t\t// \t\tif (conversionApi.consumable.consume(data.viewItem, { name: true, classes: 'ucb-link-button', attributes: ['href'] })) {\n\t\t// \t\t\tconst linkButton = conversionApi.writer.createElement('linkButton', { linkButtonHref: data.viewItem.getAttribute('href') });\n\t\t// \t\t\t// Forces insertion and conversion of a clean `linkButton` element.\n\t\t// \t\t\tif (!conversionApi.safeInsert(linkButton, data.modelCursor))\n\t\t// \t\t\t\treturn;\n\t\t// \t\t\tconversionApi.convertChildren(data.viewItem, linkButton);\n\t\t// \t\t\tconversionApi.updateConversionResult(linkButton, data); // Omitting this line causes strange issues (trust me).\n\t\t// \t\t}\n\t\t// \t});\n\t\t// });\n\t\tconversion.for('upcast').elementToElement({\n\t\t\tmodel: 'buttonGroup',\n\t\t\tview: {\n\t\t\t\tname: 'div',\n\t\t\t\tclasses: 'ucb-button-group'\n\t\t\t}\n\t\t});\n\n\t\t// Attribute downcasts\n\t\t// conversion.for('downcast').attributeToAttribute({ model: 'linkButtonHref', view: 'href' });\n\n\t\t// Element downcasts – elements become widgets in the editor via `editingDowncast`\n\t\tconversion.for('dataDowncast').elementToElement({\n\t\t\tmodel: 'buttonGroup',\n\t\t\tview: {\n\t\t\t\tname: 'div',\n\t\t\t\tclasses: 'ucb-button-group'\n\t\t\t}\n\t\t});\n\t\t\n\t\tconversion.for('editingDowncast').elementToElement({\n\t\t\tmodel: 'buttonGroup',\n\t\t\tview: (modelElement, { writer }) =>\n\t\t\t\t(0,ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_2__.toWidget)(\n\t\t\t\t\twriter.createContainerElement('div', { class: 'ucb-button-group'}),\n\t\t\t\t\twriter, { label: 'button group widget' }\n\t\t\t\t)\n\t\t});\n\t\t// conversion.for('editingDowncast').elementToElement({\n\t\t// \tmodel: 'linkButtonContents',\n\t\t// \tview: (modelElement, { writer }) =>\n\t\t// \t\ttoWidgetEditable(writer.createEditableElement('span', { class: 'ucb-link-button-contents' }), writer)\n\t\t// });\n\t}\n}\n\nfunction buildAttributeToAttributeDefinition(attributeName, attributeOptions) {\n\tconst view = {};\n\tfor (const [name, option] of Object.entries(attributeOptions))\n\t\tview[name] = { key: 'class', value: option.className };\n\treturn {\n\t\tmodel: {\n\t\t\tkey: attributeName,\n\t\t\tvalues: Object.keys(attributeOptions)\n\t\t},\n\t\tview\n\t};\n}\n\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./js/ckeditor5_plugins/buttongroup/src/buttongroupediting.js?")},"./js/ckeditor5_plugins/buttongroup/src/buttongroupui.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ButtonGroupUI)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ckeditor5/src/ui */ \"ckeditor5/src/ui.js\");\n/* harmony import */ var _buttongroupview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buttongroupview */ \"./js/ckeditor5_plugins/buttongroup/src/buttongroupview.js\");\n/* harmony import */ var _icons_bars_solid_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../icons/bars-solid.svg */ \"./icons/bars-solid.svg\");\n\n\n\n\n\n\nclass ButtonGroupUI extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n\tstatic get requires() {\n\t\treturn [ ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__.ContextualBalloon ];\n\t}\n\n\tinit() {\n\t\tconst editor = this.editor;\n\t\tconst componentFactory = editor.ui.componentFactory;\n\t\tconst insertButtonGroupCommand = editor.commands.get('addButtonGroup')\n\t\tconst viewDocument = editor.editing.view.document;\n\n        // Create the balloon and the form view.\n\t\tthis._balloon = this.editor.plugins.get( ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__.ContextualBalloon );\n\t\tthis.formView = this._createFormView(editor.locale);\n\t\tthis.buttonView = null;\n\n\t\t// This will register the Button button to the toolbar\n\t\tcomponentFactory.add( 'buttonGroup', (locale) => {\n\t\t\tconst button = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__.ButtonView(locale);\n\n\t\t\tbutton.label = 'Button Group';\n\t\t\tbutton.icon = _icons_bars_solid_svg__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\n\t\t\tbutton.tooltip = true;\n\t\t\tbutton.withText = false;\n\t\t\tbutton.isToggleable = true;\n\t\t\t// Show the UI on button click.\n\t\t\tthis.listenTo( button, 'execute', () => {\n\t\t\t\tthis._showUI(insertButtonGroupCommand.existingButtonSelected)\n\t\t\t} );\n\n\t\t\tthis.buttonView = button;\n\n\t\t\t// Show the on/off in Toolbar if a button is already selected.\n\t\t\tconst updateButtonState = () => {\n\t\t\t\tconst linkButtonSelected = insertButtonGroupCommand.existingButtonSelected;\n\t\t\t\tbutton.isOn = !!linkButtonSelected;\n\t\t\t};\n\t\t\t  \n\t\t\t // Listen for changes in the linkButton selection.\n\t\t\tthis.listenTo(insertButtonGroupCommand, 'change:value', updateButtonState);\n\t\t\tthis.listenTo(insertButtonGroupCommand, 'change:existingButtonSelected', updateButtonState);\n\t\t\t\n\t\t\t// Shows the UI on click of a button widget.\n\t\t\tthis.listenTo(viewDocument, 'click', () => {\n\t\t\t\tif (insertButtonGroupCommand.existingButtonSelected)\n\t\t\t\t\tthis._showUI(insertButtonGroupCommand.existingButtonSelected);\n\t\t\t});\n\n\t\t\t// Bind the state of the button to the command.\n\t\t\tbutton.bind('isOn', 'isEnabled').to(insertButtonGroupCommand, 'value', 'isEnabled');\n\n\t\t\treturn button;\n\t\t} );\n\t}\n\n\t_createFormView(locale) {\n\t\tconst editor = this.editor;\n\t\tconst componentFactory = editor.ui.componentFactory;\n\t\tconst formView = new _buttongroupview__WEBPACK_IMPORTED_MODULE_2__[\"default\"]( locale, componentFactory);\n\n\n\t\t// Execute the command after clicking the \"Save\" button.\n\t\tthis.listenTo( formView, 'submit', () => {\n\t\t\t// Grab values from the Form and title input fields.\n\t\t\tconst value = {\n\t\t\t\tcolor: formView.color,\n\t\t\t\tsize: formView.size,\n\t\t\t};\n\t\t\teditor.execute( 'addButtonGroup', value );\n\n            // Hide the form view after submit.\n\t\t\tthis._hideUI();\n\t\t} );\n\n\t\t// Hide the form view after clicking the \"Cancel\" button.\n\t\tthis.listenTo( formView, 'cancel', () => {\n\t\t\tthis._hideUI();\n\t\t} );\n\t\t\n\t\t// Close the panel on esc key press when the form has focus.\n\t\tformView.keystrokes.set('Esc', (data, cancel) => {\n\t\t\tthis._hideUI();\n\t\t\tcancel();\n\t\t});\n\n\t\t// Hide the form view when clicking outside the balloon.\n\t\t(0,ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__.clickOutsideHandler)( {\n\t\t\temitter: formView,\n\t\t\tactivator: () => this._balloon.visibleView === formView,\n\t\t\tcontextElements: [ this._balloon.view.element ],\n\t\t\tcallback: () => this._hideUI()\n\t\t} );\n\n\t\treturn formView;\n\t}\n\n\t_showUI(selectedButton) {\n\t\tconst selection = this.editor.model.document.selection;\n\t\tthis.buttonView.isOn = true;\n\t\t// Check the value of the command.\n\t\tconst commandValue = this.editor.commands.get( 'addButtonGroup' ).value;\n\n\t\tthis._balloon.add( {\n\t\t\tview: this.formView,\n\t\t\tposition: this._getBalloonPositionData()\n\t\t} );\n\n\t\tif (selectedButton) {\n\t\t\tconst size = selectedButton.getAttribute('buttonGroupSize');\n\t\t\tconst color = selectedButton.getAttribute('buttonGroupColor');\n\t\t\t// const style = selectedButton.getAttribute('linkButtonStyle');\n\t\t\t// const href = selectedButton.getAttribute('linkButtonHref');\n\t\t\n\t\t\tthis.formView.color = color;\n\t\t\t// this.formView.style = style;\n\t\t\tthis.formView.size = size;\n\t\t\n\t\t\t// this.formView.linkInputView.fieldView.value = href;\n\t\t\t// this.formView.linkInputView.fieldView.element.value = href; // Update the input field value\n\t\t\t// this.formView.linkInputView.fieldView.set('value', href); // Update the input field value (alternative method)\n\t\t}\n\n\t\t// Disable the input when the selection is not collapsed.\n\t\t// this.formView.linkInputView.isEnabled = selection.getFirstRange().isCollapsed;\n\n\t\t// Fill the form using the state (value) of the command.\n\t\tif ( commandValue ) {\n\t\t\t// this.formView.linkInputView.fieldView.value = commandValue.link;\n\t\t\tthis.formView.colorDropdown.fieldView.value = commandValue.color;\n\t\t\tthis.formView.sizeDropdown.fieldView.value = commandValue.size;\n\t\t\t// this.formView.styleDropdown.fieldView.value = commandValue.style\n\t\t}\n\n\t\tthis.formView.focus();\n\t}\n\n\t_hideUI() {\n\t\t// Clear the input field values and reset the form.\n\t\tthis.formView.element.reset();\n\t\tthis.buttonView.isOn = false;\n\n\t\tthis._balloon.remove( this.formView );\n\n\t\t// Focus the editing view after inserting the tooltip so the user can start typing the content\n\t\t// right away and keep the editor focused.\n\t\tthis.editor.editing.view.focus();\n\t}\n\n\t_getBalloonPositionData() {\n\t\tconst view = this.editor.editing.view;\n\t\tconst viewDocument = view.document;\n\t\tlet target = null;\n\n\t\t// Set a target position by converting view selection range to DOM\n\t\ttarget = () => view.domConverter.viewRangeToDom( viewDocument.selection.getFirstRange() );\n\n\t\treturn {\n\t\t\ttarget\n\t\t};\n\t}\n}\n\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./js/ckeditor5_plugins/buttongroup/src/buttongroupui.js?")},"./js/ckeditor5_plugins/buttongroup/src/buttongroupview.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ BGFormView)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/ui */ \"ckeditor5/src/ui.js\");\n/* harmony import */ var ckeditor5_src_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ckeditor5/src/utils */ \"ckeditor5/src/utils.js\");\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var _icons_paint_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../icons/paint.svg */ \"./icons/paint.svg\");\n/* harmony import */ var _buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./buttongroupconfig */ \"./js/ckeditor5_plugins/buttongroup/src/buttongroupconfig.js\");\n\n\n\n\n\n\nclass BGFormView extends ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.View {\n\tconstructor( locale, componentFactory) {\n\t\tsuper( locale);\n\t\tthis.focusTracker = new ckeditor5_src_utils__WEBPACK_IMPORTED_MODULE_1__.FocusTracker();\n\t\tthis.keystrokes = new ckeditor5_src_utils__WEBPACK_IMPORTED_MODULE_1__.KeystrokeHandler();\n\n\t\t// Creates Dropdowns for Color, Size, Style\n\t\tthis.colorDropdown = this._createSelectionDropdown(locale, 'Color', _icons_paint_svg__WEBPACK_IMPORTED_MODULE_3__[\"default\"], 'color', _buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__.colorOptions, _buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__.defaultColor)\n\t\tthis.sizeDropdown = this._createSelectionDropdown(locale, 'Size', _buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__.sizeOptions[_buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__.defaultSize].icon, 'size', _buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__.sizeOptions, _buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__.defaultSize )\n\t\t\n\t\t// Creates the main input field.\n\t\t// this.innerTextInputView = this._createInput( 'Button Text' );\n\t\t// this.linkInputView = this._createInput( 'Add Link' );\n\t\t\n\t\t// Sets defaults\n\t\tthis.set('size', _buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__.defaultSize)\n\t\tthis.set('color', _buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__.defaultColor)\n\t\t// this.linkInputView.fieldView.bind('href').to(this, 'href');\n\t\t// this.set('href', '')\n\n\n\t\tthis.saveButtonView = this._createButton( 'Save', ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_2__.icons.check, 'ck-button-save' );\n\n\t\t// Submit type of the button will trigger the submit event on entire form when clicked \n\t\t//(see submitHandler() in render() below).\n\t\tthis.saveButtonView.type = 'submit';\n\n\t\tthis.cancelButtonView = this._createButton( 'Cancel', ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_2__.icons.cancel, 'ck-button-cancel' );\n\n\t\t// Delegate ButtonView#execute to FormView#cancel.\n\t\tthis.cancelButtonView.delegate( 'execute' ).to( this, 'cancel' );\n\n\t\tthis.childViews = this.createCollection( [\n\t\t\tthis.sizeDropdown,\n\t\t\tthis.colorDropdown,\n\t\t\t// this.styleDropdown,\n\t\t\t// this.innerTextInputView,\n\t\t\t// this.linkInputView,\n\t\t\tthis.saveButtonView,\n\t\t\tthis.cancelButtonView\n\t\t] );\n\n\t\tthis._focusCycler = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.FocusCycler( {\n\t\t\tfocusables: this.childViews,\n\t\t\tfocusTracker: this.focusTracker,\n\t\t\tkeystrokeHandler: this.keystrokes,\n\t\t\tactions: {\n\t\t\t\t// Navigate form fields backwards using the Shift + Tab keystroke.\n\t\t\t\tfocusPrevious: 'shift + tab',\n\n\t\t\t\t// Navigate form fields forwards using the Tab key.\n\t\t\t\tfocusNext: 'tab'\n\t\t\t}\n\t\t} );\n\n\t\tthis.setTemplate( {\n\t\t\ttag: 'form',\n\t\t\tattributes: {\n\t\t\t\tclass: [ 'ck', 'ck-button-form' ],\n\t\t\t\ttabindex: '-1'\n\t\t\t},\n\t\t\tchildren: this.childViews\n\t\t} );\n\t}\n\n\trender() {\n\t\tsuper.render();\n\n\t\t(0,ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.submitHandler)( {\n\t\t\tview: this\n\t\t} );\n\n\t\tthis.childViews._items.forEach( view => {\n\t\t\t// Register the view in the focus tracker.\n\t\t\tthis.focusTracker.add( view.element );\n\t\t} );\n\n\t\t// Start listening for the keystrokes coming from #element.\n\t\tthis.keystrokes.listenTo( this.element );\n\t}\n\n\tdestroy() {\n\t\tsuper.destroy();\n\n\t\tthis.focusTracker.destroy();\n\t\tthis.keystrokes.destroy();\n\t}\n\n\tfocus() {\n\t\t// If the link text field is enabled, focus it straight away to allow the user to type.\n\t\t// if ( this.linkInputView.isEnabled ) {\n\t\t// \tthis.linkInputView.focus();\n\t\t// }\n\t\t// // Focus the link text field if the former is disabled.\n\t\t// else {\n\t\t// \tthis.linkInputView.focus();\n\t\t// }\n\t}\n\n\t_createInput( label ) {\n\t\tconst labeledInput = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.LabeledFieldView( this.locale, ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.createLabeledInputText );\n\n\t\tlabeledInput.label = label;\n\n\t\treturn labeledInput;\n\t}\n\n\t_createButton( label, icon, className ) {\n\t\tconst button = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.ButtonView();\n\n\t\tbutton.set( {\n\t\t\tlabel,\n\t\t\ticon,\n\t\t\ttooltip: true,\n\t\t\tclass: className\n\t\t} );\n\n\t\treturn button;\n\t}\n\n\t_createSelectionDropdown(locale, tooltip, icon, attribute, options, defaultValue) {\n\t\tconst dropdownView = (0,ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.createDropdown)(locale), defaultOption = options[defaultValue];\n\t\t(0,ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.addToolbarToDropdown)(dropdownView, Object.entries(options).map(([optionValue, option]) => this._createSelectableButton(locale, option.label, option.icon, attribute, optionValue)));\n\t\tdropdownView.buttonView.set({\n\t\t\ticon,\n\t\t\ttooltip: locale.t(tooltip),\n\t\t\twithText: !icon\n\t\t});\n\t\tdropdownView.buttonView.bind('label').to(this, attribute, value => locale.t(options[value] ? options[value].label : defaultOption.label));\n\t\tif (icon === options[defaultValue].icon) // If the icon for the dropdown is the same as the icon for the default option, it changes to reflect the current selection.\n\t\t\tdropdownView.buttonView.bind('icon').to(this, attribute, value => options[value] ? options[value].icon : defaultOption.icon);\n\t\treturn dropdownView;\n\t}\n\n\t_createSelectableButton(locale, label, icon, attribute, value) {\n\t\tconst buttonView = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.ButtonView();\n\t\tbuttonView.set({\n\t\t\tlabel: locale.t(label),\n\t\t\ticon,\n\t\t\ttooltip: !!icon, // Displays the tooltip on hover if there is an icon\n\t\t\tisToggleable: true, // Allows the button with the attribute's current value to display as selected\n\t\t\twithText: !icon // Displays the button as text if the icon is falsey\n\t\t});\n\t\t// Allows the button with the attribute's current value to display as selected\n\t\tbuttonView.bind('isOn').to(this, attribute, attributeValue => attributeValue === value);\n\t\t// Sets the attribute to the button's value on click\n\t\tthis.listenTo(buttonView, 'execute', () => {\n\t\t\tthis.set(attribute, value);\n\t\t});\n\t\treturn buttonView;\n\t}\n}\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./js/ckeditor5_plugins/buttongroup/src/buttongroupview.js?")},"./js/ckeditor5_plugins/buttongroup/src/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _buttongroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buttongroup */ "./js/ckeditor5_plugins/buttongroup/src/buttongroup.js");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  ButtonGroup: _buttongroup__WEBPACK_IMPORTED_MODULE_0__["default"]\n});\n\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./js/ckeditor5_plugins/buttongroup/src/index.js?')},"./js/ckeditor5_plugins/buttongroup/src/insertbuttongroupcommand.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ButtonGroupCommand)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var _buttongroupconfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttongroupconfig */ \"./js/ckeditor5_plugins/buttongroup/src/buttongroupconfig.js\");\n/**\n * @file defines InsertButtonCommand, which is executed when the button toolbar button is pressed.\n */\n\n\n\n\nclass ButtonGroupCommand extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Command {\n\tconstructor(editor) {\n\t\tsuper(editor);\n\t\tthis.set('existingButtonGroupSelected', false);\n\t}\n\texecute({ value = '', size = _buttongroupconfig__WEBPACK_IMPORTED_MODULE_1__.defaultSize, color = _buttongroupconfig__WEBPACK_IMPORTED_MODULE_1__.defaultColor, classes = '' }) {\n\t\tconst model = this.editor.model;\n\t\tconst selection = model.document.selection;\n\n\t\tmodel.change(writer => {\n\t\t\tconst range = selection.getFirstRange();\n\t\t\t\tconst buttonGroup = writer.createElement('buttonGroup', {\n\t\t\t\t\tbuttonGroupColor: color,\n\t\t\t\t\tbuttonGroupSize: size,\n\t\t\t\t})\n\t\t\tfor (const item of range.getItems()) {\n\t\t\t\tconsole.log(item)\n\t\t\t\tif (item.name =='linkButton'){\n\t\t\t\t\tconsole.log(item)\n\t\t\t\t\titem._setAttribute('linkButtonColor', color)\n\t\t\t\t\titem._setAttribute('linkButtonSize', size)\n\t\t\t\t\t// writer.append(item, buttonGroup)\n\t\t\t\t}\n\t\t\t}\n\t\t\t// writer.append(linkButtonContents, linkButton);\n\t\t\tmodel.insertContent(buttonGroup);\n\t\t\t// writer.setSelection(linkButtonContents, 'in');\n\t\t});\n\t}\n\n\trefresh() {\n\t\tconst model = this.editor.model;\n\t\tconst selection = model.document.selection;\n\t\tconst selectedElement = selection.getSelectedElement();\n\n\t\tconst allowedIn = model.schema.findAllowedParent(\n\t\t\tselection.getFirstPosition(),\n\t\t\t'buttonGroup'\n\t\t);\n\n\t\tthis.isEnabled = allowedIn !== null;\n\n\t\tthis.existingButtonGroupSelected = isButtonGroupElement(selectedElement) ? selectedElement : null;\n\t}\n}\n\n/**\n * @param {Element | null} element \n * @returns {boolean}\n *   Whether or not `element` is a map element.\n */\nfunction isButtonGroupElement(element) {\n\treturn element && element.name === 'buttonGroup';\n}\n\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./js/ckeditor5_plugins/buttongroup/src/insertbuttongroupcommand.js?")},"./icons/bars-solid.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 448 512\\">\x3c!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d=\\"M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z\\"/></svg>");\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./icons/bars-solid.svg?')},"./icons/paint.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 384 512\\">\x3c!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --\x3e<path d=\\"M162.4 6c-1.5-3.6-5-6-8.9-6h-19c-3.9 0-7.5 2.4-8.9 6L104.9 57.7c-3.2 8-14.6 8-17.8 0L66.4 6c-1.5-3.6-5-6-8.9-6H48C21.5 0 0 21.5 0 48V224v22.4V256H9.6 374.4 384v-9.6V224 48c0-26.5-21.5-48-48-48H230.5c-3.9 0-7.5 2.4-8.9 6L200.9 57.7c-3.2 8-14.6 8-17.8 0L162.4 6zM0 288v32c0 35.3 28.7 64 64 64h64v64c0 35.3 28.7 64 64 64s64-28.7 64-64V384h64c35.3 0 64-28.7 64-64V288H0zM192 432a16 16 0 1 1 0 32 16 16 0 1 1 0-32z\\"/></svg>\\n");\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./icons/paint.svg?')},"ckeditor5/src/core.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/core.js");\n\n//# sourceURL=webpack://CKEditor5.buttongroup/delegated_./core.js_from_dll-reference_CKEditor5.dll?')},"ckeditor5/src/ui.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/ui.js");\n\n//# sourceURL=webpack://CKEditor5.buttongroup/delegated_./ui.js_from_dll-reference_CKEditor5.dll?')},"ckeditor5/src/utils.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/utils.js");\n\n//# sourceURL=webpack://CKEditor5.buttongroup/delegated_./utils.js_from_dll-reference_CKEditor5.dll?')},"ckeditor5/src/widget.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/widget.js");\n\n//# sourceURL=webpack://CKEditor5.buttongroup/delegated_./widget.js_from_dll-reference_CKEditor5.dll?')},"dll-reference CKEditor5.dll":t=>{"use strict";t.exports=CKEditor5.dll}},__webpack_module_cache__={};function __webpack_require__(t){var e=__webpack_module_cache__[t];if(void 0!==e)return e.exports;var n=__webpack_module_cache__[t]={exports:{}};return __webpack_modules__[t](n,n.exports,__webpack_require__),n.exports}__webpack_require__.d=(t,e)=>{for(var n in e)__webpack_require__.o(e,n)&&!__webpack_require__.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},__webpack_require__.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),__webpack_require__.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__("./js/ckeditor5_plugins/buttongroup/src/index.js");return __webpack_exports__=__webpack_exports__.default,__webpack_exports__})()));