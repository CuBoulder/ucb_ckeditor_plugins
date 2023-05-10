/**
 * @file defines InsertMapCommand, which is executed when the map toolbar button is pressed.
 * 
 * @typedef { import('@types/ckeditor__ckeditor5-engine').Element } Element
 * @typedef { import('@types/ckeditor__ckeditor5-engine/src/model/writer').default } Writer
 */

import { sizeDefault } from './mapconfig';
import { Command } from 'ckeditor5/src/core';
import {getSelectedMapWidget } from './maputils';

export default class InsertMapCommand extends Command {
	/**
	 * @inheritdoc
	 */
	execute(options = { value: '', size: sizeDefault }) {
		const { model } = this.editor;

		model.change((writer) => {
			// Insert <campusMap>*</campusMap> at the current selection position
			// in a way that will result in creating a valid model structure.
			model.insertContent(createCampusMap(writer, options.size));
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
	}
}

/**
 * @param {Writer} writer
 *   The writer used to create and append elements.
 * @param {string} size
 *   The value of the size attribute of the map.
 * @returns {Element}
 *   The map element with all required child elements to match the map schema.
 */
function createCampusMap(writer, size) {
	const map = writer.createElement('campusMap', { 'mapSize': size });
	return map;
}
