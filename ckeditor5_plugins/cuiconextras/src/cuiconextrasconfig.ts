/**
 * @file defines configuration for the cuiconextras plugin.
 */

import type { SelectableOption } from './cuiconextrastypes';
import type { ToolbarConfigItem } from 'ckeditor5/src/core';
import iconStyleNone from '../../../icons/icon-style-none.svg';
import iconStyleSquare from '../../../icons/icon-style-square.svg';
import iconStyleSquareRounded from '../../../icons/icon-style-square-rounded.svg';
import iconStyleCircle from '../../../icons/icon-style-circle.svg';

/**
 * The options available in `editor.config.get('icon')`.
 */
export interface IconConfig {
  toolbarItems: ToolbarConfigItem[];
};

export type ModelAttribute = 'iconCUColor' | 'iconCUBackgroundStyle';

export type ModelAttributeDefiniton<T extends string = string, A extends ModelAttribute = ModelAttribute> = [T, A];

// === Colors ===
export type Color = 'none' | 'black' | 'white' | 'lightGray' | 'gray' | 'darkGray' | 'gold';
export type ColorAttributeDefinition = ModelAttributeDefiniton<Color, 'iconCUColor'>;
export const colorOptions: { [key in Color]: SelectableOption; } = {
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
  gray: {
    label: 'Gray',
    className: 'ucb-icon-color-gray'
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
export const colorDefault: Color = 'none';

// === Background styles ===
export type BackgroundStyle = 'none' | 'square' | 'squareRounded' | 'circle';
export type BackgroundStyleAttributeDefinition = ModelAttributeDefiniton<BackgroundStyle, 'iconCUBackgroundStyle'>;
export const backgroundStyleOptions: { [key in BackgroundStyle]: SelectableOption; } = {
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
export const backgroundStyleDefault: BackgroundStyle = 'none';
