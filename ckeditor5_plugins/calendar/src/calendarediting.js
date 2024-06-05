/**
 * @file defines schemas, converters, and commands for the calendar plugin.
 * 
 * @typedef { import('./calendarconfig').SelectableOption } SelectableOption
 * @typedef { import('@ckeditor/ckeditor5-engine').DowncastWriter } DowncastWriter
 * @typedef { import('@ckeditor/ckeditor5-engine/src/view/containerelement').default } ContainerElement
 */

import { Plugin } from 'ckeditor5/src/core';
import { toWidget } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertCalendarCommand from './insertcalendarcommand';
import { googleCalendarQueryStringToURL } from './calendarutils';

// cSpell:ignore calendar insertcalendarcommand

/**
 * CKEditor 5 plugins do not work directly with the DOM. They are defined as
 * plugin-specific data models that are then converted to markup that
 * is inserted in the DOM.
 *
 * CKEditor 5 internally interacts with calendar as this model:
 * <googleCalendar> </googleCalendar>
 *
 * Which is converted for the browser/user as this markup
 * <ucb-calendar class="ucb-calendar ucb-campus-calendar"> </ucb-calendar>
 *
 * This file has the logic for defining the calendar model, and for how it is
 * converted to standard DOM markup.
 */
export default class CalendarEditing extends Plugin {
  /**
   * @inheritdoc
   */
  static get requires() {
    return [Widget];
  }

  /**
   * @inheritdoc
   */
  init() {
    this._defineSchema();
    this._defineConverters();
    this._defineCommands();
  }

  /*
   * This registers the structure that will be seen by CKEditor 5 as
   * <googleCalendar>
   * </googleCalendar>
   *
   * The logic in _defineConverters() will determine how this is converted to
   * markup.
   */
  _defineSchema() {
    // Schemas are registered via the central `editor` object.
    const schema = this.editor.model.schema;

    schema.register('googleCalendar', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',
      // Allow the attributes which control the calendar's alignment, style, and theme.
      allowAttributes: ['calendarQueryString'],
      // Disallows any child elements inside the <ucb-calendar> element.
      allowChildren: false
    });
  }

  /**
   * Converters determine how CKEditor 5 models are converted into markup and
   * vice-versa.
   */
  _defineConverters() {
    // Converters are registered via the central editor object.
    const conversion = this.editor.conversion;

    // Specifies the query string attribute for calendars.
    conversion.attributeToAttribute({
      model: {
        key: 'calendarQueryString',
        value: viewElement => viewElement.getAttribute('data-query-string').replace(/&amp;/g, '&') // Fixes a bug which caused the `&` character in the query string to become `&amp;`.
      },
      view: 'data-query-string'
    });

    // Upcast Converters: determine how existing HTML is interpreted by the
    // editor. These trigger when an editor instance loads.
    //
    // If <ucb-calendar class="ucb-calendar ucb-campus-calendar"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <googleCalendar> model.
    conversion.for('upcast').elementToElement({
      model: 'googleCalendar',
      view: {
        name: 'ucb-calendar',
        classes: ['ucb-calendar', 'ucb-google-calendar']
      }
    });

    // Data Downcast Converters: converts stored model data into HTML.
    // These trigger when content is saved.
    //
    // Instances of <googleCalendar> are saved as
    // <ucb-calendar class="ucb-calendar ucb-google-calendar"></ucb-calendar>.
    conversion.for('dataDowncast').elementToElement({
      model: 'googleCalendar',
      view: (modelElement, { writer: viewWriter }) => createGoogleCalendarView(modelElement, viewWriter)
    });

    // Editing Downcast Converters. These render the content to the user for
    // editing, i.e. this determines what gets seen in the editor. These trigger
    // after the Data Upcast Converters, and are re-triggered any time there
    // are changes to any of the models' properties.
    //
    // Convert the <googleCalendar> model into a container widget in the editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'googleCalendar',
      view: (modelElement, { writer: viewWriter }) => createGoogleCalendarView(modelElement, viewWriter, true)
    });
  }

  /**
   * Defines the commands for inserting or modifying the calendar.
   */
  _defineCommands() {
    const commands = this.editor.commands;
    commands.add('insertCalendar', new InsertCalendarCommand(this.editor));
  }
}

/**
 * @param {Element} modelElement
 *   The element which contains the googleCalendar model.
 * @param {DowncastWriter} downcastWriter
 *   The downcast writer.
 * @param {boolean} [widget=false]
 *   Whether or not to return a widget for editing. Defaults to `false`.
 * @returns {ContainerElement}
 *   The Google Calendar element or widget.
 */
 function createGoogleCalendarView(modelElement, downcastWriter, widget = false) {
  if (widget) {
    const queryString = modelElement.getAttribute('calendarQueryString') || '';
    return toWidget(downcastWriter.createContainerElement('div',
      {
        class: 'ucb-calendar ucb-google-calendar',
      }, [
      downcastWriter.createEmptyElement('iframe', {
        src: googleCalendarQueryStringToURL(queryString),
        loading: 'lazy',
        referrerpolicy: 'no-referrer',
        frameborder: '0',
        scrolling: 'no'
      }),
      downcastWriter.createEmptyElement('div', {
        class: 'ucb-calendar-editing-cover'
      })
    ]), downcastWriter, { label: 'calendar widget' });
  }
  return downcastWriter.createContainerElement('ucb-calendar', { class: 'ucb-calendar ucb-google-calendar' });
}
