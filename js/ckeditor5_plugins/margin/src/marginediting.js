import { Plugin } from 'ckeditor5/src/core';
import { Widget } from 'ckeditor5/src/widget'; 
import MarginCommand from './insertmargincommand';

export default class MarginEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add('addCloseMargin', new MarginCommand(this.editor)); // Use 'addCloseMargin' as the command name
  }

	_defineSchema() {
		const schema = this.editor.model.schema;
    	// Extend the text node's schema to accept the tooltip attribute.
		schema.register( 'close-margin', {
			allowWhere: '$block',
			allowChildren: false
		} );
	}
	_defineConverters() {
		const {conversion} = this.editor;

		// Conversion from a view element to a model attribute
		conversion.for( 'upcast' ).elementToElement( {
			model: 'close-margin',
			view: {
				name: 'div',
				classes:  'margin-close'
			},
		} );

        // Conversion from a model attribute to a view element
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'close-margin',

            // Callback function provides access to the model attribute value
			// and the DowncastWriter
			view: {
				name: 'div',
				classes: 'margin-close',
			}
		} );

		conversion.for('editingDowncast').elementToElement({
			model: 'close-margin',
			view: {
				name: 'div',
				classes: 'margin-close'
			}
		})


	}
}