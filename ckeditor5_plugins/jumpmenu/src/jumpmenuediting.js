import { Plugin } from 'ckeditor5/src/core';
import { Widget, toWidget } from 'ckeditor5/src/widget';
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
      allowAttributes: ['headerTag', 'title'],
      allowChildren: 'ucbJumpMenu'
    });

    schema.register('ucbJumpMenu', {
      allowIn: 'ucbJumpMenuContainer',
      isLimit: true,
      allowAttributes: ['headerTag', 'title']
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    // Upcast converters
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
          title: true
        }
      },
      model: (viewElement, { writer: modelWriter }) => {
        return modelWriter.createElement('ucbJumpMenu', {
          headerTag: viewElement.getAttribute('headertag'),
          title: viewElement.getAttribute('title')
        });
      }
    });

    // Downcast converters for data
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

    // Downcast converters for editing
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
    editor.commands.add('modifyJumpMenuTitle', new ModifyJumpMenuCommand(editor, 'title', ''));
  }

  // This allows us to force a reload in editior, otherwise the <li> items dont display
  _addChangeDataListener() {
    const editor = this.editor;
    editor.model.document.on('change:data', () => {
      document.querySelectorAll('ucb-jump-menu').forEach(element => {
        element.build();
      });
    });
  }
}

function createJumpMenuView(modelElement, viewWriter, widget = false) {
  const headerTag = modelElement.getAttribute('headerTag') || 'h2';
  const title = modelElement.getAttribute('title') || '';
  const jumpMenuElement = viewWriter.createContainerElement('ucb-jump-menu', {
    headertag: headerTag,
    title: title
  });

  if (widget) {
    return toWidget(jumpMenuElement, viewWriter);
  }

  return jumpMenuElement;
}
