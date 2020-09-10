// Import Packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Create Server
const app = express();
const port = process.env.PORT || 5000;

// Create Middlewares;
app.use(cors());
app.use(express.json());

// Connect to DB;
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection successfully.');
});

// Routes;
const userRoutes = require('./routes/users');
const exerciseRoutes = require('./routes/exercises');

app.use('/users', userRoutes);
app.use('/exercises', exerciseRoutes);

// Start server;
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
