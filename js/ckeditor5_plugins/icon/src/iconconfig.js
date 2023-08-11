/**
 * @file defines configuration for the icon plugin.
 * 
 * @typedef {Object} SelectableOption
 * @property {string} label
 * @property {string?} icon
 * @property {string?} className
 */

import { icons } from 'ckeditor5/src/core';
import iconStyleNone from '../../../../icons/icon-style-none.svg';
import iconStyleSquare from '../../../../icons/icon-style-square.svg';
import iconStyleSquareRounded from '../../../../icons/icon-style-square-rounded.svg';
import iconStyleCircle from '../../../../icons/icon-style-circle.svg';

/** @type {Object<string, SelectableOption>} */
export const sizeOptions = {
	small: {
		label: 'Small',
		icon: icons.objectSizeSmall,
		className: 'fa-sm'
	},
	regular: {
		label: 'Regular',
		icon: icons.objectSizeMedium
	},
	large: {
		label: 'Large',
		icon: icons.objectSizeLarge,
		className: 'fa-lg'
	},
	extraLarge: {
		label: 'Extra large',
		icon: icons.objectSizeFull,
		className: 'fa-xl'
	},
	'2x': {
		label: '2x',
		className: 'fa-2x'
	},
	'3x': {
		label: '3x',
		className: 'fa-3x'
	},
	'4x': {
		label: '4x',
		className: 'fa-4x'
	},
	'5x': {
		label: '5x',
		className: 'fa-5x'
	},
	'6x': {
		label: '6x',
		className: 'fa-6x'
	},
	'7x': {
		label: '7x',
		className: 'fa-7x'
	},
	'8x': {
		label: '8x',
		className: 'fa-8x'
	},
	'9x': {
		label: '9x',
		className: 'fa-9x'
	},
	'10x': {
		label: '10x',
		className: 'fa-10x'
	}
};

export const sizeDefault = 'regular';

/** @type {Object<string, SelectableOption>} */
export const alignmentOptions = {
	none: {
		label: 'With text',
		icon: icons.objectCenter
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
export const styleOptions = {
	none: {
		label: 'No style',
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

export const styleDefault = 'none';
