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
		const value = options.value.trim(), model = this.editor.model;

		if (!value) return;
		const location = campusMapURLToLocation(value); // Converts the user-supplied URL to a location for a campus map
		if (!location) return;

		model.change((writer) => {
			// Insert <campusMap>*</campusMap> at the current selection position
			// in a way that will result in creating a valid model structure.
			model.insertContent(createCampusMap(writer, location, options.size));
		});
	}

	/**
	 * @inheritdoc
	 */
	refresh() {
		const { model } = this.editor;
		const { selection } = model.document;

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

		// Adds a helpful attribute to know if an existing map is currently selected.
		this.existingMapSelected = isMapElement(selection.getSelectedElement());
	}
}

/**
 * @param {Writer} writer
 *   The writer used to create and append elements.
 * @param {string} mapLocation
 *   The value of the location attribute of the map.
 * @param {string} mapSize
 *   The value of the size attribute of the map.
 * @returns {Element}
 *   The map element with all required child elements to match the map schema.
 */
function createCampusMap(writer, mapLocation, mapSize) {
	const map = writer.createElement('campusMap', { mapLocation, mapSize });
	return map;
}


/**
 * @param {Element | null} element 
 * @returns {boolean}
 *   Whether or not `element` is a map element.
 */
function isMapElement(element) {
	return element && element.name === 'campusMap';
}
