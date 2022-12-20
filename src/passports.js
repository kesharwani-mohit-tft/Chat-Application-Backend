var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require("./models/mod2")
require("dotenv").config();
var p=process.env.JWT_SECRET


module.exports = function(passport){
    console.log("yes");

    passport.use(
        new JwtStrategy(
            {
                secretOrKey:p ,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            },
            function(jwt_payload,next){
           // console.log("9090",jwt_payload);

            User.findOne({email:jwt_payload.email},function(err,user){
                if(err){
                    return next(err,false);
                }
                if(user){
                    next(null,user);
                }
                else{
                    next(null,false);
                }
            })

                
            }
        )
    )
}


