import { Command } from 'ckeditor5/src/core';

export default class MarginCommand extends Command {
  execute() {
    const model = this.editor.model;
    const selection = model.document.selection;

    model.change(writer => {
      const selectedElement = selection.getFirstPosition().parent;
      if (selection && selectedElement.name == 'close-margin') {
        writer.remove(selectedElement)
      } else {
        // If not, add the "close-margin" div
        const closeMargin = addCloseMargin(writer, selection);
        model.insertContent(closeMargin, selection);
      }
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

function addCloseMargin(writer, selection) {
  const marginDiv = writer.createElement('close-margin');

  const range = selection.getFirstRange();

  for (const item of range.getItems()) {
    const textNode = writer.createText(item.data)
    writer.append(textNode, marginDiv)

  }  

  return marginDiv;
}
