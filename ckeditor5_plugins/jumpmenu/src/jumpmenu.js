// jumpmenu.js
import JumpMenuEditing from './jumpmenuediting';
import JumpMenuUI from './jumpmenuui';
import { Plugin } from 'ckeditor5/src/core';

export default class JumpMenu extends Plugin {
  static get requires() {
    return [JumpMenuEditing, JumpMenuUI];
  }
}
