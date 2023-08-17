/**
 * @file contains the icon picker icon for FontAwesome icons.
 * 
 * @typedef { import('./iconpicker').IconDefinition } IconDefinition
 * @typedef { import('@types/ckeditor__ckeditor5-utils').Locale } Locale
 */

import { View } from 'ckeditor5/src/ui';

export default class IconPickerFAIcon extends View {
	/**
	 * Creates a new IconPickerFAIcon.
	 * 
	 * @param {Locale} locale 
	 *   The locale.
	 * @param {string} iconName 
	 *   The name of the icon this button is for.
	 * @param {IconDefinition} iconDefinition 
	 *   The defintion of the icon this button is for.
	 * @param {string?} iconStyle 
	 *   The preferred style to display the icon in (optional).
	 */
	constructor(locale, iconName, iconDefinition, iconStyle) {
		super(locale);

		const styles = iconDefinition.styles;

		let styleIndex = 0;
		if (iconStyle) {
			const _styleIndex = styles.indexOf(iconStyle);
			if (_styleIndex !== -1)
				styleIndex = _styleIndex;
		}

		this.setTemplate({
			tag: 'span',
			attributes: {
				class: [
					'ucb-icon-fa',
					'fa-' + styles[styleIndex],
					'fa-' + iconName
				]
			}
		});
	}
}
