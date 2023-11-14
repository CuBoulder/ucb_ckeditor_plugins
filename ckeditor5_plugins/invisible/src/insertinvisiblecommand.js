import { Command } from 'ckeditor5/src/core';
import {isInvisibleElement, findInvisibleElement, generateText} from './invisibleutils';

export default class InvisibleCommand extends Command {
  constructor( editor ) {
    super( editor );
      }
  
      execute(text) {
        const model = this.editor.model;
        const selection = model.document.selection;
        const invisibleElement = isInvisibleElement(selection.getSelectedElement()) ? findInvisibleElement(selection.getSelectedElement()) : null;
        // If selection is text, make it insertable
        const selectedText = generateText(selection)

        model.change(writer => {
          let newElementCreated = false;
            if (invisibleElement) {
                // Update the text content of the existing invisible element.
                const textNode = invisibleElement.getChild(0);
                if (textNode) {
                    writer.remove(textNode); // Remove the existing text node
                }
                writer.appendText(text !== null ? text : '', invisibleElement);
              } else {
                // Create a new invisible element with the text from the input field, the highlighted text, or default.
                const invisible = writer.createElement('ucb-invisible');
                if (!selectedText){
                  writer.appendText(text || 'Invisible Content', invisible);
                } else {
                  writer.appendText(selectedText || 'Invisible Content', invisible);
                }
                model.insertContent(invisible);
    
                // Set the selection on the inserted widget element
                writer.setSelection(invisible, 'on');
                newElementCreated = true
                if (newElementCreated) {
                  setTimeout(() => {
                      const inputField = this.editor.ui.labeledInput;
                      if (inputField) {
                          inputField.fieldView.value = text || selectedText;
                          inputField.fieldView.focus();
                      }
                  }, 0) // Timeout set to 0 to allow UI to update, not sure why this is needed but it works
                }
            }
        });
    }
    

    refresh() {
      const model = this.editor.model;
      const selection = model.document.selection;
      
      // Check if the command should be enabled based on the current selection.
      const allowedIn = model.schema.findAllowedParent(
          selection.getFirstPosition(),
          'ucb-invisible'
      );
  
      // Check if the selection is inside an invisible element.
      const invisibleElement = findInvisibleElement(selection.getSelectedElement());
      this.isEnabled = allowedIn !== null || invisibleElement !== null;
      this.value = !!invisibleElement;
  
      // Update the input field in the toolbar
      const inputField = this.editor.ui.labeledInput;
      if (inputField) {
          if (invisibleElement) {
              const textNode = invisibleElement.getChild(0);
              inputField.fieldView.value = textNode ? textNode.data : '';
          } else {
              inputField.fieldView.value = '';
          }
      }
  }
}