/**
 * @file contains the icon picker icon for FontAwesome icons.
 * 
 * @typedef { import('./iconpicker').IconDefinition } IconDefinition
 * @typedef { import('@types/ckeditor__ckeditor5-utils').Locale } Locale
 */

import { View } from 'ckeditor5/src/ui';
import IconPickerFAIcon from './iconpickerfaicon';
import IconPickerForm from './iconpickerform';

export default class IconPickerFooter extends View {
	/**
	 * Creates a new IconPickerFooter.
	 * 
	 * @param {Locale} locale 
	 *   The locale.
	 */
	constructor(locale) {
		super(locale);

		const t = locale.t, bind = this.bindTemplate;

		this.set('iconName', null);
		this.set('iconLabel', 'Select an icon');

		this.items = this.createCollection();

		this._faIcon = null;
		this.iconPreviewView = new View();
		this.iconPreviewView.setTemplate({
			tag: 'span',
			attributes: {
				class: ['ucb-icon-picker-preview']
			}
		});

		this.iconLabelView = new View();
		this.iconLabelView.setTemplate({
			tag: 'span',
			attributes: {
				class: ['ucb-icon-picker-label']
			},
			children: [{ text: bind.to('iconLabel', value => t(value)) }]
		});

		this.formView = new IconPickerForm(locale);
		this.formView.bind('iconName').to(this, 'iconName');
		this.listenTo(this.formView, 'submit', () => this.fire('execute'));

		this.setTemplate({
			tag: 'div',
			attributes: {
				class: ['ck', 'ck-character-info', 'ucb-icon-picker-footer']
			},
			children: [this.iconPreviewView, this.iconLabelView, this.formView]
		});
	}

	/**
	 * Refreshes the icon picker footer when an icon in the grid is selected.
	 * 
	 * @param {string?} iconName 
	 *   The name of the icon.
	 * @param {IconDefinition?} iconDefinition 
	 *   The defintion of the icon.
	 */
	refresh(iconName, iconDefinition) {
		this.set('iconName', iconName);
		this.set('iconLabel', iconDefinition ? iconDefinition.label : 'Select an icon');

		const iconPreviewView = this.iconPreviewView;
		let faIcon = null;

		if (this._faIcon) {
			iconPreviewView.deregisterChild(this._faIcon);
			iconPreviewView.element.innerText = '';
		}

		if (iconName && iconDefinition) {
			faIcon = new IconPickerFAIcon(this.locale, iconName, iconDefinition);
			iconPreviewView.registerChild(faIcon);
			iconPreviewView.element.appendChild(faIcon.element);	
		}

		this._faIcon = faIcon;
	}

	/**
	 * Focuses the form view.
	 */
	focus() {
		this.formView.focus();
	}
}
