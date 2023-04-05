import { View, LabeledFieldView, createDropdown, ButtonView, submitHandler, FocusCycler } from 'ckeditor5/src/ui';
import { FocusTracker, KeystrokeHandler } from 'ckeditor5/src/utils';
import { icons } from 'ckeditor5/src/core';

export default class MyButtonView extends View {
	constructor( locale ) {
		super( locale );

		this.focusTracker = new FocusTracker();
		this.keystrokes = new KeystrokeHandler();

		// Create a labeled field view for the color select.
		this.colorSelectView = new LabeledFieldView( locale );
		this.colorSelectView.label = 'Color';

		// Create the color select field.
		this.colorSelect = createDropdown( this.locale, {
			choices: [
				{ value: 'blue', label: 'Blue' },
				{ value: 'black', label: 'Black' },
				{ value: 'grey', label: 'Grey' },
				{ value: 'white', label: 'White' }
			]
		} );
		this.colorSelectView.fieldView = this.colorSelect;

		// Create a labeled field view for the style select.
		this.styleSelectView = new LabeledFieldView( locale );
		this.styleSelectView.label = 'Style';

		// Create the style select field.
		this.styleSelect = createDropdown( this.locale, {
			choices: [
				{ value: 'Regular', label: 'Regular' },
				{ value: 'Full', label: 'Full' }
			]
		} );
		this.styleSelectView.fieldView = this.styleSelect;

		// Create a labeled field view for the size select.
		this.sizeSelectView = new LabeledFieldView( locale );
		this.sizeSelectView.label = 'Size';

		// Create the size select field.
		this.sizeSelect = createDropdown( this.locale, {
			choices: [
				{ value: 'Large', label: 'Large' },
				{ value: 'Regular', label: 'Regular' },
				{ value: 'Small', label: 'Small' }
			]
		} );
		this.sizeSelectView.fieldView = this.sizeSelect;

		// Create a labeled field view for the link input.
		this.linkView = new LabeledFieldView( locale );
		this.linkView.label = 'Link';

		// Create the link input field.
		this.linkInput = document.createElement('input');
		this.linkInput.type = 'text';
		this.linkInput.placeholder = 'Enter link URL here';
		this.linkView.fieldView = this.linkInput;

		// Create the save button view.
		this.saveButtonView = new ButtonView( locale );
		this.saveButtonView.label = 'Save';
		this.saveButtonView.icon = icons.check;
		this.saveButtonView.class = 'ck-button-save';

		// Set the type of the save button to "submit" to trigger the submit event on the entire form when clicked.
		this.saveButtonView.type = 'submit';

		// Create the cancel button view.
		this.cancelButtonView = new ButtonView( locale );
		this.cancelButtonView.label = 'Cancel';
		this.cancelButtonView.icon = icons.cancel;
		this.cancelButtonView.class = 'ck-button-cancel';

		// Delegate ButtonView#execute to FormView#cancel.
		this.cancelButtonView.delegate( 'execute' ).to( this, 'cancel' )


		// Create the FocusCycler instance and add all the child views to it.
		this.focusCycler = new FocusCycler( {
			actions: {
				focusPrevious: 'up',
				focusNext: 'down'
			}
		} );
		this.focusCycler.add( this.colorSelectView );
		this.focusCycler.add( this.styleSelectView );
		this.focusCycler.add( this.sizeSelectView );
		this.focusCycler.add(this.linkView);
		this.focusCycler.add( this.saveButtonView);
		this.focusCycler.add( this.cancelButtonView );



	// Attach the submit handler to the form view.
	this.submitHandler = new submitHandler();
	this.submitHandler.delegate( 'submit' ).to( this, 'save' );

	// Attach listeners to the form view for focus and keystrokes.
	this.keystrokes.listenTo( this.element );
	this.focusTracker.add( this.element );
}
}