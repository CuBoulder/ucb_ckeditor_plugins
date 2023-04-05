import { Plugin } from 'ckeditor5/src/core';
import MyButtonView from './buttonview';
import icon from '../../../../icons/hand-pointer-regular.svg';

export default class ButtonUI extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'button', locale => {
            const command = editor.commands.get( 'addButton' );
            const button = new MyButtonView( locale );

            button.set( {
                label: 'button',
                icon: icon,
                tooltip: true,
                withText: true,
            } );

            button.bind( 'isEnabled' ).to( command );
            button.bind( 'isOn' ).to( command, 'value', 'isEnabled' ).withDefaultValue( false );

            this.listenTo( button, 'execute', () => {
                const dialogDefinition = {
                    title: 'Add Button',
                    body: button.element,
                    buttons: [
                        {
                            label: 'Save',
                            type: 'submit',
                            class: 'ck-button',
                        },
                        {
                            label: 'Cancel',
                            type: 'button',
                            class: 'ck-button ck-button-secondary',
                            onClick: () => {
                                editor.editing.view.focus();
                            }
                        }
                    ],
                    focus: ( index, buttonCount ) => {
                        button.focus();
                    }
                };

                editor.plugins.get( 'Dialog' ).open( dialogDefinition );
            } );

            return button;
        } );
    }
}