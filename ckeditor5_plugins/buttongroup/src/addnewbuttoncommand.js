/**
 * @file defines InsertButtonCommand, which is executed when the button toolbar button is pressed.
 */

import { Command } from 'ckeditor5/src/core';
import ButtonUI from '../../button/src/buttonui';

export default class AddNewButtonCommand extends Command {

  execute() {
    const {model} = this.editor;
        const selection = model.document.selection
        const selectedElement = selection.getSelectedElement();

    model.change((writer)=> {
            if(isButtonGroupElement(selectedElement)){
                const newButton = insertNewButtonBG(writer);
                writer.append(newButton,selectedElement);
        writer.setSelection(newButton, "on");
        this.editor.plugins.get('ButtonUI').fire('showUI', newButton);
            }
    })
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const selectedElement = selection.getSelectedElement();

    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'buttonGroup'
    );

    this.isEnabled = allowedIn !== null;

    this.existingButtonGroupSelected = isButtonGroupElement(selectedElement) ? selectedElement : null;
  }
}

/**
 * @param {Writer} writer
 *   The writer used to create and append elements.
 * @returns {Element}
 *   The box element with all required child elements to match the button group schema.
 */
function insertNewButtonBG(writer) {
  const model = writer.model
  const selection = model.document.selection
    const selectedElement = selection.getSelectedElement()

    if(isButtonGroupElement(selectedElement)){
    const color = selectedElement.getAttribute('buttonGroupColor')
    const size = selectedElement.getAttribute('buttonGroupSize')

        const newButton = writer.createElement('linkButton', {
            linkButtonColor: color,
            linkButtonSize: size,
            linkButtonHref: ""
      });

        return newButton;
  }  
  // Return the element to be added to the editor.
    return null
}

/**
 * @param {Element | null} element 
 * @returns {boolean}
 *   Whether or not `element` is a button group element.
 */
function isButtonGroupElement(element) {
  return element && element.name === 'buttonGroup';
}
