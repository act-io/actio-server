const db = require('./db');

function login(req, res, next) {
  const body = req.body;
  db
    .any(
      'select username,password from users where $1 = username AND $2 = password',
      [body.username, body.password]
    )
    .then(function(data) {
      if (data.length > 0) {
        res.status(200).json({
          login: true,
          data: data[0],
        });
      } else {
        res.status(200).json({
          login: false,
          data: [],
        });
      }
    })
    .catch(function(err) {
      return next(err);
    });
}

module.exports = {
  login: login,
};
