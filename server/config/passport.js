const passport = require('passport')
const user = require('../auth/user')
const bcrypt = require('bcrypt')
const localStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// clientID : 449365698426-7qkidn5ra0m6i7ttn0hvcerp3ib5ghd5.apps.googleusercontent.com
// clientSecret : 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

passport.use( new localStrategy(
    {
        usernameField: 'email'
    }, 
    function (email, password, done){
        user.findOne({email}).then(user =>{
            bcrypt.compare(password, user.password, function(err, result) {
                if(err){
                    return done(err)
                }
                if(result){
                    if(user.isBlocked){
                        return done()
                    }
                    return done(null, user)
                }
                
            });
        }).catch((e) =>{
            return done(e)
        })
    }
))


passport.use(new GoogleStrategy({
    clientID: '449365698426-7qkidn5ra0m6i7ttn0hvcerp3ib5ghd5.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8000/api/auth/google",
    scope: ['openid', 'email', 'profile']
  },
  async function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    const newUser = await new user({
        googleId: profile.id,
        fullName: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value
    }).save()
    return cb(null, newUser);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user._id)
})

passport.deserializeUser(function (id, done) {
    user.findById(id).then((user, err) =>{
        done(err, user)
    })
})