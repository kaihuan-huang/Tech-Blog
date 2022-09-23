// const router = require('express').Router();

// const { Post, User, Comment } = require('../models');

// const withAuth = require('../utils/auth')

// const sequelize = require('../config/connection')

// router.get('/', async (req, res) => {
//   try {
//     // Get all Post and JOIN with user data
//     const postData = await Post.findAll({
//       include: [User,
//         {
//           model: Comment,
//           include: [ User ]

//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const posts = postData.map((post) => post.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', {
//       posts,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/post/:id', async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       include: [User,
//         {
//           model: Comment,
//           include: [ User ]

//         },
//       ],
//     });

//     const post = postData.get({ plain: true });

//     res.render('singlePost', {
//       post,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //  localhost:3001/login
// router.get('/login', (req, res) => {
//   console.log('homeRoute/login')
//   // If the user is already logged in, redirect the request to anotherroute
//   if (req.session.logged_in) {
//     res.redirect('/dashboard');
//     return;
//   }

//   res.render('login');
// });

// // localhost:3001/signup
// router.get('/signup', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/dashboard');
//     return;
//   }
//   //show signup view
//   res.render('signup');
// });

// module.exports = router;

const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const router = require("express").Router();

// localhost:3001/
router.get("/", (req, res) => {
  Post.findAll({
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
      res.render("homepage", { posts, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//  localhost:3001/login
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// localhost:3001/signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

//??
//localhost:3001/post/2
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "content", "title", "created_at"],
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
      if (!dbPostData) {
        res.status(404).json({ message: "Could not find a user with this ID" });
        return;
      }
      const post = dbPostData.get({ plain: true });
      console.log(post);
      res.render("singlePost", { post, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//??
//localhost:3001/posts-comments
router.get("/posts-comments", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "content", "title", "created_at"],
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
      if (!dbPostData) {
        res.status(404).json({ message: "Could not find a post with this ID" });
        return;
      }
      const post = dbPostData.get({ plain: true });

      res.render("comments", { post, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
