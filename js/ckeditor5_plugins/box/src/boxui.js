/**
 * @file registers the box toolbar button and binds functionality to it.
 */

import {
	View,
	ButtonView,
	createDropdown,
	addToolbarToDropdown
} from 'ckeditor5/src/ui';
import { Locale } from 'ckeditor5/src/utils';
import { alignmentOptions, alignmentDefault, styleOptions, styleDefault } from './boxconfig';
import { Plugin, Command } from 'ckeditor5/src/core';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import icon from '../../../../icons/box.svg';

export default class BoxUI extends Plugin {
	/**
	 * The form view displayed inside the balloon.
	 * @type {BoxFormView}
	 */
	formView

	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [WidgetToolbarRepository];
	}

	init() {
		const editor = this.editor;

		// This will register the box toolbar button.
		editor.ui.componentFactory.add('box', (locale) => {
			const command = editor.commands.get('insertBox');
			const buttonView = new ButtonView(locale);

			// Create the toolbar button.
			buttonView.set({
				label: editor.t('Box'),
				icon,
				tooltip: true,
			});

			// Bind the state of the button to the command.
			buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

			// Execute the command when the button is clicked (executed).
			this.listenTo(buttonView, 'execute', () =>
				editor.execute('insertBox'),
			);

			return buttonView;
		});

		// Adds the alignment, style, and color options to the widget toolbar.
		editor.ui.componentFactory.add('boxAlignment', locale => this._createAlignmentDropdown(locale));
		editor.ui.componentFactory.add('boxStyle', locale => this._createStyleDropdown(locale));
	}

	afterInit() {
		const editor = this.editor;
		const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);
		widgetToolbarRepository.register('box', {
			items: ['boxAlignment', 'boxStyle'],
			getRelatedElement: (selection) =>
				selection.focus.getAncestors()
					.find((node) => node.is('element') && node.hasClass('ucb-box'))
		});
	}

	/**
	 * @param {Locale} locale
	 * @returns {View}
	 *   The alignment dropdown view.
	 */
	_createAlignmentDropdown(locale) {
		const editor = this.editor, command = editor.commands.get('alignBox'),
			alignmentDropdownView = createDropdown(locale);
		addToolbarToDropdown(
			alignmentDropdownView,
			Object.entries(alignmentOptions).map(([optionName, option]) => this._createButton(optionName, option.label, option.icon, command))
		);
		alignmentDropdownView.buttonView.set({
			label: 'Box alignment',
			icon: alignmentOptions[alignmentDefault].icon,
			tooltip: true
		});
		// Change icon to reflect current selection.
		alignmentDropdownView.buttonView.bind('icon').to(command, 'value', value => alignmentOptions[value] ? alignmentOptions[value].icon : alignmentOptions[alignmentDefault].icon);
		// Enable button if any of the buttons is enabled.
		alignmentDropdownView.bind('isEnabled').to(command, 'isEnabled');
		return alignmentDropdownView;
	}

	/**
	 * @param {Locale} locale
	 * @returns {View}
	 *   The style dropdown view.
	 */
	_createStyleDropdown(locale) {
		const editor = this.editor, command = editor.commands.get('styleBox'),
			styleDropdownView = createDropdown(locale);
		addToolbarToDropdown(
			styleDropdownView,
			Object.entries(styleOptions).map(([optionName, option]) => this._createButton(optionName, option.label, option.icon, command))
		);
		styleDropdownView.buttonView.set({
			label: 'Box style',
			icon: styleOptions[styleDefault].icon,
			tooltip: true
		});
		// Change icon to reflect current selection.
		styleDropdownView.buttonView.bind('icon').to(command, 'value', value => styleOptions[value] ? styleOptions[value].icon : styleOptions[styleDefault].icon);
		// Enable button if any of the buttons is enabled.
		styleDropdownView.bind('isEnabled').to(command, 'isEnabled');
		return styleDropdownView;
	}

	/**
	 * @param {string} name
	 * @param {string} label
	 * @param {string} icon
	 * @param {Command} command
	 * @returns {ButtonView}
	 *   A button with the specified parameters.
	 */
	_createButton(name, label, icon, command) {
		const editor = this.editor, buttonView = new ButtonView();
		buttonView.set({
			label,
			icon,
			tooltip: true,
			isToggleable: true
		});
		// Bind button model to command.
		buttonView.bind('isEnabled').to(command);
		buttonView.bind('isOn').to(command, 'value', value => value === name);
		// Execute command.
		this.listenTo(buttonView, 'execute', () => {
			command.execute({ value: name });
			editor.editing.view.focus();
		});
		return buttonView;
	}
}
