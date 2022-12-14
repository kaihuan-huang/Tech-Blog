const router = require('express').Router();
// const { Model } = require('sequelize');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


//to PostAll  localhost:3001/api/posts 
//let allPost.handelbars display in layouts: "main"
router.get("/", async (req, res) => {
  console.log('postRoute =========')
  try {
     // Get all data
     console.log('insideTry =========')
     const postData = await Post.findAll({
      include: [User, Comment]
    });
    console.log('postData',postData);
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
      res.render("allPost", {
      posts,
      layouts: "dashboard",
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//http://localhost:3000/posts/id
router.get("/:id",withAuth, async (req, res) => {
  try {
    console.log('getPost');
    const postData = await Post.findByPk(req.params.id, {
      include: [
        Comment
      ]
    });
    if(postData) {
      const post = postData.get({ plain: true })
      //console.log('post', post);
      res.render("singlePost", {
        post,
        layouts: "dashboard",
      //  logged_in: req.session.logged_in,
      });
    }

  }
  catch (err) {
    console.log('err',err)
    res.status(500).json(err);
  }
});

router.put('/like', async (req, res) => {
  console.log('/like')

  try {
    
    const newPost = await Post.update({like: req.body.like}, { where: { id: req.body.id  }});

    res.status(200).json(newPost);
   
  } catch (err) {
    console.log('err',err)
    
    res.status(400).json(err);
  }
});

module.exports = router;
