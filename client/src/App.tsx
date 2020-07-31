import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
	const [count, setCount] = useState(0)

	useEffect(() => {
		fetch('/graphql-github', {
			method: 'POST',
			body: `{ "query": "{ hello }" }`,
		})
			.then((res: Response) => {
				return res.json()
			})
			.then((json: Record<string, any>) => {
				console.log('json', json)
			})
			.catch((err: unknown) => {
				console.error(err)
			})
	})
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Hello Vite + React!</p>
				<p>
					<button onClick={() => setCount((count) => count + 1)}>
						count is: {count}
					</button>
				</p>
				<p>
					Edit <code>App.jsx</code> and save to test HMR updates.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	)
}

export default App
