import { Plugin } from 'ckeditor5/src/core';
import InvisibleCommand from './insertinvisiblecommand';
import RemoveInvisibleCommand from './removeinvisiblecommand';
import { Widget, toWidget } from 'ckeditor5/src/widget';

export default class InvisibleEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'addInvisible',
      new InvisibleCommand(this.editor),
      );
    this.editor.commands.add(
      'removeInvisible',
      new RemoveInvisibleCommand(this.editor)
    )
  }
  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register( 'ucb-invisible', {
      isObject: true,
      allowWhere: '$text',
      allowContentOf: '$block', // It can contain content of a block (allows text implicitly)
      isInline: true,
    });
  }

  _defineConverters() {
    const { conversion } = this.editor;

    conversion.for("upcast").elementToElement({
      model: (viewElement, { writer }) => {
        return writer.createElement("ucb-invisible");
      },
      view: {
        name: "span",
        classes: "visually-hidden",
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: "ucb-invisible",
      view: {
        name: "span",
        classes: "visually-hidden",
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'ucb-invisible',
      view: (modelItem, { writer }) => {
        const widgetElement = createInvisibleWidget(writer);
        return widgetElement;
      },
    });
  }

}

function createInvisibleWidget(writer) {
  const span = writer.createContainerElement('span', { class: 'ucb-invisible' });
  return toWidget(span, writer, { label: 'invisible widget',hasSelectionHandle: true },);
}
