/**
 * @file registers the icon toolbar button and binds functionality to it.
 * 
 * @typedef { import('@types/ckeditor__ckeditor5-utils').Locale } Locale
 * @typedef { import('@types/ckeditor__ckeditor5-core').Command } Command
 * @typedef { import('@types/ckeditor__ckeditor5-ui/src/dropdown/dropdownview').default } DropdownView
 * @typedef { import('@types/ckeditor__ckeditor5-core/src/editor/editorwithui').EditorWithUI } EditorWithUI
 * @typedef { import('./iconconfig').SelectableOption } SelectableOption
 */

import { ButtonView, createDropdown, addToolbarToDropdown } from 'ckeditor5/src/ui';
import { sizeOptions, sizeDefault, alignmentOptions, alignmentDefault, colorOptions, colorDefault, styleOptions, styleDefault } from './iconconfig';
import { Plugin } from 'ckeditor5/src/core';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import iconIcon from '../../../../icons/icon.svg';
import themeIcon from '../../../../icons/theme.svg';

export default class IconUI extends Plugin {
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

		// This will register the icon toolbar button.
		componentFactory.add('icon', (locale) => {
			const command = commands.get('insertIcon');
			const buttonView = new ButtonView(locale);

			// Create the toolbar button.
			buttonView.set({
				label: locale.t('Icon'),
				icon: iconIcon,
				tooltip: true
			});

			// Bind the state of the button to the command.
			buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

			// Execute the command when the button is clicked (executed).
			this.listenTo(buttonView, 'execute', () => editor.execute('insertIcon'));

			return buttonView;
		});

		// Makes title, alignment, style, and theme options avaliable to the widget toolbar.
		componentFactory.add('iconSize', locale =>
			this._createDropdown(locale, 'Icon size', null, commands.get('sizeIcon'), sizeOptions, sizeDefault));
		componentFactory.add('iconAlignment', locale =>
			this._createDropdown(locale, 'Icon alignment', alignmentOptions[alignmentDefault].icon, commands.get('alignIcon'), alignmentOptions, alignmentDefault));
		componentFactory.add('iconColor', locale =>
			this._createDropdown(locale, 'Icon color', themeIcon, commands.get('colorIcon'), colorOptions, colorDefault));
		componentFactory.add('iconStyle', locale =>
			this._createDropdown(locale, 'Icon style', styleOptions[styleDefault].icon, commands.get('styleIcon'), styleOptions, styleDefault));
	}

	/**
	 * @inheritdoc
	 */
	afterInit() {
		const editor = this.editor;
		const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);
		widgetToolbarRepository.register('icon', {
			items: ['iconSize', 'iconAlignment', 'iconColor', 'iconStyle'],
			getRelatedElement: (selection) => {
				const selectedElement = selection.getSelectedElement();
				return selectedElement && selectedElement.is('element') && selectedElement.name === 'i' && selectedElement.hasClass('ucb-icon') ? selectedElement : null;
			}
		});
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
	 * @param {Command} command
	 *   The command to execute when one of the buttons is pushed.
	 * @param {Object<string, SelectableOption>} options
	 *   The options for buttons in this dropdown view.
	 * @param {string} defaultValue
	 *   The default value of the command.
	 * @returns {DropdownView}
	 *   The dropdown.
	 */
	_createDropdown(locale, label, icon, command, options, defaultValue) {
		const dropdownView = createDropdown(locale);
		addToolbarToDropdown(dropdownView, Object.entries(options).map(([optionValue, option]) => this._createButton(locale, option.label, option.icon, command, optionValue)));
		dropdownView.buttonView.set({
			label: locale.t(label),
			icon,
			tooltip: true,
			withText: !icon
		});
		if (icon === options[defaultValue].icon) // If the icon for the dropdown is the same as the icon for the default option, it changes to reflect the current selection.
			dropdownView.buttonView.bind('icon').to(command, 'value', value => options[value] ? options[value].icon : options[defaultValue].icon);
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
			tooltip: true, // Displays the tooltip on hover
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
