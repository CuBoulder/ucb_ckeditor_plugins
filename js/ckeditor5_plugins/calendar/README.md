# CKEditor 5 Plugin: Map

The Map CKEditor plugin allows insertion of a University of Colorado Boulder Campus Map using a URL generated from the [Campus Map](https://www.colorado.edu/map/?id=336) page. It also supports Google Maps embeds via an embed code generated in Google Maps.

## Model
```xml
<campusMap mapSize="small|medium|large" mapLocation="{\d+}"></campusMap>

<googleMap mapSize="small|medium|large" mapLocation="{ Google Maps embed `pb` parameter }"></googleMap>
```

## HTML
```html
<ucb-map class="ucb-map ucb-campus-map ucb-map-size-(small|medium|large)" data-map-location="{\d+}"></ucb-map>

<ucb-map class="ucb-map ucb-google-map ucb-map-size-(small|medium|large)" data-map-location="{ Google Maps embed `pb` parameter }"></ucb-map>
```
