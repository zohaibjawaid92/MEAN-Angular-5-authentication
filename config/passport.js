const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
const opts = {};
//opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("lets see what we get" + JSON.stringify(jwt_payload));
    User.getUserById(jwt_payload.data._id, function(err, user) {
    
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));   

}





