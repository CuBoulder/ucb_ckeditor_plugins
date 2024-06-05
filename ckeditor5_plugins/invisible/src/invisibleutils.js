export function isInvisibleElement(element) {
  return element && element.name === 'ucb-invisible';
}

export function findInvisibleElement(element){
  return isInvisibleElement(element) ?  element : null
}

// Used for creation of <ucb-invisible> elements if there's highlighted text and insertInvisible command is executed. Includes only the text
export function generateText(selection){
    const range = selection.getFirstRange();
    let string = '';
    for ( const item of range.getItems() ) {
      if(item.data){
        string += item.data
      }
  }
  return string;
}

// Handles unwrapping the inner text from a <ucb-invisible> element on removal
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
