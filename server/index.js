// // server/index.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const bookRoutes = require('./routes/books');

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json()); // to parse JSON bodies

// app.use('/api/books', bookRoutes);

// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => console.error('MongoDB connection error:', err));
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

const uploadRoutes = require('./routes/upload');
app.use('/api', uploadRoutes);


// Start server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});

