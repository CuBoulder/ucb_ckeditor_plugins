// Handles the admin side where youre adding buttons to toolbar
// Also handles the format and display during editing
import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import audioIcon from '../../../../icons/invisible.svg'

export default class InvisibleUI extends Plugin {
	init() {
		const editor = this.editor;

		// Add strikethrough button to feature components.
		editor.ui.componentFactory.add( 'invisible', () => {
			const command = editor.commands.get('addInvisible')
			const button = new ButtonView();

			button.label = 'Screen-Reader Only';
			button.icon = audioIcon;
			button.tooltip = true;
			button.withText = false;


			button.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');
			// Execute the command when the button is clicked (executed).
			this.listenTo(button, 'execute', () =>
				editor.execute('addInvisible'),
			);

			return button;
		} );
	}
}
	