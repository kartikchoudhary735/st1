const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// CRUD operations for reviews

// Add a new review to a product
router.post('/api/products/:productId/reviews', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.reviews.push(req.body);
    await product.save();

    res.status(201).json(product.reviews[product.reviews.length - 1]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve all reviews for a specific product with pagination
router.get('/api/products/:productId/reviews', async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const reviews = product.reviews
      .slice((page - 1) * pageSize, page * pageSize);

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a review by ID within a product
router.put('/api/products/:productId/reviews/:reviewId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const review = product.reviews.id(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    review.set(req.body);
    await product.save();

    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a review by ID within a product
router.delete('/api/products/:productId/reviews/:reviewId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const review = product.reviews.id(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    review.remove();
    await product.save();

    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
