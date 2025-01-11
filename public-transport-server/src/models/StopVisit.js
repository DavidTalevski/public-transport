const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StopVisitSchema = new Schema({
    route: {
        type: Schema.Types.ObjectId,
        ref: 'Route',
        required: true
    },
    stop: {
        type: Schema.Types.ObjectId,
        ref: 'Stop',
        required: true
    },
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('StopVisit', StopVisitSchema);
