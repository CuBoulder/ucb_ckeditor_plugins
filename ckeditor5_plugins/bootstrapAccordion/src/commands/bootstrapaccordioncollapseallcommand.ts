import { Command } from 'ckeditor5/src/core';
import { getSelectedAccordionModelElement, setAccordionItemIsOpen } from '../bootstrapaccordionutils';
import type { Element } from 'ckeditor5/src/engine';

/**
 * Represents a command which is executed to collapse all items in an
 * accordion.
 */
export default class BootstrapAccordionCollapseAllCommand extends Command {

  /**
   * The selected accordion widget.
   */
  public accordionWidget?: Element | null;

  /**
   * @inheritdoc
   */
  public override refresh() {
    this.accordionWidget = getSelectedAccordionModelElement(this.editor.model.document.selection);
    // Disables any BootstrapAccordionOpenAllCommand if there is no selected
    // accordion or only one item can be open at once.
    this.isEnabled = !!this.accordionWidget;
  }

  /**
   * @inheritdoc
   */
  public override execute(options: { omitFirst: boolean } = { omitFirst: false }) {
    const accordionItemIterator = this.accordionWidget!.getChildren();
    if (options.omitFirst) {
      accordionItemIterator.next();
    }
    this.editor.model.change(writer =>
      [...accordionItemIterator].forEach(accordionItem =>
        setAccordionItemIsOpen(accordionItem as Element, writer, false)));
  }

}
