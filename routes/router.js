const express = require("express");
const moment = require("moment");
const Post = require("../models/plug.js");
const User = require("../models/user.js");
const PostController = require("../controllers/postcontroller.js");
const router = express.Router();
const passport = require('passport')
const multer = require("multer");

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
  res.send("Api toimii");
});
router.get("/upload", (req, res) => {
  res.send("toimis");
});

router.post("/", upload.single("plug"), async (req, res) => {
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
  if (!req.body || !req.file) {
    return res.send({ error: 'Could not upload your plug. Please fill all fields correctly' });
  } else {
    await post
      .save()
      .then(() => {
        return res.send({ status: 'Uploaded succesfully' })
      })
      .catch(err => {
        return res.send({ error: err });
      });
  }
});

router.get("/gallery", async (req, res) => {
  await PostController.find_all_posts()
    .then(post => {
      res.send(post);
    })
    .catch(err => {
      res.send({ error: 'Could not find any posts', err })
    });
});

router.get("/posts", async (req, res) => {
  await PostController.find_all_posts().then(post => {
    res.send(post);
  });
});

router.get('/myPlugs/:id', async (req, res) => {
  const searchTerm = req.params.id
  await PostController.find_by_owner(searchTerm)
    .then(post => {
      res.send(post)
    }).catch(err => {
      res.send({ error: 'Could not find plugs for this user' })
    })
})

router.post("/gallery/:id", upload.single("Post"), (req, res) => {
  const updatedPost = {
    title: req.body.title,
    details: req.body.details,
    phone: req.body.phone,
    location: req.body.location,
    email: req.body.email,
  };
  Post.findByIdAndUpdate({ _id: req.params.id }, { $set: updatedPost })
    .then(() => {
      res.send({ success: 'Succesfully updated.' })
    }).catch((err) => {
      res.send({ error: err })
    });
});

router.post('/plug/:id', (req, res) => {
  Post.findOneAndUpdate({ _id: req.body.plugId }, { $push: { pluggers: req.body.userId } })
    .then(() => {
      res.send({ success: 'Succesfully added to your plugs' })
    }).catch((err) => {
      res.send({ error: err })
    });
})

router.get('/savedplugs/:id', (req, res) => {
  PostController.find_my_plugs({ pluggers: { "$in": [req.params.id] } })
    .then((post) => {
      res.send(post);
    }).catch(err => {
      res.send({ error: 'Could not find plugs for this user because', err })
    })
})

router.delete("/gallery/:id", (req, res) => {
  Post.findOneAndDelete({ _id: req.params.id }).then(() => {
    PostController.find_all_posts()
      .then(post => {
        res.send(post);
      })
      .catch(err => {
        res.send({ error: 'Could not delete because', err })
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
  } else {
    res.send({ error: 'Search failed' })
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
      lastname: req.body.lastname,
      phone: req.body.phone,
      location: req.body.location
    });

    User.createUser(newUser, (err, user) => {
      if (err) {
        res.send({ error: 'Could not complete registration' })
      } else {
        res.send(user).end()
      }
    });
  } else {
    res.send({error: 'Passwords did not match.'})
  }
});

module.exports = router;
