(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CKEditor5"] = factory();
	else
		root["CKEditor5"] = root["CKEditor5"] || {}, root["CKEditor5"]["button"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "ckeditor5/src/core.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__("dll-reference CKEditor5.dll"))("./src/core.js");

/***/ }),

/***/ "ckeditor5/src/ui.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__("dll-reference CKEditor5.dll"))("./src/ui.js");

/***/ }),

/***/ "ckeditor5/src/utils.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__("dll-reference CKEditor5.dll"))("./src/utils.js");

/***/ }),

/***/ "ckeditor5/src/widget.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__("dll-reference CKEditor5.dll"))("./src/widget.js");

/***/ }),

/***/ "dll-reference CKEditor5.dll":
/***/ ((module) => {

"use strict";
module.exports = CKEditor5.dll;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src)
});

// EXTERNAL MODULE: delegated ./core.js from dll-reference CKEditor5.dll
var delegated_corefrom_dll_reference_CKEditor5 = __webpack_require__("ckeditor5/src/core.js");
;// CONCATENATED MODULE: ./js/ckeditor5_plugins/button/src/insertbuttoncommand.js
/**
 * @file defines insertInvisibleCommand, which is executed when the Invisible
 * toolbar button is pressed.
 */


class ButtonCommand extends delegated_corefrom_dll_reference_CKEditor5.Command {
  execute({ color, style, size, href, classes }) {
    const model = this.editor.model;
    const selection = model.document.selection;

    model.change(writer => {
      const button = addButton(writer, color, style, size, href, classes);
      const position = selection.getFirstPosition();

      writer.insert(button, position);
      writer.setSelection(button, 'on');
    });
  }


refresh() {
  const model = this.editor.model;
  const selection = model.document.selection;

  const allowedIn = model.schema.findAllowedParent(
    selection.getFirstPosition(),
    'ucb-button'
  );

  this.isEnabled = allowedIn !== null;

  const buttonElement = selection.getSelectedElement();
  if (buttonElement && buttonElement.name === 'ucb-button') {
    const attributes = buttonElement.getAttributes();

    const color = model.getAttribute('color');
    const style = model.getAttribute('style');
    const size = model.getAttribute('size');

    const buttonClasses = [];
    if (color) {
      buttonClasses.push(`ucb-button-${color}`);
    }
    if (style) {
      buttonClasses.push(`ucb-button-${style}`);
    }
    if (size) {
      buttonClasses.push(`ucb-button-${size}`);
    }

    const buttonClass = buttonClasses.join(' ');

    if (buttonClass !== attributes.class) {
      model.change(writer => {
        writer.setAttribute('class', buttonClass, buttonElement);
      });
    }

    // Update the button href attribute to match the link value in the model
    const link = model.getAttribute('link');
    if (link !== attributes.href) {
      model.change(writer => {
        writer.setAttribute('href', link, buttonElement);
      });
    }
  }
}
}

function addButton(writer, color, style, size, href, classes) {
  const button = writer.createElement('ucb-button', {
    class: `ucb-button-${color} ucb-button-${style} ucb-button-${size} ${classes}`,
    href: href
  });

  return button;
}

// EXTERNAL MODULE: delegated ./widget.js from dll-reference CKEditor5.dll
var delegated_widgetfrom_dll_reference_CKEditor5 = __webpack_require__("ckeditor5/src/widget.js");
;// CONCATENATED MODULE: ./js/ckeditor5_plugins/button/src/buttonediting.js




class ButtonEditing extends delegated_corefrom_dll_reference_CKEditor5.Plugin {
  static get requires() {
    return [delegated_widgetfrom_dll_reference_CKEditor5.Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add('addButton', new ButtonCommand(this.editor));
  }

  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.register('ucb-button', {
      isObject: true,
      allowWhere: '$block',
      allowContentOf: '$block',
      allowAttributes: ['class', 'href'],
    });
  }

  _defineConverters() {
    const { conversion } = this.editor;

    conversion.for('upcast').elementToElement({
      model: 'ucb-button',
      view: (buttonViewElement, { model, styles }) => {
        const href = buttonViewElement.getAttribute('href');
        const classes = Array.from(buttonViewElement.classList)
          .filter((className) => className.startsWith('ucb-button-'))
          .map((className) => className.replace('ucb-button-', ''));

        const buttonModelElement = model.createElement('ucb-button', {
          href,
          class: classes.join(' '),
        });

        return buttonModelElement;
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'ucb-button',
      view: (buttonModelElement, { writer: viewWriter }) => {
        const href = buttonModelElement.getAttribute('href');
        const classes = buttonModelElement.getAttribute('class') || '';
        const buttonViewElement = viewWriter.createContainerElement('button', {
          href,
          class: `ucb-button-${classes}`,
        });

        return buttonViewElement;
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'ucb-button',
      view: (buttonModelElement, { writer: viewWriter }) => {
        const href = buttonModelElement.getAttribute('href');
        const classes = buttonModelElement.getAttribute('class') || '';
        const buttonViewElement = viewWriter.createContainerElement('button', {
          href,
          class: `ucb-button-${classes}`,
        });

        return buttonViewElement;
      },
    });
  }
}
// EXTERNAL MODULE: delegated ./ui.js from dll-reference CKEditor5.dll
var delegated_uifrom_dll_reference_CKEditor5 = __webpack_require__("ckeditor5/src/ui.js");
// EXTERNAL MODULE: delegated ./utils.js from dll-reference CKEditor5.dll
var delegated_utilsfrom_dll_reference_CKEditor5 = __webpack_require__("ckeditor5/src/utils.js");
;// CONCATENATED MODULE: ./js/ckeditor5_plugins/button/src/buttonview.js




class MyButtonView extends delegated_uifrom_dll_reference_CKEditor5.View {
	constructor( locale ) {
		super( locale );

		this.focusTracker = new delegated_utilsfrom_dll_reference_CKEditor5.FocusTracker();
		this.keystrokes = new delegated_utilsfrom_dll_reference_CKEditor5.KeystrokeHandler();

		// Create a labeled field view for the color select.
		this.colorSelectView = new delegated_uifrom_dll_reference_CKEditor5.LabeledFieldView( locale );
		this.colorSelectView.label = 'Color';

		// Create the color select field.
		this.colorSelect = (0,delegated_uifrom_dll_reference_CKEditor5.createDropdown)( this.locale, {
			choices: [
				{ value: 'blue', label: 'Blue' },
				{ value: 'black', label: 'Black' },
				{ value: 'grey', label: 'Grey' },
				{ value: 'white', label: 'White' }
			]
		} );
		this.colorSelectView.fieldView = this.colorSelect;

		// Create a labeled field view for the style select.
		this.styleSelectView = new delegated_uifrom_dll_reference_CKEditor5.LabeledFieldView( locale );
		this.styleSelectView.label = 'Style';

		// Create the style select field.
		this.styleSelect = (0,delegated_uifrom_dll_reference_CKEditor5.createDropdown)( this.locale, {
			choices: [
				{ value: 'Regular', label: 'Regular' },
				{ value: 'Full', label: 'Full' }
			]
		} );
		this.styleSelectView.fieldView = this.styleSelect;

		// Create a labeled field view for the size select.
		this.sizeSelectView = new delegated_uifrom_dll_reference_CKEditor5.LabeledFieldView( locale );
		this.sizeSelectView.label = 'Size';

		// Create the size select field.
		this.sizeSelect = (0,delegated_uifrom_dll_reference_CKEditor5.createDropdown)( this.locale, {
			choices: [
				{ value: 'Large', label: 'Large' },
				{ value: 'Regular', label: 'Regular' },
				{ value: 'Small', label: 'Small' }
			]
		} );
		this.sizeSelectView.fieldView = this.sizeSelect;

		// Create a labeled field view for the link input.
		this.linkView = new delegated_uifrom_dll_reference_CKEditor5.LabeledFieldView( locale );
		this.linkView.label = 'Link';

		// Create the link input field.
		this.linkInput = document.createElement('input');
		this.linkInput.type = 'text';
		this.linkInput.placeholder = 'Enter link URL here';
		this.linkView.fieldView = this.linkInput;

		// Create the save button view.
		this.saveButtonView = new delegated_uifrom_dll_reference_CKEditor5.ButtonView( locale );
		this.saveButtonView.label = 'Save';
		this.saveButtonView.icon = delegated_corefrom_dll_reference_CKEditor5.icons.check;
		this.saveButtonView.class = 'ck-button-save';

		// Set the type of the save button to "submit" to trigger the submit event on the entire form when clicked.
		this.saveButtonView.type = 'submit';

		// Create the cancel button view.
		this.cancelButtonView = new delegated_uifrom_dll_reference_CKEditor5.ButtonView( locale );
		this.cancelButtonView.label = 'Cancel';
		this.cancelButtonView.icon = delegated_corefrom_dll_reference_CKEditor5.icons.cancel;
		this.cancelButtonView.class = 'ck-button-cancel';

		// Delegate ButtonView#execute to FormView#cancel.
		this.cancelButtonView.delegate( 'execute' ).to( this, 'cancel' )


		// Create the FocusCycler instance and add all the child views to it.
		this.focusCycler = new delegated_uifrom_dll_reference_CKEditor5.FocusCycler( {
			actions: {
				focusPrevious: 'up',
				focusNext: 'down'
			}
		} );
		this.focusCycler.add( this.colorSelectView );
		this.focusCycler.add( this.styleSelectView );
		this.focusCycler.add( this.sizeSelectView );
		this.focusCycler.add(this.linkView);
		this.focusCycler.add( this.saveButtonView);
		this.focusCycler.add( this.cancelButtonView );



	// Attach the submit handler to the form view.
	this.submitHandler = new delegated_uifrom_dll_reference_CKEditor5.submitHandler();
	this.submitHandler.delegate( 'submit' ).to( this, 'save' );

	// Attach listeners to the form view for focus and keystrokes.
	this.keystrokes.listenTo( this.element );
	this.focusTracker.add( this.element );
}
}
;// CONCATENATED MODULE: ./icons/hand-pointer-regular.svg
/* harmony default export */ const hand_pointer_regular = ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d=\"M358.182 179.361c-19.493-24.768-52.679-31.945-79.872-19.098-15.127-15.687-36.182-22.487-56.595-19.629V67c0-36.944-29.736-67-66.286-67S89.143 30.056 89.143 67v161.129c-19.909-7.41-43.272-5.094-62.083 8.872-29.355 21.795-35.793 63.333-14.55 93.152l109.699 154.001C134.632 501.59 154.741 512 176 512h178.286c30.802 0 57.574-21.5 64.557-51.797l27.429-118.999A67.873 67.873 0 0 0 448 326v-84c0-46.844-46.625-79.273-89.818-62.639zM80.985 279.697l27.126 38.079c8.995 12.626 29.031 6.287 29.031-9.283V67c0-25.12 36.571-25.16 36.571 0v175c0 8.836 7.163 16 16 16h6.857c8.837 0 16-7.164 16-16v-35c0-25.12 36.571-25.16 36.571 0v35c0 8.836 7.163 16 16 16H272c8.837 0 16-7.164 16-16v-21c0-25.12 36.571-25.16 36.571 0v21c0 8.836 7.163 16 16 16h6.857c8.837 0 16-7.164 16-16 0-25.121 36.571-25.16 36.571 0v84c0 1.488-.169 2.977-.502 4.423l-27.43 119.001c-1.978 8.582-9.29 14.576-17.782 14.576H176c-5.769 0-11.263-2.878-14.697-7.697l-109.712-154c-14.406-20.223 14.994-42.818 29.394-22.606zM176.143 400v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.733 0-14-7.163-14-16zm75.428 0v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.732 0-14-7.163-14-16zM327 400v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.732 0-14-7.163-14-16z\"/></svg>");
;// CONCATENATED MODULE: ./js/ckeditor5_plugins/button/src/buttonui.js




class ButtonUI extends delegated_corefrom_dll_reference_CKEditor5.Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'button', locale => {
            const command = editor.commands.get( 'addButton' );
            const button = new MyButtonView( locale );

            button.set( {
                label: 'button',
                icon: hand_pointer_regular,
                tooltip: true,
                withText: true,
            } );

            button.bind( 'isEnabled' ).to( command );
            button.bind( 'isOn' ).to( command, 'value', 'isEnabled' ).withDefaultValue( false );

            this.listenTo( button, 'execute', () => {
                const dialogDefinition = {
                    title: 'Add Button',
                    body: button.element,
                    buttons: [
                        {
                            label: 'Save',
                            type: 'submit',
                            class: 'ck-button',
                        },
                        {
                            label: 'Cancel',
                            type: 'button',
                            class: 'ck-button ck-button-secondary',
                            onClick: () => {
                                editor.editing.view.focus();
                            }
                        }
                    ],
                    focus: ( index, buttonCount ) => {
                        button.focus();
                    }
                };

                editor.plugins.get( 'Dialog' ).open( dialogDefinition );
            } );

            return button;
        } );
    }
}
;// CONCATENATED MODULE: ./js/ckeditor5_plugins/button/src/button.js




// Note that TooltipEditing and TooltipUI also extend `Plugin`, but these
  // are not seen as individual plugins by CKEditor 5. CKEditor 5 will only
  // discover the plugins explicitly exported in index.js.
  class Button extends delegated_corefrom_dll_reference_CKEditor5.Plugin {
    static get requires() {
      return [ ButtonEditing, ButtonUI ];
    }
  }
;// CONCATENATED MODULE: ./js/ckeditor5_plugins/button/src/index.js


/* harmony default export */ const src = ({
  Button: Button
});

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});