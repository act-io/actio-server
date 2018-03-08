const db = require('./db');

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
      [data.name, data.age, data.username, data.password],
    )
    .then(posts => {
      res.redirect(req.get('referer'));
    })
    .catch(error => {
      res.send(`<p>Gat ekki bætt gögnum við: ${error}</p>`);
    });
}

module.exports = {
  getAllUsers,
  postInUsers,
};
