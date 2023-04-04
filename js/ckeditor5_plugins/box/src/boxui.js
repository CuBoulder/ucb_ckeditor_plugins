/**
 * @file registers the box toolbar button and binds functionality to it.
 * 
 * @typedef { import('ckeditor5/src/utils').Locale } Locale
 * @typedef { import('ckeditor5/src/core').Command } Command
 * @typedef { import('@types/ckeditor__ckeditor5-ui/src/dropdown/dropdownview').default } DropdownView
 * @typedef { import('@types/ckeditor__ckeditor5-core/src/editor/editorwithui').EditorWithUI } EditorWithUI
 */

import { ButtonView, createDropdown, addToolbarToDropdown } from 'ckeditor5/src/ui';
import { alignmentOptions, alignmentDefault, styleOptions, styleDefault, themeOptions } from './boxconfig';
import { Plugin } from 'ckeditor5/src/core';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import boxIcon from '../../../../icons/box.svg';
import themeIcon from '../../../../icons/theme.svg';

export default class BoxUI extends Plugin {
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
		const editor = this.editor;

		// This will register the box toolbar button.
		editor.ui.componentFactory.add('box', (locale) => {
			const command = editor.commands.get('insertBox');
			const buttonView = new ButtonView(locale);

			// Create the toolbar button.
			buttonView.set({
				label: editor.t('Box'),
				icon: boxIcon,
				tooltip: true
			});

			// Bind the state of the button to the command.
			buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

			// Execute the command when the button is clicked (executed).
			this.listenTo(buttonView, 'execute', () => editor.execute('insertBox'));

			return buttonView;
		});

		// Makes alignment, style, and theme options avaliable to the widget toolbar.
		editor.ui.componentFactory.add('boxAlignment', locale => this._createAlignmentDropdown(locale));
		editor.ui.componentFactory.add('boxStyle', locale => this._createStyleDropdown(locale));
		editor.ui.componentFactory.add('boxTheme', locale => this._createThemeDropdown(locale));
	}

	/**
	 * @inheritdoc
	 */
	afterInit() {
		const editor = this.editor;
		const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);
		widgetToolbarRepository.register('box', {
			items: ['boxAlignment', 'boxStyle', 'boxTheme'],
			getRelatedElement: (selection) =>
				selection.focus.getAncestors()
					.find((node) => node.is('element') && node.hasClass('ucb-box'))
		});
	}

	/**
	 * @param {Locale} locale
	 *   The locale.
	 * @returns {DropdownView}
	 *   The alignment dropdown view.
	 */
	_createAlignmentDropdown(locale) {
		const editor = this.editor, command = editor.commands.get('alignBox'),
			alignmentDropdownView = createDropdown(locale);
		addToolbarToDropdown(
			alignmentDropdownView,
			Object.entries(alignmentOptions).map(([optionValue, option]) => this._createButton(option.label, option.icon, command, optionValue))
		);
		alignmentDropdownView.buttonView.set({
			label: 'Box alignment',
			icon: alignmentOptions[alignmentDefault].icon,
			tooltip: true
		});
		// Change icon to reflect current selection.
		alignmentDropdownView.buttonView.bind('icon').to(command, 'value', value => alignmentOptions[value] ? alignmentOptions[value].icon : alignmentOptions[alignmentDefault].icon);
		// Enable button if any of the buttons are enabled.
		alignmentDropdownView.bind('isEnabled').to(command, 'isEnabled');
		return alignmentDropdownView;
	}

	/**
	 * @param {Locale} locale
	 *   The locale.
	 * @returns {DropdownView}
	 *   The style dropdown view.
	 */
	_createStyleDropdown(locale) {
		const command = this.editor.commands.get('styleBox'),
			styleDropdownView = createDropdown(locale);
		addToolbarToDropdown(
			styleDropdownView,
			Object.entries(styleOptions).map(([optionValue, option]) => this._createButton(option.label, option.icon, command, optionValue))
		);
		styleDropdownView.buttonView.set({
			label: 'Box style',
			icon: styleOptions[styleDefault].icon,
			tooltip: true
		});
		// Change icon to reflect current selection.
		styleDropdownView.buttonView.bind('icon').to(command, 'value', value => styleOptions[value] ? styleOptions[value].icon : styleOptions[styleDefault].icon);
		// Enable button if any of the buttons are enabled.
		styleDropdownView.bind('isEnabled').to(command, 'isEnabled');
		return styleDropdownView;
	}

	/**
	 * @param {Locale} locale
	 *   The locale.
	 * @returns {DropdownView}
	 *   The theme dropdown view.
	 */
	_createThemeDropdown(locale) {
		const command = this.editor.commands.get('themeBox'),
			themeDropdownView = createDropdown(locale);
		addToolbarToDropdown(
			themeDropdownView,
			Object.entries(themeOptions).map(([optionValue, option]) => this._createButton(option.label, option.icon, command, optionValue))
		);
		themeDropdownView.buttonView.set({
			label: 'Box theme',
			icon: themeIcon,
			tooltip: true
		});
		// Enable button if any of the buttons are enabled.
		themeDropdownView.bind('isEnabled').to(command, 'isEnabled');
		return themeDropdownView;
	}

	/**
	 * @param {string} label
	 *   The button's label.
	 * @param {string | null} icon
	 *   The button's icon (optional). If null, the button will display as text.
	 * @param {Command} command
	 *   The command to execute when the button is pushed.
	 * @param {string} value
	 *   The value to send to the command when the button is pushed.
	 * @returns {ButtonView}
	 *   A button with the specified parameters.
	 */
	_createButton(label, icon, command, value) {
		const editor = this.editor, buttonView = new ButtonView();
		buttonView.set({
			label,
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
