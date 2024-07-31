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

    schema.addChildCheck((context, childDefinition) => {
      if (context.endsWith('boxTitle') || context.endsWith('bootstrapAccordionHeader')) {
        if (childDefinition.name === 'ucb-row' || childDefinition.name === 'ucb-column') {
          return false;
        }
      }
    });
  }

  _defineConverters() {
    const { conversion, editing } = this.editor;

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
      view: (modelElement, { writer: viewWriter }) => createRowView(viewWriter)
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'ucb-column',
      view: (modelElement, { writer: viewWriter }) => createColumnView(viewWriter)
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'ucb-row',
      view: (modelElement, { writer: viewWriter }) => createRowView(viewWriter, true)
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'ucb-column',
      view: (modelElement, { writer: viewWriter }) => createColumnView(viewWriter, true)
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

/**
 * Creates the view element for a row.
 *
 * @param {DowncastWriter} viewWriter The downcast writer.
 * @param {boolean} [widget=false] Whether to create a widget.
 * @returns {ContainerElement} The view element.
 */
function createRowView(viewWriter, widget = false) {
  const div = viewWriter.createContainerElement('div', { class: 'row ucb-column-container' });
  if (widget) {
    return toWidget(div, viewWriter, { label: 'row widget', hasSelectionHandle: true });
  }
  return div;
}

/**
 * Creates the view element for a column.
 *
 * @param {DowncastWriter} viewWriter The downcast writer.
 * @param {boolean} [widget=false] Whether to create a widget.
 * @returns {ContainerElement} The view element.
 */
function createColumnView(viewWriter, widget = false) {
  const div = viewWriter.createEditableElement('div', { class: 'col ucb-column' });
  if (widget) {
    return toWidgetEditable(div, viewWriter);
  }
  return div;
}
