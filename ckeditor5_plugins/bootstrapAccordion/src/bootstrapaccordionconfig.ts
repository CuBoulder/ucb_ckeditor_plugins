/**
 * @file Contains configuration for Bootstrap Accordion.
 */

import type { ToolbarConfigItem } from '@ckeditor/ckeditor5-core';
import type { ModelAttributeDefinition, SelectableOption } from './bootstrapaccordiontypes';

/**
 * The options available in `editor.config.get('bootstrapAccordion')`.
 */
export interface BootstrapAccordionConfig {
  toolbarItems: ToolbarConfigItem[];
};

/**
 * The allowed model attributes for an accordion.
 */
export type AccordionModelAttribute = 'bootstrapAccordionId' | 'bootstrapAccordionStyle' | 'bootstrapAccordionItemsStayOpen';

/**
 * The allowed model attributes for an accordion header.
 */
export type AccordionButtonModelAttribute = 'bootstrapAccordionButtonCollapsed';

/**
 * The allowed model attributes for an accordion collapse.
 */
export type AccordionCollapseModelAttribute = 'bootstrapAccordionCollapseShow';

/**
 * Defines the allowed values for the `bootstrapAccordionStyle` attribute.
 */
export type Style = 'regular' | 'flush';

/**
 * Defines the attribute definition for the `bootstrapAccordionStyle`
 * attribute.
 */
export type StyleAttributeDefinition = ModelAttributeDefinition<Style, 'bootstrapAccordionStyle'>;

/**
 * Defines the attribute value to class name conversion for the
 * `bootstrapAccordionStyle` attribute.
 */
export const styleOptions: { [key in Style]: SelectableOption; } = {
  regular: {
    label: 'Regular'
  },
  flush: {
    label: 'Flush',
    className: 'accordion-flush'
  }
};

/**
 * Defines the default value for the `bootstrapAccordionStyle` attribute.
 */
export const styleDefault: Style = 'regular';

/**
 * Defines the allowed values for the `bootstrapAccordionItemsStayOpen`
 * attribute.
 */
export type ItemsStayOpen = 'true' | 'false';

/**
 * Defines the attribute definition for the `bootstrapAccordionItemsStayOpen`
 * attribute.
 */
export type ItemsStayOpenAttributeDefinition = ModelAttributeDefinition<ItemsStayOpen, 'bootstrapAccordionItemsStayOpen'>;

/**
 * Defines the attribute value to class name conversion for the
 * `bootstrapAccordionItemsStayOpen` attribute.
 */
export const itemsStayOpenOptions: { [key in ItemsStayOpen]: SelectableOption; } = {
  true: {
    className: 'accordion-items-stay-open'
  },
  false: {}
};

/**
 * Defines the default value for the `bootstrapAccordionItemsStayOpen`
 * attribute.
 */
export const itemsStayOpenDefault: ItemsStayOpen = 'false';

/**
 * Defines the allowed values for the `bootstrapAccordionButtonCollapsed`
 * attribute.
 */
export type ButtonCollapsed = 'true' | 'false';

/**
 * Defines the attribute definition for the `bootstrapAccordionButtonCollapsed`
 * attribute.
 */
export type ButtonCollapsedAttributeDefinition = ModelAttributeDefinition<ItemsStayOpen, 'bootstrapAccordionButtonCollapsed'>;

/**
 * Defines the attribute value to class name conversion for the
 * `bootstrapAccordionButtonCollapsed` attribute.
 */
export const buttonCollapsedOptions: { [key in ItemsStayOpen]: SelectableOption; } = {
  true: {
    className: 'collapsed'
  },
  false: {}
};

/**
 * Defines the allowed values for the `bootstrapAccordionCollapseShow`
 * attribute.
 */
export type CollapseShow = 'true' | 'false';

/**
 * Defines the attribute definition for the `bootstrapAccordionCollapseShow`
 * attribute.
 */
export type CollapseShowAttributeDefinition = ModelAttributeDefinition<ItemsStayOpen, 'bootstrapAccordionCollapseShow'>;

/**
 * Defines the attribute value to class name conversion for the
 * `bootstrapAccordionCollapseShow` attribute.
 */
export const collapseShowOptions: { [key in ItemsStayOpen]: SelectableOption; } = {
  true: {
    className: 'show'
  },
  false: {}
};

