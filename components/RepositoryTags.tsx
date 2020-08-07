import { TagInput, Pane } from 'evergreen-ui'
import { useState } from 'react'

interface repositoryTagsProps {
	repository: string
	tags: string[]
}

export default function RepositoryTags({
	repository,
	tags: tagsProp,
}: repositoryTagsProps) {
	let [tags, setTags] = useState(tagsProp)

	return (
		<TagInput
			tagSubmitKey="space"
			values={tags}
			onChange={(newTags: string[]) => {
				const repositoryName = repository
				fetch(`/api/${repositoryName}/tags`, {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify({
						repository,
						tags: newTags,
					}),
				}).catch((err: unknown) => {
					console.error(err)
				})
				setTags(newTags)
			}}
		/>
	)
}
