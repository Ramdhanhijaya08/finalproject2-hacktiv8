import { useSelector } from 'react-redux';
import useIsSSR from '../hooks/useIsSSR';
import { ProductCard } from './card';

const ProductHome = () => {
	const { products } = useSelector(state => state.product);
	const isSSR = useIsSSR();

	return (
		!isSSR && (
			<div className="mt-6 grid grid-cols-1 place-items-center gap-x-3 gap-y-8 pt-4 md:grid-cols-2 lg:grid-cols-4">
				{products.length > 0 && products.slice(0, 4).map(product => <ProductCard key={product.id} {...product} />)}
			</div>
		)
	);
};

export default ProductHome;
