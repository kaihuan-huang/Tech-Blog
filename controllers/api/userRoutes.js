const router = require("express").Router();
const { User } = require("../../models");
// const withAuth = require("../../utils/auth");

//creat new user   localhost:3001/api/users
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    console.log("userData",userData)
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
    
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// create localhost:3001/api/user/login
router.post("/login", async (req, res) => {
  console.log('req.body',req.body)
  try {
    const userData = await User.findOne({
      where: {
        useremail: req.body.useremail,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again" });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.useremail = userData.useremail;
      req.session.logged_in = true;

      console.log("userData", userData);
      res.status(200).json({ user: userData, message: "You are logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create localhost:3001/api/user/logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }else{
    res.status(404).end();
  }
});

// //update localhost:3001/api/user/id
// router.put('/id', (req, res) => {
//   User.update(req.body, {
//     individualHooks: true,
//     where: {
//       id: req.params.id
//     }
//   }).then(dbUserData => {
//     console.log('dbUserData[0]',dbUserData[0])
//     if (!dbUserData[0]) {
//       res.status(404).json( {message: "Could not find a user with this id"});
//       return;
//     }
//     res.json(dbUserData);
//   }).catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });

// });

// //delete localhost:3001/api/user/id
// router.delete('/id', (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(dbUserData => {
//     console.log('dbUserData',dbUserData)
//     if (!dbUserData) {
//       res.status(404).json( {message: "Could not find a user with this id"});
//       return;
//     }
//     res.json(dbUserData);
//   }).catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });

// });
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
