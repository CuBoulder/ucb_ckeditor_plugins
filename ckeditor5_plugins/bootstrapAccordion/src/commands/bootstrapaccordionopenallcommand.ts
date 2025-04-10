import { Command } from 'ckeditor5/src/core';
import { getSelectedAccordionModelElement, setAccordionItemIsOpen } from '../bootstrapaccordionutils';
import type { Element } from 'ckeditor5/src/engine';

/**
 * Represents a command which is executed to open all items in an accordion.
 */
export default class BootstrapAccordionOpenAllCommand extends Command {

  /**
   * The selected accordion widget.
   */
  public accordionWidget?: Element | null;

  /**
   * @inheritdoc
   */
  public override refresh() {
    const model = this.editor.model;
    this.accordionWidget = getSelectedAccordionModelElement(model.document.selection);
    // Disables any BootstrapAccordionOpenAllCommand if there is no selected
    // accordion or only one item can be open at once.
    this.isEnabled = !!this.accordionWidget && this.accordionWidget.getAttribute('bootstrapAccordionItemsStayOpen') === 'true';
  }

  /**
   * @inheritdoc
   */
  public override execute() {
    this.editor.model.change(writer =>
      [...this.accordionWidget!.getChildren()].forEach(accordionItem =>
        setAccordionItemIsOpen(accordionItem as Element, writer, true)));
  }

}
