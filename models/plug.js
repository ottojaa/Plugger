const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    createdAt: Number,
    title: {
        type: String,
        required: true,
        index: true,
    },
    category: {
        type: String,
        required: true,
        index: true,
    },
    plug: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
        index: true,
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
    },
    pluggers: [{
        type: String
    }]
});
postSchema.index({ title: 'text', details: 'text' }, { unique: true });
const Post = mongoose.model('Post', postSchema);
Post.ensureIndexes(function (err) {
    console.log('That text is indexed')
    if (err) console.log(err)
})
Post.on('index', function (err) {
    if (err) console.error(err); // error occurred during index creation
  })
module.exports = mongoose.model('Post', postSchema);