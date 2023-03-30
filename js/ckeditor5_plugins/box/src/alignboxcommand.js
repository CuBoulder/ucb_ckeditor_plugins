import { Command } from 'ckeditor5/src/core';
import { getSelectedBoxWidget } from './boxutils';

export default class AlignBoxCommand extends Command {
	refresh() {
		const editor = this.editor, box = getSelectedBoxWidget(editor.model.document.selection);
		this.isEnabled = !!box;
		if (this.isEnabled)
			this.value = box.getAttribute('boxAlignment');
		else this.value = 'none';
	}
	/**
	 * 
	 * @param {*} options 
	 * @fires execute
	 */
	execute(options = { value: 'none' }) {
		const editor = this.editor, box = getSelectedBoxWidget(editor.model.document.selection);
		if (box)
			editor.model.change(writer => writer.setAttribute('boxAlignment', options.value, box));
	}
};
