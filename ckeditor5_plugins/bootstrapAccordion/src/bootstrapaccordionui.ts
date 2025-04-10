import type { PluginInterface } from '@ckeditor/ckeditor5-core/src/plugin';
import type { DropdownViewEvent } from '@ckeditor/ckeditor5-ui/src/dropdown/dropdownview';
import type { Command } from 'ckeditor5/src/core';
import type { ButtonExecuteEvent, DropdownView, ViewModel } from 'ckeditor5/src/ui';
import type { Locale } from 'ckeditor5/src/utils';
import type { AccordionEvent, AccordionItemEvent, AccordionItemOperation, AccordionOperation } from './bootstrapaccordiontypes';
import { Plugin } from 'ckeditor5/src/core';
import { ButtonView, ListDropdownItemDefinition, addListToDropdown, createDropdown } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import BootstrapAccordionEvents from './bootstrapaccordionevents';
import { UiViewModel as ShimmedViewModel } from './bootstrapaccordionshims';
import { getSelectedAccordionWidget } from './bootstrapaccordionutils';
import icon from '../../../icons/bootstrap-accordion.svg';
import iconItem from '../../../icons/bootstrap-accordion-item.svg';
import iconOpenCollapse from '../../../icons/bootstrap-accordion-open-collapse.svg';

// cSpell:ignore dropdownview switchbutton

/**
 * Defines the user interface for editing Bootstrap Accordion widgets.
 */
export default class BootstrapAccordionUI extends Plugin implements PluginInterface {

  /**
   * The plugin's name in the PluginCollection.
   */
  static get pluginName(): 'BootstrapAccordionUI' {
    return 'BootstrapAccordionUI' as const;
  }

  /**
   * The plugin's dependencies.
   */
  static get requires() {
    return [BootstrapAccordionEvents, WidgetToolbarRepository] as const;
  }

  /**
   * @inheritdoc
   */
  init() {
    const { commands, plugins, ui } = this.editor;
    const componentFactory = ui.componentFactory;
    const events = plugins.get('BootstrapAccordionEvents')!;

    componentFactory.add('bootstrapAccordion', locale =>
      createToolbarButton(locale, locale.t('Insert accordion'), icon, commands.get('insertBootstrapAccordion')!));
    componentFactory.add('bootstrapAccordionItem', locale =>
      this._buildAccordionItemToolbarDropdown(locale, events));
    componentFactory.add('bootstrapAccordionOpenCollapse', locale =>
      this._buildAccordionOpenCollapseToolbarDropdown(locale, events));
  }

  /**
   * @inheritdoc
   */
  afterInit() {
    const { config, plugins } = this.editor;
    const widgetToolbarRepository = plugins.get(WidgetToolbarRepository);

    widgetToolbarRepository.register('bootstrapAccordion', {
      items: config.get('bootstrapAccordion.toolbarItems')!,
      getRelatedElement: getSelectedAccordionWidget
    });
  }

  /**
   * Builds the dropdown with options for the selected accordion item.
   *
   * @param locale
   *   The locale.
   * @param events
   *   An instance of the BootstrapAccordionEvents plugin.
   * @returns
   *   The dropdown view.
   */
  private _buildAccordionItemToolbarDropdown(locale: Locale, events: BootstrapAccordionEvents): DropdownView {
    const commands = this.editor.commands;
    const insertBootstrapAccordionItem = commands.get('insertBootstrapAccordionItem')!;
    const removeBootstrapAccordionItem = commands.get('removeBootstrapAccordionItem')!;

    const dropdownView = createDropdown(locale);
    const buttonView = dropdownView.buttonView;
    const list = new Collection<ListDropdownItemDefinition>();
    const t = locale.t;

    list.add({
      type: 'button', model:
        createViewModel<AccordionItemOperation>(insertBootstrapAccordionItem, null, 'insertAbove', t('Insert item above'))
    });
    list.add({
      type: 'button', model:
        createViewModel<AccordionItemOperation>(insertBootstrapAccordionItem, null, 'insertBelow', t('Insert item below'))
    });
    list.add({
      type: 'button', model:
        createViewModel<AccordionItemOperation>(removeBootstrapAccordionItem, null, 'remove', t('Delete item'))
    });

    addListToDropdown(dropdownView, list);

    dropdownView.on<DropdownViewEvent>('execute', eventInfo =>
      events.fire<AccordionItemEvent>('accordionItem', (eventInfo.source as typeof ViewModel).name as AccordionItemOperation));

    buttonView.set({
      label: t('Accordion item'),
      icon: iconItem,
      tooltip: t('Accordion item'),
      class: 'ck-dropdown__button_label-width_auto',
      withText: false
    });

    return dropdownView;
  }

  /**
   * Builds the dropdown with open/collapse options for the selected accordion.
   *
   * @param locale
   *   The locale.
   * @param events
   *   An instance of the BootstrapAccordionEvents plugin.
   * @returns
   *   The dropdown view.
   */
  private _buildAccordionOpenCollapseToolbarDropdown(locale: Locale, events: BootstrapAccordionEvents): DropdownView {
    const commands = this.editor.commands;

    const dropdownView = createDropdown(locale);
    const buttonView = dropdownView.buttonView;
    const list = new Collection<ListDropdownItemDefinition>();
    const t = locale.t;

    list.add({
      type: 'switchbutton', model:
        createViewModel<AccordionOperation>(commands.get('bootstrapAccordionFirstItemOpen')!, true, 'toggleFirstItemOpen', t('Open first item'))
    });
    list.add({
      type: 'switchbutton', model:
        createViewModel<AccordionOperation>(commands.get('bootstrapAccordionItemsStayOpen')!, 'true', 'toggleItemsStayOpen', t('Allow opening multiple items'))
    });
    list.add({ type: 'separator' });
    list.add({
      type: 'button', model:
        createViewModel<AccordionOperation>(commands.get('bootstrapAccordionOpenAll')!, 'true', 'openAll', t('Open all items'))
    });
    list.add({
      type: 'button', model:
        createViewModel<AccordionOperation>(commands.get('bootstrapAccordionCollapseAll')!, 'true', 'collapseAll', t('Collapse all items'))
    });

    addListToDropdown(dropdownView, list);

    dropdownView.on<DropdownViewEvent>('execute', eventInfo =>
      events.fire<AccordionEvent>('accordion', (eventInfo.source as typeof ViewModel).name as AccordionOperation));

    buttonView.set({
      label: t('Accordion open / collapse'),
      icon: iconOpenCollapse,
      tooltip: t('Accordion open / collapse'),
      class: 'ck-dropdown__button_label-width_auto',
      withText: false
    });

    return dropdownView;
  }


}

/**
 * Creates a toolbar button to execute a command.
 *
 * @param locale
 *   The locale.
 * @param label
 *   The button's label.
 * @param icon
 *   The button's icon (can be `null` for none).
 * @param command
 *   The command to execute when pressing the button.
 * @param value
 *   The value to pass to the command (optional).
 * @returns
 *   A button with the specified parameters.
 */
function createToolbarButton<T>(locale: Locale, label: string, icon: string | null | undefined, command: Command, value?: T): ButtonView {
  const editor = command.editor;
  const buttonView = createButton(locale, label, icon);
  // Displays the tooltip on hover if there is no icon.
  buttonView.tooltip = !!icon;
  // Disables the button if the command is disabled.
  buttonView.bind('isEnabled').to(command);
  // Executes the command with the button's value on click.
  buttonView.on<ButtonExecuteEvent>('execute', () => {
    command.execute({ value });
    editor.editing.view.focus();
  });
  return buttonView;
}

/**
 * Creates a button.
 *
 * @param locale
 *   The locale.
 * @param label
 *   The button's label.
 * @param icon
 *   The button's icon (optional).
 * @param className
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

/**
 * Creates a view model.
 *
 * @param command
 *   The command this view model affects.
 * @param value
 *   The value of the command which makes this view model `on`. Can be `null`,
 *   in which case it will never have the `on` state.
 * @param name
 *   The view model's name.
 * @param label
 *   The view model's label.
 * @param icon
 *   The view model's icon (optional).
 * @param className
 *   The view model's class (optional).
 * @param withText
 *   Set to force text display even if the button has an icon.
 * @returns
 *   A view model with the specified parameters.
 */
function createViewModel<T extends string>(command: Command, value: unknown, name: T, label: string, icon?: string | null, className?: string | null, withText?: boolean | string | null): ViewModel {
  const viewModel = new ShimmedViewModel({
    name,
    label: typeof withText === 'string' ? withText : label,
    icon,
    tooltip: icon ? label : false,
    withText: withText || !icon,
    class: className
  });

  viewModel.bind('isEnabled').to(command);
  if (value !== null) {
    viewModel.bind('isOn').to(command, 'value', commandValue => commandValue === value);
  }

  return viewModel;
}
