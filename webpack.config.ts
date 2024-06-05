/**
 * @file defines the webpack configuration.
 */

import path from 'path';
import fs from 'fs';
import { DllReferencePlugin } from 'webpack';
import type { Configuration, WebpackPluginInstance } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import webpackPluginConfig from './webpack.plugins';

function getDirectories(pluginName: string | null | undefined, srcpath: string): string[] {
  return (pluginName ? [pluginName] : fs.readdirSync(srcpath))
    .filter((value: string) => fs.statSync(path.join(srcpath, value)).isDirectory());
}

/**
 * Contains the webpack configuration for building all CKEditor plugins.
 */
export default (env: any): Configuration[] => {
  const configs: Configuration[] = [];
  // Loop through every subdirectory in src, each a different plugin, and build
  // each one in ./js/build.
  getDirectories(env ? env['plugin'] : null, './ckeditor5_plugins').forEach((dir: string) => {
    const bc: Configuration = {
      mode: 'production',
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              format: {
                comments: false
              }
            },
            test: /\.js(\?.*)?$/i,
            extractComments: false
          })
        ],
        moduleIds: 'size'
      },
      entry: {
        path: path.resolve(__dirname, 'ckeditor5_plugins', dir, 'src/index')
      },
      output: {
        path: path.resolve(__dirname, 'js/build'),
        filename: `${dir}.js`,
        library: ['CKEditor5', dir],
        libraryTarget: 'umd',
        libraryExport: 'default'
      },
      plugins: [
        // It is possible to require the ckeditor5-dll.manifest.json used in
        // core/node_modules rather than having to install CKEditor 5 here.
        // However, that requires knowing the location of that file relative to
        // where your module code is located.
        new DllReferencePlugin({
          manifest: require('./node_modules/ckeditor5/build/ckeditor5-dll.manifest.json'), // eslint-disable-line global-require, import/no-unresolved
          scope: 'ckeditor5/src',
          name: 'CKEditor5.dll'
        })
      ],
      module: {
        rules: [
          { test: /\.svg$/, use: 'raw-loader' },
          { test: /\.ts$/, loader: 'ts-loader' }
        ],
      },
      resolve: {
        extensions: ['.ts', '.js', '.json']
      }
    };
    const p: WebpackPluginInstance[] | undefined = webpackPluginConfig[dir];
    if (p) bc.plugins = (bc.plugins as WebpackPluginInstance[]).concat(p);
    configs.push(bc);
  });
  return configs;
};
