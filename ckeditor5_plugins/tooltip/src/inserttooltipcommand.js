import { Command } from 'ckeditor5/src/core';
import findAttributeRange from '@ckeditor/ckeditor5-typing/src/utils/findattributerange';   
import getRangeText from './tooltiputils.js';
import { toMap } from 'ckeditor5/src/utils';

export default class TooltipCommand extends Command {
  refresh() {
  const model = this.editor.model;
  const selection = model.document.selection;
  const firstRange = selection.getFirstRange();

  // When the selection is collapsed, the command has a value if the caret is in a tooltip.
  if ( firstRange.isCollapsed ) {
    if ( selection.hasAttribute( 'tooltip' ) ) {
      const attributeValue = selection.getAttribute( 'ucb-tooltip' );

      // Find the entire range containing the tooltip under the caret position.
      const tooltipRange = findAttributeRange( selection.getFirstPosition(), 'ucb-tooltip', attributeValue, model );

      this.value = {
        abbr: getRangeText( tooltipRange ),
        title: attributeValue,
        range: tooltipRange
      };
    } else {
      this.value = null;
    }
  }
  // When the selection is not collapsed, the command has a value if the selection contains a subset of a single tooltip
  // or an entire tooltip.
  else {
    if ( selection.hasAttribute( 'ucb-tooltip' ) ) {
      const attributeValue = selection.getAttribute( 'ucb-tooltip' );

      // Find the entire range containing the tooltip under the caret position.
      const tooltipRange = findAttributeRange( selection.getFirstPosition(), 'ucb-tooltip', attributeValue, model );

      if ( tooltipRange.containsRange( firstRange, true ) ) {
        this.value = {
          abbr: getRangeText( firstRange ),
          title: attributeValue,
          range: firstRange
        };
      } else {
        this.value = null;
      }
    } else {
      this.value = null;
    }
  }

  // The command is enabled when the "tooltip" attribute can be set on the current model selection.
  this.isEnabled = model.schema.checkAttributeInSelection( selection, 'ucb-tooltip' );
}

execute( { abbr, title } ) {
  const model = this.editor.model;
  const selection = model.document.selection;

  model.change( writer => {
    // If selection is collapsed then update the selected tooltip or insert a new one at the place of caret.
    if ( selection.isCollapsed ) {
      // When a collapsed selection is inside text with the "tooltip" attribute, update its text and title.
      if ( this.value ) {
        const { end: positionAfter } = model.insertContent(
          writer.createText( abbr, { tooltip: title } ),
          this.value.range
        );
        // Put the selection at the end of the inserted tooltip.
        writer.setSelection( positionAfter );
      }
      // If the collapsed selection is not in an existing tooltip, insert a text node with the "tooltip" attribute
      // in place of the caret. Because the selection is collapsed, the attribute value will be used as a data for text.
      // If the tooltip is empty, do not do anything.
      else if ( abbr !== '' ) {
        const firstPosition = selection.getFirstPosition();

        // Collect all attributes of the user selection (could be "bold", "italic", etc.)
        const attributes = toMap( selection.getAttributes() );

        // Put the new attribute to the map of attributes.
        attributes.set( 'ucb-tooltip', title );

        // Inject the new text node with the tooltip text with all selection attributes.
        const { end: positionAfter } = model.insertContent( writer.createText( abbr, attributes ), firstPosition );

        // Put the selection at the end of the inserted tooltip. Using an end of a range returned from
        // insertContent() just in case nodes with the same attributes were merged.
        writer.setSelection( positionAfter );
      }

      // Remove the "tooltip" attribute attribute from the selection. It stops adding a new content into the tooltip
      // if the user starts to type.
      writer.removeSelectionAttribute( 'ucb-tooltip' );
    } else {
      // If the selection has non-collapsed ranges, change the attribute on nodes inside those ranges
      // omitting nodes where the "tooltip" attribute is disallowed.
      const ranges = model.schema.getValidRanges( selection.getRanges(), 'ucb-tooltip' );

      for ( const range of ranges ) {
        writer.setAttribute( 'ucb-tooltip', title, range );
      }
    }
  } );
}
}
