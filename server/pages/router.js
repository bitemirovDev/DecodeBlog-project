const express = require('express')
const router = express.Router()
const Categories = require('../Categories/Categories')

router.get('/', async(req, res) => {
    const allCategories = await Categories.find()
    res.render('index', {categories: allCategories})
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/signIn', (req, res) => {
    res.render('signIn')
})

router.get('/myAccount', (req, res) => {
    res.render('myAccount')
})

router.get('/newBlog', async(req, res) => {
    const allCategories = await Categories.find()
    res.render('newBlog', {categories: allCategories})
})

router.get('/myAccount/inPost', async(req, res) => {
    const allCategories = await Categories.find()
    res.render('inPost', {categories: allCategories})
})

router.get('/inPostWL',async(req, res) => {
    const allCategories = await Categories.find()
    res.render('inPostWL', {categories: allCategories})
})

module.exports = router