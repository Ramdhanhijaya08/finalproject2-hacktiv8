import Link from 'next/link';
import { useRouter } from 'next/router';
import useIsSSR from '../../../hooks/useIsSSR.js';
import { Menu, Transition } from '@headlessui/react';
import { PrimaryButton } from '../../button';
import { Fragment } from 'react';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../features/authSlice';

const Header = () => {
	const user = useSelector(state => state.user.user);
	const isSSR = useIsSSR();
	const router = useRouter();

	const dispatch = useDispatch();

	return (
		<header className="fixed z-50 w-full bg-white">
			<nav className="layout flex items-center justify-between border-b border-black py-3">
				<h3>
					<Link href="/">yommerce</Link>
				</h3>
				<ul className="flex items-center space-x-4">
					<li>
						<Link href="/products" className={`${router.pathname.startsWith('/products') && 'font-semibold'}`}>
							Products
						</Link>
					</li>
					<li>
						<Link href="/about" className={`${router.pathname === '/about' && 'font-semibold'}`}>
							About
						</Link>
					</li>
					<li>
						<Link href="/cart" className={`${router.pathname === '/cart' && 'font-semibold'}`}>
							Cart
						</Link>
					</li>
				</ul>
				<div className="w-28 text-end">
					{!isSSR &&
						(user ? (
							<Menu as="div" className="relative">
								<Menu.Button>Hi, {user.name.firstname}</Menu.Button>
								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute top-12 right-0">
										<Menu.Item>
											<PrimaryButton className="flex items-center" onClick={() => dispatch(logoutUser())}>
												Logout <RiLogoutCircleRLine size={16} className="ml-1" />
											</PrimaryButton>
										</Menu.Item>{' '}
									</Menu.Items>
								</Transition>
							</Menu>
						) : (
							<Link href="/login" className="rounded-md bg-black px-3 py-1 text-sm text-white transition duration-300 hover:opacity-70">
								Login
							</Link>
						))}
				</div>
			</nav>
		</header>
	);
};

export default Header;
