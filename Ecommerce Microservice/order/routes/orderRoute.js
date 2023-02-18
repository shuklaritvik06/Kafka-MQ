const express = require('express');
const Router = express.Router();
const { checkout } = require('../controllers/orderController');

Router.post("/checkout",checkout);

module.exports = Router;