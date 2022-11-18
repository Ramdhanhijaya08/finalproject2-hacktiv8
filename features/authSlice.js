import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import jwt from 'jsonwebtoken';
import { API_SITE, JWT_SECRET } from '../utils/env';

export const loginUserAPI = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
	try {
		const res = await axios.post(`${API_SITE}/login`, {
			email,
			password,
		});

		return res.data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			return rejectWithValue(error.response.data.message);
		} else {
			return rejectWithValue(error.message);
		}
	}
});

const user = Cookies.get('user-token') ? jwt.verify(Cookies.get('user-token'), JWT_SECRET, (err, decoded) => (err ? null : decoded)) : null;

const initialState = {
	user,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logoutUser: state => {
			state.user = null;
			Cookies.remove('user-token');
			toast.success('Logout successful');
		},
	},
	extraReducers: builder => {
		builder.addCase(loginUserAPI.pending, state => {
			state.loading = true;
		});
		builder.addCase(loginUserAPI.fulfilled, (state, action) => {
			Cookies.set('user-token', action.payload.data.token, { expires: 7 });

			state.user = action.payload.data.user;
			state.loading = false;
			state.error = null;
			toast.success('Login successed');
		});
		builder.addCase(loginUserAPI.rejected, (state, action) => {
			state.error = action.payload;
			state.loading = false;
			toast.error('Incorrect email or password!');
		});
	},
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
