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
  console.log(searchTerm);
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
  return Post.find()
    .select("time title Post category details fileName")
    .exec()
    .then(post => {
      return post;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

exports.find_by_owner = (currentUser) => {
  return Post.find()
    .where("owner")
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

exports.uploadSingle = (req, res) => {
  createThumbnails(req.file.path, req.file.originalname);
  const Post = new Post({
    time: moment(),
    title: req.body.title,
    path: req.file.path,
    category: req.body.category,
    details: req.body.details,
    fileName: req.file.originalname
  });
  Post.save().then(() => {
    PostController.find_all_posts()
      .then(post => {
        res.send(post);
      })
      .catch(err => {
        console.log("Failed to upload because:", err);
      });
  });
};
