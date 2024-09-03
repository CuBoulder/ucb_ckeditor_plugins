<?php

namespace Drupal\ucb_ckeditor_plugins\Plugin\Filter;

use Drupal\Component\Utility\Html;
use Drupal\filter\FilterProcessResult;
use Drupal\ucb_ckeditor_plugins\Plugin\EmbedFilterBase;

/**
 * Defines a filter used by the Map plugin.
 *
 * @Filter(
 *   id = "filter_map_embed",
 *   title = @Translation("Embed maps"),
 *   description = @Translation("Allows embedded maps from CU Boulder Campus Map or Google Maps to display correctly."),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_TRANSFORM_IRREVERSIBLE,
 *   weight = 10
 * )
 */
class MapEmbed extends EmbedFilterBase {

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    $result = new FilterProcessResult($text);

    if (stristr($text, '<ucb-map') === FALSE) {
      return $result;
    }

    $dom = Html::load($text);
    $xpath = new \DOMXPath($dom);

    foreach ($xpath->query('//ucb-map[@*]') as $node) {
      $build = [];

      foreach ($node->attributes as $attribute) {
        $build['#attributes'][$attribute->nodeName] = $attribute->nodeValue;
      }

      if (isset($build['#attributes']['class'])) {
        $classes = preg_split('/\s/', $build['#attributes']['class']);
        if (in_array('ucb-map', $classes)) {
          // Classes must match exactly to be recognized as a map in the
          // editor, the same rule applies here.
          if (in_array('ucb-campus-map', $classes)) {
            // Map is a campus map.
            $build['#theme'] = 'ucb_campus_map_embed';
            if (isset($build['#attributes']['data-map-location'])) {
              $build['#mapLocation'] = preg_replace('/\D+/', '', $build['#attributes']['data-map-location']);
            }
          }
          elseif (in_array('ucb-google-map', $classes)) {
            // Map is a Google map.
            $build['#theme'] = 'ucb_google_map_embed';
            if (isset($build['#attributes']['data-map-location'])) {
              $mapLocation = $build['#attributes']['data-map-location'];
              if ($mapLocation[0] === '?') {
                $build['#googleMyMapsParams'] = $mapLocation;
              }
              else {
                $build['#mapLocation'] = rawurlencode($mapLocation);
              }
            }
          }
          else {
            continue;
          }
        }
        else {
          continue;
        }
      }
      else {
        continue;
      }

      $this->renderIntoDomNode($build, $node, $result);
    }

    $result->setProcessedText(Html::serialize($dom));

    return $result;
  }

}
