import type { TransportStatus, proxyState } from './sequencer-state'

export const makeActions = (state: typeof proxyState) => {
	return {
		updateSequencer(updates: Partial<typeof proxyState>) {
			Object.assign(state, updates)
		},

		setCurrentBeat(beatIndex: number) {
			state.focusedBeatIndex = beatIndex
		},
		toggleBeatActivation(beatIndex: number) {
			if (state.activeBeats.includes(beatIndex)) {
				state.activeBeats.splice(beatIndex, 1)
			} else {
				state.activeBeats.push(beatIndex)
			}
		},
		updateNoteForCell(beatIndex: number, note: string) {
			if (!state.beatToNotes[beatIndex]) {
				state.beatToNotes[beatIndex] = [note]
				return
			}

			const cellNotes = state.beatToNotes[beatIndex]

			if (cellNotes.includes(note)) {
				cellNotes.splice(cellNotes.indexOf(note), 1)
			} else {
				cellNotes.push(note)
			}
		},
		setPlayingBeatIndex(beatIndex: number) {
			state.playingBeatIndex = beatIndex % state.totalBeats
		},
		updateTotalBeats(measureTotal: number, beatsPerMeasure: number) {
			state.measureTotal = measureTotal
			state.beatsPerMeasure = beatsPerMeasure
		},

		setTransportLastEvent(status: TransportStatus) {
			state.transportLastEvent = status
		},

		setBpm(bpm: number) {
			state.bpm = bpm
		},
	}
}
