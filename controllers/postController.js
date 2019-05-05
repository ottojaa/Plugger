const Post = require("../models/plug");

exports.Post_search_by_category = (searchTerm, searchCategory) => {
  return Post.find({ $text: { $search: searchTerm } })
    .where("category")
    .equals(searchCategory)
    .then(post => {
      return post;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

exports.Post_search_all = searchTerm => {
  return Post.find(
    { $text: { $search: searchTerm } },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .then(post => {
      return post;
    })
    .catch(err => {
      return err;
    });
};

exports.find_all_posts = () => {
  return Post.find({})
    .then(post => {
      return post;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

exports.find_by_owner = (currentUser) => {
  console.log(currentUser);
  return Post.find()
    .where("username")
    .equals(currentUser)
    .then(post => {
      return post;
    })
    .catch(err => {
      return { error: err };
    });
};

exports.find_by_id = (id) => {
  return Post.findById(id)
    .then(post => {
      return post;
    })
    .catch(err => {
      return err;
    });
};
exports.find_my_plugs = (id) => {
  return Post.find(id)
    .then(post => {
      return post;
    })
    .catch(err => {
      return err;
    })
}

exports.get_all_Posts = () => {
  return Post.find()
    .select("time title Post category details fileName")
    .exec()
    .then(post => {
      return post;
    })
    .catch(err => {
      console.log(err);
    });
};

exports.upload_single_plug = (req, res) => {
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
        return { status: 'Uploaded succesfully' }
      })
      .catch(err => {
        return { error: err };
      });
  }
}; 
