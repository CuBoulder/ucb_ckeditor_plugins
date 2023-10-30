import { icons } from 'ckeditor5/src/core';

export const sizeOptions = {
	xlarge: {
		label: 'Extra Large',
		icon: icons.large,
		className: 'feature-layout-callout-xlarge'
	},
	large: {
		label: 'Large',
		icon: icons.regular,
		className: 'feature-layout-callout-large'
	},
	medium: {
		label: 'Medium',
		icon: icons.small,
		className: 'feature-layout-callout-medium'
	},
};

export const defaultSize = 'medium'