import { useEffect } from 'react'
import { useRouter } from 'next/router'
import LayoutCenter from '../layouts/LayoutCenter'
import { Heading } from 'evergreen-ui'

export default function IndexPage() {
	const router = useRouter()

	useEffect(() => {
		router.push('/table')
	}, [])

	return (
		<LayoutCenter>
			<Heading size={400}>Redirecting...</Heading>
		</LayoutCenter>
	)
}
