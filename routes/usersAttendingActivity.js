var express = require('express');
var router = express.Router();
const {
  getAllUsersAttendingActivity,
  insertIntoUsersAttendingActivity,
  getActivitiesByUserId,
} = require('../db/usersAttendingActivity');

router.get('/usersattendingactivity', getAllUsersAttendingActivity);
router.post('/usersattendingactivity', insertIntoUsersAttendingActivity);
router.get('/usersattendingactivity/:userId', getActivitiesByUserId);

module.exports = router;
