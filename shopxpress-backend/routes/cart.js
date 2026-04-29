const express = require('express');
const auth = require('../middleware/auth');
const Product = require('../models/Product');

const router = express.Router();

router.use(auth);

// Get cart items for authenticated user
router.get('/', async (req, res) => {
  try {
    await req.user.populate('cart.product');
    const cartItems = req.user.cart.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Could not load cart' });
  }
});

// Add item to cart or update quantity
router.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product and quantity required' });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const existingItem = req.user.cart.find((item) => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity = quantity;
    } else {
      req.user.cart.push({ product: productId, quantity });
    }

    await req.user.save();
    res.json({ message: 'Cart updated' });
  } catch (error) {
    res.status(500).json({ message: 'Could not update cart' });
  }
});

// Remove item from cart
router.delete('/:productId', async (req, res) => {
  try {
    req.user.cart = req.user.cart.filter((item) => item.product.toString() !== req.params.productId);
    await req.user.save();
    res.json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ message: 'Could not remove item' });
  }
});

module.exports = router;
