# CU Boulder CKEditor 5 Plugin Collection

All notable changes to this project will be documented in this file.

Repo : [GitHub Repository](https://github.com/CuBoulder/ucb_ckeditor_plugins)

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
