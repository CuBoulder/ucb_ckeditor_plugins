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
				if (item.name =='linkButton'){
					const innerTextEl = item._children ? writer.cloneElement(item._children._nodes[0]) : false;
					const newButton = item._clone();
					newButton._setAttribute('linkButtonColor', color)
					newButton._setAttribute('linkButtonSize', size)
					if(innerTextEl){
						writer.append(innerTextEl, newButton)
					};
					writer.append(newButton, buttonGroup)
				}
			}
			model.insertContent(buttonGroup);
		});
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const selectedElement = selection.getSelectedElement();

		console.log(selectedElement)


		if(selectedElement && selectedElement.name == 'buttonGroup'){
			const color = selectedElement.getAttribute('buttonGroupColor')
			const size = selectedElement.getAttribute('buttonGroupSize')

			console.log('my color',color)
			console.log('my size', size)
			const childBtns = Array.from(selectedElement.getChildren())
			childBtns.forEach(btn=>{
				console.log('button', btn)
				btn._setAttribute('linkButtonColor', color)
				btn._setAttribute('linkButtonSize', size)
			})

		}

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
 *   Whether or not `element` is a button group element.
 */
function isButtonGroupElement(element) {
	return element && element.name === 'buttonGroup';
}
