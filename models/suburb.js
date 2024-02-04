const mongoose = require('mongoose');

const suburbSchema = new mongoose.Schema({
    name: { type: String, required: true },
    info: { type: String, required: false },
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property' // Assumes your property model is named 'Property'
    }],
});

module.exports = mongoose.model('Suburb', suburbSchema);
