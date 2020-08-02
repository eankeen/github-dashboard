import { Tablist, SidebarTab, Text } from 'evergreen-ui'
import { useState } from 'react'
import Link from 'next/link'

export default function NavTab() {
	const [selectedIndex, setSelected] = useState(1)

	const items = [
		{
			el: <Text>Main</Text>,
			to: '/main',
		},
		{
			el: <Text>Code</Text>,
			to: '/code',
		},
	]
	return (
		<Tablist marginBottom={16} flexBasis={120} marginRight={12}>
			{items.map((item, index) => (
				<Link key={item.to} href={item.to}>
					<SidebarTab
						id={item.to}
						onSelect={() => setSelected(index)}
						isSelected={index === selectedIndex}
						aria-controls={`panel-${item.to}`}
					>
						{item.el}
					</SidebarTab>
				</Link>
			))}
		</Tablist>
	)
}
