/** 
 * @file defines ModifyIconCommand, which is executed to modify attributes of the icon from the widget toolbar.
 * 
 * @typedef { import('@types/ckeditor__ckeditor5-core').Editor } Editor
 */

import { Command } from 'ckeditor5/src/core';
import { getSelectedIconWidget } from './iconutils';

export default class ModifyIconCommand extends Command {
	/** 
	 * The name of the attribute this command modifies.
	 * @type {string}
	 */
	attributeName

	/**
	 * The default value to set if there isn't one specified.
	 * @type {string}
	 */
	defaultValue

	/**
	 * Creates a new ModifyIconCommand.
	 * @param {Editor} editor 
	 *   The editor.
	 * @param {string} attributeName 
	 *   The name of the attribute this command modifies.
	 * @param {string} defaultValue 
	 *   The default value to set if there isn't one specified.
	 */
	constructor(editor, attributeName, defaultValue) {
		super(editor);
		this.attributeName = attributeName;
		this.defaultValue = defaultValue;
	}

	/**
	 * @inheritdoc
	 */
	refresh() {
		const model = this.editor.model, icon = getSelectedIconWidget(model.document.selection), attributeName = this.attributeName, defaultValue = this.defaultValue;
		this.isEnabled = !!icon; // Disables any ModifyIconCommand if there is no selected icon
		if (this.isEnabled)
			this.value = icon.hasAttribute(attributeName) ? icon.getAttribute(attributeName) : defaultValue; // Sets the `value` of this ModifyIconCommand to the attribute of the selected icon
		else this.value = defaultValue;
	}

	/**
	 * @inheritdoc
	 */
	execute(options = { value: '' }) {
		const model = this.editor.model, icon = getSelectedIconWidget(model.document.selection), attributeName = this.attributeName, defaultValue = this.defaultValue;
		if (icon)
			model.change(writer => writer.setAttribute(attributeName, options.value || defaultValue, icon)); // Sets the attribute of the selected icon to a new value upon execution of this command
	}
}
