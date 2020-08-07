import { TagInput, Pane } from 'evergreen-ui'
import { useState } from 'react'

interface repositoryTagsProps {
	repository: string
	tags: string[]
}

export function RepositoryTags({
	repository,
	tags: tagss,
}: repositoryTagsProps) {
	const [tags, setTags] = useState(tagss)
	console.info('bb', tagss)

	return (
		<TagInput
			tagSubmitKey="space"
			values={tags}
			onChange={(newTags: string[]) => {
				console.info('saving', newTags)
				fetch('/api/repo', {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify({
						repository,
						tags: newTags,
					}),
				})
					.then((res) => {
						console.info('response client')
					})
					.catch((err: unknown) => {
						console.error(err)
					})
				setTags(newTags)
			}}
		/>
	)
}
