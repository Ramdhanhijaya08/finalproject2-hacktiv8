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
	reducers: {
		updateStock: (state, action) => {
			state.products = state.products.map(product => {
				if (product.id === action.payload.id) {
					return {
						...product,
						quantity: action.payload.quantity,
					};
				} else {
					return product;
				}
			});
		},
	},
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

export const { updateStock } = productSlice.actions;
export default productSlice.reducer;
