const router = require("express").Router();
const { Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

// // localhost:3001/api/comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [User],
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    console.log(comments);
    //need to change accroding to handlebar same for line 15
    res.render("createComment", {
      comments,
      layout: "dashboard",
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//create new comment
// localhost:3001/api/comments
router.post("/", withAuth, async (req, res) => {
  try {
    const addComment = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.json(addComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // update localhost:3001/api/comment/:id
// router.put("/:id", withAuth, (req, res) => {
//   Comment.update(
//     {
//       comment: req.body.comment,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((dbCommentData) => {
//       if (!dbCommentData) {
//         res
//           .status(404)
//           .json({ message: "Could not find a comment with this id" });
//         return;
//       }
//       res.json(dbCommentData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.delete("/:id", withAuth, (req, res) => {
//   Comment.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbCommentData) => {
//       if (!dbCommentData) {
//         res
//           .status(404)
//           .json({ message: "Could not find a comment with this id" });
//         return;
//       }
//       res.json(dbCommentData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
module.exports = router;
