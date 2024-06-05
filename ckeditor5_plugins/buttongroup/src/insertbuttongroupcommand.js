/**
 * @file defines InsertButtonCommand, which is executed when the button toolbar button is pressed.
 */

import { Command } from 'ckeditor5/src/core';
import { defaultColor, defaultSize } from './buttongroupconfig'

export default class InsertButtonGroupCommand extends Command {

  execute() {
    const {model} = this.editor;
    model.change((writer)=> {
      model.insertContent(createButtonGroup(writer))
    })
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const selectedElement = selection.getSelectedElement();

    if(selectedElement && selectedElement.name == 'buttonGroup'){
      const color = selectedElement.getAttribute('buttonGroupColor')
      const size = selectedElement.getAttribute('buttonGroupSize')
      const childBtns = Array.from(selectedElement.getChildren())
      childBtns.forEach(btn=>{
        btn._setAttribute('linkButtonColor', color)
        btn._setAttribute('linkButtonSize', size)
      })

    }

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
function createButtonGroup(writer) {
  const model = writer.model
  const selection = model.document.selection
  // Create instances of the three elements registered with the editor in buttongroupediting.js.
  const buttonGroup = writer.createElement('buttonGroup', {
    buttonGroupColor: defaultColor,
    buttonGroupSize: defaultSize,
  });

    const range = selection.getFirstRange();
    for (const item of range.getItems()) {
      if (item.name =='linkButton'){
        const innerTextEl = item._children ? writer.cloneElement(item._children._nodes[0]) : false;
        const newButton = item._clone();
        newButton._setAttribute('linkButtonColor', defaultColor)
        newButton._setAttribute('linkButtonSize', defaultSize)
        if(innerTextEl){
          writer.append(innerTextEl, newButton)
        };
        writer.append(newButton, buttonGroup)
      }
    }

  
  // Return the element to be added to the editor.
  return buttonGroup;
}

/**
 * @param {Element | null} element 
 * @returns {boolean}
 *   Whether or not `element` is a button group element.
 */
function isButtonGroupElement(element) {
  return element && element.name === 'buttonGroup';
}
