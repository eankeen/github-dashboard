import { Pane } from 'evergreen-ui'

interface LayoutChildrenProps {
	children: React.ReactNode
}
export default function LayoutRedirect({ children }: LayoutChildrenProps) {
	return (
		<Pane
			height="100vh"
			width="100%"
			display="flex"
			alignItems="center"
			justifyContent="center"
			overflow="hidden"
		>
			{children}
		</Pane>
	)
}
