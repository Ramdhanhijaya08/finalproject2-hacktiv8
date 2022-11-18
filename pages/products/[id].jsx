import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../components/button';
import { MainLayout } from '../../components/layouts';
import { BsCartPlusFill as CartIcon } from 'react-icons/bs';
import axios from 'axios';
import useIsSSR from '../../hooks/useIsSSR';
import { addToCart } from '../../features/productSlice';
import { useRouter } from 'next/router';

const ProductDetailPage = ({ product, id }) => {
	const [quantity, setQuantity] = useState(1);
	const isSSR = useIsSSR();
	const dispatch = useDispatch();
	const router = useRouter();

	const productStore = useSelector(state => state.product.products.find(p => p.id === Number(id)));
	const user = useSelector(state => state.user.user);

	const addToCartHandler = () => {
		if (!user) {
			router.push('/login');
			return;
		}

		if (quantity <= productStore.quantity && quantity > 0) {
			dispatch(
				addToCart({
					idUser: user.id,
					id: Number(id),
					quantity: Number(quantity),
				})
			);
		}
	};

	return (
		<MainLayout title={product?.title}>
			<section className="mt-4 md:flex md:space-x-10">
				<div className="flex justify-center text-center md:w-4/12">
					<Image src={product?.image} alt={product?.title} height={300} width={300} />
				</div>
				<div className="mt-6 md:mt-0 md:w-8/12">
					<h3>{product?.title}</h3>
					<p className="text-slate-400">{product?.category}</p>
					<h3 className="mt-8">${product?.price}</h3>

					<div className="mt-10 border-y border-slate-300 py-4">
						<h5 className="w-fit text-lg font-medium">Description</h5>
						<p className="mt-2">{product?.description}</p>
					</div>

					{!isSSR && (
						<div className="mt-10">
							<p>
								Stock Total : <span className="font-semibold">{productStore?.quantity}</span>
							</p>
							<div className="mt-4 flex items-center space-x-2">
								<PrimaryButton
									onClick={() => quantity < productStore?.quantity && setQuantity(prev => Number(prev) + 1)}
									disabled={Number(productStore?.quantity) === 0}
									className="disabled:cursor-not-allowed disabled:bg-slate-400"
								>
									+
								</PrimaryButton>
								<input
									type="number"
									min={1}
									disabled={Number(productStore?.quantity) === 0}
									value={quantity}
									max={productStore?.quantity}
									onChange={e => setQuantity(e.target.value)}
									className="h-9 w-16 rounded-md border border-black text-center outline-none"
								/>
								<PrimaryButton
									onClick={() => quantity !== 1 && setQuantity(prev => prev - 1)}
									disabled={Number(productStore?.quantity) === 0}
									className="disabled:cursor-not-allowed disabled:bg-slate-400"
								>
									-
								</PrimaryButton>
							</div>

							<PrimaryButton
								className={`mt-6 flex items-center disabled:cursor-not-allowed disabled:bg-slate-400`}
								disabled={productStore?.quantity === 0 || quantity > productStore?.quantity || quantity < 1}
								onClick={addToCartHandler}
							>
								<CartIcon className="mr-2" size={18} /> Add To Cart
							</PrimaryButton>
						</div>
					)}
				</div>
			</section>
		</MainLayout>
	);
};

export const getServerSideProps = async ({ params: { id } }) => {
	const { data: product } = await axios('https://fakestoreapi.com/products/' + id);

	if (!product) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			product,
			id,
		},
	};
};

export default ProductDetailPage;
