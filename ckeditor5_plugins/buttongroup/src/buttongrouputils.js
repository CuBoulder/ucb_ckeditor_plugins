// A helper function that retrieves and concatenates all text within the model range.
export default function getRangeText( range ) {
  return Array.from( range.getItems() ).reduce( ( rangeText, node ) => {
    if ( !( node.is( 'text' ) || node.is( 'textProxy' ) ) ) {
        return rangeText;
    }

    return rangeText + node.data;
  }, '' );
}

function findButtonGroupElement(element) {
  if (element.name === 'buttonGroup') {
    return element;
  }

  // Check children for 'buttonGroup' presence:
  for (const child of element.getChildren()) {
    if (child.is('element') && child.name === 'buttonGroup') {
      return child;
    }
  }

  return null;
}


export function getSelectedButtonGroupWidget(selection) {
  const selectionPosition = selection.getFirstPosition();
  if (!selectionPosition)
    return null;

  let parent = selectionPosition.parent;
  while (parent) {
    const buttonGroupElement = findButtonGroupElement(parent);
    if (buttonGroupElement) {
      return buttonGroupElement;
    }
    parent = parent.parent;
  }

  return null;
}


function isButtonGroupWidget(element) {
  if (element.name === 'buttonGroup') {
    return true;
  }

  // Check children for 'buttonGroup' presence:
  for (const child of element.getChildren()) {
    if (child.is('element') && child.name === 'buttonGroup') {
      return true;
    }
  }

  return false;
}
