const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const multer = require('multer');
const { cloudinary, storage } = require('../utils/cloudinary');
const upload = multer({ storage }); // Cloudinary storage with multer

// Create a new book (with image upload)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, author, condition, price } = req.body;

    if (!title || !author || !condition || !price || !req.file) {
      return res.status(400).json({ error: 'All fields including image are required' });
    }

    const imageUrl = req.file.path; // Cloudinary URL

    const newBook = new Book({
      title,
      author,
      condition,
      price,
      imageUrl,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a book
router.put('/:id', async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a book
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
