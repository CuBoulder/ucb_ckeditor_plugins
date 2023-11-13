export function isInvisibleElement(element) {
	return element && element.name === 'ucb-invisible';
}

export function findInvisibleElement(element){
  return isInvisibleElement(element) ?  element : null
}

export function generateText(selection){
    const range = selection.getFirstRange();
    let string = '';

    for ( const item of range.getItems() ) {
      string += item.data
  }
  return string;
}


export function removeInvisible( writer, invisibleElement ) {
  const range = writer.createRangeOn(invisibleElement);
  const contents = range.getContainedElement();
  const parent = invisibleElement.parent
  writer.unwrap(invisibleElement);
  // Move selection out of the now-removed invisible element
  if (contents) {
    writer.setSelection(contents, 'after');
  }
}
