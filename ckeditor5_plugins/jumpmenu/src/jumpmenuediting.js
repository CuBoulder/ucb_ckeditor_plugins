/**
 * @file defines schemas, converters, and commands for the jump menu plugin.
 */
import { Plugin } from 'ckeditor5/src/core';
import { Widget, toWidget } from 'ckeditor5/src/widget';
import InsertJumpMenuCommand from './insertjumpmenucommand';
import ModifyJumpMenuCommand from './modifyjumpmenucommand';

export default class JumpMenuEditing extends Plugin {
  static get pluginName() {
    return 'JumpMenuEditing';
  }

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

    schema.register('ucbJumpMenu', {
      isObject: true,
      allowWhere: '$block',
      allowAttributes: ['jumpMenuHeaderTag', 'jumpMenuTitle']
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for('upcast').attributeToAttribute({
      model: 'jumpMenuHeaderTag',
      view: 'headertag'
    });
    conversion.for('dataDowncast').attributeToAttribute({
      model: 'jumpMenuHeaderTag',
      view: 'headertag'
    });

    conversion.for('upcast').attributeToAttribute({
      model: 'jumpMenuTitle',
      view: 'data-title'
    });
    conversion.for('dataDowncast').attributeToAttribute({
      model: 'jumpMenuTitle',
      view: 'data-title'
    });

    conversion.for('upcast').elementToElement({
      model: 'ucbJumpMenu',
      view: 'ucb-jump-menu'
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'ucbJumpMenu',
      view: 'ucb-jump-menu'
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'ucbJumpMenu',
      view: (modelElement, { writer: viewWriter }) => createJumpMenuWidgetView(modelElement, viewWriter)
    });

    conversion.for('editingDowncast').add(dispatcher => {
      dispatcher.on('attribute:jumpMenuHeaderTag', (_evt, data, conversionApi) => attributeChange(data, conversionApi));
      dispatcher.on('attribute:jumpMenuTitle', (_evt, data, conversionApi) => attributeChange(data, conversionApi));
    });
  }

  _defineCommands() {
    const editor = this.editor;
    editor.commands.add('jumpmenu', new InsertJumpMenuCommand(editor));
    editor.commands.add('modifyJumpMenuHeaderTag', new ModifyJumpMenuCommand(editor, 'jumpMenuHeaderTag', 'h2'));
    editor.commands.add('modifyJumpMenuTitle', new ModifyJumpMenuCommand(editor, 'jumpMenuTitle', ''));
  }
}

function createJumpMenuWidgetView(modelElement, viewWriter) {
  const widgetElement = viewWriter.createContainerElement('div', { class: 'ckeditor5-jumpmenu__widget' }, [
    viewWriter.createRawElement('div', {}, domElement => {
      const headerTag = getHeaderTag(modelElement);
      const title = getTitle(modelElement);
      domElement.innerHTML = `<ucb-jump-menu headertag="${sanitize(headerTag)}" data-title="${sanitize(title)}"></ucb-jump-menu>`;
    })
  ]);

  return toWidget(widgetElement, viewWriter, { label: 'jump menu widget' });
}

function getHeaderTag(modelElement) {
  return modelElement.getAttribute('jumpMenuHeaderTag') || 'h2';
}

function getTitle(modelElement) {
  return modelElement.getAttribute('jumpMenuTitle') || '';
}

/**
 * Sanitizes an HTML attribute's value.
 *
 * @param { string } value
 *   The attribute value.
 * @returns
 *   The sanitized value.
 */
function sanitize(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

/**
 * Responds to a changed Jump Menu attribute.
 *
 * @param { object } data
 *   Additional information about the change.
 * @param { import('@ckeditor/ckeditor5-engine').DowncastConversionApi } conversionApi
 *   The conversion instance used to manipulate the data during conversion.
 */
function attributeChange(data, conversionApi) {
  if (data.attributeOldValue && !conversionApi.consumable.consume(data.item, 'insert')) {
    conversionApi.writer.remove(conversionApi.mapper.toViewRange(data.range));
    conversionApi.convertItem(data.item);
  }
}
