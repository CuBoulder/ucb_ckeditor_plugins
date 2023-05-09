/** 
 * @file defines helper functions for the box plugin.
 * 
 * @typedef { import('@types/ckeditor__ckeditor5-engine').Element } Element
 * @typedef { import('@types/ckeditor__ckeditor5-engine').DocumentSelection } DocumentSelection
 */

/**
 * @param {DocumentSelection} selection 
 *   The selection.
 * @returns {Element | null}
 *   The selected map widget, or null if there isn't one.
 */
 export function getSelectedMapWidget(selection) {
	const selectionPosition = selection.getFirstPosition();
	if (!selectionPosition)
		return null;

	let parent = selectionPosition.parent;
	while (parent) {
		if (parent.is('element') && isMapWidget(parent))
			return parent;
		parent = parent.parent;
	}

	return null;
}

/**
 * @param {Element} element 
 * @returns {boolean}
 *   Whether the element is a map widget.
 */
function isMapWidget(element) {
	return element.name === 'campusMap';
}
