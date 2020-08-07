import { Card, withTheme, Strong, Text } from 'evergreen-ui'
import { theme } from '../@types/theme'

interface StatisticsProps {
	theme: theme
}
function Statistics({ theme }) {
	return (
		<Card display="flex" alignItems="center">
			<Strong margin={12}>Repositories</Strong>
			<Text>3</Text>
		</Card>
	)
}

export default withTheme<StatisticsProps>(Statistics)
