// controllers/bookController.js
const Book = require('../models/Book');

// Assuming the image is uploaded using multer with cloudinaryStorage
exports.createBook = async (req, res) => {
  try {
    const { title, author, condition, price } = req.body;
    const imageUrl = req.file?.path; // From Cloudinary auto upload

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image upload failed' });
    }

    const newBook = new Book({
      title,
      author,
      condition,
      price,
      imageUrl,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error('Error creating book:', err);
    res.status(500).json({ error: err.message });
  }
};
