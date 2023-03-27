# CU Boulder CKEditor 5 Plugin Collection
This Drupal 9+ module contains a collection of CKEditor 5 plugins to add functionality to the WYSIWYG editor.

## Useful Plugin Development Links
- [CKEditor 5 Dev Tools for Drupal](https://www.drupal.org/project/ckeditor5_dev)
  - Necessary for building plugins
  - Demo plugin is provided within the module as well
  - Read through the readmes of the demo plugin
- [Drupal 10 launched: taking content editing to the next level with CKEditor 5](https://ckeditor.com/blog/drupal-10-launched-taking-content-editing-to-the-next-level-with-ckeditor-5/)
- [USERS & EDITORS - CKEditor 5 in Drupal 10: what is there to be excited about? (31 minutes in)](https://youtu.be/SXFAxlHTbn8?t=1862)
  - This is a good video to watch. It gives the basic structural information behind CKEditor plugins
- [CKEditor 5 Plugin Example Guide](https://ckeditor.com/docs/ckeditor5/latest/framework/guides/plugins/abbreviation-plugin/abbreviation-plugin-level-1.html)
  - There are three parts to this guide. Each part slowly builds on the last. I recommend building it but keep in mind that pathing for imports will be different for Drupal
- [webpack.config.js Loaders](https://github.com/ckeditor/ckeditor5/issues/139#issuecomment-286556558)
  - The SVG loader is needed for icon rendering. The CSS and JS loaders are only needed if you are using attempting CKEditor's built in CSS/SASS or JS functions
  - If used you will need to remove the 'include' lines as they break Drupal pathing
- [Plugin Post Update Hook](https://www.drupal.org/docs/drupal-apis/ckeditor-5-api/overview#post-update)
  - What we use to make sure that our plguins' tags are appended to the 'allowed_html' options of our wysiwyg editor format filter.
