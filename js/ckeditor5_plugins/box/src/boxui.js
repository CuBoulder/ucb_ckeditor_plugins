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
import { alignmentOptions } from './boxconfig';
import { Plugin, icons, Command } from 'ckeditor5/src/core';
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
	}

	afterInit() {
		const editor = this.editor;
		const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);
		widgetToolbarRepository.register('box', {
			items: ['boxAlignment'],
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
			icon: icons.objectFullWidth,
			tooltip: true
		});
		// Change icon to reflect current selection.
		alignmentDropdownView.buttonView.bind('icon').to(command, 'value', value => alignmentOptions[value] ? alignmentOptions[value].icon : icons.objectFullWidth); // not working?
		// Change icon to reflect current selection's alignment.
		alignmentDropdownView.bind('isEnabled').to(command, 'isEnabled'); // working
		// Focus the editable after executing the command.
		// Overrides a default behaviour where the focus is moved to the dropdown button (#12125).
		this.listenTo(alignmentDropdownView, 'execute', () => {
			editor.editing.view.focus();
		});
		return alignmentDropdownView;
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
		buttonView.bind('isEnabled').to(command); // working
		buttonView.bind('isOn').to(command, 'value', value => value === name); // not working?
		// Execute command.
		this.listenTo(buttonView, 'execute', () => { // working
			command.execute({ value: name });
			editor.editing.view.focus();
		});
		return buttonView;
	}
}
