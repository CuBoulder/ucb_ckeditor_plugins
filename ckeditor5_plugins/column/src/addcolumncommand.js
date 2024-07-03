import { Command } from 'ckeditor5/src/core';
import { getSelectedColumnRowWidget } from './columnutils';

export default class AddColumnCommand extends Command {
  execute() {
    const editor = this.editor;
    const model = editor.model;
    const selection = model.document.selection;
    const row = getSelectedColumnRowWidget(selection)

    if (row) {
      model.change(writer => {
        const paragraph = writer.createElement('paragraph');
        const newColumn = writer.createElement('ucb-column');
        writer.append(paragraph, newColumn);
        writer.append(newColumn, row);
        writer.setSelection(paragraph, 'in');
      });
    }
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const row = getSelectedColumnRowWidget(selection)
    if (row) {
      const columnCount = Array.from(row.getChildren()).filter(child => child.is('element', 'ucb-column')).length;
      this.isEnabled = columnCount < 4;
    } else {
      this.isEnabled = false;
    }
  }
}
