import { Command } from 'ckeditor5/src/core';

export default class ModifyJumpMenuCommand extends Command {
  constructor(editor, attributeName, defaultValue) {
    super(editor);
    this.attributeName = attributeName;
    this.defaultValue = defaultValue;
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const selectedElement = selection.getSelectedElement();

    this.isEnabled = selectedElement && selectedElement.is('element', 'ucbJumpMenu');
    if (this.isEnabled) {
      this.value = selectedElement.getAttribute(this.attributeName);
    } else {
      this.value = this.defaultValue;
    }
  }

  execute(options = { value: '' }) {
    const model = this.editor.model;
    const selection = model.document.selection;
    const selectedElement = selection.getSelectedElement();

    if (selectedElement && selectedElement.is('element', 'ucbJumpMenu')) {
      model.change(writer => {
        writer.setAttribute(this.attributeName, options.value || this.defaultValue, selectedElement);
      });
    }
  }
}
