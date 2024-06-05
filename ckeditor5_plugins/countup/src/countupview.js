import {
  View,
  LabeledFieldView,
  createLabeledInputText,
  ButtonView,
  submitHandler,
  FocusCycler,
  createDropdown,
  addToolbarToDropdown
} from 'ckeditor5/src/ui';
import { FocusTracker, KeystrokeHandler } from 'ckeditor5/src/utils';
import { icons } from 'ckeditor5/src/core';

export default class FormView extends View {
  constructor( locale, componentFactory) {
    super( locale);
    this.focusTracker = new FocusTracker();
    this.keystrokes = new KeystrokeHandler();
    
    // Creates the main input field.
    // this.innerTextInputView = this._createInput( 'Button Text' );
    this.countupTextInputView = this._createInput( 'Add Countup Number' );
    
    // Sets defaults
    this.countupTextInputView.fieldView.bind('countupText').to(this, 'countupText');
    this.set('countupText', '')


    this.saveButtonView = this._createButton( 'Save', icons.check, 'ck-button-save' );

    // Submit type of the button will trigger the submit event on entire form when clicked 
    //(see submitHandler() in render() below).
    this.saveButtonView.type = 'submit';

    this.cancelButtonView = this._createButton( 'Cancel', icons.cancel, 'ck-button-cancel' );

    // Delegate ButtonView#execute to FormView#cancel.
    this.cancelButtonView.delegate( 'execute' ).to( this, 'cancel' );

    this.childViews = this.createCollection( [
      this.countupTextInputView,
      this.saveButtonView,
      this.cancelButtonView
    ] );

    this._focusCycler = new FocusCycler( {
      focusables: this.childViews,
      focusTracker: this.focusTracker,
      keystrokeHandler: this.keystrokes,
      actions: {
        // Navigate form fields backwards using the Shift + Tab keystroke.
        focusPrevious: 'shift + tab',

        // Navigate form fields forwards using the Tab key.
        focusNext: 'tab'
      }
    } );

    this.setTemplate( {
      tag: 'form',
      attributes: {
        class: [ 'ck', 'ck-countup-form' ],
        tabindex: '-1'
      },
      children: this.childViews
    } );
  }

  render() {
    super.render();

    submitHandler( {
      view: this
    } );

    this.childViews._items.forEach( view => {
      // Register the view in the focus tracker.
      this.focusTracker.add( view.element );
    } );

    // Start listening for the keystrokes coming from #element.
    this.keystrokes.listenTo( this.element );
  }

  destroy() {
    super.destroy();

    this.focusTracker.destroy();
    this.keystrokes.destroy();
  }

  focus() {
    // If the number text field is enabled, focus it straight away to allow the user to type.
    if ( this.countupTextInputView.isEnabled ) {
      this.countupTextInputView.focus();
    }
    // Focus the number text field if the former is disabled.
    else {
      this.countupTextInputView.focus();
    }
  }

  _createInput( label ) {
    const labeledInput = new LabeledFieldView( this.locale, createLabeledInputText );

    labeledInput.label = label;

    return labeledInput;
  }

  _createButton( label, icon, className ) {
    const button = new ButtonView();

    button.set( {
      label,
      icon,
      tooltip: true,
      class: className
    } );

    return button;
  }

  _createSelectionDropdown(locale, tooltip, icon, attribute, options, defaultValue) {
    const dropdownView = createDropdown(locale), defaultOption = options[defaultValue];
    addToolbarToDropdown(dropdownView, Object.entries(options).map(([optionValue, option]) => this._createSelectableButton(locale, option.label, option.icon, attribute, optionValue)));
    dropdownView.buttonView.set({
      icon,
      tooltip: locale.t(tooltip),
      withText: !icon
    });
    dropdownView.buttonView.bind('label').to(this, attribute, value => locale.t(options[value] ? options[value].label : defaultOption.label));
    if (icon === options[defaultValue].icon) // If the icon for the dropdown is the same as the icon for the default option, it changes to reflect the current selection.
      dropdownView.buttonView.bind('icon').to(this, attribute, value => options[value] ? options[value].icon : defaultOption.icon);
    return dropdownView;
  }

  _createSelectableButton(locale, label, icon, attribute, value) {
    const buttonView = new ButtonView();
    buttonView.set({
      label: locale.t(label),
      icon,
      tooltip: !!icon, // Displays the tooltip on hover if there is an icon
      isToggleable: true, // Allows the button with the attribute's current value to display as selected
      withText: !icon // Displays the button as text if the icon is falsey
    });
    // Allows the button with the attribute's current value to display as selected
    buttonView.bind('isOn').to(this, attribute, attributeValue => attributeValue === value);
    // Sets the attribute to the button's value on click
    this.listenTo(buttonView, 'execute', () => {
      this.set(attribute, value);
    });
    return buttonView;
  }
}
