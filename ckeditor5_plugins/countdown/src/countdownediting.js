import { Plugin } from 'ckeditor5/src/core';
import CountdownCommand from './insertcountdowncommand';
import { Widget, toWidget } from 'ckeditor5/src/widget';
import { styleOptions, backgroundOptions } from './countdownconfig';

export default class CountdownEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add('addCountdown', new CountdownCommand(this.editor));
  }

  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.register('cuCountdown', {
      allowWhere: '$text',
      isObject: true,
      isInline: true,
      allowAttributes: ['cuCountdownBackground', 'cuCountdownStyle', 'aria-hidden'],
      allowContentOf: '$block'
    });
  }

  _defineConverters() {
    const { conversion } = this.editor;

    // Attribute to Attribute Conversion for styles and backgrounds
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('cuCountdownBackground', backgroundOptions));
    conversion.attributeToAttribute(buildAttributeToAttributeDefinition('cuCountdownStyle', styleOptions));

    // Upcast and Downcast Conversions for the cuCountdown element
    conversion.for('upcast').elementToElement({
      model: 'cuCountdown',
      view: {
        name: 'span',
        classes: 'ucb-countdown'
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'cuCountdown',
      view: {
        name: 'span',
        classes: 'ucb-countdown',
        attributes: {
          'aria-hidden': 'true'
        }
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'cuCountdown',
      view: (modelElement, { writer }) => toWidget(
        writer.createContainerElement('span', {
          class: 'ucb-countdown',
          attributes: {
            'aria-hidden': 'true'
          }
        }),
        writer, { label: 'Countdown Widget' }
      )
    });
  }
}

function buildAttributeToAttributeDefinition(attributeName, attributeOptions) {
  const view = {};
  for (const [name, option] of Object.entries(attributeOptions)) {
    view[name] = { key: 'class', value: option.className };
  }
  return {
    model: {
      key: attributeName,
      values: Object.keys(attributeOptions)
    },
    view
  };
}
