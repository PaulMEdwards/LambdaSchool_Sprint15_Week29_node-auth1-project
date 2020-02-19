const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  let userData = req.body;
  console.log(`TCL: user`, userData);

  if (!userData.username || !userData.password) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    const hash = bcrypt.hashSync(userData.password, 12);
    console.log(`TCL: hash`, hash);
    
    userData.password = hash;

    Users.createUser(userData)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  };
});

router.post('/login', (req, res) => {
  let userData = req.body;
  console.log(`TCL: user input`, userData);

  if (!userData.username || !userData.password) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    username = userData.username;
    Users.readUserByName(username)
      .first()
      .then(user => {
        console.log(`TCL: user found\n`, user);
        if (user && bcrypt.compareSync(userData.password, user.password)) {
          req.session.user = user;
          res.status(200).json({ message: `Welcome ${user.username}!`, userData: user });
        } else {
          res.status(401).json({ message: `Invalid Credentials` });
        };
      })
      .catch(err => {
        res.status(500).json(err);
      });
  };
});

router.get('/logout', (req, res) => {
  console.log(`TCL: logout -> req.session\n`, req.session);
  if (req.session) {
    console.log(`TCL: logout -> has session`);
    req.session.destroy(err => {
      if (err) {
        console.log(`TCL: logout -> err`, err);
        res.status(500).json({ message: 'Unable to destroy session!' });
      } else {
        console.log(`TCL: logout -> OK`);
        res.status(200).json({ message: 'Logged out.' });
      };
    });
  } else {
    res.end();
    console.log(`TCL: logout -> end`);
  };
  console.log(`TCL: logout -> done`);
});

module.exports = router;