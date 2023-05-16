import { Command } from 'ckeditor5/src/core';

export default class ButtonCommand extends Command {
  execute({ color, style, size, href, classes }) {
    const model = this.editor.model;
    const selection = model.document.selection;

    model.change(writer => {
      const button = addButton(writer, color, style, size, href, classes);
      const position = selection.getFirstPosition();

      writer.insert(button, position);
      writer.setSelection(button, 'on');
    });
  }


refresh() {
  const model = this.editor.model;
  const selection = model.document.selection;

  // Determine if the cursor (selection) is in a position where adding a
	// button is permitted. This is based on the schema of the model(s)
	// currently containing the cursor.
  const allowedIn = model.schema.findAllowedParent(
    selection.getFirstPosition(),
    'ucb-button'
  );

  // If the cursor is not in a location where a button can be added, return
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
// TO DO -- is this where i pass class information?
function addButton(writer, color, style, size, href, classes) {
  const button = writer.createElement('ucb-button', {
    class: `ucb-button-${color} ucb-button-${style} ucb-button-${size} ${classes}`,
    href: href
  });

  return button;
}
