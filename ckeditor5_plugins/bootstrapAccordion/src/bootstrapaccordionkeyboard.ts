import type { PluginInterface } from '@ckeditor/ckeditor5-core/src/plugin';
import type {
  BubblingEventInfo,
  DocumentSelection,
  DomEventData,
  Element,
  ViewDocumentTabEvent
} from 'ckeditor5/src/engine';
import type { KeystrokeInfo } from 'ckeditor5/src/utils';
import { Plugin } from 'ckeditor5/src/core';
import { getSelectedAccordionItemModelElement } from './bootstrapaccordionutils';

/**
 * Enables navigating through Bootstrap Accordion widgets using the tab keys.
 */
export default class BootstrapAccordionKeyboard extends Plugin implements PluginInterface {

  /**
   * The plugin's name in the PluginCollection.
   */
  static get pluginName(): 'BootstrapAccordionKeyboard' {
    return 'BootstrapAccordionKeyboard' as const;
  }

  /**
   * @inheritdoc
   */
  init() {
    const viewDocument = this.editor.editing.view.document;

    this.listenTo<ViewDocumentTabEvent>(
      viewDocument,
      'tab',
      (bubblingEventInfo: BubblingEventInfo, domEventData: DomEventData & KeystrokeInfo) =>
        this._handleNavigation(bubblingEventInfo, domEventData, !domEventData.shiftKey),
      { context: node => node.is('element') && (node.hasClass('ckeditor5-bootstrap-accordion-button') || node.hasClass('ckeditor5-bootstrap-accordion-body')) }
    );
  }

  /**
   * Handles navigation keystroke events.
   *
   * @param bubblingEventInfo
   *   The event object passed to bubbling event callbacks.
   * @param domEventData
   *   The DOM event data.
   * @param forward
   *   Whether to more forward or backward through the accordion.
   */
  private _handleNavigation(bubblingEventInfo: BubblingEventInfo, domEventData: DomEventData, forward: boolean) {
    const model = this.editor.model;
    const selection = model.document.selection;
    const selectedElement = selection.getFirstPosition()?.findAncestor('bootstrapAccordionButton') || selection.getFirstPosition()?.findAncestor('bootstrapAccordionBody');

    if (!selectedElement) {
      return;
    }

    const navigateToElement = navigate(selectedElement, selection, forward);

    if (!navigateToElement) {
      return;
    }

    domEventData.preventDefault();
    domEventData.stopPropagation();
    bubblingEventInfo.stop();

    model.change(writer => {
      writer.setSelection(writer.createRangeIn(navigateToElement));
    });
  }

}

/**
 * Navigates within an accordion widget.
 *
 * @param selectedElement
 *   The selected accordion button or body.
 * @param selection
 *   The model document selection.
 * @param forward
 *   Whether to more forward or backward through the accordion.
 * @returns
 *   The element to navigate to, or null if there isn't one (as in the case of
 *   the first or last accordion item being selected).
 */
function navigate(selectedElement: Element, selection: DocumentSelection, forward: boolean): Element | null {
  const accordionItem = getSelectedAccordionItemModelElement(selection);
  if (!accordionItem) {
    return null;
  }
  const accordion = accordionItem.parent as Element;
  return forward ? getNext(accordion, accordionItem, selectedElement) : getPrevious(accordion, accordionItem, selectedElement);
}

/**
 * Moves to the previous available element in the accordion.
 *
 * @param accordion
 *   The selected accordion.
 * @param accordionItem
 *   The accordion item. If this parameter is `null` then the function simply
 *   returns `null`.
 * @param selectedElement
 *   The selected accordion button or body.
 * @returns
 *   The previous available element, or null if there isn't one.
 */
function getPrevious(accordion: Element, accordionItem: Element | null, selectedElement: Element | null): Element | null {
  if (!accordionItem) {
    // Selection was at the start of the accordion, there isn't a previous
    // item.
    return null;
  }
  const itemChildren = [...accordionItem.getChildren()];
  const childIndex = selectedElement ? itemChildren.indexOf(selectedElement.parent as Element) - 1 : itemChildren.length - 1;
  if (childIndex > -1) {
    return (itemChildren[childIndex] as Element).getChild(0) as Element | null;
  } else {
    // No more elements in this accordion item, move to the previous one.
    return getPrevious(accordion, accordion.getChild(accordion.getChildIndex(accordionItem)! - 1) as Element | null, null);
  }
}

/**
 * Moves to the next available element in the accordion.
 *
 * @param accordion
 *   The selected accordion.
 * @param accordionItem
 *   The accordion item. If this parameter is `null` then the function simply
 *   returns `null`.
 * @param selectedElement
 *   The selected accordion button or body.
 * @returns
 *   The next available element, or null if there isn't one.
 */
function getNext(accordion: Element, accordionItem: Element | null, selectedElement: Element | null): Element | null {
  if (!accordionItem) {
    // Selection was at the end of the accordion, there isn't a next item.
    return null;
  }
  const itemChildren = [...accordionItem.getChildren()];
  const childIndex = selectedElement ? itemChildren.indexOf(selectedElement.parent as Element) + 1 : 0;
  if (childIndex < itemChildren.length) {
    return (itemChildren[childIndex] as Element).getChild(0) as Element | null;
  } else {
    // No more elements in this accordion item, move to the next one.
    return getNext(accordion, accordion.getChild(accordion.getChildIndex(accordionItem)! + 1) as Element | null, null);
  }
}
