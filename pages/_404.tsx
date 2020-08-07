import { Text } from 'evergreen-ui'
import LayoutCenter from '../layouts/LayoutCenter'

// TODO make this work
export default function Page404({ statusCode }) {
	return (
		<LayoutCenter>
			<Text as="h1" size={600}>
				404 - Page Not Found
			</Text>
		</LayoutCenter>
	)
}
