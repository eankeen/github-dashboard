import { Pane, Paragraph } from 'evergreen-ui'
import NavTab from '../components/NavTab'

export default function Main() {
	return (
		<Pane display="flex">
			<NavTab />
			<Pane>
				<Paragraph>dd</Paragraph>
			</Pane>
		</Pane>
	)
}
