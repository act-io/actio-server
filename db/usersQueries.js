const db = require('./db');

const READ_USERS_BY_USERNAME = 'SELECT * FROM users WHERE username = $1';

function getAllUsers(req, res, next) {
  db
    .any('select * from users')
    .then(function(data) {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved ALL users',
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function postInUsers(req, res, next) {
  const data = req.body;
  db
    .none(
      'INSERT INTO users (name, age, username, password) VALUES ($1, $2, $3, $4)',
      [data.name, data.age, data.username, data.password]
    )
    .then((posts) => {
      res.redirect(req.get('referer'));
    })
    .catch((error) => {
      res.send(`<p>Gat ekki bætt gögnum við: ${error}</p>`);
    });
}

function getUserByUsername(req, res, next) {
  const { username } = req.params;
  db
    .any('SELECT * FROM users WHERE username = $1', username)
    .then(function(data) {
      res.status(200).json({
        status: 'success',
        data: data[0],
        message: 'Retrieved user by username',
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

module.exports = {
  getAllUsers,
  postInUsers,
  getUserByUsername,
};
