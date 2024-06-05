/**
 * @file defines schemas, converters, and commands for the countup plugin.
 * 
 * @typedef { import('@ckeditor/ckeditor5-engine').DowncastWriter } DowncastWriter
 * @typedef { import('@ckeditor/ckeditor5-engine/src/view/containerelement').default } ContainerElement
 */

import { Plugin } from 'ckeditor5/src/core';
import CountupCommand from './insertcountupcommand';
import { Widget, toWidget, toWidgetEditable } from 'ckeditor5/src/widget';


export default class CountupEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add('addCountup', new CountupCommand(this.editor));
  }

  // Schemas are registered via the central `editor` object.
  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.register('cuCountup', {
      allowWhere: '$text',
      isObject: true,
      isInline: true,
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

    // Element upcasts
    conversion.for('upcast').elementToElement({
      model: 'cuCountup',
      view: {
        name: 'span',
        classes: ['ucb-countup', 'counter']
      }
    });

    // Element downcasts – elements become widgets in the editor via `editingDowncast`
    conversion.for('dataDowncast').elementToElement({
      model: 'cuCountup',
      view: {
        name: 'span',
        classes: ['ucb-countup', 'counter']
      }
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'cuCountup',
      view: (modelElement, { writer }) =>
        toWidget(
          writer.createContainerElement('span', { classes: ['ucb-countup', 'counter']}),
          writer, { label: 'Countup Widget' }
        )
    });
  }
}
