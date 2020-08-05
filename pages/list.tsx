import { Heading, Paragraph } from 'evergreen-ui'
import RepositoryTable from '../components/RepositoryTable'
import LayoutMain from '../layouts/LayoutMain'

export default function Main() {
	return (
		<LayoutMain>
			<Heading is="h1" size={800}>
				List
			</Heading>
			<Paragraph>List of all repositories involved with</Paragraph>
			<RepositoryTable />
		</LayoutMain>
	)
}
