var express = require('express');
var router = express.Router();
const {
  getAllActivities,
  insertIntoActivities,
  getActivityByIdMiddleware,
} = require('../db/activitiesQueries');

router.get('/activities', getAllActivities);
router.post('/activities', insertIntoActivities);
router.get('/activities/:id', getActivityByIdMiddleware);

module.exports = router;
