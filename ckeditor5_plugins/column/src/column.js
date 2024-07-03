import ColumnEditing from './columnediting';
import ColumnUI from './columnui';
import { Plugin } from 'ckeditor5/src/core';

export default class Column extends Plugin {
  static get requires() {
    return [ColumnEditing, ColumnUI];
  }

  static get pluginName() {
    return 'Column';
  }
}
