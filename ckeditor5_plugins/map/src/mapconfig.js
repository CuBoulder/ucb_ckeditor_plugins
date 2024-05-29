/**
 * @file defines configuration for the map plugin.
 * 
 * @typedef {Object} SelectableOption
 * @property {string} label
 * @property {string?} icon
 * @property {string} className
 */

/** @type {Object<string, SelectableOption>} */
export const sizeOptions = {
  small: {
    label: 'Small',
    className: 'ucb-map-size-small'
  },
  medium: {
    label: 'Medium',
    className: 'ucb-map-size-medium'
  },
  large: {
    label: 'Large',
    className: 'ucb-map-size-large'
  }
};

export const sizeDefault = 'small';
