import { createProxyMiddleware } from 'http-proxy-middleware'

export const config = {
	api: {
		bodyParser: false,
	},
}

export default function GraphqlGithub(req, res) {
	return new Promise((resolve, reject) => {
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
				resolve()
			},
		})
			// @ts-ignore
			.call(this, req, res)
	})
}
