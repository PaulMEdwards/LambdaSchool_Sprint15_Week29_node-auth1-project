const Users = require('../users/users-model.js');
const bcrypt = require('bcryptjs');

function auth(req, res, next) {
  console.log(`req.headers\n`, req.headers);

  userData = {};

  if (req.headers.username && req.headers.password) {
    userData = {
      username: req.headers.username,
      password: req.headers.password
    };
  } else if (req.session.user) {
    const u = req.session.user.username;
      let p = req.session.user.password;

    console.log(`TCL: auth -> req.session.user\n  username=${u}\n  password=${p}`);

    userData = {
      username: u,
      password: p,
      cookieAuth: true
    };
  };

  if (userData.username && userData.password) {
    console.log(`TCL: auth -> user input\n`, userData);
    
    Users.readUserByName(userData.username)
      .first()
      .then(user => {
        console.log(`TCL: auth -> user output\n`, user);
        b = bcrypt.compareSync(userData.password, user.password);
        console.log(`TCL: auth -> bcrypt output =`, b);
        if (user && (userData.cookieAuth || b)) {
          console.log(`Authorized!`);
          next();
        } else {
          console.log(`You shall not pass!`);
          res.status(401).json({ message: `You shall not pass!` });
        };
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    res.status(400).json({ message: `Missing session cookie or header(s): username and/or password` });
  };
};

module.exports = auth;