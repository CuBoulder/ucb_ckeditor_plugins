import { Command } from 'ckeditor5/src/core';
import {findInvisibleElement, removeInvisible} from './invisibleutils'

export default class RemoveInvisibleCommand extends Command {
  execute() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const invisibleElement = findInvisibleElement(selection.getSelectedElement());

    if (!invisibleElement) {
      return;
    }

    model.change(writer => {
      removeInvisible(writer, invisibleElement);
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const invisibleElement = findInvisibleElement(selection.getSelectedElement());
    this.isEnabled = !!invisibleElement;
  }
}
