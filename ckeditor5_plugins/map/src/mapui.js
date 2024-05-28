/**
 * @file registers the map toolbar button and binds functionality to it.
 * 
 * @typedef { import('@ckeditor/ckeditor5-utils').Locale } Locale
 * @typedef { import('@ckeditor/ckeditor5-core').Command } Command
 * @typedef { import('@ckeditor/ckeditor5-core/src/editor/editorwithui').EditorWithUI } EditorWithUI
 * @typedef { import('@ckeditor/ckeditor5-engine').Element } Element
 * @typedef { import('./insertmapcommand').default } InsertMapCommand
 */

import { Plugin } from 'ckeditor5/src/core';
import { ButtonView, ContextualBalloon, clickOutsideHandler } from 'ckeditor5/src/ui';
import MapFormView from './mapformview';
import mapIcon from '../../../icons/map.svg';
import { campusMapLocationToURL, googleMapLocationToURL } from './maputils';

export default class MapUI extends Plugin {
  /**
   * @inheritdoc
   */
  static get requires() {
    return [ContextualBalloon];
  }

  /**
   * @inheritdoc
   */
  init() {
    /** @type {EditorWithUI} */
    const editor = this.editor;
    /** @type {InsertMapCommand} */
    const insertMapCommand = editor.commands.get('insertMap');
    const viewDocument = editor.editing.view.document;
    const componentFactory = editor.ui.componentFactory;

    // Create the balloon and the form view.
    this._balloon = editor.plugins.get(ContextualBalloon);
    this.formView = this._createFormView(editor.locale);

    // This will register the map toolbar button.
    componentFactory.add('map', (locale) => {
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: locale.t('Map'),
        icon: mapIcon,
        tooltip: true,
        isToggleable: true
      });

      // Bind the state of the button to the command.
      buttonView.bind('isEnabled').to(insertMapCommand, 'isEnabled');
      buttonView.bind('isOn').to(insertMapCommand, 'existingMapSelected');

      // Shows the UI on "Map" toolbar button click.
      this.listenTo(buttonView, 'execute', () => {
        this._showUI(insertMapCommand.existingMapSelected);
      });

      // Shows the UI on click of a map widget.
      this.listenTo(viewDocument, 'click', () => {
        if (insertMapCommand.existingMapSelected)
          this._showUI(insertMapCommand.existingMapSelected);
      });

      return buttonView;
    });
  }

  /**
   * @param {Locale} locale 
   * @returns {MapFormView}
   *   The map creation form view.
   */
  _createFormView(locale) {
    const editor = this.editor;
    const formView = new MapFormView(locale);

    // Execute the command after clicking the "Save" button.
    this.listenTo(formView, 'submit', () => {
      editor.execute('insertMap', { value: formView.valueInputView.fieldView.element.value, size: formView.size });
      this._hideUI();
    });

    // Hide the form view after clicking the "Cancel" button.
    this.listenTo(formView, 'cancel', () => this._hideUI());

    // Hide the form view when clicking outside the balloon.
    clickOutsideHandler({
      emitter: formView,
      activator: () => this._balloon.visibleView === formView,
      contextElements: [this._balloon.view.element],
      callback: () => this._hideUI()
    });

    // Close the panel on esc key press when the form has focus.
    formView.keystrokes.set('Esc', (data, cancel) => {
      this._hideUI();
      cancel();
    });

    return formView;
  }

  /**
   * @param {Element | null} selectedMap 
   */
  _showUI(selectedMap) {
    this._balloon.add({
      view: this.formView,
      position: this._getBalloonPositionData()
    });
    if (selectedMap) {
      const mapLocation = selectedMap.getAttribute('mapLocation');
      if (mapLocation && selectedMap.name === 'campusMap')
        this.formView.value = campusMapLocationToURL(mapLocation);
      else if (mapLocation && selectedMap.name === 'googleMap')
        this.formView.value = googleMapLocationToURL(mapLocation);
      this.formView.size = selectedMap.getAttribute('mapSize');
      this.editor.model.change(writer => writer.setSelection(selectedMap, 'on')); // Fixes a bug which can cause another map to appear rather than the insert command replacing the existing one.
    }
    this.formView.focus();
  }

  _hideUI() {
    this.formView.reset();
    this._balloon.remove(this.formView);

    // Focus the editing view after inserting the tooltip so the user can start typing the content right away and keep the editor focused.
    this.editor.editing.view.focus();
  }

  _getBalloonPositionData() {
    const view = this.editor.editing.view;
    const viewDocument = view.document;

    // Set a target position by converting view selection range to DOM
    const target = () => view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange());

    return { target };
  }
}
