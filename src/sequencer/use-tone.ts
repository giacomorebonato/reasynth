import { useEffect, useRef } from 'react'
import * as Tone from 'tone'
import { useSnapshot } from 'valtio'
import { useClientState } from '#/client-state/use-client-state'
import { proxyState } from './sequencer-state'

const className = 'border-yellow-400'

export const useTone = () => {
	const { actions } = useClientState()
	const sequencerSnap = useSnapshot(proxyState)
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
		synth: synth.current,
		transportStart() {
			repeatRef.current = Tone.Transport.scheduleRepeat(
				() => {
					// don't access snap in here
					// it doesn't receive the updates
					const beatIndex =
						window.sequencerState.playingBeatIndex %
						window.sequencerState.totalBeats

					const previousBeatCelll = document.querySelector(`.${className}`)

					if (previousBeatCelll) {
						previousBeatCelll.classList.remove(className)
					}

					const beatCell = document.querySelector(
						`[data-index="beat-${beatIndex}"]`,
					)

					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					beatCell!.classList.add(className)
					const beat = window.sequencerState.beats[beatIndex]

					if (beat.active) {
						synth.current.triggerAttackRelease(
							beat.notesToPlay as string[],
							`${sequencerSnap.beatsPerMeasure}n`,
						)
					}

					actions.setPlayingBeatIndex(beatIndex + 1)
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

			actions.setPlayingBeatIndex(0)

			Tone.Transport.stop()
		},
	}
}
