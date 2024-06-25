/**
 * @file defines schemas, converters, and commands for the callout plugin.
 * 
 * @typedef { import('./calloutconfig').SelectableOption } SelectableOption
 * @typedef { import('@ckeditor/ckeditor5-engine').DowncastWriter } DowncastWriter
 * @typedef { import('@ckeditor/ckeditor5-engine/src/view/containerelement').default } ContainerElement
 */

import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertCalloutCommand from './insertcalloutcommand';
import { enablePlaceholder } from 'ckeditor5/src/engine';
import ModifyCalloutCommand from './modifycalloutcommand';
import { sizeOptions, defaultSize } from './calloutconfig';

// cSpell:ignore callout insertcalloutcommand

/**
 * CKEditor 5 plugins do not work directly with the DOM. They are defined as
 * plugin-specific data models that are then converted to markup that
 * is inserted in the DOM.
 *
 * CKEditor 5 internally interacts with callout as this model:
 * <callout>
 *       <calloutContent></calloutContent>
 * </callout>
 *
 * Which is converted for the browser/user as this markup
 * <div class="feature-layout-callout feature-layout-callout-SIZE">
 *       <div class="ucb-callout-content"></div>
 * </div>
 *
 * This file has the logic for defining the callout model, and for how it is
 * converted to standard DOM markup.
 */
export default class CalloutEditing extends Plugin {
  /**
   * @inheritdoc
   */
  static get requires() {
    return [Widget];
  }

  /**
   * @inheritdoc
   */
  init() {
    this._defineSchema();
    this._defineConverters();
    this._defineCommands();
  }

  _defineSchema() {
    // Schemas are registered via the central `editor` object.
    const schema = this.editor.model.schema;

    schema.register('callout', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',
      // Allow the attributes which control the callout's alignment, style, and theme.
      allowAttributes: ['calloutSize']
    });

    schema.register('calloutContent', {
      isLimit: true,
      allowIn: 'callout',
      allowContentOf: '$root'
    });

    schema.addChildCheck((context, childDefinition) => {
      // Disallow callout inside calloutContent.
      if (
        context.endsWith('calloutContent') &&
        childDefinition.name === 'callout'
      ) {
        return false;
      }
    });
  }

  /**
   * Converters determine how CKEditor 5 models are converted into markup and
   * vice-versa.
   */
  _defineConverters() {
    // Converters are registered via the central editor object.
    const { conversion, editing } = this.editor;

    // The size attribute converted to element class names.
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('calloutSize', sizeOptions));


    // Upcast Converters: determine how existing HTML is interpreted by the
    // editor. These trigger when an editor instance loads.
    //
    // If <div class="feature-layout-callout"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <callout> model.
    conversion.for('upcast').elementToElement({
      model: 'callout',
      view: {
        name: 'div',
        classes: 'feature-layout-callout'
      }
    });

    // If <div class="ucb-callout-content"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <calloutContent> model, provided it is a child element of
    // <callout>, as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'calloutContent',
      view: {
        name: 'div',
        classes: 'ucb-callout-content'
      }
    });

    // Data Downcast Converters: converts stored model data into HTML.
    // These trigger when content is saved.
    //
    // Instances of <callout> are saved as
    // <div class="feature-layout-callout"></dive>.
    conversion.for('dataDowncast').elementToElement({
      model: 'callout',
      view: (modelElement, { writer: viewWriter }) => createCalloutView(viewWriter)
    });

    // Instances of <calloutContent> are saved as
    // <div class="ucb-callout-content">{{content}}</div>.
    conversion.for('dataDowncast').elementToElement({
      model: 'calloutContent',
      view: {
        name: 'div',
        classes: 'ucb-callout-content'
      }
    });

    // Editing Downcast Converters. These render the content to the user for
    // editing, i.e. this determines what gets seen in the editor. These trigger
    // after the Data Upcast Converters, and are re-triggered any time there
    // are changes to any of the models' properties.
    //
    // Convert the <callout> model into a container widget in the editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'callout',
      view: (modelElement, { writer: viewWriter }) => createCalloutView(viewWriter, true)
    });

    // Convert the <calloutContent> model into an editable <div> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'calloutContent',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'ucb-callout-content',
        });
        return toWidgetEditable(div, viewWriter);
      }
    });
  }

  /**
   * Defines the commands for inserting or modifying the callout.
   */
  _defineCommands() {
    const commands = this.editor.commands;
    commands.add('insertCallout', new InsertCalloutCommand(this.editor));
    commands.add('modifyCalloutSize', new ModifyCalloutCommand(this.editor, 'calloutSize', defaultSize));

  }
}

/**
 * @param {string} attributeName 
 *   The attribute name.
 * @param {Object<string, SelectableOption>} attributeOptions
 *   The options avaliable for the attribute.
 * @returns 
 *   The attribute to attribute definition of the specified attribute.
 */
function buildAttributeToAttributeDefinition(attributeName, attributeOptions) {
  const view = {};
  for (const [name, option] of Object.entries(attributeOptions))
    view[name] = { key: 'class', value: option.className };
  return {
    model: {
      key: attributeName,
      values: Object.keys(attributeOptions)
    },
    view
  };
}

/**
 * @param {DowncastWriter} viewWriter
 *   The downcast writer.
 * @param {boolean} [widget=false]
 *   Whether or not to return a widget for editing. Defaults to `false`.
 * @returns {ContainerElement}
 *   The callout container element or widget.
 */
function createCalloutView(viewWriter, widget = false) {
  const div = viewWriter.createContainerElement('div', { class: 'feature-layout-callout' });
  return widget ? toWidget(div, viewWriter, { label: 'callout widget', hasSelectionHandle: true }) : div;
}
