import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ image, title, price, id }) => {
	return (
		<Link href={`/products/${id}`} className="group">
			<Image src={image} className="m-auto block transition group-hover:scale-110" alt="asd" width="200" height="200" />
			<p className="mt-6">{title}</p>
			<p className="mt-4">${price}</p>
		</Link>
	);
};

export default ProductCard;
