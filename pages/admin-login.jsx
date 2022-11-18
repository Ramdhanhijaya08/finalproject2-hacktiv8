import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../components/button';
import { loginAdmin } from '../features/adminSlice';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/env';
import Head from 'next/head';

const AdminPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const { isLoggin, isError } = useSelector(state => state.admin);

	const router = useRouter();

	const loginHandler = e => {
		e.preventDefault();

		dispatch(loginAdmin({ email, password }));
		if (isError) setPassword('');
	};

	useEffect(() => {
		if (isLoggin) {
			router.push('/dashboard');
		}
	}, [isLoggin, router]);

	return (
		<>
			<Head>
				<title>Login Admin | yommerce</title>
			</Head>
			<div className="mx-auto flex min-h-screen w-11/12 max-w-xl">
				<div className="m-auto w-full rounded-lg border bg-white shadow-md md:w-10/12">
					<div className="border-b p-4">
						<h3 className="text-lg font-semibold">Login Admin</h3>
					</div>
					<div className="p-4">
						<form onSubmit={loginHandler}>
							<div className="mb-4">
								<label htmlFor="email" className="text-sm font-medium">
									Email
								</label>
								<input
									placeholder="Enter your email"
									id="email"
									type="email"
									autoFocus
									className="mt-1 w-full rounded-md border p-2 outline-none"
									value={email}
									onChange={e => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="password" className="text-sm font-medium">
									Password
								</label>
								<input
									placeholder="Enter your password"
									id="password"
									type="password"
									className="mt-1 w-full rounded-md border p-2 outline-none"
									value={password}
									onChange={e => setPassword(e.target.value)}
									required
								/>
							</div>
							<PrimaryButton type="submit">Login</PrimaryButton>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = ctx => {
	const token = ctx.req.cookies['admin-token'];

	try {
		jwt.verify(token, JWT_SECRET);

		return {
			redirect: {
				destination: '/dashboard',
				permanent: false,
			},
		};
	} catch {
		if (token) {
			return {
				redirect: {
					destination: '/',
					permanent: false,
				},
			};
		}
	}

	return {
		props: {},
	};
};

export default AdminPage;
