import { createFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'

import { Layout } from '#/browser/layout'
import { ClientOnly } from '#/server/client-only'

export const Route = createFileRoute('/')({
	component: IndexComponent,
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
