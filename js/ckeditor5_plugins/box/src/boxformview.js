import {
	View,
	LabeledFieldView,
	createLabeledInputText,
	ButtonView,
	submitHandler
} from 'ckeditor5/src/ui';
import { icons } from 'ckeditor5/src/core';

export default class BoxFormView extends View {
	constructor(locale) {
		super(locale);
		// Create the save and cancel buttons.
		this.saveButtonView = this._createButton(
			'Save', icons.check, 'ck-button-save'
		);
		// Set the type to 'submit', which will trigger
		// the submit event on entire form when clicked.
		this.saveButtonView.type = 'submit';

		this.cancelButtonView = this._createButton(
			'Cancel', icons.cancel, 'ck-button-cancel'
		);
		this.childViews = this.createCollection([
			// this.abbrInputView,
			// this.titleInputView,
			this.saveButtonView,
			this.cancelButtonView
		]);

		this.setTemplate({
			tag: 'form',
			attributes: {
				// Attributes of a form template.
				// ...
			},
			children: this.childViews
		});
	}

	render() {
		super.render();

		// Submit the form when the user clicked the save button
		// or pressed enter in the input.
		submitHandler({
			view: this
		});
	}

	focus() {
		this.childViews.first.focus();
	}

	_createInput(label) {
		// Input initialization.
		// ...
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
}
