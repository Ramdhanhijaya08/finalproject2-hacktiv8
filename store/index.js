import { configureStore } from '@reduxjs/toolkit';
import productReducer, { getProducts } from '../features/productSlice';

export const store = configureStore({
	reducer: {
		product: productReducer,
	},
});

store.dispatch(getProducts());
