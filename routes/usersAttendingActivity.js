var express = require('express');
var router = express.Router();
const {
  getAllUsersAttendingActivity,
  insertIntoUsersAttendingActivity,
  getActivitiesByUserId,
  deleteFromUsersAttendingActivity,
} = require('../db/usersAttendingActivity');

async function getActivitiesByUserIdMiddleware(req, res, next) {
  const { userId } = req.params;

  const activities = await getActivitiesByUserId(userId);

  if (activities.length > 0) {
    res.status(200).json({
      status: 'success',
      data: activities,
      message: 'Retrieved ALL activties that user is attending to',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: [],
      message: `No activities found for userId = ${userId}`,
    });
  }
}

async function deleteFromUsersAttendingActivityMiddleware(req, res, next) {
  const { userId, activityId } = req.params;

  console.log('userId', userId);
  console.log('activityId', activityId);

  const row = await deleteFromUsersAttendingActivity(userId, activityId);

  if (row) {
    res.status(200).json({
      status: 'success',
      data: row,
      message: `User with id : ${userId} is no longer attending activity with id : ${activityId}`,
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {},
      message: `User with id : ${userId} is was not attending activity with id : ${activityId}`,
    });
  }
}

router.get('/usersattendingactivity', getAllUsersAttendingActivity);
router.post('/usersattendingactivity', insertIntoUsersAttendingActivity);
router.get('/usersattendingactivity/:userId', getActivitiesByUserIdMiddleware);
router.delete(
  '/usersattendingactivity/:userId&:activityId',
  deleteFromUsersAttendingActivityMiddleware
);

module.exports = router;
