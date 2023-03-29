/**
 * @file registers the box toolbar button and binds functionality to it.
 */

import { Plugin } from 'ckeditor5/src/core';
import { ClickObserver } from 'ckeditor5/src/engine';
import { ButtonView, ContextualBalloon, clickOutsideHandler } from 'ckeditor5/src/ui';
import icon from '../../../../icons/box.svg';
import BoxFormView from './boxformview';

export default class BoxUI extends Plugin {
	/**
	 * The contextual balloon plugin instance.
	 * @type {ContextualBalloon}
	 */
	_balloon

	/**
	 * The form view displayed inside the balloon.
	 * @type {BoxFormView}
	 */
	formView

	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ContextualBalloon];
	}

	init() {
		const editor = this.editor;
		editor.editing.view.addObserver(ClickObserver);
		this._balloon = editor.plugins.get(ContextualBalloon);
		this.formView = this._createFormView();
		this._enableBalloonActivators();

		// This will register the box toolbar button.
		editor.ui.componentFactory.add('box', (locale) => {
			const command = editor.commands.get('insertBox');
			const buttonView = new ButtonView(locale);

			// Create the toolbar button.
			buttonView.set({
				label: editor.t('Box'),
				icon,
				tooltip: true,
			});

			// Bind the state of the button to the command.
			buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

			// Execute the command when the button is clicked (executed).
			this.listenTo(buttonView, 'execute', () =>
				editor.execute('insertBox'),
			);

			return buttonView;
		});
	}

	_createFormView() {
		const editor = this.editor;
		const formView = new BoxFormView(editor.locale);
		// Hide the form view when clicking outside the balloon.
		clickOutsideHandler({
			emitter: formView,
			activator: () => this._balloon.visibleView === formView,
			contextElements: [this._balloon.view.element],
			callback: () => this._hideUI()
		});
		return formView;
	}

	_showUI(box) {
		this._balloon.add({
			view: this.formView,
			position: this._getBalloonPositionData(box)
		});
	}

	_hideUI() {
		this.formView.element.reset();
		this._balloon.remove(this.formView);
	}

	_enableBalloonActivators() {
		const editor = this.editor;
		const viewDocument = editor.editing.view.document;
		this.listenTo(viewDocument, 'click', () => {
			const view = editor.editing.view;
			const selection = view.document.selection;
			const selectedElement = selection.getSelectedElement();
			const box = selectedElement && selectedElement.hasClass('ucb-box') ? selectedElement : selection.focus.getAncestors()
				.find((node) => node.is('element') && node.hasClass('ucb-box'));
			if (box)
				this._showUI(box);
		});
	}

	_getBalloonPositionData(box) {
		const view = this.editor.editing.view;
		let target = null;

		// Set a target position by converting view selection range to DOM.
		target = () => view.domConverter.mapViewToDom(box) ;

		return {
			target
		};
	}
}
