const mongoose = require('mongoose');
const District = require('./District');
const Stop = require('./Stop');
const Vehicle = require('./Vehicle');
const Route = require('./Route');

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

CitySchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  const cityId = this._id;
  
  // Use parallel execution for better performance
  await Promise.all([
    District.deleteMany({ city_id: cityId }),
    Stop.deleteMany({ city_id: cityId }),
    Route.deleteMany({ city_id: cityId }),
    Vehicle.deleteMany({ city_id: cityId })
  ]);
  
  next();
});

module.exports = mongoose.model('City', CitySchema);
