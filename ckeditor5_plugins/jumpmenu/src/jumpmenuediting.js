import { Plugin } from 'ckeditor5/src/core';
import { Widget, toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import InsertJumpMenuCommand from './insertjumpmenucommand';
import ModifyJumpMenuCommand from './modifyjumpmenucommand';

export default class JumpMenuEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this._defineCommands();
    this._addChangeDataListener();
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('ucbJumpMenuContainer', {
      isObject: true,
      allowWhere: '$block',
      allowAttributes: ['headerTag', 'data-title'],
      allowChildren: 'ucbJumpMenu'
    });

    schema.register('ucbJumpMenu', {
      allowIn: 'ucbJumpMenuContainer',
      isLimit: true,
      allowAttributes: ['headerTag', 'data-title']
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for('upcast').elementToElement({
      view: {
        name: 'div',
        classes: 'ucb-jump-menu-container'
      },
      model: (viewElement, { writer: modelWriter }) => {
        return modelWriter.createElement('ucbJumpMenuContainer');
      }
    });

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

    conversion.for('dataDowncast').elementToElement({
      model: 'ucbJumpMenuContainer',
      view: (modelElement, { writer: viewWriter }) => {
        return viewWriter.createContainerElement('div', { class: 'ucb-jump-menu-container' });
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'ucbJumpMenu',
      view: (modelElement, { writer: viewWriter }) => {
        return createJumpMenuView(modelElement, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'ucbJumpMenuContainer',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', { class: 'ucb-jump-menu-container' });
        return toWidget(div, viewWriter, { label: 'jump menu container', hasSelectionHandle: true });
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'ucbJumpMenu',
      view: (modelElement, { writer: viewWriter }) => {
        return createJumpMenuView(modelElement, viewWriter, true);
      }
    });
  }

  _defineCommands() {
    const editor = this.editor;
    editor.commands.add('jumpmenu', new InsertJumpMenuCommand(editor));
    editor.commands.add('modifyJumpMenuHeaderTag', new ModifyJumpMenuCommand(editor, 'headerTag', 'h2'));
    editor.commands.add('modifyJumpMenuTitle', new ModifyJumpMenuCommand(editor, 'data-title', ''));
  }

  _addChangeDataListener() {
    const editor = this.editor;
    editor.model.document.on('change:data', () => {
      document.querySelectorAll('ucb-jump-menu').forEach(element => {
        if (element instanceof HTMLElement && typeof element.build === 'function') {
          element.build();
        }
      });
    });
  }
}

function createJumpMenuView(modelElement, viewWriter, widget = false) {
  const headerTag = modelElement.getAttribute('headerTag') || 'h2';
  const title = modelElement.getAttribute('data-title') || '';
  const jumpMenuElement = viewWriter.createContainerElement('ucb-jump-menu', {
    headertag: headerTag,
    'data-title': title
  });

  if (widget) {
    return jumpMenuElement;
  }

  return jumpMenuElement;
}
