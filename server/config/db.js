const mongoose = require('mongoose')

mongoose.connect('mongodb://0.0.0.0:27017/decodeBlog').then(() =>{
    console.log('Connected to MongoDB');
}).catch((e) => {
    console.log('Filed to connect to MongoDB');
})