const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StopSchema = new Schema({
  city_id: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true,
    index: true
  },
  district: {
    type: Schema.Types.ObjectId,
    ref: 'District',
    required: true
  },
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
}, { shardKey: { city_id: 1 } });

module.exports = mongoose.model('Stop', StopSchema);