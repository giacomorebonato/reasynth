import { clsx } from 'clsx'
import { memo } from 'react'
import type { Beat } from './sequencer-state'

type BeatProps = {
	beat: Beat
	playingBeatIndex: number | null
	onActivate: (beat: Beat) => void
	onSelect: (beat: Beat) => void
}

export function BeatCell(props: BeatProps) {
	return (
		<div
			className={clsx(
				'text-center min-h-8 border-2 border-gray-800 rounded-sm flex flex-col',
				{ 'border-yellow-400': props.beat.index === props.playingBeatIndex },
			)}
			data-index={`beat-${props.beat.index}`}
		>
			<button
				className={clsx('flex-1 text-sm text-white hover:bg-red-300 p-2', {
					'bg-red-400': props.beat.active,
				})}
				type='button'
				onClick={() => {
					props.onActivate(props.beat)
				}}
			>
				Activate
			</button>
			<button
				className={clsx(
					'flex-1 bg-blue-400 text-white hover:bg-blue-700 text-sm overflow-x-scroll whitespace-nowrap p-2',
					{
						'bg-green-600': props.beat.selected,
					},
				)}
				type='button'
				onClick={() => {
					props.onSelect(props.beat)
				}}
			>
				{props.beat.notesToPlay.length
					? [...props.beat.notesToPlay].join(', ')
					: 'Select'}
			</button>
		</div>
	)
}

export const BeatCellMemo = memo(BeatCell)
