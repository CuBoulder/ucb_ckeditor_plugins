import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertBoxCommand from './insertboxcommand';
import { enablePlaceholder } from 'ckeditor5/src/engine';

// cSpell:ignore box insertboxcommand

/**
 * CKEditor 5 plugins do not work directly with the DOM. They are defined as
 * plugin-specific data models that are then converted to markup that
 * is inserted in the DOM.
 *
 * CKEditor 5 internally interacts with box as this model:
 * <box>
 *    <boxTitle></boxTitle>
 *    <boxDescription></boxDescription>
 * </box>
 *
 * Which is converted for the browser/user as this markup
 * <section class="ucb-box">
 *   <div class="ucb-box-title"></div>
 *   <div class="ucb-box-description"></div>
 * </section>
 *
 * This file has the logic for defining the box model, and for how it is
 * converted to standard DOM markup.
 */
export default class BoxEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertBox',
      new InsertBoxCommand(this.editor),
    );
  }

  /*
   * This registers the structure that will be seen by CKEditor 5 as
   * <box>
   *    <boxTitle></boxTitle>
   *    <boxDescription></boxDescription>
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
    });

    schema.register('boxTitle', {
      // This creates a boundary for external actions such as clicking and
      // and keypress. For example, when the cursor is inside this box, the
      // keyboard shortcut for "select all" will be limited to the contents of
      // the box.
      isLimit: true,
      // This is only to be used within box.
      allowIn: 'box',
      // Allow content that is allowed in blocks (e.g. text with attributes).
      allowContentOf: '$block',
    });

    schema.register('boxDescription', {
      isLimit: true,
      allowIn: 'box',
      allowContentOf: '$root',
    });

    schema.addChildCheck((context, childDefinition) => {
      // Disallow box inside boxDescription.
      if (
        context.endsWith('boxDescription') &&
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

    // Upcast Converters: determine how existing HTML is interpreted by the
    // editor. These trigger when an editor instance loads.
    //
    // If <section class="ucb-box"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <box> model.
    conversion.for('upcast').elementToElement({
      model: 'box',
      view: {
        name: 'section',
        classes: 'ucb-box',
      },
    });

    // If <div class="ucb-box-title"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <boxTitle> model, provided it is a child element of <box>,
    // as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'boxTitle',
      view: {
        name: 'div',
        classes: 'ucb-box-title',
      },
    });

    // If <div class="ucb-box-description"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <boxDescription> model, provided it is a child element of
    // <box>, as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'boxDescription',
      view: {
        name: 'div',
        classes: 'ucb-box-description',
      },
    });

    // Data Downcast Converters: converts stored model data into HTML.
    // These trigger when content is saved.
    //
    // Instances of <box> are saved as
    // <section class="ucb-box">{{inner content}}</section>.
    conversion.for('dataDowncast').elementToElement({
      model: 'box',
      view: {
        name: 'section',
        classes: 'ucb-box',
      },
    });

    // Instances of <boxTitle> are saved as
    // <div class="ucb-box-title">{{inner content}}</div>.
    conversion.for('dataDowncast').elementToElement({
      model: 'boxTitle',
      view: {
        name: 'div',
        classes: 'ucb-box-title',
      },
    });

    // Instances of <boxDescription> are saved as
    // <div class="ucb-box-description">{{inner content}}</div>.
    conversion.for('dataDowncast').elementToElement({
      model: 'boxDescription',
      view: {
        name: 'div',
        classes: 'ucb-box-description',
      },
    });

    // Editing Downcast Converters. These render the content to the user for
    // editing, i.e. this determines what gets seen in the editor. These trigger
    // after the Data Upcast Converters, and are re-triggered any time there
    // are changes to any of the models' properties.
    //
    // Convert the <box> model into a container widget in the editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'box',
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement('section', {
          class: 'ucb-box',
        });

        return toWidget(section, viewWriter, { label: 'box widget' });
      },
    });

    // Convert the <boxTitle> model into an editable <div> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'boxTitle',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'ucb-box-title',
        });
        enablePlaceholder({
          view: editing.view,
          element: div,
          text: 'Title (Optional)'
        });
        return toWidgetEditable(div, viewWriter);
      },
    });

    // Convert the <boxDescription> model into an editable <div> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'boxDescription',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'ucb-box-description',
        });
        return toWidgetEditable(div, viewWriter);
      },
    });
  }
}
