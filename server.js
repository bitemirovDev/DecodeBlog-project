const express = require('express')
const app = express()

const session = require('express-session')
const mongooseStore = require('connect-mongo')
const passport = require('passport')

const user = require('./server/auth/user')

require('./server/config/db')
require('./server/config/passport')

// при указывании в src '/', автоматически оказываться в папке public
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded())
app.use(session({
    name: 'decodeBlog.session',
    secret: 'keyboard cat',
    maxAge: 1000 * 60 * 60 * 7,
    resave: false,
    store: mongooseStore.create({
        mongoUrl: 'mongodb://0.0.0.0:27017'
    })
}))

app.use(passport.initialize())
app.use(passport.session())

// чтобы файлы ejs читались
app.set('view engine', 'ejs')


app.use(require('./server/pages/router'))
app.use(require('./server/Categories/router'))
app.use(require('./server/auth/router'))


const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})