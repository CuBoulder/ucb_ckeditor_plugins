import { Plugin } from 'ckeditor5/src/core';
import { setViewAttributes } from '@ckeditor/ckeditor5-html-support/src/utils';
import type { PluginInterface } from '@ckeditor/ckeditor5-core/src/plugin';
import type { DowncastAttributeEvent, Element as ModelElement, ViewElement, UpcastElementEvent } from 'ckeditor5/src/engine';

/**
 * Integration with the external `GeneralHtmlSupport` plugin. Preserves allowed
 * HTML attributes on the accordion.
 */
export default class BootstrapAccordionGeneralHtmlSupport extends Plugin implements PluginInterface {

  /**
   * The plugin's name in the PluginCollection.
   */
  static get pluginName(): 'BootstrapAccordionGeneralHtmlSupport' {
    return 'BootstrapAccordionGeneralHtmlSupport' as const;
  }

  /**
   * @inheritdoc
   */
  init() {
    const editor = this.editor;
    const plugins = editor.plugins;

    if (!plugins.has('GeneralHtmlSupport') || !plugins.has('DataFilter')) {
      // Nothing to integrate with.
      return;
    }

    const { model, conversion } = editor;
    const schema = model.schema;
    const dataFilter = plugins.get('DataFilter');

    schema.extend('bootstrapAccordion', {
      allowAttributes: ['htmlAttributes']
    });

    conversion.for('upcast').add(dispatcher => {
      dispatcher.on<UpcastElementEvent>('element:div',
        (_evt, data, conversionApi) => {
          const viewElement = data.viewItem;
          if (!viewElement.hasClass('accordion')) {
            return;
          }
          const preserveElementAttributes = (viewElement: ViewElement, attributeName: string) => {
            const viewAttributes = dataFilter.processViewAttributes(viewElement, conversionApi);
            if (viewAttributes) {
              conversionApi.writer.setAttribute(attributeName, viewAttributes, data.modelRange!);
            }
          };
          preserveElementAttributes(viewElement, 'htmlAttributes');
        },
        { priority: 'low' }
      );
    });

    conversion.for('downcast').add(dispatcher => {
      dispatcher.on<DowncastAttributeEvent<ModelElement>>('attribute:htmlAttributes:bootstrapAccordion',
        (evt, data, conversionApi) => {
          if (!conversionApi.consumable.consume(data.item, evt.name)) {
            return;
          }
          const modelElement = data.item;
          const viewElement = conversionApi.mapper.toViewElement(modelElement);
          if (viewElement?.is('element', 'div')) {
            setViewAttributes(conversionApi.writer, data.attributeNewValue!, viewElement);
          }
        },
        { priority: 'low' }
      );
    });
  }

}
