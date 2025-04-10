import { Command } from 'ckeditor5/src/core';
import { getSelectedAccordionModelElement } from '../bootstrapaccordionutils';
import type { Editor } from 'ckeditor5/src/core';
import type { ModelAttributeDefinition } from '../bootstrapaccordiontypes';
import type { Element } from 'ckeditor5/src/engine';

/**
 * Represents a command which is executed to modify attributes of the accordion
 * from the widget toolbar.
 */
export default class ModifyBootstrapAccordionCommand<T extends string, D extends ModelAttributeDefinition<T> = ModelAttributeDefinition<T>> extends Command {

  /** 
   * The name of the attribute this command modifies.
   */
  protected readonly attributeName: D[1];

  /**
   * The default value to set if there isn't one specified.
   */
  protected readonly defaultValue: T;

  /**
   * The value of this command.
   */
  public override value: T;

  /**
   * The selected accordion widget.
   */
  public accordionWidget?: Element | null;

  /**
   * Constructs a new ModifyBootstrapAccordionCommand.
   *
   * @param editor
   *   The editor.
   * @param attributeName
   *   The name of the attribute this command modifies.
   * @param defaultValue
   *   The default value to set if there isn't one specified.
   */
  public constructor(editor: Editor, attributeName: D[1], defaultValue: T) {
    super(editor);
    this.attributeName = attributeName;
    this.defaultValue = defaultValue;
    this.value = defaultValue;
  }

  /**
   * @inheritdoc
   */
  public override refresh() {
    const model = this.editor.model;
    const attributeName = this.attributeName
    const defaultValue = this.defaultValue;
    this.accordionWidget = getSelectedAccordionModelElement(model.document.selection);
    // Disables any ModifyBootstrapAccordionCommand if there is no selected
    // accordion.
    this.isEnabled = !!this.accordionWidget;
    this.value = defaultValue;
    if (this.isEnabled && this.accordionWidget!.hasAttribute(attributeName)) {
      // Sets the `value` of this ModifyBootstrapAccordionCommand to the
      // attribute of the selected accordion.
      this.value = this.accordionWidget!.getAttribute(attributeName) as T;
    }
  }

  /**
   * @inheritdoc
   */
  public override execute(options: { value: T } = { value: this.defaultValue }) {
    const model = this.editor.model;
    const accordionWidget = this.accordionWidget;
    // Sets the attribute of the selected accordion to a new value upon
    // execution of this command.
    model.change(writer => writer.setAttribute(this.attributeName, options.value, accordionWidget!));
  }

}
