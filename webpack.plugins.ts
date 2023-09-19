/**
 * @file defines the webpack plugin configuration for specific CKEditor plugins.
 */

import type { WebpackPluginInstance } from 'webpack';

/**
 * Contains the webpack plugins to be used when building specific CKEditor plugins.
 */
const webpackPluginConfig: { [key: string]: WebpackPluginInstance[]; } = { };

export default webpackPluginConfig;
