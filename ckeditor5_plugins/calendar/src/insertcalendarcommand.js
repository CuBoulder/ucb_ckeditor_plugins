/**
 * @file defines InsertCalendarCommand, which is executed when the calendar toolbar button is pressed.
 * 
 * @typedef { import('@ckeditor/ckeditor5-engine').Element } Element
 * @typedef { import('@ckeditor/ckeditor5-engine/src/model/writer').default } Writer
 */

import { Command } from 'ckeditor5/src/core';
import { googleCalendarURLToQueryString } from './calendarutils';

export default class InsertCalendarCommand extends Command {
  /**
   * Creates a new InsertCalendarCommand.
   * 
   * @param {Editor} editor 
   *   The editor.
   */
  constructor(editor) {
    super(editor);
    this.set('existingCalendarSelected', false);
  }

  /**
   * @inheritdoc
   */
  execute(options = { value: '' }) {
    const value = options.value.trim(), model = this.editor.model;

    if (!value) return;

    let calendarModel = 'googleCalendar';
    let queryString = googleCalendarURLToQueryString(value); // Converts the user-supplied URL to a location for a Google Calendar.
    if (!queryString) return;

    model.change((writer) => model.insertContent(writer.createElement(calendarModel, { calendarQueryString: queryString })));
  }

  /**
   * @inheritdoc
   */
  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;
    const selectedElement = selection.getSelectedElement();

    // Determine if the cursor (selection) is in a position where adding a
    // calendar is permitted. This is based on the schema of the model(s)
    // currently containing the cursor.
    const googleCalendarAllowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'googleCalendar'
    );

    // If the cursor is not in a location where a calendar can be added, return
    // null so the addition doesn't happen.
    this.isEnabled = googleCalendarAllowedIn !== null;

    // Adds a helpful attribute to get an existing selected calendar element.
    this.existingCalendarSelected = isCalendarElement(selectedElement) ? selectedElement : null;
  }
}

/**
 * @param {Element | null} element 
 * @returns {boolean}
 *   Whether or not `element` is a calendar element.
 */
function isCalendarElement(element) {
  return element && element.name === 'googleCalendar';
}
