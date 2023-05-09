/**
 * @file registers the map toolbar button and binds functionality to it.
 * 
 * @typedef { import('@types/ckeditor__ckeditor5-utils').Locale } Locale
 * @typedef { import('@types/ckeditor__ckeditor5-core').Command } Command
 * @typedef { import('@types/ckeditor__ckeditor5-core/src/editor/editorwithui').EditorWithUI } EditorWithUI
 * @typedef { import('./mapconfig').SelectableOption } SelectableOption
 */

import { Plugin } from 'ckeditor5/src/core';
import { ButtonView, ContextualBalloon, clickOutsideHandler, createDropdown, View } from 'ckeditor5/src/ui';
import { sizeDefault, sizeOptions } from './mapconfig';
import MapFormView from './mapformview';
import mapIcon from '../../../../icons/map.svg';

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
		const editor = this.editor,
			commands = editor.commands,
			componentFactory = editor.ui.componentFactory;

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
				tooltip: true
			});

			// Show the UI on button click.
			this.listenTo(buttonView, 'execute', () => this._showUI());

			return buttonView;
		});
	}

	_createFormView(locale) {
		const formView = new MapFormView(locale);

		// Hide the form view after clicking the "Cancel" button.
		this.listenTo(formView, 'cancel', () => this._hideUI());

		// Hide the form view when clicking outside the balloon.
		clickOutsideHandler({
			emitter: formView,
			activator: () => this._balloon.visibleView === formView,
			contextElements: [this._balloon.view.element],
			callback: () => this._hideUI()
		});

		return formView;
	}

	_showUI() {
		this._balloon.add({
			view: this.formView,
			position: this._getBalloonPositionData()
		});
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
