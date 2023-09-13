/**
 * @file defines schemas, converters, and commands for the icon plugin.
 * 
 * @typedef { import('./cuiconextrasconfig').SelectableOption } SelectableOption
 * @typedef { import('@types/ckeditor__ckeditor5-engine').DowncastWriter } DowncastWriter
 * @typedef { import('@types/ckeditor__ckeditor5-engine/src/model/element').default } ModelElement
 * @typedef { import('@types/ckeditor__ckeditor5-engine/src/view/containerelement').default } ContainerElement
 */

import { Plugin } from 'ckeditor5/src/core';
import { Widget } from 'ckeditor5/src/widget';
import ModifyIconCommand from './modifyiconcommand';
import { colorOptions, colorDefault, backgroundStyleDefault, backgroundStyleOptions } from './cuiconextrasconfig';

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
export default class CUIconExtrasEditing extends Plugin {
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

		schema.extend('icon', {
			allowAttributes: ['iconCUColor', 'iconCUBackgroundStyle']
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
		conversion.attributeToAttribute(buildAttributeToAttributeDefinition('iconCUColor', colorOptions));
		conversion.attributeToAttribute(buildAttributeToAttributeDefinition('iconCUBackgroundStyle', backgroundStyleOptions));
	}

	/**
	 * Defines the commands for inserting or modifying the icon.
	 */
	_defineCommands() {
		const commands = this.editor.commands;
		commands.add('changeIconCUColor', new ModifyIconCommand(this.editor, 'iconCUColor', colorDefault));
		commands.add('changeIconCUBackgroundStyle', new ModifyIconCommand(this.editor, 'iconCUBackgroundStyle', backgroundStyleDefault));
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
	const view = {}, values = [];
	for (const [value, option] of Object.entries(attributeOptions)) {
		if (!option.className) continue;
		values.push(value);
		view[value] = { key: 'class', value: option.className };
	}
	return {
		model: {
			key: attributeName,
			values: values
		},
		view
	};
}
