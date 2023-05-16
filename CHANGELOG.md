# CU Boulder CKEditor 5 Plugin Collection

All notable changes to this project will be documented in this file.

Repo : [GitHub Repository](https://github.com/CuBoulder/ucb_ckeditor_plugins)

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
