import { Suspense, createRef, lazy, useEffect, useState } from 'react'

const LazySequencer = lazy(() => import('./sequencer'))

export const SequencerBeforeToneStart = () => {
	const [started, setStarted] = useState(false)
	const dialogRef = createRef<HTMLDialogElement>()

	useEffect(() => {
		dialogRef.current?.showModal()
	}, [dialogRef.current?.showModal])

	if (started) {
		return (
			<Suspense fallback={null}>
				<LazySequencer />
			</Suspense>
		)
	}

	return (
		<dialog id='my_modal_1' className='modal' ref={dialogRef}>
			<div className='modal-box'>
				<h3 className='font-bold text-lg'>Welcome to reasynth!</h3>
				<p className='py-4'>
					Press the {'Start Audio'} button for allowing audio to be played
				</p>
				<div className='modal-action'>
					<form method='dialog'>
						<button
							className='btn btn-primary'
							type='button'
							onClick={() => {
								import('tone').then((Tone) => {
									Tone.start().then(() => {
										setStarted(true)
									})
								})
							}}
						>
							Start audio
						</button>
					</form>
				</div>
			</div>
		</dialog>
	)
}

export default SequencerBeforeToneStart
