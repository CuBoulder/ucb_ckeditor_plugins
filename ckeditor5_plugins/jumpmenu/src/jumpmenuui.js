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

    // Register the insertJumpMenu button
    componentFactory.add('jumpmenu', locale => {
      const command = editor.commands.get('jumpmenu');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: 'Insert Jump Menu',
        icon: jumpMenuIcon,
        tooltip: true
      });

      buttonView.bind('isEnabled').to(command, 'isEnabled');

      buttonView.on('execute', () => {
        editor.execute('jumpmenu');
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

    this._registerWidgetToolbar();
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

  _registerWidgetToolbar() {
    const editor = this.editor;
    const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);

    widgetToolbarRepository.register('ucbJumpMenu', {
      items: ['setHeaderTag'],
      getRelatedElement: (selection) => {
        const selectedElement = selection.getSelectedElement();
        console.log('selection', selectedElement)
        if(selectedElement){
          console.log('selection name', selectedElement.name)
        }
        if (selectedElement && selectedElement.name === 'ucb-jump-menu') {
          console.log('returning selected element');
          return selectedElement;
        }
        return null;
      }
    });
  }
}
