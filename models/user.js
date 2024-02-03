const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    name: { type: String, required: true },
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
    email: String,
    avatar: String,
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('User', userSchema);
