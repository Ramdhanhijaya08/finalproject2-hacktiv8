import Head from 'next/head';
import Header from './Header';

const DashboardLayout = ({ children, title }) => {
	return (
		<>
			<Head>
				<title>{title ? `${title} | yommerce Admin` : 'yommerce Admin'}</title>
			</Head>
			<Header />
			<main className="layout pt-20">{children}</main>
		</>
	);
};

export default DashboardLayout;
