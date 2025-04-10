import type { PluginInterface } from '@ckeditor/ckeditor5-core/src/plugin';
import type { AccordionEvent, AccordionItemEvent } from './bootstrapaccordiontypes';
import { Plugin } from 'ckeditor5/src/core';
import BootstrapAccordionEditing from './bootstrapaccordionediting';

/**
 * Listens for events that affect a selected Bootstrap Accordion widget.
 */
export default class BootstrapAccordionEvents extends Plugin implements PluginInterface {

  /**
   * The plugin's name in the PluginCollection.
   */
  static get pluginName(): 'BootstrapAccordionEvents' {
    return 'BootstrapAccordionEvents' as const;
  }

  /**
   * The plugin's dependencies.
   */
  static get requires() {
    return [BootstrapAccordionEditing] as const;
  }

  /**
   * @inheritdoc
   */
  init() {
    const commands = this.editor.commands;
    const bootstrapAccordionFirstItemOpen = commands.get('bootstrapAccordionFirstItemOpen')!;
    const bootstrapAccordionItemsStayOpen = commands.get('bootstrapAccordionItemsStayOpen')!;
    const bootstrapAccordionOpenAll = commands.get('bootstrapAccordionOpenAll')!;
    const bootstrapAccordionCollapseAll = commands.get('bootstrapAccordionCollapseAll')!;
    const insertBootstrapAccordionItem = commands.get('insertBootstrapAccordionItem')!;
    const removeBootstrapAccordionItem = commands.get('removeBootstrapAccordionItem')!;

    this.on<AccordionEvent>('accordion', (_eventInfo, type) => {
      if (type === 'toggleFirstItemOpen') {
        bootstrapAccordionFirstItemOpen.execute({ value: !bootstrapAccordionFirstItemOpen.value });
      } else if (type === 'toggleItemsStayOpen') {
        const oldValue = bootstrapAccordionItemsStayOpen.value;
        bootstrapAccordionItemsStayOpen.execute({ value: oldValue === 'false' ? 'true' : 'false' });
        if (oldValue === 'true') {
          bootstrapAccordionCollapseAll.execute({ omitFirst: true });
        }
      } else if (type === 'openAll') {
        bootstrapAccordionOpenAll.execute();
      } else if (type === 'collapseAll') {
        bootstrapAccordionCollapseAll.execute();
      }
    });

    this.on<AccordionItemEvent>('accordionItem', (_eventInfo, type) => {
      if (type === 'insertAbove') {
        insertBootstrapAccordionItem.execute({ value: 'before' });
      } else if (type === 'insertBelow') {
        insertBootstrapAccordionItem.execute({ value: 'after' });
      } else if (type === 'remove') {
        removeBootstrapAccordionItem.execute();
      }
    });
  }

}
