import { Heading, Paragraph } from 'evergreen-ui'
import RepositoryTable from '../components/RepositoryTable'
import LayoutSidebar from '../layouts/LayoutSidebar'
import { dbConnect } from '../utils/dbConnect'
import { Repository } from '../models/Repository'
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetStaticPropsType,
} from 'next'

export type repository = {
	name: string
	tags: string[]
}

export default function list({
	repositories,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
	return (
		<LayoutSidebar>
			<Heading is="h1" size={800}>
				List
			</Heading>
			<Paragraph>List of all repositories involved with</Paragraph>
			<RepositoryTable repositories={repositories} />
		</LayoutSidebar>
	)
}

export async function getServerSideProps(
	context: GetServerSidePropsContext
): Promise<
	GetServerSidePropsResult<{
		repositories: repository[]
	}>
> {
	await dbConnect()

	const repos = await Repository.find().exec()
	const repositories = []

	for (const repo of repos) {
		repositories.push({
			name: String(repo.name),
			// TODO: make tags
			repos: repo.tags || [],
		})
	}

	return {
		props: {
			repositories,
		},
	}
}
