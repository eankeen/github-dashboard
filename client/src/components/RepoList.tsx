import React from 'react'
import { useQuery } from 'urql'
import { Grid, Box } from '@primer/components'
export default function RepoList() {
	const [res, executeQuery] = useQuery({
		query: /* GraphQL */ `
			query {
				viewer {
					name
					login
					repositories(first: 100) {
						edges {
							node {
								name
							}
						}
					}
				}
			}
		`,
	})

	if (res.fetching) {
		return <div>Loading</div>
	}

	if (res.error) {
		return <div>Errored</div>
	}

	console.log(res.data)
	const repos = res.data.viewer.repositories.edges
	return (
		<div>
			<h1>Repos</h1>
			<Grid gridTemplateColumns="repeat(2, auto)" gridGap={3}>
				<Box p={3} bg="blue.2">
					1
				</Box>
				<Box p={3} bg="yellow.2">
					2
				</Box>
			</Grid>
			{repos.map(({ node }) => {
				return <div>{node.name}</div>
			})}
		</div>
	)
}
