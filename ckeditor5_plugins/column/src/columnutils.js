/**
 * @file defines helper functions for the column plugin.
 *
 * @typedef { import('@ckeditor/ckeditor5-engine').Element } Element
 * @typedef { import('@ckeditor/ckeditor5-engine').DocumentSelection } DocumentSelection
 */

/**
 * @param {DocumentSelection} selection
 *   The selection.
 * @returns {Element | null}
 *   The selected column widget, or null if there isn't one.
 */
export function getSelectedColumnRowWidget(selection) {
  const selectedElement = selection.getSelectedElement()
  if(selectedElement){
    return (selectedElement.is('element') && isColumnRowWidget(selectedElement)) ? selectedElement : null;
  }
  return null
}

/**
 * @param {Element} element
 * @returns {boolean}
 *   Whether the element is a column widget.
 */
function isColumnRowWidget(element) {
  return element.name === 'ucb-row';
}
