import { Plugin } from 'ckeditor5/src/core';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../icons/table-columns-solid.svg';
import { icons } from 'ckeditor5/src/core';

export default class ColumnUI extends Plugin {
  static get requires() {
    return [WidgetToolbarRepository];
  }

  init() {
    const editor = this.editor;
    const commands = editor.commands;
    const componentFactory = editor.ui.componentFactory;

    // Register the Column button to the toolbar
    componentFactory.add('Column', locale => {
      const button = new ButtonView(locale);
      const command = commands.get('insertRowWithColumns');

      button.label = 'Column';
      button.icon = icon;
      button.tooltip = true;
      button.withText = false;
      button.isToggleable = true;

      button.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      this.listenTo(button, 'execute', () => editor.execute('insertRowWithColumns'));

      return button;
    });

    componentFactory.add('addColumn', locale =>
      this._createButton(locale, 'Add Column', icons.plus, commands.get('addColumn')));
    componentFactory.add('removeColumn', locale =>
      this._createButton(locale, 'Remove Column', icons.eraser, commands.get('removeColumn')));
  }

  afterInit() {
    const editor = this.editor;
    const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);

    widgetToolbarRepository.register('ucb-row', {
      items: ['addColumn'],
      getRelatedElement: (selection) => {
        const selectedElement = selection.getSelectedElement();
        if (selectedElement && selectedElement.is('element') && selectedElement.hasClass("ucb-column-container"))
          return selectedElement;
        return null;
      }
    });

    widgetToolbarRepository.register('ucb-column', {
      items: ['removeColumn'],
      getRelatedElement: (selection) => {
        return selection.focus ? selection.focus.getAncestors()
          .find((node) => node.is('element') && node.hasClass('ucb-column')) : null;
      }
    });
  }

  _createButton(locale, label, icon, command) {
    const buttonView = new ButtonView(locale);
    buttonView.set({
      label,
      icon,
      tooltip: true,
      withText: !icon
    });

    buttonView.bind('isEnabled').to(command, 'isEnabled');

    this.listenTo(buttonView, 'execute', () => {
      command.execute();
      this.editor.editing.view.focus();
    });

    return buttonView;
  }
}
