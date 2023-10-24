import { Command } from 'ckeditor5/src/core';
import findAttributeRange from '@ckeditor/ckeditor5-typing/src/utils/findattributerange'; 	
import getRangeText from './countuputils.js';
import { toMap } from 'ckeditor5/src/utils';

export default class CountupCommand extends Command {
  refresh() {
  const model = this.editor.model;
  const selection = model.document.selection;
  const firstRange = selection.getFirstRange();

  // When the selection is collapsed, the command has a value if the caret is in a countup.
  if ( firstRange.isCollapsed ) {
    if ( selection.hasAttribute( 'ucb-countup' ) ) {
      const attributeValue = selection.getAttribute( 'ucb-countup' );

      // Find the entire range containing the countup under the caret position.
      const countupRange = findAttributeRange( selection.getFirstPosition(), 'ucb-countup', attributeValue, model );

      this.value = {
        div: getRangeText( countupRange ),
        range: countupRange
      };
    } else {
      this.value = null;
    }
  }
  // When the selection is not collapsed, the command has a value if the selection contains a subset of a single countup
  // or an entire countup.
  else {
    if ( selection.hasAttribute( 'ucb-countup' ) ) {
      const attributeValue = selection.getAttribute( 'ucb-countup' );

      // Find the entire range containing the countup under the caret position.
      const countupRange = findAttributeRange( selection.getFirstPosition(), 'ucb-countup', attributeValue, model );

      if ( countupRange.containsRange( firstRange, true ) ) {
        this.value = {
          div: getRangeText( firstRange ),
          range: firstRange
        };
      } else {
        this.value = null;
      }
    } else {
      this.value = null;
    }
  }

  // The command is enabled when the "countup" attribute can be set on the current model selection.
  this.isEnabled = model.schema.checkAttributeInSelection( selection, 'ucb-countup' );
}

execute( { div } ) {
  const model = this.editor.model;
  const selection = model.document.selection;

  model.change( writer => {
    // If selection is collapsed then update the selected countup or insert a new one at the place of caret.
    if ( selection.isCollapsed ) {
      // When a collapsed selection is inside text with the "countup" attribute, update its number.
      if ( this.value ) {
        const { end: positionAfter } = model.insertContent(
          writer.createText( div ),
          this.value.range
        );
        // Put the selection at the end of the inserted countup.
        writer.setSelection( positionAfter );
      }
      // If the collapsed selection is not in an existing countup, insert a text node with the "countup" attribute
      // in place of the caret. Because the selection is collapsed, the attribute value will be used as a data for text.
      // If the countup is empty, do not do anything.
      else if ( div !== '' ) {
        const firstPosition = selection.getFirstPosition();

        // Collect all attributes of the user selection (could be "bold", "italic", etc.)
        const attributes = toMap( selection.getAttributes() );

        // Put the new attribute to the map of attributes.
        attributes.set( 'ucb-countup' );

        // Inject the new text node with the countup text with all selection attributes.
        const { end: positionAfter } = model.insertContent( writer.createText( div, attributes ), firstPosition );

        // Put the selection at the end of the inserted countup. Using an end of a range returned from
        // insertContent() just in case nodes with the same attributes were merged.
        writer.setSelection( positionAfter );
      }

      // Remove the "countup" attribute attribute from the selection. It stops adding a new content into the countup
      // if the user starts to type.
      writer.removeSelectionAttribute( 'ucb-countup' );
    } else {
      // If the selection has non-collapsed ranges, change the attribute on nodes inside those ranges
      // omitting nodes where the "countup" attribute is disallowed.
      const ranges = model.schema.getValidRanges( selection.getRanges(), 'ucb-countup' );

      for ( const range of ranges ) {
        writer.setAttribute( 'ucb-countup', range );
      }
    }
  } );
}
}
