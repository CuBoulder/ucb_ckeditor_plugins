<?php

/**
 * @file
 * Contains \Drupal\ucb_ckeditor_plugins\Plugin\Filter\MapEmbed.
 */

namespace Drupal\ucb_ckeditor_plugins\Plugin\Filter;

use Drupal\Component\Utility\Html;
use Drupal\filter\FilterProcessResult;
use Drupal\ucb_ckeditor_plugins\Plugin\EmbedFilterBase;

/**
 * Provides a filter to correctly display map embeds produced by the Map plugin.
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

		if (stristr($text, '<ucb-map') === FALSE)
			return $result;

		$dom = Html::load($text);
		$xpath = new \DOMXPath($dom);

		foreach ($xpath->query('//ucb-map[@*]') as $node) {
			$build = [];

			foreach ($node->attributes as $attribute)
				$build['#attributes'][$attribute->nodeName] = $attribute->nodeValue;

			if (isset($build['#attributes']['class'])) {
				$classes = preg_split('/\s/', $build['#attributes']['class']);
				if (in_array('ucb-map', $classes)) { // Classes must match exactly to be recognized as a map in the editor, the same rule applies here
					if (in_array('ucb-campus-map', $classes)) { // Campus map
						$build['#theme'] = 'ucb_campus_map_embed';
						if(isset($build['#attributes']['data-map-location']))
							$build['#mapLocation'] = preg_replace('/\D+/', '', $build['#attributes']['data-map-location']);		
					} else if (in_array('ucb-google-map', $classes)) { // Google map
						$build['#theme'] = 'ucb_google_map_embed';
						if(isset($build['#attributes']['data-map-location']))
							$build['#mapLocation'] = rawurlencode($build['#attributes']['data-map-location']);
					} else continue;
				} else continue;
			} else continue;

			$this->renderIntoDomNode($build, $node, $result);
		}

		$result->setProcessedText(Html::serialize($dom));

		return $result;
	}
}
