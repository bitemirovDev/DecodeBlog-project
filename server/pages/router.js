const express = require('express')
const router = express.Router()
const Categories = require('../Categories/Categories')
const user = require('../auth/user')
const blog = require('../blogs/blog')
const comments = require('../comments/comments')

router.get('/', async(req, res) => {
    // фильтр по категориям
    const options = {}
    const category = await Categories.findOne({key: req.query.categ})
    if(category){
        options.categ = category._id
        res.locals.categ = req.query.categ
    }
    // 

    //pageination
    let page = 0
    const limit = 3
    if(req.query.page && req.query.page > 0){
        page = req.query.page
    }
    // 

    // search
    if(req.query.search && req.query.search.length > 0){
        options.$or = [
            {
                title: new RegExp(req.query.search, 'i')
            }
        ]

        res.locals.search = req.query.search
    }
    // 

    const totalBlogs = await blog.count(options)
    const allCategories = await Categories.find()
    const blogs = await blog.find(options).limit(limit).skip(page * limit).populate('categ').populate('author')
    const User = req.user ? await user.findById(req.user._id) : {}
    res.render('index', {categories: allCategories, user: User, blogs, pages: Math.ceil(totalBlogs / limit)})
})

router.get('/register', (req, res) => {
    res.render('register', {user: req.user ? req.user : {}})
})

router.get('/signIn', (req, res) => {
    res.render('signIn', {user: req.user ? req.user : {}})
})

router.get('/profile/:id', async (req, res) => {
    const User = await user.findById(req.params.id)
    const blogs = await blog.find().populate('categ').populate('author')
    if(User){
        res.render('profile', {user: User, loginUser: req.user, blogs})
    }
    else{
        res.redirect('/notFound')
    }
})

router.get('/newBlog', async(req, res) => {
    const allCategories = await Categories.find()
    res.render('newBlog', {categories: allCategories, user: req.user ? req.user : {}})
})

router.get('/favourites/:id', async(req, res) => {
    const User = await user.findById(req.params.id).populate('favBlogs')
    .populate({path: 'favBlogs', populate: {path: 'author'}})
    .populate({path: 'favBlogs', populate: {path: 'categ'}})
    const allCategories = await Categories.find()
    if(User){
        res.render('favourites', {categories: allCategories, user: User, loginUser: req.user})
    }
    else{
        res.redirect('/notFound')
    }
})

router.get('/editBlog/:id', async(req, res) => {
    const allCategories = await Categories.find()
    const thisBlog = await blog.findById(req.params.id)
    res.render('editBlog', {categories: allCategories, user: req.user ? req.user : {}, thisBlog})
})

router.get('/editProfile/:id', async(req, res) => {
    const User = await user.findById(req.params.id)
    res.render('editProfile', {user: req.user ? req.user : {}, User})
})          

router.get('/inPost/:id', async(req, res) => {
    const Comments = await comments.find({blogID: req.params.id}).populate('authorID')
    const allCategories = await Categories.find()
    const thisBlog = await blog.findById(req.params.id).populate('categ').populate('author')
    const CommentsCount = await comments.find({blogID: req.params.id}).count()
    res.render('inPost', {categories: allCategories, user: req.user ? req.user : {}, thisBlog, Comments, CommentsCount})
})

router.get('/notFound', (req, res) =>{
    res.render('notFound', {user: req.user ? req.user : {}})
})

router.get('/admin/:id', async (req, res) => {
    const User = await user.findById(req.params.id)
    const users = await user.find()
    res.render('admin', {loginUser: req.user, user: User, users})
})

module.exports = router