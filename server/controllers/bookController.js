// bookController.js
const Book = require('../models/Book');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createBook = async (req, res) => {
  try {
    const file = req.file;

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      async (error, result) => {
        if (error) return res.status(500).json({ error });

        const book = new Book({
          ...req.body,
          imageUrl: result.secure_url,
        });

        const savedBook = await book.save();
        res.status(201).json(savedBook);
      }
    );

    if (file) {
      stream.end(file.buffer);
    } else {
      return res.status(400).json({ error: 'Image file missing' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
