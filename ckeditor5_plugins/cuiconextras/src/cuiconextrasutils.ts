/** 
 * @file defines helper functions for the cuiconextras plugin.
 */

import type { DocumentSelection, Element } from 'ckeditor5/src/engine';

/**
 * @param  selection 
 *   The selection.
 * @returns
 *   The selected icon widget, or null if there isn't one.
 */
export function getSelectedIconWidget(selection: DocumentSelection): Element | null {
  const selectedElement = selection.getSelectedElement();

  if (selectedElement && selectedElement.is('element') && isIconWidget(selectedElement))
    return selectedElement;

  return null;
}

/**
 * @param element 
 * @returns
 *   Whether the element is a icon widget.
 */
function isIconWidget(element: Element): boolean {
  return element.name === 'icon';
}
