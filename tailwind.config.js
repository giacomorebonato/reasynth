import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		fontFamily: {
			sans: ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
		},
		extend: {
			gridColumnStart: {
				13: '13',
				14: '14',
			},
		},
	},
	daisyui: {
		themes: false,
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

export default config
