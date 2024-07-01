import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertRowWithColumnsCommand from './insertrowwithcolumnscommand';
import AddColumnCommand from './addcolumncommand';
import RemoveColumnCommand from './removecolumncommand';

export default class ColumnEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this._defineCommands();
  }

  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.register('ucb-row', {
      isObject: true,
      allowWhere: '$block',
      allowChildren: 'ucb-column'
    });

    schema.register('ucb-column', {
      allowIn: 'ucb-row',
      allowContentOf: '$root'
    });

    // schema.addChildCheck((context, childDefinition) => {
    //   if (context.endsWith('ucb-column') && childDefinition.name === 'ucb-row') {
    //     return false;
    //   }
    // });
  }

  _defineConverters() {
    const { conversion, editing } = this.editor;

    conversion.for('upcast').elementToElement({
      model: 'ucb-row',
      view: {
        name: 'div',
        classes: 'row'
      }
    });

    conversion.for('upcast').elementToElement({
      model: 'ucb-column',
      view: {
        name: 'div',
        classes: 'col'
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'ucb-row',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', { class: 'row' });
        return toWidget(div, viewWriter, { label: 'row widget' });
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'ucb-column',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', { class: 'col' });
        return toWidgetEditable(div, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'ucb-row',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', { class: 'row' });
        return toWidget(div, viewWriter, { label: 'row widget' });
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'ucb-column',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', { class: 'col' });
        return toWidgetEditable(div, viewWriter);
      }
    });
  }

  _defineCommands() {
    const commands = this.editor.commands;
    commands.add('insertRowWithColumns', new InsertRowWithColumnsCommand(this.editor));
    commands.add('addColumn', new AddColumnCommand(this.editor));
    commands.add('removeColumn', new RemoveColumnCommand(this.editor));
  }
}
