import { type TransportStatus, sequencerState } from './sequencer-state'

export const updateSequencer = (updates: Partial<typeof sequencerState>) => {
	Object.assign(sequencerState, updates)
}

export const setCurrentBeat = (beatIndex: number) => {
	sequencerState.focusedBeatIndex = beatIndex
}

export const toggleBeatActivation = (beatIndex: number) => {
	if (sequencerState.activeBeats.includes(beatIndex)) {
		sequencerState.activeBeats.splice(beatIndex, 1)
	} else {
		sequencerState.activeBeats.push(beatIndex)
	}
}

export const updateNoteForCell = (beatIndex: number, note: string) => {
	if (!sequencerState.beatToNotes[beatIndex]) {
		sequencerState.beatToNotes[beatIndex] = [note]
		return
	}

	const cellNotes = sequencerState.beatToNotes[beatIndex]

	if (cellNotes.includes(note)) {
		cellNotes.splice(cellNotes.indexOf(note), 1)
	} else {
		cellNotes.push(note)
	}
}

export const setPlayingBeatIndex = (beatIndex: number) => {
	sequencerState.playingBeatIndex = beatIndex % sequencerState.totalBeats
}

export const updateTotalBeats = (
	measureTotal: number,
	beatsPerMeasure: number,
) => {
	sequencerState.measureTotal = measureTotal
	sequencerState.beatsPerMeasure = beatsPerMeasure
}

export const setTransportLastEvent = (status: TransportStatus) => {
	sequencerState.transportLastEvent = status
}

export const setBpm = (bpm: number) => {
	sequencerState.bpm = bpm
}
