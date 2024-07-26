import { Command } from 'ckeditor5/src/core';

export default class InsertJumpMenuCommand extends Command {
  constructor(editor) {
    super(editor);
    this.set('isEnabled', true);
  }

  execute(options = { jumpMenuHeaderTag: 'h2', jumpMenuTitle: 'On this page:' }) {
    const headerTag = options.jumpMenuHeaderTag.trim();
    const title = options.jumpMenuTitle.trim();
    const model = this.editor.model;

    model.change(writer => {
      const jumpMenuElement = writer.createElement('ucbJumpMenu', { jumpMenuHeaderTag: headerTag, jumpMenuTitle: title });
      model.insertContent(jumpMenuElement, model.document.selection);
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;
    const selectedElement = selection.getSelectedElement();

    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'ucbJumpMenu'
    );

    this.isEnabled = allowedIn !== null;
  }
}
