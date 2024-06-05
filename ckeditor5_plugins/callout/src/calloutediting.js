/**
 * @file defines schemas, converters, and commands for the callout plugin.
 * 
 * @typedef { import('@ckeditor/ckeditor5-engine').DowncastWriter } DowncastWriter
 * @typedef { import('@ckeditor/ckeditor5-engine/src/view/containerelement').default } ContainerElement
 */

import { Plugin } from 'ckeditor5/src/core';
import CalloutCommand from './insertcalloutcommand';
import { Widget, toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { sizeOptions } from './calloutconfig';


export default class CalloutEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add('addCallout', new CalloutCommand(this.editor));
  }

  // Schemas are registered via the central `editor` object.
  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.register('cuCallout', {
      allowWhere: '$text',
      isObject: true,
      isInline: true,
      allowAttributes: ['cuCalloutSize'],
      allowContentOf: '$block'
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
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('cuCalloutSize', sizeOptions));

    // Element upcasts
    conversion.for('upcast').elementToElement({
      model: 'cuCallout',
      view: {
        name: 'div',
        classes: 'feature-layout-callout'
      }
    });

    // Element downcasts – elements become widgets in the editor via `editingDowncast`
    conversion.for('dataDowncast').elementToElement({
      model: 'cuCallout',
      view: {
        name: 'div',
        classes: 'feature-layout-callout'
      }
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'cuCallout',
      view: (modelElement, { writer }) =>
        toWidget(
          writer.createContainerElement('div', { class: 'feature-layout-callout'}),
          writer, { label: 'Callout Widget' }
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
