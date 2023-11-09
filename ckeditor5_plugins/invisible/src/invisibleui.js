// // Handles the admin side where youre adding buttons to toolbar
// // Also handles the format and display during editing
import { Plugin } from 'ckeditor5/src/core';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import { addToolbarToDropdown, ButtonView, createDropdown, createLabeledInputText, FocusCycler, LabeledFieldView, submitHandler, View } from 'ckeditor5/src/ui';
import audioIcon from '../../../icons/invisible.svg'

export default class InvisibleUI extends Plugin {
	static get requires() {
		return [ WidgetToolbarRepository ];
	}

	init() {
		const editor = this.editor;
		const commands = editor.commands;
		const componentFactory = editor.ui.componentFactory;

		// This will register the ButtonGroup button to the toolbar
		componentFactory.add( 'buttonGroup', (locale) => {
			const button = new ButtonView(locale);
			const command = commands.get('addInvisible');
		
			button.label = 'Screen-Reader Only';
			button.icon = audioIcon
			button.tooltip = true;
			button.withText = false;
			button.isToggleable = true;

			// Bind the state of the button to the command.
			button.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

			// Execute the command when the button is clicked (executed).
			this.listenTo(button, 'execute', () => editor.execute('addInvisible'));

			return button;
		} );
		componentFactory.add('invisibleInnerText', locale =>
			this._createInput(locale, 'Screen-Reader Text'));
	}

		/**
	 * @inheritdoc
	 */
		afterInit() {
			const editor = this.editor;
			const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);
		
			widgetToolbarRepository.register('invisible', {
				items: ['invisibleInnerText'],
				getRelatedElement: (selection) => {
					const selectedElement = selection.getSelectedElement();
					if (selectedElement && selectedElement.is('element') && selectedElement.hasClass('ucb-invisible'))
						return selectedElement;
				  	return null;
				}
			});
		}
		// Inside the InvisibleUI plugin:

		_createInput(locale, label) {
			const labeledInput = new LabeledFieldView(locale, createLabeledInputText);
			labeledInput.label = locale.t(label);

			// Add an event listener to update the command state or a variable when the input changes.
			this.listenTo(labeledInput.fieldView, 'input', () => {
				const text = labeledInput.fieldView.element.value;

				// Call updateText to update the command state
				const command = this.editor.commands.get('addInvisible');
				if (command) {
					command.updateText(text);
					// If you need to execute the command right after updating text
					command.execute(text); // Pass the text value directly
				}
			});


			return labeledInput;
		}

}



	