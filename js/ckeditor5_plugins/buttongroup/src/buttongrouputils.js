// A helper function that retrieves and concatenates all text within the model range.
export default function getRangeText( range ) {
	return Array.from( range.getItems() ).reduce( ( rangeText, node ) => {
		if ( !( node.is( 'text' ) || node.is( 'textProxy' ) ) ) {
			return rangeText;
		}

		return rangeText + node.data;
	}, '' );
}

export function getSelectedButtonGroupWidget(selection) {
	const selectionPosition = selection.getFirstPosition();
	if (!selectionPosition)
		return null;

	let parent = selectionPosition.parent;
	while (parent) {
		if (parent.is('element') && isButtonGroupWidget(parent))
			return parent;
		parent = parent.parent;
	}

	return null;
}

function isButtonGroupWidget(element) {
	return element.name === 'buttonGroup';
}