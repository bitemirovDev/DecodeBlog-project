const user = require('../auth/user')
const bcrypt = require('bcrypt')

async function createAdmin () {
    const findAdmin = await user.findOne({isAdmin : true}).count()
    if(findAdmin == 0){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash('1', salt, function(err, hash) {
                new user({
                    fullName: 'Admin',
                    email: 'master@mail.ru',
                    isAdmin: true,
                    password: hash,
                    description: '',
                    image: "/images/users/admin-image.jpg"
                }).save()
            });
        })
    }
}

module.exports = createAdmin