/**
 * @file defines InsertButtonCommand, which is executed when the button toolbar button is pressed.
 * 
 * @typedef { import('@types/ckeditor__ckeditor5-engine').Element } Element
 * @typedef { import('@types/ckeditor__ckeditor5-engine/src/model/writer').default } Writer
 */

import { Command } from 'ckeditor5/src/core';
import { defaultColor, defaultSize, defaultStyle } from './buttonconfig';

export default class ButtonCommand extends Command {
	constructor(editor) {
		super(editor);
		this.set('existingButtonSelected', false);
	}
	execute({ value = '', size = defaultSize, style = defaultStyle, color = defaultColor, href = '', classes = '' }) {
		const model = this.editor.model;
		const selection = model.document.selection;

		model.change(writer => {
			const button = addButton(writer, color, style, size, href, selection);
			// const position = selection.getFirstPosition();

			model.insertContent(button);
			writer.setSelection(button, 'on');
		});
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const selectedElement = selection.getSelectedElement();

		const allowedIn = model.schema.findAllowedParent(
			selection.getFirstPosition(),
			'linkButton'
		);

		this.isEnabled = allowedIn !== null;

		this.existingButtonSelected = isButtonElement(selectedElement) ? selectedElement : null;

	}
}

/**
 * @param {Writer} writer
 *   The writer used to create and append elements.
 * @returns {Element}
 *   The box element with all required child elements to match the box schema.
 */
function addButton(writer, color, style, size, href, selection) {
	const range = selection.getFirstRange(),
		linkButton = writer.createElement('linkButton', {
			linkButtonColor: color,
			linkButtonSize: size,
			linkButtonStyle: style,
			linkButtonHref: href
		}),
		linkButtonContents = writer.createElement('linkButtonContents');

	for (const item of range.getItems()) {
		const textNode = writer.createText(item.data);
		writer.append(textNode, linkButtonContents);
	}
	writer.append(linkButtonContents, linkButton);

	return linkButton;
}

/**
 * @param {Element | null} element 
 * @returns {boolean}
 *   Whether or not `element` is a map element.
 */
function isButtonElement(element) {
	return element && element.name === 'linkButton';
}

