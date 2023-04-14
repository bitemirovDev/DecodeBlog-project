const express = require('express')
const app = express()

// подключение db.js
require('./server/config/db')

const PORT = 8000;

// подключение router.js  (pages)
app.use(require('./server/pages/router'))

// подключение router.js  (Categories)
app.use(require('./server/Categories/router'))

// при указывании в src '/', автоматически оказываться в папке public
app.use(express.static(__dirname + '/public'))

// чтобы файлы ejs читались
app.set('view engine', 'ejs')

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})