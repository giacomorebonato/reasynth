import { createFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'

import { ClientOnly } from '#/server/client-only'

export const Route = createFileRoute('/')({
	component: IndexComponent,
	notFoundComponent() {
		return <div>Not found</div>
	},
})

function IndexComponent() {
	return (
		<div className='flex flex-col md:flex-row'>
			<Helmet>
				<title>reasynth</title>
			</Helmet>

			<ClientOnly
				load={() => import('#/sequencer/sequencer-before-tone-start')}
				fallback='Loading...'
			>
				{(MyComponent) => <MyComponent />}
			</ClientOnly>
		</div>
	)
}
