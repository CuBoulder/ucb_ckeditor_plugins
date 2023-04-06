import { Command } from 'ckeditor5/src/core';

export default class ButtonCommand extends Command {
  execute({ color, style, size, href, classes }) {
    const model = this.editor.model;
    const selection = model.document.selection;

    model.change(writer => {
      const button = addButton(writer, color, style, size, href, classes);
      const position = selection.getFirstPosition();

      writer.insert(button, position);
      writer.setSelection(button, 'on');
    });
  }


refresh() {
  const model = this.editor.model;
  const selection = model.document.selection;

  const allowedIn = model.schema.findAllowedParent(
    selection.getFirstPosition(),
    'ucb-button'
  );

  this.isEnabled = allowedIn !== null;

  const buttonElement = selection.getSelectedElement();
  if (buttonElement && buttonElement.name === 'ucb-button') {
    const attributes = buttonElement.getAttributes();

    const color = model.getAttribute('color');
    const style = model.getAttribute('style');
    const size = model.getAttribute('size');

    const buttonClasses = [];
    if (color) {
      buttonClasses.push(`ucb-button-${color}`);
    }
    if (style) {
      buttonClasses.push(`ucb-button-${style}`);
    }
    if (size) {
      buttonClasses.push(`ucb-button-${size}`);
    }

    const buttonClass = buttonClasses.join(' ');

    if (buttonClass !== attributes.class) {
      model.change(writer => {
        writer.setAttribute('class', buttonClass, buttonElement);
      });
    }

    // Update the button href attribute to match the link value in the model
    const link = model.getAttribute('link');
    if (link !== attributes.href) {
      model.change(writer => {
        writer.setAttribute('href', link, buttonElement);
      });
    }
  }
}
}

function addButton(writer, color, style, size, href, classes) {
  const button = writer.createElement('ucb-button', {
    class: `ucb-button-${color} ucb-button-${style} ucb-button-${size} ${classes}`,
    href: href
  });

  return button;
}
