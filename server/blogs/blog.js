const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new mongoose.Schema({
    title: String,
    categ: {type: Schema.Types.ObjectId, ref: 'categories'},
    image: String,
    description: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    date: String
})


module.exports = mongoose.model('blog', blogSchema)

