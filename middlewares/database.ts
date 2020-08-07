import mongoose from 'mongoose'
import nextConnect from 'next-connect'

process.env.MONGO_URL = 'mongodb://127.0.0.1:27017/github-dashboard'
export default async function database(req, res, next) {
	mongoose.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})

	const db = mongoose.connection
	db.on('error', (err: unknown) => {
		console.error(err)
	})

	db.once('open', () => {
		console.info('connected to database')
	})
}
