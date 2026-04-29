const express = require('express');
const auth = require('../middleware/auth');
const Product = require('../models/Product');

const router = express.Router();

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

router.use(auth);
router.use(adminOnly);

router.post('/products', async (req, res) => {
  try {
    const { title, description, price, category, image, featured } = req.body;
    const product = await Product.create({ title, description, price, category, image, featured });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Could not create product' });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Could not update product' });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Could not delete product' });
  }
});

module.exports = router;
