/**
 * @file defines schemas, converters, and commands for the cuiconextras plugin.
 */

import type { PluginDependencies } from 'ckeditor5/src/core';
import { Plugin } from 'ckeditor5/src/core';
import { Widget } from 'ckeditor5/src/widget';
import ModifyIconCommand from './modifyiconcommand';
import type { Color, ColorAttributeDefinition, ModelAttributeDefiniton } from './cuiconextrasconfig';
import { colorOptions, colorDefault, backgroundStyleDefault, backgroundStyleOptions, BackgroundStyle, BackgroundStyleAttributeDefinition } from './cuiconextrasconfig';
import type { SelectableOption } from './cuiconextrastypes';
import type { PluginInterface } from '@ckeditor/ckeditor5-core/src/plugin';

// cSpell:ignore icon inserticoncommand

/**
 * CKEditor 5 plugins do not work directly with the DOM. They are defined as
 * plugin-specific data models that are then converted to markup that
 * is inserted in the DOM.
 *
 * CKEditor 5 internally interacts with icon as this model:
 * <icon></icon>
 *
 * Which is converted for the browser/user as this markup
 * <i class="ucb-icon"></i>
 *
 * This file has the logic for defining the icon model, and for how it is
 * converted to standard DOM markup.
 */
export default class CUIconExtrasEditing extends Plugin implements PluginInterface {
  /**
   * @inheritdoc
   */
  public static get requires(): PluginDependencies {
    return [Widget] as const;
  }

  /**
   * @inheritdoc
   */
  public init() {
    this._defineSchema();
    this._defineConverters();
    this._defineCommands();
  }

  /*
   * This registers the structure that will be seen by CKEditor 5 as
   * <icon></icon>
   *
   * The logic in _defineConverters() will determine how this is converted to
   * markup.
   */
  private _defineSchema() {
    // Schemas are registered via the central `editor` object.
    const schema = this.editor.model.schema;

    schema.extend('icon', {
      allowAttributes: ['iconCUColor', 'iconCUBackgroundStyle']
    });
  }

  /**
   * Converters determine how CKEditor 5 models are converted into markup and
   * vice-versa.
   */
  private _defineConverters() {
    // Converters are registered via the central editor object.
    const { conversion } = this.editor;

    // The size, alignment, color, and style attributes all convert to element class names.
    conversion.attributeToAttribute(buildAttributeToAttributeClassNameDefinition<Color, ColorAttributeDefinition>('iconCUColor', colorOptions));
    conversion.attributeToAttribute(buildAttributeToAttributeClassNameDefinition<BackgroundStyle, BackgroundStyleAttributeDefinition>('iconCUBackgroundStyle', backgroundStyleOptions));
  }

  /**
   * Defines the commands for inserting or modifying the icon.
   */
  private _defineCommands() {
    const commands = this.editor.commands;
    commands.add('changeIconCUColor', new ModifyIconCommand(this.editor, 'iconCUColor', colorDefault));
    commands.add('changeIconCUBackgroundStyle', new ModifyIconCommand(this.editor, 'iconCUBackgroundStyle', backgroundStyleDefault));
  }
}

/**
 * @param attributeName 
 *   The attribute name.
 * @param attributeOptions
 *   The options avaliable for the attribute.
 * @returns 
 *   The attribute to attribute definition of the specified attribute.
 */
function buildAttributeToAttributeClassNameDefinition<T extends string, D extends ModelAttributeDefiniton<T>>(attributeName: D[1], attributeOptions: Record<T, SelectableOption>) {
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
      values: values
    },
    view: view
  };
}
