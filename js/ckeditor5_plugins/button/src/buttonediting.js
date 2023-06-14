/**
 * @file defines schemas, converters, and commands for the button plugin.
 * 
 * @typedef { import('@types/ckeditor__ckeditor5-engine/src/conversion/downcastdispatcher').default } DowncastDispatcher
 * @typedef { import('@types/ckeditor__ckeditor5-engine/src/view/containerelement').default } ContainerElement
 */

import { Plugin } from 'ckeditor5/src/core';
import ButtonCommand from './insertbuttoncommand';
import { Widget, toWidget } from 'ckeditor5/src/widget';
import { sizeOptions, styleOptions, colorOptions, defaultColor, defaultStyle, defaultSize } from './buttonconfig';

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
			allowWhere: '$block',
			allowContentOf: '$block',
			isObject: true,
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

		/*
		If <div class="ucb-button"> is present in the existing markup,
		 processed by CKEditor, then CKEditor recognizes and loads it as a
			<ucb-button> model.  
		*/

		conversion.for('upcast').add(dispatcher => {
			// A converter for links (<a>).
			dispatcher.on('element:a', (evt, data, conversionApi) => {
				if (data.viewItem.hasClass('ucb-link-button') && conversionApi.consumable.consume(data.viewItem, { name: true, attributes: ['href'] })) {
					// The <a> element is inline and is represented by an attribute in the model.
					// This is why you need to convert only children.
					const { modelRange } = conversionApi.convertChildren(data.viewItem, data.modelCursor);

					for (let item of modelRange.getItems()) {
						if (conversionApi.schema.checkAttribute(item, 'linkHref') && item.parent.is('element'))
							conversionApi.writer.setAttribute('linkButtonHref', data.viewItem.getAttribute('href'), item.parent);
					}
				}
			});
		});

		conversion.for('upcast').elementToElement({
			model: 'linkButton',
			view: {
				name: 'span',
				classes: 'ucb-link-button-wrapper'
			},
			model: (viewElement, { writer: modelWriter }) => {
				const modelElement = modelWriter.createElement('linkButton');

				const color = viewElement.getAttribute('linkButtonColor');
				if (color) {
					modelWriter.setAttribute('linkButtonColor', color, modelElement);
				}

				const style = viewElement.getAttribute('linkButtonStyle');
				if (style) {
					modelWriter.setAttribute('linkButtonStyle', style, modelElement);
				}

				const size = viewElement.getAttribute('linkButtonSize');
				if (size) {
					modelWriter.setAttribute('linkButtonSize', size, modelElement);
				}

				return modelElement;
			}
		});

		conversion.for('dataDowncast').add(dispatcher => addDowncastResponder(dispatcher));
		conversion.for('editingDowncast').add(dispatcher => addDowncastResponder(dispatcher, true));
	}
}

/**
 * @param {DowncastDispatcher} dispatcher
 *   The downcast writer.
 * @param {boolean} [widget=false]
 *   Whether or not to return a widget for editing. Defaults to `false`.
 */
function addDowncastResponder(dispatcher, widget = false) {
	dispatcher.on('insert:linkButton', (evt, data, conversionApi) => {
		const { consumable, mapper, writer } = conversionApi;

		// Remember to check whether the change has not been consumed yet and consume it.
		if (!consumable.consume(data.item, 'insert')) {
			return;
		}

		// Translate the position in the model to a position in the view.
		const viewPosition = mapper.toViewPosition(data.range.start);

		// Create the elements that will be inserted into the view at the `viewPosition`.
		const
			a = writer.createContainerElement('a', { class: 'ucb-link-button', href: data.item.getAttribute('linkButtonHref') }, { renderUnsafeAttributes: ['onclick'] }),
			span = writer.createContainerElement('span', { class: 'ucb-link-button-wrapper' }, [a]);

		if (widget)
			writer.setAttribute('onclick', 'event.preventDefault()', a);

		// Bind the newly created view element to the model element so positions will map accordingly in the future.
		mapper.bindElements(data.item, a);

		// Add the newly created view element to the view.
		writer.insert(viewPosition, widget ? toWidget(a, writer, { label: 'button widget' }) : span);
	});
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
