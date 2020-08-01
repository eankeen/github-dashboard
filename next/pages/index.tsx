import '../styles/Home.module.css'
import { defaultExchanges, useQuery } from 'urql'
import { withUrqlClient } from 'next-urql'
import { devtoolsExchange } from '@urql/devtools'
import { Grid, Box } from '@primer/components'

function Home() {
	const [res] = useQuery({
		query: /* GraphQL */ `
			{
				viewer {
					# avatarURL
					bio
					bioHTML
					createdAt
					followers {
						totalCount
					}
					login
					repositories(first: 100) {
						totalCount
						nodes {
							commitComments(first: 10) {
								totalCount
								nodes {
									author {
										login
										url
									}
									authorAssociation
									body
									bodyText
									createdAt
									url
								}
							}
							createdAt
							description
							descriptionHTML
							diskUsage
							forkCount
							hasIssuesEnabled
							hasProjectsEnabled
							hasWikiEnabled
							homepageUrl
							isArchived
							isDisabled
							isEmpty
							isFork
							isLocked
							isMirror
							isPrivate
							isTemplate
							labels(first: 100) {
								nodes {
									name
								}
							}
							languages(first: 100) {
								totalCount
								nodes {
									color
									name
								}
							}
							licenseInfo {
								key
								name
								nickname
								spdxId
								url
							}
							mirrorUrl
							name
							nameWithOwner
							owner {
								login
								url
							}
							parent {
								name
								url
							}
							primaryLanguage {
								color
								name
							}
							sshUrl
							stargazers(first: 100) {
								nodes {
									login
									url
								}
							}
							submodules(first: 100) {
								nodes {
									gitUrl
									name
									path
								}
							}
							url
							viewerHasStarred
							watchers {
								totalCount
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
		console.log(res.error.name, res.error.message)
		return <div>Error</div>
	}

	const repos = res.data.viewer.repositories.nodes
	return (
		<div>
			<Grid gridTemplateRows="1fr" gridGap={3}>
				{repos.map((node) => {
					console.log(node)
					return (
						<Box key={node.name} p={3} bg="blue.2">
							{node.name}
						</Box>
					)
				})}
			</Grid>
		</div>
	)
}

export default withUrqlClient((_ssrExchange, ctx) => ({
	url: 'http://localhost:3000/graphql-github',
	exchanges: [devtoolsExchange, ...defaultExchanges],
}))(Home)
