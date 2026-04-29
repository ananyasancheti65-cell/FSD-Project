const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Get all products with optional search + category + price filter
router.get('/', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.title = new RegExp(search, 'i');
    if (req.query.featured === 'true' || req.query.featured === true) filter.featured = true;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch products' });
  }
});

// Get single product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Product lookup failed' });
  }
});

module.exports = router;
