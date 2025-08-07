import objectCenter from '../../../icons/object-center.svg';
import objectFullWidth from '../../../icons/object-full-width.svg';

export const sizeOptions = {
  large: {
    label: 'Large',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/></svg>',
    className: 'ucb-link-button-large'
  },
  regular: {
    label: 'Regular',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/></svg>',
    className: 'ucb-link-button-regular'
  },
  small: {
    label: 'Small',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/></svg>',
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
    icon: objectCenter,
    className: 'ucb-link-button-default'
  },
  full: {
    label: 'Full',
    icon: objectFullWidth,
    className: 'ucb-link-button-full'
  },
};

export const defaultStyle = 'default';
