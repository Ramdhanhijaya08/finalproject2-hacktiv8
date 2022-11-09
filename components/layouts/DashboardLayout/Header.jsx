import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../../button';
import { logoutAdmin } from '../../../features/adminSlice';

const Header = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logoutAdmin());
		router.replace('/admin-login');
	};

	return (
		<header className="fixed z-50 w-full bg-white">
			<nav className="layout flex items-center justify-between border-b border-black py-3">
				<Link href="/" className="flex items-end space-x-2">
					<h3>yommerce</h3> <span className="font-medium text-slate-500">Admin</span>
				</Link>
				<ul className="flex items-center space-x-4">
					<li>
						<Link href="/dashboard" className={`${router.pathname === '/dashboard' && 'font-semibold'}`}>
							Products
						</Link>
					</li>
					<li>
						<Link href="/dashboard/sales-recap" className={`${router.pathname === '/dashboard/sales-recap' && 'font-semibold'}`}>
							Sales Recap
						</Link>
					</li>
				</ul>
				<PrimaryButton onClick={logoutHandler}>Logout</PrimaryButton>
			</nav>
		</header>
	);
};

export default Header;
