import { Command } from 'ckeditor5/src/core';

export default class AddColumnPositionCommand extends Command {
  execute({ position }) {
    const editor = this.editor;
    const model = editor.model;
    const selection = model.document.selection;
    const selectedColumn = selection.getFirstPosition().findAncestor('ucb-column');

    if (selectedColumn) {
      model.change(writer => {
        const newColumn = writer.createElement('ucb-column');
        const paragraph = writer.createElement('paragraph');
        writer.append(paragraph, newColumn);

        if (position === 'left') {
          writer.insert(newColumn, selectedColumn, 'before');
        } else if (position === 'right') {
          writer.insert(newColumn, selectedColumn, 'after');
        }
        writer.setSelection(paragraph, 'in');
      });
    }
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const selectedColumn = selection.getFirstPosition().findAncestor('ucb-column');

    if (selectedColumn) {
      const row = selectedColumn.parent;
      const columnCount = Array.from(row.getChildren()).filter(child => child.is('element', 'ucb-column')).length;
      this.isEnabled = columnCount < 4;
    } else {
      this.isEnabled = false;
    }
  }
}
