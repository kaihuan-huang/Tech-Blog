const router = require("express").Router();
const { Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

// // localhost:3001/api/comments
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [User],
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // console.log(comments);
    //need to change accroding to handlebar same for line 15
    res.render("createComment", {
      comments,
      post_id: req.params.id,
      layout: "dashboard",
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//create new comment
// localhost:3000/api/comments
router.post("/",  async (req, res) => {
  console.log('Post',req.body)
  try {
    const addComment = await Comment.create({
      comment_text: req.body.comment,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.json(addComment);
  } catch (err) {
    console.log('err',err);
    res.status(500).json(err);
  }
});

// update localhost:3001/api/comment/:id
router.put("/:id", (req, res) => {
  Comment.update(
    {
      comment: req.body.comment,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res
          .status(404)
          .json({ message: "Could not find a comment with this id" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res
          .status(404)
          .json({ message: "Could not find a comment with this id" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
