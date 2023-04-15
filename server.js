const express = require('express')
const app = express()

// подключение db.js
require('./server/config/db')

// при указывании в src '/', автоматически оказываться в папке public
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded())

// чтобы файлы ejs читались
app.set('view engine', 'ejs')


app.use(require('./server/pages/router'))
app.use(require('./server/Categories/router'))
app.use(require('./server/auth/router'))


const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})