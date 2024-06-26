import { Plugin } from 'ckeditor5/src/core';
import ButtonGroupUI from './buttongroupui';
import ButtonGroupEditing from './buttongroupediting';

/**
 * @file This is what CKEditor refers to as a master (glue) plugin. Its role is
 * just to load the “editing” and “UI” components of this Plugin. Those
 * components could be included in this file, but
 *
 * I.e, this file's purpose is to integrate all the separate parts of the plugin
 * before it's made discoverable via index.js.
 */

// The contents of ButtonUI and ButtonEditing could be included in this
// file, but it is recommended to separate these concerns in different files.
export default class ButtonGroup extends Plugin {
  static get requires() {
    return [ ButtonGroupEditing, ButtonGroupUI ];
  }
}
