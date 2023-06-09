<?php

/**
 * @file
 * Contains \Drupal\ucb_ckeditor_plugins\Plugin\Filter\MapEmbed.
 */

namespace Drupal\ucb_ckeditor_plugins\Plugin\Filter;

use Drupal\Component\Utility\Html;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Render\BubbleableMetadata;
use Drupal\Core\Render\RenderContext;
use Drupal\Core\Render\RendererInterface;
use Drupal\filter\FilterProcessResult;
use Drupal\filter\Plugin\FilterBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

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
class MapEmbed extends FilterBase implements ContainerFactoryPluginInterface {

	/**
	 * The renderer.
	 *
	 * @var \Drupal\Core\Render\RendererInterface
	 */
	protected $renderer;

	/**
	 * Constructs a MapEmbed object.
	 *
	 * @param array $configuration
	 *   A configuration array containing information about the plugin instance.
	 * @param string $plugin_id
	 *   The plugin ID for the plugin instance.
	 * @param mixed $plugin_definition
	 *   The plugin implementation definition.
	 * @param \Drupal\Core\Render\RendererInterface $renderer
	 *   The renderer.
	 */
	public function __construct(array $configuration, $plugin_id, $plugin_definition, RendererInterface $renderer) {
		parent::__construct($configuration, $plugin_id, $plugin_definition);
		$this->renderer = $renderer;
	}

	/**
	 * {@inheritdoc}
	 */
	public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
		return new static(
			$configuration,
			$plugin_id,
			$plugin_definition,
			$container->get('renderer')
		);
	}

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

	/**
	 * Renders the given render array into the given DOM node.
	 *
	 * @param array $build
	 *   The render array to render in isolation.
	 * @param \DOMNode $node
	 *   The DOM node to render into.
	 * @param \Drupal\filter\FilterProcessResult $result
	 *   The accumulated result of filter processing, updated with the metadata
	 *   bubbled during rendering.
	 */
	protected function renderIntoDomNode(array $build, \DOMNode $node, FilterProcessResult &$result) {
		$markup = $this->renderer->executeInRenderContext(new RenderContext(), function () use (&$build) {
			return $this->renderer->render($build);
		});
		$result = $result->merge(BubbleableMetadata::createFromRenderArray($build));
		static::replaceNodeContent($node, $markup);
	}

	/**
	 * Replaces the contents of a DOMNode.
	 *
	 * @param \DOMNode $node
	 *   A DOMNode object.
	 * @param string $content
	 *   The text or HTML that will replace the contents of $node.
	 */
	protected static function replaceNodeContent(\DOMNode &$node, $content) {
		if (strlen($content)) {
			// Load the content into a new DOMDocument and retrieve the DOM nodes.
			$replacement_nodes = Html::load($content)->getElementsByTagName('body')
				->item(0)
				->childNodes;
		} else {
			$replacement_nodes = [$node->ownerDocument->createTextNode('')];
		}

		foreach ($replacement_nodes as $replacement_node) {
			// Import the replacement node from the new DOMDocument into the original
			// one, importing also the child nodes of the replacement node.
			$replacement_node = $node->ownerDocument->importNode($replacement_node, TRUE);
			$node->parentNode->insertBefore($replacement_node, $node);
		}
		$node->parentNode->removeChild($node);
	}
}
