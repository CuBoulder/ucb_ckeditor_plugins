import { Command } from 'ckeditor5/src/core';

export default class InvisibleCommand extends Command {
  constructor( editor ) {
    super( editor );
      }
  
      execute(text) {
        const model = this.editor.model;
        const selection = model.document.selection;
        const invisibleElement = isInvisibleElement(selection.getSelectedElement()) ? findInvisibleElement(selection.getSelectedElement()) : null;
        // If selection is text, use that
        const selectedText = generateText(selection)

        model.change(writer => {
          let newElementCreated = false;
            if (invisibleElement) {
                // Update the text content of the existing invisible element.
                const textNode = invisibleElement.getChild(0);
                if (textNode) {
                    writer.remove(textNode); // Remove the existing text node
                }
                writer.appendText(text || 'Invisible Content', invisibleElement);
            } else {
                // Create a new invisible element with the text from the input field.
                const invisible = writer.createElement('ucb-invisible');
                writer.appendText(text || selectedText || 'Invisible Content', invisible);
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
                  }, 0) // Timeout set to 0 to allow UI to update
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
  

  updateText(newText) {
		this._text = newText;
	}
}

function isInvisibleElement(element) {
	return element && element.name === 'ucb-invisible';
}

function findInvisibleElement(element){
  return isInvisibleElement(element) ?  element : null
}

function generateText(selection){
    const range = selection.getFirstRange();
    let string = '';

    for ( const item of range.getItems() ) {
      string += item.data
  }
  return string;
}


function removeInvisible( writer, invisibleElement ) {
  const range = writer.createRangeOn(invisibleElement);
  const contents = range.getContainedElement();
  const parent = invisibleElement.parent
  writer.unwrap(invisibleElement);
  // Move selection out of the now-removed invisible element
  if (contents) {
    writer.setSelection(contents, 'after');
  }
}
