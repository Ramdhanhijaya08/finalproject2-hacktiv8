import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	products: [],
	loading: false,
	error: '',
};

export const getProducts = createAsyncThunk('product/getProduct', async () => {
	const { data } = await axios.get('https://fakestoreapi.com/products');
	return data.map(d => {
		return {
			...d,
			quantity: 20,
		};
	});
});

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: {
		[getProducts.pending]: state => {
			state.loading = false;
		},
		[getProducts.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.products = payload;
			state.error = '';
		},
		[getProducts.rejected]: (state, action) => {
			state.loading = false;
			state.products = [];
			state.error = action.error.message;
			console.log(state.error);
		},
	},
});

export default productSlice.reducer;
