/**
 * @file defines InsertCountdownCommand, which is executed when the countdown toolbar button is pressed.
 */

import { Command } from 'ckeditor5/src/core';
import { defaultBackground, defaultStyle } from './countdownconfig';

export default class CountdownCommand extends Command {
  constructor(editor) {
    super(editor);
    this.set('existingCountdownSelected', false);
  }

  execute({ style = defaultStyle, background = defaultBackground, date}) {
    const model = this.editor.model;
    const selection = model.document.selection;

    model.change(writer => {
      const range = selection.getFirstRange();
      const cuCountdown = writer.createElement('cuCountdown', {
        cuCountdownBackground: background,
        cuCountdownStyle: style
      });
      writer.insert(date, cuCountdown);
      model.insertContent(cuCountdown);
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const selectedElement = selection.getSelectedElement();
  
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'cuCountdown'
    );
  
    this.isEnabled = allowedIn !== null;
  
    this.existingCountdownSelected = isButtonElement(selectedElement) ? selectedElement : null;
  }  
}

function isButtonElement(element) {
  return element && element.name === 'cuCountdown';
}
