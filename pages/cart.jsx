import Image from 'next/image';
import { MainLayout } from '../components/layouts';
import { FaTrashAlt } from 'react-icons/fa';
import { PrimaryButton } from '../components/button';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';
import { JWT_SECRET } from '../utils/env';
import jwt from 'jsonwebtoken';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { useMemo } from 'react';
import { updateStockCart, removeCartItem, checkout } from '../features/productSlice';
import CustomModal from '../components/Modal';
import { useState } from 'react';
import useCart from '../hooks/useCart';
import toast from 'react-hot-toast';

const CartPage = () => {
	const cart = useCart();
	const { user } = useSelector(state => state.user);
	const { products } = useSelector(state => state.product);

	const router = useRouter();
	const dispatch = useDispatch();

	const [modalCheckout, setModalCheckout] = useState(false);

	const totalPrice = useMemo(
		() => cart.reduce((previousValue, currentValue) => previousValue + currentValue.quantity * currentValue.price, 0).toFixed(2),
		[cart]
	);

	const getQuantityProduct = id => {
		const product = products.find(product => product.id === id);
		return Number(product.quantity);
	};

	const updateQuantity = (id, type) => {
		dispatch(updateStockCart({ id, type, idUser: user.id }));
	};

	const checkoutValidate = () => {
		let empty = [];
		cart.forEach(item => getQuantityProduct(item.id) === 0 && empty.push(true));

		if (empty.length) {
			toast.error('Any item is out of stock, delete the item!');
			return;
		}

		const findOutOfStock = cart.find(item => item.quantity > getQuantityProduct(item.id));
		if (findOutOfStock) {
			toast.error('There are items that are out of stock, reduce stock!');
			return;
		}
		setModalCheckout(true);
	};

	const checkoutHandler = () => {
		if (!cart.length) return;

		dispatch(checkout({ idUser: user.id }));
		setModalCheckout(false);
	};

	useEffect(() => {
		if (!user) router.push('/login');
	}, [router, user]);

	return (
		<MainLayout title="My Cart">
			<section className="py-4">
				<div className="flex items-center justify-between border-b border-gray-300 pb-6">
					<h3>Shopping Cart</h3>
					<h4>{cart.length ?? 0} Items</h4>
				</div>
				{cart.length > 0 ? (
					<table className="mt-6 w-full text-left text-sm text-gray-500">
						<thead className="uppercase text-gray-500">
							<tr>
								<th scope="col" className="py-3 pr-6">
									Product details
								</th>
								<th scope="col" className="py-3 px-6">
									Quantity
								</th>
								<th scope="col" className="py-3 px-6">
									Price
								</th>
								<th scope="col" className="py-3 px-6">
									Total
								</th>
							</tr>
						</thead>
						<tbody>
							{cart.map(product => (
								<tr className={`text-gray-600 ${getQuantityProduct(product.id) === 0 && 'grayscale'}`} key={product.id}>
									<th scope="row" className="flex items-center space-x-5 py-4 pr-6">
										<Image src={product.image} alt="asd" height={80} width={80} />
										<div className="space-y-3">
											<p>{product.title}</p>
											<p className="text-slate-400">{product.category}</p>
											{getQuantityProduct(product.id) === 0 && <p className="text-red-500">Empty stock</p>}
											<button title="Remove from cart" onClick={() => dispatch(removeCartItem({ id: product.id, idUser: user.id }))}>
												<FaTrashAlt className="text-red-600" size={16} />
												<span className="sr-only">Remove item from cart</span>
											</button>
										</div>
									</th>
									<td className="py-4 px-6">
										<div className="flex items-center space-x-3">
											<button className="text-lg font-semibold" onClick={() => updateQuantity(product.id, 'reduce')}>
												-
											</button>
											<p className="font-medium">{product.quantity}</p>
											<button className="text-lg font-semibold" onClick={() => updateQuantity(product.id, 'add')}>
												+
											</button>
										</div>
										{product.quantity > getQuantityProduct(product.id) && getQuantityProduct(product.id) !== 0 && (
											<p className="text-red-500">Max buy {getQuantityProduct(product.id)} item.</p>
										)}
									</td>
									<td className="py-4 px-6">${product.price.toFixed(2)}</td>
									<td className="py-4 px-6">${(product.price * product.quantity).toFixed(2)}</td>
								</tr>
							))}
							<tr className="border-y text-base font-semibold">
								<td className="py-3">Total Price</td>
								<td></td>
								<td></td>
								<td>${totalPrice}</td>
							</tr>
						</tbody>
					</table>
				) : (
					<div className="mt-16 flex flex-col items-center">
						<MdOutlineRemoveShoppingCart size={250} />
						<h3 className="mt-6">There is no item here</h3>
					</div>
				)}

				<div className="mt-8 flex items-center justify-between">
					<Link href="/products" className="flex items-center transition hover:border-b hover:border-b-black">
						<BsArrowLeft className="mr-2" /> Continue Shopping
					</Link>
					{cart.length > 0 && <PrimaryButton onClick={checkoutValidate}>Checkout</PrimaryButton>}
				</div>
			</section>

			<CustomModal title="Checkout" isOpen={modalCheckout} closeModal={() => setModalCheckout(false)}>
				<h4 className="font-normal">Are you sure you want to checkout?</h4>

				<div className="mt-8 flex items-center justify-end space-x-2">
					<button onClick={() => setModalCheckout(false)} className="rounded-md border border-black px-4 py-2 text-sm font-semibold">
						Cancel
					</button>
					<PrimaryButton onClick={checkoutHandler}>Checkout</PrimaryButton>
				</div>
			</CustomModal>
		</MainLayout>
	);
};

export const getServerSideProps = ctx => {
	const token = ctx.req.cookies['user-token'];

	try {
		jwt.verify(token, JWT_SECRET);
	} catch (error) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default CartPage;
