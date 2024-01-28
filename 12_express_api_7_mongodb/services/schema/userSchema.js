const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: String,
    name: String,
    email: { type: String, unique: true},
    password: String,
    role: String
}, {
    versionKey: false
});

const userModel = mongoose.model('user', userSchema)

module.exports = userModel