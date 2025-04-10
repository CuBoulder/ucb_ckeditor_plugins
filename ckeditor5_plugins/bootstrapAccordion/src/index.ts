/**
 * @file The build process always expects an index.js file. Anything exported
 * here will be recognized by CKEditor 5 as an available plugin. Multiple
 * plugins can be exported in this one file.
 *
 * I.e. this file's purpose is to make plugin(s) discoverable.
 */

import BootstrapAccordion from './bootstrapaccordion';
import BootstrapAccordionClipboardPipeline from './integration/bootstrapaccordionclipboardpipeline';
import BootstrapAccordionGeneralHtmlSupport from './integration/bootstrapaccordiongeneralhtmlsupport';

// Only these plugins will be built when running `b bootstrapAccordion` or
// `w bootstrapAccordion`.
export default {
  BootstrapAccordion,
  BootstrapAccordionClipboardPipeline,
  BootstrapAccordionGeneralHtmlSupport
};
