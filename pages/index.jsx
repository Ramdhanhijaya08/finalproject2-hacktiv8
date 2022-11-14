import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import hero from '../assets/img/hero.png';
import Products from '../components/ProductHome';
import people1 from '../assets/img/people1.png';
import people2 from '../assets/img/people2.png';
import { TestimoniCard } from '../components/card';
import { MainLayout } from '../components/layouts';

const HomePage = () => {
	return (
		<MainLayout title="Home">
			<section>
				<Image src={hero} alt="Hero" className="rounded-md" loading="lazy" />
			</section>

			<section className="mt-10">
				<div className="flex items-center justify-between border-b border-black pb-3">
					<h4 className="font-normal uppercase">Products</h4>
					<Link className="flex space-x-1 text-sm" href="/products">
						<span>BROWSE</span> <FiArrowUpRight size={16} />
					</Link>
				</div>

				<Products />
			</section>

			<section className="my-20">
				<h4 className="border-b border-black pb-3 font-normal uppercase">TESTIMONIALS</h4>

				<div className="mt-10 grid grid-cols-1 gap-2 md:grid-cols-2">
					<TestimoniCard
						img={people1}
						name="JOHN DOE"
						job="Fulltask Developer"
						desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis
								viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
					/>
					<TestimoniCard
						img={people2}
						name="JANE DOE"
						job="Fulltask Developer"
						desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis
								viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
					/>
					<TestimoniCard
						img={people2}
						name="JANE DOE"
						job="Fulltask Developer"
						desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis
								viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
					/>
					<TestimoniCard
						img={people1}
						name="JOHN DOE"
						job="Fulltask Developer"
						desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis
								viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
					/>
				</div>
			</section>
		</MainLayout>
	);
};

export default HomePage;
