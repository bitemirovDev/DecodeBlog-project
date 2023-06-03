const mongoose = require('mongoose')
const Schema = mongoose.Schema

// создаем схему для категорий
const commentsSchema = new mongoose.Schema({
    comment: String,
    blogID: {type: Schema.Types.ObjectId, ref: 'blog'},
    authorID: {type: Schema.Types.ObjectId, ref: 'user'},
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('comments', commentsSchema)