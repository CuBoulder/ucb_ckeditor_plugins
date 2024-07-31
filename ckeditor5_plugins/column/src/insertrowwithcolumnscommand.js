import { Command } from 'ckeditor5/src/core';

export default class InsertRowWithColumnsCommand extends Command {
  execute() {
    const editor = this.editor;
    editor.model.change(writer => {
      const row = writer.createElement('ucb-row');
      const column1 = writer.createElement('ucb-column');
      const column2 = writer.createElement('ucb-column');

      // Create paragraphs inside the columns to make them editable
      const paragraph1 = writer.createElement('paragraph');
      const paragraph2 = writer.createElement('paragraph');

      writer.append(paragraph1, column1);
      writer.append(paragraph2, column2);

      writer.append(column1, row);
      writer.append(column2, row);

      editor.model.insertContent(row);
      writer.setSelection(paragraph1, 'in');
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'ucb-row'
    );

    this.isEnabled = allowedIn !== null;
  }
}
