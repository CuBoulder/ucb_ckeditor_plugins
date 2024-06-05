// // Handles the admin side where youre adding buttons to toolbar
// // Also handles the format and display during editing
import { Plugin } from 'ckeditor5/src/core';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import { ButtonView, createLabeledInputText, LabeledFieldView } from 'ckeditor5/src/ui';
import audioIcon from '../../../icons/invisible.svg'
import { isInvisibleElement } from './invisibleutils';

export default class InvisibleUI extends Plugin {
  static get requires() {
    return [ WidgetToolbarRepository ];
  }

  init() {
    const editor = this.editor;
    const commands = editor.commands;
    const componentFactory = editor.ui.componentFactory;

    // This will register the ButtonGroup button to the toolbar
    componentFactory.add( 'invisible', (locale) => {
      const button = new ButtonView(locale);
      const command = commands.get('addInvisible');
    
      button.label = 'Screen-Reader Only';
      button.icon = audioIcon
      button.tooltip = true;
      button.withText = false;
      button.isToggleable = true;

      // Bind the state of the button to the command.
      button.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(button, 'execute', () => {
        const selection = editor.model.document.selection;
        const selectedElement = selection.getSelectedElement();
      
        if (selectedElement && isInvisibleElement(selectedElement)) {
          // If an invisible element is selected, remove it on toolbar press
          editor.execute('removeInvisible', selectedElement);
        } else {
          // Otherwise, add a new invisible element.
          editor.execute('addInvisible');
        }
      });

      return button;
    } );
    componentFactory.add('invisibleInnerText', locale =>
      this._createInput(locale, 'Screen-Reader Text'));
  }

    /**
   * @inheritdoc
   */
    afterInit() {
      const editor = this.editor;
      const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);
    
      widgetToolbarRepository.register('invisible', {
        items: ['invisibleInnerText'],
        getRelatedElement: (selection) => {
          const selectedElement = selection.getSelectedElement();
          if (selectedElement && selectedElement.is('element') && selectedElement.hasClass('ucb-invisible')){
            // Update the input field's value
            const textNode = selectedElement.getChild(0);
            const text = textNode ? textNode.data : '';            
            const inputField = this.editor.ui.labeledInput;
            if (inputField) {
              inputField.fieldView.value = text;
            }
            return selectedElement;
          }
            return null;
        }
      });
    }
    _createInput(locale, label) {
      const labeledInput = new LabeledFieldView(locale, createLabeledInputText);
      labeledInput.label = locale.t(label);
    
      this.listenTo(labeledInput.fieldView, 'input', () => {
        const text = labeledInput.fieldView.element.value;
    
        // Update the state
        const command = this.editor.commands.get('addInvisible');
        if (command) {
          command.execute(text);
        }
      });
    
      // Store the labeled input for later reference
      this.editor.ui.labeledInput = labeledInput;
    
      return labeledInput;
    }

}
