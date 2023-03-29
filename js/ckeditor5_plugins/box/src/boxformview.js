import {
	View,
	ButtonView,
	createDropdown,
	addToolbarToDropdown
} from 'ckeditor5/src/ui';
import { icons } from 'ckeditor5/src/core';

export default class BoxFormView extends View {
	constructor(locale) {
		super(locale);
		this.setTemplate({
			tag: 'form',
			attributes: {
				// Attributes of a form template.
				// ...
			},
			children: [this._createAlignmentDropdown()]
		});
	}

	_createAlignmentDropdown() {
		const alignmentDropdownView = createDropdown(this.locale);
		addToolbarToDropdown(
			alignmentDropdownView,
			[
				this._createButton('Left', icons.objectLeft),
				this._createButton('Full', icons.objectFullWidth),
				this._createButton('Right', icons.objectRight)
			]
		);
		alignmentDropdownView.buttonView.set({
			label: 'Box alignment',
			icon: icons.objectFullWidth,
			tooltip: true
		});
		return alignmentDropdownView;
	}

	_createButton(label, icon) {
		const button = new ButtonView();
		button.set({
			label,
			icon,
			tooltip: true
		});
		return button;
	}
}
