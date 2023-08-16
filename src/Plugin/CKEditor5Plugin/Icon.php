<?php

/**
 * @file
 * Contains \Drupal\ucb_ckeditor_plugins\Plugin\CKEditor5Plugin\Icon.
 */

namespace Drupal\ucb_ckeditor_plugins\Plugin\CKEditor5Plugin;

use Drupal\Core\Extension\ExtensionPathResolver;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\ckeditor5\Plugin\CKEditor5PluginDefault;
use Drupal\editor\EditorInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Yaml\Yaml;

class Icon extends CKEditor5PluginDefault implements ContainerFactoryPluginInterface {

	/**
	 * The Font Awesome category metadata.
	 * 
	 * @var array
	 */
	protected $faCategories;

	/**
	 * The Font Awesome icon metadata.
	 * 
	 * @var array
	 */
	protected $faIcons;

	/**
	 * Constructs an Icon object.
	 *
	 * @param array $configuration
	 *   A configuration array containing information about the plugin instance.
	 * @param string $plugin_id
	 *   The plugin ID for the plugin instance.
	 * @param mixed $plugin_definition
	 *   The plugin implementation definition.
	 * @param \Drupal\Core\Extension\ExtensionPathResolver $extensionPathResolver
	 *   The extension path resolver.
	 */
	public function __construct(array $configuration, $plugin_id, $plugin_definition, ExtensionPathResolver $extensionPathResolver) {
		parent::__construct($configuration, $plugin_id, $plugin_definition);
		$modulePath = $extensionPathResolver->getPath('module', 'ucb_ckeditor_plugins');
		$this->faCategories = Yaml::parseFile($modulePath . '/libraries/fontawesome/metadata/categories.yml');
		$this->faIcons = Yaml::parseFile($modulePath . '/libraries/fontawesome/metadata/icons.yml');
	}

	/**
	 * {@inheritdoc}
	 */
	public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
		return new static(
			$configuration,
			$plugin_id,
			$plugin_definition,
			$container->get('extension.path.resolver')
		);
	}

	/**
	 * {@inheritdoc}
	 */
	public function getDynamicPluginConfig(array $static_plugin_config, EditorInterface $editor): array {
		return [
			'icon' => [
				'faCategories' => $this->faCategories,
				'faIcons' => $this->faIcons
			]
		];
	}
}
