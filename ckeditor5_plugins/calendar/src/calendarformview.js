/**
 * @file contains the calendar form view.
 * 
 * @typedef { import('@ckeditor/ckeditor5-utils').Locale } Locale
 * @typedef { import('@ckeditor/ckeditor5-core').Command } Command
 * @typedef { import('@ckeditor/ckeditor5-core/src/editor/editorwithui').EditorWithUI } EditorWithUI
 * @typedef { import('./calendarconfig').SelectableOption } SelectableOption
 */

import { FocusTracker, KeystrokeHandler } from 'ckeditor5/src/utils';
import { ButtonView, createLabeledInputText, FocusCycler, LabeledFieldView, submitHandler, View } from 'ckeditor5/src/ui';
import { icons } from 'ckeditor5/src/core';

export default class CalendarFormView extends View {
  /**
   * Creates a new CalendarFormView.
   * 
   * @param {Locale} locale
   *   The locale.
   */
  constructor(locale) {
    super(locale);

    // Creates the main input field.
    this.valueInputView = this._createInput(locale, 'Calendar embed');
    this.set('value', '');
    this.valueInputView.fieldView.bind('value').to(this, 'value');

    // Creates the save and cancel buttons.
    this.saveButtonView = this._createActionButton(locale, 'Save', icons.check, 'ck-button-save');
    this.cancelButtonView = this._createActionButton(locale, 'Cancel', icons.cancel, 'ck-button-cancel');

    this.saveButtonView.type = 'submit'; // Set the type to 'submit', which will trigger the submit event on entire form when clicked.
    this.cancelButtonView.delegate('execute').to(this, 'cancel'); // Delegate ButtonView#execute to CalendarFormView#cancel.

    this.childViews = this.createCollection([
      this.valueInputView,
      this.saveButtonView,
      this.cancelButtonView
    ]);

    this._enableFocusTracking();

    this.setTemplate({
      tag: 'form',
      attributes: {
        class: ['ck', 'ck-calendar-form'],
        tabindex: '-1'
      },
      children: this.childViews
    });
  }

  /**
   * @inheritdoc
   */
  render() {
    super.render();

    // Registers the child elements to be tracked by the focus tracker instance.
    for (const view of this.childViews)
      this.focusTracker.add(view.element);

    // Submit the form when the user clicked the save button or pressed enter in the input.
    submitHandler({
      view: this
    });

    // Start listening for the keystrokes coming from #element, which will allow the #focusCycler to handle the keyboard navigation.
    this.keystrokes.listenTo(this.element);
  }

  focus() {
    this.valueInputView.focus();
  }

  reset() {
    this.value = '';
    this.valueInputView.fieldView.element.blur(); // Fixes a bug where the value field focus event doesn't fire after dismissing with the Escape key.
    this.element.reset();
  }

  /**
   * @inheritdoc
   */
  destroy() {
    // Stop listening to all keystrokes when the view is destroyed.
    this.keystrokes.destroy();
  }

  /**
   * @param {Locale} locale
   *   The locale.
   * @param {string} label
   *   The button's label.
   * @param {string | null} icon
   *   The button's icon (optional). If `null`, the button will display as text.
   * @param {string} attribute
   *   The attribute to set when the button is pushed.
   * @param {string} value
   *   The value to set the attribute to when the button is pushed.
   * @returns {ButtonView}
   *   A selectable button with the specified parameters.
   */
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

  /**
   * @param {Locale} locale
   *   The locale.
   * @param {string} label
   *   The button's label.
   * @param {string | null} icon
   *   The button's icon (optional). If `null`, the button will display as text.
   * @param {string | string[] | null} className
   *   The button's CSS classes (optional).
   * @returns {ButtonView}
   *   An action button with the specified parameters. No actions are bound yet and must be bound afteward.
   */
  _createActionButton(locale, label, icon, className) {
    const buttonView = new ButtonView();
    buttonView.set({
      label: locale.t(label),
      icon,
      class: className,
      tooltip: !!icon, // Displays the tooltip on hover if there is an icon
      withText: !icon // Displays the button as text if the icon is falsey
    });
    return buttonView;
  }

  /**
   * @param {Locale} locale
   *   The locale.
   * @param {string} label
   *   The input's label.
   * @returns {LabeledFieldView}
   */
  _createInput(locale, label) {
    const labeledInput = new LabeledFieldView(locale, createLabeledInputText);
    labeledInput.label = locale.t(label);
    return labeledInput;
  }

  /**
   * Enables focus tracking / keyboard focus cycling.
   * 
   * @see https://ckeditor.com/docs/ckeditor5/latest/framework/deep-dive/ui/focus-tracking.html
   */
  _enableFocusTracking() {
    // Creates the focus tracker and keystroke handler.
    this.focusTracker = new FocusTracker();
    this.keystrokes = new KeystrokeHandler();

    // Performs the "Select All" action automatically whenever the value input field is focused.
    // Users typically won't need to edit the value but will instead replace the entire contents with a pasted URL or embed code.
    this.focusTracker.on('change:focusedElement', (evt, data, focusedElement) => {
      if (focusedElement === this.valueInputView.element)
        this.valueInputView.fieldView.element.select();
    });

    // Creates the keyboard focus cycler.
    this.focusCycler = new FocusCycler({
      focusables: this.childViews,
      focusTracker: this.focusTracker,
      keystrokeHandler: this.keystrokes,
      actions: {
        focusPrevious: 'shift + tab', // Navigate form fields backwards using the Shift + Tab keystroke.
        focusNext: 'tab' // Navigate form fields forwards using the Tab key.
      }
    });
  }
}
