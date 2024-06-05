import { icons } from 'ckeditor5/src/core';

export const sizeOptions = {
  large: {
    label: 'Large',
    icon: icons.large,
    className: 'ucb-link-button-large'
  },
  regular: {
    label: 'Regular',
    icon: icons.regular,
    className: 'ucb-link-button-regular'
  },
  small: {
    label: 'Small',
    icon: icons.small,
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

export const styleOptions = {
  default: {
    label: 'Default',
    icon: icons.objectCenter,
    className: 'ucb-link-button-default'
  },
  full: {
    label: 'Full',
    icon: icons.objectFullWidth,
    className: 'ucb-link-button-full'
  },
};

export const defaultStyle = 'default';
