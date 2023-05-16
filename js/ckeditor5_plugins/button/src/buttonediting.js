import { Plugin } from 'ckeditor5/src/core';
import ButtonCommand from './insertbuttoncommand';
import { Widget, toWidget } from 'ckeditor5/src/widget';

export default class ButtonEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add('addButton', new ButtonCommand(this.editor));
  }

  // Schemas are registered via the central `editor` object.
  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.register('ucb-button', {
      isObject: true,
      allowWhere: '$block',
      allowContentOf: '$block',
      allowAttributes: ['class', 'href'],
      allowChildren: true
    });
  }


  	/**
	 * Converters determine how CKEditor 5 models are converted into markup and
	 * vice-versa.
	 */
  _defineConverters() {
    		// Converters are registered via the central editor object.
    const { conversion } = this.editor;


    /*
    If <div class="ucb-box"> is present in the existing markup,
     processed by CKEditor, then CKEditor recognizes and loads it as a
		<ucb-button> model.  
    */
  
    conversion.for('upcast').elementToElement({
      model: 'ucb-button',
      view: {
        name: 'a',
        classes: 'ucb-button'
      }
    });

    // Data Downcast Converters: converts stored model data into HTML.
		// These trigger when content is saved.
    conversion.for('dataDowncast').elementToElement({
      model: 'ucb-button',
      view: (modelElement, {writer: viewWriter}) => createButtonView(viewWriter, true)
    });

    // Convert the <ucb-button> model into an editable <a> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'ucb-button',
      view: (buttonModelElement, { writer: viewWriter }) => {
        const href = buttonModelElement.getAttribute('href');
        const classes = buttonModelElement.getAttribute('class') || '';
        const buttonViewElement = viewWriter.createContainerElement('ucb-button', {
          href,
          class: `${classes}`,
        });

        return buttonViewElement;
      },
    });
  }
}


/**
 * @param {DowncastWriter} viewWriter
 *   The downcast writer.
 * @param {boolean} [widget=false]
 *   Whether or not to return a widget for editing. Defaults to `false`.
 * @returns {ContainerElement}
 *   The box container element or widget.
 */
function createButtonView(viewWriter, widget = false) {
	const button = viewWriter.createContainerElement('a', { class: 'ucb-button' });
	return widget ? toWidget(button, viewWriter, { label: 'button widget' }) : button;
}
