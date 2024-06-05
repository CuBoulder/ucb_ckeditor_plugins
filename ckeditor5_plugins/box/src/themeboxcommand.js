/** 
 * @file defines ThemeBoxCommand, which behaves identically to ModifyBoxCommand but disables the command if boxStyle = `none`.
 */

import { getSelectedBoxWidget } from './boxutils';
import ModifyBoxCommand from './modifyboxcommand';

export default class ThemeBoxCommand extends ModifyBoxCommand {
  /**
   * @inheritdoc
   */
   refresh() {
    const model = this.editor.model, box = getSelectedBoxWidget(model.document.selection), attributeName = this.attributeName, defaultValue = this.defaultValue;
    this.isEnabled = box ? box.getAttribute('boxStyle') !== 'none': false; // Disables any ThemeBoxCommand if there is no selected box or if boxStyle = `none`
    if (this.isEnabled)
      this.value = box.getAttribute(attributeName); // Sets the `value` of this ModifyBoxCommand to the attribute of the selected box
    else this.value = defaultValue;
  }
}
