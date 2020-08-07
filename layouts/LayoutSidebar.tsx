import { Tablist, SidebarTab, Text, Pane } from 'evergreen-ui'
import { useState } from 'react'
import Link from 'next/link'

export default function LayoutMain({ children }) {
	const [selectedIndex, setSelected] = useState(1)

	const items = [
		{
			el: <Text>Home</Text>,
			to: '/',
		},
		{
			el: <Text>Table</Text>,
			to: '/table',
		},
		{
			el: <Text>Cards</Text>,
			to: '/cards',
		},
		{
			el: <Text>Categories</Text>,
			to: '/categories',
		},
	]
	return (
		<Pane display="flex">
			<Tablist margin={8}>
				{items.map((item, index) => (
					<Link key={item.to} href={item.to}>
						<SidebarTab
							id={item.to}
							onSelect={() => setSelected(index)}
							isSelected={index === selectedIndex}
							aria-controls={`panel-${item.to}`}
						>
							<Pane margin={8}>{item.el}</Pane>
						</SidebarTab>
					</Link>
				))}
			</Tablist>
			<Pane margin={8} width="100%">
				{children}
			</Pane>
		</Pane>
	)
}
