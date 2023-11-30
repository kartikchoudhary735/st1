const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// CRUD operations for products

// Create a new product
router.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Retrieve all products with pagination
router.get('/api/products', async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  try {
    const products = await Product.find()
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve a specific product by ID
router.get('/api/products/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a product by ID
router.put('/api/products/:productId', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product by ID
router.delete('/api/products/:productId', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
