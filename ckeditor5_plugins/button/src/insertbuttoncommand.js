/**
 * @file defines InsertButtonCommand, which is executed when the button toolbar button is pressed.
 */

import { Command } from 'ckeditor5/src/core';
import { defaultColor, defaultSize, defaultStyle } from './buttonconfig';

export default class ButtonCommand extends Command {
  constructor(editor) {
    super(editor);
    this.set('existingButtonSelected', false);
  }
  execute({ value = '', size = defaultSize, style = defaultStyle, color = defaultColor, href = '', classes = '' }) {
    const model = this.editor.model;
    const selection = model.document.selection;

    model.change(writer => {
      const range = selection.getFirstRange(),
        linkButton = writer.createElement('linkButton', {
          linkButtonColor: color,
          linkButtonSize: size,
          linkButtonStyle: style,
          linkButtonHref: href
        }),
        linkButtonContents = writer.createElement('linkButtonContents');
      for (const item of range.getItems()) {
        let element;
        if (item.is('textProxy'))
          element = writer.createText(item.data, item.textNode.getAttributes());
        else if (item.is('element'))
          element = writer.cloneElement(item);
        if (element && model.schema.checkChild(linkButtonContents, element))
          writer.append(element, linkButtonContents);
      }
      writer.append(linkButtonContents, linkButton);
      model.insertContent(linkButton);
      writer.setSelection(linkButtonContents, 'in');
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const selectedElement = selection.getSelectedElement();

    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'linkButton'
    );

    this.isEnabled = allowedIn !== null;

    this.existingButtonSelected = isButtonElement(selectedElement) ? selectedElement : null;
  }
}

/**
 * @param {Element | null} element 
 * @returns {boolean}
 *   Whether or not `element` is a map element.
 */
function isButtonElement(element) {
  return element && element.name === 'linkButton';
}
