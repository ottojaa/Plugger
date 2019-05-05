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

module.exports = mongoose.model('User', userSchema);

