import { Command } from 'ckeditor5/src/core';

export default class InsertJumpMenuCommand extends Command {
  constructor(editor) {
    super(editor);
    this.set('isEnabled', true);
  }

  execute(options = { headerTag: 'h2', title: 'On this page:' }) {
    const headerTag = options.headerTag.trim();
    const title = options.title.trim();
    const model = this.editor.model;

    model.change(writer => {
      const jumpMenuContainer = writer.createElement('ucbJumpMenuContainer');
      const jumpMenuElement = writer.createElement('ucbJumpMenu', { headerTag, 'data-title': title });
      writer.append(jumpMenuElement, jumpMenuContainer);
      model.insertContent(jumpMenuContainer, model.document.selection);
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;
    const selectedElement = selection.getSelectedElement();

    const jumpMenuAllowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'ucbJumpMenuContainer');

    this.isEnabled = jumpMenuAllowedIn !== null;
  }
}
