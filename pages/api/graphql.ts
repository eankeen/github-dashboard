import { NextApiRequest, NextApiResponse } from 'next'
import {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
} from 'graphql'

const repositorySchema = new GraphQLObjectType({
	name: 'RepositorySchema',
	fields: {
		name: {
			type: new GraphQLNonNull(GraphQLString),
		},
		tags: {
			type: new GraphQLNonNull(
				new GraphQLList(new GraphQLNonNull(GraphQLString))
			),
		},
	},
})

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			repository: {
				type: new GraphQLList(repositorySchema),
				resolve(parent, args) {
					console.info('args', args)
					return [
						{
							name: 'foo',
							tags: ['foo'],
						},
					]
				},
			},
		},
	}),
})

export default (req: NextApiRequest, res: NextApiResponse) => {
	const query = JSON.parse(req.body).query

	graphql(schema, query)
		.then((result) => {
			res.json(result)
		})
		.catch((err) => {
			res.json({
				error: err,
			})
		})
}
