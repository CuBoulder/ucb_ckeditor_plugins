import {
	View,
	LabeledFieldView,
	createLabeledInputText,
	ButtonView,
	submitHandler,
	FocusCycler
} from 'ckeditor5/src/ui';
import { FocusTracker, KeystrokeHandler } from 'ckeditor5/src/utils';
import { icons } from 'ckeditor5/src/core';

export default class FormView extends View {
	constructor( locale, componentFactory) {
		super( locale);
		this.focusTracker = new FocusTracker();
		this.keystrokes = new KeystrokeHandler();

		console.log('componentF', componentFactory)

		// TO DO -- appears to add to component factory? How to retrieve and add to UI
		const color = componentFactory.add('buttonColor', locale => 
			this._createDropdown(locale, 'Button Color', colorIcon, commands.get('value'), colorOptions, defaultColor));
		const style = componentFactory.add('buttonStyle', locale => 
			this._createDropdown(locale, 'Button Style', styleOptions[defaultStyle].icon, commands.get('value'), styleOptions, defaultStyle));
		const size = componentFactory.add('buttonSize', locale =>
			this._createDropdown(locale, 'Button Size', sizeOptions[defaultSize].icon, commands.get('value'), sizeOptions, defaultSize));

		this.innerTextInputView = this._createInput( 'Button Text' );
		this.linkInputView = this._createInput( 'Add Link' );
		

		this.saveButtonView = this._createButton( 'Save', icons.check, 'ck-button-save' );

		// Submit type of the button will trigger the submit event on entire form when clicked 
		//(see submitHandler() in render() below).
		this.saveButtonView.type = 'submit';

		this.cancelButtonView = this._createButton( 'Cancel', icons.cancel, 'ck-button-cancel' );

		// Delegate ButtonView#execute to FormView#cancel.
		this.cancelButtonView.delegate( 'execute' ).to( this, 'cancel' );

		this.childViews = this.createCollection( [
			this.innerTextInputView,
			this.linkInputView,
			this.saveButtonView,
			this.cancelButtonView
		] );

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

	focus() {
		// If the abbreviation text field is enabled, focus it straight away to allow the user to type.
		if ( this.linkInputView.isEnabled ) {
			this.linkInputView.focus();
		}
		// Focus the tooltip title field if the former is disabled.
		else {
			this.linkInputView.focus();
		}
	}

	_createInput( label ) {
		const labeledInput = new LabeledFieldView( this.locale, createLabeledInputText );

		labeledInput.label = label;

		return labeledInput;
	}

	_createButton( label, icon, className ) {
		const button = new ButtonView();

		button.set( {
			label,
			icon,
			tooltip: true,
			class: className
		} );

		return button;
	}

	_createDropdownButton(label, icon, command, value) {
		const editor = this.editor;
		const buttonView = new ButtonView();
		buttonView.set({
			label,
			icon,
			tooltip: true, // Displays the tooltip on hover
			isToggleable: true, // Allows the button with the command's current value to display as selected
			withText: !icon // Displays the button as text if the icon is falsey
		});
		// Disables the button if the command is disabled
		buttonView.bind('isEnabled').to(command);
		// Allows the button with the command's current value to display as selected
		buttonView.bind('isOn').to(command, 'value', commandValue => commandValue === value);
		// Executes the command with the button's value on click
		this.listenTo(buttonView, 'execute', () => {
			command.execute({ value });
			editor.editing.view.focus();
		});
		return buttonView;
	}


	_createDropdown(locale, label, command, options) {
		const dropdownView = createDropdown(locale);
		addToolbarToDropdown(dropdownView, Object.entries(options).map(([optionValue, option]) => this._createDropdownButton(option.label, option.icon, command, optionValue)));
		dropdownView.buttonView.set({
			label,
			icon,
			tooltip: true,
			withText: !icon
		});
		// Enable button if any of the buttons are enabled.
		dropdownView.bind('isEnabled').to(command, 'isEnabled');
		return dropdownView;		
	}
}