const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');


//to Post  localhost:3001/api/posts  
router.get("/", async (req, res) => {
  try {
     // Get all data
     const postData = await Post.findAll({
      include: [User],
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
      res.render("allPost", {
      posts,
      layouts: "dashboard",
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create new post
//   localhost:3001/api/posts
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update  post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const [postData] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (postData > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete single post    /post/id

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

// const router = require("express").Router();
// const { Post, User, Comment } = require("../../models");
// const sequelize = require("../../config/connection");
// const withAuth = require("../../utils/auth");

// // get  localhost:3001/api/posts
// router.get("/", (req, res) => {
//   console.log("localhost:3001/api/posts");
//   Post.findAll({
//     attributes: ["id", "title", "content", "created_at"],
//     order: [["created_at", "DESC"]],
//     include: [
//       {
//         model: User,
//         attributes: ["name"],
//       },
//       {
//         model: Comment,
//         attributes: ["id", "comment", "post_id", "user_id", "created_at"],
//         include: {
//           model: User,
//           attributes: ["name"],
//         },
//       },
//     ],
//   })
//     .then((dbPostData) => res.json(dbPostData.reverse()))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// // get  localhost:3001/api/posts/:id
// router.get("/:id", (req, res) => {
//   Post.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ["id", "content", "title", "created_at"],
//     include: [
//       {
//         model: User,
//         attributes: ["name"],
//       },
//       {
//         model: Comment,
//         attributes: ["id", "comment", "post_id", "user_id", "created_at"],
//         include: {
//           model: User,
//           attributes: ["name"],
//         },
//       },
//     ],
//   })
//     .then((dbPostData) => {
//       if (!dbPostData) {
//         res.status(404).json({ message: "Could not find a post with this id" });
//         return;
//       }
//       res.json(dbPostData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// // create localhost:3001/api/posts
// /*
// {
// 	  "title": "Hiiii",
//     "content":"Test",
//     "user_id": 4
// }
// */
// router.post("/", withAuth, (req, res) => {
//   Post.create({
//     title: req.body.title,
//     content: req.body.content,
//     user_id: req.session.user_id,
//   })
//     .then((dbPostData) => res.json(dbPostData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// // update localhost:3001/api/posts
// router.put("/:id", withAuth, (req, res) => {
//   Post.update(
//     {
//       title: req.body.title,
//       content: req.body.content,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((dbPostData) => {
//       if (!dbPostData) {
//         res.status(404).json({ message: "Could not find a post with this id" });
//         return;
//       }
//       res.json(dbPostData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// // delete  localhost:3001/api/posts/:id
// router.delete("/:id", withAuth, (req, res) => {
//   Post.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbPostData) => {
//       if (!dbPostData) {
//         res.status(404).json({ message: "Could not find a post with this id" });
//         return;
//       }
//       res.json(dbPostData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// module.exports = router;
