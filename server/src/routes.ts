import { promises } from 'fs'
import express, { Router } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { graphqlHTTP } from 'express-graphql'
import { Schema } from './schema'
import { join } from 'path'

async function getCache(): Promise<Record<string, string>> {
	const cacheFile = join(__dirname, 'graphqlcache')
	const cache = await promises.readFile(cacheFile, 'utf8')
	const cacheJson = JSON.parse(cache)
	return cacheJson
}

async function getCacheValue(queryBody: string): Promise<string | undefined> {
	const cache = await getCache()
	if (queryBody in cache) {
		return cache.queryBody
	}
}

const router = Router()

router.use(
	'/graphql-github',
	async (req, res, next) => {
		req.originalUrl = '/graphql'
		req.headers['authorization'] = `bearer ${process.env.GITHUB_TOKEN}`
		// req.headers['access-control-allow-origin'] = '*'

		// res.setHeader('access-control-allow-origin', '*')
		next()
		// const queryBody = String.prototype.replace.call(
		// 	req.body.query,
		// 	/( |\n)/giu,
		// 	''
		// )
		// console.info(queryBody)
		// const cacheValue = getCacheValue(queryBody)

		// if (cacheValue !== undefined && cacheValue !== null) {
		// 	res.json(cacheValue)
		// 	next()
		// } else {
		// 	next()
		// }
	},
	createProxyMiddleware({
		target: 'https://api.github.com',
		logLevel: 'debug',
		changeOrigin: true,
		secure: false,
		ws: true,
	}),
	express.json({
		inflate: true,
		reviver: null,
		strict: true,
		type: ['application/json'],
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
