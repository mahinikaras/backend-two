const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product.model.js');
const crypto = require('crypto');
const product = require('../models/product.model.js');
const app = express();
app.use(express.json());


var products;
function generateETag(data) {
    const hash = crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
    return `${hash}`; // Return the hash wrapped in quotes (standard for ETag)
}




async function cacheControlMiddleWare(req, res, next) {
    console.log("cacheControlMiddleWare is called");
    try {
        products = await Product.find({});

        const generatedETag = generateETag(products);
        console.log(">>>> generate etag : ", generatedETag);
        console.log(">>>> req.headers['if-none-match'] : ", req.headers['if-none-match']);

        // Check if the client sent the If-None-Match header
        if (req.headers['if-none-match'] === generatedETag) {
            // If ETags match, send 304 Not Modified
            return res.status(304).end();
        }

        // Otherwise, set the ETag header and continue to the next middleware
        res.setHeader('ETag', generatedETag);

        // Cache Control headers
        res.setHeader('Cache-Control', 'public, max-age=30');
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getProducts = async (req, res) => {
    product
    try {
        //const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getproductbyId = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { cacheControlMiddleWare, getProducts, getproductbyId, createProduct }