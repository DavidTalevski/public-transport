const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StopSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
  },
});

module.exports = mongoose.model('Stop', StopSchema);