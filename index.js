const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const ProductRoutes = require('./routes/product.routes.js');
const app = express();
app.use(express.json());



app.get('/', (req, res) => {
    res.send("<h1>hey it is working with nodemon!!!</h1>");
})

app.use("/api/products", ProductRoutes);
mongoose.connect("mongodb+srv://mahinikaras123:MpA57MuNtHmfz3c1@backenddb.bxrva.mongodb.net/NODE_PRACTICE?retryWrites=true&w=majority&appName=BackendDB").then(() => {
    console.log("connected to db");
    app.listen(3000, () => {
        console.log("listening on port 3000");
    })
}).catch((err) => {
    console.log("connection failed", err);
})