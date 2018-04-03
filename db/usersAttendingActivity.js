const db = require('./db');

function getAllUsersAttendingActivity(req, res, next) {
  db
    .any('select * from usersAttendingActivity')
    .then(function(data) {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved ALL users attending activity',
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function getInsertUsersAttendingActivity({ userId, activityId } = {}) {
  return db.task('getInsertUsersAttendingActivity', (t) => {
    return t
      .oneOrNone(
        'SELECT * FROM usersAttendingActivity WHERE userId= $1 AND activityId = $2',
        [userId, activityId],
        (u) => u
      )
      .then((row) => {
        return (
          row ||
          t.one(
            'INSERT INTO usersAttendingActivity (userId, activityId) VALUES ($1, $2) RETURNING *',
            [userId, activityId],
            (u) => u
          )
        );
      });
  });
}

function insertIntoUsersAttendingActivity(req, res, next) {
  const data = req.body;
  const { userId, activityId } = data;
  getInsertUsersAttendingActivity({ userId, activityId })
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data,
        message: 'Retrieved ALL users attending activity',
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: 'error',
        data: [],
        message: 'Database error has occurred',
      });
    });
}

function getActivitiesByUserId(req, res, next) {
  const { userId } = req.params;
  db
    .any('SELECT * FROM usersAttendingActivity WHERE userId = $1', userId)
    .then(function(data) {
      data = data.map((d) => d.activityid);
      res.status(200).json({
        status: 'success',
        data,
        message: 'Retrieved user by userId',
      });
    })
    .catch(function(err) {
      console.error(err);
    });
}

module.exports = {
  getAllUsersAttendingActivity,
  insertIntoUsersAttendingActivity,
  getActivitiesByUserId,
};
