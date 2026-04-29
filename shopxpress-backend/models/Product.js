const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
