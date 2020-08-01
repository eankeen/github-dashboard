module.exports = {
	// reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/graphql-github',
				destination: 'http://localhost:3000',
			},
		]
	},
}
