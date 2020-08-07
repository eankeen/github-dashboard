import LayoutSidebar from '../layouts/LayoutSidebar'
import { Card, Heading, TagIcon, TagInput } from 'evergreen-ui'
import { repository } from './table'
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetStaticPropsType,
} from 'next'
import { dbConnect } from '../utils/dbConnect'
import { Repository } from '../models/Repository'
// import repositoriesQuery from '../graphql/repositories.graphql'
import { repositoriesQuery } from '../graphql/repositories'
import RepositoryCards from '../components/RepositoryCards'

export default function cards({
	repositories,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
	return (
		<LayoutSidebar>
			<Heading is="h1" size={800}>
				Cards
			</Heading>
			<RepositoryCards repositories={repositories} />
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
			tags: repo.tags || [],
		})
	}

	return {
		props: {
			repositories,
		},
	}
}
