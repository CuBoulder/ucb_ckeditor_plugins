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
      allowAttributes: ['headerTag', 'data-title']
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for('upcast').elementToElement({
      view: {
        name: 'ucb-jump-menu',
        attributes: {
          headertag: true,
          'data-title': true
        }
      },
      model: (viewElement, { writer: modelWriter }) => {
        return modelWriter.createElement('ucbJumpMenu', {
          headerTag: viewElement.getAttribute('headertag'),
          'data-title': viewElement.getAttribute('data-title')
        });
      }
    });

    conversion.attributeToAttribute({ model: 'headerTag', view: 'headertag' });
    conversion.attributeToAttribute({ model: 'data-title', view: 'data-title' });

    conversion.for('dataDowncast').elementToElement({
      model: 'ucbJumpMenu',
      view: (modelElement, { writer: viewWriter }) => createJumpMenuView(modelElement, viewWriter)
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'ucbJumpMenu',
      view: (modelElement, { writer: viewWriter }) => createJumpMenuWidgetView(modelElement, viewWriter)
    });
  }

  _defineCommands() {
    const editor = this.editor;
    editor.commands.add('jumpmenu', new InsertJumpMenuCommand(editor));
    editor.commands.add('modifyJumpMenuHeaderTag', new ModifyJumpMenuCommand(editor, 'headerTag', 'h2'));
    editor.commands.add('modifyJumpMenuTitle', new ModifyJumpMenuCommand(editor, 'data-title', ''));
  }
}

function createJumpMenuView(modelElement, viewWriter) {
  const headerTag = getHeaderTag(modelElement);
  const title = getTitle(modelElement);
  return viewWriter.createContainerElement('ucb-jump-menu', {
    headertag: headerTag,
    'data-title': title
  });
}

function createJumpMenuWidgetView(modelElement, viewWriter) {
  const widgetElement = viewWriter.createContainerElement('span', { class: 'ckeditor5-jumpmenu__widget' });

  const rawElement = viewWriter.createRawElement('span', {}, domElement => {
    updateJumpMenuView(domElement, modelElement);
  });

  viewWriter.insert(viewWriter.createPositionAt(widgetElement, 0), rawElement);

  return toWidget(widgetElement, viewWriter, { label: 'jump menu widget' });
}

function updateJumpMenuView(domElement, modelElement) {
  const headerTag = getHeaderTag(modelElement);
  const title = getTitle(modelElement);

  const ucbJumpMenuElement = domElement.querySelector('ucb-jump-menu');

  if (ucbJumpMenuElement) {
    ucbJumpMenuElement.setAttribute('headertag', headerTag);
    ucbJumpMenuElement.setAttribute('data-title', title);
  } else {
    domElement.innerHTML = `<ucb-jump-menu headertag="${headerTag}" data-title="${title}"></ucb-jump-menu>`;
  }

  if (domElement.build) {
    domElement.build();
  }
}

function getHeaderTag(modelElement) {
  return modelElement.getAttribute('headerTag') || 'h2';
}

function getTitle(modelElement) {
  return modelElement.getAttribute('data-title') || '';
}
