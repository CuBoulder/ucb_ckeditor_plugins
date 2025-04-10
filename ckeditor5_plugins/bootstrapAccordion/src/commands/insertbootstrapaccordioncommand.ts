import type { DocumentSelection, Element, Model } from 'ckeditor5/src/engine';
import type { AccordionModelAttribute } from '../bootstrapaccordionconfig';
import { Command } from 'ckeditor5/src/core';
import { uid } from 'ckeditor5/src/utils';
import { findOptimalInsertionRange } from 'ckeditor5/src/widget';
import { itemsStayOpenDefault, styleDefault } from '../bootstrapaccordionconfig';
import { createAccordionItem } from '../bootstrapaccordionutils';

/**
 * Represents a command which is executed when the accordion toolbar button is
 * pressed to insert an accordion.
 */
export default class InsertBootstrapAccordionCommand extends Command {

  /**
   * @inheritdoc
   */
  public override refresh() {
    const model = this.editor.model;
    const { document, schema } = model;

    // Determine if the cursor (selection) is in a position where adding an
    // accordion is permitted. This is based on the schema of the model(s)
    // currently containing the cursor.
    this.isEnabled = schema.checkChild(getParentElement(document.selection, model), 'bootstrapAccordion');
  }

  /**
   * @inheritdoc
   */
  public override execute() {
    const { editing, model } = this.editor;

    model.change(writer => {
      // Insert <bootstrapAccordion></bootstrapAccordion> at the current
      // selection position in a way that will result in creating a valid model
      // structure.
      const accordion = writer.createElement('bootstrapAccordion', {
        bootstrapAccordionId: uid(),
        bootstrapAccordionStyle: styleDefault,
        bootstrapAccordionItemsStayOpen: itemsStayOpenDefault
      } as { [key in AccordionModelAttribute]: string; });
      const { accordionItem } = createAccordionItem(writer);
      writer.append(accordionItem, accordion);
      model.insertContent(accordion);
      editing.view.focus();
      writer.setSelection(accordion, 'on');
    });
  }

}

/**
 * Gets the parent element of the document selection.
 *
 * @param selection
 *   The document selection.
 * @param model
 *   The data model.
 * @returns
 *   The parent element to evaluate whether an accordion can be inserted as a
 *   child.
 */
function getParentElement(selection: DocumentSelection, model: Model): Element {
  const parent = findOptimalInsertionRange(selection, model).start.parent;
  if (parent.isEmpty && !parent.is('element', '$root'))
    return parent.parent as Element;
  return parent as Element;
}
