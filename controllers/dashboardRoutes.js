const router = require('express').Router();

const { Post } = require('../models');

const withAuth = require('../utils/auth');

// const sequelize = require('../config/connection');
//    to  /dashboard
router.get('/', withAuth, async (req, res) => {
    try {
      // Get all Post and JOIN with user data
      const postData = await Post.findAll({
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
      res.render('homepage', { 
        layout: dashboard,
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
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
  
  //     res.render('post', {
  //       ...post,
  //       logged_in: req.session.logged_in
  //     });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });
  
  module.exports = router;