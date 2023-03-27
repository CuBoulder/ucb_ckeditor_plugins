/**
 * @file defines insertInvisibleCommand, which is executed when the Invisible
 * toolbar button is pressed.
 */
// cSpell:ignore simpleboxeditingimport { Command } from 'ckeditor5/src/core';
import { Command } from 'ckeditor5/src/core';


// const selection = editor.model.document.selection;


export default class ButtonCommand extends Command {
  execute() {
    const model = this.editor.model;
    const selection = model.document.selection;

    model.change(writer => {
      // TODO
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;

    // Determine if the cursor (selection) is in a position where adding a
    // Invisible is permitted. This is based on the schema of the model(s)
    // currently containing the cursor.
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'ucb-button'
    );

    // If the cursor is not in a location where a ucb-invisible can be added, return
    // null so the addition doesn't happen.
    this.isEnabled = allowedIn !== null;
  }
}

function addButton(writer, text) {
  // Create instances of the element registered with the editor.

  // Make the element
  const button = writer.createElement('ucb-button');

  // Return the element to be added to the editor.
  return button;
}

