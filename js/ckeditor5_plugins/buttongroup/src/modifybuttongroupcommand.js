/** 
 * @file defines ModifyButtonGroup, which is executed to modify attributes of the buttongroup from the widget toolbar.
 * 
 * @typedef { import('@types/ckeditor__ckeditor5-core').Editor } Editor
 */

import { Command } from 'ckeditor5/src/core';
import { getSelectedButtonGroupWidget } from './buttongrouputils';

export default class ModifyButtonGroupCommand extends Command {
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
	 * Creates a new ModifyButtonGroup command.
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
		const model = this.editor.model, buttongroup = getSelectedButtonGroupWidget(model.document.selection), attributeName = this.attributeName, defaultValue = this.defaultValue;
		this.isEnabled = !!buttongroup; // Disables any ModifyButtonGroup if there is no selected box
		if (this.isEnabled)
			this.value = buttongroup.getAttribute(attributeName); // Sets the `value` of this ModifyButtonGroup to the attribute of the selected bg
		else this.value = defaultValue;
	}

	/**
	 * @inheritdoc
	 */
	execute(options = { value: '' }) {
		const model = this.editor.model, buttongroup = getSelectedButtonGroupWidget(model.document.selection), attributeName = this.attributeName, defaultValue = this.defaultValue;
		if (buttongroup)
			model.change(writer => writer.setAttribute(attributeName, options.value || defaultValue, buttongroup)); // Sets the attribute of the selected bg to a new value upon execution of this command
	}
}
