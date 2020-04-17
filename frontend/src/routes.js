import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';

export default function Routes() {
	return(
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/products" component={Products} />
				<Route path="/cart" component={Cart} />
			</Switch>
		</BrowserRouter>
	);
}