# CU Boulder CKEditor 5 Plugin Collection

All notable changes to this project will be documented in this file.

Repo : [GitHub Repository](https://github.com/CuBoulder/ucb_ckeditor_plugins)

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
