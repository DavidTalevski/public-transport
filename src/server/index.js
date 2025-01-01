require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const transportRoutes = require('./routes/transportRoutes');


const app = express();


const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

app.use('/api', transportRoutes);

// Define routes here
app.get('/', (req, res) => res.send('Public Transport API'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

});
