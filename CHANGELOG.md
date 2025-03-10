# CU Boulder CKEditor 5 Plugin Collection

All notable changes to this project will be documented in this file.

Repo : [GitHub Repository](https://github.com/CuBoulder/ucb_ckeditor_plugins)

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- ### D11 version bump
  D11 version bump
---

- ### Add margin around buttons
  Resolves https://github.com/CuBoulder/ucb_ckeditor_plugins/issues/99.
  Adds some minor padding around each button to allow spacing between buttons.
---

- ### Update jumpmenu.js for column refactor
  Updated the scripts to exclude auxiliary-columns headers from the search/build. 
  Auxiliary columns are determined by which columns are the smallest in a row. 
  This shouldn't affect how the build works on other pages outside of the basic page.
  
  Sister PR: https://github.com/CuBoulder/ucb_bootstrap_layouts/pull/64
---

- ### Fixes box widget not retaining allowed style classes
  This update:
  
  - Adds the `BoxGeneralHtmlSupport` plugin (for integration with `GeneralHtmlSupport`).
  - Corrects the allowed HTML for the box plugin.
  - Removes `package-lock.json` and updates dependencies in `package.json`.
  
  [bug, serverity:minor, plugin:box] Resolves CuBoulder/ucb_ckeditor_plugins#96
---

- ### Updates linter workflow
  Updates the linter workflow to use the new parent workflow in action-collection.
  
  CuBoulder/action-collection#7
  
  Sister PR in: All the things
---

- ### Create developer-sandbox-ci.yml
  new ci -workflow
---

- ### Adds support for Google My Maps
  [new, plugin:map] Previously, custom maps created with Google My Maps were not supported. This update adds support and resolves CuBoulder/ucb_ckeditor_plugins#92
---

- ### Column Adjustments
  ### Adjustments to the Column Plugin
  - Columns are now responsive with the following breakpoints:
      2 columns
      Desktop: 2
      Tablet: 2
      Mobile: 1
      
      3 columns
      Desktop: 3
      Tablet: 3
      Mobile: 1
      
      4 columns
      Desktop: 4
      Tablet: 2
      Mobile 1
  
  - Removes stray CKeditor5 editor classes appearing on page
  - Column button inactive when editor is within Box title and Accordion Title
  - Sets minimum 2 columns per row, previously a user could delete all columns from a row and be left with an empty row
  
  Resolves #90 
  Resolves #88 
---

- ### Adds Jump Menu plugin to Ckeditor5
  ### Jump Menu Button
  Adds a 'Jump Menu' CKEditor 5 plugin to the Editor toolbar. On insertion, this insets a Jump Menu web component that allows automatic jump menu creation and link creation to any specified header tags on the page. You may also customize the title of your Jump Menu.
  
  Includes:
  - `profile` =>  https://github.com/CuBoulder/tiamat10-profile/pull/168
  - `ucb_ckeditor_plugins` => https://github.com/CuBoulder/ucb_ckeditor_plugins/pull/87
  
  Resolves #74 
  
---

- ### CKEditor5: Adds Column Plugin
  Adds the new plugin 'Column' to the CKEditor5 toolbar. Allows for users to insert a row with evenly spaced columns (up to 4)
  
  
  Includes:
  - `ucb_ckeditor_plugins` => https://github.com/CuBoulder/ucb_ckeditor_plugins/pull/85
  - `profile` => https://github.com/CuBoulder/tiamat10-profile/pull/156
  
  Resolves https://github.com/CuBoulder/ucb_ckeditor_plugins/issues/75
---

- ### Update ucb_ckeditor_plugins.ckeditor5.yml
  Added `ucb-callout-content` to the list of allowed html classes
  
  Resolves #83 
---

- ### Issue/52
  This is an update for the callout plugin. 
  It reworks the plugin so that you can individually change parts of text within the callout, as well as add images and other options for the wysiwyg bar (risky).
  Works very similarly to the box button.
  
  Resolves #52 
---

- ### Updates URL matching pattern for Google Calendar
  [change, plugin:calendar] Resolves CuBoulder/ucb_ckeditor_plugins#80
---

- ### Invisible: switches class to 'visually-hidden'
  ### Invisible Plugin
  Switches depreciated 'sr-only' class to 'visually-hidden' class
  
  
  Resolves https://github.com/CuBoulder/ucb_ckeditor_plugins/issues/78
  Includes:
  - ckeditor_plugins => https://github.com/CuBoulder/ucb_ckeditor_plugins/pull/79
  - boulder_profile => https://github.com/CuBoulder/tiamat10-profile/pull/153
---

- ### Adds "gray" color supported by the shortcode to icons
  Resolves CuBoulder/ucb_ckeditor_plugins#76
---

- ### Fixes box widget toolbar
  [Bug] Resolves CuBoulder/ucb_ckeditor_plugins#70
---

- ### Update countup.js
  Updated countup to work properly with decimals, times, and other modifiers like monetary signs. Using the counterup-2 code which is a newer version of the currently used code on both D7 and D10
  
  - `ckeditor_plugins` => https://github.com/CuBoulder/ucb_ckeditor_plugins/pull/69
  - `migration_shortcodes` => https://github.com/CuBoulder/ucb_migration_shortcodes/pull/26
  
  Resolves #66
---

- ### Fixes box plugin error on Drupal 10.3; Cleans up indentation for Drupal coding standards compliance
  This update:
  - [bug, plugin:box] Fixes box plugin error on Drupal 10.3. Resolves CuBoulder/ucb_ckeditor_plugins#67
  - [change, meta] Cleans up indentation for Drupal coding standards compliance.
---

- ### Updates map plugin
  This update:
  - [Bug, plugin:map] Fixes a bug caused by the addition of unnecessary junk in Campus Map URLs. Resolves CuBoulder/ucb_ckeditor_plugins#64
  - [Change, plugin:map] Corrects the indentation of map plugin files to Drupal-standard spaces.
---

- ### Adds CKEditor 5 plugin styles globally to all pages
  This update:
  - [Bug, Meta] Fixes improperly-styled plugin-generated content in the Collection Grid block. Resolves CuBoulder/ucb_ckeditor_plugins#61
  - [Bug, Meta] Fixes improperly-styled plugin-generated content in the site footer. 
---

- ### A11Y Update
  Added aria-hidden to the main countdown
  Added a new sr-only div with basic information for screen readers
  
  This update:
  
  - [a11y] Resolves CuBoulder/ucb_ckeditor_plugins#59:
    - Adds `aria-hidden="true"` to the main countdown that updates every second. 
    -Adds a new div to the js output that is `sr-only` for screen readers.
    
    Sister PR: https://github.com/CuBoulder/tiamat10-profile/pull/123
    Sister PR: https://github.com/CuBoulder/ucb_migration_shortcodes/pull/20
---

- ### Increases Large Button Size
  Increases the size of Large style buttons by 5% to match the previous version (125% to 130%)
  
  Resolves #57 
---

- ### Fixes CK5 Button CSS specificity
  Previously Button link styles were being overwritten by Box's link CSS specificity (0,2,0) versus (0,5,1). This would affect pages like https://www.colorado.edu/coloradan/spring-2024 where they add Buttons into Boxes to create elements on the page.
   
  Resolves #55 
---

- ### Uses higher-resolution image for Campus Map
  Resolves CuBoulder/ucb_ckeditor_plugins#53
---

- ### Invisible Plugin Enhancements
  Enhances the `Screen-Reader Only` plugin and editing experience
  
  - Fixes bug where content editors were unable to escape out of Invisible by refactoring plugin as a widget.
  - By highlighting text and clicking the Screen Read Only toolbar button, you can automatically wrap the text selection in a SR-Only element. SR-Only elements can also be created without any selected text and the input field will auto-focus to allow immediate input of your screen-read only text within the new element.
  - Changes to inner text of a SR-Only element appear instantly.
  - SR-Only elements can be unwrapped/deleted as well as moved around in the editor using the selection handle. 
  
  Resolves #49
  
---

- ### Changes the default button color to blue
  The default color when creating a new button or button group is now blue.
  
  Resolves CuBoulder/ucb_ckeditor_plugins#48
---

- ### Update callout.js for svg icon
  Update callout.js for the icon svg update
  
  Closes #46 
---

- ### Countup Button
  Added the Countup button
  
  Countup button is the "stopwatch" icon.
  I figured the countup would be the stopwatch and the countdown would be the hourglass.
  
  Sister PR: https://github.com/CuBoulder/tiamat10-profile/pull/36
  
  Countdown Example: 11/15/2023 23:59:59
  
  Closes #36 
---

- ### Change: Button Groups - 'Add Button' Functionality & UI Enhancements
  New Changes to the Button Group plugin includes the following enhancements:
  
  - Ability to add new Buttons to existing Button Groups by selecting the new `+` icon on the Button Group Toolbar. Editors can now create an empty Button Group first and then add Buttons to it, as well as adding new Buttons to an existing Button Group. Editors may still select existing Buttons and then create the Button Group. 
  
  - Button Group's UI no longer requires confirmation of changes. Selection of Button Group color and size are instantly applied using the Button Group Toolbar. 
  
  Resolves #29 
---

- ### Converts plugin "CU Icon Extras" to TypeScript
  This was the easiest CKEditor 5 plugin to convert to TypeScript, done to verify that TypeScript plugins are building properly and get the ball rolling on TypeScript for future plugin development.
  
  Resolves CuBoulder/ucb_ckeditor_plugins#33
---

- ### Adds TypeScript as an option for plugin development
  With files from my [CKEditor 5 Icons](https://git.drupalcode.org/project/ckeditor5_icons) project, CKEditor plugins can now be built using either TypeScript or JavaScript. The build process has not changed and our existing JavaScript plugins should still build just fine.
  
  Resolves CuBoulder/ucb_ckeditor_plugins#27
---

- ### Adds selection handle to Box widgets
  It actually is that simple. Amazing.
  
  Resolves CuBoulder/ucb_ckeditor_plugins#30
---

- ### Adds Button Group Plugin
  Adds Button Group, allowing buttons to be selected in the editor and then wrapped in a button group element, which will present them in a horizontal navigation bar style with uniform sizes and colors.
  
  Also changes icon for Button to be more similar to Button Group. 
  
  Resolves https://github.com/CuBoulder/tiamat-theme/issues/251
---

- ### Adds the "CUIconExtras" CKEditor 5 plugin
  This plugin includes two extra CU-specific toolbar items for icons produced by the Icon plugin. These allow changing an icon's theme color and background style.
---

- ### Adds the "Calendar" CKEditor 5 plugin
  This update adds a "Calendar" item to CKEditor 5, allowing insertion of Google Calendar embeds via an embed code taken from Google Calendar. Equivalent to the `[googlecalendar]` Shortcode in D7 Express.
  
  Resolves CuBoulder/tiamat-theme#256
  
  Sister PR in: [tiamat-profile](https://github.com/CuBoulder/tiamat-profile/pull/53), [tiamat10-profile](https://github.com/CuBoulder/tiamat10-profile/pull/16)
---

- ### Changes link color in filled boxes
  Links inside black, dark gray, and light gray filled boxes now change color to provide contrast with the darker background. Resolves CuBoulder/tiamat-theme#434
---

- ### Button UI Changes: Esc key exits Button UI, Default button style listed first in 'Style Options'
  Button UI Changes:
  - ESC key will exit the Button UI
  - Default (Regular) style selection listed first in 'Button Style' Dropdown
  
  Resolves #22 
  
---

- ### Button: Additional Enhancements
  Adds additional site editor enhancements to Button plugin including:
  - Adding extra padding to expand the clickable area within CKEditor to allow easier click-to-edit on the button element within the editor view. Previously it was difficult to click-to-edit on small and regular button elements within the editor. Buttons rendered on page will have the traditional amount of padding.
  - Button's toolbar icon toggles on/off when editing
  
  
  Resolves #19 
---

- ### Fixes bug with Button links not persisting in UI upon return editing, before page save
  Resolves #18 - Button link persists through multiple edits before the full page is saved. Previously the provided link would get removed from UI if needing to re-enter the editing UI before page save.
  
  Also swaps the 'watch' build for the final build version of button
---

- ### Adds CKEditor 'Button' Plugin to CKEditor
  Adds custom plugin 'Button' to CKEditor5, which allows site editors to choose color, size, and style and provide a link in order to add custom buttons to their pages using WYSIWYG and Full HTML using the toolbar button.
  
  Resolves https://github.com/CuBoulder/tiamat-theme/issues/297
  
  Includes:
  - `tiamat-profile` => `issue/button`
  - `ucb_ckeditor_plugins` => `issue/button-refactor`
---

- ### Adds Google Maps support in Map CKEditor plugin
  This update adds support for Google Maps embeds via an embed code taken from Google Maps.
  
  Resolves CuBoulder/tiamat-theme#258
  
  Resolves CuBoulder/ucb_ckeditor_plugins#14
  
  Sister PR in: [tiamat-profile](https://github.com/CuBoulder/tiamat-profile/pull/49), [tiamat10-profile](https://github.com/CuBoulder/tiamat10-profile/pull/9)
---

- ### Adds Map plugin for embedding Campus Maps
  This update adds the Map plugin to CKEditor, which allows a content editor to provide a link shared from the [CU Boulder Campus Map](https://www.colorado.edu/map/) and embeds a map widget on a page. Just as in the [CKEditor 4 Shortcode](https://websupport.colorado.edu/article/425-campus-map-shortcode) there are three size options to choose from for the widget. The Map plugin outputs web component-like syntax for easier migration and future changes (see `README.md` for the schemas). Resolves CuBoulder/ucb_ckeditor_plugins#13
  
  This update also includes a couple miscellaneous changes:
  - Renames JavaScript package
  - Refactors Box plugin (no changes to functionality)
  
  CuBoulder/tiamat-theme#258
  
  Sister PR in: [tiamat-profile](https://github.com/CuBoulder/tiamat-profile/pull/48), [tiamat10-profile](https://github.com/CuBoulder/tiamat10-profile/pull/8)
  
  <img width="952" alt="Screen Shot 2023-05-15 at 11 04 57 AM" src="https://github.com/CuBoulder/ucb_ckeditor_plugins/assets/22628823/4eb1f751-ae9f-4914-bb8e-cd769459f3d7">
---

- ### Box plugin: adds configuration toolbar and options
  A toolbar appears when clicking inside a box and allows editing of the following options:
  
  Title:
  - Align left (default)
  - Align center
  - Align right
  - Hide
  
  Alignment:
  - Float left
  - Fill width (default)
  - Float right
  
  Style:
  - Fill (default)
  - Outline
  - None
  
  Theme:
  - Black
  - Dark Gray
  - Light Gray (default)
  - White
  
  Resolves CuBoulder/ucb_ckeditor_plugins#7
  Resolves CuBoulder/tiamat-theme#250
---

- ### Adds `w` and `b` scripts
  Using `w` for `watch` or `b` for `build` allows a command-line argument to specify only а single plugin, e.g. `b box` to build the box plugin. `watch` and `build` function the same as before.
  
  Resolves CuBoulder/ucb_ckeditor_plugins#2
---

- ### `invisible`: Adds icon to differentiate SR-only text from normal text
  Resolves CuBoulder/ucb_ckeditor_plugins#1
---

- ### Adds `CHANGELOG.md` and workflows
  Resolves CuBoulder/ucb_ckeditor_plugins#3
---
