/**
 * @file contains the icon picker submit form.
 * 
 * @typedef { import('./iconpicker').IconDefinition } IconDefinition
 * @typedef { import('@types/ckeditor__ckeditor5-utils').Locale } Locale
 */

import { ButtonView, submitHandler, View } from 'ckeditor5/src/ui';
import { icons } from 'ckeditor5/src/core';

export default class IconPickerForm extends View {
	/**
	 * Creates a new IconPickerForm.
	 * 
	 * @param {Locale} locale 
	 *   The locale.
	 */
	constructor(locale) {
		super(locale);

		const t = locale.t;

		this.set('iconName', null);

		this.submitButtonView = createButton(t('Insert icon'), icons.check, 'ck-button-save');
		this.submitButtonView.bind('isEnabled').to(this, 'iconName', value => !!value);
		// Submit type of the button will trigger the submit event on entire form when clicked 
		//(see submitHandler() in render() below).
		this.submitButtonView.type = 'submit';

		this.setTemplate({
			tag: 'form',
			attributes: {
				class: ['ucb-icon-picker-form']
			},
			children: [this.submitButtonView]
		});
	}

	/**
	 * @inheritdoc
	 */
	render() {
		super.render();

		submitHandler({
			view: this
		});
	}

	/**
	 * Focuses the first focusable.
	 */
	focus() {
		this.submitButtonView.focus();
	}
}

/**
 * @param {Locale} locale
 *   The locale.
 * @param {string} label
 *   The button's label.
 * @param {string?} icon
 *   The button's icon (optional).
 * @param {string?} className
 *   The button's class (optional).
 * @param {boolean | string | null} withText
 *   Set to force text display even if the button has an icon.
 * @returns {ButtonView}
 *   A button with the specified parameters.
 */
function createButton(label, icon, className, withText) {
	const button = new ButtonView();

	button.set({
		label: typeof withText === 'string' ? withText : label,
		icon,
		tooltip: icon ? label : false,
		withText: withText || !icon,
		class: className
	});

	return button;
}
