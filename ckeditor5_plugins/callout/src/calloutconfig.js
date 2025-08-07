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
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/></svg>',
    className: "feature-layout-callout-medium",
  },
  large: {
    label: "Large",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/></svg>',
    className: "feature-layout-callout-large",
  },
  xlarge: {
    label: "Extra Large",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/></svg>',
    className: "feature-layout-callout-xlarge",
  },
};

export const defaultSize = 'medium'
