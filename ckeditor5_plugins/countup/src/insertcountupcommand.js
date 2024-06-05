/**
 * @file defines InsertCountupCommand, which is executed when the countup toolbar button is pressed.
 */

import { Command } from 'ckeditor5/src/core';

export default class CountupCommand extends Command {
  constructor(editor) {
    super(editor);
    this.set('existingCountupSelected', false);
  }

  execute({ countupText}) {
    const model = this.editor.model;
    const selection = model.document.selection;

    model.change(writer => {
      const range = selection.getFirstRange();
      const cuCountup = writer.createElement('cuCountup', {
      });
      writer.insert(countupText, cuCountup);
      model.insertContent(cuCountup);
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const selectedElement = selection.getSelectedElement();
  
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'cuCountup'
    );
  
    this.isEnabled = allowedIn !== null;
  
    this.existingCountupSelected = isButtonElement(selectedElement) ? selectedElement : null;
  }  
}

function isButtonElement(element) {
  return element && element.name === 'cuCountup';
}
