/**
 * @file defines configuration for the box plugin.
 * 
 * @typedef {Object} SelectableOption
 * @property {string} label
 * @property {string?} icon
 * @property {string} className
 */

import { icons } from 'ckeditor5/src/core';
import boxStyleFill from '../../../../icons/box-style-fill.svg';
import boxStyleOutline from '../../../../icons/box-style-outline.svg';
import boxStyleNone from '../../../../icons/box-style-none.svg';

/** @type {Object<string, SelectableOption>} */
export const alignmentOptions = {
	left: {
		label: 'Left',
		icon: icons.objectLeft,
		className: 'ucb-box-alignment-left'
	},
	none: {
		label: 'Full',
		icon: icons.objectFullWidth,
		className: 'ucb-box-alignment-none'
	},
	right: {
		label: 'Right',
		icon: icons.objectRight,
		className: 'ucb-box-alignment-right'
	}
};

export const alignmentDefault = 'none';

/** @type {Object<string, SelectableOption>} */
export const styleOptions = {
	fill: {
		label: 'Fill',
		icon: boxStyleFill,
		className: 'ucb-box-style-fill'
	},
	outline: {
		label: 'Outline',
		icon: boxStyleOutline,
		className: 'ucb-box-style-outline'
	},
	none: {
		label: 'None',
		icon: boxStyleNone,
		className: 'ucb-box-style-none'
	}
};

export const styleDefault = 'fill';

/** @type {Object<string, SelectableOption>} */
export const themeOptions = {
	black: {
		label: 'Black',
		className: 'ucb-box-theme-black'
	},
	darkgray: {
		label: 'Dark Gray',
		className: 'ucb-box-theme-darkgray'
	},
	lightgray: {
		label: 'Light Gray',
		className: 'ucb-box-theme-lightgray'
	},
	white: {
		label: 'White',
		className: 'ucb-box-theme-white'
	}
};

export const themeDefault = 'lightgray';
