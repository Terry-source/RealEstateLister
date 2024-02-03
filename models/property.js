const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    address: { type: String, required: true },
    rooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    suburb: { type: mongoose.Schema.Types.ObjectId, ref: 'Suburb', required: true }
});

module.exports = mongoose.model('Property', propertySchema);
