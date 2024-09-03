/**
 * @file defines schemas, converters, and commands for the map plugin.
 * 
 * @typedef { import('./mapconfig').SelectableOption } SelectableOption
 * @typedef { import('@ckeditor/ckeditor5-engine').DowncastWriter } DowncastWriter
 * @typedef { import('@ckeditor/ckeditor5-engine/src/view/containerelement').default } ContainerElement
 */

import { Plugin } from 'ckeditor5/src/core';
import { toWidget } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import { sizeOptions } from './mapconfig';
import InsertMapCommand from './insertmapcommand';
import { campusMapLocationToURL, googleMapLocationToURL } from './maputils';

// cSpell:ignore map insertmapcommand

/**
 * CKEditor 5 plugins do not work directly with the DOM. They are defined as
 * plugin-specific data models that are then converted to markup that
 * is inserted in the DOM.
 *
 * CKEditor 5 internally interacts with map as this model:
 * <campusMap> </campusMap>
 *
 * Which is converted for the browser/user as this markup
 * <ucb-map class="ucb-map ucb-campus-map"> </ucb-map>
 *
 * This file has the logic for defining the map model, and for how it is
 * converted to standard DOM markup.
 */
export default class MapEditing extends Plugin {
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
   * <campusMap>
   * </campusMap>
   *
   * The logic in _defineConverters() will determine how this is converted to
   * markup.
   */
  _defineSchema() {
    // Schemas are registered via the central `editor` object.
    const schema = this.editor.model.schema;

    schema.register('campusMap', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',
      // Allow the attributes which control the map's alignment, style, and theme.
      allowAttributes: ['mapLocation', 'mapSize'],
      // Disallows any child elements inside the <ucb-map> element.
      allowChildren: false
    });

    schema.register('googleMap', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',
      // Allow the attributes which control the map's alignment, style, and theme.
      allowAttributes: ['mapLocation', 'mapSize'],
      // Disallows any child elements inside the <ucb-map> element.
      allowChildren: false
    });
  }

  /**
   * Converters determine how CKEditor 5 models are converted into markup and
   * vice-versa.
   */
  _defineConverters() {
    // Converters are registered via the central editor object.
    const conversion = this.editor.conversion;

    // Specifies the location attribute for campus maps.
    conversion.attributeToAttribute({
      model: {
        key: 'mapLocation',
        // Fixes a bug which caused the `&` character in the query string to
        // become `&amp;`.
        value: viewElement => viewElement.getAttribute('data-map-location').replace(/&amp;/g, '&')
      },
      view: 'data-map-location'
    });

    // The size attribute converts to element class names.
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('mapSize', sizeOptions));

    // Upcast Converters: determine how existing HTML is interpreted by the
    // editor. These trigger when an editor instance loads.
    //
    // If <ucb-map class="ucb-map ucb-campus-map"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <campusMap> model.
    conversion.for('upcast').elementToElement({
      model: 'campusMap',
      view: {
        name: 'ucb-map',
        classes: ['ucb-map', 'ucb-campus-map']
      }
    });

    // Upcast Converters: determine how existing HTML is interpreted by the
    // editor. These trigger when an editor instance loads.
    //
    // If <ucb-map class="ucb-map ucb-google-map"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <googleMap> model.
    conversion.for('upcast').elementToElement({
      model: 'googleMap',
      view: {
        name: 'ucb-map',
        classes: ['ucb-map', 'ucb-google-map']
      }
    });

    // Data Downcast Converters: converts stored model data into HTML.
    // These trigger when content is saved.
    //
    // Instances of <campusMap> are saved as
    // <ucb-map class="ucb-map ucb-campus-map"></ucb-map>.
    conversion.for('dataDowncast').elementToElement({
      model: 'campusMap',
      view: (modelElement, { writer: viewWriter }) => createCampusMapView(modelElement, viewWriter)
    });

    // Data Downcast Converters: converts stored model data into HTML.
    // These trigger when content is saved.
    //
    // Instances of <campusMap> are saved as
    // <ucb-map class="ucb-map ucb-google-map"></ucb-map>.
    conversion.for('dataDowncast').elementToElement({
      model: 'googleMap',
      view: (modelElement, { writer: viewWriter }) => createGoogleMapView(modelElement, viewWriter)
    });

    // Editing Downcast Converters. These render the content to the user for
    // editing, i.e. this determines what gets seen in the editor. These trigger
    // after the Data Upcast Converters, and are re-triggered any time there
    // are changes to any of the models' properties.
    //
    // Convert the <campusMap> model into a container widget in the editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'campusMap',
      view: (modelElement, { writer: viewWriter }) => createCampusMapView(modelElement, viewWriter, true)
    });

    // Editing Downcast Converters. These render the content to the user for
    // editing, i.e. this determines what gets seen in the editor. These trigger
    // after the Data Upcast Converters, and are re-triggered any time there
    // are changes to any of the models' properties.
    //
    // Convert the <googleMap> model into a container widget in the editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'googleMap',
      view: (modelElement, { writer: viewWriter }) => createGoogleMapView(modelElement, viewWriter, true)
    });
  }

  /**
   * Defines the commands for inserting or modifying the map.
   */
  _defineCommands() {
    const commands = this.editor.commands;
    commands.add('insertMap', new InsertMapCommand(this.editor));
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
 * @param {Element} modelElement
 *   The element which contains the campusMap model.
 * @param {DowncastWriter} downcastWriter
 *   The downcast writer.
 * @param {boolean} [widget=false]
 *   Whether or not to return a widget for editing. Defaults to `false`.
 * @returns {ContainerElement}
 *   The Campus Map element or widget.
 */
function createCampusMapView(modelElement, downcastWriter, widget = false) {
  if (widget) {
    const mapLocation = (modelElement.getAttribute('mapLocation') || '').replace(/\D/g, '');
    return toWidget(downcastWriter.createContainerElement('div',
      {
        class: 'ucb-map ucb-campus-map',
        style: `background-image: url('https://staticmap.concept3d.com/map/static-map/?map=336&loc=${mapLocation}&scale=2')`
      }, [
      downcastWriter.createRawElement('a', {
        href: campusMapLocationToURL(mapLocation)
      }, element => {
        element.innerHTML = '<span>View location on the Campus Map</span>';
        element.onclick = ev => ev.preventDefault(); // Prevents following the link when clicking the widget.
      })
    ]), downcastWriter, { label: 'map widget' });
  }
  return downcastWriter.createContainerElement('ucb-map', { class: 'ucb-map ucb-campus-map' });
}

/**
 * @param {Element} modelElement
 *   The element which contains the googleMap model.
 * @param {DowncastWriter} downcastWriter
 *   The downcast writer.
 * @param {boolean} [widget=false]
 *   Whether or not to return a widget for editing. Defaults to `false`.
 * @returns {ContainerElement}
 *   The Google Maps element or widget.
 */
 function createGoogleMapView(modelElement, downcastWriter, widget = false) {
  if (widget) {
    const mapLocation = modelElement.getAttribute('mapLocation') || '';
    return toWidget(downcastWriter.createContainerElement('div',
      {
        class: 'ucb-map ucb-google-map',
      }, [
      downcastWriter.createEmptyElement('iframe', {
        src: googleMapLocationToURL(mapLocation),
        loading: 'lazy',
        referrerpolicy: 'no-referrer'
      }),
      downcastWriter.createEmptyElement('div', {
        class: 'ucb-map-editing-cover'
      })
    ]), downcastWriter, { label: 'map widget' });
  }
  return downcastWriter.createContainerElement('ucb-map', { class: 'ucb-map ucb-google-map' });
}
