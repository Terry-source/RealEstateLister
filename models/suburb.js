const mongoose = require('mongoose');

const suburbSchema = new mongoose.Schema({
    name: { type: String, required: true },
    info: { type: String, required: false }
});

module.exports = mongoose.model('Suburb', suburbSchema);
