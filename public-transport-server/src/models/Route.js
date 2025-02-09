const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
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
});

module.exports = mongoose.model('Route', RouteSchema);