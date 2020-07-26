import {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql'

export const graphqlSchema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			hello: {
				type: GraphQLString,
				resolve() {
					return 'world'
				},
			},
		},
	}),
})
