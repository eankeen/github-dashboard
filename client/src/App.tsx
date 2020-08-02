import React from 'react'
import { createClient, defaultExchanges, Provider } from 'urql'
import { devtoolsExchange } from '@urql/devtools'
import RepoList from './components/RepoList'
import './App.css'
import { Heading } from '@primer/components'

const client = createClient({
	url: '/graphql-github',
	exchanges: [devtoolsExchange, ...defaultExchanges],
})

export default function App() {
	return (
		<div className="App">
			<Heading fontSize={2}>Repositories</Heading>
			<Provider value={client}>
				<RepoList />
			</Provider>
		</div>
	)
}
