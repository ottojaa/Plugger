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

router.post("/", upload.single("plug"), async (req, res) => {
   PostController.upload_single_plug(req, res).then((response) => {
     res.send(response);
   })
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

module.exports = router;
