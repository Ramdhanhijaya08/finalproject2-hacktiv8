import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialCart } from '../features/productSlice';

const useCart = () => {
	const user = useSelector(state => state.user.user);
	const cartStore = useSelector(state => state.product.cart);
	const dispatch = useDispatch();

	useEffect(() => {
		const cartLocal = JSON.parse(localStorage.getItem(`cart_${user?.id}`)) ?? [];
		dispatch(setInitialCart(cartLocal));
	}, [dispatch, user?.id]);

	return cartStore;
};

export default useCart;
