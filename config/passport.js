var LocalStrategy = require('passport-local').Strategy;

// Load the user model
var User = require('../models/user');

// expose this function to our app using module.exports 
module.exports = function(passport){

  // sessions set up required for persistent login sessions
  // passport needs abalility to serialize and unserialize users
  
  // serialize the user (login)
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  // deserialize the user (logout)
  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });

  // name startegies used since we have login and signup

  //=======================================================
  // Strategy for signup ==================================
  //=======================================================
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email', // override default of username to make it use email
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback 
  },
  function(req, email, password, done){

    // asynchornous
    // User.findOne won't fire unless data is sent back
    process.nextTick(function(){

      // find a user whose email is the same as the forms email
      // checking to see if the user trying to signup already exists
      User.findOne({ 'local.email' : email }, function(err, user){
        if (err){
          return done(err);
        }

        // check to see if theres already a user with that email
        if (user){
          return done(null, false, req.flash('signupMessage', 'That email is already in use!'))
        } else{
          
          // create user if they don't already exist
          var newUser = new User();


          // set user's local credentials 
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          // save the user
          newUser.save(function(err){
            if (err){
              throw err;
            }

            return done(null, newUser);
          });
        }
      });
    });
  }));

  //=======================================================
  // Strategy for login ===================================
  //=======================================================
  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
    function(req, email, password, done){
      User.findOne({ 'local.email' : email }, function(err, user){
        if (err){
          return done(err);
        }

        if (!user){
          return done(null, false, req.flash('loginMessage', 'No user found'));
        }

        if(!user.validPassword(password)){
          return done(nul, false req.fasle('loginMessage', 'Inncorrect password.'));
        }

        return done(null, user);
      });
  }));
};


