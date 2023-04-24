const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    categ: String,
    image: String,
    description: String
})


module.exports = mongoose.model('blog', blogSchema)