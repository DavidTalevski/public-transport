const mongoose = require('mongoose');
const Route = require("./Route")
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    city_id: {
      type: Schema.Types.ObjectId,
      ref: 'City',
      required: true,
      index: true
    },
    type: {
        type: String,
        required: true
    },
    plateNumber: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    productionYear: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'under maintenance'],
        required: true
    },
}, { shardKey: { city_id: 1 } });

VehicleSchema.pre('remove', async function(next) {
    const vehicleId = this._id;
    await Route.deleteMany({ vehicle: vehicleId });
    next();
  });

module.exports = mongoose.model('Vehicle', VehicleSchema);
