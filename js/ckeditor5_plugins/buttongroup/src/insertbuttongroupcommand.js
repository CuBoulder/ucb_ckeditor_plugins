/**
 * @file defines InsertButtonCommand, which is executed when the button toolbar button is pressed.
 */

import { Command } from 'ckeditor5/src/core';
import { defaultColor, defaultSize } from './buttongroupconfig';

export default class ButtonGroupCommand extends Command {
	constructor(editor) {
		super(editor);
		this.set('existingButtonGroupSelected', false);
	}
	execute({ value = '', size = defaultSize, color = defaultColor, classes = '' }) {
		const model = this.editor.model;
		const selection = model.document.selection;

		model.change(writer => {
			const range = selection.getFirstRange();
				const buttonGroup = writer.createElement('buttonGroup', {
					buttonGroupColor: color,
					buttonGroupSize: size,
				})
			for (const item of range.getItems()) {
				console.log(item)
				if (item.name =='linkButton'){
					const newButton = item._clone();
					newButton._setAttribute('linkButtonColor', color)
					newButton._setAttribute('linkButtonSize', size)
					writer.append(newButton, buttonGroup)
				}
			}
			model.insertContent(buttonGroup);
			// writer.setSelection(linkButtonContents, 'in');
		});
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const selectedElement = selection.getSelectedElement();

		const allowedIn = model.schema.findAllowedParent(
			selection.getFirstPosition(),
			'buttonGroup'
		);

		this.isEnabled = allowedIn !== null;

		this.existingButtonGroupSelected = isButtonGroupElement(selectedElement) ? selectedElement : null;
	}
}

/**
 * @param {Element | null} element 
 * @returns {boolean}
 *   Whether or not `element` is a map element.
 */
function isButtonGroupElement(element) {
	return element && element.name === 'buttonGroup';
}
