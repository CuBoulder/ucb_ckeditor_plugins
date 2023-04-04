/**
 * @file defines schemas, converters, and commands for the box plugin.
 * 
 * @typedef { import('./boxconfig').SelectableOption } SelectableOption
 */

import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertBoxCommand from './insertboxcommand';
import { enablePlaceholder } from 'ckeditor5/src/engine';
import ModifyBoxCommand from './modifyboxcommand';
import ThemeBoxCommand from './themeboxcommand';
import { alignmentOptions, alignmentDefault, styleOptions, styleDefault, themeOptions, themeDefault } from './boxconfig';

// cSpell:ignore box insertboxcommand

/**
 * CKEditor 5 plugins do not work directly with the DOM. They are defined as
 * plugin-specific data models that are then converted to markup that
 * is inserted in the DOM.
 *
 * CKEditor 5 internally interacts with box as this model:
 * <box>
 *    <boxTitle></boxTitle>
 *    <boxDescription></boxDescription>
 * </box>
 *
 * Which is converted for the browser/user as this markup
 * <div class="ucb-box">
 *   <div class="ucb-box-title"></div>
 *   <div class="ucb-box-description"></div>
 * </div>
 *
 * This file has the logic for defining the box model, and for how it is
 * converted to standard DOM markup.
 */
export default class BoxEditing extends Plugin {
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
	 * <box>
	 *    <boxTitle></boxTitle>
	 *    <boxDescription></boxDescription>
	 * </box>
	 *
	 * The logic in _defineConverters() will determine how this is converted to
	 * markup.
	 */
	_defineSchema() {
		// Schemas are registered via the central `editor` object.
		const schema = this.editor.model.schema;

		schema.register('box', {
			// Behaves like a self-contained object (e.g. an image).
			isObject: true,
			// Allow in places where other blocks are allowed (e.g. directly in the root).
			allowWhere: '$block',
			// Allow the attributes which control the box's alignment, style, and theme.
			allowAttributes: ['boxAlignment', 'boxStyle', 'boxTheme']
		});

		schema.register('boxInner', {
			isLimit: true,
			allowIn: 'box'
		});

		schema.register('boxTitle', {
			// This creates a boundary for external actions such as clicking and
			// and keypress. For example, when the cursor is inside this box, the
			// keyboard shortcut for "select all" will be limited to the contents of
			// the box.
			isLimit: true,
			// This is only to be used within box.
			allowIn: 'boxInner',
			// Allow content that is allowed in blocks (e.g. text with attributes).
			allowContentOf: '$block',
		});

		schema.register('boxDescription', {
			isLimit: true,
			allowIn: 'boxInner',
			allowContentOf: '$root',
		});

		schema.addChildCheck((context, childDefinition) => {
			// Disallow box inside boxDescription.
			if (
				context.endsWith('boxDescription') &&
				childDefinition.name === 'box'
			) {
				return false;
			}
		});
	}

	/**
	 * Converters determine how CKEditor 5 models are converted into markup and
	 * vice-versa.
	 */
	_defineConverters() {
		// Converters are registered via the central editor object.
		const { conversion, editing } = this.editor;

		// The alignment, style, and color attributes all convert to element class names.
		conversion.attributeToAttribute(buildAttributeToAttributeDefinition('boxAlignment', alignmentOptions));
		conversion.attributeToAttribute(buildAttributeToAttributeDefinition('boxStyle', styleOptions));
		conversion.attributeToAttribute(buildAttributeToAttributeDefinition('boxTheme', themeOptions));

		conversion.for('upcast').elementToElement({
			model: 'boxContainer',
			view: {
				name: 'div',
				classes: 'ucb-box-container'
			}
		});

		// Upcast Converters: determine how existing HTML is interpreted by the
		// editor. These trigger when an editor instance loads.
		//
		// If <div class="ucb-box"> is present in the existing markup
		// processed by CKEditor, then CKEditor recognizes and loads it as a
		// <box> model.
		conversion.for('upcast').elementToElement({
			model: 'box',
			view: {
				name: 'div',
				classes: 'ucb-box'
			}
		});

		// If <div class="ucb-box-inner"> is present in the existing markup
		// processed by CKEditor, then CKEditor recognizes and loads it as a
		// <boxInner> model, provided it is a child element of <box>,
		// as required by the schema.
		conversion.for('upcast').elementToElement({
			model: 'boxInner',
			view: {
				name: 'div',
				classes: 'ucb-box-inner'
			}
		});

		// If <div class="ucb-box-title"> is present in the existing markup
		// processed by CKEditor, then CKEditor recognizes and loads it as a
		// <boxTitle> model, provided it is a child element of <box>,
		// as required by the schema.
		conversion.for('upcast').elementToElement({
			model: 'boxTitle',
			view: {
				name: 'div',
				classes: 'ucb-box-title'
			}
		});

		// If <div class="ucb-box-description"> is present in the existing markup
		// processed by CKEditor, then CKEditor recognizes and loads it as a
		// <boxDescription> model, provided it is a child element of
		// <box>, as required by the schema.
		conversion.for('upcast').elementToElement({
			model: 'boxDescription',
			view: {
				name: 'div',
				classes: 'ucb-box-description'
			}
		});

		conversion.for('downcast').elementToElement({
			model: 'boxContainer',
			view: {
				name: 'div',
				classes: 'ucb-box-container'
			}
		});

		// Data Downcast Converters: converts stored model data into HTML.
		// These trigger when content is saved.
		//
		// Instances of <box> are saved as
		// <div class="ucb-box">{{inner content}}</section>.
		conversion.for('dataDowncast').elementToElement({
			model: 'box',
			view: (modelElement, { writer: viewWriter }) => createBoxView(modelElement, viewWriter)
		});

		// Instances of <boxInner> are saved as
		// <div class="ucb-box-inner">{{inner content}}</div>.
		conversion.for('dataDowncast').elementToElement({
			model: 'boxInner',
			view: {
				name: 'div',
				classes: 'ucb-box-inner'
			}
		});

		// Instances of <boxTitle> are saved as
		// <div class="ucb-box-title">{{inner content}}</div>.
		conversion.for('dataDowncast').elementToElement({
			model: 'boxTitle',
			view: {
				name: 'div',
				classes: 'ucb-box-title'
			}
		});

		// Instances of <boxDescription> are saved as
		// <div class="ucb-box-description">{{inner content}}</div>.
		conversion.for('dataDowncast').elementToElement({
			model: 'boxDescription',
			view: {
				name: 'div',
				classes: 'ucb-box-description'
			}
		});

		// Editing Downcast Converters. These render the content to the user for
		// editing, i.e. this determines what gets seen in the editor. These trigger
		// after the Data Upcast Converters, and are re-triggered any time there
		// are changes to any of the models' properties.
		//
		// Convert the <box> model into a container widget in the editor UI.
		conversion.for('editingDowncast').elementToElement({
			model: 'box',
			view: (modelElement, { writer: viewWriter }) => createBoxView(modelElement, viewWriter, true)
		});

		// Convert the <boxTitle> model into a container <div>.
		conversion.for('editingDowncast').elementToElement({
			model: 'boxInner',
			view: (modelElement, { writer: viewWriter }) => viewWriter.createContainerElement('div', { class: 'ucb-box-inner' })
		});

		// Convert the <boxTitle> model into an editable <div> widget.
		conversion.for('editingDowncast').elementToElement({
			model: 'boxTitle',
			view: (modelElement, { writer: viewWriter }) => {
				const div = viewWriter.createEditableElement('div', {
					class: 'ucb-box-title'
				});
				enablePlaceholder({
					view: editing.view,
					element: div,
					text: 'Title (Optional)'
				});
				return toWidgetEditable(div, viewWriter);
			}
		});

		// Convert the <boxDescription> model into an editable <div> widget.
		conversion.for('editingDowncast').elementToElement({
			model: 'boxDescription',
			view: (modelElement, { writer: viewWriter }) => {
				const div = viewWriter.createEditableElement('div', {
					class: 'ucb-box-description',
				});
				return toWidgetEditable(div, viewWriter);
			}
		});
	}

	/**
	 * Defines the commands for inserting or modifying the box.
	 */
	_defineCommands() {
		const commands = this.editor.commands;
		commands.add('insertBox', new InsertBoxCommand(this.editor));
		commands.add('alignBox', new ModifyBoxCommand(this.editor, 'boxAlignment', alignmentDefault));
		commands.add('styleBox', new ModifyBoxCommand(this.editor, 'boxStyle', styleDefault));
		commands.add('themeBox', new ThemeBoxCommand(this.editor, 'boxTheme', themeDefault));
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
		view[name] = { key: 'class', value: option.className }
	return {
		model: {
			key: attributeName,
			values: Object.keys(attributeOptions)
		},
		view
	};
}

function createBoxView(modelElement, viewWriter, widget = false) {
	const div = viewWriter.createContainerElement('div', { class: 'ucb-box' });
	return widget ? toWidget(div, viewWriter, { label: 'box widget' }) : div;
}
