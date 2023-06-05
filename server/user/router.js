const express = require('express')
const router = express.Router()
const {addToFav, editUser, blockUser, unblockUser, deleteUser} = require('./controller')
const {upload} = require('./multer')
const isAuth = require('../auth/middlewares')

router.post('/api/addToFav', addToFav)
router.post('/api/profile/edit', isAuth, upload.single('image'), editUser)

router.post('/api/admin/block', isAuth, blockUser)
router.post('/api/admin/unblock', isAuth, unblockUser)
router.delete('/api/admin/deleteUser/:id', isAuth, deleteUser)

module.exports = router