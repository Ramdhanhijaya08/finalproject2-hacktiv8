import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/env';

const initialState = {
	isLoggin: false,
	isError: false,
};

export const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		loginAdmin: (state, action) => {
			const { email, password } = action.payload;

			if (email === 'admin@bukapedia.com' && password === 'admin123') {
				state.isLoggin = true;
				state.isError = false;

				jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
					Cookies.set('admin-token', token, { expires: 7 });

					toast.success('Login successful');
					setTimeout(() => {
						toast.success('Welcome back, Admin!');
					}, 500);
				});
			} else {
				toast.error('Incorrect email or password!');
				state.isError = true;
			}
		},
		logoutAdmin: state => {
			state.isLoggin = false;
			Cookies.remove('admin-token');
			toast.success('Logout successful');
		},
	},
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
