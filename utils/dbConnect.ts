import mongoose from 'mongoose'

const connection: {
	isConnected: boolean
} = {
	isConnected: undefined,
}

async function dbConnect() {
	if (connection.isConnected) {
		return
	}

	const db = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})

	connection.isConnected = Boolean(db.connections[0].readyState)
}

export { dbConnect }
