import { configureStore } from '@reduxjs/toolkit';
import authSlice  from '../features/authSlice';
import productReducer, { getProducts } from '../features/productSlice';

export const store = configureStore({
	reducer: {
		product: productReducer,
		user: authSlice,
	},
});

store.dispatch(getProducts());
