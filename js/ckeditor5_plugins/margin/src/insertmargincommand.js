import { Command } from 'ckeditor5/src/core';

export default class MarginCommand extends Command {
  execute() {
    const model = this.editor.model;
    const selection = model.document.selection;

    model.change(writer => {
      // Call the addCloseMargin function to create the div with the class
      const closeMargin = addCloseMargin(writer);
      
      // Insert the created div at the current selection position
      model.insertContent(closeMargin, selection);
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;

    // Determine if the cursor (selection) is in a position where adding a
    // div with the class "close-margin" is permitted.
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'close-margin'
    );

    // Enable/disable the toolbar button based on whether it's allowed
    this.isEnabled = allowedIn !== null;
  }
}

function addCloseMargin(writer) {
  const marginDiv = writer.createElement('close-margin');
  
  // Create an empty text node and append it to the div
  const textNode = writer.createText('');
  writer.append(textNode, marginDiv);

  return marginDiv;
}
