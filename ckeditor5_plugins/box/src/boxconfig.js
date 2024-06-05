/**
 * @file defines configuration for the box plugin.
 * 
 * @typedef {Object} SelectableOption
 * @property {string} label
 * @property {string?} icon
 * @property {string} className
 */

import { icons } from 'ckeditor5/src/core';
import boxTitleLeft from '../../../icons/box-title-left.svg';
import boxTitleCenter from '../../../icons/box-title-center.svg';
import boxTitleRight from '../../../icons/box-title-right.svg';
import boxTitleHidden from '../../../icons/box-title-hidden.svg';
import boxStyleFill from '../../../icons/box-style-fill.svg';
import boxStyleOutline from '../../../icons/box-style-outline.svg';
import boxStyleNone from '../../../icons/box-style-none.svg';

/** @type {Object<string, SelectableOption>} */
export const titleOptions = {
  left: {
    label: 'Align left',
    icon: boxTitleLeft,
    className: 'ucb-box-title-left'
  },
  center: {
    label: 'Align center',
    icon: boxTitleCenter,
    className: 'ucb-box-title-center'
  },
  right: {
    label: 'Align right',
    icon: boxTitleRight,
    className: 'ucb-box-title-right'
  },
  hidden: {
    label: 'Hide',
    icon: boxTitleHidden,
    className: 'ucb-box-title-hidden'
  }
};

export const titleDefault = 'left';

/** @type {Object<string, SelectableOption>} */
export const alignmentOptions = {
  left: {
    label: 'Float left',
    icon: icons.objectLeft,
    className: 'ucb-box-alignment-left'
  },
  none: {
    label: 'Fill width',
    icon: icons.objectFullWidth,
    className: 'ucb-box-alignment-none'
  },
  right: {
    label: 'Float right',
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
