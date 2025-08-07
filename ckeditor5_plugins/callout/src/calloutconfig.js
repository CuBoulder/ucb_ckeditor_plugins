/**
 * @file defines configuration for the callout plugin.
 * 
 * @typedef {Object} SelectableOption
 * @property {string} label
 * @property {string?} icon
 * @property {string} className
 */



/** @type {Object<string, SelectableOption>} */
export const sizeOptions = {
  medium: {
    label: "Medium",
    className: "feature-layout-callout-medium",
  },
  large: {
    label: "Large",
    className: "feature-layout-callout-large",
  },
  xlarge: {
    label: "Extra Large",
    className: "feature-layout-callout-xlarge",
  },
};

export const defaultSize = 'medium'
