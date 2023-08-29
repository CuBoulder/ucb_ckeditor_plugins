import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui'; 
import marginIcon from '../../../../icons/compress-alt-solid.svg';

export default class MarginUI extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add('margin', locale => { // Pass the locale argument
      const command = editor.commands.get('addCloseMargin');
      const t = locale.t; // Use the locale for translation

      const button = new ButtonView();
      button.set({
        label: t('Close Margin'), // Translate the label
        icon: marginIcon,
        tooltip: true,
        withText: false,
      });

      button.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      this.listenTo(button, 'execute', () =>
        editor.execute('addCloseMargin')
      );

      return button;
    });
  }
}
