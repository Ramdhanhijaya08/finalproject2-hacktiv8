import {FaLock, FaUser} from 'react-icons/fa';
import Image from 'next/image';
import peopleLogin from '../assets/img/peopleLogin.png';
import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { login } from '../features/authSlice';
import { useRouter } from 'next/router'


const LoginPage = () => {
	const router = useRouter();
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");

	const dispatch = useDispatch()
	const user = useSelector(state => state.login.users);

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(
			login({
				email: email,
				password: password,
				loggedIn: true,
				user: [],
			})
		);
		router.push('/index');
	};

	useEffect(() => {
		if (user) {
			router.push('/index');
		}
	}, [user]);

	return (
		<>
		{/* Container */}
		<div className="bg-gradient-to-r from-black via-stone-700 to-slate-600 block h-screen items-center justify-center p-4 md:flex">
   		{/* Login Card */}
    	<div className="bg-cover flex flex-col items-center max-w-screen-lg overflow-hidden rounded-xl bg-image text-white-600 w-full md:flex-row">
		<Image src={peopleLogin} alt="peopleLogin" className=" rounded-xl w-21 h-21"/>

		{/* from */}
		<div className="bg-white rounded-r-lg flex flex-col items-center p-20 space-y-15 w-full md:w-1/2">
		{/* welcome */}
		<div className="flex flex-col items-center">
		<h1 className="font-bold text-black text-3xl"> Welcome to yommerce</h1>
		<br/>
		<p className="font-light">Hey There!! Sign in and get the best </p> 
		<p className="font-light"> your style fashion </p>
		</div>
		<br/>

		{/* input */}
		<form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
			<div className="relative">
				<span className="absolute flex inset-y-0 items-center pl-4 text-gray-400"><FaUser /></span>
				<input className="border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-stone-900" 
				 placeholder="Username..." 
				 type="email" 
				 value={email} 
				 onChange={(e)=>setemail(e.target.value)} />
			</div>
			<div className="relative">
				<span className="absolute flex inset-y-0 items-center pl-4 text-gray-400"><FaLock /></span>
				<input className="border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-9 py-1 rounded-md transition focus:ring-2 focus:ring-stone-900" 
				 placeholder="Password..." 
				 type="password" 
				 value={password} 
				 onChange={(e)=>setpassword(e.target.value)} />
			</div>
			<button className="bg-stone-900 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-slate-600" 
				type="submit">
				onClick={loginHandle}
			<FaUser className="mr-2" />Login Now</button>
		</form>


		</div>
		</div>
		</div>
	  </>
	) 
};

export default LoginPage;
