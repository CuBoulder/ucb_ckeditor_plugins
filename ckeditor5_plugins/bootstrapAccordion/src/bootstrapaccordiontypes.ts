/**
 * @file Contains TypeScript type definitions for Bootstrap Accordion.
 */

/**
 * The types of operations that can be done to an accordion.
 */
export type AccordionOperation = 'toggleFirstItemOpen' | 'toggleItemsStayOpen' | 'openAll' | 'collapseAll';

/**
 * The types of operations that can be done to an accordion item.
 */
export type AccordionItemOperation = 'insertAbove' | 'insertBelow' | 'remove';

/**
 * The event fired when a command is chosen with an accordion is selected.
 */
export type AccordionEvent = {
  name: 'accordion';
  args: [type: AccordionOperation];
};

/**
 * The event fired when a command is chosen with an accordion item selected.
 */
export type AccordionItemEvent = {
  name: 'accordionItem';
  args: [type: AccordionItemOperation];
};

/**
 * An allowed attribute for a model.
 */
export type ModelAttribute = string;

/**
 * A compound type for linking together an attribute and its options as a
 * single attribute definition.
 */
export type ModelAttributeDefinition<T extends string = string, A extends ModelAttribute = ModelAttribute> = [T, A];

/**
 * An option in the accordion toolbar which changes a class name on a selected
 * element.
 */
export type SelectableOption = {
  label?: string;
  icon?: string;
  className?: string;
};
