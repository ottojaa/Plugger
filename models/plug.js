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
    }
});

postSchema.index({ title: 'text', category: 1, details: 'text'});

module.exports =  mongoose.model('Post', postSchema);