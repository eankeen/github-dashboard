module.exports = {
	reactStrictMode: true,
	poweredByHeader: false,
	async rewrites() {
		return [
			{
				source: '/graphql-github',
				destination: 'http://localhost:3000',
			},
		]
	},
}
