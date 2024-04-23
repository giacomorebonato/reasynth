import { useEffect, useRef } from 'react'
import * as Tone from 'tone'
import { useSnapshot } from 'valtio'
import { setPlayingBeatIndex } from './sequencer-actions'
import { sequencerState } from './sequencer-state'

export const useTone = () => {
	const sequencerSnap = useSnapshot(sequencerState)
	const repeatRef = useRef<number>()

	useEffect(() => {
		Tone.Transport.loopStart = 0
		Tone.Transport.loop = true

		if (import.meta.env.DEV) {
			Tone.Transport.debug = true
		}
	}, [])

	const synth = useRef(new Tone.PolySynth().toDestination())

	return {
		transportStart() {
			repeatRef.current = Tone.Transport.scheduleRepeat(
				() => {
					// don't access snap in here
					// it doesn't receive the updates
					const beatIndex = window.sequencerState.playingBeatIndex % window.sequencerState.totalBeats
					const beat = window.sequencerState.beats[beatIndex]

					synth.current.triggerAttackRelease(
						beat.notesToPlay as string[],
						`${sequencerSnap.beatsPerMeasure}n`,
					)

					setPlayingBeatIndex(beatIndex + 1)
				},
				`${sequencerSnap.beatsPerMeasure}n`,
				0,
			)

			Tone.Transport.start()
		},
		transportPause() {
			if (typeof repeatRef.current !== 'undefined') {
				Tone.Transport.clear(repeatRef.current)
			}

			Tone.Transport.pause()
		},
		transportStop() {
			if (typeof repeatRef.current !== 'undefined') {
				Tone.Transport.clear(repeatRef.current)
			}

			setPlayingBeatIndex(0)

			Tone.Transport.stop()
		},
	}
}
