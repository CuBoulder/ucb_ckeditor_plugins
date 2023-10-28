/**
 * @file defines InsertCalloutCommand, which is executed when the callout toolbar button is pressed.
 */

import { Command } from 'ckeditor5/src/core';
import { defaultSize } from './calloutconfig';

export default class CalloutCommand extends Command {
	constructor(editor) {
		super(editor);
		this.set('existingCalloutSelected', false);
	}

	execute({ size = defaultSize, calloutText}) {
		const model = this.editor.model;
		const selection = model.document.selection;

		model.change(writer => {
			const range = selection.getFirstRange();
			const cuCallout = writer.createElement('cuCallout', {
				cuCalloutSize: size
			});
			writer.insert(calloutText, cuCallout);
			model.insertContent(cuCallout);
		});
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const selectedElement = selection.getSelectedElement();
	
		const allowedIn = model.schema.findAllowedParent(
			selection.getFirstPosition(),
			'cuCallout'
		);
	
		this.isEnabled = allowedIn !== null;
	
		this.existingCalloutSelected = isButtonElement(selectedElement) ? selectedElement : null;
	}	
}

function isButtonElement(element) {
	return element && element.name === 'cuCallout';
}
