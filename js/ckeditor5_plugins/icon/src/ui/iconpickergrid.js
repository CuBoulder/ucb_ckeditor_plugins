/**
 * @file contains the icon picker grid view.
 */

import { FocusTracker, KeystrokeHandler } from "ckeditor5/src/utils";
import { View } from 'ckeditor5/src/ui';
import addKeyboardHandlingForGrid from '@ckeditor/ckeditor5-ui/src/bindings/addkeyboardhandlingforgrid';
import IconPickerItem from './iconpickeritem';


export default class IconPickerGrid extends View {
	constructor(locale) {
		super(locale);

		this.set('iconName', null);

		this.items = this.createCollection();

		this.setTemplate({
			tag: 'div',
			children: [
				{
					tag: 'div',
					attributes: {
						class: [
							'ck',
							'ck-character-grid__tiles'
						]
					},
					children: this.items
				}
			],
			attributes: {
				class: [
					'ck',
					'ck-character-grid'
				]
			}
		});

		this.focusTracker = new FocusTracker();
		this.keystrokes = new KeystrokeHandler();

		addKeyboardHandlingForGrid({
			keystrokeHandler: this.keystrokes,
			focusTracker: this.focusTracker,
			gridItems: this.items,
			numberOfColumns: () => global.window
				.getComputedStyle(this.element.firstChild) // Responsive .ck-character-grid__tiles
				.getPropertyValue('grid-template-columns')
				.split(' ')
				.length,
			uiLanguageDirection: this.locale && this.locale.uiLanguageDirection
		});
	}

	_createItem(iconName, iconDefinition) {
		const item = new IconPickerItem(this.locale, iconName, iconDefinition);

		this.set('iconName', null);

		item.set({
			label: this.locale.t(iconDefinition.label),
			class: 'ck-character-grid__tile'
		});

		item.extendTemplate({
			isOn: false,
			attributes: {
				title: this.locale.t(iconDefinition.label)
			},
			on: {
				mouseover: item.bindTemplate.to('mouseover'),
				focus: item.bindTemplate.to('focus')
			}
		});

		item.on('mouseover', () => this.fire('itemHover', iconName));
		item.on('focus', () => this.fire('itemFocus', iconName));
		item.on('execute', () => {
			this.set('iconName', iconName);
			this.fire('execute', iconName);
		});
		item.bind('isOn').to(this, 'iconName', value => iconName === value);

		return item;
	}

	refresh(categoryDefinition, iconDefinitions) {
		this.items.clear();
		for (const iconName of categoryDefinition.icons) {
			const iconDefinition = iconDefinitions[iconName];
			if (iconDefinition)
				this.items.add(this._createItem(iconName, iconDefinitions[iconName]));
		}
	}

	/**
	 * @inheritdoc
	 */
	render() {
		super.render();

		for (const item of this.items)
			this.focusTracker.add(item.element);

		this.items.on('change', (eventInfo, { added, removed }) => {
			if (added.length > 0) {
				for (const item of added)
					this.focusTracker.add(item.element);
			}
			if (removed.length > 0) {
				for (const item of removed)
					this.focusTracker.remove(item.element);
			}
		});

		this.keystrokes.listenTo(this.element);
	}

	/**
	 * @inheritdoc
	 */
	destroy() {
		super.destroy();

		this.focusTracker.destroy();
		this.keystrokes.destroy();
	}

	/**
	 * Focuses the first focusable in `items`.
	 */
	focus() {
		this.items.first.focus();
	}
}
