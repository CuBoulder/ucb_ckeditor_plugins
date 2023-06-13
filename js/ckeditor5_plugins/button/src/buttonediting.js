import { Plugin } from 'ckeditor5/src/core';
import ButtonCommand from './insertbuttoncommand';
import { Widget, toWidget } from 'ckeditor5/src/widget';
import { sizeOptions, styleOptions, colorOptions, defaultColor,defaultStyle,defaultSize} from './buttonconfig';

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
      allowAttributes: ['href'],
      allowChildren: true
    });

    schema.register('ucb-button-wrapper', {
      allowWhere: '$block',
      allowContentOf: '$block',
      isObject: true,
      allowAttributes: ['color', 'style', 'size'],
			allowChildren: 'ucb-button'
		});

  }


  	/**
	 * Converters determine how CKEditor 5 models are converted into markup and
	 * vice-versa.
	 */
  _defineConverters() {
    		// Converters are registered via the central editor object.
    const { conversion } = this.editor;


    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('size', sizeOptions));
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('color', colorOptions));
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('style', styleOptions));

    /*
    If <div class="ucb-button"> is present in the existing markup,
     processed by CKEditor, then CKEditor recognizes and loads it as a
		<ucb-button> model.  
    */

    conversion.for('upcast').add(dispatcher => {
      // A converter for links (<a>).
      dispatcher.on('element:a', (evt, data, conversionApi) => {
          if (conversionApi.consumable.consume(data.viewItem, { name: '$text', attributes: ['href'] })) {
              // The <a> element is inline and is represented by an attribute in the model.
              // This is why you need to convert only children.
              const { modelRange } = conversionApi.convertChildren(data.viewItem, data.modelCursor);
    
              for (let item of modelRange.getItems()) {
                  if (conversionApi.schema.getAttribute(item, 'linkHref')) {
                      conversionApi.writer.removeAttribute('linkHref', item);
                  }
                 const modelElement = conversionApi.writer.createElement('ucb-button')
                  const href = conversionApi.schema('linkHref');
                  if (href) {
                    conversionApi.writer.setAttribute('href', href, modelElement);
                  }

              }
          }
      });
    });
  
conversion.for('upcast').elementToElement({
  view: {
    name: 'a',
    classes: 'ucb-button'
  },
  model: (viewElement, { writer: modelWriter }) => {
    const modelElement = modelWriter.createElement('ucb-button');

    // const color = viewElement.getAttribute('color');
    // if (color) {
    //   modelWriter.setAttribute('color', color, modelElement);
    // }

    // const style = viewElement.getAttribute('style');
    // if (style) {
    //   modelWriter.setAttribute('style', style, modelElement);
    // }

    // const size = viewElement.getAttribute('size');
    // if (size) {
    //   modelWriter.setAttribute('size', size, modelElement);
    // }

    const href = viewElement.getAttribute('href');
    if (href) {
      modelWriter.setAttribute('href', href, modelElement);
    }

    return modelElement;
  }
});

conversion.for('upcast').elementToElement({
  model: 'ucb-button-wrapper',
  view: {
    name: 'span',
    classes: 'ucb-button-wrapper'
  },
  model: (viewElement, { writer: modelWriter }) => {
    const modelElement = modelWriter.createElement('ucb-button-wrapper');

    const color = viewElement.getAttribute('color');
    if (color) {
      modelWriter.setAttribute('color', color, modelElement);
    }

    const style = viewElement.getAttribute('style');
    if (style) {
      modelWriter.setAttribute('style', style, modelElement);
    }

    const size = viewElement.getAttribute('size');
    if (size) {
      modelWriter.setAttribute('size', size, modelElement);
    }

    return modelElement;
  }
});



    // Data Downcast Converters: converts stored model data into HTML.
		// These trigger when content is saved.
    conversion.for('dataDowncast').elementToElement({
      model: 'ucb-button',
      view: (modelElement, { writer: viewWriter }) => createButtonView(modelElement, viewWriter),
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'ucb-button',
      view: (modelElement, { writer: viewWriter }) => createButtonView(modelElement, viewWriter, true),
    });

    conversion.for('editingDowncast').elementToElement({
			model: 'ucb-button-wrapper',
			view: (modelElement, { writer: viewWriter }) => viewWriter.createContainerElement('span', { class: 'ucb-button-wrapper' })
		});

    conversion.for('dataDowncast').elementToElement({
			model: 'ucb-button-wrapper',
			view: {
				name: 'span',
				classes: 'ucb-button-wrapper'
			}
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
function createButtonView(modelElement, viewWriter, widget = false) {
  const color = modelElement.getAttribute('color');
  const style = modelElement.getAttribute('style');
  const size = modelElement.getAttribute('size');
  const href = modelElement.getAttribute('href') || '';

  let button;
  if(widget){
    button = viewWriter.createContainerElement('a', {
      class: `ucb-button ucb-button-${color} ucb-button-${style} ucb-button-${size}`,
      href,
      onclick: 'event.preventDefault()' // Prevents following the link when clicking the widget.
    },{renderUnsafeAttributes: ['onclick']});
  } else {
    button = viewWriter.createContainerElement('a', {
      class: `ucb-button ucb-button-${color} ucb-button-${style} ucb-button-${size}`,
      href,
    });
  }

  return widget ? toWidget(button, viewWriter, { label: 'button widget' }) : button;
}






function buildAttributeToAttributeDefinition(attributeName, attributeOptions) {
	const view = {};
	for (const [name, option] of Object.entries(attributeOptions))
		view[name] = { key: 'class', value: option.className };
	return {
		model: {
			key: attributeName,
			values: Object.keys(attributeOptions)
		},
		view
	};
}