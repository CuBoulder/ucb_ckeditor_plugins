import { Command } from 'ckeditor5/src/core';

export default class ModifyJumpMenuCommand extends Command {
  constructor(editor, attributeName, defaultValue) {
    super(editor);
    this.attributeName = attributeName;
    this.defaultValue = defaultValue;
    this.set('value', this.defaultValue);
  }

  execute(options = {}) {
    const { value } = options;
    const model = this.editor.model;
    const selectedElement = model.document.selection.getSelectedElement();

    model.change(writer => {
      if (selectedElement && selectedElement.name === 'ucbJumpMenu') {
        writer.setAttribute(this.attributeName, value, selectedElement);
      }
    });

    this.value = value;
  }

  refresh() {
    const model = this.editor.model;
    const selectedElement = model.document.selection.getSelectedElement();

    if (selectedElement && selectedElement.name === 'ucbJumpMenu') {
      this.value = selectedElement.getAttribute(this.attributeName) || this.defaultValue;
    } else {
      this.value = this.defaultValue;
    }

    this.isEnabled = !!selectedElement && selectedElement.name === 'ucbJumpMenu';
  }
}
