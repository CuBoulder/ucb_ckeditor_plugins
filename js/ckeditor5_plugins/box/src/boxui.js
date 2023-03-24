/**
 * @file registers the box toolbar button and binds functionality to it.
 */

import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../../icons/box.svg';

export default class BoxUI extends Plugin {
  init() {
    const editor = this.editor;

    // This will register the box toolbar button.
    editor.ui.componentFactory.add('box', (locale) => {
      const command = editor.commands.get('insertBox');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: editor.t('Box'),
        icon,
        tooltip: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
        editor.execute('insertBox'),
      );

      return buttonView;
    });
  }
}
