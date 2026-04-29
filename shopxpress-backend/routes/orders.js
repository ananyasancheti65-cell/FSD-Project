const express = require('express');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');

const router = express.Router();
router.use(auth);

router.post('/', async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !items.length) {
      return res.status(400).json({ message: 'Order must contain items' });
    }

    const detailedItems = await Promise.all(items.map(async (item) => {
      const product = await Product.findById(item.product);
      return {
        product: product._id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
      };
    }));

    const total = detailedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({ user: req.user._id, items: detailedItems, total, status: 'Processing' });

    req.user.cart = [];
    await req.user.save();

    res.json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Could not place order' });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Could not load orders' });
  }
});

module.exports = router;
