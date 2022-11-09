import Image from 'next/image';
import React from 'react';
import { MainLayout } from '../components/layouts';
import { FaTrashAlt } from 'react-icons/fa';
import { PrimaryButton } from '../components/button';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

const CartPage = () => {
	return (
		<MainLayout title="My Cart">
			<section className="py-8">
				<div className="flex items-center justify-between border-b border-gray-300 pb-6">
					<h3>Shopping Cart</h3>
					<h4>3 Items</h4>
				</div>
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
						{[1, 2, 3].map(p => (
							<tr className="text-gray-600" key={p}>
								<th scope="row" className="flex items-center space-x-5 py-4 pr-6">
									<Image src={'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'} alt="asd" height={80} width={80} />
									<div className="space-y-3">
										<p>Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</p>
										<p className="text-slate-400">mens clothing</p>
										<button title="Remove from cart">
											<FaTrashAlt className="text-red-600" size={16} />
											<span className="sr-only">Remove item from cart</span>
										</button>
									</div>
								</th>
								<td className=" py-4 px-6">
									<div className="flex items-center space-x-3">
										<button className="text-lg font-semibold">-</button>
										<input type="number" min={0} className="h-8 w-10 border border-slate-300 text-center outline-none" />
										<button className="text-lg font-semibold">+</button>
									</div>
								</td>
								<td className="py-4 px-6">$124</td>
								<td className="py-4 px-6">$124</td>
							</tr>
						))}
						<tr className="border-y text-base font-semibold">
							<td className="py-3">Total Price</td>
							<td></td>
							<td></td>
							<td>$12321</td>
						</tr>
					</tbody>
				</table>

				<div className="mt-8 flex items-center justify-between">
					<Link href="/products" className="flex items-center transition hover:border-b hover:border-b-black">
						<BsArrowLeft className="mr-2" /> Continue Shopping
					</Link>
					<PrimaryButton className="">Checkout</PrimaryButton>
				</div>
			</section>
		</MainLayout>
	);
};

export default CartPage;
