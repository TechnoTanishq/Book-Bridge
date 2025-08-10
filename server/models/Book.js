const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  description: String,
  condition: {
    type: String,
    enum: ['New', 'Like New', 'Used'],
    default: 'Used',
  },
  price: Number,
  imageUrl: String, 
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Book', bookSchema);
