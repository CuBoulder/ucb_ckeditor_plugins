/**
 * @file defines configuration for the callout plugin.
 * 
 * @typedef {Object} SelectableOption
 * @property {string} label
 * @property {string?} icon
 * @property {string} className
 */

import { icons } from 'ckeditor5/src/core';

/** @type {Object<string, SelectableOption>} */
export const sizeOptions = {
  medium: {
    label: "Medium",
    icon: icons.small,
    className: "feature-layout-callout-medium",
  },
  large: {
    label: "Large",
    icon: icons.regular,
    className: "feature-layout-callout-large",
  },
  xlarge: {
    label: "Extra Large",
    icon: icons.large,
    className: "feature-layout-callout-xlarge",
  },
};

export const defaultSize = 'medium'
