import { Command } from 'ckeditor5/src/core';

export default class InvisibleCommand extends Command {
  constructor( editor ) {
    super( editor );

    // Listen for the Enter key and execute the command if conditions are met.
    editor.keystrokes.set( 'Enter', ( data, cancel ) => {
      const model = editor.model;
      const selection = model.document.selection;

      // If the selection is in an invisible element, let's exit that element.
      if ( selection.focus && selection.focus.parent.name === 'ucb-invisible' ) {
        model.change( writer => {
          // Insert a paragraph after the invisible element.
          const paragraph = writer.createElement( 'paragraph' );
          writer.insert( paragraph, selection.focus.parent, 'after' );

          // Place the selection into the new paragraph.
          writer.setSelection( paragraph, 'in' );
        });

        // Prevent the default action of adding a new line in the invisible element.
        cancel();
      }
    }, { priority: 'high' } ); // Use high priority to override the default Enter key behavior.
  }

  execute() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const invisibleElement = findInvisibleElement(selection);

    console.log('invisible element', invisibleElement)
    model.change(writer => {
      if (invisibleElement) {
        // If selection is in an invisible element, remove the element.
        removeInvisible(writer, invisibleElement);
      } else {
        // Otherwise, add an invisible element.
        const invisible = addInvisible(writer, selection);
        model.insertContent(invisible);
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

  // The command is enabled if we're in a position to insert an invisible element.
  // The command's value is true if the selection is inside an invisible element.
  const isInvisible = findInvisibleElement(selection);

  this.isEnabled = allowedIn !== null || isInvisible !== null;
  this.value = !!isInvisible;
  }
}

function findInvisibleElement(selection) {
  // Ensure there's a focus position to look at
  if (!selection.focus) {
    return null;
  }

  // Check the name of the focus parent, if it's 'ucb-invisible', return it
  if (selection.focus.parent && selection.focus.parent.name === 'ucb-invisible') {
    return selection.focus.parent;
  }

  // If the parent is not 'ucb-invisible', return null and log an error for debugging
  return null;
}


function removeInvisible( writer, invisibleElement ) {
  const range = writer.createRangeOn(invisibleElement);
  const contents = range.getContainedElement();
  const parent = invisibleElement.parent
  console.log(parent)
  writer.unwrap(invisibleElement);
  // Move selection out of the now-removed invisible element
  if (contents) {
    writer.setSelection(contents, 'after');
  }
}




function addInvisible( writer, selection ) {
  const invisible = writer.createElement( 'ucb-invisible' );

  const range = selection.getFirstRange();

  for ( const item of range.getItems() ) {
    const textNode = writer.createText( item.data );
    writer.append( textNode, invisible );
  }

  return invisible;
}
