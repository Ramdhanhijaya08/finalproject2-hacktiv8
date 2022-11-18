import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

let salesRecap = [];
let products = [];

if (typeof window !== 'undefined') {
	salesRecap = JSON.parse(localStorage.getItem('sales-recap')) ?? [];
	products = JSON.parse(localStorage.getItem('products')) ?? [];
}

const initialState = {
	products,
	cart: [],
	salesRecap,
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
		setInitialCart: (state, { payload }) => {
			state.cart = payload;
		},
		updateStock: (state, action) => {
			const updateProduct = state.products.map(product => {
				if (product.id === action.payload.id) {
					return {
						...product,
						quantity: action.payload.quantity,
					};
				} else {
					return product;
				}
			});

			state.products = updateProduct;
			localStorage.setItem('products', JSON.stringify(updateProduct));
		},
		addToCart: (state, { payload }) => {
			const cartLocal = JSON.parse(localStorage.getItem(`cart_${payload.idUser}`)) ?? [];
			const findCartItem = cartLocal.find(product => product.id === payload.id);
			const findProduct = state.products.find(product => product.id === payload.id);

			if (findProduct) {
				if (!findCartItem) {
					const addedCart = [{ ...findProduct, quantity: payload.quantity }, ...state.cart];
					state.cart = addedCart;

					localStorage.setItem(`cart_${payload.idUser}`, JSON.stringify(addedCart));
					toast.success('Successfully added to cart');
				} else {
					toast.error('This item is already in the cart');
				}
			}
		},
		updateStockCart: (state, { payload }) => {
			const cartLocal = JSON.parse(localStorage.getItem(`cart_${payload.idUser}`)) ?? [];
			const findCartItem = cartLocal.find(product => product.id === payload.id);
			const findProduct = state.products.find(product => product.id === payload.id);

			if (findCartItem) {
				switch (payload.type) {
					case 'add':
						if (findCartItem.quantity < findProduct.quantity) {
							const updateStock = cartLocal.map(item => (item.id === payload.id ? { ...item, quantity: item.quantity + 1 } : item));

							state.cart = updateStock;
							localStorage.setItem(`cart_${payload.idUser}`, JSON.stringify(updateStock));
						}
						break;
					case 'reduce':
						if (findCartItem.quantity !== 1) {
							const updateStock = cartLocal.map(item => (item.id === payload.id ? { ...item, quantity: item.quantity - 1 } : item));

							state.cart = updateStock;
							localStorage.setItem(`cart_${payload.idUser}`, JSON.stringify(updateStock));
						}
						break;
					default:
						console.debug('type not found');
						break;
				}
			}
		},
		removeCartItem: (state, { payload }) => {
			const cartLocal = JSON.parse(localStorage.getItem(`cart_${payload.idUser}`)) ?? [];
			const filterCart = cartLocal.filter(product => product.id !== payload.id);

			state.cart = filterCart;
			localStorage.setItem(`cart_${payload.idUser}`, JSON.stringify(filterCart));
		},
		checkout: (state, { payload }) => {
			const cartLocal = JSON.parse(localStorage.getItem(`cart_${payload.idUser}`)) ?? [];
			// reduce quantity in product
			const updateProduct = state.products.map(product => {
				const findCartItem = cartLocal.find(item => item.id === product.id);
				if (findCartItem) {
					return {
						...product,
						quantity: product.quantity - findCartItem.quantity,
					};
				}

				return product;
			});

			state.products = updateProduct;
			localStorage.setItem('products', JSON.stringify(updateProduct));

			const sales = state.salesRecap.map(product => {
				// check product in sales recap same with product in cart or not
				const sameWithRecap = cartLocal.find(item => item.id === product.id);
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
			cartLocal.forEach(item => {
				const same = sales.find(s => s.id === item.id);
				if (!same) remainingCart.push(item);
			});

			state.salesRecap = [...remainingCart, ...sales];
			localStorage.setItem('sales-recap', JSON.stringify([...remainingCart, ...sales]));

			state.cart = [];
			localStorage.setItem(`cart_${payload.idUser}`, JSON.stringify([]));

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
			localStorage.setItem('products', JSON.stringify(payload));

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

export const { updateStock, addToCart, updateStockCart, removeCartItem, checkout, setInitialCart } = productSlice.actions;
export default productSlice.reducer;
