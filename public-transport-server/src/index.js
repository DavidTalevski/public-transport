require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./routes/router');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Allow only React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', router);

app.get('/', (req, res) => res.send('Public Transport API'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
