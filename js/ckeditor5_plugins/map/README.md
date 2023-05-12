# CKEditor 5 Plugin: Map

The Map CKEditor plugin allows insertion of a University of Colorado Boulder Campus Map using a URL generated from the [Campus Map](https://www.colorado.edu/map/?id=336) page.

## Model
```xml
<campusMap mapSize="small|medium|large" mapLocation="{\d+}"></campusMap>
```

## HTML
```html
<campus-map class="ucb-map ucb-campus-map ucb-map-size-(small|medium|large)" data-map-location="{\d+}"></campus-map>
```
