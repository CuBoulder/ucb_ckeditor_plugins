import { Plugin } from 'ckeditor5/src/core';
import { ButtonView, ContextualBalloon, clickOutsideHandler } from 'ckeditor5/src/ui';
import FormView from './buttonview';

import getRangeText from './buttonutils.js';
import icon from '../../../../icons/hand-pointer-regular.svg';
import { sizeOptions, styleOptions, colorOptions, defaultColor,defaultStyle,defaultSize} from './buttonconfig';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';

import colorIcon from '../../../../icons/paint.svg'

export default class ButtonUI extends Plugin {
	static get requires() {
		return [ ContextualBalloon ];
	}

	init() {
		const editor = this.editor;
		const componentFactory = editor.ui.componentFactory;


        // Create the balloon and the form view.
		this._balloon = this.editor.plugins.get( ContextualBalloon );
		this.formView = this._createFormView();


		componentFactory.add( 'button', () => {
			const button = new ButtonView();

			button.label = 'Button';
			button.icon = icon;
			button.tooltip = true;
			button.withText = false;
			
			// Show the UI on button click.
			this.listenTo( button, 'execute', () => {
				this._showUI();
			} );

			return button;
		} );

		// Makes title, alignment, style, and theme options avaliable to the widget toolbar.
			componentFactory.add('buttonColor', locale => 
				this._createDropdown(locale, 'Button Color', colorIcon, commands.get('value'), colorOptions, defaultColor));
			componentFactory.add('buttonStyle', locale => 
				this._createDropdown(locale, 'Button Style', alignmentOptions[alignmentDefault].icon, commands.get('value'), styleOptions, defaultStyle));
			componentFactory.add('buttonSize', locale =>
				this._createDropdown(locale, 'Button Size', styleOptions[styleDefault].icon, commands.get('value'), styleOptions, defaultSize));

	}

	afterInit() {
		const editor = this.editor;
		const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);
		widgetToolbarRepository.register('button', {
			items: ['buttonColor', 'buttonStyle', 'buttonSize'],
			getRelatedElement: (selection) =>
				selection.focus.getAncestors()
					.find((node) => node.is('element') && node.hasClass('ucb-button'))
		});
	}

  

	_createFormView() {
		const editor = this.editor;
		const formView = new FormView( editor.locale );

		// Execute the command after clicking the "Save" button.
		this.listenTo( formView, 'submit', () => {
			// Grab values from the tool tip and title input fields.
			const value = {
				link: formView.linkInputView.fieldView.element.value
			};
			editor.execute( 'addButton', value );

            // Hide the form view after submit.
			this._hideUI();
		} );

		// Hide the form view after clicking the "Cancel" button.
		this.listenTo( formView, 'cancel', () => {
			this._hideUI();
		} );

		// Hide the form view when clicking outside the balloon.
		clickOutsideHandler( {
			emitter: formView,
			activator: () => this._balloon.visibleView === formView,
			contextElements: [ this._balloon.view.element ],
			callback: () => this._hideUI()
		} );

		return formView;
	}

	_showUI() {
		const selection = this.editor.model.document.selection;

		// Check the value of the command.
		const commandValue = this.editor.commands.get( 'addButton' ).value;

		this._balloon.add( {
			view: this.formView,
			position: this._getBalloonPositionData()
		} );

		// Disable the input when the selection is not collapsed.
		this.formView.linkInputView.isEnabled = selection.getFirstRange().isCollapsed;

		// Fill the form using the state (value) of the command.
		if ( commandValue ) {
			this.formView.linkInputView.fieldView.value = commandValue.link;
		}
		// If the command has no value, put the currently selected text (not collapsed)
		// in the first field and empty the second in that case.
		else {
			const selectedText = getRangeText( selection.getFirstRange() );

			this.formView.linkInputView.fieldView.value = selectedText;
		}

		this.formView.focus();
	}

	_hideUI() {
		// Clear the input field values and reset the form.
		this.formView.linkInputView.fieldView.value = '';
		// this.formView.titleInputView.fieldView.value = '';
		this.formView.element.reset();

		this._balloon.remove( this.formView );

		// Focus the editing view after inserting the tooltip so the user can start typing the content
		// right away and keep the editor focused.
		this.editor.editing.view.focus();
	}

	_getBalloonPositionData() {
		const view = this.editor.editing.view;
		const viewDocument = view.document;
		let target = null;

		// Set a target position by converting view selection range to DOM
		target = () => view.domConverter.viewRangeToDom( viewDocument.selection.getFirstRange() );

		return {
			target
		};
	}
}