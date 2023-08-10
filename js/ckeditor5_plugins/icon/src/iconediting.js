/**
 * @file defines schemas, converters, and commands for the icon plugin.
 * 
 * @typedef { import('./iconconfig').SelectableOption } SelectableOption
 * @typedef { import('@types/ckeditor__ckeditor5-engine').DowncastWriter } DowncastWriter
 * @typedef { import('@types/ckeditor__ckeditor5-engine/src/view/containerelement').default } ContainerElement
 */

import { Plugin } from 'ckeditor5/src/core';
import { toWidget } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertIconCommand from './inserticoncommand';
import ModifyIconCommand from './modifyiconcommand';
import { sizeOptions, sizeDefault, alignmentOptions, alignmentDefault, colorOptions, colorDefault, styleOptions, styleDefault } from './iconconfig';

// cSpell:ignore icon inserticoncommand

/**
 * CKEditor 5 plugins do not work directly with the DOM. They are defined as
 * plugin-specific data models that are then converted to markup that
 * is inserted in the DOM.
 *
 * CKEditor 5 internally interacts with icon as this model:
 * <icon></icon>
 *
 * Which is converted for the browser/user as this markup
 * <i class="ucb-icon"></i>
 *
 * This file has the logic for defining the icon model, and for how it is
 * converted to standard DOM markup.
 */
export default class IconEditing extends Plugin {
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
	 * <icon></icon>
	 *
	 * The logic in _defineConverters() will determine how this is converted to
	 * markup.
	 */
	_defineSchema() {
		// Schemas are registered via the central `editor` object.
		const schema = this.editor.model.schema;

		schema.register('icon', {
			// Behaves like a self-contained object (e.g. an image).
			isObject: true,
			// Allows placement of the object to be inline with text.
			isInline: true,
			// Allows an icon to be inserted wherever text is allowed (including another container such as a button).
			allowWhere: '$text',
			// Allow the attributes which control the icon's size, alignment, color, and style.
			allowAttributes: ['iconSize', 'iconAlignment', 'iconColor', 'iconStyle']
		});
	}

	/**
	 * Converters determine how CKEditor 5 models are converted into markup and
	 * vice-versa.
	 */
	_defineConverters() {
		// Converters are registered via the central editor object.
		const { conversion } = this.editor;

		// The size, alignment, color, and style attributes all convert to element class names.
		conversion.attributeToAttribute(buildAttributeToAttributeDefinition('iconSize', sizeOptions));
		conversion.attributeToAttribute(buildAttributeToAttributeDefinition('iconAlignment', alignmentOptions));
		conversion.attributeToAttribute(buildAttributeToAttributeDefinition('iconColor', colorOptions));
		conversion.attributeToAttribute(buildAttributeToAttributeDefinition('iconStyle', styleOptions));

		// Upcast Converters: determine how existing HTML is interpreted by the
		// editor. These trigger when an editor instance loads.
		//
		// If <i class="ucb-icon"> is present in the existing markup
		// processed by CKEditor, then CKEditor recognizes and loads it as a
		// <icon> model.
		conversion.for('upcast').elementToElement({
			model: 'icon',
			view: {
				name: 'i',
				classes: 'ucb-icon'
			}
		});

		// Data Downcast Converters: converts stored model data into HTML.
		// These trigger when content is saved.
		//
		// Instances of <icon> are saved as
		// <i class="ucb-icon"></section>.
		conversion.for('dataDowncast').elementToElement({
			model: 'icon',
			view: (modelElement, { writer: viewWriter }) => createIconView(viewWriter)
		});

		// Editing Downcast Converters. These render the content to the user for
		// editing, i.e. this determines what gets seen in the editor. These trigger
		// after the Data Upcast Converters, and are re-triggered any time there
		// are changes to any of the models' properties.
		//
		// Convert the <icon> model into a container widget in the editor UI.
		conversion.for('editingDowncast').elementToElement({
			model: 'icon',
			view: (modelElement, { writer: viewWriter }) => createIconView(viewWriter, true)
		});
	}

	/**
	 * Defines the commands for inserting or modifying the icon.
	 */
	_defineCommands() {
		const commands = this.editor.commands;
		commands.add('insertIcon', new InsertIconCommand(this.editor));
		commands.add('sizeIcon', new ModifyIconCommand(this.editor, 'iconSize', sizeDefault));
		commands.add('alignIcon', new ModifyIconCommand(this.editor, 'iconAlignment', alignmentDefault));
		commands.add('colorIcon', new ModifyIconCommand(this.editor, 'iconColor', colorDefault));
		commands.add('styleIcon', new ModifyIconCommand(this.editor, 'iconStyle', styleDefault));
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
 *   The icon container element or widget.
 */
function createIconView(viewWriter, widget = false) {
	const i = viewWriter.createContainerElement('i', { class: 'ucb-icon' });
	return widget ? toWidget(i, viewWriter, { label: 'icon widget' }) : i;
}
