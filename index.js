const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const ProductRoutes = require('./routes/product.routes.js');
require('dotenv').config();
const app = express();
app.use(express.json());



app.get('/', (req, res) => {
    res.send("<h1>hey it is working with nodemon!!!</h1>");
})

app.use("/api/products", ProductRoutes);

const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI).then(() => {
    console.log("connected to db");
    app.listen(3000, () => {
        console.log("listening on port 3000");
    })
}).catch((err) => {
    console.log("connection failed", err);
})