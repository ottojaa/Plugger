const express = require('express');
const moment = require('moment');
const Post = require('../models/plug.js');
const PostController = require('../controllers/PostController');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');

const storage = multer.diskStorage({ // Defines the destination for files

    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
});

//------------ Routes ------------//
router.get('/', (req, res) => {
    res.send('toimi');
});
router.get('/upload', (req, res) => {
    res.send('toimis');
});

router.post('/', upload.single('plug'), async (req, res) => {

    /* await createThumbnails(req.file.path, req.file.originalname); */
    const post = new Post({
        createdAt: moment(),
        title: req.body.title,
        plug: req.file.path,
        category: req.body.category,
        details: req.body.details,
        fileName: req.file.originalname
    });
    await post.save().then(() => {
        PostController.find_all_posts()
            .then((post) => {
                res.send(post);
            }).catch((err) => {
                res.send('Failed to upload because:', err);
            })
    }).catch((err) => {
        res.send(err);
    });
});

router.get('/gallery', async (req, res) => {
    await PostController.find_all_posts()
        .then((post) => {
            res.send(post);
        }).catch((err) => {
            console.log(err);
        });
});

router.get('/posts', async (req, res) => {
    await PostController.find_all_posts()
        .then((post) => {
            res.send(post);
        });
});

router.post('/gallery/:id', upload.single('Post'), (req, res) => {
    const updatedPost = {
        title: req.body.title,
        details: req.body.details,
        category: req.body.category
    };
    Post.findByIdAndUpdate({ _id: req.params.id }, { $set: updatedPost }).then(() => {
        PostController.find_all_posts()
            .then((Post) => {
                res.send(Post);
            })
    });
});

router.delete('/gallery/:id', (req, res) => {
    console.log(req.params.id);
    Post.findOneAndDelete({ _id: req.params.id }).then(() => {
        PostController.find_all_posts()
            .then((post) => {
                res.send(post);
            }).catch((err) => {
                console.log(err);
            })
    });
});

router.get('/gallery/:id', (req, res) => {
    PostController.find_by_id({ _id: req.params.id })
        .then((post) => {
            res.send(post);
        });
});


router.post('/search', upload.single('Post'), (req, res) => {
    if (req.body.searchterm !== '' && req.body.searchBy === 'all') {
        PostController.Post_search_all(req.body.searchterm)
            .then((post) => {
                res.send(post);
            }).catch((err) => {
                console.log(err);
            });
    } else if (req.body.searchterm === '') {
        PostController.Post_search_all(req.body.searchterm)
            .then((post) => {
                res.send(post);
            }).catch((err) => {
                console.log(err);
            });
    } else if (req.body.searchterm !== '' && req.body.searchby !== 'all') {
        PostController.Post_search_by_category(req.body.searchterm, req.body.searchby)
            .then((post) => {
                res.send(post);
            }).catch((err) => {
                console.log(err);
            });
    }
});

//------------- Register - Login - User -------------//
router.get('/register', upload.single('Post'), (req, res) => {
    res.send('haloja');
});

//------------------ Functions --------------------//

function createThumbnails(path, name) {
    let width = 200;
    let height = 112;
    for (let i = 1; i <= 2; i++) {
        let filePath = 'uploads/small/small_';
        if (i === 2) {
            filePath = 'uploads/mid/mid_';
        }
        sharp(path)
            .resize(width * i, height * i)
            .toFile(filePath + name, (err, info) => {
                console.log(err, info);
            });
    }
}


module.exports = router;