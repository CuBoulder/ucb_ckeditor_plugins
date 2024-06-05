/**
 * @file registers the calendar toolbar button and binds functionality to it.
 * 
 * @typedef { import('@ckeditor/ckeditor5-utils').Locale } Locale
 * @typedef { import('@ckeditor/ckeditor5-core').Command } Command
 * @typedef { import('@ckeditor/ckeditor5-core/src/editor/editorwithui').EditorWithUI } EditorWithUI
 * @typedef { import('@ckeditor/ckeditor5-engine').Element } Element
 * @typedef { import('./insertcalendarcommand').default } InsertCalendarCommand
 */

import { Plugin } from 'ckeditor5/src/core';
import { ButtonView, ContextualBalloon, clickOutsideHandler } from 'ckeditor5/src/ui';
import CalendarFormView from './calendarformview';
import calendarIcon from '../../../icons/calendar.svg';
import { googleCalendarQueryStringToURL } from './calendarutils';

export default class CalendarUI extends Plugin {
  /**
   * @inheritdoc
   */
  static get requires() {
    return [ContextualBalloon];
  }

  /**
   * @inheritdoc
   */
  init() {
    /** @type {EditorWithUI} */
    const editor = this.editor;
    /** @type {InsertCalendarCommand} */
    const insertCalendarCommand = editor.commands.get('insertCalendar');
    const viewDocument = editor.editing.view.document;
    const componentFactory = editor.ui.componentFactory;

    // Create the balloon and the form view.
    this._balloon = editor.plugins.get(ContextualBalloon);
    this.formView = this._createFormView(editor.locale);

    // This will register the calendar toolbar button.
    componentFactory.add('calendar', (locale) => {
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: locale.t('Calendar'),
        icon: calendarIcon,
        tooltip: true,
        isToggleable: true
      });

      // Bind the state of the button to the command.
      buttonView.bind('isEnabled').to(insertCalendarCommand, 'isEnabled');
      buttonView.bind('isOn').to(insertCalendarCommand, 'existingCalendarSelected');

      // Shows the UI on "Calendar" toolbar button click.
      this.listenTo(buttonView, 'execute', () => {
        this._showUI(insertCalendarCommand.existingCalendarSelected);
      });

      // Shows the UI on click of a calendar widget.
      this.listenTo(viewDocument, 'click', () => {
        if (insertCalendarCommand.existingCalendarSelected)
          this._showUI(insertCalendarCommand.existingCalendarSelected);
      });

      return buttonView;
    });
  }

  /**
   * @param {Locale} locale 
   * @returns {CalendarFormView}
   *   The calendar creation form view.
   */
  _createFormView(locale) {
    const editor = this.editor;
    const formView = new CalendarFormView(locale);

    // Execute the command after clicking the "Save" button.
    this.listenTo(formView, 'submit', () => {
      editor.execute('insertCalendar', { value: formView.valueInputView.fieldView.element.value });
      this._hideUI();
    });

    // Hide the form view after clicking the "Cancel" button.
    this.listenTo(formView, 'cancel', () => this._hideUI());

    // Hide the form view when clicking outside the balloon.
    clickOutsideHandler({
      emitter: formView,
      activator: () => this._balloon.visibleView === formView,
      contextElements: [this._balloon.view.element],
      callback: () => this._hideUI()
    });

    // Close the panel on esc key press when the form has focus.
    formView.keystrokes.set('Esc', (data, cancel) => {
      this._hideUI();
      cancel();
    });

    return formView;
  }

  /**
   * @param {Element | null} selectedCalendar 
   */
  _showUI(selectedCalendar) {
    this._balloon.add({
      view: this.formView,
      position: this._getBalloonPositionData()
    });
    if (selectedCalendar) {
      const queryString = selectedCalendar.getAttribute('calendarQueryString');
      if (queryString && selectedCalendar.name === 'googleCalendar')
        this.formView.value = googleCalendarQueryStringToURL(queryString);
      this.editor.model.change(writer => writer.setSelection(selectedCalendar, 'on')); // Fixes a bug which can cause another calendar to appear rather than the insert command replacing the existing one.
    }
    this.formView.focus();
  }

  _hideUI() {
    this.formView.reset();
    this._balloon.remove(this.formView);

    // Focus the editing view after inserting the tooltip so the user can start typing the content right away and keep the editor focused.
    this.editor.editing.view.focus();
  }

  _getBalloonPositionData() {
    const view = this.editor.editing.view;
    const viewDocument = view.document;

    // Set a target position by converting view selection range to DOM
    const target = () => view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange());

    return { target };
  }
}
