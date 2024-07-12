/**
 * @file registers the jump menu toolbar button and binds functionality to it.
 *
 * @typedef { import('@ckeditor/ckeditor5-utils').Locale } Locale
 * @typedef { import('@ckeditor/ckeditor5-core').Command } Command
 * @typedef { import('@ckeditor/ckeditor5-core/src/editor/editorwithui').EditorWithUI } EditorWithUI
 * @typedef { import('@ckeditor/ckeditor5-engine').Element } Element
 */

import { Plugin } from 'ckeditor5/src/core';
import { ButtonView, createDropdown, Model } from 'ckeditor5/src/ui';
import jumpMenuIcon from '../../../icons/anchor-solid.svg';

export default class JumpMenuUI extends Plugin {
  /**
   * @inheritdoc
   */
  static get requires() {
    return [createDropdown];
  }

  /**
   * @inheritdoc
   */
  init() {
    const editor = this.editor;
    const componentFactory = editor.ui.componentFactory;

    // Register the insert jump menu button.
    componentFactory.add('insertJumpMenu', locale => {
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: 'Insert Jump Menu',
        icon: jumpMenuIcon,
        tooltip: true
      });

      buttonView.on('execute', () => {
        editor.execute('insertJumpMenu');
        editor.editing.view.focus();
      });

      return buttonView;
    });

    // Register the dropdown for header tags.
    componentFactory.add('changeHeaderTag', locale => {
      const dropdownView = createDropdown(locale);
      const buttons = this._createDropdownItems(locale);

      dropdownView.buttonView.set({
        label: 'Header Tag',
        tooltip: true,
        withText: true
      });

      dropdownView.buttonView.bind('isEnabled').to(
        editor.commands.get('changeHeaderTag')
      );

      dropdownView.panelView.children.add(...buttons);

      dropdownView.on('execute', evt => {
        editor.execute('changeHeaderTag', { value: evt.source.commandParam });
      });

      return dropdownView;
    });
  }

  /**
   * Create the dropdown items for the header tags.
   *
   * @param {Locale} locale
   * @returns {Array}
   */
  _createDropdownItems(locale) {
    const editor = this.editor;
    const options = ['h2', 'h3', 'h4', 'h5'];
    const itemDefinitions = new Array();

    for (const option of options) {
      const definition = {
        type: 'button',
        model: new Model({
          commandParam: option,
          label: option.toUpperCase(),
          withText: true
        })
      };

      definition.model.bind('isOn').to(
        editor.commands.get('changeHeaderTag'),
        'value',
        value => value === option
      );

      itemDefinitions.push(definition);
    }

    return itemDefinitions.map(def => {
      const buttonView = new ButtonView(locale);
      buttonView.bind(...Object.keys(def.model._boundAttributes)).to(def.model);

      buttonView.on('execute', evt => {
        editor.execute('changeHeaderTag', { value: evt.source.commandParam });
      });

      return buttonView;
    });
  }
}
