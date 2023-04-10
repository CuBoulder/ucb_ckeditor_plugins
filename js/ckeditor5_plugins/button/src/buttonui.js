import { Plugin } from 'ckeditor5/src/core';
import FormView from './buttonview';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import icon from '../../../../icons/hand-pointer-regular.svg';
import { ButtonView, ContextualBalloon } from 'ckeditor5/src/ui';
import getRangeText from './buttonutils';

export default class ButtonUI extends Plugin {
    static get requires() {
		return [ContextualBalloon]
	}
    init() {
        const editor = this.editor;
        
        // TO DO - _createFormView currently errors out, t is not a function on View create. Need to solve UI... 
        this._balloon = this.editor.plugins.get(ContextualBalloon);
        // this.formView = this._createFormView();

        editor.ui.componentFactory.add( 'button', () => {
            const command = editor.commands.get( 'addButton' );
            const button = new ButtonView();

            button.set( {
                label: 'Button',
                icon: icon,
                tooltip: true,
            } );

            this.listenTo( button, 'execute', () => {
                this._showUI();
                // editor.execute('addButton')
            });

            return button;
        } );
    }

    _createFormView() {
		const editor = this.editor;
		const formView = new FormView( editor.locale ); // currently causes t is not a function

		// Execute the command after clicking the "Save" button.
		this.listenTo( formView, 'submit', () => {
			// Grab values from the color, style, size and link input fields.
			const value = {
				color: formView.colorSelect.fieldView.element.value,
				style: formView.styleSelect.fieldView.element.value,
                size: formView.sizeSelect.fieldView.element.value,
                link: formView.linkInput.fieldView.element.value
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

    _showUI(){
        const selection = this.editor.model.document.selection;

		// Check the value of the command.
		const commandValue = this.editor.commands.get( 'addButton' ).value;

		this._balloon.add( {
			view: this.formView,
			position: this._getBalloonPositionData()
		} );

		console.log

		// Fill the form using the state (value) of the command.
		if ( commandValue ) {
			this.formView.colorSelect.fieldView.value = commandValue.color;
			this.formView.styleSelect.fieldView.value = commandValue.title;
            this.formView.sizeSelect.fieldView.value = commandValue.size;
            this.formView.linkInput.fieldView.value = commandValue.link
		}

		else {
			const selectedText = getRangeText( selection.getFirstRange() );
			this.formView.linkInput.fieldView.value = selectedText;
		}

		this.formView.focus();
    }

    _hideUI() {
		// Clear the input field values and reset the form.
        this.formView.linkInput.fieldView.value = ''
		this.formView.element.reset();

		this._balloon.remove( this.formView );

		// Focus the editing view after inserting the abbreviation so the user can start typing the content
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