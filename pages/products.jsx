import { useSelector } from 'react-redux';
import { MainLayout } from '../components/layouts';
import { ProductCard } from '../components/card';
import useIsSSR from '../hooks/useIsSSR';

const ProductsPage = () => {
	const products = useSelector(state => state.product.products);
	const isSSR = useIsSSR();

	return (
		<MainLayout title="Products">
			<section className="grid grid-cols-1 gap-x-3 gap-y-20 py-12 md:grid-cols-2 lg:grid-cols-4">
				{!isSSR && products.map(product => <ProductCard {...product} key={product.id} />)}
			</section>
		</MainLayout>
	);
};

export default ProductsPage;
