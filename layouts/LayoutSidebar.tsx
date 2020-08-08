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
		<Pane>
			<TabNavigation margin={8}>
				{items.map((item, index) => (
					<Link key={item.to} href={item.to}>
						<Tab
							id={item.to}
							onSelect={() => setSelected(item.to)}
							isSelected={item.to === selectedIndex}
							aria-controls={`panel-${item.to}`}
						>
							{item.el}
						</Tab>
					</Link>
				))}
			</TabNavigation>
			<Pane margin={8} width="100%">
				{children}
			</Pane>
		</Pane>
	)
}
