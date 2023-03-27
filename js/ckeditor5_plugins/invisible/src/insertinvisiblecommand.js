/**
 * @file defines insertInvisibleCommand, which is executed when the Invisible
 * toolbar button is pressed.
 */
// cSpell:ignore simpleboxeditingimport { Command } from 'ckeditor5/src/core';
import { Command } from 'ckeditor5/src/core';
import { IconView } from 'ckeditor5/src/ui';


// const selection = editor.model.document.selection;


export default class InvisibleCommand extends Command {
  execute() {
    const model = this.editor.model;
    const selection = model.document.selection;

    model.change(writer => {
      // Insert <ucb-invisible>*</ucb-invisible> at the current selection position
      // in a way that will result in creating a valid model structure.

      // const selectedText = this.editor.getData({ selection: true });
      const invisible = addInvisible(writer, selection);
      model.insertContent(invisible);
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
      'ucb-invisible'
    );

    // If the cursor is not in a location where a ucb-invisible can be added, return
    // null so the addition doesn't happen.
    this.isEnabled = allowedIn !== null;
  }
}

function addInvisible(writer, text) {
  // Create instances of the element registered with the editor.

  // Make the element
  const invisible = writer.createElement('ucb-invisible');
  // Strip the tags out of the selected text, convert to text Node for append
  

  const range = text.getFirstRange();

  for (const item of range.getItems()) {
    const textNode = writer.createText(item.data)
    writer.append(textNode, invisible)

  }  

  // Return the element to be added to the editor.
  return invisible;
}

