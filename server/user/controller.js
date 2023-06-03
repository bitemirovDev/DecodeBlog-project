const user = require('../auth/user')
const fs = require('fs')
const path = require('path')

const addToFav = (req, res) =>{
    console.log(req.body);
}

const editUser = async (req, res) =>{
    if(req.file &&
       req.body.fullName.length > 2 &&
       req.body.description.length > 5
    ){
        const thisUser = await user.findById(req.user.id)
        await user.findByIdAndUpdate(req.user.id, {
            fullName: req.body.fullName,
            description: req.body.description,
            image: `/images/users/${req.file.filename}`
        })

        if(req.user.isAdmin){
            res.redirect('/admin/' + req.user.id)  
        }else{
            res.redirect('/profile/' + req.user.id)
        }

    }else if(
        !req.file &&
        req.body.fullName.length > 2 &&
        req.body.description.length > 5
    ){
        await user.findByIdAndUpdate(req.user.id, {
            fullName: req.body.fullName,
            description: req.body.description,
        })

        if(req.user.isAdmin){
            res.redirect('/admin/' + req.user.id)  
        }else{
            res.redirect('/profile/' + req.user.id)
        }

    }else{
        res.redirect(`/editProfile/${req.user.id}?error=1`)
    }
}

module.exports = {
    addToFav,
    editUser
}