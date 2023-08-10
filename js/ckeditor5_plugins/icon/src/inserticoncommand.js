/**
 * @file defines InsertIconCommand, which is executed when the icon toolbar button is pressed.
 * 
 * @typedef { import('@types/ckeditor__ckeditor5-engine').Element } Element
 * @typedef { import('@types/ckeditor__ckeditor5-engine/src/model/writer').default } Writer
 */

import { sizeDefault, alignmentDefault, colorDefault, styleDefault } from './iconconfig';
import { Command } from 'ckeditor5/src/core';

export default class InsertIconCommand extends Command {
	/**
	 * @inheritdoc
	 */
	execute() {
		const { model } = this.editor;

		model.change((writer) => {
			// Insert <icon></icon> at the current selection position
			// in a way that will result in creating a valid model structure.
			const iconElement = writer.createElement('icon', { 'iconSize': sizeDefault, 'iconAlignment': alignmentDefault, 'iconColor': colorDefault, 'iconStyle': styleDefault });
			model.insertContent(iconElement);
			writer.setSelection(iconElement, 'on');
		});
	}

	/**
	 * @inheritdoc
	 */
	refresh() {
		const { model } = this.editor;
		const { selection } = model.document;

		// Determine if the cursor (selection) is in a position where adding a
		// icon is permitted. This is based on the schema of the model(s)
		// currently containing the cursor.
		const allowedIn = model.schema.findAllowedParent(
			selection.getFirstPosition(),
			'icon'
		);

		// If the cursor is not in a location where a icon can be added, return
		// null so the addition doesn't happen.
		this.isEnabled = allowedIn !== null;
	}
}
