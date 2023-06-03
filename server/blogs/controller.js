const blog = require('./blog')
const fs = require('fs')
const path = require('path')
const postDate = require('../../public/js/postDate')
const user = require ('../auth/user')

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
        res.redirect(`/profile/${req.user._id}`)
     }else{
        res.redirect('/profile?error=1')
     }
}

const editBlog = async (req, res) =>{
   if(req.file &&
      req.body.title.length > 2 &&
      req.body.categ.length > 2 &&
      req.body.description.length > 10)
   {
      const thisBlog = await blog.findById(req.body.id)
        fs.unlinkSync(path.join(__dirname + '../../../public/' + thisBlog.image))
        // thisBlog.titleRus = req.body.titleRus;
        // thisBlog.titleEng = req.body.titleEng;
        // thisBlog.year = req.body.year;
        // thisBlog.time = req.body.time;
        // thisBlog.country = req.body.country;
        // thisBlog.genre = req.body.genre;
        // thisBlog.image = `/images/films/${req.file.filename}`
        // thisBlog.save()

        await blog.findByIdAndUpdate(req.body.id, {
            title: req.body.title,
            categ: req.body.categ,
            description: req.body.description,
            image: `/images/blogs/${req.file.filename}`
        })
        res.redirect('/profile/' + req.user._id) 

    }else if(
         !req.file &&
         req.body.title.length > 2 &&
         req.body.categ.length > 2 &&
         req.body.description.length > 10
    ){
        await blog.findByIdAndUpdate(req.body.id, {
            title: req.body.title,
            categ: req.body.categ,
            description: req.body.description,
        })
        res.redirect('/profile/' + req.user._id)
   }else{
      res.redirect(`/editBlog/${req.body.id}?error=1`)
   }
}

const deleteBlog = async (req, res) =>{
   const thisBlog = await blog.findById(req.params.id)
   if(thisBlog){
       fs.unlinkSync(path.join(__dirname + '../../../public/' + thisBlog.image))
       await blog.deleteOne({_id: req.params.id})
       res.status(200).send('ok')
   }else{
       res.status(404).send('NOT FOUND')
   }
}

const addToFav = async (req, res) =>{
   if(req.user){
      const User = await user.findById(req.user.id)
      const findBlog = User.favBlogs.filter(item => item._id == req.body.id);
      if(findBlog.length == 0){
         User.favBlogs.push(req.body.id)
         User.save()
         res.send('Блог добавлен в избранное')
      }else{
         res.send('Блог уже добавлен в избранное')
      }
   }
}

const deleteFromFavourites = async(req, res) =>{
   if(req.user && req.params.id){
      const User = await user.findById(req.user.id)
      const findBlog = User.favBlogs.filter(item => item._id == req.params.id);
      for(let i = 0; i < User.favBlogs.length; i++){
          if(User.favBlogs[i] == req.params.id){
              User.favBlogs.splice(i, 1)
              User.save()
              res.send('Удалено')
          }
      }
      // res.send('Фильм не найден')
  }
}

module.exports = {
   createBlog, 
   editBlog,
   deleteBlog,
   addToFav,
   deleteFromFavourites
}