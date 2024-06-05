# CKEditor 5 Plugin: Box

This plugin allows inserting a box with various configuration options avaliable via the box toolbar, including alignment, style, and theme. The box has fields for a title and content.

This plugin is largely based on CKEditor 5's [block plugin widget tutorial](https://ckeditor.com/docs/ckeditor5/latest/framework/guides/tutorials/implementing-a-block-widget.html), as well as the [Web Express CKEditor 4 Box Shortcode](https://www.colorado.edu/demos/web-express/web-express-core/content-styling/shortcodes/box-shortcode).

## Model
```xml
<box boxTitle="left|center|right|hidden" boxAlignment="left|none|right" boxStyle="fill|outline|none" boxTheme="black|darkgray|lightgray|white">
  <boxInner>
    <boxTitle>{content of: $block}</boxTitle>
    <boxContent>{content of: $root}</boxContent>
  </boxInner>
</box>
```

## HTML
```html
<div class="ucb-box ucb-box-title-(left|center|right|hidden) ucb-box-alignment-(left|none|right) ucb-box-style-(fill|outline|none) ucb-box-theme-(black|darkgray|lightgray|white)">
  <div class="ucb-box-inner">
    <div class="ucb-box-title"> ... </div>
    <div class="ucb-box-content"> ... </div>
  </div>
</div>
```
