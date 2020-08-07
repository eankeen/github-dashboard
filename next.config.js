module.exports = {
	reactStrictMode: true,
	poweredByHeader: false,
	async rewrites() {
		return [
			// {
			// 	source: '/repo',
			// 	destination: 'http://127.0.0.1:3000',
			// },
			// {
			// 	source: '/graphql-github',
			// 	destination: 'http://api.github.com/graphql',
			// },
		]
	},
}
