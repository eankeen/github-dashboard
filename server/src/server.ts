import { appFactory } from './app'

const port = process.env.PORT || 3000

appFactory()
	.then((app) => {
		app.listen(port, () => {
			console.info(`on port ${port}`)
		})
	})
	.catch((err: unknown) => {
		console.error(err)
	})
