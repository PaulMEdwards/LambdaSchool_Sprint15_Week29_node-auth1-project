const router = require('express').Router();

const Users = require('./users-model.js');

const auth = require('../middleware/auth');

router.post('/', auth, (req, res) => {
  const userData = req.body;

  if (!userData.username || !userData.password) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    Users.createUser(userData)
      .then(addedUser => {
        res.status(201).json(addedUser);
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to create new user` });
      });
  };
});

router.get('/', auth, (req, res) => {
  Users.readUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get users` });
    });
});
router.get('/:userRef', auth, (req, res) => {
  const { userRef } = req.params;
  userId = parseInt(userRef, 10);
  if (userId > 0) {
    console.log(`TCL: readUserById(${userId})`);
    Users.readUserById(userId)
      .then(user => {
        if (user) {
          console.log(`TCL: found:\n`, user);
          res.json({ userData: user });
        } else {
          res.status(404).json({ message: `Could not get user with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get user` });
      });
  } else {
    username = userRef;
    console.log(`TCL: readUserByName(${username})`);
    Users.readUserByName(username)
      .then(user => {
        if (user) {
          console.log(`TCL: found:\n`, user);
          res.json({ userData: user });
        } else {
          res.status(404).json({ message: `Could not get user with given name` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get user` });
      });
  };
});

// router.put('/:userId', auth, (req, res) => {
//   const { userId } = req.params;
//   console.log(`TCL: userId`, userId);
//   const userChanges = req.body;
//   console.log(`TCL: userChanges\n`, userChanges);

//   if (!userChanges.username && !userChanges.password) {
//     res.status(400).json({ message: 'Required data missing' });
//   } else {
//     Users.readUserById(userId)
//       .then(user => {
//         console.log(`TCL: user\n`, user);
//         if (user) {
//         Users.updateUser(userId, userChanges)
//           .then(updatedUser => {
//             console.log(`TCL: updatedUser\n`, updatedUser);
//             res.json(updatedUser);
//           });
//         } else {
//           res.status(404).json({ message: 'Could not get user with given id' });
//         };
//       })
//       .catch(err => {
//         res.status(500).json({ message: 'Failed to update user' });
//       });
//   };
// });

// router.delete('/:userId', auth, (req, res) => {
//   const { userId } = req.params;

//   Users.readUserById(userId)
//     .then(user => {
//       if (user) {
//         Users.deleteUser(userId)
//           .then(deleted => {
//             if (deleted) {
//               res.status(200).json({ removedUser: parseInt(userId, 10) });
//             };
//           });
//       };
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'Failed to delete user' });
//     });
// });

module.exports = router;