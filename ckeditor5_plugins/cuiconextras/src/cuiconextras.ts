/**
 * @file This is what CKEditor refers to as a master (glue) plugin. Its role is
 * just to load the “editing” and “UI” components of this Plugin. Those
 * components could be included in this file, but
 *
 * I.e, this file's purpose is to integrate all the separate parts of the plugin
 * before it's made discoverable via index.js.
 */
// cSpell:ignore cuiconextrasediting cuiconextrasui

// The contents of IconUI and Icon editing could be included in this
// file, but it is recommended to separate these concerns in different files.
import type { PluginInterface } from '@ckeditor/ckeditor5-core/src/plugin';
import CUIconExtrasEditing from './cuiconextrasediting';
import CUIconExtrasToolbar from './cuiconextrastoolbar';
import type { PluginDependencies } from 'ckeditor5/src/core';
import { Plugin } from 'ckeditor5/src/core';

export default class CUIconExtras extends Plugin implements PluginInterface {
  // Note that IconEditing and IconUI also extend `Plugin`, but these
  // are not seen as individual plugins by CKEditor 5. CKEditor 5 will only
  // discover the plugins explicitly exported in index.js.
  public static get requires(): PluginDependencies {
    return [CUIconExtrasEditing, CUIconExtrasToolbar] as const;
  }
}
