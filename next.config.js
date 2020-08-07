module.exports = {
	reactStrictMode: true,
	poweredByHeader: false,
	webpack: (
		/** @type webpack.Configuration */ config,
		{ buildId, dev, isServer, defaultLoaders, webpack }
	) => {
		config.module.rules.push({
			test: /\.graphql?$/,
			loader: 'webpack-graphql-loader',
			options: {
				// validate: true,
				removeUnusedFragments: true,
			},
		})

		return config
	},
}
