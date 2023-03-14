import { Plugin } from 'ckeditor5/src/core';
import TooltipCommand from './inserttooltipcommand';

export default class TooltipEditing extends Plugin {
	init() {
		this._defineSchema();
		this._defineConverters();

		this.editor.commands.add(
			'addTooltip', new TooltipCommand( this.editor )
		);
	}
	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register('ucb-tooltip', {
			isContent: true,
		  });

    	// Extend the text node's schema to accept the abbr attribute.
		schema.extend( '$text', {
			allowAttributes: [ 'ucb-tooltip' ]
		} );
	}
	_defineConverters() {
		const conversion = this.editor.conversion;
		
        // Conversion from a model attribute to a view element
		conversion.for( 'downcast' ).attributeToElement( {
			model: 'ucb-tooltip',

            // Callback function provides access to the model attribute value
			// and the DowncastWriter
			view: ( modelAttributeValue, conversionApi ) => {
				const { writer } = conversionApi;
				return writer.createAttributeElement( 'abbr', {
					title: modelAttributeValue,
					class: 'ucb_tooltip'
				} );
			}
		} );

		// Conversion from a view element to a model attribute
		conversion.for( 'upcast' ).elementToAttribute( {
			view: {
				name: 'abbr',
				attributes: [ 'title' ],
				classes: 'ucb_tooltip'
			},
			model: {
				key: 'ucb-tooltip',

                // Callback function provides access to the view element
				value: viewElement => {
					const title = viewElement.getAttribute( 'title' );
					return title;
				}
			}
		} );
	}
}