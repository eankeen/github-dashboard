import { TagInput, Pane } from 'evergreen-ui'
import { useState } from 'react'

export function RepositoryTags() {
	const [tags, setTags] = useState(['first'])

	return (
		<TagInput
			tagSubmitKey="space"
			values={tags}
			onChange={(currentTags: string[]) => {
				console.info(currentTags)
				setTags(currentTags)
			}}
		/>
	)
}
