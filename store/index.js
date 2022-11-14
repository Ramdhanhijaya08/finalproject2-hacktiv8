import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import productReducer, { getProducts } from '../features/productSlice';
import adminReducer from '../features/adminSlice';

export const store = configureStore({
	reducer: {
		product: productReducer,
		admin: adminReducer,
		user: authReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

store.dispatch(getProducts());
