/**
 * @file defines InsertCountdownCommand, which is executed when the countdown toolbar button is pressed.
 */

import { Command } from 'ckeditor5/src/core';
import { defaultBackground, defaultStyle } from './countdownconfig';

export default class CountdownCommand extends Command {
	constructor(editor) {
		super(editor);
		this.set('existingCountdownSelected', false);
	}

	execute({ style = defaultStyle, background = defaultBackground, date}) {
		const model = this.editor.model;
		const selection = model.document.selection;

		model.change(writer => {
			const range = selection.getFirstRange();
			const cuCountdown = writer.createElement('cuCountdown', {
				cuCountdownBackground: background,
				cuCountdownStyle: style,
				cuCountdownDate: date
			});

			// Create cuCountdownDate as a separate text node within cuCountdown
			const cuCountdownDate = writer.createText(date);
			writer.insert(cuCountdownDate, cuCountdown);

			model.insertContent(cuCountdown);
		});
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const selectedElement = selection.getSelectedElement();
	
		const allowedIn = model.schema.findAllowedParent(
			selection.getFirstPosition(),
			'cuCountdown'
		);
	
		this.isEnabled = allowedIn !== null;
	
		this.existingCountdownSelected = isButtonElement(selectedElement) ? selectedElement : null;
	
		if (this.existingCountdownSelected) {
			// Check and update the 'date' variable based on 'cuCountdownDate' attribute
			const cuCountdownDateAttribute = this.existingCountdownSelected.getAttribute('cuCountdownDate');
			if (cuCountdownDateAttribute !== undefined) {
				this.date = cuCountdownDateAttribute;
			} else {
				this.date = ''; // Set a default value if 'cuCountdownDate' is not defined
			}
		}
	}	
}

function isButtonElement(element) {
	return element && element.name === 'cuCountdown';
}
