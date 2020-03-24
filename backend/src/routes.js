const express = require('express');

const ProductController = require('./controllers/ProductController');

const routes = express.Router();

routes.get('/products', ProductController.index);

routes.post('/stock', ProductController.create);
routes.delete('/stock/:id', ProductController.delete);
routes.put('/stock/:id', ProductController.update);


module.exports = routes;