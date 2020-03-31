const express = require('express');

const ProductController = require('./controllers/ProductController');
const OrderController = require('./controllers/OrderController');
const ProfileController = require('./controllers/ProfileController');
const AdminController = require('./controllers/AdminController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.create);
routes.delete('/products/:id', ProductController.delete);
routes.put('/products/:id', ProductController.update);

routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.create);
routes.put('/profile', ProfileController.update);
routes.delete('/profile', ProfileController.delete);

routes.get('/orders', OrderController.index);
routes.post('orders/:value', OrderController.create);

routes.get('/admin/orders', AdminController.orders);
routes.get('/admin/profiles', AdminController.profiles);

module.exports = routes;