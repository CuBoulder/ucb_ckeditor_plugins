import { Command } from 'ckeditor5/src/core';

export default class InsertRowWithColumnsCommand extends Command {
  execute() {
    const editor = this.editor;
    editor.model.change(writer => {
      const row = writer.createElement('ucb-row');
      const column1 = writer.createElement('ucb-column');
      const column2 = writer.createElement('ucb-column');

      writer.append(column1, row);
      writer.append(column2, row);

      editor.model.insertContent(row);

      writer.setSelection(column1, 'in');
    });
  }

  refresh() {
    this.isEnabled = true;
  }
}
