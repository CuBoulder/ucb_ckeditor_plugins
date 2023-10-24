import { Plugin } from 'ckeditor5/src/core';
import CountupCommand from './insertcountupcommand';

export default class CountupEditing extends Plugin {
	init() {
		this._defineSchema();
		this._defineConverters();

		this.editor.commands.add(
			'addCountup', new CountupCommand( this.editor )
		);
	}
	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register('ucb-countup', {
			isContent: true,
		  });

    	// Extend the text node's schema to accept the div attribute.
		schema.extend( '$text', {
			allowAttributes: [ 'ucb-countup' ]
		} );
	}
	_defineConverters() {
		const conversion = this.editor.conversion;
		
        // Conversion from a model attribute to a view element
		conversion.for( 'downcast' ).attributeToElement( {
			model: 'ucb-countup',

            // Callback function provides access to the model attribute value
			// and the DowncastWriter
			view: ( modelAttributeValue, conversionApi ) => {
				const { writer } = conversionApi;
				return writer.createAttributeElement( 'div', {
					class: 'ucb-countup counter'
				} );
			}
		} );

		// Conversion from a view element to a model attribute
		conversion.for( 'upcast' ).elementToAttribute( {
			view: {
				name: 'ucb-countup',
				class: 'ucb-countup counter'
			},
			model: {
				key: 'ucb-countup'
			}
		} );
	}
}