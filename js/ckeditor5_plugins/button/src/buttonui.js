// Handles the admin side where youre adding buttons to toolbar
// Also handles the format and display during editing
import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../../icons/hand-pointer-regular.svg'

export default class ButtonUI extends Plugin {
	init() {
		const editor = this.editor;

		// Add strikethrough button to feature components.
		editor.ui.componentFactory.add( 'button', () => {
			const command = editor.commands.get('addButton')
			const button = new ButtonView();

			button.label = 'Button';
			button.icon = icon;
			button.tooltip = true;
			button.withText = true;


			button.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');
			// Execute the command when the button is clicked (executed).
			this.listenTo(button, 'execute', () =>
				editor.execute('addButton'),
			);

			return button;
		} );
	}
}
	