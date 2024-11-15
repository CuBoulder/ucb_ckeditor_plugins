import type { DataFilter } from '@ckeditor/ckeditor5-html-support';

declare module '@ckeditor/ckeditor5-core' {
  interface PluginsMap {
    [DataFilter.pluginName]: DataFilter;
  }
}
