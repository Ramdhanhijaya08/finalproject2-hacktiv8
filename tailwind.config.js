/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: 
	{
		extend: {
			backgroundImage: theme => ({
				'image': "url('/bgLogin.png')"
			}),
			fontFamily: {
				primary: ["'Inter'", ...fontFamily.sans],
			},
		},
	},
	plugins: [],
};
