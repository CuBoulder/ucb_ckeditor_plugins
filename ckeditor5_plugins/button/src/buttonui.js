import { Plugin } from 'ckeditor5/src/core';
import { ButtonView, ContextualBalloon, clickOutsideHandler } from 'ckeditor5/src/ui';
import FormView from './buttonview';
import getRangeText from './buttonutils.js';
import icon from '../../../icons/arrow-right-to-bracket-solid.svg';

export default class ButtonUI extends Plugin {
  static get requires() {
    return [ ContextualBalloon ];
  }
  static get pluginName(){
    return 'ButtonUI'
  }

  init() {
    const editor = this.editor;
    const componentFactory = editor.ui.componentFactory;
    const insertButtonCommand = editor.commands.get('addButton')
    const viewDocument = editor.editing.view.document;

        // Create the balloon and the form view.
    this._balloon = this.editor.plugins.get( ContextualBalloon );
    this.formView = this._createFormView(editor.locale);
    this.buttonView = null;

    // This will register the Button button to the toolbar
    componentFactory.add( 'button', (locale) => {
      const button = new ButtonView(locale);

      button.label = 'Button';
      button.icon = icon;
      button.tooltip = true;
      button.withText = false;
      button.isToggleable = true;
      // Show the UI on button click.
      this.listenTo( button, 'execute', () => {
        this._showUI(insertButtonCommand.existingButtonSelected)
      } );

      this.buttonView = button;

      // Show the on/off in Toolbar if a button is already selected.
      const updateButtonState = () => {
        const linkButtonSelected = insertButtonCommand.existingButtonSelected;
        button.isOn = !!linkButtonSelected;
      };
        
       // Listen for changes in the linkButton selection.
      this.listenTo(insertButtonCommand, 'change:value', updateButtonState);
      this.listenTo(insertButtonCommand, 'change:existingButtonSelected', updateButtonState);
      
      // Shows the UI on click of a button widget.
      this.listenTo(viewDocument, 'click', () => {
        if (insertButtonCommand.existingButtonSelected)
          this._showUI(insertButtonCommand.existingButtonSelected);
      });

      this.on('showUI', (eventInfo, newButton) => {
        this._showUI(newButton)
      });

      // Bind the state of the button to the command.
      button.bind('isOn', 'isEnabled').to(insertButtonCommand, 'value', 'isEnabled');

      return button;
    } );
  }

  _createFormView(locale) {
    const editor = this.editor;
    const componentFactory = editor.ui.componentFactory;
    const formView = new FormView( locale, componentFactory);


    // Execute the command after clicking the "Save" button.
    this.listenTo( formView, 'submit', () => {
      // Grab values from the Form and title input fields.
      const value = {
        href: formView.linkInputView.fieldView.element.value,
        color: formView.color,
        size: formView.size,
        style: formView.style

      };
      editor.execute( 'addButton', value );

            // Hide the form view after submit.
      this._hideUI();
    } );

    // Hide the form view after clicking the "Cancel" button.
    this.listenTo( formView, 'cancel', () => {
      this._hideUI();
    } );
    
    // Close the panel on esc key press when the form has focus.
    formView.keystrokes.set('Esc', (data, cancel) => {
      this._hideUI();
      cancel();
    });

    // Hide the form view when clicking outside the balloon.
    clickOutsideHandler( {
      emitter: formView,
      activator: () => this._balloon.visibleView === formView,
      contextElements: [ this._balloon.view.element ],
      callback: () => this._hideUI()
    } );

    return formView;
  }

  _showUI(selectedButton) {
    this.buttonView.isOn = true;

    // If there's an existing balloon open, close it! 
    if (this._balloon.visibleView) {
      this._hideUI();
    }
    
    // Check the value of the command.
    const commandValue = this.editor.commands.get( 'addButton' ).value;

    this._balloon.add( {
      view: this.formView,
      position: this._getBalloonPositionData()
    } );

    if (selectedButton) {
      const size = selectedButton.getAttribute('linkButtonSize');
      const color = selectedButton.getAttribute('linkButtonColor');
      const style = selectedButton.getAttribute('linkButtonStyle');
      const href = selectedButton.getAttribute('linkButtonHref');
    
      this.formView.color = color;
      this.formView.style = style;
      this.formView.size = size;
    
      this.formView.linkInputView.fieldView.value = href;
      this.formView.linkInputView.fieldView.element.value = href; // Update the input field value
      this.formView.linkInputView.fieldView.set('value', href); // Update the input field value (alternative method)
    }

    // Disable the input when the selection is not collapsed.
    // this.formView.linkInputView.isEnabled = selection.getFirstRange().isCollapsed;

    // Fill the form using the state (value) of the command.
    if ( commandValue ) {
      this.formView.linkInputView.fieldView.value = commandValue.link;
      this.formView.colorDropdown.fieldView.value = commandValue.color;
      this.formView.sizeDropdown.fieldView.value = commandValue.size;
      this.formView.styleDropdown.fieldView.value = commandValue.style
    }
    setTimeout(() => {
      this.formView.linkInputView.fieldView.focus();
    }, 0);
  }
  _hideUI() {
    // Case for if user is rapidly clicking add button to button group
    if (!this._balloon.hasView(this.formView)) {
      return; // If the formView isn't in the balloon, do nothing
    }
    // Clear the input field values and reset the form.
    this.formView.element.reset();
    this.buttonView.isOn = false;

    this._balloon.remove( this.formView );

    // Focus the editing view after inserting the tooltip so the user can start typing the content
    // right away and keep the editor focused.
    this.editor.editing.view.focus();
  }

  _getBalloonPositionData() {
    const view = this.editor.editing.view;
    const viewDocument = view.document;
    let target = null;

    // Set a target position by converting view selection range to DOM
    target = () => view.domConverter.viewRangeToDom( viewDocument.selection.getFirstRange() );

    return {
      target
    };
  }
}
