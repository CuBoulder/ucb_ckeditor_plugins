import { 
	View, 
	LabeledFieldView, 
	createDropdown, 
	ButtonView, 
	submitHandler, 
	FocusCycler 
} from 'ckeditor5/src/ui';
import { FocusTracker, KeystrokeHandler } from 'ckeditor5/src/utils';
import { icons } from 'ckeditor5/src/core';

export default class FormView extends View {
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
			this.saveButtonView.icon = icons.check
			this.saveButtonView.class = 'ck-button-save';
	
			// Set the type of the save button to "submit" to trigger the submit event on the entire form when clicked.
			this.saveButtonView.type = 'submit';
	
			// Create the cancel button view.
			this.cancelButtonView = new ButtonView( locale );
			this.cancelButtonView.label = 'Cancel';
			this.cancelButtonView.icon = icons.cancel;
			this.cancelButtonView.class = 'ck-button-cancel';
	
			// Set the type of the cancel button to "button" to prevent it from triggering the form submission.
			this.cancelButtonView.set({ type: 'button' });

			this.childViews = this.createCollection([
				this.linkInput,
				this.sizeSelect,
				this.colorSelect,
				this.styleSelect,
				this.saveButtonView,
				this.cancelButtonView
			])

			this._focusCycler = new FocusCycler( {
				focusables: this.childViews,
				focusTracker: this.focusTracker,
				keystrokeHandler: this.keystrokes,
				actions: {
					// Navigate form fields backwards using the Shift + Tab keystroke.
					focusPrevious: 'shift + tab',
	
					// Navigate form fields forwards using the Tab key.
					focusNext: 'tab'
				}
			} );
	
			this.setTemplate( {
				tag: 'form',
				attributes: {
					class: [ 'ck', 'ck-button-form' ],
					tabindex: '-1'
				},
				children: this.childViews
			} );
		}
	
		render() {
			super.render();
	
			submitHandler( {
				view: this
			} );
	
			this.childViews._items.forEach( view => {
				// Register the view in the focus tracker.
				this.focusTracker.add( view.element );
			} );
	
			// Start listening for the keystrokes coming from #element.
			this.keystrokes.listenTo( this.element );
		}

		destroy() {
			super.destroy();
	
			this.focusTracker.destroy();
			this.keystrokes.destroy();
		}
			
}
