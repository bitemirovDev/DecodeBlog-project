const express = require('express')
const router = express.Router()
const {saveComment, deleteComment} = require('./controller')

// получить данные с базы
router.post('/api/comments', saveComment)
router.post('/api/comments/delete', deleteComment)

module.exports = router