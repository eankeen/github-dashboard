import { dbConnect } from '../../../utils/dbConnect'
import { Repository } from '../../../models/Repository'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function tags(req: NextApiRequest, res: NextApiResponse) {
	await dbConnect()

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