/**
 * @file defines schemas, converters, and commands for the button plugin.
 * 
 * @typedef { import('@ckeditor/ckeditor5-engine').DowncastWriter } DowncastWriter
 * @typedef { import('@ckeditor/ckeditor5-engine/src/view/containerelement').default } ContainerElement
 */

import { Plugin } from 'ckeditor5/src/core';
import { Widget, toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { sizeOptions, colorOptions, defaultSize, defaultColor } from './buttongroupconfig';
import InsertButtonGroupCommand from './insertbuttongroupcommand';
import ModifyButtonGroupCommand from './modifybuttongroupcommand';
import AddNewButtonCommand from './addnewbuttoncommand';
export default class ButtonGroupEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this._defineCommands();
  }

  // Schemas are registered via the central `editor` object.
  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.register('buttonGroup', {
      allowWhere: '$block',
      isObject: true,
      isInline: true,
      allowAttributes: ['buttonGroupColor', 'buttonGroupSize'],
      allowChildren: 'linkButton'
    });
  }

  /**
   * Converters determine how CKEditor 5 models are converted into markup and
   * vice-versa.
   */
  _defineConverters() {
    // Converters are registered via the central editor object.
    const { conversion, editing } = this.editor;

    // Attributes convertable to/from a class name need no separate upcast and downcast definitions
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('buttonGroupColor', colorOptions));
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('buttonGroupSize', sizeOptions));

    conversion.for('upcast').elementToElement({
      model: 'buttonGroup',
      view: {
        name: 'div',
        classes: 'ucb-button-group'
      }
    });

    // Attribute downcasts
    // conversion.for('downcast').attributeToAttribute({ model: 'linkButtonHref', view: 'href' });

    // Element downcasts – elements become widgets in the editor via `editingDowncast`
    conversion.for('dataDowncast').elementToElement({
      model: 'buttonGroup',
      view: {
        name: 'div',
        classes: 'ucb-button-group'
      }
    });
    
    conversion.for('editingDowncast').elementToElement({
      model: 'buttonGroup',
      view: (modelElement, { writer: viewWriter }) => createButtonGroupView(viewWriter, true)
    });
  }

    /**
   * Defines the commands for inserting or modifying the box.
   */
    _defineCommands() {
      const commands = this.editor.commands;
      commands.add('insertButtonGroup', new InsertButtonGroupCommand(this.editor));
      commands.add('buttonGroupSize', new ModifyButtonGroupCommand(this.editor, 'buttonGroupSize', defaultSize));
      commands.add('buttonGroupColor', new ModifyButtonGroupCommand(this.editor, 'buttonGroupColor', defaultColor));
      commands.add('addNewButtonBG', new AddNewButtonCommand(this.editor))
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

/**
 * @param {DowncastWriter} viewWriter
 *   The downcast writer.
 * @param {boolean} [widget=false]
 *   Whether or not to return a widget for editing. Defaults to `false`.
 * @returns {ContainerElement}
 *   The box container element or widget.
 */
function createButtonGroupView(viewWriter, widget = false) {
  const div = viewWriter.createContainerElement('div', { class: 'ucb-button-group' });
  return widget ? toWidget(div, viewWriter, { label: 'button group widget', hasSelectionHandle: true }) : div;
}

