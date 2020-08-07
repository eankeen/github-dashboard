import mongoose from 'mongoose'

interface IRepository extends mongoose.Document {
	name: string
	tags: string[]
}

const repositorySchema = new mongoose.Schema({
	name: {
		type: String,
		// required: true,
		// index: true,
		unique: true,
		trim: true,
	},
	tags: {
		type: [String],
		trim: true,
	},
})

export const Repository =
	mongoose.models?.Repository ||
	mongoose.model<IRepository>('Repository', repositorySchema)
