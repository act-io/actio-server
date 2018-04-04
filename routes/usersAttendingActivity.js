var express = require('express');
var router = express.Router();
const {
  getAllUsersAttendingActivity,
  insertIntoUsersAttendingActivity,
  getActivitiesByUserIdMiddleware,
} = require('../db/usersAttendingActivity');

router.get('/usersattendingactivity', getAllUsersAttendingActivity);
router.post('/usersattendingactivity', insertIntoUsersAttendingActivity);
router.get('/usersattendingactivity/:userId', getActivitiesByUserIdMiddleware);

module.exports = router;
