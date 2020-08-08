import { defaultExchanges, useQuery } from 'urql'
import { withUrqlClient } from 'next-urql'
import { devtoolsExchange } from '@urql/devtools'
import { Table, Pane, Spinner } from 'evergreen-ui'
import { RepositoryRow } from './RepositoryRow'
import RepositoryTags from './RepositoryTags'
import type { repository } from '../pages/table'
import { repositoriesQuery } from '../graphql/repositories.graphql'

interface repositoryTableProps {
	repositories: repository[]
}

function RepositoryTable({ repositories }: repositoryTableProps) {
	const [res] = useQuery({
		query: repositoriesQuery,
	})

	if (res.fetching) {
		return (
			<Pane display="flex" justifyContent="center">
				<Spinner />
			</Pane>
		)
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
		<Pane elevation={1}>
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
