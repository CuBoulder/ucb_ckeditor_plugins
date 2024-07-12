/**
 * @file defines InsertJumpMenuCommand, which is executed when the jump menu toolbar button is pressed.
 *
 * @typedef { import('@ckeditor/ckeditor5-engine').Element } Element
 * @typedef { import('@ckeditor/ckeditor5-engine/src/model/writer').default } Writer
 */

import { Command } from 'ckeditor5/src/core';

export default class InsertJumpMenuCommand extends Command {
  /**
   * Creates a new InsertJumpMenuCommand.
   *
   * @param {Editor} editor
   *   The editor.
   */
  constructor(editor) {
    super(editor);
    this.set('existingJumpMenuSelected', false);
  }

  /**
   * @inheritdoc
   */
  execute(options = { headerTag: 'h2' }) {
    const headerTag = options.headerTag.trim();
    const model = this.editor.model;

    model.change(writer => {
      const jumpMenuElement = writer.createElement('ucb-jump-menu', { headerTag });
      model.insertContent(jumpMenuElement, model.document.selection);
    });
  }

  /**
   * @inheritdoc
   */
  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;
    const selectedElement = selection.getSelectedElement();

    // Determine if the cursor (selection) is in a position where adding a jump menu is permitted.
    const jumpMenuAllowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'ucb-jump-menu');

    // If the cursor is not in a location where a jump menu can be added, return null so the addition doesn't happen.
    this.isEnabled = jumpMenuAllowedIn !== null;

    // Adds a helpful attribute to get an existing selected jump menu element.
    this.existingJumpMenuSelected = isJumpMenuElement(selectedElement) ? selectedElement : null;
  }
}

/**
 * @param {Element | null} element
 * @returns {boolean}
 *   Whether or not `element` is a jump menu element.
 */
function isJumpMenuElement(element) {
  return element && element.name === 'ucb-jump-menu';
}
