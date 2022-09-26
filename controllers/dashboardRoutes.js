const router = require('express').Router();

const { Post, User, Comment } = require('../models');

const withAuth = require('../utils/auth');

// const sequelize = require('../config/connection');
//    localhost:3001/dashboard
router.get('/', withAuth, async (req, res) => {
    try {
      // Get all Post and JOIN with user data
      const postData = await Post.findAll({
        where: { user_id: req.session.user_id },
        include: [User,
          {
            model: Comment,
            include: [ User ]

          },
        ],
      });

      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));

      // Pass serialized data and session flag into template
      res.render('allpost', {
        layout: "dashboard",
        posts,
        logged_in: true,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/new", withAuth, (req, res) => {
    res.render("newposts", {
      layout: "dashboard",
    });
  });
  
  router.get("/edit/:id", withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id);
      if (postData) {
        const post = postData.get({ plain: true });
        console.log(post);
        res.render("editposts", {
          layout: "dashboard",
          post,
        });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.redirect("login");
    }
  });

  module.exports = router;

