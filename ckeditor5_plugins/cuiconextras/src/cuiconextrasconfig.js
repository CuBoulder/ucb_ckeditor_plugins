/**
 * @file defines configuration for the icon plugin.
 * 
 * @typedef {Object} SelectableOption
 * @property {string} label
 * @property {string?} icon
 * @property {string?} className
 */

import iconStyleNone from '../../../icons/icon-style-none.svg';
import iconStyleSquare from '../../../icons/icon-style-square.svg';
import iconStyleSquareRounded from '../../../icons/icon-style-square-rounded.svg';
import iconStyleCircle from '../../../icons/icon-style-circle.svg';

/** @type {Object<string, SelectableOption>} */
export const colorOptions = {
	none: {
		label: 'Same as text'
	},
	black: {
		label: 'Black',
		className: 'ucb-icon-color-black'
	},
	white: {
		label: 'White',
		className: 'ucb-icon-color-white'
	},
	lightGray: {
		label: 'Light Gray',
		className: 'ucb-icon-color-lightgray'
	},
	darkGray: {
		label: 'Dark Gray',
		className: 'ucb-icon-color-darkgray'
	},
	gold: {
		label: 'Gold',
		className: 'ucb-icon-color-gold'
	}
};

export const colorDefault = 'none';

/** @type {Object<string, SelectableOption>} */
export const backgroundStyleOptions = {
	none: {
		label: 'No background',
		icon: iconStyleNone
	},
	square: {
		label: 'Square',
		icon: iconStyleSquare,
		className: 'ucb-icon-style-square'
	},
	squareRounded: {
		label: 'Rounded Square',
		icon: iconStyleSquareRounded,
		className: 'ucb-icon-style-square-rounded'
	},
	circle: {
		label: 'Circle',
		icon: iconStyleCircle,
		className: 'ucb-icon-style-circle'
	}
};

export const backgroundStyleDefault = 'none';
