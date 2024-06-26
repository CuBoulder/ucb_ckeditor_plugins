/** 
 * @file defines helper functions for the callout plugin.
 * 
 * @typedef { import('@ckeditor/ckeditor5-engine').Element } Element
 * @typedef { import('@ckeditor/ckeditor5-engine').DocumentSelection } DocumentSelection
 */

/**
 * @param {DocumentSelection} selection 
 *   The selection.
 * @returns {Element | null}
 *   The selected callout widget, or null if there isn't one.
 */
export function getSelectedCalloutWidget(selection) {
  const selectionPosition = selection.getFirstPosition();
  if (!selectionPosition)
    return null;

  let parent = selectionPosition.parent;
  while (parent) {
    if (parent.is('element') && isCalloutWidget(parent))
      return parent;
    parent = parent.parent;
  }

  return null;
}

/**
 * @param {Element} element 
 * @returns {boolean}
 *   Whether the element is a callout widget.
 */
function isCalloutWidget(element) {
  return element.name === 'callout';
}
