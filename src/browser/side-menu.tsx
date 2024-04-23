import { Link } from '@tanstack/react-router'

export const SideMenu = () => {
	return (
		<>
			<div id='side-menu-portal' />
			<ul
				className='menu bg-base-200 w-56 rounded-box h-full '
				role='navigation'
			>
				<li>
					<h2 className='menu-title'>Demo Apps</h2>
					<ul>
						<li>
							<Link to='/notes'>Note taking</Link>
						</li>
					</ul>
				</li>
			</ul>
		</>
	)
}
