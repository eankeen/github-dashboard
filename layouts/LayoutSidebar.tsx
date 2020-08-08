import {
	Tablist,
	SidebarTab,
	Text,
	Pane,
	TabNavigation,
	Tab,
} from 'evergreen-ui'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ErrorBoundary } from 'react-error-boundary'

const ErrorFallback = () => {
	return (
		<Pane>
			<Text>There was an error when rendering</Text>
		</Pane>
	)
}

export default function LayoutMain({ children }) {
	const router = useRouter()
	const [selectedIndex, setSelected] = useState(router.route)

	const items = [
		{
			el: <Text>List as Table</Text>,
			to: '/table',
		},
		{
			el: <Text>List as Cards</Text>,
			to: '/cards',
		},
		{
			el: <Text>Categories</Text>,
			to: '/categories',
		},
	]

	return (
		<Pane marginLeft={8} marginTop={8} marginRight={8}>
			<TabNavigation>
				{items.map((item) => (
					<Link key={item.to} href={item.to}>
						<Tab
							id={item.to}
							onSelect={() => setSelected(item.to)}
							isSelected={item.to === selectedIndex}
							aria-controls={`panel-${item.to}`}
						>
							<ErrorBoundary FallbackComponent={ErrorFallback}>
								{item.el}
							</ErrorBoundary>
						</Tab>
					</Link>
				))}
			</TabNavigation>
			<Pane margin={8}>{children}</Pane>
		</Pane>
	)
}
