import type { Element } from 'ckeditor5/src/engine';
import { Command } from 'ckeditor5/src/core';
import { getSelectedAccordionItemModelElement, setAccordionItemIsOpen } from '../bootstrapaccordionutils';

/**
 * Represents a command which is executed when the delete item button is
 * pressed with an accordion item selected.
 */
export default class RemoveBootstrapAccordionItemCommand extends Command {

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
    // Disables the remove command if the accordion has only one item.
    this.isEnabled = this.accordionItem ? 1 < Array.from(this.accordionItem!.parent!.getChildren()).length : false;
  }

  /**
   * @inheritdoc
   */
  public override execute() {
    const editor = this.editor;
    const { commands, model } = editor
    const accordionItem = this.accordionItem!;
    model.change(writer => {
      if (commands.get('bootstrapAccordionFirstItemOpen')?.value) {
        const accordion = accordionItem.parent as Element;
        // The accordion item being removed is the first item, and the "open
        // first item" setting is on. Opens the item below it as it will now be
        // the first item.
        if (accordion.getChildIndex(accordionItem) === 0) {
          setAccordionItemIsOpen(accordion.getChild(1) as Element, writer, true);
        }
      }
      writer.remove(accordionItem);
    });
  }

}
