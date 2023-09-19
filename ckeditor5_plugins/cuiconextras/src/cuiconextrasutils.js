/** 
 * @file defines helper functions for the icon plugin.
 * 
 * @typedef { import('@ckeditor/ckeditor5-engine').Element } Element
 * @typedef { import('@ckeditor/ckeditor5-engine').DocumentSelection } DocumentSelection
 */

/**
 * @param {DocumentSelection} selection 
 *   The selection.
 * @returns {Element | null}
 *   The selected icon widget, or null if there isn't one.
 */
export function getSelectedIconWidget(selection) {
	const selectedElement = selection.getSelectedElement();

	if (selectedElement && selectedElement.is('element') && isIconWidget(selectedElement))
		return selectedElement;

	return null;
}

/**
 * @param {Element} element 
 * @returns {boolean}
 *   Whether the element is a icon widget.
 */
function isIconWidget(element) {
	return element.name === 'icon';
}
