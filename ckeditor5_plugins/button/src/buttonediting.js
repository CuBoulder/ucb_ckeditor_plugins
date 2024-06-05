/**
 * @file defines schemas, converters, and commands for the button plugin.
 * 
 * @typedef { import('@ckeditor/ckeditor5-engine').DowncastWriter } DowncastWriter
 * @typedef { import('@ckeditor/ckeditor5-engine/src/view/containerelement').default } ContainerElement
 */

import { Plugin } from 'ckeditor5/src/core';
import ButtonCommand from './insertbuttoncommand';
import { Widget, toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { sizeOptions, styleOptions, colorOptions } from './buttonconfig';

/*
 * The Link Button is based on a specific schema defined in this file.
 * 
 * Model (for the plugin's internal use only):
 * <linkButton linkButtonColor="blue|black|gray|white|gold" linkButtonStyle="default|full" linkButtonSize="large|regular|small" linkButtonHref="{ ... }">
 *    <linkButtonContents>
 *       { contents of: $block }
 *    </linkButtonContents>
 * </linkButton>
 * 
 * View (the saved and interpreted plain HTML):
 * <a class="ucb-link-button ucb-link-button-(blue|black|gray|white|gold) ucb-link-button-(default|full) ucb-link-button-(large|regular|small)" href="{ ... }">
 *    <span class="ucb-link-button-contents">
 *       { contents }
 *    </span>
 * </a>
 */
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
      isObject: true,
      isInline: true,
      allowAttributes: ['linkButtonColor', 'linkButtonStyle', 'linkButtonSize', 'linkButtonHref']
    });
    schema.register('linkButtonContents', {
      isLimit: true,
      allowIn: 'linkButton',
      allowContentOf: '$block'
    });
    schema.addChildCheck((context, childDefinition) => {
      // Disallows adding a linkButton inside linkButtonContents.
      if (context.endsWith('linkButtonContents') && childDefinition.name === 'linkButton')
        return false;
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
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('linkButtonColor', colorOptions));
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('linkButtonStyle', styleOptions));
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('linkButtonSize', sizeOptions));

    // Element upcasts
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
    conversion.for('upcast').elementToElement({
      model: 'linkButtonContents',
      view: {
        name: 'span',
        classes: 'ucb-link-button-contents'
      }
    });

    // Attribute downcasts
    conversion.for('downcast').attributeToAttribute({ model: 'linkButtonHref', view: 'href' });

    // Element downcasts – elements become widgets in the editor via `editingDowncast`
    conversion.for('dataDowncast').elementToElement({
      model: 'linkButton',
      view: {
        name: 'a',
        classes: 'ucb-link-button'
      }
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'linkButtonContents',
      view: {
        name: 'span',
        classes: 'ucb-link-button-contents'
      }
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'linkButton',
      view: (modelElement, { writer }) =>
        toWidget(
          writer.createContainerElement('a', { class: 'ucb-link-button', onclick: 'event.preventDefault()' }, { renderUnsafeAttributes: ['onclick'] }),
          writer, { label: 'button widget' }
        )
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'linkButtonContents',
      view: (modelElement, { writer }) =>
        toWidgetEditable(writer.createEditableElement('span', { class: 'ucb-link-button-contents' }), writer)
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
