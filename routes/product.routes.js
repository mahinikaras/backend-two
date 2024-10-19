const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const { getProducts, getproductbyId, createProduct } = require('../controllers/product.controller');

router.get('/', getProducts)

router.get('/:id', getproductbyId)

router.post('/', createProduct)

module.exports = router