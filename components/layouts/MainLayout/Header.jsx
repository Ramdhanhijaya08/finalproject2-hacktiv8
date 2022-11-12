import Link from 'next/link';

const Header = () => {
	return (
		<header className="fixed z-50 w-full bg-white">
			<nav className="layout flex items-center justify-between border-b border-black py-3">
				<h3>
					<Link href="/">yommerce</Link>
				</h3>
				<ul className="flex items-center space-x-4">
					<li>
						<Link href="/products">Products</Link>
					</li>
					<li>
						<Link href="/about">About</Link>
					</li>
					<li>
						<Link href="/cart">Cart</Link>
					</li>
				</ul>
				<Link href="/login"  className="rounded-md bg-black px-3 py-1 text-sm text-white transition duration-300 hover:opacity-70">
					Login
				</Link>
			</nav>
		</header>
	);
};

export default Header;
