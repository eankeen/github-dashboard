export default {
	transform: {
		'\\.(gql|graphql)$': 'jest-transform-graphql',
		'.*': 'babel-jest',
	},
}
