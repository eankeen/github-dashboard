import { AppProps } from 'next/app'
import '../styles/globals.css'
import { defaultTheme, ThemeProvider, ThemeContext } from 'evergreen-ui'

const newTheme = {
	...defaultTheme,
}

export default function RootApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider value={newTheme}>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}
