const express = require('express');
const Router = express.Router();
const { buy,create }= require('../controllers/productController');
const { isAuthenticated }= require('../../middleware/isAuthenticated');

Router.post("/product/create",isAuthenticated,create);
Router.post("/product/buy",isAuthenticated,buy);

module.exports = Router;