import { Plugin } from 'ckeditor5/src/core';
import ButtonCommand from './insertbuttoncommand';
import { Widget } from 'ckeditor5/src/widget';

export default class ButtonEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add('addButton', new ButtonCommand(this.editor));
  }

  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.register('ucb-button', {
      isObject: true,
      allowWhere: '$block',
      allowContentOf: '$block',
      allowAttributes: ['class', 'href'],
    });
  }

  _defineConverters() {
    const { conversion } = this.editor;

    conversion.for('upcast').elementToElement({
      model: 'ucb-button',
      view: (buttonViewElement, { model, styles }) => {
        const href = buttonViewElement.getAttribute('href');
        const classes = Array.from(buttonViewElement.classList)
          .filter((className) => className.startsWith('ucb-button-'))
          .map((className) => className.replace('ucb-button-', ''));

        const buttonModelElement = model.createElement('ucb-button', {
          href,
          class: classes.join(' '),
        });

        return buttonModelElement;
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'ucb-button',
      view: (buttonModelElement, { writer: viewWriter }) => {
        const href = buttonModelElement.getAttribute('href');
        const classes = buttonModelElement.getAttribute('class') || '';
        const buttonViewElement = viewWriter.createContainerElement('button', {
          href,
          class: `ucb-button-${classes}`,
        });

        return buttonViewElement;
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'ucb-button',
      view: (buttonModelElement, { writer: viewWriter }) => {
        const href = buttonModelElement.getAttribute('href');
        const classes = buttonModelElement.getAttribute('class') || '';
        const buttonViewElement = viewWriter.createContainerElement('button', {
          href,
          class: `ucb-button-${classes}`,
        });

        return buttonViewElement;
      },
    });
  }
}
