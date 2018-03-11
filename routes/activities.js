var express = require('express');
var router = express.Router();
const {
  getAllActivities,
  insertIntoActivities,
} = require('../db/activitiesQueries');

router.get('/activities', getAllActivities);
router.post('/activities', insertIntoActivities);

module.exports = router;
