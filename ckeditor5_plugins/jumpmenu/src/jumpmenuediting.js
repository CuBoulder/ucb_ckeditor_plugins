import { Plugin } from 'ckeditor5/src/core';
import { toWidget } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
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
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('ucbJumpMenu', {
      isObject: true,
      allowWhere: '$block',
      allowAttributes: ['headerTag', 'title'],
      allowChildren: false
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

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

    conversion.for('dataDowncast').elementToElement({
      model: 'ucbJumpMenu',
      view: (modelElement, { writer: viewWriter }) => {
        return createJumpMenuView(modelElement, viewWriter);
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
}

function createJumpMenuView(modelElement, downcastWriter, widget = false) {
  const headerTag = modelElement.getAttribute('headerTag') || 'h2';
  const title = modelElement.getAttribute('title') || '';
  const jumpMenuElement = downcastWriter.createContainerElement('ucb-jump-menu', { headertag: headerTag, title });

  if (widget) {
    return toWidget(jumpMenuElement, downcastWriter);
  }

  return jumpMenuElement;
}
