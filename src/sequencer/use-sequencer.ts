import { useSnapshot } from "valtio"
import { sequencerState } from "./sequencer-state"

export const useSequencerSnap = () => {
	const snap = useSnapshot(sequencerState)

  return snap
}
