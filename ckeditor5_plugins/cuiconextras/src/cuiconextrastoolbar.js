/**
 * @file registers the icon toolbar and binds functionality to it.
 * 
 * @typedef { import('@ckeditor/ckeditor5-utils').Locale } Locale
 * @typedef { import('@ckeditor/ckeditor5-core').Command } Command
 * @typedef { import('@ckeditor/ckeditor5-ui/src/dropdown/dropdownview').default } DropdownView
 * @typedef { import('@ckeditor/ckeditor5-core/src/editor/editorwithui').EditorWithUI } EditorWithUI
 * @typedef { import('./cuiconextrasconfig').SelectableOption } SelectableOption
 */

import { ButtonView, createDropdown, addToolbarToDropdown } from 'ckeditor5/src/ui';
import { colorOptions, colorDefault, backgroundStyleOptions, backgroundStyleDefault } from './cuiconextrasconfig';
import { Plugin } from 'ckeditor5/src/core';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import themeIcon from '../../../icons/theme.svg';

export default class CUIconExtrasToolbar extends Plugin {
	/**
	 * @inheritdoc
	 */
	static get requires() {
		return [WidgetToolbarRepository];
	}

	/**
	 * @inheritdoc
	 */
	init() {
		/** @type {EditorWithUI} */
		const editor = this.editor,
			commands = editor.commands,
			componentFactory = editor.ui.componentFactory;

		// Makes style and theme options avaliable to the widget toolbar.
		componentFactory.add('iconCUColor', locale =>
			this._createDropdown(locale, 'Icon theme color', themeIcon, null, commands.get('changeIconCUColor'), colorOptions, colorDefault));
		componentFactory.add('iconCUBackgroundStyle', locale =>
			this._createDropdown(locale, 'Icon background style', backgroundStyleOptions[backgroundStyleDefault].icon, null, commands.get('changeIconCUBackgroundStyle'), backgroundStyleOptions, backgroundStyleDefault));

		// Adds the new items to the icon toolbar along with the existing items.
		editor.config.set('icon.toolbarItems', ['iconSize', 'iconAlignment', 'iconStyle', 'iconCUColor', 'iconCUBackgroundStyle']);
	}

	/**
	 * Creates a dropdown with multiple buttons for executing a command.
	 * 
	 * @param {Locale} locale
	 *   The locale.
	 * @param {string} label
	 *   The dropdown's label.
	 * @param {string | null} icon
	 *   The dropdowns's icon (optional). If `null`, the dropdown will display as text.
	 * @param {string | null} fallbackIcon
	 *   The dropdowns's fallback icon (optional).
	 * @param {Command} command
	 *   The command to execute when one of the buttons is pushed.
	 * @param {Object<string, SelectableOption>} options
	 *   The options for buttons in this dropdown view.
	 * @param {string} defaultValue
	 *   The default value of the command.
	 * @returns {DropdownView}
	 *   The dropdown.
	 */
	_createDropdown(locale, label, icon, fallbackIcon, command, options, defaultValue) {
		const dropdownView = createDropdown(locale);
		addToolbarToDropdown(dropdownView, Object.entries(options).map(([optionValue, option]) => this._createButton(locale, option.label, option.icon, command, optionValue)));
		dropdownView.buttonView.set({
			label: locale.t(label),
			icon,
			tooltip: locale.t(label),
			withText: !icon
		});
		if (icon === options[defaultValue].icon) { // If the icon for the dropdown is the same as the icon for the default option, it changes to reflect the current selection.
			dropdownView.buttonView.bind('label').to(command, 'value', value => locale.t((options[value] || options[defaultValue]).label));
			dropdownView.buttonView.bind('icon').to(command, 'value', value => (options[value] || options[defaultValue]).icon || fallbackIcon);
			dropdownView.buttonView.bind('withText').to(command, 'value', value => !(options[value] || options[defaultValue]).icon);
		}
		// Enable button if any of the buttons are enabled.
		dropdownView.bind('isEnabled').to(command, 'isEnabled');
		return dropdownView;
	}

	/**
	 * @param {Locale} locale
	 *   The locale.
	 * @param {string} label
	 *   The button's label.
	 * @param {string | null} icon
	 *   The button's icon (optional). If `null`, the button will display as text.
	 * @param {Command} command
	 *   The command to execute when the button is pushed.
	 * @param {string} value
	 *   The value to send to the command when the button is pushed.
	 * @returns {ButtonView}
	 *   A button with the specified parameters.
	 */
	_createButton(locale, label, icon, command, value) {
		const editor = this.editor, buttonView = new ButtonView();
		buttonView.set({
			label: locale.t(label),
			icon,
			tooltip: !!icon, // Displays the tooltip on hover
			isToggleable: true, // Allows the button with the command's current value to display as selected
			withText: !icon // Displays the button as text if the icon is falsey
		});
		// Disables the button if the command is disabled
		buttonView.bind('isEnabled').to(command);
		// Allows the button with the command's current value to display as selected
		buttonView.bind('isOn').to(command, 'value', commandValue => commandValue === value);
		// Executes the command with the button's value on click
		this.listenTo(buttonView, 'execute', () => {
			command.execute({ value });
			editor.editing.view.focus();
		});
		return buttonView;
	}
}
