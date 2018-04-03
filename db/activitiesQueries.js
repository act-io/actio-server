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
      [data.title, data.description, data.location]
    )
    .then((posts) => {
      res.redirect(req.get('referer'));
    })
    .catch((error) => {
      res.send(`<p>Gat ekki bætt gögnum við: ${error}</p>`);
    });
}

function getActivityById(req, res, next) {
  const { id } = req.params;
  db
    .any('SELECT * FROM activities WHERE id = $1', id)
    .then(function(data) {
      if (data.length > 0) {
        res.status(200).json({
          status: 'success',
          data: data[0],
          message: 'Retrieved activity by id',
        });
      } else {
        res.status(200).json({
          status: 'success',
          data: [],
          message: `No activity with the id ${id} found.`,
        });
      }
    })
    .catch(function(err) {
      return next(err);
    });
}

module.exports = {
  getAllActivities,
  insertIntoActivities,
  getActivityById,
};
