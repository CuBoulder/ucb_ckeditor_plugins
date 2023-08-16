const
	path = require('path'),
	CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	icon: [
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free/metadata/(categories|icons).yml'),
					to: path.resolve(__dirname, 'libraries/fontawesome/metadata/[name][ext]')
				}
			]
		})
	]
};
