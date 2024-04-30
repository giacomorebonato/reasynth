import * as Tone from 'tone'
import { proxy, subscribe, useSnapshot } from 'valtio'
import { devtools } from 'valtio/utils'
import type { Beat } from '#/types/beat'
import { makeActions } from './sequencer-actions'

const START_MEASURE_TOTAL = 4
const START_BEATS_PER_MEASURE = 4


export type TransportStatus = Parameters<typeof Tone.Transport.on>[0]

const rawState = {
	transportLastEvent: 'stop' as TransportStatus,
	bpm: 120,
	focusedBeatIndex: 0,
	playingBeatIndex: 0,
	activeBeats: [] as number[],
	beatToNotes: [] as string[][],
	measureTotal: START_MEASURE_TOTAL,
	beatsPerMeasure: START_BEATS_PER_MEASURE,

	get currentCellNotes() {
		return this.beatToNotes[this.focusedBeatIndex] ?? []
	},
	get beatDuration() {
		return 60 / this.bpm
	},
	get totalTime() {
		return this.beatDuration * this.totalBeats
	},
	get totalBeats() {
		return this.measureTotal * this.beatsPerMeasure
	},
	get beats() {
		const beatsArray: Beat[] = []

		for (let index = 0; index < this.totalBeats; index++) {
			const notes = this.beatToNotes[index]
			const notesToPlay = notes ? [...notes] : []

			beatsArray.push({
				index,
				notesToPlay,
				active: this.activeBeats.includes(index),
				selected: this.focusedBeatIndex === index,
				time: index * this.beatDuration,
			})
		}

		return beatsArray
	}
}

declare global {
	interface Window {
		sequencerState: typeof rawState
	}
}

export const proxyState = proxy(rawState)

const actions = makeActions(proxyState)

window.sequencerState = proxyState

subscribe(proxyState, () => {
	localStorage.setItem('sequencer-state', JSON.stringify(proxyState))

	Tone.Transport.loopEnd = proxyState.totalTime
	window.sequencerState = proxyState
})

devtools(proxyState)

export const useSequencerState = () => {
	const snap = useSnapshot(proxyState)

	return { snap, actions }
}