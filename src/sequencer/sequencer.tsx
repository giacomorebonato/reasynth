import { useEffect } from 'react'
import * as Tone from 'tone'
import { Layout } from '#/browser/layout'
import { BeatCellMemo } from './beat-cell'
import SequencerForm from './sequencer-form'
import { SequencerNotes } from './sequencer-notes'
import { proxyState, useSequencerState } from './sequencer-state'

export const Sequencer = () => {
	const { actions, snap } = useSequencerState()

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
							snap.beatsPerMeasure * 2
						}, minmax(0, 1fr))`,
					}}
				>
					{snap.beats.map((beat) => {
						return (
							<BeatCellMemo
								key={`beat-${beat.index}`}
								// playingBeatIndex={snap.playingBeatIndex}
								beat={beat}
								onActivate={(beat) => {
									actions.setCurrentBeat(beat.index)
									actions.toggleBeatActivation(beat.index)
								}}
								onSelect={(beat) => {
									actions.setCurrentBeat(beat.index)
								}}
							/>
						)
					})}
				</div>

				<SequencerNotes
					currentCell={snap.focusedBeatIndex}
					selectedNotes={snap.currentCellNotes}
					onNoteClick={actions.updateNoteForCell}
				/>
			</main>
		</Layout>
	)
}

export default Sequencer
