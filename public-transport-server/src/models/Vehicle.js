const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
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
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
