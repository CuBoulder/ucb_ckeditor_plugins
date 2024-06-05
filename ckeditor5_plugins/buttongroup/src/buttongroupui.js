import { Plugin } from 'ckeditor5/src/core';
// import BGFormView from './buttongroupview';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import { ButtonView, createDropdown, addToolbarToDropdown } from 'ckeditor5/src/ui';
import {sizeOptions, defaultSize, colorOptions, defaultColor} from './buttongroupconfig'
import icon from '../../../icons/arrows-turn-right-solid.svg';
import { icons } from 'ckeditor5/src/core';



export default class ButtonGroupUI extends Plugin {
  static get requires() {
    return [ WidgetToolbarRepository ];
  }

  init() {
    const editor = this.editor;
    const commands = editor.commands;
    const componentFactory = editor.ui.componentFactory;

    // This will register the ButtonGroup button to the toolbar
    componentFactory.add( 'buttonGroup', (locale) => {
      const button = new ButtonView(locale);
      const command = commands.get('insertButtonGroup');

      button.label = 'Button Group';
      button.icon = icon;
      button.tooltip = true;
      button.withText = false;
      button.isToggleable = true;

      // Bind the state of the button to the command.
      button.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(button, 'execute', () => editor.execute('insertButtonGroup'));

      return button;
    } );

    // Makes size and color options avaliable to the widget toolbar.
    componentFactory.add('buttonGroupSize', locale =>
      this._createDropdown(locale, 'Size', sizeOptions[defaultSize].icon, commands.get('buttonGroupSize'), sizeOptions, defaultSize));
    componentFactory.add('buttonGroupColor', locale =>
      this._createDropdown(locale, 'Color', colorOptions[defaultColor].icon, commands.get('buttonGroupColor'), colorOptions, defaultColor));
    componentFactory.add('addNewButtonBG', locale =>
      this._createButton(locale, 'Add Button', icons.plus, commands.get('addNewButtonBG'), null))
  }

    /**
   * @inheritdoc
   */
    afterInit() {
      const editor = this.editor;
      const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);
    
      widgetToolbarRepository.register('buttonGroup', {
        items: ['buttonGroupSize', 'buttonGroupColor', 'addNewButtonBG'],
        getRelatedElement: (selection) => {
          const selectedElement = selection.getSelectedElement();
          if (selectedElement && selectedElement.is('element') && selectedElement.hasClass('ucb-button-group'))
            return selectedElement;
            return null;
        }
      });
    }

  /**
   * Creates a dropdown with multiple buttons for executing a command.
   * 
   * @param {Locale} locale
   *   The locale.
   * @param {string} label
   *   The dropdown's label.
   * @param {string | null} icon
   *   The dropdowns's icon (optional). If `null`, the dropdown will display as text.
   * @param {Command} command
   *   The command to execute when one of the buttons is pushed.
   * @param {Object<string, SelectableOption>} options
   *   The options for buttons in this dropdown view.
   * @param {string} defaultValue
   *   The default value of the command.
   * @returns {DropdownView}
   *   The dropdown.
   */
  _createDropdown(locale, label, icon, command, options, defaultValue) {
    const dropdownView = createDropdown(locale);
    
    addToolbarToDropdown(dropdownView, Object.entries(options).map(([optionValue, option]) => 
      this._createButton(locale, option.label, option.icon, command, optionValue)
    ));
    
    dropdownView.buttonView.set({
      label: locale.t(label),
      icon,
      tooltip: true,
      withText: !icon
    });
    
    // If the dropdown does not have an icon, bind its label to the current value.
    if (!icon) {
      dropdownView.buttonView.bind('label').to(command, 'value', value => 
        options[value] ? options[value].label : options[defaultValue].label
      );
    } else if (icon === options[defaultValue].icon) {
      // If the icon for the dropdown is the same as the icon for the default option, it changes to reflect the current selection.
      dropdownView.buttonView.bind('icon').to(command, 'value', value => 
        options[value] ? options[value].icon : options[defaultValue].icon
      );
    }
    
    // Enable button if any of the buttons are enabled.
    dropdownView.bind('isEnabled').to(command, 'isEnabled');
    return dropdownView;
  }
  


  _createButton(locale, label, icon, command, value) {
    const editor = this.editor, buttonView = new ButtonView();
    buttonView.set({
      label: locale.t(label),
      icon,
      tooltip: true, // Displays the tooltip on hover
      isToggleable: true, // Allows the button with the command's current value to display as selected
      withText: !icon // Displays the button as text if the icon is falsey
    });
    // Disables the button if the command is disabled
    buttonView.bind('isEnabled').to(command);
    // Allows the button with the command's current value to display as selected
    buttonView.bind('isOn').to(command, 'value', commandValue => commandValue === value);
    // Executes the command with the button's value on click
    this.listenTo(buttonView, 'execute', () => {
      command.execute({ value });
      editor.editing.view.focus();
    });
    return buttonView;
  }
}
