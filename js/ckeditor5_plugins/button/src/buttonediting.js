import { Plugin } from 'ckeditor5/src/core';
import ButtonCommand from './insertbuttoncommand';
import { Widget } from 'ckeditor5/src/widget';


export default class ButtonEditing extends Plugin {
	static get requires() {
		return [Widget];
	  }	

	init() {
		this._defineSchema();
		this._defineConverters();
		this.editor.commands.add(
			'addButton',
			new ButtonCommand(this.editor),
		  );
	}
	_defineSchema() {
		const schema = this.editor.model.schema;
    	// Extend the text node's schema to accept the tooltip attribute.
		schema.register( 'ucb-button', {
			// TODO
		} );
	}
	_defineConverters() {
		const {conversion} = this.editor;

		// TO DO


	}
}