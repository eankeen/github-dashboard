import { createProxyMiddleware } from 'http-proxy-middleware'

export const config = {
	api: {
		bodyParser: false,
	},
}

// const p = createProxyMiddleware({
// 	target: 'https://api.github.com/graphql',
// 	pathRewrite: { '^(.*)': '/graphql' },
// 	logLevel: 'debug',
// 	changeOrigin: true,
// 	secure: false,
// 	ws: true,
// })
// export default p

export default function GraphqlGithub(req, res) {
	return new Promise((resolve, reject) => {
		console.log('done')
		req.headers['authorization'] = `bearer ${process.env.GITHUB_TOKEN}`

		createProxyMiddleware({
			target: 'https://api.github.com/graphql',
			ignorePath: true,
			logLevel: 'debug',
			changeOrigin: true,
			secure: false,
			ws: true,
			onError: (err: Error, req, res) => {
				reject('prommise rejected')
			},
			onProxyRes: (proxyRes, req, res) => {
				console.info(proxyRes)
				resolve()
			},
		})
			// @ts-ignore
			.call(this, req, res)
	})
}
