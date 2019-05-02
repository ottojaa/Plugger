const mongoose = require('mongoose');
const moment = require('moment');
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    timeCreated: {
        type: Number,
        default: moment(),
    },
    username:  {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
      type: Number,
      required: true,
    }, 
    location: {
      type: String,
      required: true,
    }
    
});

userSchema.set('toJSON', { virtuals: true });

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}
module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
  }
  
  module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
  }
  
  module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if(err) throw err;
      callback(null, isMatch);
    });
  }
