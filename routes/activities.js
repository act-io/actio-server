var express = require('express');
var router = express.Router();
const {
  getAllActivities,
  insertIntoActivities,
  getActivityById,
} = require('../db/activitiesQueries');

router.get('/activities', getAllActivities);
router.post('/activities', insertIntoActivities);
router.get('/activities/:id', getActivityById);

module.exports = router;
