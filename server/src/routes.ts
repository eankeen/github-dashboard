import { Router } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { graphqlHTTP } from 'express-graphql'
import { Schema } from './schema'

const router = Router()

router.get('/', (req, res) => {
	res.send('foo bar')
})

router.use(
	'/graphql-github',
	createProxyMiddleware({
		target: ' https://api.github.com/graphql',
		changeOrigin: true,
		ws: false,
	})
)
router.use(
	'/graphql',
	graphqlHTTP({
		schema: Schema,
		graphiql: process.env.NODE_ENV === 'development',
		pretty: process.env.NODE_ENV === 'development',
	})
)

export { router }
