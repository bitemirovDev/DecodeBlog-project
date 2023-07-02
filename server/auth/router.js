const express = require('express')
const passport = require('passport')
const router = express.Router()
const {signUp, signIn, signOut} = require('./controller')
const createAdmin = require('../admin/seed')

router.post('/api/signup', signUp)
router.post('/api/signin', passport.authenticate('local', {failureRedirect: '/signIn?error=1'}), signIn)
router.get('/api/signout', signOut)
router.get('/api/auth/google', passport.authenticate('google'), (req, res) =>{
    res.redirect('/profile/' + req.user._id)
})

router.get('/api/auth/github', passport.authenticate('github'), (req, res) =>{
    res.redirect('/profile/' + req.user._id)
})

createAdmin()

module.exports = router