import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';
import productReducer, { getProducts } from '../features/productSlice';
import adminReducer from '../features/adminSlice';

export const store = configureStore({
	reducer: {
		product: productReducer,
		admin: adminReducer,
		user: authSlice,
	},
});

store.dispatch(getProducts());
