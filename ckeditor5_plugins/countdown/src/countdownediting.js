/**
 * @file defines schemas, converters, and commands for the countdown plugin.
 * 
 * @typedef { import('@ckeditor/ckeditor5-engine').DowncastWriter } DowncastWriter
 * @typedef { import('@ckeditor/ckeditor5-engine/src/view/containerelement').default } ContainerElement
 */

import { Plugin } from 'ckeditor5/src/core';
import CountdownCommand from './insertcountdowncommand';
import { Widget, toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { styleOptions, backgroundOptions } from './countdownconfig';


export default class CountdownEditing extends Plugin {
	static get requires() {
		return [Widget];
	}

	init() {
		this._defineSchema();
		this._defineConverters();
		this.editor.commands.add('addCountdown', new CountdownCommand(this.editor));
	}

	// Schemas are registered via the central `editor` object.
	_defineSchema() {
		const schema = this.editor.model.schema;
		schema.register('cuCountdown', {
			allowWhere: '$text',
			isObject: true,
			isInline: true,
			allowAttributes: ['cuCountdownBackground', 'cuCountdownStyle', 'cuCountdownDate']
		});
	}

	/**
	 * Converters determine how CKEditor 5 models are converted into markup and
	 * vice-versa.
	 */
	_defineConverters() {
		// Converters are registered via the central editor object.
		const { conversion } = this.editor;

		// Attributes convertable to/from a class name need no separate upcast and downcast definitions
		conversion.attributeToAttribute(buildAttributeToAttributeDefinition('cuCountdownBackground', backgroundOptions));
		conversion.attributeToAttribute(buildAttributeToAttributeDefinition('cuCountdownStyle', styleOptions));

		// Element upcasts
		conversion.for('upcast').elementToElement({
			model: 'cuCountdown',
			view: {
				name: 'span',
				classes: 'cu-countdown'
			}
		});

		// Element downcasts – elements become widgets in the editor via `editingDowncast`
		conversion.for('dataDowncast').elementToElement({
			model: 'cuCountdown',
			view: {
				name: 'span',
				classes: 'cu-countdown'
			}
		});
		conversion.for('editingDowncast').elementToElement({
			model: 'cuCountdown',
			view: (modelElement, { writer }) =>
				toWidget(
					writer.createContainerElement('span', { class: 'cu-countdown'}),
					writer, { label: 'Countdown Widget' }
				)
		});
	}
}

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
