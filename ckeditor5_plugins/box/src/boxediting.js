/**
 * @file defines schemas, converters, and commands for the box plugin.
 * 
 * @typedef { import('./boxconfig').SelectableOption } SelectableOption
 * @typedef { import('@ckeditor/ckeditor5-engine').DowncastWriter } DowncastWriter
 * @typedef { import('@ckeditor/ckeditor5-engine/src/view/containerelement').default } ContainerElement
 */

import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertBoxCommand from './insertboxcommand';
import { enablePlaceholder } from 'ckeditor5/src/engine';
import ModifyBoxCommand from './modifyboxcommand';
import ThemeBoxCommand from './themeboxcommand';
import { titleOptions, titleDefault, alignmentOptions, alignmentDefault, styleOptions, styleDefault, themeOptions, themeDefault } from './boxconfig';

// cSpell:ignore box insertboxcommand

/**
 * CKEditor 5 plugins do not work directly with the DOM. They are defined as
 * plugin-specific data models that are then converted to markup that
 * is inserted in the DOM.
 *
 * CKEditor 5 internally interacts with box as this model:
 * <box>
 *    <boxInner>
 *       <boxTitle></boxTitle>
 *       <boxContent></boxContent>
 *    <boxInner>
 * </box>
 *
 * Which is converted for the browser/user as this markup
 * <div class="ucb-box">
 *   <div class="ucb-box-inner">
 *       <div class="ucb-box-title"></div>
 *       <div class="ucb-box-content"></div>
 *   </div>
 * </div>
 *
 * This file has the logic for defining the box model, and for how it is
 * converted to standard DOM markup.
 */
export default class BoxEditing extends Plugin {
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

  /*
   * This registers the structure that will be seen by CKEditor 5 as
   * <box>
   *    <boxInner>
   *       <boxTitle></boxTitle>
   *       <boxContent></boxContent>
   *    <boxInner>
   * </box>
   *
   * The logic in _defineConverters() will determine how this is converted to
   * markup.
   */
  _defineSchema() {
    // Schemas are registered via the central `editor` object.
    const schema = this.editor.model.schema;

    schema.register('box', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',
      // Allow the attributes which control the box's alignment, style, and theme.
      allowAttributes: ['boxTitle', 'boxAlignment', 'boxStyle', 'boxTheme']
    });

    schema.register('boxInner', {
      isLimit: true,
      allowIn: 'box'
    });

    schema.register('boxTitle', {
      // This creates a boundary for external actions such as clicking and
      // and keypress. For example, when the cursor is inside this box, the
      // keyboard shortcut for "select all" will be limited to the contents of
      // the box.
      isLimit: true,
      // This is only to be used within box.
      allowIn: 'boxInner',
      // Allow content that is allowed in blocks (e.g. text with attributes).
      allowContentOf: '$block'
    });

    schema.register('boxContent', {
      isLimit: true,
      allowIn: 'boxInner',
      allowContentOf: '$root'
    });

    schema.addChildCheck((context, childDefinition) => {
      // Disallow box inside boxContent.
      if (
        context.endsWith('boxContent') &&
        childDefinition.name === 'box'
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

    // The alignment, style, and color attributes all convert to element class names.
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('boxTitle', titleOptions));
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('boxAlignment', alignmentOptions));
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('boxStyle', styleOptions));
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('boxTheme', themeOptions));

    // Upcast Converters: determine how existing HTML is interpreted by the
    // editor. These trigger when an editor instance loads.
    //
    // If <div class="ucb-box"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <box> model.
    conversion.for('upcast').elementToElement({
      model: 'box',
      view: {
        name: 'div',
        classes: 'ucb-box'
      }
    });

    // If <div class="ucb-box-inner"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <boxInner> model, provided it is a child element of <box>,
    // as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'boxInner',
      view: {
        name: 'div',
        classes: 'ucb-box-inner'
      }
    });

    // If <div class="ucb-box-title"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <boxTitle> model, provided it is a child element of <box>,
    // as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'boxTitle',
      view: {
        name: 'div',
        classes: 'ucb-box-title'
      }
    });

    // If <div class="ucb-box-content"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <boxContent> model, provided it is a child element of
    // <box>, as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'boxContent',
      view: {
        name: 'div',
        classes: 'ucb-box-content'
      }
    });

    // Data Downcast Converters: converts stored model data into HTML.
    // These trigger when content is saved.
    //
    // Instances of <box> are saved as
    // <div class="ucb-box">{{inner content}}</section>.
    conversion.for('dataDowncast').elementToElement({
      model: 'box',
      view: (modelElement, { writer: viewWriter }) => createBoxView(viewWriter)
    });

    // Instances of <boxInner> are saved as
    // <div class="ucb-box-inner">{{inner content}}</div>.
    conversion.for('dataDowncast').elementToElement({
      model: 'boxInner',
      view: {
        name: 'div',
        classes: 'ucb-box-inner'
      }
    });

    // Instances of <boxTitle> are saved as
    // <div class="ucb-box-title">{{inner content}}</div>.
    conversion.for('dataDowncast').elementToElement({
      model: 'boxTitle',
      view: {
        name: 'div',
        classes: 'ucb-box-title'
      }
    });

    // Instances of <boxContent> are saved as
    // <div class="ucb-box-content">{{inner content}}</div>.
    conversion.for('dataDowncast').elementToElement({
      model: 'boxContent',
      view: {
        name: 'div',
        classes: 'ucb-box-content'
      }
    });

    // Editing Downcast Converters. These render the content to the user for
    // editing, i.e. this determines what gets seen in the editor. These trigger
    // after the Data Upcast Converters, and are re-triggered any time there
    // are changes to any of the models' properties.
    //
    // Convert the <box> model into a container widget in the editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'box',
      view: (modelElement, { writer: viewWriter }) => createBoxView(viewWriter, true)
    });

    // Convert the <boxTitle> model into a container <div>.
    conversion.for('editingDowncast').elementToElement({
      model: 'boxInner',
      view: (modelElement, { writer: viewWriter }) => viewWriter.createContainerElement('div', { class: 'ucb-box-inner' })
    });

    // Convert the <boxTitle> model into an editable <div> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'boxTitle',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'ucb-box-title'
        });
        enablePlaceholder({
          view: editing.view,
          element: div,
          text: 'Title'
        });
        return toWidgetEditable(div, viewWriter);
      }
    });

    // Convert the <boxContent> model into an editable <div> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'boxContent',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'ucb-box-content',
        });
        return toWidgetEditable(div, viewWriter);
      }
    });
  }

  /**
   * Defines the commands for inserting or modifying the box.
   */
  _defineCommands() {
    const commands = this.editor.commands;
    commands.add('insertBox', new InsertBoxCommand(this.editor));
    commands.add('modifyBoxTitle', new ModifyBoxCommand(this.editor, 'boxTitle', titleDefault));
    commands.add('alignBox', new ModifyBoxCommand(this.editor, 'boxAlignment', alignmentDefault));
    commands.add('styleBox', new ModifyBoxCommand(this.editor, 'boxStyle', styleDefault));
    commands.add('themeBox', new ThemeBoxCommand(this.editor, 'boxTheme', themeDefault));
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
 *   The box container element or widget.
 */
function createBoxView(viewWriter, widget = false) {
  const div = viewWriter.createContainerElement('div', { class: 'ucb-box' });
  return widget ? toWidget(div, viewWriter, { label: 'box widget', hasSelectionHandle: true }) : div;
}
