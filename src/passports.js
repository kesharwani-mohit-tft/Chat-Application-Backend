var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var User = require("./models/user");
require("dotenv").config();
var secretKey = process.env.JWT_SECRET;

module.exports = function (passport) {
  //console.log("yes");

  passport.use(
    new JwtStrategy(
      {
        secretOrKey: secretKey,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      function (jwt_payload, next) {
       // console.log("9090", jwt_payload);

        // User.findOne({email:jwt_payload.email},function(err,user){
        User.findOne({ id: jwt_payload._id }, function (err, user) {
          if (err) {
            return next(err, false);
          }
          if (user) {
            next(null, user);
          } else {
            next(null, false);
          }
        });
      }
    )
  );
};
