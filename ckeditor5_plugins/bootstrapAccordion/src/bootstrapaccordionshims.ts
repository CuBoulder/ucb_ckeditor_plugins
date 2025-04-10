/**
 * @file Contains shims to avoid breaking older versions of CKEditor 5.
 */

import type EditableElement from '@ckeditor/ckeditor5-engine/src/view/editableelement';
import type View from '@ckeditor/ckeditor5-engine/src/view/view';
import { enablePlaceholder } from 'ckeditor5/src/engine';
import { ViewModel } from 'ckeditor5/src/ui';
import { ckMajorVersion } from './bootstrapaccordionutils';

// cSpell:ignore editableelement

/** 
 * Older versions of CKEditor 5 expect the export to be named `Model` rather
 * than `ViewModel`. See https://github.com/ckeditor/ckeditor5/issues/15661
 *
 * This shim allows CKEditor 5 Bootstrap Accordion to retain compatibility with
 * Drupal 10.2 and earlier.
 */
export const UiViewModel = ViewModel;

/**
 * Older versions of CKEditor 5 handled placeholders differently.
 *
 * This shim allows CKEditor 5 Bootstrap Accordion to support placeholders in
 * Drupal 10.1 and earlier.
 *
 * @param placeholderOptions
 *   The placeholder options to be passed through to the `enablePlaceholder`
 *   library call.
 */
export function engineEnablePlaceholder(placeholderOptions: {
  view: View;
  element: EditableElement;
  isDirectHost?: boolean;
  keepOnFocus?: boolean;
  text?: string;
}) {
  if (ckMajorVersion < 39) {
    // Uses legacy `text` option in older versions of CKEditor 5.
    placeholderOptions.text = placeholderOptions.element.placeholder;
  }
  enablePlaceholder(placeholderOptions);
}
