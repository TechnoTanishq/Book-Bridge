const Book = require("../models/Book");
const cloudinary = require("cloudinary").v2;

// POST /api/books
const createBook = async (req, res) => {
  try {
    const { title, author, condition, price } = req.body;

    let imageUrl = "";

    // 1. Upload to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "bookbridge_books",
      });
      imageUrl = result.secure_url;
    }

    // 2. Save to MongoDB
    const newBook = new Book({
      title,
      author,
      condition,
      price,
      imageUrl, // ← important!
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error("Book upload failed", err);
    res.status(500).json({ error: "Failed to upload book" });
  }
};

module.exports = { createBook };
