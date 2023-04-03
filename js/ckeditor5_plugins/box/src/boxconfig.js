import { icons } from 'ckeditor5/src/core';
import boxStyleFill from '../../../../icons/box-style-fill.svg';
import boxStyleOutline from '../../../../icons/box-style-outline.svg';
import boxStyleNone from '../../../../icons/box-style-none.svg';

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
