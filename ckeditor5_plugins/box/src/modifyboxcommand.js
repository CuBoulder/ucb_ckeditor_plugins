/** 
 * @file defines ModifyBoxCommand, which is executed to modify attributes of the box from the widget toolbar.
 * 
 * @typedef { import('@ckeditor/ckeditor5-core').Editor } Editor
 */

import { Command } from 'ckeditor5/src/core';
import { getSelectedBoxWidget } from './boxutils';

export default class ModifyBoxCommand extends Command {
  /** 
   * The name of the attribute this command modifies.
   * @type {string}
   */
  attributeName

  /**
   * The default value to set if there isn't one specified.
   * @type {string}
   */
  defaultValue

  /**
   * Creates a new ModifyBoxCommand.
   * @param {Editor} editor 
   *   The editor.
   * @param {string} attributeName 
   *   The name of the attribute this command modifies.
   * @param {string} defaultValue 
   *   The default value to set if there isn't one specified.
   */
  constructor(editor, attributeName, defaultValue) {
    super(editor);
    this.attributeName = attributeName;
    this.defaultValue = defaultValue;
  }

  /**
   * @inheritdoc
   */
  refresh() {
    const model = this.editor.model, box = getSelectedBoxWidget(model.document.selection), attributeName = this.attributeName, defaultValue = this.defaultValue;
    this.isEnabled = !!box; // Disables any ModifyBoxCommand if there is no selected box
    if (this.isEnabled)
      this.value = box.getAttribute(attributeName); // Sets the `value` of this ModifyBoxCommand to the attribute of the selected box
    else this.value = defaultValue;
  }

  /**
   * @inheritdoc
   */
  execute(options = { value: '' }) {
    const model = this.editor.model, box = getSelectedBoxWidget(model.document.selection), attributeName = this.attributeName, defaultValue = this.defaultValue;
    if (box)
      model.change(writer => writer.setAttribute(attributeName, options.value || defaultValue, box)); // Sets the attribute of the selected box to a new value upon execution of this command
  }
}
