import { useEffect } from 'react'
import * as Tone from 'tone'
import { useSnapshot } from 'valtio'
import { Layout } from '#/browser/layout'
import { BeatCellMemo } from './beat-cell'
import * as SequencerActions from './sequencer-actions'
import SequencerForm from './sequencer-form'
import { SequencerNotes } from './sequencer-notes'
import { sequencerState } from './sequencer-state'

export const Sequencer = () => {
	const sequencerSnap = useSnapshot(sequencerState)

	useEffect(() => {
		const playPause = (event: KeyboardEvent) => {
			if (Tone.Transport.state === 'stopped') {
				Tone.Transport.start()
			} else {
				Tone.Transport.stop()
			}
		}
		document.addEventListener('keyup', playPause)

		return () => {
			document.removeEventListener('keyup', playPause)
		}
	}, [])

	return (
		<Layout sidebar={<SequencerForm />}>
			<main className='p-4 text-lg w-full grid grid-flow-row gap-2'>
				<div
					className={'border p-2 grid rounded'}
					style={{
						gridTemplateColumns: `repeat(${
							sequencerSnap.beatsPerMeasure * 2
						}, minmax(0, 1fr))`,
					}}
				>
					{sequencerSnap.beats.map((beat) => {
						return (
							<BeatCellMemo
								key={`beat-${beat.index}`}
								playingBeatIndex={sequencerSnap.playingBeatIndex}
								beat={beat}
								onActivate={(beat) => {
									SequencerActions.setCurrentBeat(beat.index)
									SequencerActions.toggleBeatActivation(beat.index)
								}}
								onSelect={(beat) => {
									SequencerActions.setCurrentBeat(beat.index)
								}}
							/>
						)
					})}
				</div>

				<SequencerNotes
					currentCell={sequencerSnap.focusedBeatIndex}
					selectedNotes={sequencerSnap.currentCellNotes}
					onNoteClick={SequencerActions.updateNoteForCell}
				/>
			</main>
		</Layout>
	)
}

export default Sequencer
