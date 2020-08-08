module.exports = {
	reactStrictMode: true,
	poweredByHeader: false,
	webpack: (
		/** @type webpack.Configuration */ config,
		{ buildId, dev, isServer, defaultLoaders, webpack }
	) => {
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: 'graphql-tag/loader',
		})

		return config
	},
}
