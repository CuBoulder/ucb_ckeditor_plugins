!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.CKEditor5=e():(t.CKEditor5=t.CKEditor5||{},t.CKEditor5.buttongroup=e())}(self,(()=>(()=>{var __webpack_modules__={"./js/ckeditor5_plugins/buttongroup/src/buttongroup.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ ButtonGroup)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ "ckeditor5/src/core.js");\n/* harmony import */ var _buttongroupui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttongroupui */ "./js/ckeditor5_plugins/buttongroup/src/buttongroupui.js");\n/* harmony import */ var _buttongroupediting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buttongroupediting */ "./js/ckeditor5_plugins/buttongroup/src/buttongroupediting.js");\n\n\n\n\n/**\n * @file This is what CKEditor refers to as a master (glue) plugin. Its role is\n * just to load the “editing” and “UI” components of this Plugin. Those\n * components could be included in this file, but\n *\n * I.e, this file\'s purpose is to integrate all the separate parts of the plugin\n * before it\'s made discoverable via index.js.\n */\n\n// The contents of ButtonUI and ButtonEditing could be included in this\n// file, but it is recommended to separate these concerns in different files.\n  class ButtonGroup extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n    static get requires() {\n      return [ _buttongroupediting__WEBPACK_IMPORTED_MODULE_2__["default"], _buttongroupui__WEBPACK_IMPORTED_MODULE_1__["default"] ];\n    }\n  }\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./js/ckeditor5_plugins/buttongroup/src/buttongroup.js?')},"./js/ckeditor5_plugins/buttongroup/src/buttongroupconfig.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"colorOptions\": () => (/* binding */ colorOptions),\n/* harmony export */   \"defaultColor\": () => (/* binding */ defaultColor),\n/* harmony export */   \"defaultSize\": () => (/* binding */ defaultSize),\n/* harmony export */   \"sizeOptions\": () => (/* binding */ sizeOptions)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n\n\nconst sizeOptions = {\n\tlarge: {\n\t\tlabel: 'Large',\n\t\ticon: ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.icons.large,\n\t\tclassName: 'ucb-link-button-large'\n\t},\n\tregular: {\n\t\tlabel: 'Regular',\n\t\ticon: ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.icons.regular,\n\t\tclassName: 'ucb-link-button-regular'\n\t},\n\tsmall: {\n\t\tlabel: 'Small',\n\t\ticon: ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.icons.small,\n\t\tclassName: 'ucb-link-button-small'\n\t},\n};\n\nconst defaultSize = 'regular'\n\nconst colorOptions = {\n\tblue: {\n\t\tlabel: 'Blue',\n\t\tclassName: 'ucb-link-button-blue'\n\t},\n\tblack: {\n\t\tlabel: 'Black',\n\t\tclassName: 'ucb-link-button-black'\n\t},\n\tgray: {\n\t\tlabel: 'Gray',\n\t\tclassName: 'ucb-link-button-gray'\n\t},\n\twhite: {\n\t\tlabel: 'White',\n\t\tclassName: 'ucb-link-button-white'\n\t},\n\tgold: {\n\t\tlabel: 'Gold',\n\t\tclassName: 'ucb-link-button-gold'\n\t}\n};\n\nconst defaultColor = 'black'\n\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./js/ckeditor5_plugins/buttongroup/src/buttongroupconfig.js?")},"./js/ckeditor5_plugins/buttongroup/src/buttongroupediting.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ButtonGroupEditing)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ckeditor5/src/widget */ \"ckeditor5/src/widget.js\");\n/* harmony import */ var _buttongroupconfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buttongroupconfig */ \"./js/ckeditor5_plugins/buttongroup/src/buttongroupconfig.js\");\n/* harmony import */ var _insertbuttongroupcommand__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./insertbuttongroupcommand */ \"./js/ckeditor5_plugins/buttongroup/src/insertbuttongroupcommand.js\");\n/* harmony import */ var _modifybuttongroupcommand__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifybuttongroupcommand */ \"./js/ckeditor5_plugins/buttongroup/src/modifybuttongroupcommand.js\");\n/**\n * @file defines schemas, converters, and commands for the button plugin.\n * \n * @typedef { import('@types/ckeditor__ckeditor5-engine').DowncastWriter } DowncastWriter\n * @typedef { import('@types/ckeditor__ckeditor5-engine/src/view/containerelement').default } ContainerElement\n */\n\n\n\n\n\n\n\nclass ButtonGroupEditing extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n\tstatic get requires() {\n\t\treturn [ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_1__.Widget];\n\t}\n\n\tinit() {\n\t\tthis._defineSchema();\n\t\tthis._defineConverters();\n\t\tthis._defineCommands();\n\t}\n\n\t// Schemas are registered via the central `editor` object.\n\t_defineSchema() {\n\t\tconst schema = this.editor.model.schema;\n\t\tschema.register('buttonGroup', {\n\t\t\tallowWhere: '$block',\n\t\t\tisObject: true,\n\t\t\tisInline: true,\n\t\t\tallowAttributes: ['buttonGroupColor', 'buttonGroupSize'],\n\t\t\tallowChildren: 'linkButton'\n\t\t});\n\t}\n\n\t/**\n\t * Converters determine how CKEditor 5 models are converted into markup and\n\t * vice-versa.\n\t */\n\t_defineConverters() {\n\t\t// Converters are registered via the central editor object.\n\t\tconst { conversion, editing } = this.editor;\n\n\t\t// Attributes convertable to/from a class name need no separate upcast and downcast definitions\n\t\tconversion.attributeToAttribute(buildAttributeToAttributeDefinition('buttonGroupColor', _buttongroupconfig__WEBPACK_IMPORTED_MODULE_2__.colorOptions));\n\t\tconversion.attributeToAttribute(buildAttributeToAttributeDefinition('buttonGroupSize', _buttongroupconfig__WEBPACK_IMPORTED_MODULE_2__.sizeOptions));\n\n\t\tconversion.for('upcast').elementToElement({\n\t\t\tmodel: 'buttonGroup',\n\t\t\tview: {\n\t\t\t\tname: 'div',\n\t\t\t\tclasses: 'ucb-button-group'\n\t\t\t}\n\t\t});\n\n\t\t// Attribute downcasts\n\t\t// conversion.for('downcast').attributeToAttribute({ model: 'linkButtonHref', view: 'href' });\n\n\t\t// Element downcasts – elements become widgets in the editor via `editingDowncast`\n\t\tconversion.for('dataDowncast').elementToElement({\n\t\t\tmodel: 'buttonGroup',\n\t\t\tview: {\n\t\t\t\tname: 'div',\n\t\t\t\tclasses: 'ucb-button-group'\n\t\t\t}\n\t\t});\n\t\t\n\t\tconversion.for('editingDowncast').elementToElement({\n\t\t\tmodel: 'buttonGroup',\n\t\t\tview: (modelElement, { writer: viewWriter }) => createButtonGroupView(viewWriter, true)\n\t\t});\n\t}\n\n\t\t/**\n\t * Defines the commands for inserting or modifying the box.\n\t */\n\t\t_defineCommands() {\n\t\t\tconst commands = this.editor.commands;\n\t\t\tcommands.add('insertButtonGroup', new _insertbuttongroupcommand__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.editor));\n\t\t\tcommands.add('sizeButtonGroup', new _modifybuttongroupcommand__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this.editor, 'buttonGroupSize', _buttongroupconfig__WEBPACK_IMPORTED_MODULE_2__.defaultSize));\n\t\t\tcommands.add('colorButtonGroup', new _modifybuttongroupcommand__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this.editor, 'buttonGroupColor', _buttongroupconfig__WEBPACK_IMPORTED_MODULE_2__.defaultColor));\n\t\t}\n}\n\nfunction buildAttributeToAttributeDefinition(attributeName, attributeOptions) {\n\tconst view = {};\n\tfor (const [name, option] of Object.entries(attributeOptions))\n\t\tview[name] = { key: 'class', value: option.className };\n\treturn {\n\t\tmodel: {\n\t\t\tkey: attributeName,\n\t\t\tvalues: Object.keys(attributeOptions)\n\t\t},\n\t\tview\n\t};\n}\n\n/**\n * @param {DowncastWriter} viewWriter\n *   The downcast writer.\n * @param {boolean} [widget=false]\n *   Whether or not to return a widget for editing. Defaults to `false`.\n * @returns {ContainerElement}\n *   The box container element or widget.\n */\nfunction createButtonGroupView(viewWriter, widget = false) {\n\tconst div = viewWriter.createContainerElement('div', { class: 'ucb-button-group' });\n\treturn widget ? (0,ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_1__.toWidget)(div, viewWriter, { label: 'button group widget', hasSelectionHandle: true }) : div;\n}\n\n\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./js/ckeditor5_plugins/buttongroup/src/buttongroupediting.js?")},"./js/ckeditor5_plugins/buttongroup/src/buttongroupui.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ButtonGroupUI)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ckeditor5/src/widget */ \"ckeditor5/src/widget.js\");\n/* harmony import */ var ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ckeditor5/src/ui */ \"ckeditor5/src/ui.js\");\n/* harmony import */ var _icons_arrows_turn_right_solid_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../icons/arrows-turn-right-solid.svg */ \"./icons/arrows-turn-right-solid.svg\");\n/* harmony import */ var _buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./buttongroupconfig */ \"./js/ckeditor5_plugins/buttongroup/src/buttongroupconfig.js\");\n\n// import BGFormView from './buttongroupview';\n\n\n\n\n\n\nclass ButtonGroupUI extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n\tstatic get requires() {\n\t\treturn [ ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_1__.WidgetToolbarRepository ];\n\t}\n\n\tinit() {\n\t\tconst editor = this.editor;\n\t\tconst commands = editor.commands;\n\t\tconst componentFactory = editor.ui.componentFactory;\n\n\t\t// This will register the ButtonGroup button to the toolbar\n\t\tcomponentFactory.add( 'buttonGroup', (locale) => {\n\t\t\tconst button = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_2__.ButtonView(locale);\n\t\t\tconst command = commands.get('insertButtonGroup');\n\n\n\t\t\tbutton.label = 'Button Group';\n\t\t\tbutton.icon = _icons_arrows_turn_right_solid_svg__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\n\t\t\tbutton.tooltip = true;\n\t\t\tbutton.withText = false;\n\t\t\tbutton.isToggleable = true;\n\n\t\t\t// Bind the state of the button to the command.\n\t\t\tbutton.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');\n\n\t\t\t// Execute the command when the button is clicked (executed).\n\t\t\tthis.listenTo(button, 'execute', () => editor.execute('insertButtonGroup'));\n\n\t\t\treturn button;\n\t\t} );\n\n\t\t// Makes size and color options avaliable to the widget toolbar.\n\t\tcomponentFactory.add('buttonGroupSize', locale =>\n\t\t\tthis._createDropdown(locale, 'Size', _buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__.sizeOptions[_buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__.defaultSize].icon, commands.get('buttonGroupSize'), _buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__.sizeOptions, _buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__.defaultSize));\n\t\tcomponentFactory.add('buttonGroupColor', locale =>\n\t\t\tthis._createDropdown(locale, 'Color', _buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__.colorOptions[_buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__.defaultColor].icon, commands.get('buttonGroupColor'), _buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__.colorOptions, _buttongroupconfig__WEBPACK_IMPORTED_MODULE_4__.defaultColor));\n\t}\n\n\t\t/**\n\t * @inheritdoc\n\t */\n\t\tafterInit() {\n\t\t\tconst editor = this.editor;\n\t\t\tconst widgetToolbarRepository = editor.plugins.get(ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_1__.WidgetToolbarRepository);\n\t\t\n\t\t\twidgetToolbarRepository.register('buttonGroup', {\n\t\t\t\titems: ['buttonGroupSize', 'buttonGroupColor'],\n\t\t\t\tgetRelatedElement: (selection) => {\n\t\t\t\t\t// TO DO -- This is not working\n\t\t\t\t\tconsole.log('ancestor',selection.focus.getAncestors())\n\t\t\t\t\tselection.focus.getAncestors()\n\t\t\t\t\t.find((node) => node.hasClass('ucb-button-group'))\n\t\t\t\t}\n\t\t\t});\n\t\t\n\t\t\tconsole.log('widgettool', widgetToolbarRepository)\n\t\t}\n\t\t\n\t\t\n\n\n\t\t\t/**\n\t * Creates a dropdown with multiple buttons for executing a command.\n\t * \n\t * @param {Locale} locale\n\t *   The locale.\n\t * @param {string} label\n\t *   The dropdown's label.\n\t * @param {string | null} icon\n\t *   The dropdowns's icon (optional). If `null`, the dropdown will display as text.\n\t * @param {Command} command\n\t *   The command to execute when one of the buttons is pushed.\n\t * @param {Object<string, SelectableOption>} options\n\t *   The options for buttons in this dropdown view.\n\t * @param {string} defaultValue\n\t *   The default value of the command.\n\t * @returns {DropdownView}\n\t *   The dropdown.\n\t */\n\t_createDropdown(locale, label, icon, command, options, defaultValue) {\n\t\tconst dropdownView = (0,ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_2__.createDropdown)(locale);\n\t\t(0,ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_2__.addToolbarToDropdown)(dropdownView, Object.entries(options).map(([optionValue, option]) => this._createButton(locale, option.label, option.icon, command, optionValue)));\n\t\tdropdownView.buttonView.set({\n\t\t\tlabel: locale.t(label),\n\t\t\ticon,\n\t\t\ttooltip: true,\n\t\t\twithText: !icon\n\t\t});\n\t\tif (icon === options[defaultValue].icon) // If the icon for the dropdown is the same as the icon for the default option, it changes to reflect the current selection.\n\t\t\tdropdownView.buttonView.bind('icon').to(command, 'value', value => options[value] ? options[value].icon : options[defaultValue].icon);\n\t\t// Enable button if any of the buttons are enabled.\n\t\tdropdownView.bind('isEnabled').to(command, 'isEnabled');\n\t\treturn dropdownView;\n\t}\n\n\n\t_createButton(locale, label, icon, command, value) {\n\t\tconst editor = this.editor, buttonView = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_2__.ButtonView();\n\t\tbuttonView.set({\n\t\t\tlabel: locale.t(label),\n\t\t\ticon,\n\t\t\ttooltip: true, // Displays the tooltip on hover\n\t\t\tisToggleable: true, // Allows the button with the command's current value to display as selected\n\t\t\twithText: !icon // Displays the button as text if the icon is falsey\n\t\t});\n\t\t// Disables the button if the command is disabled\n\t\tbuttonView.bind('isEnabled').to(command);\n\t\t// Allows the button with the command's current value to display as selected\n\t\tbuttonView.bind('isOn').to(command, 'value', commandValue => commandValue === value);\n\t\t// Executes the command with the button's value on click\n\t\tthis.listenTo(buttonView, 'execute', () => {\n\t\t\tcommand.execute({ value });\n\t\t\teditor.editing.view.focus();\n\t\t});\n\t\treturn buttonView;\n\t}\n}\n\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./js/ckeditor5_plugins/buttongroup/src/buttongroupui.js?")},"./js/ckeditor5_plugins/buttongroup/src/buttongrouputils.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ getRangeText),\n/* harmony export */   \"getSelectedButtonGroupWidget\": () => (/* binding */ getSelectedButtonGroupWidget)\n/* harmony export */ });\n// A helper function that retrieves and concatenates all text within the model range.\nfunction getRangeText( range ) {\n\treturn Array.from( range.getItems() ).reduce( ( rangeText, node ) => {\n\t\tif ( !( node.is( 'text' ) || node.is( 'textProxy' ) ) ) {\n\t\t\treturn rangeText;\n\t\t}\n\n\t\treturn rangeText + node.data;\n\t}, '' );\n}\n\nfunction getSelectedButtonGroupWidget(selection) {\n\tconst selectionPosition = selection.getFirstPosition();\n\tif (!selectionPosition)\n\t\treturn null;\n\n\tlet parent = selectionPosition.parent;\n\twhile (parent) {\n\t\tif (parent.is('element') && isButtonGroupWidget(parent))\n\t\t\treturn parent;\n\t\tparent = parent.parent;\n\t}\n\n\treturn null;\n}\n\nfunction isButtonGroupWidget(element) {\n\treturn element.name === 'buttonGroup';\n}\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./js/ckeditor5_plugins/buttongroup/src/buttongrouputils.js?")},"./js/ckeditor5_plugins/buttongroup/src/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _buttongroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buttongroup */ "./js/ckeditor5_plugins/buttongroup/src/buttongroup.js");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  ButtonGroup: _buttongroup__WEBPACK_IMPORTED_MODULE_0__["default"]\n});\n\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./js/ckeditor5_plugins/buttongroup/src/index.js?')},"./js/ckeditor5_plugins/buttongroup/src/insertbuttongroupcommand.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ InsertButtonGroupCommand)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var _buttongroupconfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttongroupconfig */ \"./js/ckeditor5_plugins/buttongroup/src/buttongroupconfig.js\");\n/**\n * @file defines InsertButtonCommand, which is executed when the button toolbar button is pressed.\n */\n\n\n\n\nclass InsertButtonGroupCommand extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Command {\n\n\texecute() {\n\t\tconst {model} = this.editor;\n\t\tmodel.change((writer)=> {\n\t\t\tmodel.insertContent(createButtonGroup(writer))\n\t\t})\n\t}\n\n\trefresh() {\n\t\tconst model = this.editor.model;\n\t\tconst selection = model.document.selection;\n\t\tconst selectedElement = selection.getSelectedElement();\n\n\t\tif(selectedElement && selectedElement.name == 'buttonGroup'){\n\t\t\tconst color = selectedElement.getAttribute('buttonGroupColor')\n\t\t\tconst size = selectedElement.getAttribute('buttonGroupSize')\n\t\t\tconst childBtns = Array.from(selectedElement.getChildren())\n\t\t\tchildBtns.forEach(btn=>{\n\t\t\t\tbtn._setAttribute('linkButtonColor', _buttongroupconfig__WEBPACK_IMPORTED_MODULE_1__.defaultColor)\n\t\t\t\tbtn._setAttribute('linkButtonSize', _buttongroupconfig__WEBPACK_IMPORTED_MODULE_1__.defaultSize)\n\t\t\t})\n\n\t\t}\n\n\t\tconst allowedIn = model.schema.findAllowedParent(\n\t\t\tselection.getFirstPosition(),\n\t\t\t'buttonGroup'\n\t\t);\n\n\t\tthis.isEnabled = allowedIn !== null;\n\n\t\tthis.existingButtonGroupSelected = isButtonGroupElement(selectedElement) ? selectedElement : null;\n\t}\n}\n\n/**\n * @param {Writer} writer\n *   The writer used to create and append elements.\n * @returns {Element}\n *   The box element with all required child elements to match the button group schema.\n */\nfunction createButtonGroup(writer) {\n\tconst model = writer.model\n\tconst selection = model.document.selection\n\t// Create instances of the three elements registered with the editor in buttongroupediting.js.\n\tconst buttonGroup = writer.createElement('buttonGroup', {\n\t\tbuttonGroupColor: _buttongroupconfig__WEBPACK_IMPORTED_MODULE_1__.defaultColor,\n\t\tbuttonGroupSize: _buttongroupconfig__WEBPACK_IMPORTED_MODULE_1__.defaultSize,\n\t});\n\n\t\tconst range = selection.getFirstRange();\n\t\tfor (const item of range.getItems()) {\n\t\t\tif (item.name =='linkButton'){\n\t\t\t\tconst innerTextEl = item._children ? writer.cloneElement(item._children._nodes[0]) : false;\n\t\t\t\tconst newButton = item._clone();\n\t\t\t\tnewButton._setAttribute('linkButtonColor', _buttongroupconfig__WEBPACK_IMPORTED_MODULE_1__.defaultColor)\n\t\t\t\tnewButton._setAttribute('linkButtonSize', _buttongroupconfig__WEBPACK_IMPORTED_MODULE_1__.defaultSize)\n\t\t\t\tif(innerTextEl){\n\t\t\t\t\twriter.append(innerTextEl, newButton)\n\t\t\t\t};\n\t\t\t\twriter.append(newButton, buttonGroup)\n\t\t\t}\n\t\t}\n\n\t\n\t// Return the element to be added to the editor.\n\treturn buttonGroup;\n}\n\n/**\n * @param {Element | null} element \n * @returns {boolean}\n *   Whether or not `element` is a button group element.\n */\nfunction isButtonGroupElement(element) {\n\treturn element && element.name === 'buttonGroup';\n}\n\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./js/ckeditor5_plugins/buttongroup/src/insertbuttongroupcommand.js?")},"./js/ckeditor5_plugins/buttongroup/src/modifybuttongroupcommand.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ModifyButtonGroupCommand)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var _buttongrouputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttongrouputils */ \"./js/ckeditor5_plugins/buttongroup/src/buttongrouputils.js\");\n/** \n * @file defines ModifyButtonGroup, which is executed to modify attributes of the buttongroup from the widget toolbar.\n * \n * @typedef { import('@types/ckeditor__ckeditor5-core').Editor } Editor\n */\n\n\n\n\nclass ModifyButtonGroupCommand extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Command {\n\t/** \n\t * The name of the attribute this command modifies.\n\t * @type {string}\n\t */\n\tattributeName\n\n\t/**\n\t * The default value to set if there isn't one specified.\n\t * @type {string}\n\t */\n\tdefaultValue\n\n\t/**\n\t * Creates a new ModifyButtonGroup command.\n\t * @param {Editor} editor \n\t *   The editor.\n\t * @param {string} attributeName \n\t *   The name of the attribute this command modifies.\n\t * @param {string} defaultValue \n\t *   The default value to set if there isn't one specified.\n\t */\n\tconstructor(editor, attributeName, defaultValue) {\n\t\tsuper(editor);\n\t\tthis.attributeName = attributeName;\n\t\tthis.defaultValue = defaultValue;\n\t}\n\n\t/**\n\t * @inheritdoc\n\t */\n\trefresh() {\n\t\tconst model = this.editor.model, buttongroup = (0,_buttongrouputils__WEBPACK_IMPORTED_MODULE_1__.getSelectedButtonGroupWidget)(model.document.selection), attributeName = this.attributeName, defaultValue = this.defaultValue;\n\t\tthis.isEnabled = !!buttongroup; // Disables any ModifyButtonGroup if there is no selected box\n\t\tif (this.isEnabled)\n\t\t\tthis.value = buttongroup.getAttribute(attributeName); // Sets the `value` of this ModifyButtonGroup to the attribute of the selected bg\n\t\telse this.value = defaultValue;\n\t}\n\n\t/**\n\t * @inheritdoc\n\t */\n\texecute(options = { value: '' }) {\n\t\tconst model = this.editor.model, buttongroup = (0,_buttongrouputils__WEBPACK_IMPORTED_MODULE_1__.getSelectedButtonGroupWidget)(model.document.selection), attributeName = this.attributeName, defaultValue = this.defaultValue;\n\t\tif (buttongroup)\n\t\t\tmodel.change(writer => writer.setAttribute(attributeName, options.value || defaultValue, buttongroup)); // Sets the attribute of the selected bg to a new value upon execution of this command\n\t}\n}\n\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./js/ckeditor5_plugins/buttongroup/src/modifybuttongroupcommand.js?")},"./icons/arrows-turn-right-solid.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 448 512\\">\x3c!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d=\\"M297.4 9.4c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3l-96 96c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L338.7 160H128c-35.3 0-64 28.7-64 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V224C0 153.3 57.3 96 128 96H338.7L297.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm-96 256c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3l-96 96c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 416H96c-17.7 0-32 14.3-32 32v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V448c0-53 43-96 96-96H242.7l-41.4-41.4c-12.5-12.5-12.5-32.8 0-45.3z\\"/></svg>");\n\n//# sourceURL=webpack://CKEditor5.buttongroup/./icons/arrows-turn-right-solid.svg?')},"ckeditor5/src/core.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/core.js");\n\n//# sourceURL=webpack://CKEditor5.buttongroup/delegated_./core.js_from_dll-reference_CKEditor5.dll?')},"ckeditor5/src/ui.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/ui.js");\n\n//# sourceURL=webpack://CKEditor5.buttongroup/delegated_./ui.js_from_dll-reference_CKEditor5.dll?')},"ckeditor5/src/widget.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/widget.js");\n\n//# sourceURL=webpack://CKEditor5.buttongroup/delegated_./widget.js_from_dll-reference_CKEditor5.dll?')},"dll-reference CKEditor5.dll":t=>{"use strict";t.exports=CKEditor5.dll}},__webpack_module_cache__={};function __webpack_require__(t){var e=__webpack_module_cache__[t];if(void 0!==e)return e.exports;var n=__webpack_module_cache__[t]={exports:{}};return __webpack_modules__[t](n,n.exports,__webpack_require__),n.exports}__webpack_require__.d=(t,e)=>{for(var n in e)__webpack_require__.o(e,n)&&!__webpack_require__.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},__webpack_require__.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),__webpack_require__.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__("./js/ckeditor5_plugins/buttongroup/src/index.js");return __webpack_exports__=__webpack_exports__.default,__webpack_exports__})()));