import { useTone } from './use-tone'

export const EnvelopeForm = () => {
	const { synth } = useTone()

	return (
		<div>
			<div className='grid grid-cols-1 gap-2 p-2 min-w-80'>
				<label className='form-control'>
					<div className='label'>
						<span className='label-text'>Attack</span>
					</div>
					<input
						className='select select-bordered w-full'
						value={synth.get().envelope.attack}
						onChange={(e) => {
							synth.set({
								envelope: {
									...synth.get().envelope,
									attack: e.target.value,
								},
							})
						}}
					/>
				</label>
			</div>
		</div>
	)
}
