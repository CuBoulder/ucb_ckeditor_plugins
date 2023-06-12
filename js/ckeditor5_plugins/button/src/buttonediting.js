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
    schema.addChildCheck( ( context, childDefinition ) => {
    // Note that the context is automatically normalized to a SchemaContext instance and
    // the child to its definition (SchemaCompiledItemDefinition).

    // If checkChild() is called with a context that ends with linkHref and linkHref as a child
    // to check, make the checkChild() method return false.
    if ( context.endsWith( 'linkHref' ) && childDefinition.name == 'linkHref' ) {
        return false;
    }
    schema.on( 'checkChild', ( evt, args ) => {
	const context = args[ 0 ];
	// const childDefinition = args[ 1 ];

	if ( context.endsWith( 'linkHref' ) ) {
		// Prevent next listeners from being called.
		evt.stop();
		// Set the checkChild()'s return value.
		evt.return = false;
	}
    }, { priority: 'high' } );
    } );


    schema.register('buttonWrapper', {
      allowWhere: '$block',
      isObject: true,
			allowChildren: 'ucb-button'
		});

    schema.register('ucb-button', {
      allowIn: 'buttonWrapper',
      allowContentOf: '$text',
      allowAttributes: ['color', 'style', 'size', 'href'],
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


    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('size', sizeOptions));
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('color', colorOptions));
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('style', styleOptions));

    /*
    If <div class="ucb-button"> is present in the existing markup,
     processed by CKEditor, then CKEditor recognizes and loads it as a
		<ucb-button> model.  
    */
  
conversion.for('upcast').elementToElement({
  view: {
    name: 'a',
    classes: 'ucb-button'
  },
  model: (viewElement, { writer: modelWriter }) => {
    const modelElement = modelWriter.createElement('ucb-button');

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

    const href = viewElement.getAttribute('href');
    if (href) {
      modelWriter.setAttribute('href', href, modelElement);
    }

    return modelElement;
  }
});

conversion.for('upcast').elementToElement({
  model: 'buttonWrapper',
  view: {
    name: 'span',
    classes: 'ucb-button-wrapper'
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
			model: 'buttonWrapper',
			view: (modelElement, { writer: viewWriter }) => viewWriter.createContainerElement('span', { class: 'ucb-button-wrapper' })
		});

    conversion.for('dataDowncast').elementToElement({
			model: 'buttonWrapper',
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