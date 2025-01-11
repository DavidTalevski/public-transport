const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
  number: {
    type: String,
    required: true
  },
  stopVisits: [{
    type: Schema.Types.ObjectId,
    ref: 'StopVisit'
  }],
});

module.exports = mongoose.model('Route', RouteSchema);