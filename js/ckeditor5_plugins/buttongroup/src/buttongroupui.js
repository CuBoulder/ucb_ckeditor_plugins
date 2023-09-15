import { Plugin } from 'ckeditor5/src/core';
// import BGFormView from './buttongroupview';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import { ButtonView, createDropdown, addToolbarToDropdown } from 'ckeditor5/src/ui';

import icon from '../../../../icons/arrows-turn-right-solid.svg';
import { colorOptions, defaultColor, defaultSize, sizeOptions } from './buttongroupconfig';

export default class ButtonGroupUI extends Plugin {
	static get requires() {
		return [ WidgetToolbarRepository ];
	}

	init() {
		const editor = this.editor;
		const commands = editor.commands;
		const componentFactory = editor.ui.componentFactory;

		// const insertButtonGroupCommand = editor.commands.get('addButtonGroup')
		// const viewDocument = editor.editing.view.document;

        // // Create the balloon and the form view.
		// this._balloon = this.editor.plugins.get( ContextualBalloon );
		// this.formView = this._createFormView(editor.locale);
		// this.buttonView = null;

		// This will register the ButtonGroup button to the toolbar
		componentFactory.add( 'buttonGroup', (locale) => {
			const button = new ButtonView(locale);
			const command = commands.get('addButtonGroup');


			button.label = 'Button Group';
			button.icon = icon;
			button.tooltip = true;
			button.withText = false;
			button.isToggleable = true;

			// Bind the state of the button to the command.
			button.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

			// Execute the command when the button is clicked (executed).
			this.listenTo(button, 'execute', () => editor.execute('addButtonGroup'));


			// // Show the UI on button click.
			// this.listenTo( button, 'execute', () => {
			// 	this._showUI(insertButtonGroupCommand.existingButtonGroupSelected)
			// } );

			// this.buttonView = button;

			// Show the on/off in Toolbar if a button is already selected.
			// const updateButtonState = () => {
			// 	const linkButtonSelected = insertButtonGroupCommand.existingButtonGroupSelected;
			// 	button.isOn = !!linkButtonSelected;
			// };
			  
			//  // Listen for changes in the linkButton selection.
			// this.listenTo(insertButtonGroupCommand, 'change:value', updateButtonState);
			// this.listenTo(insertButtonGroupCommand, 'change:existingButtonSelected', updateButtonState);
			
			// Shows the UI on click of a button widget.
			// this.listenTo(viewDocument, 'click', () => {
			// 	if (insertButtonGroupCommand.existingButtonGroupSelected)
			// 		this._showUI(insertButtonGroupCommand.existingButtonGroupSelected);
			// });

			// // Bind the state of the button to the command.
			// button.bind('isOn', 'isEnabled').to(insertButtonGroupCommand, 'value', 'isEnabled');

			return button;
		} );

		// Makes title, alignment, style, and theme options avaliable to the widget toolbar.
		componentFactory.add('buttonGroupSize', locale =>
			this._createDropdown(locale, 'Size', sizeOptions[defaultSize].icon, commands.get('buttonGroupSize'), sizeOptions, defaultSize));
		componentFactory.add('buttonGroupColor', locale =>
			this._createDropdown(locale, 'Color', colorOptions[defaultColor].icon, commands.get('buttonGroupColor'), colorOptions, defaultColor));
	}

		/**
	 * @inheritdoc
	 */
		afterInit() {
			const editor = this.editor;
			const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);
			widgetToolbarRepository.register('buttonGroup', {
				items: ['buttonGroupSize', 'buttonGroupColor'],
				getRelatedElement: (selection) =>
					selection.focus.getAncestors()
						.find((node) => node.is('element') && node.hasClass('ucb-button-group'))
			});
		}


			/**
	 * Creates a dropdown with multiple buttons for executing a command.
	 * 
	 * @param {Locale} locale
	 *   The locale.
	 * @param {string} label
	 *   The dropdown's label.
	 * @param {string | null} icon
	 *   The dropdowns's icon (optional). If `null`, the dropdown will display as text.
	 * @param {Command} command
	 *   The command to execute when one of the buttons is pushed.
	 * @param {Object<string, SelectableOption>} options
	 *   The options for buttons in this dropdown view.
	 * @param {string} defaultValue
	 *   The default value of the command.
	 * @returns {DropdownView}
	 *   The dropdown.
	 */
	_createDropdown(locale, label, icon, command, options, defaultValue) {
		const dropdownView = createDropdown(locale);
		addToolbarToDropdown(dropdownView, Object.entries(options).map(([optionValue, option]) => this._createButton(locale, option.label, option.icon, command, optionValue)));
		dropdownView.buttonView.set({
			label: locale.t(label),
			icon,
			tooltip: true,
			withText: !icon
		});
		if (icon === options[defaultValue].icon) // If the icon for the dropdown is the same as the icon for the default option, it changes to reflect the current selection.
			dropdownView.buttonView.bind('icon').to(command, 'value', value => options[value] ? options[value].icon : options[defaultValue].icon);
		// Enable button if any of the buttons are enabled.
		dropdownView.bind('isEnabled').to(command, 'isEnabled');
		return dropdownView;
	}


	_createButton(locale, label, icon, command, value) {
		const editor = this.editor, buttonView = new ButtonView();
		buttonView.set({
			label: locale.t(label),
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


	// _createFormView(locale) {
	// 	const editor = this.editor;
	// 	const componentFactory = editor.ui.componentFactory;
	// 	const formView = new BGFormView( locale, componentFactory);


	// 	// Execute the command after clicking the "Save" button.
	// 	this.listenTo( formView, 'submit', () => {
	// 		// Grab values from the Form and title input fields.
	// 		const value = {
	// 			color: formView.color,
	// 			size: formView.size,
	// 		};
	// 		editor.execute( 'addButtonGroup', value );

    //         // Hide the form view after submit.
	// 		this._hideUI();
	// 	} );

	// 	// Hide the form view after clicking the "Cancel" button.
	// 	this.listenTo( formView, 'cancel', () => {
	// 		this._hideUI();
	// 	} );
		
	// 	// Close the panel on esc key press when the form has focus.
	// 	formView.keystrokes.set('Esc', (data, cancel) => {
	// 		this._hideUI();
	// 		cancel();
	// 	});

	// 	// Hide the form view when clicking outside the balloon.
	// 	clickOutsideHandler( {
	// 		emitter: formView,
	// 		activator: () => this._balloon.visibleView === formView,
	// 		contextElements: [ this._balloon.view.element ],
	// 		callback: () => this._hideUI()
	// 	} );

	// 	return formView;
	// }

	// _showUI(selectedButton) {
	// 	const selection = this.editor.model.document.selection;
	// 	this.buttonView.isOn = true;
	
	// 	// Check the value of the command.
	// 	const commandValue = this.editor.commands.get('addButtonGroup').value;
	
	// 	// Check if the balloon is already open for the selectedButton
	// 	if (!this._balloon.visibleView || this._balloon.visibleView !== this.formView) {
	// 		this._balloon.add({
	// 			view: this.formView,
	// 			position: this._getBalloonPositionData(),
	// 		});
	// 	}
	
	// 	if (selectedButton) {
	// 		const size = selectedButton.getAttribute('buttonGroupSize');
	// 		const color = selectedButton.getAttribute('buttonGroupColor');
	
	// 		this.formView.color = color;
	// 		this.formView.size = size;
	// 	}
	
	// 	// Fill the form using the state (value) of the command.
	// 	if (commandValue) {
	// 		this.formView.colorDropdown.fieldView.value = commandValue.color;
	// 		this.formView.sizeDropdown.fieldView.value = commandValue.size;
	// 	}
	
	// 	this.formView.focus();
	// }
	

	// _hideUI() {
	// 	// Clear the input field values and reset the form.
	// 	this.formView.element.reset();
	// 	this.buttonView.isOn = false;

	// 	this._balloon.remove( this.formView );

	// 	// Focus the editing view after inserting the tooltip so the user can start typing the content
	// 	// right away and keep the editor focused.
	// 	this.editor.editing.view.focus();
	// }

	// _getBalloonPositionData() {
	// 	const view = this.editor.editing.view;
	// 	const viewDocument = view.document;
	// 	let target = null;

	// 	// Set a target position by converting view selection range to DOM
	// 	target = () => view.domConverter.viewRangeToDom( viewDocument.selection.getFirstRange() );

	// 	return {
	// 		target
	// 	};
	// }
}
