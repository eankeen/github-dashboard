import { createProxyMiddleware } from 'http-proxy-middleware'
import { dbConnect } from '../../utils/dbConnect'
import { Repository } from '../../models/Repository'

export default async function (req, res) {
	await dbConnect()

	console.log(req.body)

	// const newRepository = new Repository({
	// 	name: req.body.repository,
	// 	tags: req.body.tags,
	// })

	// newRepository
	// 	.save()
	// 	.then((doc) => {
	// 		console.info('doc saved')
	// 		res.json({
	// 			success: 'success',
	// 		})
	// 	})
	// 	.catch((err: unknown) => {
	// 		console.error(err)
	// 		res.status(400)
	// 		res.json({
	// 			error: 'there was an error',
	// 		})
	// 	})
	// TODO: cleanup
	Repository.findOne({
		name: req.body.repository,
	})
		.exec()
		.then((doc) => {
			if (doc) {
				doc.tags = req.body.tags
				return doc.save()
			}

			// @ts-ignore
			return Repository.create({
				name: req.body.repository,
				tags: req.body.tags,
			})
		})
		.catch((err: unknown) => {
			console.error(err)
			res.status(400)
			res.json({
				error: 'there was an error',
			})
		})
}
