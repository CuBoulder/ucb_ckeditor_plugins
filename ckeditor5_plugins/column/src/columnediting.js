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
  }

  _defineConverters() {
    const { conversion } = this.editor;

    conversion.for('upcast').elementToElement({
      model: 'ucb-row',
      view: {
        name: 'div',
        classes: ['row', 'ucb-column-container']
      }
    });

    conversion.for('upcast').elementToElement({
      model: 'ucb-column',
      view: {
        name: 'div',
        classes: ['col', 'ucb-column']
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'ucb-row',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', { class: 'row ucb-column-container' });
        return toWidget(div, viewWriter, { label: 'row widget', hasSelectionHandle: true });
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'ucb-column',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', { class: 'col ucb-column' });
        return toWidgetEditable(div, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'ucb-row',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', { class: 'row ucb-column-container' });
        return toWidget(div, viewWriter, { label: 'row widget', hasSelectionHandle: true });
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'ucb-column',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', { class: 'col ucb-column' });
        return toWidgetEditable(div, viewWriter);
      }
    });

    // Add the class for visual cue when ucb-row is selected
    conversion.for('editingDowncast').add(dispatcher => {
      dispatcher.on('insert:ucb-row', (evt, data, conversionApi) => {
        const viewElement = conversionApi.mapper.toViewElement(data.item);
        const writer = conversionApi.writer;

        writer.addClass('ucb-row_selected', viewElement);
      });
    });
  }

  _defineCommands() {
    const commands = this.editor.commands;
    commands.add('insertRowWithColumns', new InsertRowWithColumnsCommand(this.editor));
    commands.add('addColumn', new AddColumnCommand(this.editor));
    commands.add('removeColumn', new RemoveColumnCommand(this.editor));
  }
}
