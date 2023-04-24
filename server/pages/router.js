const express = require('express')
const router = express.Router()
const Categories = require('../Categories/Categories')
const user = require('../auth/user')

router.get('/', async(req, res) => {
    const allCategories = await Categories.find()
    res.render('index', {categories: allCategories, user: req.user ? req.user : {}})
})

router.get('/register', (req, res) => {
    res.render('register', {user: req.user ? req.user : {}})
})

router.get('/signIn', (req, res) => {
    res.render('signIn', {user: req.user ? req.user : {}})
})

router.get('/myAccount/:id', async (req, res) => {
    const User = await user.findById(req.params.id)
    if(user){
        res.render('myAccount', {user: User, loginUser: req.user})
    }
    else{
        res.redirect('/notFound')
    }
})

router.get('/newBlog', async(req, res) => {
    const allCategories = await Categories.find()
    res.render('newBlog', {categories: allCategories, user: req.user ? req.user : {}})
})

router.get('/inPost', async(req, res) => {
    const allCategories = await Categories.find()
    if(user){
        res.render('inPost', {categories: allCategories, user: req.user ? req.user : {}})
    }
    else{
        res.redirect('/inPostWL')
    }
})

router.get('/inPostWL',async(req, res) => {
    const allCategories = await Categories.find()
    res.render('inPostWL', {categories: allCategories, user: req.user ? req.user : {}})
})

router.get('/notFound', (req, res) =>{
    res.render('notFound', {user: req.user ? req.user : {}})
})

router.get('/admin/:id', async (req, res) => {
    const User = await user.findById(req.params.id)
    res.render('admin', {loginUser: req.user, user: User})
})

module.exports = router