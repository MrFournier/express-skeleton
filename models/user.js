var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

  local           :{
    email         : String,
    password      : String
  }, 
  facebook        :{
    id            : String,
    token         : String,
    email         : String,
    name          : String
  },
  twitter         :{
    id            : String,
    token         : String,
    displayname   : String,
    username      : String
  },
  google          :{
    id            : String,
    token         : String,
    email         : String,
    name          : String
  }

});

// methods
// generate a hash
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check for valid password
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
};

// create model and expose it to our users
module.exports = mongoose.model('User', userSchema);