const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
  },
  population: {
    type: Number,
    required: true
  },
  area: {
    type: Number,
    required: true
  }
}, { shardKey: { _id: 1 } });

module.exports = mongoose.model('City', CitySchema);
