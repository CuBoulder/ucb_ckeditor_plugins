import { Plugin } from 'ckeditor5/src/core';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import { ButtonView, createDropdown, Model } from 'ckeditor5/src/ui';
import jumpMenuIcon from '../../../icons/anchor-solid.svg';

export default class JumpMenuUI extends Plugin {
  static get requires() {
    return [WidgetToolbarRepository];
  }

  init() {
    const editor = this.editor;
    const componentFactory = editor.ui.componentFactory;

    componentFactory.add('insertJumpMenu', locale => {
      const command = editor.commands.get('insertJumpMenu');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: 'Insert Jump Menu',
        icon: jumpMenuIcon,
        tooltip: true
      });

      buttonView.bind('isEnabled').to(command, 'isEnabled');

      buttonView.on('execute', () => {
        editor.execute('insertJumpMenu');
        editor.editing.view.focus();
      });

      return buttonView;
    });

    // Register the dropdown for setting header tags
    componentFactory.add('setHeaderTag', locale => {
      const dropdownView = createDropdown(locale);
      const buttons = this._createDropdownItems(locale);

      dropdownView.buttonView.set({
        label: 'Set Header Tag',
        tooltip: true,
        withText: true
      });

      dropdownView.panelView.children.add(...buttons);

      dropdownView.on('execute', evt => {
        editor.execute('modifyJumpMenuHeaderTag', { value: evt.source.commandParam });
      });

      return dropdownView;
    });
  }

  _createDropdownItems(locale) {
    const editor = this.editor;
    const options = ['h2', 'h3', 'h4', 'h5'];
    const itemDefinitions = options.map(option => {
      const button = new ButtonView(locale);

      button.set({
        label: option.toUpperCase(),
        withText: true
      });

      button.commandParam = option;

      button.bind('isOn').to(
        editor.commands.get('modifyJumpMenuHeaderTag'),
        'value',
        value => value === option
      );

      button.on('execute', () => {
        editor.execute('modifyJumpMenuHeaderTag', { value: option });
      });

      return button;
    });

    return itemDefinitions;
  }

  afterInit() {
    const editor = this.editor;
    const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);

    widgetToolbarRepository.register('ucb-jump-menu', {
      items: ['setHeaderTag'],
      getRelatedElement: (selection) => {
        const selectedElement = selection.getSelectedElement();
        if (selectedElement && selectedElement.name === 'ucbJumpMenu') {
          return selectedElement;
        }
        return null;
      }
    });
  }
}
