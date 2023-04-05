import ButtonEditing from './buttonediting';
import { Plugin } from 'ckeditor5/src/core';
import ButtonUI from './buttonui.js';

// Note that TooltipEditing and TooltipUI also extend `Plugin`, but these
  // are not seen as individual plugins by CKEditor 5. CKEditor 5 will only
  // discover the plugins explicitly exported in index.js.
  export default class Button extends Plugin {
    static get requires() {
      return [ ButtonEditing, ButtonUI ];
    }
  }