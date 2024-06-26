import { useRouter } from '@tanstack/react-router'
import clsx from 'clsx'
import type React from 'react'
import { Suspense, lazy, useEffect, useRef } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

let LazyPwaReloadPrompt: React.FC = () => null

const contextClass = {
	dark: 'bg-white-600 font-gray-300',
	default: 'bg-primary',
	error: 'bg-red-600',
	info: 'bg-gray-600',
	success: 'bg-blue-600',
	warning: 'bg-orange-400',
} as const

let Devtools: React.FC = () => null

export function Layout({
	children,
	sidebar,
}: { children: React.ReactNode; sidebar?: React.ReactNode }) {
	// const dialogRef = useRef<HTMLDialogElement | null>(null)
	// const utils = trpcClient.useUtils()
	// const profile = trpcClient.auth.profile.useQuery()
	// const logout = trpcClient.auth.logout.useMutation({
	// 	onSuccess() {
	// 		utils.auth.profile.reset()
	// 	},
	// })
	const router = useRouter()
	const checboxRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const unsuscribe = router.history.subscribe(() => {
			if (checboxRef.current) {
				checboxRef.current.checked = false
			}
		})

		return () => {
			unsuscribe()
		}
	}, [router.history])

	useEffect(() => {
		if (import.meta.env.DEV && !import.meta.env.SSR) {
			Devtools = lazy(() => {
				return import('./devtools').then((c) => ({ default: c.Devtools }))
			})
		}
		if (import.meta.env.PROD) {
			LazyPwaReloadPrompt = lazy(() => {
				return import('./pwa-reload-prompt').then((c) => ({
					default: c.PwaReloadPrompt,
				}))
			})
		}
	})

	return (
		<>
			<div className='drawer lg:drawer-open'>
				<input
					className='drawer-toggle'
					id='my-drawer-3'
					type='checkbox'
					ref={checboxRef}
				/>
				<div className='drawer-content flex flex-col'>
					{children}
					<ToastContainer
						bodyClassName={() => 'text-sm font-white font-med block p-3'}
						position='bottom-right'
						toastClassName={(item) => {
							return clsx(
								contextClass[item?.type || 'default'],
								'relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer my-2',
							)
						}}
					/>
				</div>
				<div className='drawer-side h-screen bg-slate-800 overflow-y-scroll'>
					<label
						aria-label='close sidebar'
						className='drawer-overlay'
						htmlFor='my-drawer-3'
					/>
					{sidebar}
				</div>
			</div>

			<Suspense fallback={<div />}>
				<LazyPwaReloadPrompt />
			</Suspense>

			<Suspense fallback={<div />}>
				<Devtools />
			</Suspense>
		</>
	)
}
