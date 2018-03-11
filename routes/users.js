var express = require('express');
var router = express.Router();
const { getAllUsers, postInUsers } = require('../db/usersQueries');

/* GET users listing. */

router.get('/users', getAllUsers);
router.post('/users', postInUsers);

module.exports = router;
