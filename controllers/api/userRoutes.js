const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
// const withAuth = require("../../utils/auth");

// get localhost:3001/api/users
router.get("/", (req, res) => {
  //access User modle
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err)
      res.status(400).json(err);
    });
});

// get localhost:3001/api/user/id
router.get("/:id", (req, res) => {
  //access User modle
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "content", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
      {
        model: Post,
        attributes: ["title"],
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "Could not find a user with this id" });
        return;
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//creat user   localhost:3001/api/users
router.post("/", (req, res) => {
  User.create({
    name: req.body.name,
    password: req.body.password,
  })

    .then((dbUserData) => {
      req.session.save(() => {
        req.session.id = dbUserData.id;
        req.session.name = dbUserData.name;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create localhost:3001/api/user/login
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      name: req.body.name,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: "Could not find a user with this name" });
        return;
      }
      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        res
          .status(400)
          .json({ message: "Incorrect password, please try again" });
        return;
      }
      req.session.save(() => {
        req.session.id = dbUserData.id;
        req.session.name = dbUserData.name;
        req.session.loggedIn = true;

        res.json({
          user: dbUserData,
          message: "Login successful... ",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create localhost:3001/api/user/logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }else{
    res.status(404).end();
  }
});

//update localhost:3001/api/user/id
router.put('/id', (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  }).then(dbUserData => {
    console.log('dbUserData[0]',dbUserData[0])
    if (!dbUserData[0]) {
      res.status(404).json( {message: "Could not find a user with this id"});
      return;
    }
    res.json(dbUserData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

//delete localhost:3001/api/user/id
router.delete('/id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbUserData => {
    console.log('dbUserData',dbUserData)
    if (!dbUserData) {
      res.status(404).json( {message: "Could not find a user with this id"});
      return;
    }
    res.json(dbUserData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});
module.exports = router;





//  create new /api/users
//  localhost:3001/api/users
// router.post('/', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// //??
// //create    localhost:3001/api/users/login
// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;
      
//       res.json({ user: userData, message: 'You are now logged in!' });
//     });

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// //create  localhost:3001/api/users/logout
// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

// module.exports = router;
