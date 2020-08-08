import { defaultExchanges, useQuery } from 'urql'
import { withUrqlClient } from 'next-urql'
import { devtoolsExchange } from '@urql/devtools'
import { Heading, Pane, Card, useTheme, Theme, Spinner } from 'evergreen-ui'
import type { repository } from '../pages/table'
import { repositoriesQuery } from '../graphql/repositories.graphql'
import RepositoryTags from './RepositoryTags'

interface RepositoryCardsProps {
	repositories: repository[]
}
function RepositoryCards({ repositories }: RepositoryCardsProps) {
	const [res] = useQuery({
		query: repositoriesQuery,
	})
	const theme: Theme = useTheme()

	if (res.fetching) {
		return (
			<Pane display="flex" justifyContent="center">
				<Spinner />
			</Pane>
		)
	}

	if (res.error) {
		console.error(res.error.name, res.error)
		return <div>error</div>
	}

	const Qrepositories = res.data.viewer.repositories.nodes

	return (
		<Pane display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gridGap="12px">
			{Qrepositories.map((repository) => {
				let actualRepo = null
				for (const repo of repositories) {
					if (repo.name === repository.name) {
						actualRepo = repo
						break
					}
				}

				return (
					<Card key={repository.name} padding={4} elevation={1}>
						<Heading>{repository.name}</Heading>
						<RepositoryTags
							repository={repository.name}
							tags={actualRepo?.tags}
						/>
					</Card>
				)
			})}
		</Pane>
	)
}

export default withUrqlClient((_ssrExchange, ctx) => ({
	url: 'http://localhost:3005/api/graphql-github',
	exchanges: [devtoolsExchange, ...defaultExchanges],
}))(RepositoryCards)
