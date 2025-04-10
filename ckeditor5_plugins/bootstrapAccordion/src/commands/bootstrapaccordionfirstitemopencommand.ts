import { Command } from 'ckeditor5/src/core';
import { getSelectedAccordionModelElement, isAccordionItemOpen, setAccordionItemIsOpen } from '../bootstrapaccordionutils';
import type { Element } from 'ckeditor5/src/engine';

/**
 * Represents a command which is executed to modify attributes of the accordion
 * from the widget toolbar.
 */
export default class BootstrapAccordionFirstItemOpenCommand extends Command {

  /**
   * The selected accordion widget.
   */
  public accordionWidget?: Element | null;

  /**
   * The value of this command.
   */
  public override value: boolean;

  /**
   * @inheritdoc
   */
  public override refresh() {
    const model = this.editor.model;
    this.accordionWidget = getSelectedAccordionModelElement(model.document.selection);
    // Disables any BootstrapAccordionFirstItemOpenCommand if there is no
    // selected accordion.
    this.isEnabled = !!this.accordionWidget;
    this.value = this.isEnabled && isAccordionItemOpen(this.accordionWidget!.getChild(0) as Element);
  }

  /**
   * @inheritdoc
   */
  public override execute(options: { value: boolean } = { value: false }) {
    this.editor.model.change(writer =>
      setAccordionItemIsOpen(this.accordionWidget!.getChild(0) as Element, writer, options.value));
  }

}
