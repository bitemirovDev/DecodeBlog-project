const blog = require('./blog')
const postDate = require('../../public/js/postDate')
const createBlog = async (req, res) =>{
    if(req.file &&
        req.body.title.length > 2 &&
        req.body.categ.length > 2 &&
        req.body.description.length > 10)
     {
        await new blog({
        title: req.body.title,
        categ: req.body.categ,
        image: `/images/blogs/${req.file.filename}`,
        description: req.body.description,
        date: postDate,
        author: req.user._id
        }).save()
        res.redirect(`/myAccount/${req.user._id}`)
     }else{
        res.redirect('/myAccount?error=1')
     }
}

module.exports = {createBlog}