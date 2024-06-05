import { icons } from 'ckeditor5/src/core';

export const sizeOptions = {
  large: {
    label: 'Large',
    icon: icons.objectSizeLarge,
    className: 'ucb-link-button-large'
  },
  regular: {
    label: 'Regular',
    icon: icons.objectSizeMedium,
    className: 'ucb-link-button-regular'
  },
  small: {
    label: 'Small',
    icon: icons.objectSizeSmall,
    className: 'ucb-link-button-small'
  },
};

export const defaultSize = 'regular';

export const colorOptions = {
  blue: {
    label: 'Blue',
    className: 'ucb-link-button-blue'
  },
  black: {
    label: 'Black',
    className: 'ucb-link-button-black'
  },
  gray: {
    label: 'Gray',
    className: 'ucb-link-button-gray'
  },
  white: {
    label: 'White',
    className: 'ucb-link-button-white'
  },
  gold: {
    label: 'Gold',
    className: 'ucb-link-button-gold'
  }
};

export const defaultColor = 'blue';
