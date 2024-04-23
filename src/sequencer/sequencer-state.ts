import * as Tone from 'tone'
import { proxy, subscribe } from 'valtio'
import { devtools } from 'valtio/utils'

const START_MEASURE_TOTAL = 4
const START_BEATS_PER_MEASURE = 4

export type Beat = {
	index: number
	notesToPlay: readonly string[]
	time: number
	selected: boolean
	active: boolean
}
export type TransportStatus = Parameters<typeof Tone.Transport.on>[0]

const state = {
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
	},
	get toPlay() {
		return this.beats
			.filter((beat) => {
				return beat.notesToPlay.length > 0
			})
			.map((beat) => {
				return [{ time: beat.time, note: Array.from(beat.notesToPlay) }]
			})
	},
}

declare global {
	interface Window {
		sequencerState: typeof state
	}
}

export const sequencerState = proxy(state)

window.sequencerState = state

subscribe(sequencerState, () => {
	localStorage.setItem('sequencer-state', JSON.stringify(sequencerState))

	Tone.Transport.loopEnd = sequencerState.totalTime
	window.sequencerState = sequencerState
})

devtools(sequencerState)
