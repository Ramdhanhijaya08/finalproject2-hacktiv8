import { MainLayout } from '../../components/layouts';
import { ProductCard } from '../../components/card';
import axios from 'axios';

const ProductsPage = ({ products }) => {
	return (
		<MainLayout title="Products">
			<section className="grid grid-cols-1 gap-x-3 gap-y-20 py-12 md:grid-cols-2 lg:grid-cols-4">
				{products.map(product => (
					<ProductCard {...product} key={product.id} />
				))}
			</section>
		</MainLayout>
	);
};

export const getServerSideProps = async () => {
	const { data: products } = await axios('https://fakestoreapi.com/products');

	return {
		props: {
			products,
		},
	};
};

export default ProductsPage;
