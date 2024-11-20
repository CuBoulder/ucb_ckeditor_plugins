/**
 * @file The build process always expects an index.js file. Anything exported
 * here will be recognized by CKEditor 5 as an available plugin. Multiple
 * plugins can be exported in this one file.
 *
 * I.e. this file's purpose is to make plugin(s) discoverable.
 */
// cSpell:ignore box

import Box from './box';
import BoxGeneralHtmlSupport from './integration/boxgeneralhtmlsupport';

// Only these plugins will be built when running `b box` or `w box`.
export default { Box, BoxGeneralHtmlSupport };
