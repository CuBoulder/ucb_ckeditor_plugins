/**
 * @file registers the icon picker and binds functionality to it.
 * 
 * @typedef { { 'icons': string[], 'label': string } } CategoryDefinition
 * @typedef { { 'styles': string[], 'label': string } } IconDefinition
 * 
 * @typedef { import('@types/ckeditor__ckeditor5-utils').Locale } Locale
 * @typedef { import('@types/ckeditor__ckeditor5-core').Command } Command
 * @typedef { import('@types/ckeditor__ckeditor5-ui/src/dropdown/dropdownview').default } DropdownView
 * @typedef { import('@types/ckeditor__ckeditor5-core/src/editor/editorwithui').EditorWithUI } EditorWithUI
 * @typedef { import('../iconconfig').SelectableOption } SelectableOption
 */

import { createDropdown } from 'ckeditor5/src/ui';
import { Plugin } from 'ckeditor5/src/core';
import iconIcon from '../../../../../icons/icon.svg';
import IconPickerHeader from './iconpickerheader';
import IconPickerView from './iconpickerview';
import IconPickerGrid from './iconpickergrid';
import IconPickerFooter from './iconpickerfooter';

export default class IconPicker extends Plugin {
	/**
	 * @inheritdoc
	 */
	init() {
		/** @type {EditorWithUI} */
		const editor = this.editor,
			command = editor.commands.get('insertIcon'),
			componentFactory = editor.ui.componentFactory;

		// This will register the icon toolbar button.
		componentFactory.add('icon', (locale) => {
			const dropdownView = createDropdown(locale);
			let iconPickerView;

			// Create the toolbar button.
			dropdownView.buttonView.set({
				label: locale.t('Icons'),
				icon: iconIcon,
				tooltip: true
			});

			// Bind the state of the button to the command.
			dropdownView.bind('isEnabled').to(command, 'isEnabled');

			dropdownView.on('change:isOpen', () => {
				if (!iconPickerView) {
					iconPickerView = this._createIconPickerView(locale);
					iconPickerView.delegate('execute').to(command);
					dropdownView.panelView.children.add(iconPickerView);
				}
			});

			return dropdownView;
		});
	}

	_createIconPickerView(locale) {
		const { config } = this.editor;

		/** @type {Object<string, CategoryDefinition>} */
		const faCategories = config.get('icon.faCategories');
		
		/** @type {Object<string, IconDefinition>} */
		const faIcons = config.get('icon.faIcons');

		const headerView = new IconPickerHeader(locale, faCategories);
		const gridView = new IconPickerGrid(locale);
		const footerView = new IconPickerFooter(locale);

		headerView.on('execute', () => {
			gridView.refresh(faCategories[headerView.categoryDropdownView.value], faIcons);
			footerView.refresh(null);
		});
		gridView.on('execute', (eventInfo, iconName) => footerView.refresh(iconName, faIcons[iconName]));

		return new IconPickerView(locale, headerView, gridView, footerView);
	}
}
