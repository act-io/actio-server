const { db, queryDb } = require('./db');
const xss = require('xss'); // eslint-disable-line

const { getActivityById } = require('../db/activitiesQueries');

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

async function getActivitiesByUserId(userId) {
  const result = await queryDb(
    'SELECT * FROM usersAttendingActivity WHERE userid = $1',
    [xss(userId)]
  );

  const activityIdArray = result.rows;
  const actvities = activityIdArray.map(async (a) => {
    const activity = await getActivityById(a.activityid);
    return activity;
  });

  return Promise.all(actvities);
}

async function deleteFromUsersAttendingActivity(userId, activityId) {
  const result = await queryDb(
    'SELECT * FROM usersAttendingActivity WHERE userid = $1 AND activityid = $2',
    [xss(userId), xss(activityId)]
  );

  if (result.rows.length > 0) {
    await queryDb(
      'DELETE FROM usersAttendingActivity WHERE userid = $1 AND activityid = $2',
      [xss(userId), xss(activityId)]
    );
    return result.rows[0];
  }
  return null;
}

function getHowManyAttendees(req, res, next) {
  const { activityID } = req.params;
  db 
    .any('SELECT COUNT(*)::integer FROM usersAttendingActivity WHERE activityId = $1',[xss(activityID)])
    .then(function(data) {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved ALL Attendees',
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

module.exports = {
  getAllUsersAttendingActivity,
  insertIntoUsersAttendingActivity,
  getActivitiesByUserId,
  deleteFromUsersAttendingActivity,
  getHowManyAttendees,
};
