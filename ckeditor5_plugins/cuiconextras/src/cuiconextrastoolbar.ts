/**
 * @file adds functionality to the icon toolbar.
 */

import type { ButtonExecuteEvent, DropdownButtonView, DropdownView } from 'ckeditor5/src/ui';
import { ButtonView, createDropdown, addToolbarToDropdown } from 'ckeditor5/src/ui';
import type { BackgroundStyle, Color } from './cuiconextrasconfig';
import { colorOptions, colorDefault, backgroundStyleOptions, backgroundStyleDefault } from './cuiconextrasconfig';
import type { PluginDependencies } from 'ckeditor5/src/core';
import { Plugin } from 'ckeditor5/src/core';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import themeIcon from '../../../icons/theme.svg';
import type { Locale, ObservableChangeEvent } from 'ckeditor5/src/utils';
import { SelectableOption } from './cuiconextrastypes';
import ModifyIconCommand from './modifyiconcommand';
import type { PluginInterface } from '@ckeditor/ckeditor5-core/src/plugin';

export default class CUIconExtrasToolbar extends Plugin implements PluginInterface {
  /**
   * @inheritdoc
   */
  public static get requires(): PluginDependencies {
    return [WidgetToolbarRepository] as const;
  }

  /**
   * @inheritdoc
   */
  public init() {
    const editor = this.editor,
      commands = editor.commands,
      componentFactory = editor.ui.componentFactory;

    // Makes style and theme options avaliable to the widget toolbar.
    componentFactory.add('iconCUColor', locale =>
      createToolbarDropdown<Color>(locale, 'Icon theme color', themeIcon, commands.get('changeIconCUColor')!, colorOptions, colorDefault));
    componentFactory.add('iconCUBackgroundStyle', locale =>
      createToolbarDropdown<BackgroundStyle>(locale, 'Icon background style', backgroundStyleOptions[backgroundStyleDefault].icon, commands.get('changeIconCUBackgroundStyle')!, backgroundStyleOptions, backgroundStyleDefault));

    // Adds the new items to the icon toolbar along with the existing items.
    editor.config.set('icon.toolbarItems', ['iconSize', 'iconAlignment', 'iconStyle', 'iconCUColor', 'iconCUBackgroundStyle']);
  }
}

/**
 * Creates a dropdown with multiple buttons for executing a command.
 *
 * @returns
 *   The dropdown.
 */
function createToolbarDropdown<T extends string>(locale: Locale, label: string, icon: string | undefined, command: ModifyIconCommand<T>, options: Record<T, SelectableOption>, defaultValue: T): DropdownView {
  const dropdownView = createDropdown(locale), buttonView: DropdownButtonView = dropdownView.buttonView as DropdownButtonView, t = locale.t;
  addToolbarToDropdown(dropdownView, Object.entries<SelectableOption>(options).map(([optionValue, option]: [T, SelectableOption]) =>
    createToolbarButton<T>(locale, option.label, option.icon, command, optionValue)));
  buttonView.set({
    label: t(label),
    icon,
    tooltip: t(label),
    withText: !icon,
    class: 'ck-dropdown__button_label-width_auto'
  });
  if (icon === options[defaultValue].icon) { // If the icon for the dropdown is the same as the icon for the default option, it changes to reflect the current selection.
    command.on<ObservableChangeEvent<T>>('change:value', (_eventInfo, _name, value) => {
      const selectableOption: SelectableOption = options[value];
      buttonView.label = t(selectableOption.label);
      if (buttonView.icon && !selectableOption.icon)
        buttonView.children.remove(buttonView.iconView);
      else if (!buttonView.icon && selectableOption.icon)
        buttonView.children.add(buttonView.iconView, 0);
      buttonView.icon = selectableOption.icon;
      buttonView.withText = !selectableOption.icon;
    });
  }
  // Enable button if any of the buttons are enabled.
  dropdownView.bind('isEnabled').to(command, 'isEnabled');
  return dropdownView;
}

/**
 * @returns
 *   A button with the specified parameters.
 */
function createToolbarButton<T extends string>(locale: Locale, label: string, icon: string | null | undefined, command: ModifyIconCommand<T>, value: T): ButtonView {
  const editor = command.editor, buttonView = createButton(locale, label, icon);
  buttonView.tooltip = !!icon; // Displays the tooltip on hover.
  buttonView.isToggleable = true; // Allows the button with the command's current value to display as selected.
  // Disables the button if the command is disabled.
  buttonView.bind('isEnabled').to(command);
  // Allows the button with the command's current value to display as selected.
  buttonView.bind('isOn').to(command, 'value', commandValue => commandValue === value);
  // Executes the command with the button's value on click.
  buttonView.on<ButtonExecuteEvent>('execute', () => {
    command.execute({ value });
    editor.editing.view.focus();
  });
  return buttonView;
}

/**
 * @param locale
 *   The locale.
 * @param label
 *   The button's label.
 * @param icon
 *   The button's icon (optional).
 * @param  className
 *   The button's class (optional).
 * @param withText
 *   Set to force text display even if the button has an icon.
 * @returns
 *   A button with the specified parameters.
 */
function createButton(locale: Locale, label: string, icon?: string | null, className?: string | null, withText?: boolean | string | null): ButtonView {
  const button = new ButtonView(locale);

  button.set({
    label: typeof withText === 'string' ? withText : label,
    icon,
    tooltip: icon ? label : false,
    withText: withText || !icon,
    class: className
  });

  return button;
}
