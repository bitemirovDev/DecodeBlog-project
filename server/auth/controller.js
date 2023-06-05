const user = require('./user')
const bcrypt = require('bcrypt')
const passport = require('passport')


const signUp = async (req, res) => {
    if( req.body.email.length <= 0 && 
        req.body.fullName.length <= 0 && 
        req.body.password.length <= 0 &&
        req.body.re_password.length <= 0
    ){
        res.redirect('/register?error=1')
    }
    else if(req.body.password !== req.body.re_password){
        res.redirect('/register?error=2')
    }

    const findUser = await user.findOne({email: req.body.email}).count()

    if(findUser){
        res.redirect('/register?error=3')
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            new user({
                email: req.body.email,
                fullName: req.body.fullName,
                isAdmin: false,
                password: hash,
                image: "/images/users/default-image.jpg",
                description: '',
                isBlocked: false
            }).save()
            res.redirect('/signIn')
        });
    })
}

const signIn = (req, res) => {
    if(req.user.isAdmin){
        res.redirect(`/admin/${req.user._id}`)
    }else{
        res.redirect(`/profile/${req.user._id}`)
    }
    
}

const signOut = (req, res) => {
    req.logout(function (err){
        if(err){
            return next(err)
        }
        res.redirect('/')
    })
}

module.exports = {
    signUp, 
    signIn,
    signOut
}