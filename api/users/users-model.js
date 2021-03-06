const db = require('../../data/dbConfig.js');

module.exports = {
  createUser,
  readUsers,
  readUserById,
  readUserByName,
  updateUser,
  deleteUser,
};

function createUser(user) {
  if (user) {
    return db("users")
      .insert(user)
      .then(u => this.readUserById(u[0]));
  } else {
    return null;
  };
};

function readUsers() {
  return db("users");
};
function readUserById(id) {
  if (id) {
    return db("users")
      .where("id", id)
      .first();
  } else {
    return null;
  };
};
function readUserByName(username) {
  if (username) {
    return db("users")
      .where("username", username)
      .first();
  } else {
    return null;
  };
};

function updateUser(id, userUpdate) {
  if (id && userUpdate) {
    return db("users")
      .update(userUpdate)
      .then(count => (count > 0 ? this.readUserById(id) : null));
  } else {
    return null;
  };
};

function deleteUser(id) {
  if (id) {
    return db("users")
      .where("id", id)
      .del();
  } else {
    return null;
  };
};