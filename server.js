const express = require('express')

const app = express()

const PORT = 8000;

// при указывании в src '/', автоматически оказываться в папке public
app.use(express.static(__dirname + '/public'))

// чтобы файлы ejs читались
app.set('view engine', 'ejs')

// рендер страницы '/' (index.ejs)
app.get('/', (req, res) => {
    res.render('index')
})

// рендер страницы '/register' (register.ejs)
app.get('/register', (req, res) => {
    res.render('register')
})

// рендер страницы '/singIn' (singIn.ejs)
app.get('/signIn', (req, res) => {
    res.render('signIn')
})

// рендер страницы '/myAccount' (myAccount.ejs)
app.get('/myAccount', (req, res) => {
    res.render('myAccount')
})

// рендер страницы '/newBlog' (newBlog.ejs)
app.get('/newBlog', (req, res) => {
    res.render('newBlog')
})

// рендер страницы '/myAccount/inPost' (inPost.ejs)
app.get('/myAccount/inPost', (req, res) => {
    res.render('inPost')
})

// рендер страницы '/inPostWL' (inPostWL.ejs)
app.get('/inPostWL', (req, res) => {
    res.render('inPostWL')
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})