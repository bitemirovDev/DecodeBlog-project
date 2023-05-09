const isAuth = (req, res, next) =>{
    if(req.user){
        next()
    }else{
        res.status(401).send('Пользователь не зарегистрирован')
    }
}


module.exports = isAuth