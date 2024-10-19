const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const crypto = require('crypto');
const { cacheControlMiddleWare, getProducts, getproductbyId, createProduct } = require('../controllers/product.controller');



router.get('/', cacheControlMiddleWare, getProducts);

router.get('/:id', getproductbyId);

router.post('/', createProduct);

module.exports = router