/**
 * @file registers the icon toolbar button and binds functionality to it.
 * 
 * @typedef { import('@types/ckeditor__ckeditor5-utils').Locale } Locale
 * @typedef { import('@types/ckeditor__ckeditor5-core').Command } Command
 * @typedef { import('@types/ckeditor__ckeditor5-ui/src/dropdown/dropdownview').default } DropdownView
 * @typedef { import('@types/ckeditor__ckeditor5-core/src/editor/editorwithui').EditorWithUI } EditorWithUI
 * @typedef { import('../iconconfig').SelectableOption } SelectableOption
 */

import { ButtonView } from 'ckeditor5/src/ui';
import { Plugin } from 'ckeditor5/src/core';
import iconIcon from '../../../../../icons/icon.svg';

export default class IconPicker extends Plugin {
	/**
	 * @inheritdoc
	 */
	static get requires() {
		return [];
	}

	/**
	 * @inheritdoc
	 */
	init() {
		/** @type {EditorWithUI} */
		const editor = this.editor,
			commands = editor.commands,
			componentFactory = editor.ui.componentFactory;

		// This will register the icon toolbar button.
		componentFactory.add('icon', (locale) => {
			const command = commands.get('insertIcon');
			const buttonView = new ButtonView(locale);

			// Create the toolbar button.
			buttonView.set({
				label: locale.t('Icons'),
				icon: iconIcon,
				tooltip: true
			});

			// Bind the state of the button to the command.
			buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

			// Execute the command when the button is clicked (executed).
			this.listenTo(buttonView, 'execute', () => editor.execute('insertIcon'));

			return buttonView;
		});
	}
}
