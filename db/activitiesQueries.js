const db = require('./db');

function getAllActivities(req, res, next) {
  db
    .any('select * from activities')
    .then(function(data) {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved ALL activities',
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function insertIntoActivities(req, res, next) {
  const data = req.body;
  db
    .none(
      'INSERT INTO activities (title, description, location) VALUES ($1, $2, $3)',
      [data.title, data.description, data.location],
    )
    .then(posts => {
      res.redirect(req.get('referer'));
    })
    .catch(error => {
      res.send(`<p>Gat ekki bætt gögnum við: ${error}</p>`);
    });
}

module.exports = {
  getAllActivities,
  insertIntoActivities,
};
