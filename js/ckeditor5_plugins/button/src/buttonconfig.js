import { icons } from 'ckeditor5/src/core';

export const sizeOptions = {
	large: {
		label: 'Large',
		icon: icons.large,
		className: 'ucb-button-large'
	},
	regular: {
		label: 'Regular',
		icon: icons.regular,
		className: 'ucb-button-regular'
	},
	small: {
		label: 'Small',
		icon: icons.small,
		className: 'ucb-button-small'
	},
};

export const defaultSize = 'regular'

export const colorOptions = {
	blue: {
		label: 'Blue',
		className: 'ucb-button-blue'
	},
	black: {
		label: 'Black',
		className: 'ucb-button-black'
	},
	grey: {
		label: 'Grey',
		className: 'ucb-button-grey'
	},
	white: {
		label: 'White',
		className: 'ucb-button-white'
	},
	gold: {
		label: 'Gold',
		className: 'ucb-button-gold'
	}
};

export const defaultColor = 'black'

export const styleOptions = {
	full: {
		label: 'Full',
		icon: icons.objectFullWidth,
		className: 'ucb-button-full'
	},
	default: {
		label: 'Default',
		icon: icons.objectCenter,
		className: 'ucb-button-default'
	},
};

export const defaultStyle = 'default'