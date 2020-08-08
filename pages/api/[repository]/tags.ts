import { dbConnect } from '../../../utils/dbConnect'
import { Repository } from '../../../models/Repository'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function tags(req: NextApiRequest, res: NextApiResponse) {
	await dbConnect()

	Repository.findOne({
		name: String(req.query.repository),
	})
		.exec()
		.then((doc) => {
			if (doc) {
				doc.tags = req.body.tags
				return doc.save()
			}

			return new Repository({
				name: req.query.repository,
				tags: req.body.tags,
			}).save()
		})
		.catch((err: unknown) => {
			console.error(err)
			res.status(400).json({
				error: `error finding or saving repository tags`,
			})
		})
}
