import { useEffect } from 'react'
import { useRouter } from 'next/router'
import LayoutRedirect from '../layouts/LayoutRedirect'
import { Text } from 'evergreen-ui'

export default function IndexPage() {
	const router = useRouter()

	useEffect(() => {
		router.push('/list')
	}, [])

	return (
		<LayoutRedirect>
			<Text>Redirecting...</Text>
		</LayoutRedirect>
	)
}
