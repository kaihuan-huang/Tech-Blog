const router = require('express').Router();

const { Post, User, Comment } = require('../models');

const withAuth = require('../utils/auth')

const sequelize = require('../config/connection')

router.get('/', async (req, res) => {
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
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [User,
        {
          model: Comment,
          include: [ User ]
          
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('singlePost', {
      post,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//  localhost:3001/login
router.get('/login', (req, res) => {
  console.log('homeRoute/login')
  // If the user is already logged in, redirect the request to anotherroute
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// localhost:3001/signup
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  //show signup view
  res.render('signup');
});

module.exports = router;