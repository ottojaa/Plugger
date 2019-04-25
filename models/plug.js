const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    createdAt: Number,
    title:  {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    plug: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true
    },
    fileName: {
        type: String
    },
    owner: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
});

postSchema.index({ title: 'text', category: 1, details: 'text'});

module.exports =  mongoose.model('Post', postSchema);