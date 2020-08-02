import '../styles/Home.module.css'
import { Pane, Tablist, Paragraph, SidebarTab, Heading } from 'evergreen-ui'
import RepoList from '../components/RepoList'
import Link from 'next/link'
import NavTab from '../components/NavTab'
import { useState } from 'react'

export default function Home() {
	const [selectedIndex, setSelected] = useState(1)

	return (
		<div>
			<Pane display="flex">
				<NavTab />
				<Heading>Heading</Heading>
			</Pane>
		</div>
	)
}
