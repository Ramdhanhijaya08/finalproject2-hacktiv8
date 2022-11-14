import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Head from 'next/head';

const MainLayout = ({ title, children }) => {
	return (
		<>
			<Head>
				<title>{title ? `${title} | yommerce` : 'yommerce'}</title>
			</Head>
			<Header />
			<main className="layout py-20">{children}</main>
			<Footer />
		</>
	);
};

export default MainLayout;
