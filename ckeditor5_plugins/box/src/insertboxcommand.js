/**
 * @file defines InsertBoxCommand, which is executed when the box toolbar button is pressed.
 * 
 * @typedef { import('@ckeditor/ckeditor5-engine').Element } Element
 * @typedef { import('@ckeditor/ckeditor5-engine/src/model/writer').default } Writer
 */

import { titleDefault, alignmentDefault, styleDefault, themeDefault } from './boxconfig';
import { Command } from 'ckeditor5/src/core';

export default class InsertBoxCommand extends Command {
  /**
   * @inheritdoc
   */
  execute() {
    const { model } = this.editor;

    model.change((writer) => {
      // Insert <box>*</box> at the current selection position
      // in a way that will result in creating a valid model structure.
      model.insertContent(createBox(writer));
    });
  }

  /**
   * @inheritdoc
   */
  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    // Determine if the cursor (selection) is in a position where adding a
    // box is permitted. This is based on the schema of the model(s)
    // currently containing the cursor.
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'box'
    );

    // If the cursor is not in a location where a box can be added, return
    // null so the addition doesn't happen.
    this.isEnabled = allowedIn !== null;
  }
}

/**
 * @param {Writer} writer
 *   The writer used to create and append elements.
 * @returns {Element}
 *   The box element with all required child elements to match the box schema.
 */
function createBox(writer) {
  // Create instances of the three elements registered with the editor in boxediting.js.
  const box = writer.createElement('box', { 'boxTitle': titleDefault, 'boxAlignment': alignmentDefault, 'boxStyle': styleDefault, 'boxTheme': themeDefault });
  const boxInner = writer.createElement('boxInner');
  const boxTitle = writer.createElement('boxTitle');
  const boxContent = writer.createElement('boxContent');

  // Append the title and description elements to the box, which matches
  // the parent/child relationship as defined in their schemas.
  writer.append(boxInner, box);
  writer.append(boxTitle, boxInner);
  writer.append(boxContent, boxInner);

  // The boxDescription text content will automatically be wrapped in a `<p>`.
  writer.appendElement('paragraph', boxContent);

  // Return the element to be added to the editor.
  return box;
}
