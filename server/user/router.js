const express = require('express')
const router = express.Router()
const {addToFav, editUser} = require('./controller')
const {upload} = require('./multer')
const isAuth = require('../auth/middlewares')

router.post('/api/addToFav', addToFav)
router.post('/api/profile/edit', isAuth, upload.single('image'), editUser)


module.exports = router