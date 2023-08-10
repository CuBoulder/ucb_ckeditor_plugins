/**
 * @file defines configuration for the icon plugin.
 * 
 * @typedef {Object} SelectableOption
 * @property {string} label
 * @property {string?} icon
 * @property {string} className
 */

import { icons } from 'ckeditor5/src/core';
import iconStyleNone from '../../../../icons/icon-style-none.svg';
import iconStyleSquare from '../../../../icons/icon-style-square.svg';
import iconStyleSquareRounded from '../../../../icons/icon-style-square-rounded.svg';
import iconStyleCircle from '../../../../icons/icon-style-circle.svg';

/** @type {Object<string, SelectableOption>} */
export const sizeOptions = {
	regular: {
		label: 'Regular',
		className: 'ucb-icon-size-regular'
	},
	large: {
		label: 'Large',
		className: 'ucb-icon-size-large'
	},
	'2x': {
		label: '2x',
		className: 'ucb-icon-size-2x'
	},
	'3x': {
		label: '3x',
		className: 'ucb-icon-size-3x'
	},
	'4x': {
		label: '4x',
		className: 'ucb-icon-size-4x'
	},
	'5x': {
		label: '5x',
		className: 'ucb-icon-size-5x'
	}
};

export const sizeDefault = 'regular';

/** @type {Object<string, SelectableOption>} */
export const alignmentOptions = {
	none: {
		label: 'With text',
		icon: icons.alignJustify,
		className: 'ucb-icon-alignment-none'
	},
	left: {
		label: 'Float left',
		icon: icons.objectLeft,
		className: 'ucb-icon-alignment-left'
	},
	right: {
		label: 'Float right',
		icon: icons.objectRight,
		className: 'ucb-icon-alignment-right'
	}
};

export const alignmentDefault = 'none';

/** @type {Object<string, SelectableOption>} */
export const colorOptions = {
	none: {
		label: 'Same as text',
		className: 'ucb-icon-color-none'
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
		className: 'ucb-icon-color-light-gray'
	},
	darkGray: {
		label: 'Dark Gray',
		className: 'ucb-icon-color-dark-gray'
	},
	gold: {
		label: 'Gold',
		className: 'ucb-icon-color-gold'
	}
};

export const colorDefault = 'none';

/** @type {Object<string, SelectableOption>} */
export const styleOptions = {
	none: {
		label: 'No style',
		icon: iconStyleNone,
		className: 'ucb-icon-style-none'
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

export const styleDefault = 'none';
