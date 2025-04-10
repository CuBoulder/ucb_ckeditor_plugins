import type { PluginInterface } from '@ckeditor/ckeditor5-core/src/plugin';
import { Plugin } from 'ckeditor5/src/core';
import BootstrapAccordionEditing from './bootstrapaccordionediting';
import BootstrapAccordionEvents from './bootstrapaccordionevents';
import BootstrapAccordionKeyboard from './bootstrapaccordionkeyboard';
import BootstrapAccordionUI from './bootstrapaccordionui';

/**
 * Defines the base Bootstrap Accordion plugin.
 */
export default class BootstrapAccordion extends Plugin implements PluginInterface {

  /**
   * The plugin's name in the PluginCollection.
   */
  static get pluginName(): 'BootstrapAccordion' {
    return 'BootstrapAccordion' as const;
  }

  /**
   * The plugin's dependencies.
   */
  static get requires() {
    return [
      BootstrapAccordionEditing,
      BootstrapAccordionEvents,
      BootstrapAccordionKeyboard,
      BootstrapAccordionUI
    ] as const;
  }

}
