import { type TransportStatus, proxyState } from '../sequencer/sequencer-state'

export function updateSequencer(updates: Partial<typeof proxyState>) {
	Object.assign(proxyState, updates)
}

export function setCurrentBeat(beatIndex: number) {
	proxyState.focusedBeatIndex = beatIndex
}

export function toggleBeatActivation(beatIndex: number) {
	if (proxyState.activeBeats.includes(beatIndex)) {
		proxyState.activeBeats.splice(beatIndex, 1)
	} else {
		proxyState.activeBeats.push(beatIndex)
	}
}
export function updateNoteForCell(beatIndex: number, note: string) {
	if (!proxyState.beatToNotes[beatIndex]) {
		proxyState.beatToNotes[beatIndex] = [note]
		return
	}

	const cellNotes = proxyState.beatToNotes[beatIndex]

	if (cellNotes.includes(note)) {
		cellNotes.splice(cellNotes.indexOf(note), 1)
	} else {
		cellNotes.push(note)
	}
}
export function setPlayingBeatIndex(beatIndex: number) {
	proxyState.playingBeatIndex = beatIndex % proxyState.totalBeats
}
export function updateTotalBeats(measureTotal: number, beatsPerMeasure: number) {
	proxyState.measureTotal = measureTotal
	proxyState.beatsPerMeasure = beatsPerMeasure
}

export function setTransportLastEvent(status: TransportStatus) {
	proxyState.transportLastEvent = status
}

export function setBpm(bpm: number) {
	proxyState.bpm = bpm
}