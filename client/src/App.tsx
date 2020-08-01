import React, { useEffect, useState } from 'react'
import { createClient, defaultExchanges, Provider } from 'urql'
import { devtoolsExchange } from '@urql/devtools'

import logo from './logo.svg'
import './App.css'
import RepoList from './components/RepoList'

const client = createClient({
	url: '/graphql-github',
	exchanges: [devtoolsExchange, ...defaultExchanges],
})

export default function App() {
	const [json, setJson] = useState(null)

	// useEffect(() => {
	// 	fetch('/graphql-github', {
	// 		method: 'POST',
	// 		body: `{ "query": "{ viewer { name, login, repositories(first: 100) { edges { node { name }} } } }" }`,
	// 	})
	// 		.then((res: Response) => {
	// 			return res.json()
	// 		})
	// 		.then((json: Record<string, any>) => {
	// 			console.log('json', json)
	// 			setJson(json)
	// 		})
	// 		.catch((err: unknown) => {
	// 			console.error(err)
	// 		})
	// }, [])
	return (
		<div className="App">
			<Provider value={client}>
				<RepoList />
				{/* {json ? (
					<div>
						<h1>Json</h1>
						<h2>{json.data.viewer.repositories.edges.length}</h2>
						{json.data.viewer.repositories.edges.map((node) => {
						return (
							<div key={node.name}>
								<h2>{node.node.name}</h2>
								<p></p>
							</div>
						)
					})}
					</div>
				) : (
					<p>loading...</p>
				)} */}
			</Provider>
		</div>
	)
}
