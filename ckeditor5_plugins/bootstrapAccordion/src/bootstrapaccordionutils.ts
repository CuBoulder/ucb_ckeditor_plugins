/**
 * @file Contains helper functions for Bootstrap Accordion.
 */

import type {
  DocumentSelection,
  Element,
  ViewDocumentSelection,
  ViewElement,
  Writer
} from 'ckeditor5/src/engine';
import type { AccordionCollapseModelAttribute, AccordionButtonModelAttribute } from './bootstrapaccordionconfig'
import { version } from 'ckeditor5/src/utils';

/**
 * The CKEditor 5 major version number
 */
export const ckMajorVersion = parseInt(version.split('.')[0]!);

/**
 * Checks if a provided element is an accordion widget.
 *
 * @param element
 *   The element to check.
 * @returns
 *   Whether the element is an accordion widget.
 */
export function isAccordionWidget(element: ViewElement): boolean {
  return element.hasClass('ckeditor5-bootstrap-accordion__widget');
}

/**
 * Gets the selected accordion widget.
 *
 * @param selection
 *   The view document selection.
 * @returns
 *   The selected accordion widget, or null if there is none.
 */
export function getSelectedAccordionWidget(selection: ViewDocumentSelection): ViewElement | null {
  const accordion = selection.focus?.getAncestors().reverse()
    .find(node => node.is('element') && isAccordionWidget(node));
  return accordion?.is('element') ? accordion : null;
}

/**
 * Gets the selected accordion item model element.
 *
 * @param selection
 *   The model document selection.
 * @returns
 *   The selected accordion item element, or null if there is none.
 */
export function getSelectedAccordionItemModelElement(selection: DocumentSelection): Element | null | undefined {
  return selection.getFirstPosition()?.findAncestor('bootstrapAccordionItem');
}

/**
 * Gets the selected accordion model element.
 *
 * @param selection
 *   The model document selection.
 * @returns
 *   The selected accordion element, or null if there is none.
 */
export function getSelectedAccordionModelElement(selection: DocumentSelection): Element | null | undefined {
  return selection.getFirstPosition()?.findAncestor('bootstrapAccordion');
}

/**
 * Creates a `<accordionItem>` model element with the necessary child elements.
 *
 * @param writer
 *   The model writer.
 * @returns
 *   The accordion item model element.
 */
export function createAccordionItem(writer: Writer, isOpen: boolean = false) {
  const accordionItem = writer.createElement('bootstrapAccordionItem');
  const accordionHeader = writer.createElement('bootstrapAccordionHeader');
  const accordionButton = writer.createElement('bootstrapAccordionButton', {
    bootstrapAccordionButtonCollapsed: isOpen ? 'false' : 'true',
  } as { [key in AccordionButtonModelAttribute]: string; });
  const accordionCollapse = writer.createElement('bootstrapAccordionCollapse', {
    bootstrapAccordionCollapseShow: isOpen ? 'true' : 'false',
  } as { [key in AccordionCollapseModelAttribute]: string; });
  const accordionBody = writer.createElement('bootstrapAccordionBody');

  writer.append(accordionHeader, accordionItem);
  writer.append(accordionButton, accordionHeader);
  writer.append(accordionCollapse, accordionItem);
  writer.append(accordionBody, accordionCollapse);

  // The accordionBody text content will automatically be wrapped in a
  // `<p>`.
  writer.appendElement('paragraph', accordionBody);

  return { accordionItem, accordionHeader, accordionButton, accordionCollapse, accordionBody };
}

/**
 * Gets whether an accordion item is open.
 *
 * @param accordionItem
 *   The accordion item check if open.
 * @returns
 *   Whether or not the accordion item is open.
 */
export function isAccordionItemOpen(accordionItem: Element) {
  let isOpen = false;
  [...accordionItem.getChildren()].forEach(node => {
    if (node.is('element', 'bootstrapAccordionCollapse')) {
      // If the second item is open, assume someone ran the "open all"
      // command earlier, and make sure any new accordion items are
      // open as well.
      isOpen = node.getAttribute('bootstrapAccordionCollapseShow') === 'true';
    }
  });
  return isOpen;
}

/**
 * Opens or collapses an accordion item.
 *
 * @param accordionItem
 *   The accordion item to open or collapse.
 * @param writer
 *   The model writer.
 * @param isOpen
 *   Whether to open or collapse the accordion item.
 */
export function setAccordionItemIsOpen(accordionItem: Element, writer: Writer, isOpen: boolean) {
  [...accordionItem.getChildren()].forEach(node => {
    if (node.is('element', 'bootstrapAccordionHeader')) {
      [...node.getChildren()].forEach(node => {
        if (node.is('element', 'bootstrapAccordionButton')) {
          writer.setAttribute('bootstrapAccordionButtonCollapsed', isOpen ? 'false' : 'true', node);
        }
      });
    } else if (node.is('element', 'bootstrapAccordionCollapse')) {
      writer.setAttribute('bootstrapAccordionCollapseShow', isOpen ? 'true' : 'false', node);
    }
  });
}
