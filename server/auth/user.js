const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    email: String,
    fullName: String,
    password: String,
    isAdmin: Boolean,
    image: String,
    description: String,
    favBlogs: [{type: Schema.Types.ObjectId, ref: 'blog'}]
})


module.exports = mongoose.model('user', userSchema)