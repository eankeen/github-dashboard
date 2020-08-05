import { Table, Link, TagInput } from 'evergreen-ui'
import { RepositoryTags } from './RepositoryTags'

interface repositoryRowProps {
	node: {
		id: string
		url: string
		name: string
		owner: {
			url: string
			login: string
		}
	}
}

export function RepositoryRow({ node }: repositoryRowProps) {
	return (
		<Table.Row key={node.id} isSelectable onSelect={() => {}}>
			<Table.TextCell>
				<Link href={node.url} target="__blank">
					{node.name}
				</Link>
			</Table.TextCell>
			<Table.TextCell>
				<Link href={node.owner.url} target="__blank">
					{node.owner.login}
				</Link>
			</Table.TextCell>
			<Table.Cell>
				<RepositoryTags />
			</Table.Cell>
		</Table.Row>
	)
}
