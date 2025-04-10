import type { PluginInterface } from '@ckeditor/ckeditor5-core/src/plugin';
import type { UpcastElementEvent } from '@ckeditor/ckeditor5-engine';
import type {
  AccordionCollapseModelAttribute,
  AccordionButtonModelAttribute,
  AccordionModelAttribute,
  CollapseShow,
  CollapseShowAttributeDefinition,
  ButtonCollapsed,
  ButtonCollapsedAttributeDefinition,
  ItemsStayOpen,
  ItemsStayOpenAttributeDefinition,
  Style,
  StyleAttributeDefinition
} from './bootstrapaccordionconfig';
import type { ModelAttributeDefinition, SelectableOption } from './bootstrapaccordiontypes';
import { Plugin } from 'ckeditor5/src/core';
import { uid } from 'ckeditor5/src/utils';
import { Widget, toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import {
  buttonCollapsedOptions,
  collapseShowOptions,
  itemsStayOpenDefault,
  itemsStayOpenOptions,
  styleOptions
} from './bootstrapaccordionconfig';
import { engineEnablePlaceholder as shimmedEnablePlaceholder } from './bootstrapaccordionshims';
import BootstrapAccordionCollapseAllCommand from './commands/bootstrapaccordioncollapseallcommand';
import BootstrapAccordionFirstItemOpenCommand from './commands/bootstrapaccordionfirstitemopencommand';
import BootstrapAccordionOpenAllCommand from './commands/bootstrapaccordionopenallcommand';
import InsertBootstrapAccordionCommand from './commands/insertbootstrapaccordioncommand';
import InsertBootstrapAccordionItemCommand from './commands/insertbootstrapaccordionitemcommand';
import RemoveBootstrapAccordionItemCommand from './commands/removebootstrapaccordionitemcommand';
import ModifyBootstrapAccordionCommand from './commands/modifybootstrapaccordioncommand';

/**
 * Defines the Bootstrap Accordion schema, conversion, and commands.
 *
 * CKEditor 5 plugins do not work directly with the DOM. They are defined as
 * plugin-specific data models that are then converted to markup that is
 * inserted in the DOM.
 *
 * CKEditor 5 internally interacts with box as this model:
 *
 * ```xml
 * <bootstrapAccordion
 *   bootstrapAccordionId="..."
 *   bootstrapAccordionStyle="regular|flush"
 *   bootstrapAccordionItemsStayOpen="false|true">
 *   <bootstrapAccordionItem>
 *     <bootstrapAccordionHeader>
 *       <bootstrapAccordionButton
 *         bootstrapAccordionButtonCollapsed="true|false">...</bootstrapAccordionButton>
 *     </bootstrapAccordionHeader>
 *     <bootstrapAccordionCollapse bootstrapAccordionCollapseShow="false|true">
 *       <bootstrapAccordionBody>
 *         ...
 *       </bootstrapAccordionBody>
 *     </bootstrapAccordionCollapse>
 *   </bootstrapAccordionItem>
 *   <bootstrapAccordionItem>
 *     <bootstrapAccordionHeader>
 *       <bootstrapAccordionButton
 *         bootstrapAccordionButtonCollapsed="true|false">...</bootstrapAccordionButton>
 *     </bootstrapAccordionHeader>
 *     <bootstrapAccordionCollapse bootstrapAccordionCollapseShow="false|true">
 *       <bootstrapAccordionBody>
 *         ...
 *       </bootstrapAccordionBody>
 *     </bootstrapAccordionCollapse>
 *   </bootstrapAccordionItem>
 *   ...
 * </bootstrapAccordion>
 * ```
 *
 * Which is converted for the browser/user as this markup:
 *
 * ```html
 * <div
 *   class="accordion accordion-flush? accordion-items-stay-open?"
 *   data-accordion-id="...">
 *   <div class="accordion-item">
 *     <div class="accordion-header">
 *       <a class="accordion-button collapsed?" href="#">...</a>
 *     </div>
 *     <div class="accordion-collapse collapse show?">
 *       <div class="accordion-body">
 *         ...
 *       </div>
 *     </div>
 *   </div>
 *   <div class="accordion-item">
 *     <div class="accordion-header">
 *       <a class="accordion-button collapsed?" href="#">...</a>
 *     </div>
 *     <div class="accordion-collapse collapse show?">
 *       <div class="accordion-body">
 *         ...
 *       </div>
 *     </div>
 *   </div>
 *   ...
 * </div>
 * ```
 *
 * This file has the logic for defining the accordion model, and for how it is
 * converted to standard DOM markup.
 */
export default class BootstrapAccordionEditing extends Plugin implements PluginInterface {

  /**
   * The plugin's name in the PluginCollection.
   */
  static get pluginName(): 'BootstrapAccordionEditing' {
    return 'BootstrapAccordionEditing' as const;
  }

  /**
   * The plugin's dependencies.
   */
  static get requires() {
    return [Widget] as const;
  }

  /**
   * @inheritdoc
   */
  init() {
    this._defineSchema();
    this._defineConverters();
    this._defineCommands();
  }

  /**
   * Defines the accordion's model schema.
   */
  private _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('bootstrapAccordion', {
      isObject: true,
      allowWhere: '$block',
      allowAttributes:
        [
          'bootstrapAccordionId',
          'bootstrapAccordionStyle',
          'bootstrapAccordionItemsStayOpen'
        ] as AccordionModelAttribute[],
      allowChildren: ['bootstrapAccordionItem']
    });

    schema.register('bootstrapAccordionItem', {
      allowIn: 'bootstrapAccordion',
      allowChildren: ['bootstrapAccordionHeader', 'bootstrapAccordionBody']
    });

    schema.register('bootstrapAccordionHeader', {
      allowIn: 'bootstrapAccordionItem',
      allowChildren: ['bootstrapAccordionButton']
    });

    schema.register('bootstrapAccordionButton', {
      // Limits commands like "select all" to its contents when the cursor is
      // inside.
      isLimit: true,
      // Allows only text and text-like elements (like icons) inside.
      allowContentOf: '$block',
      allowAttributes:
        [
          'bootstrapAccordionButtonCollapsed'
        ] as AccordionButtonModelAttribute[],
      allowIn: 'bootstrapAccordionHeader'
    });

    schema.register('bootstrapAccordionCollapse', {
      allowIn: 'bootstrapAccordionItem',
      allowAttributes:
        [
          'bootstrapAccordionCollapseShow'
        ] as AccordionCollapseModelAttribute[],
    });

    schema.register('bootstrapAccordionBody', {
      // Limits commands like "select all" to its contents when the cursor is
      // inside.
      isLimit: true,
      // Allows almost everything inside, same as if at the root of the editor.
      allowContentOf: '$root',
      allowIn: 'bootstrapAccordionCollapse'
    });

    schema.addAttributeCheck((context, attributeName) => {
      if (['linkHref', 'anchorId'].includes(attributeName) && [...context.getNames()].includes('bootstrapAccordionButton')) {
        // Disallows links and anchors inside accordion buttons.
        return false;
      }
      return;
    });
  }

  /**
   * Defines the accordion's model converters.
   *
   * Converters determine how CKEditor 5 models are converted into markup and
   * vice-versa.
   */
  private _defineConverters() {
    const { conversion, editing, t } = this.editor;

    conversion.attributeToAttribute({
      model: 'bootstrapAccordionId',
      view: 'data-accordion-id'
    });

    conversion.attributeToAttribute(buildAttributeToAttributeClassNameDefinition<Style, StyleAttributeDefinition>('bootstrapAccordionStyle', styleOptions));
    conversion.attributeToAttribute(buildAttributeToAttributeClassNameDefinition<ItemsStayOpen, ItemsStayOpenAttributeDefinition>('bootstrapAccordionItemsStayOpen', itemsStayOpenOptions));
    conversion.attributeToAttribute(buildAttributeToAttributeClassNameDefinition<ButtonCollapsed, ButtonCollapsedAttributeDefinition>('bootstrapAccordionButtonCollapsed', buttonCollapsedOptions));
    conversion.attributeToAttribute(buildAttributeToAttributeClassNameDefinition<CollapseShow, CollapseShowAttributeDefinition>('bootstrapAccordionCollapseShow', collapseShowOptions));

    // Defines conversion for bootstrapAccordion.
    conversion.for('upcast').add(dispatcher => {
      dispatcher.on<UpcastElementEvent>('element:div', (_evt, data, conversionApi) => {
        const viewItem = data.viewItem;
        if (conversionApi.consumable.consume(viewItem, { name: true, classes: 'accordion' })) {
          const modelElement = conversionApi.writer.createElement('bootstrapAccordion', {
            // Enforces a default for accordion id.
            bootstrapAccordionId: viewItem.getAttribute('data-accordion-id') || viewItem.getAttribute('id') || uid()
          } as { [key in AccordionModelAttribute]: string; });
          // Forces insertion and conversion of a clean `bootstrapAccordion`
          // model element.
          if (conversionApi.safeInsert(modelElement, data.modelCursor)) {
            conversionApi.convertChildren(viewItem, modelElement);
            conversionApi.updateConversionResult(modelElement, data);
          }
        }
      });
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'bootstrapAccordion',
      view: (_modelElement, { writer }) => toWidget(
        writer.createContainerElement('div', { class: 'ckeditor5-bootstrap-accordion__widget' }),
        writer, { label: t('Accordion widget'), hasSelectionHandle: true }
      )
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'bootstrapAccordion',
      view: {
        name: 'div',
        classes: 'accordion'
      }
    });

    // Defines conversion for bootstrapAccordionItem.
    conversion.for('upcast').elementToElement({
      model: 'bootstrapAccordionItem',
      view: {
        name: 'div',
        classes: 'accordion-item'
      }
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'bootstrapAccordionItem',
      view: {
        name: 'div',
        classes: 'ckeditor5-bootstrap-accordion-item'
      }
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'bootstrapAccordionItem',
      view: {
        name: 'div',
        classes: 'accordion-item'
      }
    });

    // Defines conversion for bootstrapAccordionHeader.
    conversion.for('upcast').add(dispatcher => {
      dispatcher.on<UpcastElementEvent>('element', (_evt, data, conversionApi) => {
        if (conversionApi.consumable.consume(data.viewItem, { name: true, classes: 'accordion-header' })) {
          const modelElement = conversionApi.writer.createElement('bootstrapAccordionHeader');
          // Forces insertion and conversion of a clean
          // `bootstrapAccordionHeader` model element.
          if (conversionApi.safeInsert(modelElement, data.modelCursor)) {
            conversionApi.convertChildren(data.viewItem, modelElement);
            conversionApi.updateConversionResult(modelElement, data);
          }
        }
      });
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'bootstrapAccordionHeader',
      view: {
        name: 'div',
        classes: 'ckeditor5-bootstrap-accordion-header'
      }
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'bootstrapAccordionHeader',
      view: {
        name: 'div',
        classes: 'accordion-header'
      }
    });

    // Defines conversion for bootstrapAccordionButton.
    conversion.for('upcast').add(dispatcher => {
      dispatcher.on<UpcastElementEvent>('element:a', (_evt, data, conversionApi) => {
        if (conversionApi.consumable.consume(data.viewItem, { name: true, classes: 'accordion-button', attributes: ['href'] }) || conversionApi.consumable.consume(data.viewItem, { name: true, classes: 'accordion-button' })) {
          const modelElement = conversionApi.writer.createElement('bootstrapAccordionButton');
          // Forces insertion and conversion of a clean
          // `bootstrapAccordionButton` model element.
          if (conversionApi.safeInsert(modelElement, data.modelCursor)) {
            conversionApi.convertChildren(data.viewItem, modelElement);
            conversionApi.updateConversionResult(modelElement, data);
          }
        }
      });
      dispatcher.on<UpcastElementEvent>('element:button', (_evt, data, conversionApi) => {
        if (conversionApi.consumable.consume(data.viewItem, { name: true, classes: 'accordion-button' })) {
          const modelElement = conversionApi.writer.createElement('bootstrapAccordionButton');
          // Forces insertion and conversion of a clean
          // `bootstrapAccordionButton` model element.
          if (!conversionApi.safeInsert(modelElement, data.modelCursor)) {
            conversionApi.convertChildren(data.viewItem, modelElement);
            conversionApi.updateConversionResult(modelElement, data);
          }
        }
      });
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'bootstrapAccordionButton',
      view: (_modelElement, { writer }) => {
        const element = writer.createEditableElement('a', {
          class: 'ckeditor5-bootstrap-accordion-button',
          href: '#'
        });
        element.placeholder = t('Accordion item');
        shimmedEnablePlaceholder({
          view: editing.view,
          element,
          keepOnFocus: true
        });
        const widget = toWidgetEditable(element, writer, { label: t('Accordion item header') });
        return widget;
      }
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'bootstrapAccordionButton',
      view: {
        name: 'a',
        classes: 'accordion-button',
        attributes: {
          href: '#'
        }
      }
    });

    // Defines conversion for bootstrapAccordionCollapse.
    conversion.for('upcast').elementToElement({
      model: 'bootstrapAccordionCollapse',
      view: {
        name: 'div',
        classes: 'accordion-collapse'
      }
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'bootstrapAccordionCollapse',
      view: {
        name: 'div',
        classes: 'ckeditor5-bootstrap-accordion-collapse'
      }
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'bootstrapAccordionCollapse',
      view: {
        name: 'div',
        classes: ['accordion-collapse', 'collapse']
      }
    });

    // Defines conversion for bootstrapAccordionBody.
    conversion.for('upcast').elementToElement({
      model: 'bootstrapAccordionBody',
      view: {
        name: 'div',
        classes: 'accordion-body'
      }
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'bootstrapAccordionBody',
      view: (_modelElement, { writer }) => {
        const element = writer.createEditableElement('div', {
          class: 'ckeditor5-bootstrap-accordion-body'
        });
        element.placeholder = t('Accordion item body');
        shimmedEnablePlaceholder({
          view: editing.view,
          element,
          isDirectHost: false,
          keepOnFocus: true
        });
        return toWidgetEditable(element, writer, { label: t('Accordion item body') });
      }
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'bootstrapAccordionBody',
      view: {
        name: 'div',
        classes: 'accordion-body'
      }
    });
  }

  /**
   * Defines the commands for inserting or modifying the accordion.
   */
  private _defineCommands() {
    const editor = this.editor;
    const commands = editor.commands;
    commands.add('insertBootstrapAccordion', new InsertBootstrapAccordionCommand(editor));
    commands.add('insertBootstrapAccordionItem', new InsertBootstrapAccordionItemCommand(editor));
    commands.add('removeBootstrapAccordionItem', new RemoveBootstrapAccordionItemCommand(editor));
    commands.add('bootstrapAccordionFirstItemOpen', new BootstrapAccordionFirstItemOpenCommand(editor));
    commands.add('bootstrapAccordionItemsStayOpen', new ModifyBootstrapAccordionCommand<ItemsStayOpen, ItemsStayOpenAttributeDefinition>(editor, 'bootstrapAccordionItemsStayOpen', itemsStayOpenDefault));
    commands.add('bootstrapAccordionOpenAll', new BootstrapAccordionOpenAllCommand(editor));
    commands.add('bootstrapAccordionCollapseAll', new BootstrapAccordionCollapseAllCommand(editor));
  }

}

/**
 * Builds an attribute to attribute definition which converts between a CSS
 * class and a model attribute.
 *
 * @param attributeName
 *   The attribute name.
 * @param attributeOptions
 *   The options available for the attribute.
 * @returns
 *   The attribute to attribute definition of the specified attribute.
 */
function buildAttributeToAttributeClassNameDefinition<T extends string, D extends ModelAttributeDefinition<T>>(attributeName: D[1], attributeOptions: Record<T, SelectableOption>) {
  const view: { [key: string]: { key: 'class', value: string } } = {};
  const values: string[] = [];
  for (const [value, option] of Object.entries<SelectableOption>(attributeOptions)) {
    if (!option.className) continue;
    values.push(value);
    view[value] = { key: 'class', value: option.className };
  }
  return {
    model: {
      key: attributeName,
      values
    },
    view
  };
}
