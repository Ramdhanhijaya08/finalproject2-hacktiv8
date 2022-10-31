import Image from 'next/image';

const TestimoniCard = ({ img, name, job, desc }) => {
	return (
		<div className="rounded-md border border-black px-5 py-8">
			<div className="flex items-center space-x-4">
				<Image src={img} alt="people" width={64} height={64} />
				<div>
					<div className="font-bold uppercase">{name}</div>
					<div>{job}</div>
				</div>
			</div>
			<p className="mt-4 leading-relaxed">{desc}</p>
		</div>
	);
};

export default TestimoniCard;
