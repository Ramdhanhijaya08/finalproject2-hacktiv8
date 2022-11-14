import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../store';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
			<Toaster position="top-right" />
		</Provider>
	);
}

export default MyApp;
