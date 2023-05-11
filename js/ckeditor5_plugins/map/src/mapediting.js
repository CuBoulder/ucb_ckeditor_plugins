/**
 * @file defines schemas, converters, and commands for the map plugin.
 * 
 * @typedef { import('./mapconfig').SelectableOption } SelectableOption
 * @typedef { import('@types/ckeditor__ckeditor5-engine').DowncastWriter } DowncastWriter
 * @typedef { import('@types/ckeditor__ckeditor5-engine/src/view/containerelement').default } ContainerElement
 */

import { Plugin } from 'ckeditor5/src/core';
import { toWidget } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import { sizeOptions } from './mapconfig';
import InsertMapCommand from './insertmapcommand';

// cSpell:ignore map insertmapcommand

/**
 * CKEditor 5 plugins do not work directly with the DOM. They are defined as
 * plugin-specific data models that are then converted to markup that
 * is inserted in the DOM.
 *
 * CKEditor 5 internally interacts with map as this model:
 * <campusMap>
 * </campusMap>
 *
 * Which is converted for the browser/user as this markup
 * <div class="ucb-map ucb-campus-map">
 * </div>
 *
 * This file has the logic for defining the map model, and for how it is
 * converted to standard DOM markup.
 */
export default class MapEditing extends Plugin {
	/**
	 * @inheritdoc
	 */
	static get requires() {
		return [Widget];
	}

	/**
	 * @inheritdoc
	 */
	init() {
		this._defineSchema();
		this._defineConverters();
		this._defineCommands();
	}

	/*
	 * This registers the structure that will be seen by CKEditor 5 as
	 * <campusMap>
	 * </campusMap>
	 *
	 * The logic in _defineConverters() will determine how this is converted to
	 * markup.
	 */
	_defineSchema() {
		// Schemas are registered via the central `editor` object.
		const schema = this.editor.model.schema;

		schema.register('campusMap', {
			// Behaves like a self-contained object (e.g. an image).
			isObject: true,
			// Allow in places where other blocks are allowed (e.g. directly in the root).
			allowWhere: '$block',
			// Allow the attributes which control the map's alignment, style, and theme.
			allowAttributes: ['mapLocation', 'mapSize']
		});
	}

	/**
	 * Converters determine how CKEditor 5 models are converted into markup and
	 * vice-versa.
	 */
	_defineConverters() {
		// Converters are registered via the central editor object.
		const conversion = this.editor.conversion;

		// Specifies the location attribute for campus maps.
		conversion.for('upcast').attributeToAttribute({
			model: 'mapLocation',
			view: {
				key: 'data-map-location',
				value: /\d+/
			}
		});
		conversion.for('downcast').attributeToAttribute({
			model: 'mapLocation',
			view: 'data-map-location'
		});

		// The size attribute converts to element class names.
		conversion.attributeToAttribute(buildAttributeToAttributeDefinition('mapSize', sizeOptions));

		// Upcast Converters: determine how existing HTML is interpreted by the
		// editor. These trigger when an editor instance loads.
		//
		// If <div class="ucb-map ucb-campus-map"> is present in the existing markup
		// processed by CKEditor, then CKEditor recognizes and loads it as a
		// <campusMap> model.
		conversion.for('upcast').elementToElement({
			model: 'campusMap',
			view: {
				name: 'div',
				classes: ['ucb-map', 'ucb-campus-map']
			}
		});

		// Data Downcast Converters: converts stored model data into HTML.
		// These trigger when content is saved.
		//
		// Instances of <campusMap> are saved as
		// <div class="ucb-map ucb-campus-map">{{inner content}}</section>.
		conversion.for('dataDowncast').elementToElement({
			model: 'campusMap',
			view: (modelElement, { writer: viewWriter }) => createCampusMapView(viewWriter)
		});

		// Editing Downcast Converters. These render the content to the user for
		// editing, i.e. this determines what gets seen in the editor. These trigger
		// after the Data Upcast Converters, and are re-triggered any time there
		// are changes to any of the models' properties.
		//
		// Convert the <campusMap> model into a container widget in the editor UI.
		conversion.for('editingDowncast').elementToElement({
			model: 'campusMap',
			view: (modelElement, { writer: viewWriter }) => createCampusMapView(viewWriter, true)
		});
	}

	/**
	 * Defines the commands for inserting or modifying the map.
	 */
	_defineCommands() {
		const commands = this.editor.commands;
		commands.add('insertMap', new InsertMapCommand(this.editor));
	}
}

/**
 * @param {string} attributeName 
 *   The attribute name.
 * @param {Object<string, SelectableOption>} attributeOptions
 *   The options avaliable for the attribute.
 * @returns 
 *   The attribute to attribute definition of the specified attribute.
 */
function buildAttributeToAttributeDefinition(attributeName, attributeOptions) {
	const view = {};
	for (const [name, option] of Object.entries(attributeOptions))
		view[name] = { key: 'class', value: option.className };
	return {
		model: {
			key: attributeName,
			values: Object.keys(attributeOptions)
		},
		view
	};
}

/**
 * @param {DowncastWriter} viewWriter
 *   The downcast writer.
 * @param {boolean} [widget=false]
 *   Whether or not to return a widget for editing. Defaults to `false`.
 * @returns {ContainerElement}
 *   The map container element or widget.
 */
function createCampusMapView(viewWriter, widget = false) {
	const div = viewWriter.createContainerElement('div', { class: 'ucb-map ucb-campus-map' });
	return widget ? toWidget(div, viewWriter, { label: 'map widget' }) : div;
}
