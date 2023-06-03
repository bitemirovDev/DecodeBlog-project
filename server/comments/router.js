const express = require('express')
const router = express.Router()
const {saveComment} = require('./controller')

// получить данные с базы
router.post('/api/comments', saveComment)

module.exports = router