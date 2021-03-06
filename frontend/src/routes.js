import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';
import RegisterProduct from './pages/RegisterProduct';

import store from './store';

export default function Routes() {
	return(
		<BrowserRouter>
			<Switch>
				<Provider store={store}>					
					<Route path="/" exact component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/products" component={Products} />
					<Route path="/cart" component={Cart} />					
					<Route path="/register-product" component={RegisterProduct} />		
				</Provider>
			</Switch>
		</BrowserRouter>
	);
}