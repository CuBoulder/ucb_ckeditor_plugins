/** 
 * @file defines ModifyCalloutCommand, which is executed to modify attributes of the callout from the widget toolbar.
 * 
 * @typedef { import('@ckeditor/ckeditor5-core').Editor } Editor
 */

import { Command } from 'ckeditor5/src/core';
import { getSelectedCalloutWidget } from './calloututils';

export default class ModifyCalloutCommand extends Command {
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
   * Creates a new ModifyCalloutCommand.
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
    const model = this.editor.model, callout = getSelectedCalloutWidget(model.document.selection), attributeName = this.attributeName, defaultValue = this.defaultValue;
    this.isEnabled = !!callout; // Disables any ModifyCalloutCommand if there is no selected callout
    if (this.isEnabled)
      this.value = callout.getAttribute(attributeName); // Sets the `value` of this ModifyCalloutCommand to the attribute of the selected callout
    else this.value = defaultValue;
  }

  /**
   * @inheritdoc
   */
  execute(options = { value: '' }) {
    const model = this.editor.model, callout = getSelectedCalloutWidget(model.document.selection), attributeName = this.attributeName, defaultValue = this.defaultValue;
    if (callout)
      model.change(writer => writer.setAttribute(attributeName, options.value || defaultValue, callout)); // Sets the attribute of the selected callout to a new value upon execution of this command
  }
}
