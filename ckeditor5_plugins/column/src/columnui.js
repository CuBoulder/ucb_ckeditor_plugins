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

    // Register addColumn button to the toolbar
    componentFactory.add('addColumn', locale =>
      this._createButton(locale, 'Add Column', icons.plus, commands.get('addColumn')));

    // Register removeColumn button to the toolbar
    componentFactory.add('removeColumn', locale =>
      this._createButton(locale, 'Remove Column', icons.minus, commands.get('removeColumn')));
  }

  afterInit() {
    const editor = this.editor;
    const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);

    widgetToolbarRepository.register('ucb-row', {
      items: ['addColumn', 'removeColumn'],
      getRelatedElement: selection => {
        const selectedElement = selection.getSelectedElement();
        if (selectedElement && selectedElement.is('element') && selectedElement.hasClass('ucb-column-container')) {
          return selectedElement;
        }
        return null;
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
