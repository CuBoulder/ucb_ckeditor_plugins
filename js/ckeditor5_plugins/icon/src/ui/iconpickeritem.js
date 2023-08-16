/**
 * @file contains the icon picker grid button for FontAwesome icons.
 * 
 * @typedef { import('./iconpicker').IconDefinition } IconDefinition
 * @typedef { import('@types/ckeditor__ckeditor5-utils').Locale } Locale
 */

import { ButtonView } from 'ckeditor5/src/ui';
import IconPickerFAIcon from './iconpickerfaicon';

export default class IconPickerItem extends ButtonView {
	/**
	 * Creates a new IconPickerItem.
	 * 
	 * @param {Locale} locale 
	 *   The locale.
	 * @param {string} iconName 
	 *   The name of the icon this button is for.
	 * @param {IconDefinition} iconDefinition 
	 *   The defintion of the icon this button is for.
	 */
	constructor(locale, iconName, iconDefinition) {
		super(locale);

		this._faIcon = new IconPickerFAIcon(locale, iconName, iconDefinition);
		this._faIcon.extendTemplate({
			attributes: {
				class: [
					'ck-button__icon',
					'ck-icon_inherit-color'
				]
			}
		});

		this.registerChild([this._faIcon]);
	}

	/**
	 * @inheritdoc
	 */
	render() {
		super.render();
		this.element.appendChild(this._faIcon.element);
	}
}
