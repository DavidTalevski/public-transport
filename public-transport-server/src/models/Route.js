const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
  city_id: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
  },
  vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true
  },
  stops: [{
    type: Schema.Types.ObjectId,
    ref: 'Stop'
  }],
}, { shardKey: { city_id: 1 } });

module.exports = mongoose.model('Route', RouteSchema);