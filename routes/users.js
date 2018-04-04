var express = require('express');
var router = express.Router();
const { readAll, create, findByUsername } = require('../db/usersQueries');

/* GET users listing. */

async function getAllUsers(req, res, next) {
  const users = await readAll();
  if (users) {
    res.status(200).json({
      status: 'success',
      data: users,
      message: 'Retrieved ALL users',
    });
  } else {
    res.status(400).json({
      status: 'error',
      data: [],
      message: 'Error retrieving all users.',
    });
  }
}

async function getUserByUsername(req, res, next) {
  const { username } = req.params;
  const user = await findByUsername(username);
  if (user) {
    res.status(200).json({
      success: true,
      data: user,
      message: 'Retrieved user by username',
    });
  } else {
    res.status(400).json({
      success: 'false',
      data: {},
      message: 'User not found',
    });
  }
}

async function insertIntoUsers(req, res, next) {
  const { username, password, name, age } = req.body;
  const result = await create({ username, password, name, age });
  res.status(200).json(result);
}

router.get('/users', getAllUsers);
router.post('/users', insertIntoUsers);
router.get('/users/:username', getUserByUsername);

module.exports = router;
