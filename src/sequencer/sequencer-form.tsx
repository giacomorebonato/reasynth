import * as Tone from 'tone'
import { useSequencerState } from './sequencer-state'
import { useTone } from './use-tone'
const measureNumbers = Array.from({ length: 10 }, (_, i) => {
	return (i + 1) * 2
})
const BEAT_NUMBERS = [2, 3, 4, 5, 6, 7] as const

export const SequencerForm = () => {
	const { transportStart, transportStop, transportPause } = useTone()
	const { snap, actions } = useSequencerState()

	return (
		<div className='h-screen bg-slate-800'>
			<div className='grid grid-cols-1 gap-2 p-2 min-w-80'>
				<label className='form-control'>
					<div className='label'>
						<span className='label-text'>Total Measures</span>
					</div>
					<select
						className='select select-bordered w-full'
						value={snap.measureTotal}
						onChange={(e) => {
							actions.updateTotalBeats(+e.target.value, snap.beatsPerMeasure)
						}}
					>
						{measureNumbers.map((item) => {
							return <option key={`row-select-${item}`}>{item}</option>
						})}
					</select>
				</label>

				<label className='form-control'>
					<div className='label'>
						<span className='label-text'>Beats per measure</span>
					</div>
					<select
						className='select select-bordered w-full'
						value={snap.beatsPerMeasure}
						onChange={(e) => {
							actions.updateTotalBeats(snap.measureTotal, +e.target.value)
						}}
					>
						{BEAT_NUMBERS.map((item) => {
							return <option key={`row-select-${item}`}>{item}</option>
						})}
					</select>
				</label>
				<div>
					<div className='label'>
						<span className='label-text'>
							Tempo: {snap.bpm}bpm <br />
							Total time {snap.totalTime.toFixed(2)} seconds
						</span>
					</div>
					<input
						type='range'
						min={60}
						max={240}
						className='range'
						step={1}
						value={snap.bpm}
						onChange={(e) => {
							const bpm = Number.parseFloat(e.target.value)
							actions.setBpm(bpm)
							Tone.Transport.bpm.value = bpm
						}}
					/>
					<div className='w-full flex justify-between text-xs px-2'>
						<span>|</span>
						<span>|</span>
						<span>|</span>
						<span>|</span>
						<span>|</span>
					</div>
				</div>
				<label className='form-control'>
					<div className='join flex'>
						<button
							type='button'
							className='btn btn-sm bg-red-500 hover:bg-red-800 text-white join-item flex-1'
							onClick={transportStop}
						>
							Stop
						</button>
						<button
							type='button'
							className='btn btn-sm bg-green-500 hover:bg-green-800 text-white join-item flex-1'
							onClick={transportPause}
						>
							Pause
						</button>
						<button
							type='button'
							className='btn btn-sm bg-green-500 hover:bg-green-800 text-white join-item flex-1'
							onClick={transportStart}
						>
							Start
						</button>
					</div>
				</label>
			</div>
		</div>
	)
}

export default SequencerForm
