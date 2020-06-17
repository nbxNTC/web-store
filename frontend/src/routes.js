import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';

import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';

import store from './store';

export default function Routes() {
	return(
		<BrowserRouter>
			<Switch>
				<Provider store={store}>
					<ToastProvider
						autoDismiss
						autoDismissTimeout={2000}
						placement='top-right'
						transitionDuration={200}
					>
						<Route path="/" exact component={Login} />
						<Route path="/register" component={Register} />
						<Route path="/products" component={Products} />
						<Route path="/cart" component={Cart} />
					</ToastProvider>
				</Provider>
			</Switch>
		</BrowserRouter>
	);
}