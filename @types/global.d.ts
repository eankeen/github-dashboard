// import 'evergreen-ui'
// import { ReactPropTypes } from 'react'

declare module 'remark-html' {
	const html: any
	export default html
}

declare module 'evergreen-ui' {
	export function withTheme<P extends {}>(
		component: (arg0?: any) => {}
	): JSX.Element {}
}

// declare module 'evergreen-ui' {
// 	export function withTheme<P extends {}>(
// 		component: (string) => {}
// 	): { (props: P): JSX.Element; displayName: string } {}
// }

// declare module 'evergreen-ui' {
// 	export function withTheme<P extends {}>(
// 		component: {
// 			(
// 				props: P & {
// 					theme: {
// 						avatarColors: string
// 					}
// 				}
// 			): Exclude<React.ReactNode, undefined>
// 		},
// 		propsAreEqual?: PropsAreEqual<P> | false,
// 		componentName = component.displayName ?? component.name
// 	): { (props: P): JSX.Element; displayName: string } {}
// }
