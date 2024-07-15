import { Command } from 'ckeditor5/src/core';

export default class InsertJumpMenuCommand extends Command {
  constructor(editor) {
    super(editor);
    this.set('isEnabled', true);
    this.set('existingJumpMenuSelected', false);
  }

  execute(options = { headerTag: 'h2' }) {
    const headerTag = options.headerTag.trim();
    const model = this.editor.model;

    model.change(writer => {
      const jumpMenuElement = writer.createElement('ucbJumpMenu', { headerTag });
      model.insertContent(jumpMenuElement, model.document.selection);
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;
    const selectedElement = selection.getSelectedElement();

    const jumpMenuAllowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'ucbJumpMenu');

    this.isEnabled = jumpMenuAllowedIn !== null;
    this.existingJumpMenuSelected = isJumpMenuElement(selectedElement) ? selectedElement : null;
  }
}

function isJumpMenuElement(element) {
  return element && element.name === 'ucbJumpMenu';
}
