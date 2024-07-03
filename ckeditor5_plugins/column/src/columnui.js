import { Plugin } from 'ckeditor5/src/core';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../icons/table-columns-solid.svg';
import leftIcon from '../../../icons/arrow-left-solid.svg';
import rightIcon from '../../../icons/arrow-right-solid.svg';
import { icons } from 'ckeditor5/src/core';
import AddColumnPositionCommand from './addcolumnpositioncommand';

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
    componentFactory.add('addColumnLeft', locale =>
      this._createButton(locale, 'Add Column Left', leftIcon, commands.get('addColumnPosition'), 'left'));
    componentFactory.add('addColumnRight', locale =>
      this._createButton(locale, 'Add Column Right', rightIcon, commands.get('addColumnPosition'), 'right'));

    editor.commands.add('addColumnPosition', new AddColumnPositionCommand(editor));
  }

  afterInit() {
    const editor = this.editor;
    const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);

    widgetToolbarRepository.register('ucb-row', {
      items: ['addColumn'],
      getRelatedElement: (selection) => {
        const selectedElement = selection.getSelectedElement();
        if (selectedElement && selectedElement.is('element') && selectedElement.hasClass("ucb-column-container")) {
          // Check the number of columns --  4 would be 6 (4 columns, 2 UI elements) so >5 don't show the 'Add Button'
          const columnCount = selectedElement.childCount;
          if (columnCount > 5) {
            return null;
          }
          return selectedElement;
        }
        return null;
      }
    });

    widgetToolbarRepository.register('ucb-column', {
      items: ['addColumnLeft','removeColumn', 'addColumnRight'],
      getRelatedElement: (selection) => {
        const columnElement = selection.focus ? selection.focus.getAncestors()
          .find((node) => node.is('element') && node.hasClass('ucb-column')) : null;
        return columnElement;
      }
    });
  }

  _createButton(locale, label, icon, command, position) {
    const buttonView = new ButtonView(locale);
    buttonView.set({
      label,
      icon,
      tooltip: true,
      withText: !icon
    });

    if (position) {
      buttonView.bind('isEnabled').to(command, 'isEnabled');

      this.listenTo(buttonView, 'execute', () => {
        this.editor.execute('addColumnPosition', { position });
        this.editor.editing.view.focus();
      });
    } else {
      buttonView.bind('isEnabled').to(command, 'isEnabled');

      this.listenTo(buttonView, 'execute', () => {
        command.execute();
        this.editor.editing.view.focus();
      });
    }

    return buttonView;
  }
}
