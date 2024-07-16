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
      if (selectedElement && selectedElement.name === 'ucbJumpMenuContainer') {
        const jumpMenuElement = Array.from(selectedElement.getChildren()).find(child => child.name === 'ucbJumpMenu');
        if (jumpMenuElement) {
          writer.setAttribute(this.attributeName, value, jumpMenuElement);
        }
      }
    });

    this.value = value;
  }

  refresh() {
    const model = this.editor.model;
    const selectedElement = model.document.selection.getSelectedElement();

    if (selectedElement && selectedElement.name === 'ucbJumpMenuContainer') {
      const jumpMenuElement = Array.from(selectedElement.getChildren()).find(child => child.name === 'ucbJumpMenu');
      if (jumpMenuElement) {
        this.value = jumpMenuElement.getAttribute(this.attributeName) || this.defaultValue;
        this.isEnabled = true;
      } else {
        this.value = this.defaultValue;
        this.isEnabled = false;
      }
    } else {
      this.value = this.defaultValue;
      this.isEnabled = false;
    }
  }
}
