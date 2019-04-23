const express = require("express");
const moment = require("moment");
const Post = require("../models/plug.js");
const PostController = require("../controllers/PostController");
const router = express.Router();
const passport = require('passport')
const multer = require("multer");
const User = require('../models/user');
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
    email: req.body.email
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
  console.log(req.session.username);
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

router.post("/gallery/:id", upload.single("Post"), (req, res) => {
  const updatedPost = {
    title: req.body.title,
    details: req.body.details,
    category: req.body.category
  };
  Post.findByIdAndUpdate({ _id: req.params.id }, { $set: updatedPost }).then(
    () => {
      PostController.find_all_posts().then(Post => {
        res.send(Post);
      });
    }
  );
});

router.delete("/gallery/:id", (req, res) => {
  console.log(req.params.id);
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
  console.log(req.params.searchterm)
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
  console.log(req.body)
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      console.log(user)
      return res.send({error: "Invalid login credentials"})
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log(user)
      return res.send(user)
    });
  })(req, res, next);
});
router.get('/logout', function(req, res) {
  req.logout();
  return res.send("Logged out succesfully");
});

router.get('/user', (req, res) => {
  function isAuthenticated(req, res, next) {
    console.log(req.user)
    if (req.user) {
      return next();
    }
    res.redirect('/login');
  }
  return res.send(req.user);
});

router.post("/register", (req, res) => {
  const password = req.body.password;
  const passwordAgain = req.body.passwordAgain;

  if (password == passwordAgain){
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      res.send(user).end()
    });
  } else{
    res.status(500).send("{errors: \"Passwords don't match\"}").end()
  }
});

module.exports = router;
