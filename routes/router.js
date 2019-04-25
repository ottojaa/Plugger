const express = require("express");
const moment = require("moment");
const Post = require("../models/plug.js");
const User = require('../controllers/userController')
const PostController = require("../controllers/PostController");
const UserController = require('../controllers/userController');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const passport = require('passport')
const multer = require("multer");
const sharp = require("sharp");

const storage = multer.diskStorage({
  // Defines the destination for files

  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});




const upload = multer({
  storage: storage
});

//------------ Routes ------------//
router.get("/", (req, res) => {
  res.send("toimi");
});
router.get("/upload", (req, res) => {
  res.send("toimis");
});

router.post("/", upload.single("plug"), async (req, res) => {
  console.log(req.body)
  const post = new Post({
    createdAt: moment(),
    title: req.body.title,
    plug: req.file.path,
    category: req.body.category,
    details: req.body.details,
    fileName: req.file.originalname,
    owner: req.body.owner,
    phone: req.body.phone,
    location: req.body.location,
    email: req.body.email,
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  });
  await post
    .save()
    .then(() => {
      PostController.find_all_posts()
        .then(post => {
          res.send(post);
        })
        .catch(err => {
          res.send("Failed to upload because:", err); // to json
        });
    })
    .catch(err => {
      res.send(err);
    });
});

router.get("/gallery", async (req, res) => {
  await PostController.find_all_posts()
    .then(post => {
      res.send(post);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/posts", async (req, res) => {
  await PostController.find_all_posts().then(post => {
    res.send(post);
  });
});

router.get('/myPlugs/:id', async (req, res) => {
  const searchTerm = req.params.id
  console.log(searchTerm);
  await PostController.find_by_owner(searchTerm)
    .then((post) => {
      res.send(post)
    }).catch(err => {
      console.log(err);
    })
})

router.post("/gallery/:id", upload.single("Post"), (req, res) => {
  console.log(req.body)
  const updatedPost = {
    title: req.body.title,
    details: req.body.details,
    phone: req.body.phone,
    location: req.body.location,
    email: req.body.email,
  };
  Post.findByIdAndUpdate({ _id: req.params.id }, { $set: updatedPost })
    .then(() => {
      res.send({success: 'Succesfully updated.'})
    }).catch((err) => {
      res.send({error: err})
    });
});

router.post('/plug/:id', (req, res) => {
  Post.findOneAndUpdate({ _id: req.body.plugId }, { $push: { pluggers: req.body.userId } })
  .then(() => {
    res.send({success: 'Succesfully added to your plugs'})
  }).catch((err) => {
    res.send({error: err})
  });
})

router.get('/savedplugs/:id', (req, res) => {
  PostController.find_my_plugs({pluggers: { "$in": [req.params.id]}}).then((post) => {
    res.send(post);
  })
})

router.delete("/gallery/:id", (req, res) => {
  Post.findOneAndDelete({ _id: req.params.id }).then(() => {
    PostController.find_all_posts()
      .then(post => {
        res.send(post);
      })
      .catch(err => {
        console.log(err);
      });
  });
});

router.get("/gallery/:id", (req, res) => {
  PostController.find_by_id({ _id: req.params.id }).then(post => {
    res.send(post);
  });
});

router.get("/search/:searchterm", (req, res) => {
  if (req.params.searchterm !== "") {
    PostController.Post_search_all(req.params.searchterm)
      .then(post => {
        res.send(post);
      })
      .catch(err => {
        console.log(err);
      });
  } else if (req.params.searchterm === "") {
    PostController.Post_search_all(req.params.searchterm)
      .then(post => {
        res.send(post);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

//------------- Register - Login - User -------------//

router.post("/authenticate", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      console.log(user)
      return res.send({ error: "Invalid login credentials" })
    }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.send(user)
    });
  })(req, res, next);
});

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    res.clearCookie('connect.sid');
    req.logout();
    res.send('Logged out succesfully')
  });
});

router.get('/user', (req, res) => {
  res.send(req.user)
});

router.post("/register", (req, res) => {
  const password = req.body.password;
  const passwordAgain = req.body.passwordAgain;

  if (password == passwordAgain) {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    });

    User.createUser(newUser, function (err, user) {
      if (err) throw err;
      res.send(user).end()
    });
  } else {
    res.status(500).send("{errors: \"Passwords don't match\"}").end()
  }
});

module.exports = router;
