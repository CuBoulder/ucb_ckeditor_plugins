import { Element } from 'ckeditor5/src/engine';
import { DocumentSelection } from 'ckeditor5/src/engine';

/**
 * @param {DocumentSelection} selection 
 * @returns {Element | null}
 *   The selected box widget, or null if there isn't one.
 */
export function getSelectedBoxWidget(selection) {
	const selectedElement = selection.getSelectedElement();
	return selectedElement && isBoxWidget(selectedElement) ? selectedElement : selection.focus.getAncestors()
		.find((node) => node.is('element') && isBoxWidget(node));
}

/**
 * @param {Element} element 
 * @returns {boolean}
 *   Whether the element is a box widget.
 */
function isBoxWidget(element) {
	return element.name == 'box';
}
