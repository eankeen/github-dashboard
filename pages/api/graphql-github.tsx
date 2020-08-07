import { createProxyMiddleware } from 'http-proxy-middleware'
import { NextApiRequest, NextApiResponse } from 'next'

export const config = {
	api: {
		bodyParser: false,
	},
}

export default function GraphqlGithub(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return new Promise((resolve, reject) => {
		req.headers['authorization'] = `bearer ${process.env.GITHUB_TOKEN}`

		// adding proxy in next config didn't work and
		// we also have to setup a custom authorization header
		;(createProxyMiddleware({
			target: 'https://api.github.com/graphql',
			ignorePath: true,
			logLevel: 'debug',
			changeOrigin: true,
			secure: false,
			ws: true,
			onError: (err, req, res) => {
				reject(err)
			},
			onProxyRes: (proxyRes, req, res) => {
				resolve()
			},
		}) as typeof Object).call(this, req, res)
	})
}
