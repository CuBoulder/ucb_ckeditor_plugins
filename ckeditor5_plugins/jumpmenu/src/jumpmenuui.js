import { Plugin } from 'ckeditor5/src/core';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import { ButtonView, createDropdown, addToolbarToDropdown, LabeledFieldView, createLabeledInputText } from 'ckeditor5/src/ui';
import jumpMenuIcon from '../../../icons/compass-solid.svg';

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
      const command = editor.commands.get('modifyJumpMenuHeaderTag');
      return this._createDropdown(locale, 'Set Header Tag', command, {
        h2: { label: 'H2' },
        h3: { label: 'H3' },
        h4: { label: 'H4' },
        h5: { label: 'H5' }
      }, 'h2');
    });

    // Register the input for setting title
    componentFactory.add('setTitle', locale => {
      const command = editor.commands.get('modifyJumpMenuTitle');
      const labeledInputView = new LabeledFieldView(locale, createLabeledInputText);

      labeledInputView.label = 'Title';
      labeledInputView.fieldView.bind('value').to(command, 'value');

      labeledInputView.fieldView.on('input', () => {
        editor.execute('modifyJumpMenuTitle', { value: labeledInputView.fieldView.element.value });
      });

      return labeledInputView;
    });

    this._registerWidgetToolbar();
  }

  _createDropdown(locale, label, command, options, defaultValue) {
    const dropdownView = createDropdown(locale);
    addToolbarToDropdown(dropdownView, Object.entries(options).map(([optionValue, option]) => this._createButton(locale, option.label, command, optionValue)));
    dropdownView.buttonView.set({
      label: locale.t(label),
      withText: true
    });

    dropdownView.buttonView.bind('label').to(command, 'value', value => options[value] ? options[value].label : options[defaultValue].label);

    dropdownView.bind('isEnabled').to(command, 'isEnabled');
    return dropdownView;
  }

  _createButton(locale, label, command, value) {
    const editor = this.editor;
    const buttonView = new ButtonView(locale);

    buttonView.set({
      label: locale.t(label),
      withText: true,
      isToggleable: true
    });

    buttonView.bind('isEnabled').to(command);
    buttonView.bind('isOn').to(command, 'value', commandValue => commandValue === value);

    buttonView.on('execute', () => {
      editor.execute('modifyJumpMenuHeaderTag', { value });
      editor.editing.view.focus();
    });

    return buttonView;
  }

  _registerWidgetToolbar() {
    const editor = this.editor;
    const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);

    widgetToolbarRepository.register('ucbJumpMenu', {
      items: ['setHeaderTag', 'setTitle'],
      getRelatedElement: (selection) => {
        const selectedElement = selection.getSelectedElement();
        if (selectedElement && selectedElement.is('element') && selectedElement.hasClass('ckeditor5-jumpmenu__widget')) {
          return selectedElement;
        }
        return null;
      }
    });
  }
}
