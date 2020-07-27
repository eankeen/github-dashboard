// @ts-check
const reactPlugin = require('vite-plugin-react')

/**
 * @type { import('vite').UserConfig }
 */
const config = {
	jsx: 'react',
	plugins: [reactPlugin],
	proxy: {
		'/graphql': {
			target: 'http://127.0.0.1:3000/graphql',
			changeOrigin: true,
		},
		'/graphql-github': {
			target: 'http://127.0.0.1:3000/graphql-github',
			changeOrigin: true,
		},
	},
}

module.exports = config
