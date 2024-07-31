import { Command } from 'ckeditor5/src/core';

export default class RemoveColumnCommand extends Command {
  execute() {
    const editor = this.editor;
    const model = editor.model;
    const selection = model.document.selection;
    const column = selection.getFirstPosition().findAncestor('ucb-column');

    if (column) {
      model.change(writer => {
        writer.remove(column);
      });
    }
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const column = selection.getFirstPosition().findAncestor('ucb-column');

    if (column) {
      const row = column.parent;
      const columnCount = Array.from(row.getChildren()).filter(child => child.is('element', 'ucb-column')).length;
      this.isEnabled = columnCount > 2;
    } else {
      this.isEnabled = false;
    }
  }
}
