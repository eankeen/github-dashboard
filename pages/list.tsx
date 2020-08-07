import { Heading, Paragraph } from 'evergreen-ui'
import RepositoryTable from '../components/RepositoryTable'
import LayoutMain from '../layouts/LayoutMain'
import { dbConnect } from '../utils/dbConnect'
import { Repository } from '../models/Repository'
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetStaticPropsType,
} from 'next'

export type repo = {
	_id: string
	__v: number
	name: string
	tags: string[]
}

export default function List({
	repos,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
	return (
		<LayoutMain>
			<Heading is="h1" size={800}>
				List
			</Heading>
			<Paragraph>List of all repositories involved with</Paragraph>
			<RepositoryTable repos={repos} />
		</LayoutMain>
	)
}

interface gssProps {
	repos: repo[]
}

export async function getServerSideProps(
	context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<gssProps>> {
	await dbConnect()

	const props: Record<string, any> = {}

	const repos = await Repository.find().exec()

	const r = []
	for (const repo of repos) {
		r.push({
			name: repo.name || 'missing',
			repos: repo.tags || [],
		})
	}

	return {
		props: {
			repos: r,
		},
	}
}
