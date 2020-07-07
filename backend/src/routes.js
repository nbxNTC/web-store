const express = require('express');

const multer = require('multer');
const multerStorage = require('./config/multer');

const SessionController = require('./controllers/SessionController');
const ProfileController = require('./controllers/ProfileController');
const ProductController = require('./controllers/ProductController');

const routes = express.Router();
const upload = multer({ storage: multerStorage });

routes.post('/sessions', SessionController.create);

routes.get('/products', ProductController.index);
routes.post(
  '/products', 
  upload.single('image'),
  ProductController.create
);
routes.delete('/products/:id', ProductController.delete);
routes.put('/products/:id', ProductController.update);

routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.create);
routes.put('/profile', ProfileController.update);
routes.delete('/profile', ProfileController.delete);

module.exports = routes;