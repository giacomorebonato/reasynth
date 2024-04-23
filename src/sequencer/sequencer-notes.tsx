import clsx from 'clsx'
import { useMemo } from 'react'
import { Note } from 'tonal'

const notePitches = [3, 4, 5, 6]

export const SequencerNotes = (props: {
	currentCell: number
	selectedNotes: readonly string[]
	onNoteClick: (cell: number, fullNote: string) => void
}) => {
	const noteNames = useMemo(() => {
		return Note.names()
	}, [])

	return (
		<>
			{notePitches.map((pitch) => {
				return (
					<div className='flex' key={`pitch-${pitch}`}>
						{noteNames.map((noteName) => {
							const fullNote = `${noteName}${pitch}`
							return (
								<div
									key={fullNote}
									className={clsx('flex-1 text-center text-white', {
										'bg-violet-400': props.selectedNotes.includes(fullNote),
									})}
									role='button'
									onClick={() => {
										props.onNoteClick(props.currentCell, fullNote)
									}}
									onKeyUp={() => {
										props.onNoteClick(props.currentCell, fullNote)
									}}
								>
									{noteName}
									{pitch}
								</div>
							)
						})}
					</div>
				)
			})}
		</>
	)
}
