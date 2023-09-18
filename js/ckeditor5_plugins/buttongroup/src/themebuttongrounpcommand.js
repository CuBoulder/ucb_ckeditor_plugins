/** 
 * @file defines ThemeButtonGroupCommand, which behaves identically to ModifyButtonGroupCommand but disables the command if color = `none`.
 */

import { getSelectedButtonGroupWidget } from './buttongrouputils';
import ModifyButtonGroupCommand from './modifybuttongroupcommand';

export default class ThemeButtonGroupCommand extends ModifyButtonGroupCommand {
	/**
	 * @inheritdoc
	 */
	 refresh() {
		const model = this.editor.model, buttongroup = getSelectedButtonGroupWidget(model.document.selection), attributeName = this.attributeName, defaultValue = this.defaultValue;
		this.isEnabled = buttongroup ? buttongroup.getAttribute('buttonGroupColor') !== 'none': false; // Disables any ThemeButtonGroup if there is no selected box or if boxStyle = `none`
		if (this.isEnabled)
			this.value = buttongroup.getAttribute(attributeName); // Sets the `value` of this ModifyButtonGroup to the attribute of the selected bg
		else this.value = defaultValue;
	}
}
