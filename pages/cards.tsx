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

export default function cards({
	repositories,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
	return (
		<LayoutSidebar>
			<Heading is="h1" size={800}>
				Cards
			</Heading>
			{repositories.map((repository) => {
				return (
					<Card>
						<Heading>{repository.name} </Heading>
						<TagInput values={repository.tags} />
					</Card>
				)
			})}
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
