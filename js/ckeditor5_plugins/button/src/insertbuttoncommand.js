import { Command } from 'ckeditor5/src/core';
import { defaultColor, defaultSize, defaultStyle, sizeOptions, colorOptions, styleOptions } from './buttonconfig';

export default class ButtonCommand extends Command {
  constructor(editor) {
		super(editor);
		this.set('existingButtonSelected', false);
	}
  execute({value = '', size = defaultSize, style = defaultStyle, color = defaultColor, href = '', classes = ''}) {
    const model = this.editor.model;
    const selection = model.document.selection;

    model.change(writer => {
      const button = addButton(writer, color, style, size, href, selection);
      // const position = selection.getFirstPosition();

      model.insertContent(button);
      writer.setSelection(button, 'on');
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
		const selectedElement = selection.getSelectedElement();

    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'ucb-button'
    );

    this.isEnabled = allowedIn !== null;

    this.existingButtonSelected = isButtonElement(selectedElement) ? selectedElement : null;

  }
}

/**
 * @param {Writer} writer
 *   The writer used to create and append elements.
 * @returns {Element}
 *   The box element with all required child elements to match the box schema.
 */
function addButton(writer, color, style, size, href, selection) {
  const range = selection.getFirstRange();

  const buttonSpan = writer.createElement('ucb-button-wrapper',{
    color,
    style,
    size,
  })
  const button = writer.createElement('ucb-button', {
    class: 'ucb-button',
    href,
  });
  for (const item of range.getItems()) {
    const textNode = writer.createText(item.data)
    writer.append(textNode, button)
  } 

  writer.append(button, buttonSpan)
  return buttonSpan;
}

/**
 * @param {Element | null} element 
 * @returns {boolean}
 *   Whether or not `element` is a map element.
 */
function isButtonElement(element) {
	return element && element.name === 'ucb-button';
}

