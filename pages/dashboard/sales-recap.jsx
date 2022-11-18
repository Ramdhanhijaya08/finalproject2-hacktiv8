import { useSelector } from 'react-redux';
import { DashboardLayout } from '../../components/layouts';
import { JWT_SECRET } from '../../utils/env';
import jwt from 'jsonwebtoken';
import { useMemo } from 'react';
import useIsSSR from '../../hooks/useIsSSR';

const RecapPage = () => {
	const salesRecap = useSelector(state => state.product.salesRecap);
	const isSSR = useIsSSR();

	const totalRevenue = useMemo(
		() => salesRecap.reduce((previousValue, currentValue) => previousValue + currentValue.price * currentValue.quantity, 0),
		[salesRecap]
	);

	return (
		<DashboardLayout title="Sales Recap">
			<h3>Sales Recap</h3>
			{!isSSR && (
				<section className="my-4">
					<br />
					<div className="rounded-lg shadow">
						<table className="w-full">
							<thead className="border-b-3 border-gray-200 bg-black text-white">
								<tr>
									<th className="p-3 text-left text-sm font-semibold tracking-wide">Product</th>
									<th className="w-24 p-3 text-left text-sm font-semibold tracking-wide">Price</th>
									<th className="w-24 p-3 text-left text-sm font-semibold tracking-wide">Sales</th>
									<th className="w-32 p-3 text-left text-sm font-semibold tracking-wide">Revenue</th>
								</tr>
							</thead>
							<tbody>
								{salesRecap.length ? (
									salesRecap.map(item => (
										<tr className="bg-white" key={item.id}>
											<td className="p-3 text-sm text-gray-700">{item.title}</td>
											<td className="p-3 text-sm text-gray-700">${item.price}</td>
											<td className="p-3 text-sm text-gray-700">{item.quantity}</td>
											<td className="p-3 text-left text-sm text-gray-700">${item.price * item.quantity}</td>
										</tr>
									))
								) : (
									<p className="text-center">Nothing here</p>
								)}
							</tbody>
						</table>
					</div>
					<div className="py-4 pb-2">
						<td className="p-3 text-sm font-bold text-gray-700">Total Revenue : </td>
						<td className="rounded-lg bg-green-200 bg-opacity-50 p-3 text-xs font-medium uppercase tracking-wider text-green-800">${totalRevenue}</td>
					</div>
				</section>
			)}
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

export default RecapPage;
