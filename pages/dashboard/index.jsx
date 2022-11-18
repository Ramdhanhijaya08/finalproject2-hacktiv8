import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../components/button';
import { DashboardLayout } from '../../components/layouts';
import CustomModal from '../../components/Modal';
import { updateStock } from '../../features/productSlice';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../utils/env';
import useIsSSR from '../../hooks/useIsSSR';

const DashboardPage = () => {
	const products = useSelector(state => state.product.products);
	const dispatch = useDispatch();
	const isSSR = useIsSSR();
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [modalUpdate, setModalUpdate] = useState(false);
	const [updateQuantity, setUpdateQuantity] = useState(0);

	const updateStockHandler = () => {
		dispatch(
			updateStock({
				id: selectedProduct.id,
				quantity: updateQuantity,
			})
		);
		setModalUpdate(false);
	};

	return (
		<DashboardLayout title="Products">
			<h3>Product List</h3>

			<div className="relative my-8 overflow-x-auto">
				{!isSSR && (
					<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
						<thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="py-3 px-6">
									No
								</th>
								<th scope="col" className="py-3 px-6">
									Product Photo
								</th>
								<th scope="col" className="py-3 px-6">
									Product Name
								</th>
								<th scope="col" className="py-3 px-6">
									Price
								</th>
								<th scope="col" className="py-3 px-6">
									Stock
								</th>
								<th scope="col" className="py-3 px-6">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{products.map(product => (
								<tr className="text-gray-600" key={product.id}>
									<th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
										{product.id}
									</th>
									<td className="py-4 px-6">
										<Image src={product.image} alt={product.title} height={50} width={50} />
									</td>
									<td className="py-4 px-6">{product.title}</td>
									<td className="py-4 px-6">${product.price}</td>
									<td className="py-4 px-6">{product.quantity}</td>
									<td className="py-4 px-6">
										<PrimaryButton
											onClick={() => {
												setSelectedProduct(product);
												setModalUpdate(prev => !prev);
												setUpdateQuantity(product.quantity);
											}}
										>
											Update
										</PrimaryButton>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>

			<CustomModal title="Update stock" isOpen={modalUpdate} closeModal={() => setModalUpdate(false)}>
				<div className="flex items-center justify-center space-x-2">
					<PrimaryButton onClick={() => setUpdateQuantity(prev => prev + 1)}>+</PrimaryButton>
					<input
						type="number"
						min={0}
						value={updateQuantity}
						onChange={e => setUpdateQuantity(e.target.value)}
						className="h-9 w-16 rounded-md border border-black text-center outline-none"
					/>
					<PrimaryButton onClick={() => updateStock !== 0 && setUpdateQuantity(prev => prev - 1)}>-</PrimaryButton>
				</div>

				<div className="mt-8 flex items-center justify-end space-x-2">
					<button onClick={() => setModalUpdate(false)} className="rounded-md border border-black px-4 py-2 text-sm font-semibold">
						Cancel
					</button>
					<PrimaryButton onClick={updateStockHandler}>Update</PrimaryButton>
				</div>
			</CustomModal>
		</DashboardLayout>
	);
};

export const getServerSideProps = ctx => {
	const token = ctx.req.cookies['admin-token'];

	try {
		jwt.verify(token, JWT_SECRET);
	} catch {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default DashboardPage;
