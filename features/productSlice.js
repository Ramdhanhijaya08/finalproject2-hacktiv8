import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

let salesRecap = [];

if (typeof window !== 'undefined') salesRecap = JSON.parse(localStorage.getItem('sales-recap')) ?? [];

const initialState = {
	products: [],
	cart: [],
	salesRecap,
	ygBedaSamaCart: [],
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
		addToCart: (state, { payload }) => {
			const findCartItem = state.cart.find(product => product.id === payload.id);
			const findProduct = state.products.find(product => product.id === payload.id);

			if (findProduct) {
				if (!findCartItem) {
					state.cart = [{ ...findProduct, quantity: payload.quantity }, ...state.cart];
					toast.success('Successfully added to cart');
				} else {
					toast.error('This item is already in the cart');
				}
			}
		},
		updateStockCart: (state, { payload }) => {
			const findCartItem = state.cart.find(product => product.id === payload.id);
			const findProduct = state.products.find(product => product.id === payload.id);

			if (findCartItem) {
				switch (payload.type) {
					case 'add':
						if (findCartItem.quantity < findProduct.quantity) findCartItem.quantity += 1;
						break;
					case 'reduce':
						if (findCartItem.quantity !== 1) findCartItem.quantity -= 1;
						break;
					default:
						console.debug('type not found');
						break;
				}
			}
		},
		removeCartItem: (state, { payload }) => {
			const filterCart = state.cart.filter(product => product.id !== payload);
			state.cart = filterCart;
		},
		checkout: (state, { payload }) => {
			// reduce quantity in product
			state.products = state.products.map(product => {
				const findCartItem = state.cart.find(item => item.id === product.id);
				if (findCartItem) {
					return {
						...product,
						quantity: product.quantity - findCartItem.quantity,
					};
				}

				return product;
			});

			const sales = state.salesRecap.map(product => {
				// check product in sales recap same with product in cart or not
				const sameWithRecap = state.cart.find(item => item.id === product.id);
				if (sameWithRecap) {
					return {
						...product,
						quantity: sameWithRecap.quantity + product.quantity,
					};
				}
				return product;
			});

			// check remaining cart products
			const remainingCart = [];
			state.cart.forEach(item => {
				const same = sales.find(s => s.id === item.id);
				if (!same) remainingCart.push(item);
			});

			state.salesRecap = [...remainingCart, ...sales];
			localStorage.setItem('sales-recap', JSON.stringify([...remainingCart, ...sales]));

			state.cart = [];

			toast.success('We have received the order');
			toast.success('Thank you for ordering');
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

export const { updateStock, addToCart, updateStockCart, removeCartItem, checkout } = productSlice.actions;
export default productSlice.reducer;
