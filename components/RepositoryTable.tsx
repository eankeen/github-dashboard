import { defaultExchanges, useQuery } from 'urql'
import { withUrqlClient } from 'next-urql'
import { devtoolsExchange } from '@urql/devtools'
import { Table, Pane } from 'evergreen-ui'
import { RepositoryRow } from './RepositoryRow'
import { RepositoryTags } from './RepositoryTags'
import type { repository } from '../pages/table'

interface repositoryTableProps {
	repositories: repository[]
}

function RepositoryTable({ repositories }: repositoryTableProps) {
	const [res] = useQuery({
		query: /* GraphQL */ `
			{
				viewer {
					avatarUrl
					bio
					bioHTML
					createdAt
					followers {
						totalCount
					}
					location
					login
					repositories(
						first: 100
						affiliations: [OWNER, COLLABORATOR]
						ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]
					) {
						totalCount
						nodes {
							# commitComments(first: 10) {
							# 	totalCount
							# 	nodes {
							# 		author {
							# 			login
							# 			url
							# 		}
							# 		authorAssociation
							# 		body
							# 		bodyText
							# 		createdAt
							# 		url
							# 	}
							# }
							# createdAt
							# description
							# descriptionHTML
							# diskUsage
							# forkCount
							# hasIssuesEnabled
							# hasProjectsEnabled
							# hasWikiEnabled
							# homepageUrl
							# isArchived
							# isDisabled
							# isEmpty
							# isFork
							# isLocked
							# isMirror
							# isPrivate
							# isTemplate
							# labels(first: 100) {
							# 	nodes {
							# 		name
							# 	}
							# }
							# languages(first: 100) {
							# 	totalCount
							# 	nodes {
							# 		color
							# 		name
							# 	}
							# }
							# licenseInfo {
							# 	key
							# 	name
							# 	nickname
							# 	spdxId
							# 	url
							# }
							# mirrorUrl
							name
							nameWithOwner
							owner {
								login
								url
							}
							# parent {
							# 	name
							# 	url
							# }
							# primaryLanguage {
							# 	color
							# 	name
							# }
							# sshUrl
							# stargazers(first: 100) {
							# 	nodes {
							# 		login
							# 		url
							# 	}
							# }
							# submodules(first: 100) {
							# 	nodes {
							# 		gitUrl
							# 		name
							# 		path
							# 	}
							# }
							url
							# viewerHasStarred
							# watchers {
							# 	totalCount
							# }
						}
					}
					repositoriesContributedTo(
						first: 100
						contributionTypes: [COMMIT]
					) {
						totalCount
						nodes {
							name
							nameWithOwner
							owner {
								url
								login
							}
							url
						}
					}
					twitterUsername
					url
					websiteUrl
				}
			}
		`,
	})

	if (res.fetching) {
		return <div>Loading</div>
	}
	if (res.error) {
		console.log(res.error.name, res.error)

		return <div>Error</div>
	}

	const reposs = res.data.viewer.repositories.nodes
	const repos2 = res.data.viewer.repositoriesContributedTo.nodes
	// console.info(res.data.viewer.repositories.nodes)
	// console.info(res.data.viewer.repositoriesContributedTo.nodes)

	const combined = Array.from([...reposs, ...repos2])

	return (
		<Pane>
			<h2>{combined.length}</h2>
			<Table width="100%">
				<Table.Head>
					<Table.SearchHeaderCell />
				</Table.Head>
				<Table.Head>
					<Table.TextHeaderCell>Name</Table.TextHeaderCell>
					<Table.TextHeaderCell>Owner</Table.TextHeaderCell>
					<Table.TextHeaderCell>Tags</Table.TextHeaderCell>
				</Table.Head>
				<Table.Body>
					{combined.map((node) => {
						let actualRepo = null
						for (const repo of repositories) {
							if (repo.name === node.name) {
								actualRepo = repo
								break
							}
						}
						return <RepositoryRow node={node} repo={actualRepo} />
					})}
				</Table.Body>
			</Table>
		</Pane>
	)
}

export default withUrqlClient((_ssrExchange, ctx) => ({
	url: 'http://localhost:3005/api/graphql-github',
	exchanges: [devtoolsExchange, ...defaultExchanges],
}))(RepositoryTable)
