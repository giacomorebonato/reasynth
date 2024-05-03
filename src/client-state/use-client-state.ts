import { useSnapshot } from 'valtio'
import * as sequencerActions from '#/client-state/sequencer-actions'
import { proxyState } from '#/sequencer/sequencer-state'

export const useClientState = () => {
	const snap = useSnapshot(proxyState)

	return {
		snap,
		actions: {
			...sequencerActions,
		},
	}
}
