/**
 * @file defines InsertMapCommand, which is executed when the map toolbar button is pressed.
 * 
 * @typedef { import('@types/ckeditor__ckeditor5-engine').Element } Element
 * @typedef { import('@types/ckeditor__ckeditor5-engine/src/model/writer').default } Writer
 */

import { Command } from 'ckeditor5/src/core';
import { sizeDefault } from './mapconfig';
import { campusMapURLToLocation } from './maputils';

export default class InsertMapCommand extends Command {
	/**
	 * Creates a new InsertMapCommand.
	 * 
	 * @param {Editor} editor 
	 *   The editor.
	 */
	constructor(editor) {
		super(editor);
		this.set('existingMapSelected', false);
	}

	/**
	 * @inheritdoc
	 */
	execute(options = { value: '', size: sizeDefault }) {
		const value = options.value.trim(), model = this.editor.model, mapSize = options.size;

		if (!value) return;
		const mapLocation = campusMapURLToLocation(value); // Converts the user-supplied URL to a location for a campus map
		if (!mapLocation) return;

		model.change((writer) => {
			// Insert <campusMap>*</campusMap> at the current selection position
			// in a way that will result in creating a valid model structure.
			model.insertContent(writer.createElement('campusMap', { mapLocation, mapSize }));
		});
	}

	/**
	 * @inheritdoc
	 */
	refresh() {
		const { model } = this.editor;
		const { selection } = model.document;
		const selectedElement = selection.getSelectedElement();

		// Determine if the cursor (selection) is in a position where adding a
		// map is permitted. This is based on the schema of the model(s)
		// currently containing the cursor.
		const campusMapAllowedIn = model.schema.findAllowedParent(
			selection.getFirstPosition(),
			'campusMap'
		);

		// If the cursor is not in a location where a map can be added, return
		// null so the addition doesn't happen.
		this.isEnabled = campusMapAllowedIn !== null;

		// Adds a helpful attribute to get an existing selected map element.
		this.existingMapSelected = isMapElement(selectedElement) ? selectedElement : null;
	}
}

/**
 * @param {Element | null} element 
 * @returns {boolean}
 *   Whether or not `element` is a map element.
 */
function isMapElement(element) {
	return element && element.name === 'campusMap';
}
