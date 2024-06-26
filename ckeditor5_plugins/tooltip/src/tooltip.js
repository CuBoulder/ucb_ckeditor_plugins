/**
 * @file This is what CKEditor refers to as a master (glue) plugin. Its role is
 * just to load the “editing” and “UI” components of this Plugin. Those
 * components could be included in this file, but
 *
 * I.e, this file's purpose is to integrate all the separate parts of the plugin
 * before it's made discoverable via index.js.
 */
// cSpell:ignore tooltipEditing tooltipUI

// The contents of TooltipUI and TooltipEditing could be included in this
// file, but it is recommended to separate these concerns in different files.
import TooltipEditing from './tooltipediting';
import TooltipUI from './tooltipui';
import { Plugin } from 'ckeditor5/src/core';

// Note that TooltipEditing and TooltipUI also extend `Plugin`, but these
// are not seen as individual plugins by CKEditor 5. CKEditor 5 will only
// discover the plugins explicitly exported in index.js.
export default class Tooltip extends Plugin {
  static get requires() {
    return [ TooltipEditing, TooltipUI ];
  }
}
