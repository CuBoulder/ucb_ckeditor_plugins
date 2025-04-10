import type { Element, PositionOffset } from 'ckeditor5/src/engine';
import { Command } from 'ckeditor5/src/core';
import { createAccordionItem, getSelectedAccordionItemModelElement, isAccordionItemOpen, setAccordionItemIsOpen } from '../bootstrapaccordionutils';

/**
 * Represents a command which is executed when the insert item above or insert
 * item below button is pressed with an accordion item selected.
 */
export default class InsertBootstrapAccordionItemCommand extends Command {

  /**
   * The currently-selected accordion item.
   */
  protected accordionItem?: Element | null;

  /**
   * @inheritdoc
   */
  public override refresh() {
    const selection = this.editor.model.document.selection;
    this.accordionItem = getSelectedAccordionItemModelElement(selection);
    this.isEnabled = !!this.accordionItem;
  }

  /**
   * @inheritdoc
   */
  public override execute(options: { value: PositionOffset }) {
    const { commands, model } = this.editor
    const accordionItem = this.accordionItem!;
    const value = options.value;
    model.change(writer => {
      let isOpen = commands.get('bootstrapAccordionItemsStayOpen')?.value === 'true' && isAccordionItemOpen(accordionItem);
      const accordion = accordionItem.parent as Element;
      if (accordion.getChildIndex(accordionItem) === 0) {
        const secondAccordionItem = accordion.getChild(1);
        const secondAccordionItemIsOpen = secondAccordionItem ? isAccordionItemOpen(secondAccordionItem as Element) : false;
        if (value === 'before') {
          // An accordion item is being inserted above the first item, and the
          // "open first item" setting is on. Closes the item as it will no
          // longer be the first.
          isOpen = !!commands.get('bootstrapAccordionFirstItemOpen')?.value;
          setAccordionItemIsOpen(accordionItem, writer, secondAccordionItemIsOpen);
        } else {
          isOpen = secondAccordionItemIsOpen;
        }
      }
      const newAccordionItem = createAccordionItem(writer, isOpen).accordionItem;
      writer.insert(newAccordionItem, accordionItem, value);
    });
  }

}
