/**
 * @file registers the map toolbar button and binds functionality to it.
 * 
 * @typedef { import('@types/ckeditor__ckeditor5-utils').Locale } Locale
 * @typedef { import('@types/ckeditor__ckeditor5-core').Command } Command
 * @typedef { import('@types/ckeditor__ckeditor5-core/src/editor/editorwithui').EditorWithUI } EditorWithUI
 * @typedef { import('@types/ckeditor__ckeditor5-engine/src/view/element').default } Element
 */

import { Plugin } from 'ckeditor5/src/core';
import { ButtonView, ContextualBalloon, clickOutsideHandler } from 'ckeditor5/src/ui';
import MapFormView from './mapformview';
import mapIcon from '../../../../icons/map.svg';
import { sizeOptions } from './mapconfig';
import { campusMapLocationToURL } from './maputils';

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
			viewDocument = editor.editing.view.document,
			componentFactory = editor.ui.componentFactory;

		// Create the balloon and the form view.
		this._balloon = editor.plugins.get(ContextualBalloon);
		this.formView = this._createFormView(editor.locale);

		// This will register the map toolbar button.
		componentFactory.add('map', (locale) => {
			const command = commands.get('insertMap');
			const buttonView = new ButtonView(locale);

			// Create the toolbar button.
			buttonView.set({
				label: locale.t('Map'),
				icon: mapIcon,
				tooltip: true
			});

			// Bind the state of the button to the command.
			buttonView.bind('isEnabled').to(command, 'isEnabled');

			// Shows the UI on "Map" toolbar button click.
			this.listenTo(buttonView, 'execute', () => {
				const selectedElement = viewDocument.selection.getSelectedElement();
				this._showUI(isMapElement(selectedElement) ? selectedElement : null);
			});

			// Shows the UI on click of a map widget.
			this.listenTo(viewDocument, 'click', () => {
				const selectedElement = viewDocument.selection.getSelectedElement();
				if (isMapElement(selectedElement)) this._showUI(selectedElement);
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
			editor.execute('insertMap', { value: formView.value, size: formView.size });
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
			const mapLocation = selectedMap.hasClass('ucb-campus-map') ? selectedMap.getAttribute('data-map-location') : null;
			if (mapLocation)
				this.formView.value = campusMapLocationToURL(mapLocation);
			for (const [value, option] of Object.entries(sizeOptions)) { // Sets the size to that of the selected map
				if (selectedMap.hasClass(option.className)) {
					this.formView.set('size', value);
					break;
				}
			}
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

/**
 * @param {Element | null} element 
 * @returns {boolean}
 *   Whether or not `element` is a map element.
 */
function isMapElement(element) {
	return element && element.hasClass('ucb-map');
}
