/**
 * @file contains the icon picker FormHeaderView.
 * 
 * @typedef { import('./iconpicker').CategoryDefinition } CategoryDefinition
 * @typedef { import('@types/ckeditor__ckeditor5-utils').Locale } Locale
 * @typedef { import('@types/ckeditor__ckeditor5-ui/src/dropdown/dropdownview').default } DropdownView
 * @typedef { import('@types/ckeditor__ckeditor5-ui/src/dropdown/utils').ListDropdownItemDefinition } ListDropdownItemDefinition
 */

import { Collection } from 'ckeditor5/src/utils';
import { addListToDropdown, createDropdown, FormHeaderView, Model } from 'ckeditor5/src/ui';

export default class IconPickerHeader extends FormHeaderView {
	/**
	 * @inheritdoc
	 */
	constructor(locale, categories) {
		super(locale);

		this.categoryDropdownView = this._createCategoryDropdown(locale, categories);
		this.categoryDropdownView.panelPosition = locale.uiLanguageDirection === 'rtl' ? 'se' : 'sw';

		this.label = locale.t('Icons');
		this.class = ['ucb-icon-picker-header'];

		this.children.add(this.categoryDropdownView);
	}

	/**
	 * Focuses the `categoryDropdownView`.
	 */
	focus() {
		this.categoryDropdownView.focus();
	}

	/**
	 * @param {Locale} locale
	 *   The locale.
	 * @param {Object<string, CategoryDefinition>} categories
	 *   The object containing the category definitions.
	 * @returns {DropdownView} The category selection dropdown.
	 */
	_createCategoryDropdown(locale, categories) {
		const dropdownView = createDropdown(this.locale), items = createCategoryDropdownItems(locale, dropdownView, categories), defaultLabel = 'Select a category', t = locale.t;

		dropdownView.buttonView.set({
			label: t(defaultLabel),
			tooltip: t('Icon categories'),
			withText: true,
			class: ['ck-dropdown__button_label-width_auto']
		});
		dropdownView.buttonView.bind('label').to(dropdownView, 'value', value => t(categories[value] ? categories[value].label : defaultLabel));
		dropdownView.on('execute', eventInfo => dropdownView.set('value', eventInfo.source.name));
		dropdownView.delegate('execute').to(this);

		addListToDropdown(dropdownView, items);

		return dropdownView;
	}
}

/**
 * @param {Locale} locale
 *   The locale.
 * @param {DropdownView} dropdownView 
 *   The dropdown view.
 * @param {Object<string, CategoryDefinition>} categories
 *   The object containing the category definitions.
 * @returns {Collection<ListDropdownItemDefinition>}
 *   The opts for the dropdown view.
 */
function createCategoryDropdownItems(locale, dropdownView, categories) {
	/** @type {Collection<ListDropdownItemDefinition>} */
	const items = new Collection();

	for (const [name, definition] of Object.entries(categories)) {
		const model = new Model({
			name,
			label: locale.t(definition.label),
			withText: true
		});
		model.bind('isOn').to(dropdownView, 'value', value => value === name);
		items.add({ type: 'button', model });
	}

	return items;
}
