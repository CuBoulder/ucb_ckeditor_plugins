/**
 * @file defines InsertCalloutCommand, which is executed when the callout toolbar button is pressed.
 * 
 * @typedef { import('@ckeditor/ckeditor5-engine').Element } Element
 * @typedef { import('@ckeditor/ckeditor5-engine/src/model/writer').default } Writer
 */

import { defaultSize } from './calloutconfig';
import { Command } from 'ckeditor5/src/core';

export default class InsertCalloutCommand extends Command {
  /**
   * @inheritdoc
   */
  execute() {
    const { model } = this.editor;

    model.change((writer) => {
      // Insert <callout>*</callout> at the current selection position
      // in a way that will result in creating a valid model structure.
      model.insertContent(createCallout(writer));
    });
  }

  /**
   * @inheritdoc
   */
  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    // Determine if the cursor (selection) is in a position where adding a
    // callout is permitted. This is based on the schema of the model(s)
    // currently containing the cursor.
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'callout'
    );

    // If the cursor is not in a location where a callout can be added, return
    // null so the addition doesn't happen.
    this.isEnabled = allowedIn !== null;
  }
}

/**
 * @param {Writer} writer
 *   The writer used to create and append elements.
 * @returns {Element}
 *   The callout element with all required child elements to match the callout schema.
 */
function createCallout(writer) {
  // Create instances of the three elements registered with the editor in calloutediting.js.
  const callout = writer.createElement('callout', { 'calloutSize': defaultSize });
  const calloutContent = writer.createElement('calloutContent');

  // Append the title and description elements to the callout, which matches
  // the parent/child relationship as defined in their schemas.
  writer.append(calloutContent, callout);

  // The calloutDescription text content will automatically be wrapped in a `<p>`.
  writer.appendElement('paragraph', calloutContent);

  // Return the element to be added to the editor.
  return callout;
}
