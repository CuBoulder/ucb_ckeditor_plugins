/**
 * @file contains the icon picker root view.
 */

import { View, FocusCycler } from 'ckeditor5/src/ui';
import { FocusTracker, KeystrokeHandler } from 'ckeditor5/src/utils';

export default class IconPickerView extends View {
	constructor(locale, headerView, gridView, footerView) {
		super(locale);

		this.set('iconName', null);

		this.headerView = headerView;
		this.gridView = gridView;
		this.footerView = footerView;

		this.items = this.createCollection();
		
		this.focusTracker = new FocusTracker();
		this.keystrokes = new KeystrokeHandler();

		this._focusCycler = new FocusCycler({
			focusables: this.items,
			focusTracker: this.focusTracker,
			keystrokeHandler: this.keystrokes,
			actions: {
				focusPrevious: 'shift + tab',
				focusNext: 'tab'
			}
		});

		this.setTemplate({
			tag: 'div',
			children: [headerView, gridView, footerView],
			attributes: {
				// Avoid focus loss when the user clicks the area of the grid that is not a button.
				// https://github.com/ckeditor/ckeditor5/pull/12319#issuecomment-1231779819
				tabindex: '-1'
			}
		});

		this.items.add(headerView.categoryDropdownView.buttonView);
		this.items.add(gridView);
		this.items.add(footerView);

		footerView.delegate('execute').to(this);
	}

	/**
	 * @inheritdoc
	 */
	render() {
		super.render();

		this.focusTracker.add(this.headerView.categoryDropdownView.buttonView.element);
		this.focusTracker.add(this.gridView.element);
		this.focusTracker.add(this.footerView.formView.element);

		// Start listening for the keystrokes coming from #element.
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
		this.headerView.focus();
	}
}
