const router = require("express").Router();

//import from models folder
// const { Post, User } = require("../models");

//Import cutom middleware

// The homeRoute no need withAuth, all the user can access in info  from homeRoute
//let homepage.handelbars display in layouts: "main", the address is localhost:3001/
router.get("/", async (req, res) => {
  try {
      res.render("homepage", {
      layouts: "main",
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

//let about.handelbars display in layouts: "main", the address is localhost:3001/about
router.get("/about", async (req, res) => {
  try {
       res.render("about", {
      layouts: "main",
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//to display ??
router.get("api/posts", async (req, res) => {
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


module.exports = router;

