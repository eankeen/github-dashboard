import { defaultExchanges, useQuery } from 'urql'
import { withUrqlClient } from 'next-urql'
import { devtoolsExchange } from '@urql/devtools'
import { Table, Heading, TagInput, Pane, Card } from 'evergreen-ui'
import type { repository } from '../pages/table'
import { repositoriesQuery } from '../graphql/repositories'
import RepositoryTags from './RepositoryTags'

interface RepositoryCardsProps {
	repositories: repository[]
}
function RepositoryCards({ repositories }: RepositoryCardsProps) {
	const [res] = useQuery({
		query: repositoriesQuery,
	})
	console.info(res)

	if (res.fetching) {
		return <div>Fetching</div>
	}

	if (res.error) {
		console.error(res.error.name, res.error)
		return <div>error</div>
	}

	const Qrepositories = res.data.viewer.repositories.nodes
	const QrepositoriesContributedTo =
		res.data.viewer.repositoriesContributedTo.nodes
	const allRepos = Array.from([
		...Qrepositories,
		...QrepositoriesContributedTo,
	])

	return (
		<Card>
			{allRepos.map((repository) => {
				let actualRepo = null
				for (const repo of repositories) {
					if (repo.name === repository.name) {
						actualRepo = repo
						break
					}
				}

				return (
					<Card key={repository.name}>
						<Heading>{repository.name} </Heading>
						<RepositoryTags
							repository={repository.name}
							tags={actualRepo?.tags}
						/>
					</Card>
				)
			})}
		</Card>
	)
}

export default withUrqlClient((_ssrExchange, ctx) => ({
	url: 'http://localhost:3005/api/graphql-github',
	exchanges: [devtoolsExchange, ...defaultExchanges],
}))(RepositoryCards)
