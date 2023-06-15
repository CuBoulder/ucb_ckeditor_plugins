/**
 * @file defines schemas, converters, and commands for the button plugin.
 * 
 * @typedef { import('@types/ckeditor__ckeditor5-engine').DowncastWriter } DowncastWriter
 * @typedef { import('@types/ckeditor__ckeditor5-engine/src/view/containerelement').default } ContainerElement
 */

import { Plugin } from 'ckeditor5/src/core';
import ButtonCommand from './insertbuttoncommand';
import { Widget, toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { sizeOptions, styleOptions, colorOptions } from './buttonconfig';

export default class ButtonEditing extends Plugin {
	static get requires() {
		return [Widget];
	}

	init() {
		this._defineSchema();
		this._defineConverters();
		this.editor.commands.add('addButton', new ButtonCommand(this.editor));
	}

	// Schemas are registered via the central `editor` object.
	_defineSchema() {
		const schema = this.editor.model.schema;
		schema.register('linkButton', {
			allowWhere: '$text',
			allowContentOf: '$block',
			isObject: true,
			isInline: true,
			allowAttributes: ['linkButtonColor', 'linkButtonStyle', 'linkButtonSize', 'linkButtonHref']
		});
	}

	/**
	 * Converters determine how CKEditor 5 models are converted into markup and
	 * vice-versa.
	 */
	_defineConverters() {
		// Converters are registered via the central editor object.
		const { conversion } = this.editor;

		conversion.attributeToAttribute(buildAttributeToAttributeDefinition('linkButtonColor', colorOptions));
		conversion.attributeToAttribute(buildAttributeToAttributeDefinition('linkButtonStyle', styleOptions));
		conversion.attributeToAttribute(buildAttributeToAttributeDefinition('linkButtonSize', sizeOptions));

		conversion.for('upcast').add(dispatcher => {
			// A custom upcast prevents the CKEditor 5 Link plugin from overriding via its `linkHref` attribute `$text` element.
			dispatcher.on('element:a', (evt, data, conversionApi) => {
				if (conversionApi.consumable.consume(data.viewItem, { name: true, classes: 'ucb-link-button', attributes: ['href'] })) {
					const linkButton = conversionApi.writer.createElement('linkButton', { linkButtonHref: data.viewItem.getAttribute('href') });
					// Forces insertion and conversion of a clean `linkButton` element.
					if (!conversionApi.safeInsert(linkButton, data.modelCursor))
						return;
					conversionApi.convertChildren(data.viewItem, linkButton);
					conversionApi.updateConversionResult(linkButton, data); // Omitting this line causes strange issues (trust me).
				}
			});
		});

		conversion.for('downcast').attributeToAttribute({ model: 'linkButtonHref', view: 'href' });

		conversion.for('dataDowncast').elementToElement({
			model: 'linkButton',
			view: (modelElement, { writer: viewWriter }) => createLinkButtonView(viewWriter)
		});

		conversion.for('editingDowncast').elementToElement({
			model: 'linkButton',
			view: (modelElement, { writer: viewWriter }) => createLinkButtonView(viewWriter, true)
		});
	}
}

/**
 * @param {DowncastWriter} downcastWriter
 *   The downcast writer.
 * @param {boolean} [widget=false]
 *   Whether or not to return a widget for editing. Defaults to `false`.
 * @returns {ContainerElement}
 *   The Link Button element or widget.
 */
 function createLinkButtonView(downcastWriter, widget = false) {
	if (widget)
		return toWidget(
			downcastWriter.createContainerElement('a', { class: 'ucb-link-button', onclick: 'event.preventDefault()' }, { renderUnsafeAttributes: ['onclick'] }),
			downcastWriter,
			{ label: 'button widget' });
	return downcastWriter.createContainerElement('a', { class: 'ucb-link-button' });
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
