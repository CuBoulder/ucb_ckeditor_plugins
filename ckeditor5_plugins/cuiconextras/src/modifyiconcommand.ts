/** 
 * @file defines ModifyIconCommand, which is executed to modify attributes of the icon from the widget toolbar.
 */

import { Command } from 'ckeditor5/src/core';
import { getSelectedIconWidget } from './cuiconextrasutils';
import type { Editor } from 'ckeditor5/src/core';
import type { ModelAttributeDefiniton } from './cuiconextrasconfig';
import type { Element } from 'ckeditor5/src/engine';

/**
 * Represents a command which is executed to modify attributes of the icon from the widget toolbar.
 */
export default class ModifyIconCommand<T extends string, D extends ModelAttributeDefiniton<T> = ModelAttributeDefiniton<T>> extends Command {
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
   * The selected icon widget.
   */
  public iconWidget: Element | null = null;

  /**
   * Constructs a new ModifyIconCommand.
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
    const model = this.editor.model, attributeName = this.attributeName, defaultValue = this.defaultValue;
    this.iconWidget = getSelectedIconWidget(model.document.selection);
    this.isEnabled = !!this.iconWidget; // Disables any ModifyIconCommand if there is no selected icon
    if (this.isEnabled)
      this.value = this.iconWidget!.hasAttribute(attributeName) ? this.iconWidget!.getAttribute(attributeName) as T : defaultValue; // Sets the `value` of this ModifyIconCommand to the attribute of the selected icon
    else this.value = defaultValue;
  }

  /**
   * @inheritdoc
   */
  public override execute(options: { value: T } = { value: this.defaultValue }) {
    const model = this.editor.model, iconWidget = this.iconWidget, attributeName = this.attributeName, defaultValue = this.defaultValue;
    if (iconWidget)
      model.change(writer => writer.setAttribute(attributeName, options.value || defaultValue, iconWidget)); // Sets the attribute of the selected icon to a new value upon execution of this command
  }
}
