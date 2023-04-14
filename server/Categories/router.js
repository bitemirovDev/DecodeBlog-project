const express = require('express')
const router = express.Router()

const {getAllCategories} = require('./controller')

const writeDataCategories = require('./seed')

// получить данные с базы
router.get('/api/categories', getAllCategories)

writeDataCategories()

module.exports = router