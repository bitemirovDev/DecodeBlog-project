const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    fullName: String,
    password: String,
    isAdmin: Boolean,
    image: String
})


module.exports = mongoose.model('user', userSchema)