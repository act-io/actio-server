var express = require('express');
var router = express.Router();
const {
  getAllUsers,
  postInUsers,
  getUserByUsername,
} = require('../db/usersQueries');

/* GET users listing. */

router.get('/users', getAllUsers);
router.post('/users', postInUsers);
router.get('/users/:username', getUserByUsername);

module.exports = router;
