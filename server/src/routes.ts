import { Router } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { graphqlHTTP } from 'express-graphql'
import { Schema } from './schema'

const router = Router()

router.use(
	'/graphql-github',
	(req, res, next) => {
		req.originalUrl = '/graphql'
		req.headers['authorization'] = `bearer ${process.env.GITHUB_TOKEN}`
		next()
	},
	createProxyMiddleware({
		target: 'https://api.github.com',
		logLevel: 'debug',
		changeOrigin: true,
		secure: false,
		ws: true,
	})
)
// router.use(
// 	'/graphql',
// 	graphqlHTTP({
// 		schema: Schema,
// 		graphiql: process.env.NODE_ENV === 'development',
// 		pretty: process.env.NODE_ENV === 'development',
// 	})
// )

export { router }
