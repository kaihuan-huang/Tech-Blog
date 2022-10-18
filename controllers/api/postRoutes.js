const router = require('express').Router();
const { Post} = require('../../models');
const withAuth = require('../../utils/auth');

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

router.put('/like', withAuth, async (req, res) => {
  console.log('/like')

  try {
    
    const newPost = await Post.update({like: 1}, { where: { id: req.body.id  }});

    res.status(200).json(newPost);
  } catch (err) {
    console.log('err',err)
    
    res.status(400).json(err);
  }
});
  module.exports = router;

  