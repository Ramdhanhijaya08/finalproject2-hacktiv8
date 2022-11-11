import { configureStore } from '@reduxjs/toolkit';
import productReducer, { getProducts } from '../features/productSlice';
import adminReducer from '../features/adminSlice';

export const store = configureStore({
	reducer: {
		product: productReducer,
		admin: adminReducer,
		
	},
});

store.dispatch(getProducts());
