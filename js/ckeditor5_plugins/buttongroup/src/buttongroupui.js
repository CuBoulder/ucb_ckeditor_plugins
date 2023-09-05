import { Plugin } from 'ckeditor5/src/core';
import { ButtonView, ContextualBalloon, clickOutsideHandler } from 'ckeditor5/src/ui';
import BGFormView from './buttongroupview';

import icon from '../../../../icons/bars-solid.svg';

export default class ButtonGroupUI extends Plugin {
	static get requires() {
		return [ ContextualBalloon ];
	}

	init() {
		const editor = this.editor;
		const componentFactory = editor.ui.componentFactory;
		const insertButtonGroupCommand = editor.commands.get('addButtonGroup')
		const viewDocument = editor.editing.view.document;

        // Create the balloon and the form view.
		this._balloon = this.editor.plugins.get( ContextualBalloon );
		this.formView = this._createFormView(editor.locale);
		this.buttonView = null;

		// This will register the Button button to the toolbar
		componentFactory.add( 'buttonGroup', (locale) => {
			const button = new ButtonView(locale);

			button.label = 'Button Group';
			button.icon = icon;
			button.tooltip = true;
			button.withText = false;
			button.isToggleable = true;
			// Show the UI on button click.
			this.listenTo( button, 'execute', () => {
				this._showUI(insertButtonGroupCommand.existingButtonSelected)
			} );

			this.buttonView = button;

			// Show the on/off in Toolbar if a button is already selected.
			const updateButtonState = () => {
				const linkButtonSelected = insertButtonGroupCommand.existingButtonSelected;
				button.isOn = !!linkButtonSelected;
			};
			  
			 // Listen for changes in the linkButton selection.
			this.listenTo(insertButtonGroupCommand, 'change:value', updateButtonState);
			this.listenTo(insertButtonGroupCommand, 'change:existingButtonSelected', updateButtonState);
			
			// Shows the UI on click of a button widget.
			this.listenTo(viewDocument, 'click', () => {
				if (insertButtonGroupCommand.existingButtonSelected)
					this._showUI(insertButtonGroupCommand.existingButtonSelected);
			});

			// Bind the state of the button to the command.
			button.bind('isOn', 'isEnabled').to(insertButtonGroupCommand, 'value', 'isEnabled');

			return button;
		} );
	}

	_createFormView(locale) {
		const editor = this.editor;
		const componentFactory = editor.ui.componentFactory;
		const formView = new BGFormView( locale, componentFactory);


		// Execute the command after clicking the "Save" button.
		this.listenTo( formView, 'submit', () => {
			// Grab values from the Form and title input fields.
			const value = {
				color: formView.color,
				size: formView.size,
			};
			editor.execute( 'addButtonGroup', value );

            // Hide the form view after submit.
			this._hideUI();
		} );

		// Hide the form view after clicking the "Cancel" button.
		this.listenTo( formView, 'cancel', () => {
			this._hideUI();
		} );
		
		// Close the panel on esc key press when the form has focus.
		formView.keystrokes.set('Esc', (data, cancel) => {
			this._hideUI();
			cancel();
		});

		// Hide the form view when clicking outside the balloon.
		clickOutsideHandler( {
			emitter: formView,
			activator: () => this._balloon.visibleView === formView,
			contextElements: [ this._balloon.view.element ],
			callback: () => this._hideUI()
		} );

		return formView;
	}

	_showUI(selectedButton) {
		const selection = this.editor.model.document.selection;
		this.buttonView.isOn = true;
		// Check the value of the command.
		const commandValue = this.editor.commands.get( 'addButtonGroup' ).value;

		this._balloon.add( {
			view: this.formView,
			position: this._getBalloonPositionData()
		} );

		if (selectedButton) {
			const size = selectedButton.getAttribute('buttonGroupSize');
			const color = selectedButton.getAttribute('buttonGroupColor');
			// const style = selectedButton.getAttribute('linkButtonStyle');
			// const href = selectedButton.getAttribute('linkButtonHref');
		
			this.formView.color = color;
			// this.formView.style = style;
			this.formView.size = size;
		
			// this.formView.linkInputView.fieldView.value = href;
			// this.formView.linkInputView.fieldView.element.value = href; // Update the input field value
			// this.formView.linkInputView.fieldView.set('value', href); // Update the input field value (alternative method)
		}

		// Disable the input when the selection is not collapsed.
		// this.formView.linkInputView.isEnabled = selection.getFirstRange().isCollapsed;

		// Fill the form using the state (value) of the command.
		if ( commandValue ) {
			// this.formView.linkInputView.fieldView.value = commandValue.link;
			this.formView.colorDropdown.fieldView.value = commandValue.color;
			this.formView.sizeDropdown.fieldView.value = commandValue.size;
			// this.formView.styleDropdown.fieldView.value = commandValue.style
		}

		this.formView.focus();
	}

	_hideUI() {
		// Clear the input field values and reset the form.
		this.formView.element.reset();
		this.buttonView.isOn = false;

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
