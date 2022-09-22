// const router = require('express').Router();

// const { Post } = require('../models');

// const withAuth = require('../utils/auth');

// // const sequelize = require('../config/connection');
// //    localhost:3001/dashboard
// router.get('/', withAuth, async (req, res) => {
//     try {
//       // Get all Post and JOIN with user data
//       const postData = await Post.findAll({
//         include: [User,
//           {
//             model: Comment,
//             include: [ User ]

//           },
//         ],
//       });

//       // Serialize data so the template can read it
//       const posts = postData.map((post) => post.get({ plain: true }));

//       // Pass serialized data and session flag into template
//       res.render('homepage', {
//         layout: dashboard,
//         posts,
//         logged_in: req.session.logged_in
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//   module.exports = router;

const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// localhost:3001/dashboard
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// localhost:3001/dashboard/edit/1
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Comment,
        attributes: ["id", "comment", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "Could not find a post with this ID" });
        return;
      }

      const post = dbPostData.get({ plain: true });
      res.render("edit-post", { post, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get("/new", (req, res) => {
  res.render("new-post");
});

module.exports = router;
