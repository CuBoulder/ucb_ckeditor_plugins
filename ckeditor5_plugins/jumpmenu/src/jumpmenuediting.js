/**
 * @file defines schemas, converters, and commands for the jump menu plugin.
 *
 * @typedef { import('@ckeditor/ckeditor5-engine').DowncastWriter } DowncastWriter
 * @typedef { import('@ckeditor/ckeditor5-engine/src/view/containerelement').default } ContainerElement
 */

import { Plugin } from 'ckeditor5/src/core';
import { toWidget } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertJumpMenuCommand from './insertjumpmenucommand';

export default class JumpMenuEditing extends Plugin {
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

  /**
   * Defines the schema for the jump menu model.
   */
  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('ucbJumpMenu', {
      isObject: true,
      allowWhere: '$block',
      allowAttributes: ['headerTag'],
      allowChildren: false
    });
  }

  /**
   * Defines converters for the jump menu model.
   */
  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.attributeToAttribute({
      model: {
        key: 'headerTag',
        value: viewElement => viewElement.getAttribute('headerTag')
      },
      view: 'headerTag'
    });

    conversion.for('upcast').elementToElement({
      model: 'ucbJumpMenu',
      view: {
        name: 'ucb-jump-menu',
        attributes: ['headerTag']
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'ucbJumpMenu',
      view: (modelElement, { writer: viewWriter }) => createJumpMenuView(modelElement, viewWriter)
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'ucbJumpMenu',
      view: (modelElement, { writer: viewWriter }) => createJumpMenuView(modelElement, viewWriter, true)
    });
  }

  /**
   * Defines the commands for inserting or modifying the jump menu.
   */
  _defineCommands() {
    const editor = this.editor;

    editor.commands.add('insertJumpMenu', new InsertJumpMenuCommand(editor));
    editor.commands.add('changeHeaderTag', {
      execute(headerTag) {
        const selectedElement = editor.model.document.selection.getSelectedElement();
        editor.model.change(writer => {
          writer.setAttribute('headerTag', headerTag, selectedElement);
        });
      }
    });
  }
}

/**
 * @param {Element} modelElement
 *   The element which contains the ucbJumpMenu model.
 * @param {DowncastWriter} downcastWriter
 *   The downcast writer.
 * @param {boolean} [widget=false]
 *   Whether or not to return a widget for editing. Defaults to `false`.
 * @returns {ContainerElement}
 *   The Jump Menu element or widget.
 */
function createJumpMenuView(modelElement, downcastWriter, widget = false) {
  const headerTag = modelElement.getAttribute('headerTag') || 'h2';
  const jumpMenuElement = downcastWriter.createContainerElement('ucb-jump-menu', { headerTag });

  if (widget) {
    return toWidget(jumpMenuElement, downcastWriter);
  }

  return jumpMenuElement;
}
