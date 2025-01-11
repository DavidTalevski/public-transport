const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DistrictSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    area: {
        type: Number,
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
    stops: [{
        type: Schema.Types.ObjectId,
        ref: 'Stop'
    }],
});

module.exports = mongoose.model('District', DistrictSchema);
