
const mongoose = require('mongoose')

// создаем схему для категорий
const CategoriesSchema = new mongoose.Schema({
    name: String,
    key: Number
})

module.exports = mongoose.model('categories', CategoriesSchema)