import { Pane, Paragraph } from 'evergreen-ui'
import NavTab from '../components/NavTab'
import RepoList from '../components/RepoList'

export default function Main() {
	return (
		<Pane display="flex">
			<NavTab />
			<RepoList />
		</Pane>
	)
}
