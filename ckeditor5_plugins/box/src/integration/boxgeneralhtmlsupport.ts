import { Plugin } from 'ckeditor5/src/core';
import { setViewAttributes } from '@ckeditor/ckeditor5-html-support/src/utils';
import type { PluginInterface } from '@ckeditor/ckeditor5-core/src/plugin';
import type { DowncastAttributeEvent, Element as ModelElement, ViewElement, UpcastElementEvent } from 'ckeditor5/src/engine';

/**
 * Integration with the external `GeneralHtmlSupport` plugin. Preserves allowed
 * HTML attributes on the box.
 */
export default class BoxGeneralHtmlSupport extends Plugin implements PluginInterface {
  /**
   * The plugin's name in the PluginCollection.
   */
  static get pluginName(): 'BoxGeneralHtmlSupport' {
    return 'BoxGeneralHtmlSupport' as const;
  }

  /**
   * @inheritdoc
   */
  init() {
    const { editor } = this;
    const { plugins } = editor;

    if (!plugins.has('GeneralHtmlSupport') || !plugins.has('DataFilter')) {
      // Nothing to integrate with.
      return;
    }

    const { model, conversion } = editor;
    const { schema } = model;
    const dataFilter = plugins.get('DataFilter');

    schema.extend('box', {
      allowAttributes: ['htmlAttributes']
    });

    conversion.for('upcast').add(dispatcher => {
      dispatcher.on<UpcastElementEvent>('element:div',
        (_evt, data, conversionApi) => {
          const viewElement = data.viewItem;
          // Checks if the `div` element is actually a box.
          if (!viewElement.getAttribute('class')?.match(/ucb\-box(\-inner|\-title|\-content)?/)) {
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

    conversion.for('dataDowncast').add(dispatcher => {
      dispatcher.on<DowncastAttributeEvent<ModelElement>>('attribute:htmlAttributes',
        (evt, data, conversionApi) => {
          const modelElement = data.item;
          if (!['box', 'boxInner', 'boxTitle', 'boxContent'].includes(modelElement.name) || !conversionApi.consumable.consume(modelElement, evt.name)) {
            return;
          }
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
