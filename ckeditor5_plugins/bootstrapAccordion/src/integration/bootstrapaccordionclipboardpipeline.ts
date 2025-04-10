import type { ClipboardInputTransformationEvent } from '@ckeditor/ckeditor5-clipboard';
import type { PluginInterface } from '@ckeditor/ckeditor5-core/src/plugin';
import { Plugin } from 'ckeditor5/src/core';

/**
 * Integration with the external `ClipboardPipeline` plugin. Drops
 * the `data-accordion-id` attribute in pasted accordions to prevent two
 * accordions in the same document from having the same id.
 */
export default class BootstrapAccordionClipboardPipeline extends Plugin implements PluginInterface {

  /**
   * The plugin's name in the PluginCollection.
   */
  static get pluginName(): 'BootstrapAccordionClipboardPipeline' {
    return 'BootstrapAccordionClipboardPipeline' as const;
  }

  /**
   * @inheritdoc
   */
  init() {
    const editor = this.editor;
    const plugins = editor.plugins;

    if (!plugins.has('ClipboardPipeline')) {
      // Nothing to integrate with.
      return;
    }

    plugins.get('ClipboardPipeline').on<ClipboardInputTransformationEvent>('inputTransformation', (_eventInfo, data) => {
      let html = editor.data.htmlProcessor.toData(data.content);
      if (!html.includes('data-accordion-id')) {
        return;
      }
      // Strips the `data-accordion-id` attribute.
      html = html.replace(/(<[^>]*)(data-accordion-id="[^"]*")/gimu, '$1');
      data.content = editor.data.htmlProcessor.toView(html);
    });
  }

}
