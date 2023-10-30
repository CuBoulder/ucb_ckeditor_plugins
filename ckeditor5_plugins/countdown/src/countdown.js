import CountdownEditing from './countdownediting';
import { Plugin } from 'ckeditor5/src/core';
import CountdownUI from './countdownui.js';

/**
 * @file This is what CKEditor refers to as a master (glue) plugin. Its role is
 * just to load the “editing” and “UI” components of this Plugin. Those
 * components could be included in this file, but
 *
 * I.e, this file's purpose is to integrate all the separate parts of the plugin
 * before it's made discoverable via index.js.
 */

// The contents of CountdownUI and CountdownEditing could be included in this
// file, but it is recommended to separate these concerns in different files.
  export default class Countdown extends Plugin {
    static get requires() {
      return [ CountdownEditing, CountdownUI ];
    }
  }