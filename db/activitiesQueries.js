const { db, queryDb } = require('./db');
const xss = require('xss'); // eslint-disable-line

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

async function getActivityById(id) {
  const result = await queryDb('SELECT * FROM activities WHERE id = $1', [
    xss(id),
  ]);
  if (result.rowCount === 1) {
    return result.rows[0];
  }
  return null;
}

function getActivityByIdMiddleware(req, res, next) {
  const { id } = req.params;
  const activity = getActivityById(id);
  if (activity) {
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
}

module.exports = {
  getAllActivities,
  insertIntoActivities,
  getActivityById,
  getActivityByIdMiddleware,
};
