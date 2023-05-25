import { Command } from 'ckeditor5/src/core';
import { defaultColor, defaultSize, defaultStyle, sizeOptions, colorOptions, styleOptions } from './buttonconfig';

export default class ButtonCommand extends Command {
  execute({value = '', size = defaultSize, style = defaultStyle, color = defaultColor, href = '', classes = ''}) {
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

    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'ucb-button'
    );

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
    class: 'ucb-button',
    href,
    color,
    style,
    size
  });

  return button;
}
