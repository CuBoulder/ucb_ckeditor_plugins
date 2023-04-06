import { Plugin } from 'ckeditor5/src/core';
import MyButtonView from './buttonview';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import icon from '../../../../icons/hand-pointer-regular.svg';
import { ButtonView } from 'ckeditor5/src/ui';

export default class ButtonUI extends Plugin {
    static get requires() {
		return [WidgetToolbarRepository];
	}
    init() {
        const editor = this.editor;
        
        editor.ui.componentFactory.add( 'ucb-button', locale => {
            const command = editor.commands.get( 'addButton' );
            const button = new ButtonView( locale );

            button.set( {
                label: 'Button',
                icon: icon,
                tooltip: true,
                withText: true,
            } );

            button.bind( 'isEnabled' ).to( command );
            button.bind( 'isOn' ).to( command, 'value', 'isEnabled' ).withDefaultValue( false );

            this.listenTo( button, 'execute', () => {editor.execute('addButton')} );

            return button;
        } );
    }



    
}