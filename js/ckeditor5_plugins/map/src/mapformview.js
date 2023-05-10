/**
 * @file contains the map MapFormView.
 * 
 * @typedef { import('@types/ckeditor__ckeditor5-utils').Locale } Locale
 * @typedef { import('@types/ckeditor__ckeditor5-core').Command } Command
 * @typedef { import('@types/ckeditor__ckeditor5-ui/src/dropdown/dropdownview').default } DropdownView
 * @typedef { import('@types/ckeditor__ckeditor5-core/src/editor/editorwithui').EditorWithUI } EditorWithUI
 * @typedef { import('./mapconfig').SelectableOption } SelectableOption
 */

import { FocusTracker, KeystrokeHandler } from 'ckeditor5/src/utils';
import { addToolbarToDropdown, ButtonView, createDropdown, createLabeledInputText, FocusCycler, LabeledFieldView, submitHandler, View } from 'ckeditor5/src/ui';
import { icons } from 'ckeditor5/src/core';
import { sizeOptions, sizeDefault } from './mapconfig';

export default class MapFormView extends View {
	/**
	 * Creates a new MapFormView.
	 * 
	 * @param {Locale} locale
	 *   The locale.
	 */
	constructor(locale) {
		super(locale);

		// Creates the focus tracker and keystroke handler to use with the focus cycler.
		this.focusTracker = new FocusTracker();
		this.keystrokes = new KeystrokeHandler();

		// Creates the main input field.
		this.valueInputView = this._createInput(locale, 'Campus map URL');

		// Creates the size selector.
		this.sizeDropdownView = this._createSelectionDropdown(locale, 'Map size', null, 'size', sizeOptions, sizeDefault);

		// Creates the save and cancel buttons.
		this.saveButtonView = this._createActionButton(locale, 'Save', icons.check, 'ck-button-save');
		this.cancelButtonView = this._createActionButton(locale, 'Cancel', icons.cancel, 'ck-button-cancel');

		this.saveButtonView.type = 'submit'; // Set the type to 'submit', which will trigger the submit event on entire form when clicked.
		this.cancelButtonView.delegate('execute').to(this, 'cancel'); // Delegate ButtonView#execute to MapFormView#cancel.

		this.childViews = this.createCollection([
			this.valueInputView,
			this.sizeDropdownView,
			this.saveButtonView,
			this.cancelButtonView
		]);

		this._focusCycler = new FocusCycler({
			focusables: this.childViews,
			focusTracker: this.focusTracker,
			keystrokeHandler: this.keystrokes,
			actions: {
				focusPrevious: 'shift + tab', // Navigate form fields backwards using the Shift + Tab keystroke.
				focusNext: 'tab' // Navigate form fields forwards using the Tab key.
			}
		});

		this.setTemplate({
			tag: 'form',
			attributes: {
				class: ['ck', 'ck-map-form'],
				tabindex: '-1'
			},
			children: this.childViews
		});
	}

	render() {
		super.render();
		submitHandler({ // Submit the form when the user clicked the save button or pressed enter in the input.
			view: this
		});
	}

	focus() {
		this.childViews.first.focus();
	}

	reset() {
		this.set('size', sizeDefault);
		const element = this.element;
		if (element) element.reset();
	}


	/**
	 * Creates a selection dropdown with multiple buttons.
	 * 
	 * @param {Locale} locale
	 *   The locale.
	 * @param {string} tooltip
	 *   The dropdown's tooltip.
	 * @param {string | null} icon
	 *   The dropdowns's icon (optional). If `null`, the dropdown will display as text.
	 * @param {string} attribute
	 *   The attribute to set when one of the buttons is pushed.
	 * @param {Object<string, SelectableOption>} options
	 *   The options for buttons in this dropdown view.
	 * @param {string} defaultValue
	 *   The default value of the command.
	 * @returns {DropdownView}
	 *   The dropdown.
	 */
	_createSelectionDropdown(locale, tooltip, icon, attribute, options, defaultValue) {
		const dropdownView = createDropdown(locale), defaultOption = options[defaultValue];
		addToolbarToDropdown(dropdownView, Object.entries(options).map(([optionValue, option]) => this._createSelectableButton(locale, option.label, option.icon, attribute, optionValue)));
		dropdownView.buttonView.set({
			icon,
			tooltip: locale.t(tooltip),
			withText: !icon
		});
		dropdownView.buttonView.bind('label').to(this, attribute, value => locale.t(options[value] ? options[value].label : defaultOption.label));
		if (icon === options[defaultValue].icon) // If the icon for the dropdown is the same as the icon for the default option, it changes to reflect the current selection.
			dropdownView.buttonView.bind('icon').to(this, attribute, value => options[value] ? options[value].icon : defaultOption.icon);
		return dropdownView;
	}

	/**
	 * @param {Locale} locale
	 *   The locale.
	 * @param {string} label
	 *   The button's label.
	 * @param {string | null} icon
	 *   The button's icon (optional). If `null`, the button will display as text.
	 * @param {string} attribute
	 *   The attribute to set when the button is pushed.
	 * @param {string} value
	 *   The value to send to the command when the button is pushed.
	 * @returns {ButtonView}
	 *   A selectable button with the specified parameters.
	 */
	_createSelectableButton(locale, label, icon, attribute, value) {
		const buttonView = new ButtonView();
		buttonView.set({
			label: locale.t(label),
			icon,
			tooltip: !!icon, // Displays the tooltip on hover if there is an icon
			isToggleable: true, // Allows the button with the attribute's current value to display as selected
			withText: !icon // Displays the button as text if the icon is falsey
		});
		// Allows the button with the attribute's current value to display as selected
		buttonView.bind('isOn').to(this, attribute, attributeValue => attributeValue === value);
		// Sets the attribute to the button's value on click
		this.listenTo(buttonView, 'execute', () => {
			this.set(attribute, value);
		});
		return buttonView;
	}

	/**
	 * @param {Locale} locale
	 *   The locale.
	 * @param {string} label
	 *   The button's label.
	 * @param {string | null} icon
	 *   The button's icon (optional). If `null`, the button will display as text.
	 * @param {string | string[] | null} className
	 *   The button's CSS classes (optional).
	 * @returns {ButtonView}
	 *   An action button with the specified parameters. No actions are bound yet and must be bound afteward.
	 */
	_createActionButton(locale, label, icon, className) {
		const buttonView = new ButtonView();
		buttonView.set({
			label: locale.t(label),
			icon,
			class: className,
			tooltip: !!icon, // Displays the tooltip on hover if there is an icon
			withText: !icon // Displays the button as text if the icon is falsey
		});
		return buttonView;
	}

	/**
	 * @param {Locale} locale
	 *   The locale.
	 * @param {string} label
	 *   The input's label.
	 * @returns {LabeledFieldView}
	 */
	_createInput(locale, label) {
		const labeledInput = new LabeledFieldView(locale, createLabeledInputText);
		labeledInput.label = locale.t(label);
		return labeledInput;
	}
}
