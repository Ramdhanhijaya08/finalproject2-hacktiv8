import { FaLock, FaUser } from 'react-icons/fa';
import Image from 'next/image';
import peopleLogin from '../assets/img/peopleLogin.png';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAPI } from '../features/authSlice';
import { useRouter } from 'next/router';
import { JWT_SECRET } from '../utils/env';
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';
import Head from 'next/head';

const LoginPage = () => {
	const router = useRouter();
	const { error, user } = useSelector(state => state.user);
	console.log({ error, user });

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(
			loginUserAPI({
				email,
				password,
			})
		);
	};

	useEffect(() => {
		if (user) router.push('/');
	}, [user, router]);

	return (
		<>
			<Head>
				<title>Login | yommerce</title>
			</Head>
			<div className="block h-screen items-center justify-center bg-gradient-to-r from-black via-stone-700 to-slate-600 p-4 md:flex">
				{/* Login Card */}
				<div className="text-white-600 flex w-full max-w-screen-lg flex-col items-center overflow-hidden rounded-xl bg-image bg-cover md:flex-row">
					<Image src={peopleLogin} alt="peopleLogin" className=" w-21 h-21 rounded-xl" />

					{/* from */}
					<div className="space-y-15 flex w-full flex-col items-center rounded-r-lg bg-white p-20 md:w-1/2">
						{/* welcome */}
						<div className="flex flex-col items-center">
							<h1 className="text-3xl font-bold text-black">Welcome to yommerce</h1>
							<br />
							<p className="font-light">Hey There!! Sign in and get the best </p>
							<p className="font-light"> your style fashion </p>
						</div>
						<br />

						{/* input */}
						<form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
							<div className="relative">
								<span className="absolute inset-y-0 flex items-center pl-4 text-gray-400">
									<FaUser />
								</span>
								<input
									className="rounded-md border border-gray-300 py-1 pl-9 pr-4 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-stone-900"
									placeholder="Email..."
									type="email"
									value={email}
									required
									onChange={e => setEmail(e.target.value)}
								/>
							</div>
							<div className="relative">
								<span className="absolute inset-y-0 flex items-center pl-4 text-gray-400">
									<FaLock />
								</span>
								<input
									className="rounded-md border border-gray-300 py-1 pl-9 pr-9 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-stone-900"
									placeholder="Password..."
									type="password"
									value={password}
									onChange={e => setPassword(e.target.value)}
									required
								/>
							</div>
							<button
								className="inline-flex items-center rounded-md bg-stone-900 px-3 py-1 font-medium text-white shadow-md transition hover:bg-slate-600"
								type="submit"
							>
								<FaUser className="mr-2" />
								Login Now
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = ctx => {
	const token = ctx.req.cookies['user-token'];

	try {
		jwt.verify(token, JWT_SECRET);

		return {
			redirect: {
				destination: '/',
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

export default LoginPage;
