import { Command } from 'ckeditor5/src/core';

export default class AddColumnCommand extends Command {
  execute() {
    const editor = this.editor;
    const model = editor.model;
    const selection = model.document.selection;
    const row = selection.getFirstPosition().findAncestor('ucb-row');

    if (row) {
      model.change(writer => {
        const column = writer.createElement('ucb-column');
        writer.append(column, row);
      });
    }
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const row = selection.getFirstPosition().findAncestor('ucb-row');

    this.isEnabled = !!row;
  }
}
