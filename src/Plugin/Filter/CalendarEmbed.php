<?php

namespace Drupal\ucb_ckeditor_plugins\Plugin\Filter;

use Drupal\Component\Utility\Html;
use Drupal\filter\FilterProcessResult;
use Drupal\ucb_ckeditor_plugins\Plugin\EmbedFilterBase;

/**
 * Defines a filter used by the Calendar plugin.
 *
 * @Filter(
 *   id = "filter_calendar_embed",
 *   title = @Translation("Embed calendars"),
 *   description = @Translation("Allows embedded calendars from Google Calendar to display correctly."),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_TRANSFORM_IRREVERSIBLE,
 *   weight = 10
 * )
 */
class CalendarEmbed extends EmbedFilterBase {

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    $result = new FilterProcessResult($text);

    if (stristr($text, '<ucb-calendar') === FALSE) {
      return $result;
    }

    $dom = Html::load($text);
    $xpath = new \DOMXPath($dom);

    foreach ($xpath->query('//ucb-calendar[@*]') as $node) {
      $build = [];

      foreach ($node->attributes as $attribute) {
        $build['#attributes'][$attribute->nodeName] = $attribute->nodeValue;
      }

      if (isset($build['#attributes']['class'])) {
        $classes = preg_split('/\s/', $build['#attributes']['class']);
        if (in_array('ucb-calendar', $classes)) {
          // Classes must match exactly to be recognized as a calendar in the
          // editor, the same rule applies here.
          if (in_array('ucb-google-calendar', $classes)) {
            // Calendar is a Google calendar.
            $build['#theme'] = 'ucb_google_calendar_embed';
            if (isset($build['#attributes']['data-query-string'])) {
              $build['#queryString'] = $build['#attributes']['data-query-string'];
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
