import path from 'path'
import express from 'express'
import helmet from 'helmet'
import { router } from './routes'

export async function appFactory() {
	const app = express()

	app.set('views', path.join(__dirname, 'views'))
	app.set('view engine', 'ejs')
	app.set('case sensitive routing', true)
	app.set('etag', 'weak')
	app.set('json spaces', 2)
	app.set('query-parser', 'extended')
	app.set('strict routing', false)
	app.set('trust proxy', 'loopback')
	app.set('trust proxy', false)
	app.set('views', path.join(__dirname, 'views'))
	app.set('x-powered-by', false)

	app.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					defaultSrc: ["'self'"],
				},
			},
			permittedCrossDomainPolicies: {
				permittedPolicies: 'master-only',
			},
			referrerPolicy: {
				policy: 'no-referrer',
			},
		})
	)
	app.use(
		express.urlencoded({
			extended: true,
			inflate: true,
			parameterLimit: 20,
			type: ['application/x-www-form-urlencoded'],
		})
	)
	app.use(
		express.json({
			inflate: true,
			reviver: null,
			strict: true,
			type: ['application/json'],
		})
	)
	app.use(
		express.static(path.join(__dirname, 'public'), {
			index: false,
			lastModified: false,
			redirect: false,
		})
	)

	app.use(router)

	return app
}
